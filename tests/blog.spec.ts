import { test, expect } from '@playwright/test'

const inputName = /Ask me anything/i

test('blog index lists the seed post', async ({ page }) => {
  await page.goto('/en/blog')
  await expect(page.getByRole('heading', { name: 'Blog', level: 1 })).toBeVisible()
  await expect(page.getByRole('heading', { name: 'Hello, blog' })).toBeVisible()
})

test('clicking through to a post renders its content', async ({ page }) => {
  await page.goto('/en/blog')
  await page.getByRole('link', { name: /Hello, blog/ }).click()
  await expect(page).toHaveURL(/\/en\/blog\/hello-world$/)
  await expect(page.getByRole('heading', { name: 'Hello, blog', level: 1 })).toBeVisible()
  // Body content (one of the headings inside the seed post body)
  await expect(page.getByRole('heading', { name: 'How it talks to the chat' })).toBeVisible()
})

test('locale switch on a translated post lands on the same slug in the new locale', async ({
  page,
}) => {
  await page.goto('/en/blog/hello-world')
  await page.getByRole('button', { name: 'NO' }).click()
  await expect(page).toHaveURL(/\/no\/blog\/hello-world$/)
  // The Norwegian translation has a different title
  await expect(page.getByRole('heading', { name: 'Hei, blogg', level: 1 })).toBeVisible()
})

test('chat fallback surfaces a blog post by title', async ({ page }) => {
  await page.goto('/en')
  const input = page.getByRole('combobox', { name: inputName })
  await expect(input).toBeEnabled()

  // Avoid words that trigger detectLocale's PT/NO heuristics (e.g. "me", "is").
  await input.fill('What is the hello blog post about')
  await input.press('Enter')

  const aiArticles = page.getByRole('article', { name: 'Kim' })
  await expect(aiArticles).toHaveCount(2, { timeout: 15_000 })
  // The blog Hook B reply contains the slug as a backtick path
  await expect(aiArticles.last()).toContainText('/blog/hello-world', { timeout: 15_000 })
})

test('RSS feed returns valid XML with the seed post', async ({ request }) => {
  const res = await request.get('/en/blog/rss.xml')
  expect(res.status()).toBe(200)
  expect(res.headers()['content-type']).toMatch(/application\/rss\+xml/)
  const body = await res.text()
  expect(body).toContain('<?xml version="1.0"')
  expect(body).toContain('<title>Hello, blog</title>')
  expect(body).toContain('/en/blog/hello-world')
})
