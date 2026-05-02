import { NextResponse } from 'next/server'
import { checkRateLimit, clientIp } from '@/lib/rateLimit'

const RATE_LIMIT = 5
const RATE_WINDOW_MS = 60 * 60 * 1000

export async function POST(request: Request) {
  const ip = clientIp(request)

  if (!checkRateLimit('contact', ip, RATE_LIMIT, RATE_WINDOW_MS)) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const apiKey = process.env.RESEND_API_KEY
  const toEmail = process.env.RESEND_TO_EMAIL ?? 'kim@furevikstrand.cloud'

  try {
    const body = await request.json()
    const name = String(body.name ?? '').trim()
    const email = String(body.email ?? '').trim()
    const note = String(body.note ?? body.message ?? '').trim()

    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 })
    }

    if (!apiKey) {
      console.log('[contact] RESEND_API_KEY not set — stubbed:', { name, email, note })
      return NextResponse.json({ ok: true })
    }

    const subject = name ? `Portfolio contact from ${name}` : 'Portfolio contact'
    const text = [name && `Name: ${name}`, `Email: ${email}`, note && `\n${note}`]
      .filter(Boolean)
      .join('\n')

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'portfolio@furevikstrand.cloud',
        to: toEmail,
        subject,
        text,
        reply_to: email,
      }),
    })

    if (!res.ok) {
      console.error('[contact] Resend error:', await res.text())
      return NextResponse.json({ error: 'Failed to send' }, { status: 500 })
    }

    return NextResponse.json({ ok: true })
  } catch (err) {
    console.error('[contact] Unexpected error:', err)
    return NextResponse.json({ error: 'Internal error' }, { status: 500 })
  }
}
