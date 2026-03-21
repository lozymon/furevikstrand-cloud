'use client'

import Link from 'next/link'
import { useLocale } from 'next-intl'

interface NavLink {
  label: string
  path: string   // relative to locale, e.g. '' for chat, 'classic', 'testimonials'
  external?: boolean
}

// ─── Add new pages here — all navs update automatically ──────────────────────
const NAV_LINKS: NavLink[] = [
  { label: '← chat',         path: ''               },
  { label: '/classic',       path: 'classic'        },
  { label: '/dev',           path: 'dev'            },
  { label: '/testimonials',  path: 'testimonials'   },
  { label: '/certifications',path: 'certifications' },
]

interface PageNavProps {
  /** Hide the link for the current page so it doesn't link to itself */
  current: string
  /** 'default' = dark sidebar style · 'terminal' = green terminal style */
  variant?: 'default' | 'terminal'
  /** Show CV download button (default true) */
  showCv?: boolean
}

export default function PageNav({ current, variant = 'default', showCv = true }: PageNavProps) {
  const locale = useLocale()

  const linkClass =
    variant === 'terminal'
      ? 'text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs font-mono'
      : 'text-xs font-mono text-[#8888a8] hover:text-[#38bdf8] transition-colors'

  const cvClass =
    variant === 'terminal'
      ? 'text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs font-mono'
      : 'px-3 py-1 rounded border border-[#a78bfa] text-[#a78bfa] text-xs font-mono hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors'

  const cvLabel = variant === 'terminal' ? 'cv.pdf' : 'CV ↓'

  return (
    <div className="flex items-center gap-4">
      {NAV_LINKS.filter((l) => l.path !== current).map((link) => (
        <Link
          key={link.path}
          href={`/${locale}${link.path ? `/${link.path}` : ''}`}
          className={linkClass}
        >
          {link.label}
        </Link>
      ))}
      {showCv && (
        <a
          href="/cv-kim-furevikstrand.pdf"
          download
          className={cvClass}
        >
          {cvLabel}
        </a>
      )}
    </div>
  )
}
