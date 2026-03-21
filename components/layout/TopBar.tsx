import { useTranslations, useLocale } from 'next-intl'
import Link from 'next/link'
import LanguageSwitcher from './LanguageSwitcher'
import { profile } from '@/data/profile'

interface TopBarProps {
  onMenuOpen?: () => void
}

export default function TopBar({ onMenuOpen }: TopBarProps) {
  const t = useTranslations('topbar')
  const locale = useLocale()

  return (
    <header className="flex items-center justify-between px-4 h-12 border-b border-[#252535] bg-[#161620] shrink-0 z-10">
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuOpen}
          className="lg:hidden text-[#8888a8] hover:text-[#e2e2f0] transition-colors p-1 -ml-1"
          aria-label="Open menu"
        >
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
            <path d="M2 4h14M2 9h14M2 14h14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-[#34d399] animate-pulse" />
          <span className="text-xs text-[#8888a8] font-mono">{t('model')}</span>
        </div>
        <span className="text-[#252535] text-xs">|</span>
        <span className="text-xs text-[#34d399] font-mono">{t('status')}</span>
      </div>

      <div className="flex items-center gap-3">
        <LanguageSwitcher />

        <Link href={`/${locale}/classic`} className="hidden sm:block text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono" aria-label="Classic layout">
          /classic
        </Link>
        <Link href={`/${locale}/dev`} className="hidden sm:block text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono" aria-label="Dev layout">
          /dev
        </Link>
        <Link href={`/${locale}/testimonials`} className="hidden sm:block text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono" aria-label="Testimonials">
          /testimonials
        </Link>

        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono"
          aria-label="GitHub profile"
        >
          {t('github')}
        </a>

        <a
          href={profile.gitlab}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono"
          aria-label="GitLab profile"
        >
          {t('gitlab')}
        </a>

        <a
          href="/cv-kim-furevikstrand.pdf"
          download
          className="px-3 py-1 rounded border border-[#a78bfa] text-[#a78bfa] text-xs font-mono hover:bg-[#a78bfa] hover:text-[#0d0d10] transition-colors"
          aria-label="Download CV PDF"
        >
          {t('downloadCv')}
        </a>
      </div>
    </header>
  )
}
