import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY

  try {
    const { name, email, message } = await request.json()

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
    }

    // If no API key configured, stub response for development
    if (!apiKey) {
      console.log('[contact] RESEND_API_KEY not set — stubbed:', { name, email, message })
      return NextResponse.json({ ok: true })
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'portfolio@furevikstrand.cloud',
        to: 'kim@furevikstrand.cloud',
        subject: `Portfolio contact from ${name}`,
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
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
