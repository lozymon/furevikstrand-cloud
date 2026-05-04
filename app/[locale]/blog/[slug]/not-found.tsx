import Link from 'next/link'
import { useLocale } from 'next-intl'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

const notFoundLabels: Record<Locale, { back: string; message: string }> = {
  en: { back: '← All posts', message: 'Post not found.' },
  no: { back: '← Alle innlegg', message: 'Innlegget finnes ikke.' },
  pt: { back: '← Todos os posts', message: 'Post não encontrado.' },
}

export default function BlogPostNotFound() {
  const locale = useLocale() as Locale
  const { back, message } = notFoundLabels[locale]

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      <PageHeader current="blog" />
      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-mono text-[#8888a8] hover:text-[#e2e2f0] transition-colors"
        >
          {back}
        </Link>
        <p className="mt-8 text-[#8888a8] font-mono text-sm">{message}</p>
      </main>
    </div>
  )
}
