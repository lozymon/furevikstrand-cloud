'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { profile } from '@/data/profile'
import { topChips } from '@/data/stack'
import type { Locale } from '@/types'

interface MobileSidebarProps {
  isOpen: boolean
  onClose: () => void
}

export default function MobileSidebar({ isOpen, onClose }: MobileSidebarProps) {
  const t = useTranslations('sidebar')
  const locale = useLocale() as Locale

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return
    const handler = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [isOpen, onClose])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/60 transition-opacity duration-300 lg:hidden ${isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        className={`fixed top-0 left-0 z-50 h-full w-72 bg-[#161620] border-r border-[#252535] flex flex-col overflow-y-auto transition-transform duration-300 ease-in-out lg:hidden ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}
        aria-label="Navigation menu"
        role="dialog"
        aria-modal="true"
      >
        {/* Close button */}
        <div className="flex items-center justify-between px-4 h-12 border-b border-[#252535] shrink-0">
          <span className="text-xs text-[#8888a8] font-mono">menu</span>
          <button
            onClick={onClose}
            className="text-[#8888a8] hover:text-[#e2e2f0] transition-colors p-1"
            aria-label="Close menu"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M2 2l12 12M14 2L2 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Profile */}
        <div className="p-5 border-b border-[#252535]">
          <div className="flex items-start gap-3">
            <div className="relative w-14 h-14 rounded-xl overflow-hidden border-2 border-[#252535] shrink-0">
              <Image
                src="/profile-image.jpeg"
                alt={profile.name}
                fill
                className="object-cover"
                sizes="56px"
              />
            </div>
            <div className="min-w-0">
              <h2 className="text-sm font-semibold text-[#e2e2f0] leading-tight">{profile.name}</h2>
              <p className="text-xs text-[#a78bfa] mt-0.5">{t('role')}</p>
              <div className="flex items-center gap-1.5 mt-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
                <span className="text-[10px] text-[#34d399] font-mono">{t('availability')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Stats */}
        <div className="p-4 border-b border-[#252535] grid grid-cols-3 gap-3">
          <Stat label={locale === 'en' ? 'Experience' : locale === 'no' ? 'Erfaring' : 'Experiência'} value={profile.stats.experience + (locale === 'no' ? ' år' : locale === 'pt' ? ' anos' : ' yrs')} />
          <Stat label={locale === 'en' ? 'Projects' : locale === 'no' ? 'Prosjekter' : 'Projetos'} value={profile.stats.projects + ''} />
          <Stat label={locale === 'en' ? 'Languages' : locale === 'no' ? 'Språk' : 'Idiomas'} value={profile.stats.languages + ''} />
        </div>

        {/* Info rows */}
        <div className="p-4 border-b border-[#252535] space-y-2">
          <InfoRow icon="📍" value={t('location')} />
          <InfoRow icon="🌐" value={t('languages')} />
        </div>

        {/* Stack chips */}
        <div className="p-4 border-b border-[#252535]">
          <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider mb-3">{t('sections.stack')}</p>
          <div className="flex flex-wrap gap-1.5">
            {topChips.map((chip) => (
              <span
                key={chip}
                className="px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#252535] text-[10px] text-[#38bdf8] font-mono"
              >
                {chip}
              </span>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="p-4">
          <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider mb-3">{t('sections.links')}</p>
          <div className="space-y-2">
            <SocialLink href={profile.github} label="GitHub" icon="⌥" />
            <SocialLink href={profile.gitlab} label="GitLab" icon="⌥" />
            <SocialLink href={profile.linkedin} label="LinkedIn" icon="⌥" />
            <SocialLink href={`mailto:${profile.email}`} label={profile.email} icon="✉" />
          </div>
        </div>
      </aside>
    </>
  )
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="text-base font-bold text-[#a78bfa]">{value}</p>
      <p className="text-[10px] text-[#8888a8] font-mono mt-0.5">{label}</p>
    </div>
  )
}

function InfoRow({ icon, value }: { icon: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <span className="text-xs">{icon}</span>
      <span className="text-xs text-[#8888a8] font-mono">{value}</span>
    </div>
  )
}

function SocialLink({ href, label, icon }: { href: string; label: string; icon: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="flex items-center gap-2 text-xs text-[#8888a8] hover:text-[#38bdf8] transition-colors font-mono group"
    >
      <span className="text-[#252535] group-hover:text-[#38bdf8] transition-colors">{icon}</span>
      <span className="truncate">{label}</span>
    </a>
  )
}
