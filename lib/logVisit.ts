import { getPool } from './db'

export interface PageVisit {
  session_id: string
  path: string
  locale: string | null
  referrer: string | null
  referrer_host: string | null
  country: string | null
  device: string | null
  browser: string | null
  is_bot: boolean
  utm_source: string | null
  utm_medium: string | null
  utm_campaign: string | null
}

export function logPageVisit(v: PageVisit): void {
  if (!process.env.DATABASE_URL) return
  getPool()
    .execute(
      `INSERT INTO page_visits
        (session_id, path, locale, referrer, referrer_host, country,
         device, browser, is_bot, utm_source, utm_medium, utm_campaign)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        v.session_id,
        v.path,
        v.locale,
        v.referrer,
        v.referrer_host,
        v.country,
        v.device,
        v.browser,
        v.is_bot ? 1 : 0,
        v.utm_source,
        v.utm_medium,
        v.utm_campaign,
      ]
    )
    .catch((err) => console.warn('[db] Failed to log page visit:', err))
}
