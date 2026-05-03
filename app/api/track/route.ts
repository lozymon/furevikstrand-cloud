import { NextResponse, type NextRequest } from 'next/server'
import geoip from 'geoip-lite'
import { logPageVisit } from '@/lib/logVisit'
import { detectBrowser, detectDevice, isBotUA } from '@/lib/ua'

export const runtime = 'nodejs'

// Pulls the leftmost public IP out of x-forwarded-for / x-real-ip.
// Coolify's Traefik proxy sets x-forwarded-for as "<client>, <proxies...>".
function clientIp(req: NextRequest): string | null {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0]?.trim() || null
  const xri = req.headers.get('x-real-ip')
  if (xri) return xri.trim() || null
  return null
}

// Country resolution priority: platform header (Vercel/CF/Fly) → local
// MaxMind lookup. We never store the IP itself.
function resolveCountry(req: NextRequest): string | null {
  const header =
    req.headers.get('x-vercel-ip-country') ??
    req.headers.get('cf-ipcountry') ??
    req.headers.get('fly-client-country')
  if (header) return header.slice(0, 2).toUpperCase()
  const ip = clientIp(req)
  if (!ip) return null
  try {
    return geoip.lookup(ip)?.country ?? null
  } catch {
    return null
  }
}

interface TrackBody {
  session_id?: unknown
  path?: unknown
  query?: unknown
  referrer?: unknown
  locale?: unknown
}

function safeUrl(s: string | null): URL | null {
  if (!s) return null
  try {
    return new URL(s)
  } catch {
    return null
  }
}

function trim(v: unknown, n: number): string | null {
  if (typeof v !== 'string' || v.length === 0) return null
  return v.slice(0, n)
}

export async function POST(req: NextRequest) {
  let body: TrackBody = {}
  try {
    body = (await req.json()) as TrackBody
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const sessionId = trim(body.session_id, 36)
  const path = trim(body.path, 255)
  if (!sessionId || !path) {
    return NextResponse.json({ ok: false }, { status: 400 })
  }

  const ua = req.headers.get('user-agent') ?? ''
  const referrerStr = trim(body.referrer, 500) ?? req.headers.get('referer')
  const refUrl = safeUrl(referrerStr)
  const selfHost = req.headers.get('host')
  const isSelfReferrer = refUrl && selfHost && refUrl.host === selfHost

  const params = new URLSearchParams(typeof body.query === 'string' ? body.query : '')

  logPageVisit({
    session_id: sessionId,
    path,
    locale: trim(body.locale, 8),
    referrer: isSelfReferrer ? null : trim(referrerStr, 500),
    referrer_host: isSelfReferrer ? null : (refUrl?.host ?? null),
    country: resolveCountry(req),
    device: detectDevice(ua),
    browser: detectBrowser(ua),
    is_bot: isBotUA(ua),
    utm_source: trim(params.get('utm_source'), 64),
    utm_medium: trim(params.get('utm_medium'), 64),
    utm_campaign: trim(params.get('utm_campaign'), 128),
  })

  return NextResponse.json({ ok: true })
}
