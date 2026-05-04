import { getAllPosts, isVisible } from '@/lib/blog/posts'
import type { Locale } from '@/types'

export const dynamic = 'force-dynamic'

const SITE_URL = 'https://furevikstrand.cloud'
const RSS_LIMIT = 50

const localeMeta: Record<Locale, { title: string; description: string; lang: string }> = {
  en: {
    title: 'Kim Furevikstrand — Blog',
    description: 'Notes on shipping software.',
    lang: 'en',
  },
  no: {
    title: 'Kim Furevikstrand — Blogg',
    description: 'Notater fra arbeidet med programvare.',
    lang: 'no',
  },
  pt: {
    title: 'Kim Furevikstrand — Blog',
    description: 'Notas sobre desenvolvimento de software.',
    lang: 'pt-BR',
  },
}

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

export async function GET(_request: Request, { params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params
  if (locale !== 'en' && locale !== 'no' && locale !== 'pt') {
    return new Response('Not found', { status: 404 })
  }
  const typedLocale = locale as Locale
  const meta = localeMeta[typedLocale]
  const posts = getAllPosts(typedLocale)
    .filter((p) => isVisible(p))
    .slice(0, RSS_LIMIT)

  const feedUrl = `${SITE_URL}/${typedLocale}/blog/rss.xml`
  const blogUrl = `${SITE_URL}/${typedLocale}/blog`

  const items = posts
    .map(
      (p) => `    <item>
      <title>${escapeXml(p.title)}</title>
      <link>${SITE_URL}/${typedLocale}/blog/${p.slug}</link>
      <guid isPermaLink="true">${SITE_URL}/${typedLocale}/blog/${p.slug}</guid>
      <pubDate>${new Date(p.publishAt).toUTCString()}</pubDate>
      <description>${escapeXml(p.summary)}</description>
    </item>`
    )
    .join('\n')

  const lastBuildDate =
    posts.length > 0 ? new Date(posts[0].publishAt).toUTCString() : new Date().toUTCString()

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(meta.title)}</title>
    <link>${blogUrl}</link>
    <atom:link href="${feedUrl}" rel="self" type="application/rss+xml" />
    <description>${escapeXml(meta.description)}</description>
    <language>${meta.lang}</language>
    <lastBuildDate>${lastBuildDate}</lastBuildDate>
${items}
  </channel>
</rss>`

  return new Response(xml, {
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
    },
  })
}
