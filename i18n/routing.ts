import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'no', 'pt'],
  defaultLocale: 'en',
})
