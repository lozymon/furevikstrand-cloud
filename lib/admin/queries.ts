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
