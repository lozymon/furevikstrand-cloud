'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { stack } from '@/data/stack'
import { certifications } from '@/data/certifications'
import { education } from '@/data/education'
import { testimonials } from '@/data/testimonials'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

type ExpGroup = {
  company: string
  location: string
  overallPeriod: string
  entries: typeof experience
}

export default function ClassicPage() {
  const locale = useLocale() as Locale
  const searchParams = useSearchParams()

  useEffect(() => {
    if (searchParams.get('print') === 'true') {
      const timer = setTimeout(() => window.print(), 800)
      return () => clearTimeout(timer)
    }
  }, [searchParams])

  // Group consecutive same-company experience entries
  const expGroups: ExpGroup[] = []
  for (const job of experience) {
    const last = expGroups[expGroups.length - 1]
    if (last && last.company === job.company) {
      last.entries.push(job)
      const olderStart = job.period.split('—')[0].trim()
      const newerEnd = last.overallPeriod.split('—')[1]?.trim() ?? 'Present'
      last.overallPeriod = `${olderStart} — ${newerEnd}`
    } else {
      expGroups.push({ company: job.company, location: job.location, overallPeriod: job.period, entries: [job] })
    }
  }

  const highlighted = projects.filter((p) => p.highlight)

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0] font-mono text-[11px] leading-relaxed">

      <div className="print:hidden">
        <PageHeader current="classic" />
      </div>

      <div className="max-w-[820px] mx-auto px-11 py-10">

        {/* ── Header ─────────────────────────────────────────────── */}
        <header className="grid grid-cols-[1fr_auto] gap-6 pb-[22px] border-b border-[#252535] mb-[26px]">
          <div className="flex items-start gap-4">
            <div className="relative w-[70px] h-[70px] rounded-xl overflow-hidden border-2 border-[#252535] shrink-0 print:hidden">
              <Image src="/profile-image.jpeg" alt={profile.name} fill className="object-cover" sizes="70px" priority />
            </div>
            <div>
            <h1 className="text-[26px] font-bold tracking-tight leading-none">
              Kim Andrè <span className="text-[#a78bfa]">Furevikstrand</span>
            </h1>
            <p className="text-[12px] text-[#38bdf8] mt-[5px] leading-snug">
              {profile.role[locale]} · Node.js &amp; React · Microservices &amp; TypeScript
            </p>
            <div className="inline-flex items-center gap-1.5 mt-[9px] px-[10px] py-1 rounded-full text-[10px] text-[#34d399] border border-[#34d399]/25 bg-[#34d399]/5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399] shrink-0" />
              {profile.availability.label[locale]}
            </div>
            </div>
          </div>
          <div className="flex flex-col gap-[5px] items-end text-right">
            <ContactItem label="Email"    value={profile.email} />
            <ContactItem label="Phone"    value={profile.phone} />
            <ContactItem label="Web"      value="furevikstrand.cloud" />
            <ContactItem label="GitHub"   value="github.com/lozymon" />
            <ContactItem label="LinkedIn" value="linkedin.com/in/kim-andre-furevikstrand" />
            <ContactItem label={locale === 'no' ? 'Sted' : locale === 'pt' ? 'Local' : 'Location'}
              value={locale === 'no' ? 'Natal, Brasil / Åpen for Norge' : locale === 'pt' ? 'Natal, Brasil / Aberto à Noruega' : 'Natal, Brazil / Open to Norway'} />
          </div>
        </header>

        {/* ── Body ───────────────────────────────────────────────── */}
        <div className="grid grid-cols-[1fr_245px] gap-7 items-start">

          {/* Left column */}
          <div>

            {/* About */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Om meg' : locale === 'pt' ? 'Sobre' : 'About'}</SectionTitle>
              <p className="text-[10.5px] text-[#8888a8] leading-[1.8]">{profile.bio[locale]}</p>
            </section>

            {/* Experience */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Erfaring' : locale === 'pt' ? 'Experiência' : 'Experience'}</SectionTitle>
              {expGroups.map((group) => (
                <div key={group.company} className="mb-4 pl-3 border-l-2 border-[#252535] relative last:mb-0">
                  <span className="absolute -left-[5px] top-1 w-[7px] h-[7px] rounded-full bg-[#a78bfa] border-2 border-[#0d0d10]" />
                  <div className="flex justify-between items-baseline gap-2 mb-0.5">
                    <span className="text-[11.5px] font-semibold text-[#e2e2f0]">{group.company}</span>
                    <span className="text-[9px] text-[#8888a8] whitespace-nowrap shrink-0">{group.overallPeriod}</span>
                  </div>
                  <div className="text-[9px] text-[#8888a8] mb-2">📍 {group.location}</div>
                  {group.entries.map((job) => (
                    <div key={job.id} className="mb-3 last:mb-0">
                      <div className="text-[10px] text-[#38bdf8] mb-1">{job.role[locale]}</div>
                      <p className="text-[10px] text-[#8888a8] leading-[1.7] mb-1.5">{job.description[locale]}</p>
                      <div className="flex flex-wrap gap-1">
                        {job.tech.map((t) => (
                          <span key={t} className="text-[9px] px-[7px] py-0.5 bg-[#1e1e2e] border border-[#252535] rounded-[3px] text-[#38bdf8]">{t}</span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </section>

            {/* Testimonials */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Anbefalinger' : locale === 'pt' ? 'Recomendações' : 'Testimonials'}</SectionTitle>
              {testimonials.slice(0, 3).map((t) => (
                <div key={t.name} className="mb-[10px] p-[9px_11px] bg-[#161620] border border-[#252535] rounded-[6px] last:mb-0">
                  <p className="text-[10px] text-[#8888a8] leading-[1.7] mb-2 italic">"{t.quote[locale]}"</p>
                  <div className="flex justify-between items-baseline">
                    <span className="text-[10px] font-semibold text-[#e2e2f0]">{t.name}</span>
                    <span className="text-[9px] text-[#8888a8]">{t.date}</span>
                  </div>
                  <p className="text-[9px] text-[#38bdf8]">{t.role ?? t.company}</p>
                </div>
              ))}
            </section>

            {/* Projects */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Prosjekter' : locale === 'pt' ? 'Projetos Selecionados' : 'Selected Projects'}</SectionTitle>
              {highlighted.map((p) => (
                <div key={p.id} className="mb-[9px] p-[9px_11px] bg-[#161620] border border-[#252535] rounded-[6px] last:mb-0">
                  <div className="flex justify-between items-baseline mb-1">
                    <span className="text-[11px] font-semibold text-[#a78bfa]">{p.name}</span>
                    {p.repo && (
                      <span className="text-[9px] text-[#8888a8]">{p.repo.replace('https://', '')}</span>
                    )}
                  </div>
                  <p className="text-[10px] text-[#8888a8] leading-relaxed mb-1.5">{p.description[locale]}</p>
                  <div className="flex flex-wrap gap-1">
                    {p.tech.map((t) => (
                      <span key={t} className="text-[9px] px-[7px] py-0.5 bg-[#1e1e2e] border border-[#252535] rounded-[3px] text-[#38bdf8]">{t}</span>
                    ))}
                  </div>
                </div>
              ))}
            </section>

          </div>

          {/* Right column */}
          <div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-[7px] mb-[18px]">
              <StatBox value={profile.stats.experience} label={locale === 'no' ? 'År' : locale === 'pt' ? 'Anos' : 'Years'} />
              <StatBox value={String(profile.stats.projects)} label={locale === 'no' ? 'Prosjekter' : locale === 'pt' ? 'Projetos' : 'Projects'} />
              <StatBox value={String(profile.stats.languages)} label={locale === 'no' ? 'Språk' : locale === 'pt' ? 'Idiomas' : 'Languages'} />
            </div>

            {/* Skills */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Ferdigheter' : locale === 'pt' ? 'Habilidades' : 'Skills'}</SectionTitle>
              <SkillGroup label={locale === 'no' ? 'Topp ferdigheter' : 'Top Skills'} items={['NestJS', 'Microservices', 'TypeScript', 'AWS', 'AI / LLMs']} />
              <SkillGroup label="Frontend"   items={stack.frontend} />
              <SkillGroup label="Backend"    items={stack.backend} />
              <SkillGroup label={locale === 'no' ? 'Databaser' : locale === 'pt' ? 'Bancos' : 'Databases'} items={stack.databases} />
              <SkillGroup label="DevOps"     items={stack.devops} />
            </section>

            {/* Languages spoken */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Språk' : locale === 'pt' ? 'Idiomas' : 'Languages'}</SectionTitle>
              <LangEntry flag="🇳🇴" lang="Norwegian"  level={locale === 'no' ? 'Morsmål'     : locale === 'pt' ? 'Nativo'      : 'Native'} />
              <LangEntry flag="🇬🇧" lang="English"    level={locale === 'no' ? 'Profesjonell' : locale === 'pt' ? 'Profissional' : 'Professional'} />
              <LangEntry flag="🇧🇷" lang="Portuguese" level={locale === 'no' ? 'Profesjonell' : locale === 'pt' ? 'Profissional' : 'Professional'} />
              <LangEntry flag="🇸🇪" lang="Swedish"    level={locale === 'no' ? 'Begrenset'    : locale === 'pt' ? 'Limitado'     : 'Limited'} />
              <LangEntry flag="🇩🇰" lang="Danish"     level={locale === 'no' ? 'Begrenset'    : locale === 'pt' ? 'Limitado'     : 'Limited'} />
            </section>

            {/* Education */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Utdanning' : locale === 'pt' ? 'Educação' : 'Education'}</SectionTitle>
              {education.filter((e) => e.country === 'br').map((ed) => (
                <div key={ed.school} className="mb-2 last:mb-0">
                  <p className="text-[10px] font-semibold text-[#e2e2f0]">{ed.school}</p>
                  <p className="text-[9px] text-[#38bdf8]">{ed.degree}</p>
                  <p className="text-[9px] text-[#8888a8]">{ed.period}</p>
                </div>
              ))}
            </section>

            {/* Certifications */}
            <section className="mb-[22px]">
              <SectionTitle>// {locale === 'no' ? 'Sertifiseringer' : locale === 'pt' ? 'Certificações' : 'Certifications'}</SectionTitle>
              {certifications.slice(0, 5).map((cert) => (
                <div key={cert.name} className="py-1 border-b border-[#252535] last:border-0 text-[9px] text-[#8888a8] leading-relaxed">
                  {cert.name}
                </div>
              ))}
            </section>

            {/* Info */}
            <section className="mb-[22px]">
              <SectionTitle>// Info</SectionTitle>
              <InfoRow k={locale === 'no' ? 'Lokasjon'    : locale === 'pt' ? 'Localização'   : 'Location'}  v="Natal, Brazil" />
              <InfoRow k={locale === 'no' ? 'Relokasjon' : locale === 'pt' ? 'Relocação' : 'Relocation'} v={locale === 'no' ? 'Åpen for Norge' : locale === 'pt' ? 'Aberto à Noruega' : 'Open to Norway'} />
              <InfoRow k={locale === 'no' ? 'Arbeidstype' : locale === 'pt' ? 'Tipo trabalho' : 'Work type'} v="Remote · On-site" />
              <InfoRow k={locale === 'no' ? 'Rolletype'   : locale === 'pt' ? 'Tipo de cargo' : 'Role type'} v="Senior · Tech Lead" />
              <InfoRow k="Timezone" v="CET / BRT" />
            </section>

          </div>
        </div>

        {/* ── Footer ─────────────────────────────────────────────── */}
        <footer className="mt-6 pt-3 border-t border-[#252535] flex justify-between items-center text-[9px] text-[#8888a8]">
          <span>
            <span className="text-[#a78bfa]">Kim Andrè Furevikstrand</span>
            {' '}· {profile.email} · furevikstrand.cloud
          </span>
          <span>{new Date().toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })}</span>
        </footer>

      </div>
    </div>
  )
}

// ── Helpers ─────────────────────────────────────────────────────────────────

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-[9px] font-semibold tracking-[0.12em] uppercase text-[#a78bfa] pb-1.5 border-b border-[#252535] mb-[13px]">
      {children}
    </h2>
  )
}

function ContactItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="text-[9px] uppercase tracking-[0.08em] text-[#8888a8]">{label}</span>
      <span className="text-[10px] text-[#e2e2f0]">{value}</span>
    </div>
  )
}

function StatBox({ value, label }: { value: string; label: string }) {
  return (
    <div className="p-[9px_7px] bg-[#161620] border border-[#252535] rounded-[6px] text-center">
      <p className="text-[15px] font-bold text-[#a78bfa] leading-none">{value}</p>
      <p className="text-[8px] text-[#8888a8] mt-[3px] uppercase tracking-[0.06em]">{label}</p>
    </div>
  )
}

function SkillGroup({ label, items }: { label: string; items: string[] }) {
  return (
    <div className="mb-[10px] last:mb-0">
      <p className="text-[9px] text-[#8888a8] uppercase tracking-[0.1em] mb-1">{label}</p>
      <div className="flex flex-wrap gap-1">
        {items.map((item) => (
          <span key={item} className="text-[9px] px-[7px] py-0.5 bg-[#1e1e2e] border border-[#252535] rounded-[3px] text-[#e2e2f0]">{item}</span>
        ))}
      </div>
    </div>
  )
}

function LangEntry({ flag, lang, level }: { flag: string; lang: string; level: string }) {
  return (
    <div className="flex justify-between items-center py-[5px] border-b border-[#252535] last:border-0 text-[10px]">
      <span className="text-[#e2e2f0]">{flag} {lang}</span>
      <span className="text-[9px] text-[#34d399]">{level}</span>
    </div>
  )
}

function InfoRow({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between py-1 border-b border-[#252535] last:border-0 text-[10px]">
      <span className="text-[#8888a8]">{k}</span>
      <span className="text-[#e2e2f0] text-right">{v}</span>
    </div>
  )
}
