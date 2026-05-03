// Lightweight UA classification — no dependency. Good enough for grouping
// visits by device/browser and filtering bots in the dashboard.

const BOT_RE =
  /bot|crawl|spider|slurp|bingpreview|googlebot|facebookexternalhit|httpx|curl|wget|headless|axios|node-fetch|python-requests|lighthouse|pagespeed|monitoring|uptime/i

export function isBotUA(ua: string): boolean {
  if (!ua) return false
  return BOT_RE.test(ua)
}

export function detectDevice(ua: string): string {
  if (!ua) return 'unknown'
  if (/tablet|ipad/i.test(ua)) return 'tablet'
  if (/mobi|android|iphone|ipod/i.test(ua)) return 'mobile'
  return 'desktop'
}

export function detectBrowser(ua: string): string {
  if (!ua) return 'unknown'
  if (/Edg\//.test(ua)) return 'Edge'
  if (/OPR\/|Opera/.test(ua)) return 'Opera'
  if (/Firefox\//.test(ua)) return 'Firefox'
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return 'Chrome'
  if (/Safari\//.test(ua) && !/Chrome\//.test(ua)) return 'Safari'
  return 'Other'
}
