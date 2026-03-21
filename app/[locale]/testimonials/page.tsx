'use client'

import { useLocale } from 'next-intl'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import PageNav from '@/components/layout/PageNav'
import type { Locale } from '@/types'

const headings = {
  en: { title: 'Testimonials', subtitle: 'What colleagues say about working with Kim.' },
  no: { title: 'Anbefalinger', subtitle: 'Hva kolleger sier om å jobbe med Kim.' },
  pt: { title: 'Recomendações', subtitle: 'O que colegas dizem sobre trabalhar com Kim.' },
}

const sourceBadge = {
  linkedin: { label: 'LinkedIn', color: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/5' },
  'we-share': { label: 'We Share · Compass.uol', color: 'text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/5' },
}

export default function TestimonialsPage() {
  const locale = useLocale() as Locale
  const { title, subtitle } = headings[locale]

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      {/* Nav */}
      <nav className="sticky top-0 z-10 border-b border-[#252535] bg-[#0d0d10]/90 backdrop-blur-sm">
        <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="text-sm font-mono text-[#a78bfa]">kim.furevikstrand</span>
          <PageNav current="testimonials" />
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#e2e2f0] mb-2">{title}</h1>
          <p className="text-[#8888a8] font-mono text-sm">{subtitle}</p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="rounded-xl border border-[#252535] bg-[#161620] overflow-hidden flex flex-col"
            >
              {/* Original card image */}
              {t.photo && (
                <div className="relative w-full aspect-[4/3] border-b border-[#252535]">
                  <Image
                    src={t.photo}
                    alt={`We Share card from ${t.name}`}
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
              )}

              {/* Translation */}
              <div className="p-5 flex flex-col gap-4 flex-1">
                <blockquote className="text-sm text-[#c0c0d8] leading-relaxed italic">
                  "{t.quote[locale]}"
                </blockquote>

                <div className="mt-auto flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm font-semibold text-[#e2e2f0]">{t.name}</p>
                    <p className="text-xs text-[#8888a8] font-mono mt-0.5">
                      {t.role ? `${t.role} · ` : ''}{t.company}
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${sourceBadge[t.source].color}`}>
                      {sourceBadge[t.source].label}
                    </span>
                    <span className="text-[10px] text-[#8888a8] font-mono">
                      {new Date(t.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
