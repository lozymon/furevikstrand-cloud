import Link from 'next/link'
import './globals.css'

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="bg-[#0d0d10] text-[#e2e2f0]" style={{ fontFamily: "'JetBrains Mono', ui-monospace, monospace" }}>
        <div className="min-h-[100dvh] flex items-center justify-center p-6">
          <div className="max-w-md text-center">
            <p className="text-[10px] uppercase tracking-[0.2em] text-[#a78bfa] mb-3">404</p>
            <h1 className="text-2xl font-bold mb-3">Page not found</h1>
            <p className="text-sm text-[#8888a8] mb-8 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist (or has moved).
            </p>
            <div className="flex items-center justify-center gap-2 text-xs">
              <Link href="/en" className="px-3 py-1.5 rounded border border-[#a78bfa] text-[#a78bfa] hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors">EN</Link>
              <Link href="/no" className="px-3 py-1.5 rounded border border-[#252535] text-[#8888a8] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors">NO</Link>
              <Link href="/pt" className="px-3 py-1.5 rounded border border-[#252535] text-[#8888a8] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors">PT</Link>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}
