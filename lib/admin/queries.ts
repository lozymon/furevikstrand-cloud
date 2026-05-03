import type { RowDataPacket } from 'mysql2'
import { getPool } from '@/lib/db'

// All queries assume the chat_events schema documented in `docs/todo.md`,
// extended with `user_message TEXT` and `ai_reply TEXT` columns (see
// `lib/logEvent.ts` INSERT for the full set).

export type DailyFallbackRow = {
  day: string
  total: number
  fallbacks: number
  rate: number
}

function toIsoDay(value: unknown): string {
  if (value instanceof Date) return value.toISOString().slice(0, 10)
  return String(value)
}

function toIso(value: unknown): string {
  if (value instanceof Date) return value.toISOString()
  return String(value)
}

export async function fallbackRateOverTime(days: number): Promise<DailyFallbackRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT
       DATE(created_at) AS day,
       COUNT(*) AS total,
       SUM(CASE WHEN reply_source = 'fallback' THEN 1 ELSE 0 END) AS fallbacks
     FROM chat_events
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY DATE(created_at)
     ORDER BY day DESC`,
    [days]
  )
  return rows.map((r) => {
    const total = Number(r.total)
    const fallbacks = Number(r.fallbacks)
    return {
      day: toIsoDay(r.day),
      total,
      fallbacks,
      rate: total > 0 ? fallbacks / total : 0,
    }
  })
}

export type TopicRow = { topic: string; count: number }

export async function topTopics(limit: number): Promise<TopicRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT topic, COUNT(*) AS count
     FROM chat_events
     WHERE topic IS NOT NULL
     GROUP BY topic
     ORDER BY count DESC
     LIMIT ?`,
    [limit]
  )
  return rows.map((r) => ({ topic: String(r.topic), count: Number(r.count) }))
}

export type LocaleRow = { locale: string; count: number }

export async function localeSplit(days: number): Promise<LocaleRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT locale, COUNT(*) AS count
     FROM chat_events
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY locale
     ORDER BY count DESC`,
    [days]
  )
  return rows.map((r) => ({ locale: String(r.locale), count: Number(r.count) }))
}

export type ReplySourceRow = { source: string; count: number }

export async function replySourceSplit(days: number): Promise<ReplySourceRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT reply_source AS source, COUNT(*) AS count
     FROM chat_events
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY reply_source
     ORDER BY count DESC`,
    [days]
  )
  return rows.map((r) => ({ source: String(r.source), count: Number(r.count) }))
}

export type DepthRow = { bucket: string; sessions: number }

const DEPTH_BUCKET_ORDER = ['1', '2-3', '4-7', '8+'] as const

export async function sessionDepthDistribution(days: number): Promise<DepthRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT bucket, COUNT(*) AS sessions FROM (
       SELECT session_id,
         CASE
           WHEN COUNT(*) = 1 THEN '1'
           WHEN COUNT(*) BETWEEN 2 AND 3 THEN '2-3'
           WHEN COUNT(*) BETWEEN 4 AND 7 THEN '4-7'
           ELSE '8+'
         END AS bucket
       FROM chat_events
       WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       GROUP BY session_id
     ) t
     GROUP BY bucket
     ORDER BY FIELD(bucket, '1', '2-3', '4-7', '8+')`,
    [days]
  )
  const counts = new Map<string, number>(rows.map((r) => [String(r.bucket), Number(r.sessions)]))
  return DEPTH_BUCKET_ORDER.map((bucket) => ({
    bucket,
    sessions: counts.get(bucket) ?? 0,
  }))
}

export type MissRow = {
  id: number
  createdAt: string
  locale: string
  userMessage: string
}

export async function recentFallbackMisses(
  limit: number,
  offset: number
): Promise<{ rows: MissRow[]; total: number }> {
  const pool = getPool()
  const [countRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(*) AS total
     FROM chat_events
     WHERE topic IS NULL AND reply_source = 'fallback'`
  )
  const [rows] = await pool.execute<RowDataPacket[]>(
    `SELECT id, created_at, locale, user_message
     FROM chat_events
     WHERE topic IS NULL AND reply_source = 'fallback'
     ORDER BY created_at DESC
     LIMIT ? OFFSET ?`,
    [limit, offset]
  )
  return {
    total: Number(countRows[0]?.total ?? 0),
    rows: rows.map((r) => ({
      id: Number(r.id),
      createdAt: toIso(r.created_at),
      locale: String(r.locale),
      userMessage: String(r.user_message ?? ''),
    })),
  }
}

