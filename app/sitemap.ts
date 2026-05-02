import type { MetadataRoute } from 'next'

const BASE_URL = 'https://furevikstrand.cloud'
const locales = ['en', 'no', 'pt'] as const

const routes = [
  { path: '', priority: 1.0, changeFrequency: 'monthly' as const },
  { path: 'classic', priority: 0.9, changeFrequency: 'monthly' as const },
  { path: 'testimonials', priority: 0.7, changeFrequency: 'monthly' as const },
  { path: 'certifications', priority: 0.6, changeFrequency: 'yearly' as const },
] as const

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date()
  return locales.flatMap((locale) =>
    routes.map(({ path, priority, changeFrequency }) => {
      const url = path ? `${BASE_URL}/${locale}/${path}` : `${BASE_URL}/${locale}`
      const languages: Record<string, string> = Object.fromEntries(
        locales.map((l) => [l, path ? `${BASE_URL}/${l}/${path}` : `${BASE_URL}/${l}`])
      )
      languages['x-default'] = path ? `${BASE_URL}/en/${path}` : `${BASE_URL}/en`
      return {
        url,
        lastModified: now,
        changeFrequency,
        priority: locale === 'en' ? priority : Math.max(priority - 0.1, 0.1),
        alternates: { languages },
      }
    })
  )
}
