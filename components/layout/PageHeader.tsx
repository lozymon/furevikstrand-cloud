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
}

export default function PageHeader({ current, maxWidth = 'max-w-5xl', extra }: PageHeaderProps) {
  const locale = useLocale() as Locale
  const t = useTranslations('topbar')
  const router = useRouter()

  return (
    <nav className="sticky top-0 z-10 border-b border-[#252535] bg-[#0d0d10]/90 backdrop-blur-sm">
      <div className={`${maxWidth} mx-auto px-6 h-14 flex items-center justify-between`}>

        {/* Left — logo + availability */}
        <div className="flex items-center gap-3">
          <span className="text-sm font-mono text-[#a78bfa]">kim.furevikstrand</span>
          <span className="text-[#252535] text-xs">|</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-xs text-[#34d399] font-mono hidden sm:block">
            {profile.availability.label[locale]}
          </span>
        </div>

        {/* Right — language switcher + nav + print CV + optional slot */}
        <div className="flex items-center gap-4">
          <LanguageSwitcher />
          <PageNav current={current} />
          <button
            onClick={() => router.push(`/${locale}/classic?print=true`)}
            className="px-3 py-1 rounded border border-[#a78bfa] text-[#a78bfa] text-xs font-mono hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors"
          >
            {t('downloadCv')}
          </button>
          {extra}
        </div>

      </div>
    </nav>
  )
}
