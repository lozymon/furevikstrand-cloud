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

// ----- blog panels -----
//
// Citation aggregation per the C1 decision: matching slugs across locales
// count as the same post. Locale prefix is stripped during aggregation.

const BLOG_PATH_REGEX = '^/(en|no|pt)/blog'
const BLOG_SLUG_REGEX = /^\/(en|no|pt)\/blog\/([a-z0-9-]+)/

function aggregateBySlug(
  rows: Array<{ key: string; count: number }>,
  limit: number
): Array<{ slug: string; count: number }> {
  const tally = new Map<string, number>()
  for (const r of rows) {
    const match = r.key.match(BLOG_SLUG_REGEX)
    if (!match) continue
    const slug = match[2]
    tally.set(slug, (tally.get(slug) ?? 0) + r.count)
  }
  return Array.from(tally.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
}

export type BlogPostRow = { slug: string; views: number }

export async function topBlogPosts(days: number, limit: number): Promise<BlogPostRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT path, COUNT(*) AS count
     FROM page_visits
     WHERE path REGEXP ?
       AND is_bot = 0
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY path`,
    [BLOG_PATH_REGEX + '/[a-z0-9-]+', days]
  )
  return aggregateBySlug(
    rows.map((r) => ({ key: String(r.path), count: Number(r.count) })),
    limit
  ).map(({ slug, count }) => ({ slug, views: count }))
}

export type BlogTrafficShare = { total: number; blog: number; rate: number }

export async function blogTrafficShare(days: number): Promise<BlogTrafficShare> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT
       COUNT(*) AS total,
       SUM(CASE WHEN path REGEXP ? THEN 1 ELSE 0 END) AS blog
     FROM page_visits
     WHERE created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
       AND is_bot = 0`,
    [BLOG_PATH_REGEX, days]
  )
  const total = Number(rows[0]?.total ?? 0)
  const blog = Number(rows[0]?.blog ?? 0)
  return { total, blog, rate: total > 0 ? blog / total : 0 }
}

export type BlogLocaleRow = { locale: string; count: number }

export async function blogLocaleSplit(days: number): Promise<BlogLocaleRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT locale, COUNT(*) AS count
     FROM page_visits
     WHERE path REGEXP ?
       AND locale IS NOT NULL
       AND is_bot = 0
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY locale
     ORDER BY count DESC`,
    [BLOG_PATH_REGEX, days]
  )
  return rows.map((r) => ({ locale: String(r.locale), count: Number(r.count) }))
}

export type BlogReferrerRow = { host: string; count: number }

export async function blogReferrers(days: number, limit: number): Promise<BlogReferrerRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT referrer_host AS host, COUNT(*) AS count
     FROM page_visits
     WHERE path REGEXP ?
       AND referrer_host IS NOT NULL
       AND is_bot = 0
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)
     GROUP BY referrer_host
     ORDER BY count DESC
     LIMIT ?`,
    [BLOG_PATH_REGEX, days, limit]
  )
  return rows.map((r) => ({ host: String(r.host), count: Number(r.count) }))
}

export type BlogChatConversion = { blogVisitors: number; chattedAfter: number; rate: number }

export async function blogChatConversion(days: number): Promise<BlogChatConversion> {
  const pool = getPool()
  const [visitorRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(DISTINCT session_id) AS c
     FROM page_visits
     WHERE path REGEXP ?
       AND is_bot = 0
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [BLOG_PATH_REGEX, days]
  )
  const [chatRows] = await pool.execute<RowDataPacket[]>(
    `SELECT COUNT(DISTINCT pv.session_id) AS c
     FROM page_visits pv
     JOIN chat_events ce
       ON ce.session_id = pv.session_id
      AND ce.created_at > pv.created_at
     WHERE pv.path REGEXP ?
       AND pv.is_bot = 0
       AND pv.created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [BLOG_PATH_REGEX, days]
  )
  const blogVisitors = Number(visitorRows[0]?.c ?? 0)
  const chattedAfter = Number(chatRows[0]?.c ?? 0)
  return {
    blogVisitors,
    chattedAfter,
    rate: blogVisitors > 0 ? chattedAfter / blogVisitors : 0,
  }
}

export type BlogCitationRow = { slug: string; count: number }

export async function blogChatCitations(days: number, limit: number): Promise<BlogCitationRow[]> {
  const [rows] = await getPool().execute<RowDataPacket[]>(
    `SELECT ai_reply
     FROM chat_events
     WHERE ai_reply LIKE '%/blog/%'
       AND created_at >= DATE_SUB(NOW(), INTERVAL ? DAY)`,
    [days]
  )
  // Extract distinct slugs per reply (so a reply linking the same post twice
  // counts once); aggregate across all replies, dropping locale prefix.
  const tally = new Map<string, number>()
  const slugRegex = /\/(?:en|no|pt)?\/?blog\/([a-z0-9-]+)/g
  for (const row of rows) {
    const reply = String(row.ai_reply ?? '')
    const seen = new Set<string>()
    for (const match of reply.matchAll(slugRegex)) {
      seen.add(match[1])
    }
    for (const slug of seen) {
      tally.set(slug, (tally.get(slug) ?? 0) + 1)
    }
  }
  return Array.from(tally.entries())
    .map(([slug, count]) => ({ slug, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, limit)
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
