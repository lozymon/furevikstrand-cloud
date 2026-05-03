import createMiddleware from 'next-intl/middleware'
import { NextResponse, type NextRequest } from 'next/server'
import { routing } from './i18n/routing'

const intlMiddleware = createMiddleware(routing)

// Constant-time string compare to avoid leaking creds via timing.
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false
  let mismatch = 0
  for (let i = 0; i < a.length; i++) {
    mismatch |= a.charCodeAt(i) ^ b.charCodeAt(i)
  }
  return mismatch === 0
}

function isAdminAuthorized(req: NextRequest, user: string, pass: string): boolean {
  const header = req.headers.get('authorization')
  if (!header?.startsWith('Basic ')) return false
  let decoded: string
  try {
    decoded = atob(header.slice(6))
  } catch {
    return false
  }
  const sep = decoded.indexOf(':')
  if (sep < 0) return false
  const reqUser = decoded.slice(0, sep)
  const reqPass = decoded.slice(sep + 1)
  return timingSafeEqual(reqUser, user) && timingSafeEqual(reqPass, pass)
}

export default function proxy(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/admin')) {
    const user = process.env.ADMIN_USER
    const pass = process.env.ADMIN_PASS
    // 404 when unconfigured so the route isn't discoverable.
    if (!user || !pass) {
      return new NextResponse('Not Found', { status: 404 })
    }
    if (!isAdminAuthorized(req, user, pass)) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: { 'WWW-Authenticate': 'Basic realm="admin", charset="UTF-8"' },
      })
    }
    return NextResponse.next()
  }
  return intlMiddleware(req)
}

export const config = {
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)'],
}
