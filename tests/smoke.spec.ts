import { test, expect } from '@playwright/test'

const inputName = /Ask me anything/i

test('home redirects to /en and renders chat', async ({ page }) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/en\/?$/)
  await expect(page.getByRole('combobox', { name: inputName })).toBeVisible()
  // Welcome message is rendered as an "AI" article (aria-label="Kim").
  await expect(page.getByRole('article', { name: 'Kim' }).first()).toBeVisible()
})

test('chat sends a message and gets a reply', async ({ page }) => {
  await page.goto('/en')
  const input = page.getByRole('combobox', { name: inputName })
  await expect(input).toBeEnabled()

  await input.fill('What is your tech stack?')
  await input.press('Enter')

  await expect(page.getByRole('article', { name: 'You' })).toContainText('tech stack')

  // The next "Kim" article (after the welcome) eventually receives streamed content.
  // The fallback tier streams non-empty text within a couple of seconds.
  const aiArticles = page.getByRole('article', { name: 'Kim' })
  await expect(aiArticles).toHaveCount(2, { timeout: 15_000 })
  await expect(aiArticles.last()).not.toBeEmpty()
})

test('/help slash command shows the commands list', async ({ page }) => {
  await page.goto('/en')
  const input = page.getByRole('combobox', { name: inputName })
  await expect(input).toBeEnabled()

  await input.fill('/help')
  await input.press('Enter')

  // The help body is hard-coded in messages/en.json and rendered via streamText.
  await expect(page.getByRole('article', { name: 'Kim' }).last()).toContainText(
    'Available commands',
    { timeout: 15_000 }
  )
})

test('/classic page does not scroll horizontally', async ({ page }) => {
  await page.goto('/en/classic')
  await page.waitForLoadState('networkidle')

  const { scrollWidth, clientWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    clientWidth: document.documentElement.clientWidth,
  }))

  // Allow a 1px rounding tolerance; anything larger means a child is forcing overflow.
  expect(scrollWidth).toBeLessThanOrEqual(clientWidth + 1)
})
