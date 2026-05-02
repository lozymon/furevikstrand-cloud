export const dynamic = 'force-dynamic'

import Anthropic from '@anthropic-ai/sdk'
import { NextResponse } from 'next/server'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { stack } from '@/data/stack'
import { education } from '@/data/education'
import { resolveReply } from '@/lib/chat'
import { logChatEvent } from '@/lib/logEvent'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'
import type { Locale } from '@/types'

// Rate limit is enforced via an in-memory Map keyed by IP (see `lib/rateLimit.ts`).
// This is single-instance only — counters reset on process restart and aren't shared
// across replicas. Fine for the current single-container Docker deploy; a horizontal
// scale-out would silently lose enforcement and need Redis (or similar) backing.
const RATE_LIMIT = 20
const RATE_WINDOW_MS = 60 * 60 * 1000

// ─── System prompt ────────────────────────────────────────────────────────────
// The prompt is built from import-time data (profile, experience, projects,
// stack, education) so it's stable for the lifetime of the process. Cache
// per-locale to skip the rebuild on every request.
const systemPromptCache = new Map<Locale, string>()

function systemPromptFor(locale: Locale): string {
  const cached = systemPromptCache.get(locale)
  if (cached) return cached
  const built = buildSystemPrompt(locale)
  systemPromptCache.set(locale, built)
  return built
}

function buildSystemPrompt(locale: Locale): string {
  const localeInstruction =
    locale === 'no'
      ? 'Respond in Norwegian (Bokmål).'
      : locale === 'pt'
        ? 'Respond in Brazilian Portuguese.'
        : 'Respond in English.'

  const experienceSection = experience
    .map((e) => {
      const desc =
        locale === 'no' ? e.description.no : locale === 'pt' ? e.description.pt : e.description.en
      const role = locale === 'no' ? e.role.no : locale === 'pt' ? e.role.pt : e.role.en
      return `- **${e.company}** — ${role} (${e.period}, ${e.location})\n  ${desc}\n  Tech: ${e.tech.join(', ')}`
    })
    .join('\n\n')

  const projectsSection = projects
    .map((p) => {
      const desc =
        locale === 'no' ? p.description.no : locale === 'pt' ? p.description.pt : p.description.en
      const repo = p.repo ? ` — [GitHub](${p.repo})` : ''
      const url = p.url ? ` — [Live](${p.url})` : ''
      return `- **${p.name}**${repo}${url}: ${desc} (${p.tech.join(', ')})`
    })
    .join('\n')

  const stackSection = Object.entries(stack)
    .map(([category, items]) => `- ${category}: ${(items as string[]).join(', ')}`)
    .join('\n')

  const educationSection = education
    .map((e) => `- ${e.school} — ${e.degree} (${e.period})`)
    .join('\n')

  return `You are a portfolio assistant for ${profile.name}, a ${profile.role.en}. ${localeInstruction}

RULES:
- Only answer questions about Kim Furevikstrand's professional background, skills, projects, experience, and availability.
- If asked about anything unrelated, politely decline and redirect to portfolio topics.
- Keep answers concise: 2-4 sentences unless the user asks for detail.
- Do not make up information not present in the context below.
- Do not reveal that you are an LLM — just say you are Kim's portfolio assistant.
- Use conversation history to understand follow-up questions like "tell me more" or "what about X".

FORMATTING:
- Use **bold** for names, companies, and emphasis.
- Use *italic* for quotes.
- For external URLs use markdown links: [label](https://url)
- For internal pages use backtick paths: \`/testimonials\`, \`/certifications\`, \`/classic\`
- Available internal pages: \`/testimonials\`, \`/certifications\`, \`/classic\` (CV)

PROFILE:
Name: ${profile.name}
Role: ${profile.role[locale] ?? profile.role.en}
Location: ${profile.location}
Bio: ${profile.bio[locale] ?? profile.bio.en}
GitHub: ${profile.github}
LinkedIn: ${profile.linkedin}
Email: ${profile.email}
Available: ${profile.availability.open ? profile.availability.label[locale] : 'Not currently available'}

EXPERIENCE:
${experienceSection}

PROJECTS:
${projectsSection}

TECH STACK:
${stackSection}

EDUCATION:
${educationSection}`
}

// ─── History type ─────────────────────────────────────────────────────────────
interface HistoryMessage {
  role: 'user' | 'assistant'
  content: string
}

