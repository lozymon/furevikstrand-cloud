import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import yaml from 'js-yaml'
import type { Locale } from '@/types'
import { PostFrontmatter } from './schema'

// gray-matter's default YAML engine auto-converts ISO 8601 timestamps to JS
// Date objects. We want `publishAt` to stay a string so the Zod schema can
// validate the offset directly. JSON_SCHEMA omits the YAML timestamp type.
const matterOptions = {
  engines: {
    yaml: (s: string) => yaml.load(s, { schema: yaml.JSON_SCHEMA }) as object,
  },
}

export interface Post {
  slug: string
  locale: Locale
  title: string
  summary: string
  publishAt: string
  tags: string[]
  draft: boolean
  body: string
}

const SLUG_REGEX = /^[a-z0-9-]+$/
const PROMPT_CAP = 30
const BLOG_DIR = path.join(process.cwd(), 'content', 'blog')
const cache = new Map<Locale, Post[]>()

function readPost(locale: Locale, filename: string): Post {
  const slug = filename.replace(/\.md$/, '')
  if (!SLUG_REGEX.test(slug)) {
    throw new Error(`Invalid blog slug "${slug}" — must match ${SLUG_REGEX}`)
  }
  const raw = fs.readFileSync(path.join(BLOG_DIR, locale, filename), 'utf8')
  const { data, content } = matter(raw, matterOptions)
  const fm = PostFrontmatter.parse(data)
  return { slug, locale, ...fm, body: content }
}

function readPostsFromDisk(locale: Locale): Post[] {
  const dir = path.join(BLOG_DIR, locale)
  if (!fs.existsSync(dir)) return []
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith('.md'))
    .map((f) => readPost(locale, f))
    .sort((a, b) => b.publishAt.localeCompare(a.publishAt))
}

export function getAllPosts(locale: Locale): Post[] {
  if (process.env.NODE_ENV !== 'production') {
    return readPostsFromDisk(locale)
  }
  let cached = cache.get(locale)
  if (!cached) {
    cached = readPostsFromDisk(locale)
    cache.set(locale, cached)
  }
  return cached
}

export function getPost(locale: Locale, slug: string): Post | null {
  return getAllPosts(locale).find((p) => p.slug === slug) ?? null
}

export function isVisible(post: Post, now: number = Date.now()): boolean {
  if (process.env.NODE_ENV !== 'production') return true
  if (post.draft) return false
  return new Date(post.publishAt).getTime() <= now
}

export function getPostsForPrompt(locale: Locale): Post[] {
  return getAllPosts(locale)
    .filter((p) => isVisible(p))
    .slice(0, PROMPT_CAP)
}

// Helpers that do the impure `Date.now()` lookup so server-component callers
// stay pure (the react-hooks/purity ESLint rule flags `Date.now` in render).

export function getVisiblePosts(locale: Locale): Post[] {
  const now = Date.now()
  return getAllPosts(locale).filter((p) => isVisible(p, now))
}

export function isScheduled(post: Post): boolean {
  return !post.draft && new Date(post.publishAt).getTime() > Date.now()
}

export function bannerKind(post: Post): 'draft' | 'scheduled' | null {
  if (post.draft) return 'draft'
  if (new Date(post.publishAt).getTime() > Date.now()) return 'scheduled'
  return null
}
