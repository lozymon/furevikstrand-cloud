'use client'

import { useLocale } from 'next-intl'
import { certifications } from '@/data/certifications'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

const headings = {
  en: { title: 'Certifications', subtitle: 'Verified certificates and completed courses.' },
  no: { title: 'Sertifiseringer', subtitle: 'Verifiserte sertifikater og fullførte kurs.' },
  pt: { title: 'Certificações', subtitle: 'Certificados verificados e cursos concluídos.' },
}

const categoryLabels: Record<string, Record<Locale, string>> = {
  devops:       { en: 'DevOps & Docker',    no: 'DevOps & Docker',    pt: 'DevOps & Docker'      },
  backend:      { en: 'Backend',            no: 'Backend',            pt: 'Backend'              },
  typescript:   { en: 'TypeScript',         no: 'TypeScript',         pt: 'TypeScript'           },
  architecture: { en: 'Architecture',       no: 'Arkitektur',         pt: 'Arquitetura'          },
  ai:           { en: 'AI',                 no: 'AI',                 pt: 'IA'                   },
  frontend:     { en: 'Frontend',           no: 'Frontend',           pt: 'Frontend'             },
}

const authorityStyle: Record<string, { color: string; bg: string; border: string }> = {
  Udemy:       { color: 'text-[#a435f0]', bg: 'bg-[#a435f0]/5',  border: 'border-[#a435f0]/20' },
  Alura:       { color: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/5',  border: 'border-[#38bdf8]/20' },
  Rocketseat:  { color: 'text-[#a78bfa]', bg: 'bg-[#a78bfa]/5',  border: 'border-[#a78bfa]/20' },
  'Compass.uol': { color: 'text-[#34d399]', bg: 'bg-[#34d399]/5', border: 'border-[#34d399]/20' },
  LinkedIn:    { color: 'text-[#38bdf8]', bg: 'bg-[#38bdf8]/5',  border: 'border-[#38bdf8]/20' },
}

const categoryOrder = ['ai', 'architecture', 'devops', 'backend', 'typescript', 'frontend']

export default function CertificationsPage() {
  const locale = useLocale() as Locale
  const { title, subtitle } = headings[locale]

  const verifyLabel = locale === 'no' ? 'Verifiser' : locale === 'pt' ? 'Verificar' : 'Verify'

  const grouped = categoryOrder.reduce<Record<string, typeof certifications>>(
    (acc, cat) => {
      const items = certifications.filter((c) => c.category === cat)
      if (items.length) acc[cat] = items
      return acc
    },
    {}
  )

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      <PageHeader current="certifications" />

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#e2e2f0] mb-2">{title}</h1>
          <p className="text-[#8888a8] font-mono text-sm">{subtitle}</p>
        </div>

        {/* Categories */}
        <div className="space-y-12">
          {Object.entries(grouped).map(([cat, items]) => (
            <section key={cat}>
              <div className="flex items-center gap-3 mb-5">
                <span className="text-[10px] font-mono text-[#8888a8] uppercase tracking-widest">
                  {categoryLabels[cat]?.[locale] ?? cat}
                </span>
                <div className="flex-1 h-px bg-[#252535]" />
                <span className="text-[10px] font-mono text-[#8888a8]">{items.length}</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {items.map((cert) => {
                  const style = authorityStyle[cert.authority] ?? {
                    color: 'text-[#8888a8]',
                    bg: 'bg-[#1e1e2e]',
                    border: 'border-[#252535]',
                  }
                  return (
                    <div
                      key={cert.name}
                      className="flex flex-col justify-between p-4 rounded-xl border border-[#252535] bg-[#161620] hover:border-[#a78bfa]/30 transition-colors"
                    >
                      <div>
                        <p className="text-sm text-[#e2e2f0] leading-snug mb-3">{cert.name}</p>
                      </div>
                      <div className="flex items-center justify-between gap-2 mt-auto">
                        <div className="flex items-center gap-2">
                          <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${style.color} ${style.bg} ${style.border}`}>
                            {cert.authority}
                          </span>
                          <span className="text-[10px] font-mono text-[#8888a8]">
                            {cert.date.replace('-', '/')}
                          </span>
                        </div>
                        {cert.url && (
                          <a
                            href={cert.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-[10px] font-mono text-[#8888a8] hover:text-[#38bdf8] transition-colors shrink-0"
                          >
                            {verifyLabel} →
                          </a>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          ))}
        </div>
      </main>
    </div>
  )
}
