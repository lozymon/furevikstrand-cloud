import Link from 'next/link'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeHighlight from 'rehype-highlight'
import { getTranslations } from 'next-intl/server'
import { bannerKind, getPost, isVisible } from '@/lib/blog/posts'
import PageHeader from '@/components/layout/PageHeader'
import type { Locale } from '@/types'

const ALL_LOCALES: Locale[] = ['en', 'no', 'pt']

export const dynamic = 'force-dynamic'

function readingTimeMinutes(body: string): number {
  const words = body.trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.ceil(words / 200))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: Locale; slug: string }>
}) {
  const { locale, slug } = await params
  const post = getPost(locale, slug)
  if (!post || !isVisible(post)) notFound()

  const t = await getTranslations({ locale, namespace: 'blog' })
  const banner = bannerKind(post)
  const minutes = readingTimeMinutes(post.body)

  // L2: when a translation of this slug doesn't exist, switching to that
  // locale lands on the locale's blog index instead of a 404.
  const localeOverrides: Partial<Record<Locale, string>> = {}
  for (const loc of ALL_LOCALES) {
    if (loc !== locale && !getPost(loc, slug)) {
      localeOverrides[loc] = `/${loc}/blog`
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0d10] text-[#e2e2f0]">
      <PageHeader current="blog" localeOverrides={localeOverrides} />

      <main className="max-w-3xl mx-auto px-6 py-16">
        <Link
          href={`/${locale}/blog`}
          className="text-sm font-mono text-[#8888a8] hover:text-[#e2e2f0] transition-colors"
        >
          {t('back')}
        </Link>

        {banner && (
          <div className="mt-8 rounded-md border border-yellow-500/40 bg-yellow-500/5 px-4 py-3 text-sm font-mono text-yellow-300">
            {banner === 'draft'
              ? t('draftBanner')
              : t('scheduledBanner', {
                  date: new Date(post.publishAt).toLocaleString(locale),
                })}
          </div>
        )}

        <article className="mt-10">
          <header className="mb-10">
            <h1 className="text-3xl font-bold text-[#e2e2f0] mb-3">{post.title}</h1>
            <div className="flex items-center gap-3 text-xs text-[#8888a8] font-mono">
              <time dateTime={post.publishAt}>
                {new Date(post.publishAt).toLocaleDateString(locale, {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>·</span>
              <span>{t('readingTime', { minutes })}</span>
            </div>
            {post.tags.length > 0 && (
              <div className="mt-4 flex gap-2 flex-wrap">
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
          </header>

          <div className="text-[#c0c0d8] leading-relaxed">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
              components={{
                h1: ({ children }) => (
                  <h2 className="text-2xl font-bold text-[#e2e2f0] mt-10 mb-4">{children}</h2>
                ),
                h2: ({ children }) => (
                  <h2 className="text-xl font-semibold text-[#e2e2f0] mt-10 mb-3">{children}</h2>
                ),
                h3: ({ children }) => (
                  <h3 className="text-lg font-semibold text-[#e2e2f0] mt-8 mb-2">{children}</h3>
                ),
                p: ({ children }) => <p className="my-4">{children}</p>,
                strong: ({ children }) => (
                  <strong className="text-[#a78bfa] font-semibold">{children}</strong>
                ),
                em: ({ children }) => <em className="text-[#38bdf8]">{children}</em>,
                a: ({ href, children }) => {
                  const isExternal = href?.startsWith('http')
                  return (
                    <a
                      href={href}
                      {...(isExternal ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                      className="text-[#38bdf8] underline underline-offset-2 hover:text-[#a78bfa] transition-colors"
                    >
                      {children}
                    </a>
                  )
                },
                code: ({ children, className }) => {
                  const isBlock = Boolean(className)
                  if (isBlock) return <code className={className}>{children}</code>
                  return (
                    <code className="text-[#38bdf8] font-mono text-[0.9em] px-1.5 py-0.5 bg-[#1e1e2e] border border-[#252535] rounded">
                      {children}
                    </code>
                  )
                },
                pre: ({ children }) => (
                  <pre className="my-5 p-4 bg-[#13131f] border border-[#252535] rounded-lg overflow-x-auto text-[13px] font-mono text-[#c0c0d8]">
                    {children}
                  </pre>
                ),
                ul: ({ children }) => (
                  <ul className="list-disc list-outside ml-6 my-4 space-y-1">{children}</ul>
                ),
                ol: ({ children }) => (
                  <ol className="list-decimal list-outside ml-6 my-4 space-y-1">{children}</ol>
                ),
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-[#a78bfa]/40 pl-4 my-5 italic text-[#a8a8c0]">
                    {children}
                  </blockquote>
                ),
                hr: () => <hr className="my-8 border-[#252535]" />,
              }}
            >
              {post.body}
            </ReactMarkdown>
          </div>
        </article>
      </main>
    </div>
  )
}
