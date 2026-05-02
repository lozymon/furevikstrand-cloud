'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { testimonials } from '@/data/testimonials'
import type { Locale } from '@/types'

export default function TestimonialsCarousel({
  locale,
  compact = false,
}: {
  locale: Locale
  compact?: boolean
}) {
  const [index, setIndex] = useState(0)
  const routeLocale = useLocale()
  const t = testimonials[index]

  const prev = () => setIndex((i) => (i - 1 + testimonials.length) % testimonials.length)
  const next = () => setIndex((i) => (i + 1) % testimonials.length)

  const label =
    locale === 'no' ? 'Anbefalinger' : locale === 'pt' ? 'Recomendações' : 'Testimonials'

  if (compact) {
    return (
      <div className="p-3 border-b border-[#252535]">
        <div className="flex items-center justify-between mb-2">
          <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider">{label}</p>
          <div className="flex items-center gap-1">
            <button
              onClick={prev}
              aria-label="Previous testimonial"
              className="w-4 h-4 flex items-center justify-center text-[#8888a8] hover:text-[#a78bfa] transition-colors"
            >
              ‹
            </button>
            <span className="text-[10px] text-[#8888a8] font-mono">
              {index + 1}/{testimonials.length}
            </span>
            <button
              onClick={next}
              aria-label="Next testimonial"
              className="w-4 h-4 flex items-center justify-center text-[#8888a8] hover:text-[#a78bfa] transition-colors"
            >
              ›
            </button>
          </div>
        </div>
        <Link
          href={`/${routeLocale}/testimonials`}
          className="group block hover:opacity-80 transition-opacity"
        >
          <blockquote className="text-[10px] text-[#c0c0d8] italic line-clamp-2 mb-1.5">
            &ldquo;{t.quote[locale]}&rdquo;
          </blockquote>
          <p className="text-[10px] text-[#8888a8] font-mono truncate group-hover:text-[#38bdf8] transition-colors">
            — {t.name}
          </p>
        </Link>
      </div>
    )
  }

  return (
    <div className="p-4 border-b border-[#252535]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-[10px] text-[#8888a8] font-mono uppercase tracking-wider">{label}</p>
        <div className="flex items-center gap-1">
          <button
            onClick={prev}
            aria-label="Previous testimonial"
            className="w-4 h-4 flex items-center justify-center text-[#8888a8] hover:text-[#a78bfa] transition-colors"
          >
            ‹
          </button>
          <span className="text-[10px] text-[#8888a8] font-mono">
            {index + 1}/{testimonials.length}
          </span>
          <button
            onClick={next}
            aria-label="Next testimonial"
            className="w-4 h-4 flex items-center justify-center text-[#8888a8] hover:text-[#a78bfa] transition-colors"
          >
            ›
          </button>
        </div>
      </div>

      <blockquote className="text-[11px] text-[#c0c0d8] leading-relaxed italic mb-3 line-clamp-3">
        &ldquo;{t.quote[locale]}&rdquo;
      </blockquote>

      <div className="flex items-center gap-2">
        {t.photo ? (
          <div className="relative w-7 h-7 rounded-full overflow-hidden border border-[#252535] shrink-0">
            <Image src={t.photo} alt={t.name} fill className="object-cover" sizes="28px" />
          </div>
        ) : (
          <div className="w-7 h-7 rounded-full bg-[#1e1e2e] border border-[#252535] shrink-0 flex items-center justify-center">
            <span className="text-[10px] text-[#a78bfa]">{t.name[0]}</span>
          </div>
        )}
        <div className="min-w-0">
          <p className="text-[10px] text-[#e2e2f0] font-semibold truncate">{t.name}</p>
          <p className="text-[10px] text-[#8888a8] font-mono truncate">
            {t.role ? `${t.role} · ` : ''}
            {t.company} ·{' '}
            {new Date(t.date).toLocaleDateString('en-GB', { month: 'short', year: 'numeric' })}
          </p>
        </div>
      </div>
    </div>
  )
}
