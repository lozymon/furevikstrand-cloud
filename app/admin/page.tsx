import Link from 'next/link'
import {
  fallbackRateOverTime,
  topTopics,
  localeSplit,
  replySourceSplit,
  sessionDepthDistribution,
  recentFallbackMisses,
  sessionsPerDay,
  type DailyFallbackRow,
  type TopicRow,
  type LocaleRow,
  type ReplySourceRow,
  type DepthRow,
  type SessionStats,
  type MissRow,
} from '@/lib/admin/queries'
import { redactPII } from '@/lib/admin/redact'
import '../globals.css'

export const dynamic = 'force-dynamic'
export const revalidate = 0

const DAYS_WINDOW = 30
const TOPICS_LIMIT = 15
const MISSES_PAGE_SIZE = 20

type PanelResult<T> = { ok: true; value: T } | { ok: false; error: string }

async function safe<T>(p: Promise<T>): Promise<PanelResult<T>> {
  try {
    return { ok: true, value: await p }
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) }
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ offset?: string }>
}) {
  const dbConfigured = Boolean(process.env.DATABASE_URL)
  const { offset: offsetParam } = await searchParams
  const offset = Math.max(0, Number.parseInt(offsetParam ?? '0', 10) || 0)

  const [fallback, topics, locales, sources, depth, sessions, misses] = dbConfigured
    ? await Promise.all([
        safe(fallbackRateOverTime(DAYS_WINDOW)),
        safe(topTopics(TOPICS_LIMIT)),
        safe(localeSplit(DAYS_WINDOW)),
        safe(replySourceSplit(DAYS_WINDOW)),
        safe(sessionDepthDistribution(DAYS_WINDOW)),
        safe(sessionsPerDay(DAYS_WINDOW)),
        safe(recentFallbackMisses(MISSES_PAGE_SIZE, offset)),
      ])
    : ([null, null, null, null, null, null, null] as const)

  return (
    <html lang="en">
      <body
        className="bg-[#0d0d10] text-[#e2e2f0] min-h-[100dvh]"
        style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}
      >
        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
          <header className="mb-8 flex items-baseline justify-between gap-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-[#a78bfa] mb-1">/admin</p>
              <h1 className="text-xl sm:text-2xl font-bold">chat_events dashboard</h1>
            </div>
            <Link
              href="/en"
              className="text-xs text-[#8888a8] hover:text-[#a78bfa] transition-colors"
            >
              ← site
            </Link>
          </header>

          {!dbConfigured ? (
            <NoDb />
          ) : (
            <div className="grid gap-6">
              <Panel title={`Fallback rate — last ${DAYS_WINDOW} days`} result={fallback}>
                {(rows) => <FallbackTable rows={rows} />}
              </Panel>

              <div className="grid gap-6 md:grid-cols-2">
                <Panel title={`Reply source — last ${DAYS_WINDOW} days`} result={sources}>
                  {(rows) => <ReplySourceTable rows={rows} />}
                </Panel>
                <Panel title={`Locale split — last ${DAYS_WINDOW} days`} result={locales}>
                  {(rows) => <LocaleTable rows={rows} />}
                </Panel>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <Panel title="Top topics" result={topics}>
                  {(rows) => <TopicsTable rows={rows} />}
                </Panel>
                <Panel title={`Session depth — last ${DAYS_WINDOW} days`} result={depth}>
                  {(rows) => <DepthTable rows={rows} />}
                </Panel>
              </div>

              <Panel title={`Sessions per day — last ${DAYS_WINDOW} days`} result={sessions}>
                {(rows) => <SessionsTable rows={rows} />}
              </Panel>

              <Panel title="Recent fallback misses (topic IS NULL)" result={misses}>
                {(data) => (
                  <MissesTable
                    rows={data.rows}
                    total={data.total}
                    offset={offset}
                    pageSize={MISSES_PAGE_SIZE}
                  />
                )}
              </Panel>
            </div>
          )}
        </main>
      </body>
    </html>
  )
}

function NoDb() {
  return (
    <div className="rounded border border-[#252535] bg-[#161620] p-6">
      <p className="text-sm text-[#8888a8]">
        <code className="text-[#a78bfa]">DATABASE_URL</code> is not set in this environment, so no
        chat events are being logged. Configure it and redeploy to see analytics here.
      </p>
    </div>
  )
}

