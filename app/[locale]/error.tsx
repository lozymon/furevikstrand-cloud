'use client'

import { useEffect } from 'react'
import Link from 'next/link'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('[error.tsx]', error)
  }, [error])

  return (
    <div className="min-h-[100dvh] flex items-center justify-center bg-[#0d0d10] text-[#e2e2f0] p-6">
      <div className="max-w-md text-center font-mono">
        <p className="text-[10px] uppercase tracking-[0.2em] text-red-400 mb-3">error</p>
        <h1 className="text-2xl font-bold mb-3">Something went wrong</h1>
        <p className="text-sm text-[#8888a8] mb-8 leading-relaxed">
          An unexpected error occurred. You can try again, or head back to the chat.
        </p>
        {error.digest && <p className="text-[10px] text-[#8888a8] mb-6">ref: {error.digest}</p>}
        <div className="flex items-center justify-center gap-2 text-xs">
          <button
            onClick={reset}
            className="px-3 py-1.5 rounded border border-[#a78bfa] text-[#a78bfa] hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors"
          >
            Try again
          </button>
          <Link
            href="/en"
            className="px-3 py-1.5 rounded border border-[#252535] text-[#8888a8] hover:border-[#a78bfa] hover:text-[#a78bfa] transition-colors"
          >
            Home
          </Link>
        </div>
      </div>
    </div>
  )
}
