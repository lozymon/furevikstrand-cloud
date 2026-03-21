'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { profile } from '@/data/profile'
import { experience } from '@/data/experience'
import { projects } from '@/data/projects'
import { stack } from '@/data/stack'
import { certifications } from '@/data/certifications'
import { education } from '@/data/education'
import PageNav from '@/components/layout/PageNav'
import type { Locale } from '@/types'

export default function ClassicPage() {
  const locale = useLocale() as Locale

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-[#252535] bg-[#0d0d10]/90 backdrop-blur-sm">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-mono text-[#a78bfa]">kim.furevikstrand</span>
          <PageNav current="classic" />
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-6 py-16 space-y-24">
        {/* Hero */}
        <section className="flex items-start gap-6">
          <div className="relative w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#252535] shrink-0">
            <Image src="/profile-image.jpeg" alt={profile.name} fill className="object-cover" sizes="80px" priority />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-[#e2e2f0] leading-tight">{profile.name}</h1>
            <p className="text-[#a78bfa] font-mono mt-1">{profile.role[locale]}</p>
            <div className="flex items-center gap-2 mt-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#34d399]" />
              <span className="text-xs text-[#34d399] font-mono">{profile.availability.label[locale]}</span>
            </div>
            <div className="flex gap-6 mt-4">
              <Stat value={profile.stats.experience} label={locale === 'no' ? 'erfaring' : locale === 'pt' ? 'experiência' : 'experience'} />
              <Stat value={String(profile.stats.projects)} label={locale === 'no' ? 'prosjekter' : locale === 'pt' ? 'projetos' : 'projects'} />
              <Stat value={String(profile.stats.languages)} label={locale === 'no' ? 'språk' : locale === 'pt' ? 'idiomas' : 'languages'} />
            </div>
          </div>
        </section>

        {/* Experience */}
        <section>
          <SectionLabel>{locale === 'no' ? 'Erfaring' : locale === 'pt' ? 'Experiência' : 'Experience'}</SectionLabel>
          <div className="space-y-10 mt-6">
            {experience.map((job, i) => (
              <div key={job.id} className="relative pl-6">
                {/* Timeline line */}
                {i < experience.length - 1 && (
                  <div className="absolute left-[7px] top-6 bottom-[-40px] w-px bg-[#252535]" />
                )}
                <div className="absolute left-0 top-1.5 w-3.5 h-3.5 rounded-full border-2 border-[#a78bfa] bg-[#0d0d10]" />
                <div className="flex flex-wrap items-baseline justify-between gap-2 mb-1">
                  <h3 className="font-semibold text-[#e2e2f0]">{job.role[locale]}</h3>
                  <span className="text-xs font-mono text-[#8888a8]">{job.period}</span>
                </div>
                <p className="text-sm text-[#a78bfa] font-mono mb-2">{job.company} · {job.location}</p>
                <p className="text-sm text-[#8888a8] leading-relaxed">{job.description[locale]}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {job.tech.map((t) => (
                    <span key={t} className="px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#252535] text-[10px] text-[#38bdf8] font-mono">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects */}
        <section>
          <SectionLabel>{locale === 'no' ? 'Prosjekter' : locale === 'pt' ? 'Projetos' : 'Projects'}</SectionLabel>
          <div className="grid sm:grid-cols-2 gap-4 mt-6">
            {projects.filter((p) => p.highlight).map((p) => (
              <a
                key={p.id}
                href={p.repo ?? p.url ?? '#'}
                target="_blank"
                rel="noopener noreferrer"
                className="block p-4 rounded-xl border border-[#252535] bg-[#161620] hover:border-[#a78bfa]/50 transition-colors group"
              >
                <h3 className="font-semibold text-[#e2e2f0] group-hover:text-[#a78bfa] transition-colors">{p.name}</h3>
                <p className="text-xs text-[#8888a8] mt-1.5 leading-relaxed">{p.description[locale]}</p>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {p.tech.map((t) => (
                    <span key={t} className="px-1.5 py-0.5 rounded bg-[#1e1e2e] text-[10px] text-[#38bdf8] font-mono">{t}</span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Stack */}
        <section>
          <SectionLabel>{locale === 'no' ? 'Teknologier' : locale === 'pt' ? 'Tecnologias' : 'Stack'}</SectionLabel>
          <div className="space-y-4 mt-6">
            {Object.entries(stack).map(([group, items]) => (
              <div key={group} className="flex gap-4 items-start">
                <span className="text-[10px] font-mono text-[#8888a8] uppercase tracking-wider w-20 shrink-0 pt-0.5">{group}</span>
                <div className="flex flex-wrap gap-1.5">
                  {items.map((item) => (
                    <span key={item} className="px-2 py-0.5 rounded bg-[#1e1e2e] border border-[#252535] text-[10px] text-[#38bdf8] font-mono">{item}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Certifications */}
        <section>
          <SectionLabel>{locale === 'no' ? 'Sertifiseringer' : locale === 'pt' ? 'Certificações' : 'Certifications'}</SectionLabel>
          <div className="mt-6 space-y-2">
            {certifications.map((cert) => (
              <div key={cert.name} className="flex items-start justify-between gap-4 py-2 border-b border-[#252535]/50 last:border-0">
                <div className="min-w-0">
                  {cert.url ? (
                    <a href={cert.url} target="_blank" rel="noopener noreferrer" className="text-sm text-[#e2e2f0] hover:text-[#a78bfa] transition-colors">
                      {cert.name}
                    </a>
                  ) : (
                    <span className="text-sm text-[#e2e2f0]">{cert.name}</span>
                  )}
                  <span className="text-xs text-[#8888a8] font-mono ml-2">· {cert.authority}</span>
                </div>
                <span className="text-[10px] font-mono text-[#8888a8] shrink-0">
                  {cert.date.replace('-', '/')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education */}
        <section>
          <SectionLabel>{locale === 'no' ? 'Utdanning' : locale === 'pt' ? 'Educação' : 'Education'}</SectionLabel>
          <div className="mt-6 space-y-4">
            {education.map((ed) => (
              <div key={ed.school} className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-[#e2e2f0]">{ed.school}</p>
                  <p className="text-xs text-[#8888a8] font-mono mt-0.5">{ed.degree}</p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-sm">{ed.country === 'no' ? '🇳🇴' : '🇧🇷'}</span>
                  <span className="text-[10px] font-mono text-[#8888a8]">{ed.period}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Contact */}
        <section className="border-t border-[#252535] pt-12">
          <SectionLabel>{locale === 'no' ? 'Kontakt' : locale === 'pt' ? 'Contato' : 'Contact'}</SectionLabel>
          <div className="flex flex-wrap gap-4 mt-6">
            <ContactLink href={`mailto:${profile.email}`} label={profile.email} />
            <ContactLink href={profile.github} label="GitHub" />
            <ContactLink href={profile.gitlab} label="GitLab" />
            <ContactLink href={profile.linkedin} label="LinkedIn" />
          </div>
        </section>
      </main>
    </div>
  )
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] font-mono text-[#8888a8] uppercase tracking-widest">{children}</span>
      <div className="flex-1 h-px bg-[#252535]" />
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <p className="text-lg font-bold text-[#a78bfa]">{value}</p>
      <p className="text-[10px] font-mono text-[#8888a8]">{label}</p>
    </div>
  )
}

function ContactLink({ href, label }: { href: string; label: string }) {
  return (
    <a
      href={href}
      target={href.startsWith('mailto') ? undefined : '_blank'}
      rel="noopener noreferrer"
      className="text-sm font-mono text-[#8888a8] hover:text-[#38bdf8] transition-colors"
    >
      {label} →
    </a>
  )
}
