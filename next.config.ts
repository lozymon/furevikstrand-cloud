import type { NextConfig } from 'next'
import bundleAnalyzer from '@next/bundle-analyzer'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./i18n/request.ts')

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
})

const isDev = process.env.NODE_ENV !== 'production'

// Inline scripts/styles are required by Next runtime, next-intl hydration,
// the JSON-LD block in app/[locale]/layout.tsx, and framer-motion / tailwind.
// Switching to nonces would require fully dynamic rendering.
const csp = [
  `default-src 'self'`,
  `script-src 'self' 'unsafe-inline'${isDev ? " 'unsafe-eval'" : ''}`,
  `style-src 'self' 'unsafe-inline'`,
  `img-src 'self' data: blob:`,
  `font-src 'self' data:`,
  `connect-src 'self'${isDev ? ' ws: wss:' : ''}`,
  `frame-ancestors 'none'`,
  `base-uri 'self'`,
  `form-action 'self'`,
  `object-src 'none'`,
  `upgrade-insecure-requests`,
].join('; ')

const securityHeaders = [
  { key: 'Content-Security-Policy', value: csp },
  { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
  { key: 'X-Content-Type-Options', value: 'nosniff' },
  { key: 'X-Frame-Options', value: 'DENY' },
  { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
  {
    key: 'Permissions-Policy',
    value: 'camera=(), microphone=(), geolocation=(), interest-cohort=(), browsing-topics=()',
  },
]

const nextConfig: NextConfig = {
  output: 'standalone',
  // geoip-lite resolves its data files relative to its own module location,
  // which Turbopack rewrites during page-data collection. Keep it external
  // and force-include the data files in the standalone output.
  serverExternalPackages: ['geoip-lite'],
  outputFileTracingIncludes: {
    '/api/track': ['./node_modules/geoip-lite/data/**'],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ]
  },
}

export default withBundleAnalyzer(withNextIntl(nextConfig))
