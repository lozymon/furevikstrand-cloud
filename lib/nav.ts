export interface NavLink {
  /** Translation key under the `nav` namespace in messages/{en,no,pt}.json */
  labelKey: string
  /** Path relative to locale (e.g. '' for chat, 'classic'). Used verbatim as href when `external` is true. */
  path: string
  /** When true, render as <a target="_blank"> and skip the locale prefix */
  external?: boolean
}

// ─── Add new pages here — TopBar and PageNav both update automatically ────────
export const NAV_LINKS = [
  { labelKey: 'chat', path: '' },
  { labelKey: 'classic', path: 'classic' },
  { labelKey: 'dev', path: 'dev' },
  { labelKey: 'blog', path: 'blog' },
  { labelKey: 'testimonials', path: 'testimonials' },
  { labelKey: 'certifications', path: 'certifications' },
] as const satisfies readonly NavLink[]

export type NavPath = (typeof NAV_LINKS)[number]['path']

export function localizedHref(locale: string, link: NavLink): string {
  if (link.external) return link.path
  return `/${locale}${link.path ? `/${link.path}` : ''}`
}

export function visibleNavLinks(current: NavPath): readonly NavLink[] {
  return NAV_LINKS.filter((l) => l.path !== current)
}
