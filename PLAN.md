# PLAN.md — Improvements for furevikstrand.cloud

A living backlog of ideas. Pick from the top, push down what isn't ready. Each item lists _what / why / where_ so anyone (including future-Claude) can pick it up cold.

Status legend: `[ ]` open · `[~]` in progress · `[x]` done · `[-]` dropped

---

## P0 — Quick wins (under ~2h each, clear payoff)

### Mobile-friendly (verified at 375×812 with Playwright)

- [x] **Fix `/classic` horizontal scroll.** Collapsed grid to 1 column under `lg:`, reduced outer padding, fixed `PageHeader` wrapping (it had its own `px-6` + full "Download CV" text). Verified 371 ≤ 375.
- [x] **Stop iOS auto-zoom on chat input focus.** Textarea now `text-base` (16px) on mobile, `sm:text-sm` on desktop.
- [x] **Bump touch targets to 44×44.** Send + Clear buttons now `w-11 h-11 sm:w-9 sm:h-9`. Verified 44×44 at 375px.
- [x] **Add iOS safe-area handling.** Added `export const viewport: Viewport` with `viewportFit: 'cover'` + `themeColor`. Chat input container has `pb-[env(safe-area-inset-bottom)]`.
- [x] **Switch full-height containers to `100dvh`.** `app/globals.css` uses `100dvh` with `@supports not` fallback.
- [x] **Fix TopBar wrapping on small screens.** Both `TopBar` and `PageHeader` now show short "CV" label under `sm:` with `whitespace-nowrap` and `min-w-0` containers.
- [x] **Allow long testimonial names to wrap.** Added `min-w-0 flex-1` and `break-words` to the name block.
- [x] **Throttle NeuralCanvas on small screens.** `NODE_COUNT` 60→25 and `CONNECTION_DISTANCE` 150→110 below 640px.

### SEO & social

- [x] **OG image** — already implemented in `app/[locale]/opengraph-image.tsx` (themed, locale-aware, with stats badge). Auto-detected by Next, verified via curl on `/en/opengraph-image`.
- [x] **Twitter card metadata** — added `twitter: { card: 'summary_large_image', title, description }` in `generateMetadata`.
- [x] **`alternates.canonical`** + `x-default` hreflang — wired in `generateMetadata`. Verified `<link rel="canonical">` in HTML.
- [x] **Expanded `app/sitemap.ts`** — now emits 12 URLs (4 routes × 3 locales) with full `xhtml:link rel="alternate"` hreflang per entry plus `x-default`.
- [x] **JSON-LD `Person` structured data** — injected as `<script type="application/ld+json">` in the locale layout body. Includes name, jobTitle, description, email, sameAs (GitHub, GitLab, LinkedIn).

### i18n drift (hardcoded strings)

- [x] **Testimonial reply strings** — moved to `chat.testimonialReply` with `{name}` interpolation in all three `messages/*.json`. Page uses `t('testimonialReply', { name })`.
- [x] **Chat error string** — moved to `chat.error` in all three message files.
- [x] **`helpReplies`** — moved to `chat.help` in `messages/*.json`. Removed from `lib/chat.ts`. Both `app/[locale]/page.tsx` and `app/[locale]/dev/page.tsx` consume via `useTranslations('chat')`.

### DX & tooling gaps

- [x] **Lint + format + typecheck scripts.** Added `eslint` (flat config via `eslint-config-next` 16 + `eslint-config-prettier`), `prettier` 3 (`{ semi: false, singleQuote: true, trailingComma: 'es5', printWidth: 100 }` to match existing style), and scripts: `lint`, `lint:fix`, `format`, `format:check`, `typecheck`. Pinned Node via `engines: { node: '>=20' }`.
- [ ] **Pre-commit hook** (lint-staged + husky, or just a git hook) so the new lint/format pipeline doesn't drift. Hold until existing lint debt below is cleaned up — otherwise every commit fails.

### Lint debt (newly surfaced by ESLint setup)

