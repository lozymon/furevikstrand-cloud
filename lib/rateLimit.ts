// In-memory per-IP rate limiter. Resets on process restart.
// Single-instance only — would need Redis or similar to scale horizontally.

const buckets = new Map<string, Map<string, { count: number; resetAt: number }>>()

export function checkRateLimit(
  scope: string,
  ip: string,
  limit: number,
  windowMs: number
): boolean {
  const now = Date.now()
  let bucket = buckets.get(scope)
  if (!bucket) {
    bucket = new Map()
    buckets.set(scope, bucket)
  }
  const entry = bucket.get(ip)
  if (!entry || now > entry.resetAt) {
    bucket.set(ip, { count: 1, resetAt: now + windowMs })
    return true
  }
  if (entry.count >= limit) return false
  entry.count++
  return true
}

export function clientIp(request: Request): string {
  return request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}
