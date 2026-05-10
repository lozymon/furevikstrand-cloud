'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'
import { NAV_LINKS } from '@/lib/nav'

interface PageNavProps {
  /** Hide the link for the current page so it doesn't link to itself */
  current: string
  /** 'default' = dark sidebar style · 'terminal' = green terminal style */
  variant?: 'default' | 'terminal'
}

export default function PageNav({ current, variant = 'default' }: PageNavProps) {
  const locale = useLocale()

  const linkClass =
    variant === 'terminal'
      ? 'text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs font-mono whitespace-nowrap'
      : 'text-xs font-mono text-[#8888a8] hover:text-[#38bdf8] transition-colors whitespace-nowrap'

  return (
    <div className={`flex items-center ${variant === 'terminal' ? 'gap-3' : 'gap-4'}`}>
      {NAV_LINKS.filter((l) => l.path !== current).map((link) => (
        <Link
          key={link.path}
          href={`/${locale}${link.path ? `/${link.path}` : ''}`}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
    </div>
  )
}
