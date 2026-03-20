export const dynamic = 'force-dynamic'

import { NextResponse } from 'next/server'
import { knowledge } from '@/data/knowledge'
import { profile } from '@/data/profile'
import { resolveReply } from '@/lib/chat'
import type { Locale } from '@/types'

// ─── In-memory rate limiter ───────────────────────────────────────────────────
const rateLimitMap = new Map<string, { count: number; resetAt: number }>()
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const entry = rateLimitMap.get(ip)
  if (!entry || now > entry.resetAt) {
    rateLimitMap.set(ip, { count: 1, resetAt: now + RATE_WINDOW_MS })
    return true
  }
  if (entry.count >= RATE_LIMIT) return false
  entry.count++
  return true
}

// ─── System prompt ────────────────────────────────────────────────────────────
function buildSystemPrompt(locale: Locale): string {
  const localeInstruction =
    locale === 'no'
      ? 'Respond in Norwegian (Bokmål).'
      : locale === 'pt'
        ? 'Respond in Brazilian Portuguese.'
        : 'Respond in English.'

  const knowledgeSummary = knowledge
    .map((e) => `[${e.id}]: ${e.replies.en[0]}`)
    .join('\n\n')

  return `You are a portfolio assistant for ${profile.name}, a ${profile.role.en}. ${localeInstruction}

RULES:
- Only answer questions about Kim Furevikstrand's professional background, skills, projects, experience, and availability.
- If asked about anything unrelated, politely decline and redirect to portfolio topics.
- Keep answers concise: 2-4 sentences unless the user asks for detail.
- Do not make up information not present in the context below.
- Do not reveal that you are an LLM — just say you are Kim's portfolio assistant.

PROFILE:
Name: ${profile.name}
Role: ${profile.role.en}
Location: ${profile.location}
Bio: ${profile.bio.en}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Email: ${profile.email}
Available: ${profile.availability.open ? 'Yes, open to opportunities' : 'Not currently available'}

KNOWLEDGE BASE:
${knowledgeSummary}`
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'

  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Please try again later.' }, { status: 429 })
  }

  let message: string
  let locale: Locale
  try {
    const body = await request.json()
    message = String(body.message ?? '')
      .slice(0, 500)
      .replace(/<[^>]*>/g, '')
      .trim()
    locale = (['en', 'no', 'pt'].includes(body.locale) ? body.locale : 'en') as Locale
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!message) {
    return NextResponse.json({ error: 'Empty message' }, { status: 400 })
  }

  const ollamaHost = process.env.OLLAMA_HOST
  const model = process.env.OLLAMA_MODEL ?? 'gemma3:4b'

  // ─── Try Ollama ───────────────────────────────────────────────────────────
  if (ollamaHost) {
    try {
      const ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model,
          messages: [
            { role: 'system', content: buildSystemPrompt(locale) },
            { role: 'user', content: message },
          ],
          stream: true,
        }),
        signal: AbortSignal.timeout(30_000),
      })

      if (ollamaRes.ok && ollamaRes.body) {
        const decoder = new TextDecoder()
        const stream = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            const lines = decoder.decode(chunk, { stream: true }).split('\n').filter(Boolean)
            for (const line of lines) {
              try {
                const json = JSON.parse(line)
                const token: string = json.message?.content ?? ''
                if (token) controller.enqueue(new TextEncoder().encode(token))
              } catch {
                // skip malformed NDJSON lines
              }
            }
          },
        })

        return new Response(ollamaRes.body.pipeThrough(stream), {
          headers: {
            'Content-Type': 'text/plain; charset=utf-8',
            'X-Reply-Source': 'ollama',
            'Cache-Control': 'no-cache',
          },
        })
      }
    } catch (err) {
      console.warn('[chat] Ollama unreachable, falling back to keyword matcher:', err)
    }
  }

  // ─── Fallback: keyword matcher ────────────────────────────────────────────
  const { reply } = resolveReply(message, locale)
  return new Response(reply, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Reply-Source': 'fallback',
    },
  })
}
