'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from 'next/navigation'
import { useTransition } from 'react'

const locales = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'no', label: 'NO', flag: '🇳🇴' },
  { code: 'pt', label: 'PT', flag: '🇧🇷' },
]

interface LanguageSwitcherProps {
  variant?: 'default' | 'terminal'
}

export default function LanguageSwitcher({ variant = 'default' }: LanguageSwitcherProps) {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()

  const switchLocale = (next: string) => {
    if (next === locale) return
    const segments = pathname.split('/')
    segments[1] = next
    startTransition(() => {
      router.push(segments.join('/'))
    })
  }

  return (
    <div className="flex items-center gap-1" role="group" aria-label="Language switcher">
      {locales.map((l) => (
        <button
          key={l.code}
          onClick={() => switchLocale(l.code)}
          disabled={isPending}
          aria-pressed={locale === l.code}
          className={[
            'px-2 py-1 rounded text-xs font-mono transition-colors',
            variant === 'terminal'
              ? locale === l.code
                ? 'text-[#33ff33]'
                : 'text-[#1a6b1a] hover:text-[#33ff33]'
              : locale === l.code
                ? 'bg-[#252535] text-[#a78bfa]'
                : 'text-[#8888a8] hover:text-[#e2e2f0] hover:bg-[#1e1e2e]',
          ].join(' ')}
        >
          {l.label}
        </button>
      ))}
    </div>
  )
}