ESLint shows 29 errors + 10 warnings in pre-existing code. Group and fix in dedicated PRs (don't bundle with feature work):

- [x] **Mechanical fixes done.** Resolved 10 unescaped quote chars (`&ldquo;/&rdquo;` in testimonial blockquotes), 9 jsx-no-comment-textnodes (wrapped `// ` in classic page section titles), 3 html-link-for-pages (swap to `next/link` in `app/[locale]/error.tsx`), 1 textarea `aria-expanded` (dropped — proper combobox pattern is out of scope). Lint went from 39 → 16 problems.
- **Needs human review** (16 problems remaining, all `react-hooks/*`):
  - 6 × `react-hooks/refs` — ref reads/writes that may be unsafe
  - 6 × `react-hooks/exhaustive-deps` — missing dep arrays (some are deliberate, some real bugs)
  - 3 × `react-hooks/set-state-in-effect` — anti-pattern; either restructure or justify per case
  - 1 × `react-hooks/immutability`
- **Prettier** — 37 files diverge from `.prettierrc.json`. Run `npm run format` once, commit as a single dedicated `chore: prettier sweep` so the diff is reviewable in isolation.

### Robustness & resilience

- [x] **Add not-found pages.** Created `app/not-found.tsx` (root) + `app/[locale]/not-found.tsx` + `app/[locale]/[...rest]/page.tsx` (catch-all that triggers `notFound()` so the locale's themed 404 actually renders through next-intl).
- [x] **Add `app/[locale]/error.tsx`.** Themed error boundary with `Try again` (calls `reset()`) and `Home` links; logs the error to console with the digest ref.
- [x] **Rate-limit `/api/contact`.** Extracted limiter to `lib/rateLimit.ts` (scoped buckets), applied 5/hr/IP to contact and reused 20/hr/IP for chat.
- [-] **`/contact` page** — N/A. Not in `lib/nav.ts`, only the API route exists. Dropped from plan.
- [x] **Drop unused `dompurify` dep.** Confirmed no imports, removed `dompurify` and `@types/dompurify` from `package.json`.

---

## P1 — Higher-value structural changes

### Chat pipeline

- [ ] **Memoize the system prompt** in `app/api/chat/route.ts:32-103`. It's rebuilt from 5 data files on every request. Cache by locale in module scope; data is import-time so the cache is valid for the lifetime of the process. Saves ~1ms per request and several string concatenations.
- [ ] **Stop running locale detection twice.** `lib/chat.ts:35` (`detectLocale`) is called client-side in `app/[locale]/page.tsx:164`, but the server then independently parses again. The current behaviour is fine, but if we add server-side autodetect we should pick one place. Add a comment noting the split today, or remove the server-side path.
- [ ] **Persist `entryId` with each AI reply** so the keyword-matcher continuation logic in `lib/chat.ts:194-217` doesn't have to re-score the prior user message to guess which entry it matched. Pass it back in the response (extra header or JSON envelope on fallback) and store on `Message`.
- [ ] **Split `data/knowledge.ts`** (570 lines, single array) into `data/knowledge/{about,stack,projects,...}.ts` and re-export from an index. Reduces merge conflicts and makes intent obvious.
- [ ] **Document the rate limit's single-instance assumption** in `app/api/chat/route.ts:14-29`. The in-memory `Map` resets on restart and isn't shared across replicas — fine for the current Docker single-container deploy, but a future scale-out would silently break it. One-line comment + maybe a CLAUDE.md note.

### Accessibility

- [ ] **Audit ARIA on the chat surface.** Ensure `ChatWindow` has `role="log"` + `aria-live="polite"`, `ChatInput` is properly labelled, `SlashMenu` is a real listbox with arrow-key navigation and `aria-activedescendant`, focus returns to input after sending. Use the `a11y-check` skill or run axe-core in the browser.
- [ ] **Verify color contrast** of the dark theme (`#0d0d10` background) against text colors used in `ChatMessage`/`Sidebar`. Tailwind defaults can dip below 4.5:1.
- [ ] **Add a "skip to chat" link** at the top of `app/[locale]/page.tsx` for keyboard users — the page leads with `NeuralCanvas` + sidebars before the main chat.

### Performance

- [ ] **Confirm `NeuralCanvas` is lazy / paused off-screen.** It's the first thing rendered (`page.tsx:223`) and likely runs `requestAnimationFrame` continuously — verify it pauses on `document.hidden` and respects `prefers-reduced-motion`.
- [ ] **Verify `framer-motion` isn't pulling in the full library** in client bundles. Use the per-component `motion/react` imports rather than the legacy entrypoint.
- [ ] **Add `next/image` configuration** in `next.config.ts` if testimonial photos are served from external URLs. Currently no `images` block — any `<Image>` pointing off-domain will error.

### Security headers

- [x] **Security headers wired in `next.config.ts`.** `Content-Security-Policy` (with `'unsafe-inline'` for inline styles/scripts; `'unsafe-eval'` and `ws:`/`wss:` only in dev for Turbopack/HMR), `Strict-Transport-Security` (2yr + preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/cohort/topics off). Verified via `curl -I` and zero CSP violations across `/en`, `/en/classic`, `/en/testimonials` in Playwright. After Plausible is wired, add its origin to `script-src` + `connect-src`.
- [x] **Honeypot field on contact form.** Hidden `name="website"` input in `ContactPromptCard` (off-screen + `tabIndex=-1` + `aria-hidden`). Server-side check in `app/api/contact/route.ts` returns 200 silently (logs `[contact] honeypot triggered, ip: ...`) so bots can't differentiate. Confirmed legit submissions still pass through.

### Tests

- [ ] **Smoke tests with Playwright.** The MCP server is already wired and the dev server boots fine. Add a tiny `tests/` folder with one mobile + one desktop pass that covers: home loads, chat sends a message, slash command works, `/classic` doesn't horizontally scroll. Run via `npm run test:e2e` so we don't break mobile fixes silently.

### Chat UX

- [ ] **Add a "Stop" button while streaming.** Long Claude replies can't currently be cancelled — the user has to wait. Wire an `AbortController` from `app/[locale]/page.tsx`'s fetch call and surface a stop button next to the typing indicator.
- [ ] **Copy-to-clipboard on AI messages.** Single-icon button next to the timestamp in `components/chat/ChatMessage.tsx`. Common chat-UI affordance, low effort.

---

## P2 — Polish, nice-to-haves

- [ ] **Unify fallback copy.** `lib/chat.ts:247-263` and `messages/en.json` both have "didn't catch that"-style strings; pick one source.
- [ ] **Log rate-limit hits** in `app/api/chat/route.ts:115`. Currently silent 429. A `console.warn` with the IP makes ops debugging possible without DB queries.
- [ ] **Surface `DATABASE_URL` health on `/api/health`.** Today the chat-event logger is best-effort silent — add an optional check so we know if we're losing analytics.
- [ ] **Stronger testimonial alt text.** Verify `components/chat/ChatMessage.tsx` uses `${name}, ${role}` rather than a generic "photo of" — better for screen readers.
- [ ] **Consider `next/font`** for the body font to eliminate FOUT and any layout shift, if not already in use.
- [ ] **Add a `humans.txt`** in `public/` — small, fun, and you're a portfolio site.
- [ ] **Open Graph debug pass.** Run `https://www.opengraph.xyz/url/https%3A%2F%2Ffurevikstrand.cloud` after the OG-image work lands and screenshot the result for the README.
- [ ] **Add `@next/bundle-analyzer`** as a dev dep with a `npm run analyze` script. Without it we're flying blind on what `framer-motion` / `react-markdown` / `mysql2` actually cost in the client bundle.
- [ ] **Pin Node version with `engines` in `package.json`.** Dockerfile uses Node 20, but a contributor running locally on Node 18 might hit subtle issues. Add `"engines": { "node": ">=20" }`.
- [ ] **README quality pass.** Mention what the project is, screenshot, the env vars needed for full Claude/Ollama/MySQL/Resend setup, how to run locally, and that the dev server defaults to port 3000 (or 3001 if 3000 is taken).

---

## P3 — Larger ideas / explore later

- [ ] **Move chat-event logging to a queue** instead of inline DB writes. `lib/logEvent.ts` is awaited synchronously inside the streaming response close — if MySQL hiccups, the request hangs.
- [ ] **Self-hosted analytics dashboard** for the `chat_events` table. Right now data is collected but there's no UI to see top topics, fallback rate, locale split, etc.
- [ ] **Prompt-injection hardening on the Claude tier.** Current sanitization is HTML-strip + 500-char cap. For a portfolio site the blast radius is "weird answers", but a stricter system-prompt-instruction-rejection pass would be cheap insurance.
- [ ] **A11y audit with real screen-reader testing** (NVDA/VoiceOver), not just axe.
- [ ] **PWA / offline shell** so the keyword-matcher fallback works without network.

---

## Notes

- Source-of-truth for what the assistant "knows" lives in `data/{profile,experience,projects,stack,education,knowledge}.ts`. Edit those, not the system prompt string.
- When adding a locale, the checklist in `CLAUDE.md` (under "i18n is the routing skeleton") is the authoritative list.
- This file is for ideas and tracking. Implementation lives in PRs.