// ─── Route handler ────────────────────────────────────────────────────────────
export async function POST(request: Request) {
  const ip = clientIp(request)

  if (!checkRateLimit('chat', ip, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json(
      { error: 'Rate limit exceeded. Please try again later.' },
      { status: 429 }
    )
  }

  let message: string
  let locale: Locale
  let history: HistoryMessage[]
  let sessionId: string
  let messageIndex: number
  let page: 'chat' | 'dev'
  try {
    const body = await request.json()
    message = String(body.message ?? '')
      .slice(0, 500)
      .replace(/<[^>]*>/g, '')
      .trim()
    locale = (['en', 'no', 'pt'].includes(body.locale) ? body.locale : 'en') as Locale
    history = Array.isArray(body.history)
      ? body.history
          .filter((m: unknown) => {
            if (typeof m !== 'object' || m === null) return false
            const msg = m as Record<string, unknown>
            return (
              (msg.role === 'user' || msg.role === 'assistant') &&
              typeof msg.content === 'string' &&
              msg.content.trim()
            )
          })
          .slice(-10)
      : []
    sessionId = typeof body.sessionId === 'string' ? body.sessionId.slice(0, 36) : 'unknown'
    messageIndex = typeof body.messageIndex === 'number' ? body.messageIndex : 0
    page = (body.page === 'dev' ? 'dev' : 'chat') as 'chat' | 'dev'
  } catch {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  if (!message) {
    return NextResponse.json({ error: 'Empty message' }, { status: 400 })
  }

  const systemPrompt = systemPromptFor(locale)
  const claudeEnabled = process.env.DISABLE_CLAUDE !== 'true'
  const ollamaEnabled = process.env.DISABLE_OLLAMA !== 'true'

  // ─── Try Claude API ────────────────────────────────────────────────────────
  if (claudeEnabled && process.env.ANTHROPIC_API_KEY) {
    try {
      const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

      const stream = anthropic.messages.stream({
        model: process.env.CLAUDE_MODEL ?? 'claude-haiku-4-5',
        max_tokens: 512,
        system: systemPrompt,
        messages: [...history, { role: 'user', content: message }],
      })

      const encoder = new TextEncoder()
      const readable = new ReadableStream({
        async start(controller) {
          let accumulated = ''
          for await (const event of stream) {
            if (event.type === 'content_block_delta' && event.delta.type === 'text_delta') {
              controller.enqueue(encoder.encode(event.delta.text))
              accumulated += event.delta.text
            }
          }
          controller.close()
          logChatEvent({
            session_id: sessionId,
            locale,
            reply_source: 'claude',
            topic: null,
            message_index: messageIndex,
            page,
            user_message: message,
            ai_reply: accumulated,
          })
        },
      })
      return new Response(readable, {
        headers: {
          'Content-Type': 'text/plain; charset=utf-8',
          'X-Reply-Source': 'claude',
          'Cache-Control': 'no-cache',
        },
      })
    } catch (err) {
      console.warn('[chat] Claude API error, falling back to Ollama:', err)
    }
  }

  // ─── Try Ollama ───────────────────────────────────────────────────────────
  const ollamaHost = process.env.OLLAMA_HOST
  const ollamaModel = process.env.OLLAMA_MODEL ?? 'gemma3:4b'

  if (ollamaEnabled && ollamaHost) {
    try {
      const ollamaRes = await fetch(`${ollamaHost}/api/chat`, {
        method: 'POST',
        cache: 'no-store',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: ollamaModel,
          messages: [
            { role: 'system', content: systemPrompt },
            ...history,
            { role: 'user', content: message },
          ],
          stream: true,
        }),
        signal: AbortSignal.timeout(30_000),
      })

      if (ollamaRes.ok && ollamaRes.body) {
        const decoder = new TextDecoder()
        let ollamaAccumulated = ''
        const stream = new TransformStream<Uint8Array, Uint8Array>({
          transform(chunk, controller) {
            const lines = decoder.decode(chunk, { stream: true }).split('\n').filter(Boolean)
            for (const line of lines) {
              try {
                const json = JSON.parse(line)
                const token: string = json.message?.content ?? ''
                if (token) {
                  controller.enqueue(new TextEncoder().encode(token))
                  ollamaAccumulated += token
                }
              } catch {
                // skip malformed NDJSON lines
              }
            }
          },
          flush() {
            logChatEvent({
              session_id: sessionId,
              locale,
              reply_source: 'ollama',
              topic: null,
              message_index: messageIndex,
              page,
              user_message: message,
              ai_reply: ollamaAccumulated,
            })
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
  const { reply } = resolveReply(message, locale, history)
  logChatEvent({
    session_id: sessionId,
    locale,
    reply_source: 'fallback',
    topic: null,
    message_index: messageIndex,
    page,
    user_message: message,
    ai_reply: reply,
  })
  return new Response(reply, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'X-Reply-Source': 'fallback',
    },
  })
}
