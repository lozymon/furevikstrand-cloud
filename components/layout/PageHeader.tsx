'use client'

import { useLocale, useTranslations } from 'next-intl'
import { useRouter } from 'next/navigation'
import PageNav from './PageNav'
import LanguageSwitcher from './LanguageSwitcher'
import { profile } from '@/data/profile'
import type { Locale } from '@/types'

interface PageHeaderProps {
  current: string
  maxWidth?: string
  extra?: React.ReactNode
  /** Per-locale path overrides forwarded to the language switcher. */
  localeOverrides?: Partial<Record<string, string>>
}

export default function PageHeader({
  current,
  maxWidth = 'max-w-5xl',
  extra,
  localeOverrides,
}: PageHeaderProps) {
  const locale = useLocale() as Locale
  const t = useTranslations('topbar')
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-10 border-b border-[#252535] bg-[#0d0d10]/90 backdrop-blur-sm">
      <div
        className={`${maxWidth} mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2`}
      >
        {/* Left — logo + availability */}
        <div className="flex items-center gap-3 min-w-0">
          <span className="text-sm font-mono text-[#a78bfa] truncate">kim.furevikstrand</span>
          <span className="hidden sm:inline text-[#252535] text-xs">|</span>
          <span
            className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse shrink-0"
            aria-label={profile.availability.label[locale]}
          />
          <span className="text-xs text-[#34d399] font-mono hidden sm:block whitespace-nowrap truncate">
            {profile.availability.label[locale]}
          </span>
        </div>

        {/* Right — language switcher + nav + print CV + optional slot */}
        <div className="flex items-center gap-3 sm:gap-4 shrink-0">
          <LanguageSwitcher localeOverrides={localeOverrides} />
          <div className="hidden lg:block">
            <PageNav current={current} />
          </div>
          <button
            onClick={() => router.push(`/${locale}/classic?print=true`)}
            className="px-3 py-1 rounded border border-[#a78bfa] text-[#a78bfa] text-xs font-mono hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors whitespace-nowrap"
            aria-label={t('downloadCv')}
          >
            <span className="hidden sm:inline">{t('downloadCv')}</span>
            <span className="sm:hidden">CV</span>
          </button>
          {extra}
        </div>
      </div>
    </nav>
  )
}
