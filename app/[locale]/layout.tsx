import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import '../globals.css'

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })

  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://furevikstrand.cloud'),
    alternates: {
      languages: {
        en: '/en',
        no: '/no',
        pt: '/pt',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://furevikstrand.cloud/${locale}`,
      siteName: 'furevikstrand.cloud',
      type: 'website',
    },
  }
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params
  const messages = await getMessages()

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className="h-full">
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