// ----- page_visits panels -----

export type ReferrerRow = { host: string; count: number }

export async function topReferrers(days: number, limit: number): Promise<ReferrerRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT referrer_host AS host, COUNT(*) AS count
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND referrer_host IS NOT NULL
       AND is_bot = 0
     GROUP BY referrer_host
     ORDER BY count DESC
     LIMIT ?`,
    [days, limit]
  )
  return rows.map((r) => ({ host: String(r.host), count: Number(r.count) }))
}

export type CountryRow = { country: string; count: number }

export async function topCountries(days: number, limit: number): Promise<CountryRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT country, COUNT(*) AS count
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND country IS NOT NULL
       AND is_bot = 0
     GROUP BY country
     ORDER BY count DESC
     LIMIT ?`,
    [days, limit]
  )
  return rows.map((r) => ({ country: String(r.country), count: Number(r.count) }))
}

export type PageRow = { path: string; count: number }

export async function topPages(days: number, limit: number): Promise<PageRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT path, COUNT(*) AS count
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND is_bot = 0
     GROUP BY path
     ORDER BY count DESC
     LIMIT ?`,
    [days, limit]
  )
  return rows.map((r) => ({ path: String(r.path), count: Number(r.count) }))
}

export type DeviceRow = { device: string; count: number }

export async function deviceSplit(days: number): Promise<DeviceRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT device, COUNT(*) AS count
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND is_bot = 0
     GROUP BY device
     ORDER BY count DESC`,
    [days]
  )
  return rows.map((r) => ({ device: String(r.device ?? 'unknown'), count: Number(r.count) }))
}

export type UtmRow = { source: string; count: number }

export async function topUtmSources(days: number, limit: number): Promise<UtmRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT utm_source AS source, COUNT(*) AS count
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND utm_source IS NOT NULL
       AND is_bot = 0
     GROUP BY utm_source
     ORDER BY count DESC
     LIMIT ?`,
    [days, limit]
  )
  return rows.map((r) => ({ source: String(r.source), count: Number(r.count) }))
}

export type ConversionStats = {
  visits: number
  chatSessions: number
  rate: number
}

export async function chatConversion(days: number): Promise<ConversionStats> {
  const pool = getPool()
  const [visitRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(DISTINCT session_id) AS c
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND is_bot = 0`,
    [days]
  )
  const [chatRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(DISTINCT pv.session_id) AS c
     FROM page_visits pv
     JOIN chat_events ce ON ce.session_id = pv.session_id
     WHERE pv.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND pv.is_bot = 0`,
    [days]
  )
  const visits = Number(visitRows[0]?.c ?? 0)
  const chatSessions = Number(chatRows[0]?.c ?? 0)
  return {
    visits,
    chatSessions,
    rate: visits > 0 ? chatSessions / visits : 0,
  }
}

export type SessionStats = {
  day: string
  sessions: number
  messages: number
  avgMessagesPerSession: number
}

export async function sessionsPerDay(days: number): Promise<SessionStats[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT
       DATE(created_at) AS day,
       COUNT(DISTINCT session_id) AS sessions,
       COUNT(*) AS messages
     FROM chat_events
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY DATE(created_at)
     ORDER BY day DESC`,
    [days]
  )
  return rows.map((r) => {
    const sessions = Number(r.sessions)
    const messages = Number(r.messages)
    return {
      day: toIsoDay(r.day),
      sessions,
      messages,
      avgMessagesPerSession: sessions > 0 ? messages / sessions : 0,
    }
  })
}
