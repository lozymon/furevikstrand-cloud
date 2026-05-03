'use client'

import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { getOrCreateSessionId } from '@/lib/session'

export default function PageTracker({ locale }: { locale: string }) {
  const pathname = usePathname()
  useEffect(() => {
    if (typeof window === 'undefined') return
    const body = JSON.stringify({
      session_id: getOrCreateSessionId(),
      path: pathname,
      query: window.location.search || null,
      referrer: document.referrer || null,
      locale,
    })
    try {
      const blob = new Blob([body], { type: 'application/json' })
      if (navigator.sendBeacon?.('/api/track', blob)) return
    } catch {
      // Fall through to fetch.
    }
    fetch('/api/track', {
      method: 'POST',
      body,
      headers: { 'Content-Type': 'application/json' },
      keepalive: true,
    }).catch(() => {})
  }, [pathname, locale])
  return null
}
