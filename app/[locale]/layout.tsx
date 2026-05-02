import type { Metadata, Viewport } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { ChatProvider } from '@/context/ChatContext'
import { profile } from '@/data/profile'
import type { Locale } from '@/types'
import '../globals.css'

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0d0d10',
}

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
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        no: '/no',
        pt: '/pt',
        'x-default': '/en',
      },
    },
    openGraph: {
      title: t('title'),
      description: t('description'),
      url: `https://furevikstrand.cloud/${locale}`,
      siteName: 'furevikstrand.cloud',
      type: 'website',
      locale: locale === 'no' ? 'nb_NO' : locale === 'pt' ? 'pt_BR' : 'en_US',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('title'),
      description: t('description'),
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

  const personJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: profile.name,
    jobTitle: profile.role[locale as Locale] ?? profile.role.en,
    description: profile.bio[locale as Locale] ?? profile.bio.en,
    email: `mailto:${profile.email}`,
    url: `https://furevikstrand.cloud/${locale}`,
    sameAs: [profile.github, profile.gitlab, profile.linkedin],
  }

  return (
    <html lang={locale} className="h-full" suppressHydrationWarning>
      <body className="h-full">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <NextIntlClientProvider messages={messages}>
          <ChatProvider locale={locale}>
            {children}
          </ChatProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
