import type { MetadataRoute } from 'next'

const BASE_URL = 'https://furevikstrand.cloud'
const locales = ['en', 'no', 'pt'] as const

export default function sitemap(): MetadataRoute.Sitemap {
  return locales.map((locale) => ({
    url: `${BASE_URL}/${locale}`,
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: locale === 'en' ? 1 : 0.8,
  }))
}
