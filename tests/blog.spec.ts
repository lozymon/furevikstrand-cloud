import { test, expect } from '@playwright/test'

const inputName = /Ask me anything/i

const POST_SLUG = 'graceful-degradation'
const EN_TITLE_RE = /An AI chat that doesn't break/i
const NO_TITLE_RE = /En AI-chat som ikke ryker/i

test('blog index lists the seed post', async ({ page }) => {
  await page.goto('/en/blog')
  await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: EN_TITLE_RE })).toBeVisible()
})

test('clicking through to a post renders its content', async ({ page }) => {
  await page.goto('/en/blog')
  await page.getByRole('link', { name: EN_TITLE_RE }).click()
  await expect(page).toHaveURL(new RegExp(`/en/blog/${POST_SLUG}$`))
  await expect(page.getByRole('heading', { name: EN_TITLE_RE, level: 1 })).toBeVisible()
  // Body content (a heading inside the post body)
  await expect(page.getByRole('heading', { name: 'Why this matters' })).toBeVisible()
})

test('locale switch on a translated post lands on the same slug in the new locale', async ({
  page,
}) => {
  await page.goto(`/en/blog/${POST_SLUG}`)
  await page.getByRole('button', { name: 'NO' }).click()
  await expect(page).toHaveURL(new RegExp(`/no/blog/${POST_SLUG}$`))
  await expect(page.getByRole('heading', { name: NO_TITLE_RE, level: 1 })).toBeVisible()
})

test('chat fallback surfaces a blog post by title', async ({ page }) => {
  await page.goto('/en')
  const input = page.getByRole('combobox', { name: inputName })
  await expect(input).toBeEnabled()

  // Avoid words that trigger detectLocale's PT/NO heuristics (e.g. "me", "mean" → ptSignals prefix).
  await input.fill('Explain graceful degradation')
  await input.press('Enter')

  const aiArticles = page.getByRole('article', { name: 'Kim' })
  await expect(aiArticles).toHaveCount(2, { timeout: 15_000 })
  // The blog Hook B reply contains the slug as a backtick path
  await expect(aiArticles.last()).toContainText(`/blog/${POST_SLUG}`, { timeout: 15_000 })
})

test('RSS feed returns valid XML with the seed post', async ({ request }) => {
  const res = await request.get('/en/blog/rss.xml')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toMatch(/application\/rss\+xml/)
  const body = await res.text()
  expect(body).toContain('<?xml version="1.0"')
  expect(body).toContain('An AI chat that doesn&apos;t break when the API key expires')
  expect(body).toContain(`/en/blog/${POST_SLUG}`)
})