function Panel<T>({
  title,
  result,
  children,
}: {
  title: string
  result: PanelResult<T> | null
  children: (value: T) => React.ReactNode
}) {
  return (
    <section className="rounded border border-[#252535] bg-[#161620]">
      <header className="px-4 py-3 border-b border-[#252535]">
        <h2 className="text-xs uppercase tracking-[0.15em] text-[#8888a8]">{title}</h2>
      </header>
      <div className="p-4 overflow-x-auto">
        {result === null ? (
          <Empty />
        ) : result.ok ? (
          children(result.value)
        ) : (
          <PanelError message={result.error} />
        )}
      </div>
    </section>
  )
}

function Empty() {
  return <p className="text-xs text-[#8888a8]">No data.</p>
}

function PanelError({ message }: { message: string }) {
  return (
    <p className="text-xs text-[#f87171]">
      Query failed: <span className="text-[#8888a8]">{message}</span>
    </p>
  )
}

function FallbackTable({ rows }: { rows: DailyFallbackRow[] }) {
  if (rows.length === 0) return <Empty />
  return (
    <table className="w-full text-xs">
      <thead>
        <Tr head>
          <Th>Day</Th>
          <Th align="right">Total</Th>
          <Th align="right">Fallbacks</Th>
          <Th align="right">Rate</Th>
        </Tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <Tr key={r.day}>
            <Td>{r.day}</Td>
            <Td align="right">{r.total}</Td>
            <Td align="right">{r.fallbacks}</Td>
            <Td align="right">
              <span className={r.rate > 0.3 ? 'text-[#f87171]' : 'text-[#34d399]'}>
                {(r.rate * 100).toFixed(1)}%
              </span>
            </Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function TopicsTable({ rows }: { rows: TopicRow[] }) {
  if (rows.length === 0) return <Empty />
  const max = rows[0]?.count ?? 1
  return (
    <table className="w-full text-xs">
      <tbody>
        {rows.map((r) => (
          <Tr key={r.topic}>
            <Td>{r.topic}</Td>
            <Td align="right" width="60px">
              {r.count}
            </Td>
            <Td>
              <Bar fraction={r.count / max} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function LocaleTable({ rows }: { rows: LocaleRow[] }) {
  if (rows.length === 0) return <Empty />
  const total = rows.reduce((sum, r) => sum + r.count, 0)
  return (
    <table className="w-full text-xs">
      <tbody>
        {rows.map((r) => (
          <Tr key={r.locale}>
            <Td>{r.locale}</Td>
            <Td align="right" width="60px">
              {r.count}
            </Td>
            <Td align="right" width="60px" muted>
              {total > 0 ? ((r.count / total) * 100).toFixed(1) : '0.0'}%
            </Td>
            <Td>
              <Bar fraction={total > 0 ? r.count / total : 0} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function ReplySourceTable({ rows }: { rows: ReplySourceRow[] }) {
  if (rows.length === 0) return <Empty />
  const total = rows.reduce((sum, r) => sum + r.count, 0)
  const colorFor = (source: string) =>
    source === 'fallback'
      ? 'text-[#f87171]'
      : source === 'claude'
        ? 'text-[#34d399]'
        : 'text-[#a78bfa]'
  return (
    <table className="w-full text-xs">
      <tbody>
        {rows.map((r) => (
          <Tr key={r.source}>
            <Td>
              <span className={colorFor(r.source)}>{r.source}</span>
            </Td>
            <Td align="right" width="60px">
              {r.count}
            </Td>
            <Td align="right" width="60px" muted>
              {total > 0 ? ((r.count / total) * 100).toFixed(1) : '0.0'}%
            </Td>
            <Td>
              <Bar fraction={total > 0 ? r.count / total : 0} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function DepthTable({ rows }: { rows: DepthRow[] }) {
  const total = rows.reduce((sum, r) => sum + r.sessions, 0)
  if (total === 0) return <Empty />
  return (
    <table className="w-full text-xs">
      <thead>
        <Tr head>
          <Th>Messages</Th>
          <Th align="right">Sessions</Th>
          <Th align="right">Share</Th>
          <Th>{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <Tr key={r.bucket}>
            <Td>{r.bucket}</Td>
            <Td align="right" width="60px">
              {r.sessions}
            </Td>
            <Td align="right" width="60px" muted>
              {((r.sessions / total) * 100).toFixed(1)}%
            </Td>
            <Td>
              <Bar fraction={r.sessions / total} />
            </Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function SessionsTable({ rows }: { rows: SessionStats[] }) {
  if (rows.length === 0) return <Empty />
  return (
    <table className="w-full text-xs">
      <thead>
        <Tr head>
          <Th>Day</Th>
          <Th align="right">Sessions</Th>
          <Th align="right">Messages</Th>
          <Th align="right">Avg msgs/session</Th>
        </Tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <Tr key={r.day}>
            <Td>{r.day}</Td>
            <Td align="right">{r.sessions}</Td>
            <Td align="right">{r.messages}</Td>
            <Td align="right">{r.avgMessagesPerSession.toFixed(1)}</Td>
          </Tr>
        ))}
      </tbody>
    </table>
  )
}

function MissesTable({
  rows,
  total,
  offset,
  pageSize,
}: {
  rows: MissRow[]
  total: number
  offset: number
  pageSize: number
}) {
  if (rows.length === 0 && offset === 0) {
    return (
      <p className="text-xs text-[#34d399]">
        No fallback misses recorded — the keyword tier is hitting a topic on every request.
      </p>
    )
  }
  const showing = `${offset + 1}–${offset + rows.length} of ${total}`
  const prevOffset = Math.max(0, offset - pageSize)
  const nextOffset = offset + pageSize
  const hasPrev = offset > 0
  const hasNext = nextOffset < total

  return (
    <div>
      <table className="w-full text-xs">
        <thead>
          <Tr head>
            <Th>When</Th>
            <Th>Loc</Th>
            <Th>Message</Th>
          </Tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <Tr key={r.id}>
              <Td muted nowrap>
                {r.createdAt.replace('T', ' ').slice(0, 19)}
              </Td>
              <Td muted>{r.locale}</Td>
              <Td>
                <span className="break-words">{redactPII(r.userMessage)}</span>
              </Td>
            </Tr>
          ))}
        </tbody>
      </table>
      <div className="mt-3 flex items-center justify-between text-[11px] text-[#8888a8]">
        <span>{showing}</span>
        <span className="flex gap-3">
          {hasPrev ? (
            <Link
              href={`/admin?offset=${prevOffset}`}
              className="hover:text-[#a78bfa] transition-colors"
            >
              ← prev
            </Link>
          ) : (
            <span className="opacity-30">← prev</span>
          )}
          {hasNext ? (
            <Link
              href={`/admin?offset=${nextOffset}`}
              className="hover:text-[#a78bfa] transition-colors"
            >
              next →
            </Link>
          ) : (
            <span className="opacity-30">next →</span>
          )}
        </span>
      </div>
    </div>
  )
}

function Tr({ head, children }: { head?: boolean; children: React.ReactNode }) {
  return (
    <tr className={head ? 'border-b border-[#252535]' : 'border-b border-[#1e1e2e] last:border-0'}>
      {children}
    </tr>
  )
}

function Th({ children, align }: { children: React.ReactNode; align?: 'left' | 'right' }) {
  return (
    <th
      className={`py-2 px-2 font-normal text-[10px] uppercase tracking-[0.1em] text-[#8888a8] ${
        align === 'right' ? 'text-right' : 'text-left'
      }`}
    >
      {children}
    </th>
  )
}

function Td({
  children,
  align,
  width,
  muted,
  nowrap,
}: {
  children: React.ReactNode
  align?: 'left' | 'right'
  width?: string
  muted?: boolean
  nowrap?: boolean
}) {
  return (
    <td
      className={`py-2 px-2 align-top ${align === 'right' ? 'text-right' : 'text-left'} ${
        muted ? 'text-[#8888a8]' : ''
      } ${nowrap ? 'whitespace-nowrap' : ''}`}
      style={width ? { width } : undefined}
    >
      {children}
    </td>
  )
}

function Bar({ fraction }: { fraction: number }) {
  const pct = Math.max(0, Math.min(1, fraction)) * 100
  return (
    <div className="h-1.5 bg-[#1e1e2e] rounded overflow-hidden">
      <div className="h-full bg-[#a78bfa]" style={{ width: `${pct}%` }} />
    </div>
  )
}
