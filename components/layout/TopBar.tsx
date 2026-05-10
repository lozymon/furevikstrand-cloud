'use client'

import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { NAV_LINKS } from '@/lib/nav'
import { profile } from '@/data/profile'
import type { Locale } from '@/types'

interface TopBarProps {
  onMenuOpen?: () => void
}

export default function TopBar({ onMenuOpen }: TopBarProps) {
  const t = useTranslations('topbar')
  const locale = useLocale()

  return (
    <header className="flex items-center justify-between gap-2 px-4 h-12 border-b border-[#252535] bg-[#161620] shrink-0 z-10">
      <div className="flex items-center gap-3 min-w-0">
        <button
          onClick={onMenuOpen}
          className="lg:hidden text-[#8888a8] hover:text-[#e2e2f0] transition-colors p-2 -ml-2 shrink-0"
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path
              d="M2 4h14M2 9h14M2 14h14"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
        </button>
        <div className="flex items-center gap-1.5 min-w-0">
          <span
            className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse shrink-0"
            aria-label={profile.availability.label[locale as Locale]}
          />
          <span className="text-xs text-[#8888a8] font-mono truncate">{t('model')}</span>
        </div>
        <span className="hidden sm:inline text-[#252535] text-xs">|</span>
        <span className="hidden sm:inline text-xs text-[#34d399] font-mono whitespace-nowrap truncate">
          {profile.availability.label[locale as Locale]}
        </span>
      </div>

      <div className="flex items-center gap-3 shrink-0">
        <LanguageSwitcher />

        {NAV_LINKS.filter((l) => l.path !== '').map((link) => (
          <Link
            key={link.path}
            href={`/${locale}/${link.path}`}
            className="hidden lg:block text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono"
          >
            {link.label}
          </Link>
        ))}

        <button
          onClick={() => window.open(`/${locale}/classic?print=true`, '_blank')}
          className="px-3 py-1 rounded border border-[#a78bfa] text-[#a78bfa] text-xs font-mono hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors whitespace-nowrap"
          aria-label={t('downloadCv')}
        >
          <span className="hidden sm:inline">{t('downloadCv')}</span>
          <span className="sm:hidden">CV</span>
        </button>
      </div>
    </header>
  )
}
