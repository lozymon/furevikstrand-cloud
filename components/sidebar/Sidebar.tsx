import { useTranslations, useLocale } from 'next-intl'
import Image from 'next/image'
import { profile } from '@/data/profile'
import { topChips } from '@/data/stack'
import { education } from '@/data/education'
import TestimonialsCarousel from '@/components/sidebar/TestimonialsCarousel'
import type { Locale } from '@/types'

export default function Sidebar() {
  const t = useTranslations('sidebar')
  const locale = useLocale() as Locale

  return (
    <aside className="hidden lg:flex w-72 shrink-0 border-r border-[#252535] bg-[#161620] flex-col overflow-y-auto">
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
              priority
            />
          </div>
          <div className="min-w-0">
            <h1 className="text-sm font-semibold text-[#e2e2f0] leading-tight">{profile.name}</h1>
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
      </div>

      {/* Language proficiency */}
      <div className="p-4 border-b border-[#252535]">
        <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider mb-3">
          {locale === 'no' ? 'Språk' : locale === 'pt' ? 'Idiomas' : 'Languages'}
        </p>
        <div className="space-y-2">
          <LangBadge flag="🇳🇴" lang="Norwegian" level={locale === 'no' ? 'Morsmål' : locale === 'pt' ? 'Nativo' : 'Native'} />
          <LangBadge flag="🇬🇧" lang="English" level={locale === 'no' ? 'Profesjonell' : locale === 'pt' ? 'Profissional' : 'Professional'} />
          <LangBadge flag="🇧🇷" lang="Portuguese" level={locale === 'no' ? 'Profesjonell' : locale === 'pt' ? 'Profissional' : 'Professional'} />
        </div>
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

      {/* Education */}
      <div className="p-4 border-b border-[#252535]">
        <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider mb-3">
          {locale === 'no' ? 'Utdanning' : locale === 'pt' ? 'Educação' : 'Education'}
        </p>
        {education.filter((e) => e.country === 'br').map((ed) => (
          <div key={ed.school}>
            <p className="text-xs text-[#e2e2f0]">{ed.school}</p>
            <p className="text-[10px] text-[#8888a8] font-mono mt-0.5">{ed.degree} · {ed.period}</p>
          </div>
        ))}
      </div>

      {/* Testimonials */}
      <TestimonialsCarousel locale={locale} />

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

function LangBadge({ flag, lang, level }: { flag: string; lang: string; level: string }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">{flag}</span>
        <span className="text-xs text-[#8888a8] font-mono">{lang}</span>
      </div>
      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#252535] bg-[#1e1e2e] text-[#38bdf8]">{level}</span>
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
