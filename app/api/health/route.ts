import { NextResponse } from 'next/server'
import { getPool } from '@/lib/db'

const DB_PING_TIMEOUT_MS = 1500

type DbStatus = 'ok' | 'down' | 'disabled'

async function checkDb(): Promise<DbStatus> {
  if (!process.env.DATABASE_URL) return 'disabled'
  let timeoutId: NodeJS.Timeout | undefined
  try {
    await Promise.race([
      getPool().query('SELECT 1'),
      new Promise((_, reject) => {
        timeoutId = setTimeout(
          () => reject(new Error(`db ping timed out after ${DB_PING_TIMEOUT_MS}ms`)),
          DB_PING_TIMEOUT_MS
        )
      }),
    ])
    return 'ok'
  } catch (err) {
    console.warn('[health] db check failed:', err instanceof Error ? err.message : err)
    return 'down'
  } finally {
    if (timeoutId) clearTimeout(timeoutId)
  }
}

// Always 200 — Docker's HEALTHCHECK only cares about exit code, and the service
// is still serving requests when MySQL is down (logging is best-effort). The db
// field is for ops visibility into whether chat_events writes are landing.
export async function GET() {
  const db = await checkDb()
  return NextResponse.json({ status: 'ok', db, ts: Date.now() })
}
