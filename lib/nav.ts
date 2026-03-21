export interface NavLink {
  label: string
  path: string       // relative to locale, e.g. '' for chat, 'classic', 'testimonials'
  external?: boolean
}

// ─── Add new pages here — TopBar and PageNav both update automatically ────────
export const NAV_LINKS: NavLink[] = [
  { label: '← chat',          path: ''               },
  { label: '/classic',        path: 'classic'        },
  { label: '/dev',            path: 'dev'            },
  { label: '/testimonials',   path: 'testimonials'   },
  { label: '/certifications', path: 'certifications' },
]
