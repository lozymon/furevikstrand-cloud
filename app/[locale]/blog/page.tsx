import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { getVisiblePosts, isScheduled } from '@/lib/blog/posts'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

export const dynamic = 'force-dynamic'

export default async function BlogIndexPage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blog' })
  const posts = getVisiblePosts(locale)

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      <PageHeader current="blog" />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <div className="mb-12">
          <h1 className="text-3xl font-bold text-[#e2e2f0] mb-2">{t('title')}</h1>
          <p className="text-[#8888a8] font-mono text-sm">{t('subtitle')}</p>
        </div>

        {posts.length === 0 ? (
          <p className="text-[#8888a8] font-mono text-sm">{t('empty')}</p>
        ) : (
          <ul className="flex flex-col gap-6">
            {posts.map((post) => (
              <li key={post.slug}>
                <Link
                  href={`/${locale}/blog/${post.slug}`}
                  className="block rounded-xl border border-[#252535] bg-[#161620] p-6 hover:border-[#a78bfa]/30 transition-colors"
                >
                  <div className="flex items-center gap-3 mb-2">
                    <time dateTime={post.publishAt} className="text-xs text-[#8888a8] font-mono">
                      {new Date(post.publishAt).toLocaleDateString(locale, {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                    {post.draft && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-yellow-500/40 text-yellow-300 bg-yellow-500/5">
                        draft
                      </span>
                    )}
                    {isScheduled(post) && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded border border-yellow-500/40 text-yellow-300 bg-yellow-500/5">
                        scheduled
                      </span>
                    )}
                  </div>
                  <h2 className="text-lg font-semibold text-[#e2e2f0] mb-2">{post.title}</h2>
                  <p className="text-sm text-[#c0c0d8] leading-relaxed mb-3">{post.summary}</p>
                  {post.tags.length > 0 && (
                    <div className="flex gap-2 flex-wrap">
                      {post.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] font-mono px-2 py-0.5 rounded border border-[#252535] text-[#8888a8]"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  )
}
