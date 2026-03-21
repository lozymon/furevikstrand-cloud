'use client'

import { useLocale } from 'next-intl'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { testimonials } from '@/data/testimonials'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

const sourceBadge = {
  linkedin: { label: 'LinkedIn', color: 'text-[#38bdf8] border-[#38bdf8]/30 bg-[#38bdf8]/5' },
  'we-share': { label: 'We Share · Compass.uol', color: 'text-[#a78bfa] border-[#a78bfa]/30 bg-[#a78bfa]/5' },
}

const backLabel = {
  en: '← All testimonials',
  no: '← Alle anbefalinger',
  pt: '← Todas as recomendações',
}

export default function TestimonialPage() {
  const locale = useLocale() as Locale
  const { slug } = useParams<{ slug: string }>()

  const t = testimonials.find((t) => t.slug === slug)

  if (!t) {
    return (
      <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
        <PageHeader current="testimonials" />
        <main className="max-w-2xl mx-auto px-6 py-16">
          <Link href={`/${locale}/testimonials`} className="text-sm font-mono text-[#8888a8] hover:text-[#e2e2f0] transition-colors">
            {backLabel[locale]}
          </Link>
          <p className="mt-8 text-[#8888a8] font-mono text-sm">Testimonial not found.</p>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      <PageHeader current="testimonials" />

      <main className="max-w-2xl mx-auto px-6 py-16">
        <Link
          href={`/${locale}/testimonials`}
          className="text-sm font-mono text-[#8888a8] hover:text-[#e2e2f0] transition-colors"
        >
          {backLabel[locale]}
        </Link>

        <div className="mt-10 rounded-xl border border-[#252535] bg-[#161620] overflow-hidden">
          {t.photo && (
            <div className="border-b border-[#252535]">
              <Image
                src={t.photo}
                alt={`We Share card from ${t.name}`}
                width={1200}
                height={900}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 672px"
              />
            </div>
          )}

          <div className="p-8 flex flex-col gap-6">
            <blockquote className="text-base text-[#c0c0d8] leading-relaxed italic">
              "{t.quote[locale]}"
            </blockquote>

            <div className="flex items-center justify-between gap-4 pt-4 border-t border-[#252535]">
              <div>
                <p className="text-sm font-semibold text-[#e2e2f0]">{t.name}</p>
                <p className="text-xs text-[#8888a8] font-mono mt-0.5">
                  {t.role ? `${t.role} · ` : ''}{t.company}
                </p>
              </div>
              <div className="flex flex-col items-end gap-1 shrink-0">
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
      </main>
    </div>
  )
}
