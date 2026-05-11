'use client'

import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { localizedHref, visibleNavLinks, type NavPath } from '@/lib/nav'

interface PageNavProps {
  /** Hide the link for the current page so it doesn't link to itself */
  current: NavPath
  /** 'default' = dark sidebar style · 'terminal' = green terminal style */
  variant?: 'default' | 'terminal'
}

const VARIANT_STYLES = {
  default: {
    gap: 'gap-4',
    link: 'text-xs font-mono text-[#8888a8] hover:text-[#38bdf8] transition-colors whitespace-nowrap',
  },
  terminal: {
    gap: 'gap-3',
    link: 'text-[#1a6b1a] hover:text-[#33ff33] transition-colors text-xs font-mono whitespace-nowrap',
  },
} as const

export default function PageNav({ current, variant = 'default' }: PageNavProps) {
  const locale = useLocale()
  const t = useTranslations('nav')
  const styles = VARIANT_STYLES[variant]

  return (
    <nav aria-label="Pages" className={`flex items-center ${styles.gap}`}>
      {visibleNavLinks(current).map((link) => {
        const href = localizedHref(locale, link)
        return link.external ? (
          <a
            key={link.path}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.link}
          >
            {t(link.labelKey)}
          </a>
        ) : (
          <Link key={link.path} href={href} className={styles.link}>
            {t(link.labelKey)}
          </Link>
        )
      })}
    </nav>
  )
}
