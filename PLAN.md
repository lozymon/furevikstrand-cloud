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
- [x] **Pre-commit hook wired** with `husky` + `lint-staged`. `.husky/pre-commit` runs `npx lint-staged`; config in `package.json` runs `eslint --fix` + `prettier --write` on staged JS/TS, and `prettier --write` on staged JSON/MD/CSS/MJS/CJS/YAML. `prepare: husky` script bootstraps the hook on `npm install`, so contributors get it automatically. Verified by staging a malformatted file — it was reformatted on commit.

### Lint debt (newly surfaced by ESLint setup)

ESLint shows 29 errors + 10 warnings in pre-existing code. Group and fix in dedicated PRs (don't bundle with feature work):

- [x] **Mechanical fixes done.** Resolved 10 unescaped quote chars (`&ldquo;/&rdquo;` in testimonial blockquotes), 9 jsx-no-comment-textnodes (wrapped `// ` in classic page section titles), 3 html-link-for-pages (swap to `next/link` in `app/[locale]/error.tsx`), 1 textarea `aria-expanded` (dropped — proper combobox pattern is out of scope). Lint went from 39 → 16 problems.
- [x] **react-hooks pass done — lint clean (0 problems).** Real bug fixed: `handleSend` was closure-capturing stale `messages`, so the chat history sent to `/api/chat` was always whatever `messages` was at first render. Added the missing deps so the callback recreates per message. Other fixes: moved `useState(activeIndex)` declaration above its first use in `app/[locale]/dev/page.tsx`, swapped two "reset state via useEffect" patterns for the React 19 "set state during render" idiom (`ChatInput` and `dev/page.tsx`), promoted `streamingRef` reads in JSX to a `isStreaming` state (the ref was being read in render, which doesn't trigger re-renders). Added `locale` to ChatContext + dev-page storage effects (stable per provider mount, but now correct). Justified `eslint-disable-next-line react-hooks/set-state-in-effect` only on the two initial sessionStorage-load effects in `ChatContext` and `dev/page.tsx` boot — both unavoidable since lazy `useState` initialisers can't read `window`/`sessionStorage` without SSR hydration mismatch.
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

- [x] **System prompt memoized** per-locale in `app/api/chat/route.ts`. New `systemPromptCache: Map<Locale, string>` at module scope; `systemPromptFor(locale)` consults it before building. Data sources (profile, experience, projects, stack, education) are all import-time constants, so the cache is valid for the lifetime of the process.
- [-] **"Run locale detection twice" — claim was stale.** Verified by grepping: `detectLocale` is only called client-side (`app/[locale]/page.tsx`, `app/[locale]/dev/page.tsx`). The server reads `body.locale` directly. No deduplication needed. Dropped.
- [x] **`entryId` persisted with each fallback AI reply.** API now sets `X-Reply-Entry-Id` header on the keyword-matcher response; `Message.entryId` (and the dev page's `Line.entryId`) carry it through `sessionStorage`; client passes it back in the history field. `lib/chat.ts` continuation logic prefers the explicit `entryId` from the last assistant message and only falls back to re-scoring when absent. This is also a correctness fix — before, "tell me more" after a slash topic command would re-score the prior user message and could land on a different entry; now it lands on the actual prior topic. Bonus: `topic` field on the `chat_events` log row now records the actual entry instead of `null`.
- [x] **`data/knowledge.ts` split into per-topic files.** 1090-line single array now lives under `data/knowledge/{personal,career,technical,education,social}.ts`. Top-level `data/knowledge.ts` is a barrel that flattens them. Discovered en route: `data/knowledge/education.ts` has two entries with `id: 'education'` (one self-taught narrative, one formal academic record). The second is dead code today since `find` returns the first match; flagged inline + here to be resolved as its own change. Options: merge content, drop one, or rename + wire through TOPIC_COMMANDS.
- [x] **Rate-limit single-instance assumption documented** at the call site in `app/api/chat/route.ts` (above `RATE_LIMIT`). CLAUDE.md already covers it; comment in `lib/rateLimit.ts` already covers the limiter itself. The new comment makes the constraint discoverable from the consumer.

### Accessibility

- [x] **Chat surface ARIA wired.** `ChatWindow` was already `role="log"` + `aria-live="polite"`. Promoted `SlashMenu` to a proper combobox: textarea now has `role="combobox"`, `aria-controls="slash-listbox"`, `aria-expanded`, `aria-haspopup="listbox"`, and `aria-activedescendant` pointing at `slash-option-{i}` IDs on each `<li role="option">`. Verified rendered HTML carries every attribute. Focus returns to input after send (already in place via `useEffect` on `disabled`).
- [x] **Color contrast audited.** Computed WCAG ratios for every text color × background combination in `ChatMessage`/`Sidebar`. Three real failures fixed: AI source badge (`text-[#a78bfa]/60` → `text-[#c4b5fd]`, was 3.04:1), testimonial CTA link (`text-[#a78bfa]/70` → full opacity, was 3.92:1), and SocialLink icon (`text-[#252535]` was 1.19:1, basically invisible — bumped to `text-[#8888a8]` and marked `aria-hidden`). Everything else clears AA (4.5:1) by a wide margin.
- [x] **Skip-to-chat link added.** First focusable element in `app/[locale]/page.tsx`, hidden via `sr-only` until focused, jumps to the textarea via `#chat-input`. i18n key `chat.skipToInput` added in en/no/pt.

### Performance

- [x] **`NeuralCanvas` pauses correctly.** `prefers-reduced-motion` was already respected (early-return). Added `visibilitychange` listener that cancels the rAF loop when `document.hidden` and resumes on visible. Skipped IntersectionObserver — it's a full-page absolute background, always behind content, never off-screen.
- [x] **`framer-motion` shrunk via `LazyMotion` + `m`.** v12 already tree-shakes well (`sideEffects: false`), so the path swap alone wasn't the win. Real lever: wrapped `ChatWindow` in `<LazyMotion features={domAnimation} strict>` and changed the four chat motion components (`ChatMessage`, `ContactPromptCard`, `TypingIndicator`, `Suggestions`) from `motion.*` to `m.*`. `domAnimation` covers everything used here (animate/exit/transition, no drag/layout/gestures); `strict` prevents accidental `motion.*` regressions. `AnimatePresence` stays as-is.
- [-] **`next/image` config** — N/A. All `<Image>` sources are local (`/profile-image.jpeg`, `/testimonials/*.png`). No external `remotePatterns` needed today; revisit if testimonial photos ever move off-domain.

### Security headers

- [x] **Security headers wired in `next.config.ts`.** `Content-Security-Policy` (with `'unsafe-inline'` for inline styles/scripts; `'unsafe-eval'` and `ws:`/`wss:` only in dev for Turbopack/HMR), `Strict-Transport-Security` (2yr + preload), `X-Content-Type-Options: nosniff`, `X-Frame-Options: DENY`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy` (camera/mic/geo/cohort/topics off). Verified via `curl -I` and zero CSP violations across `/en`, `/en/classic`, `/en/testimonials` in Playwright. After Plausible is wired, add its origin to `script-src` + `connect-src`.
- [x] **Honeypot field on contact form.** Hidden `name="website"` input in `ContactPromptCard` (off-screen + `tabIndex=-1` + `aria-hidden`). Server-side check in `app/api/contact/route.ts` returns 200 silently (logs `[contact] honeypot triggered, ip: ...`) so bots can't differentiate. Confirmed legit submissions still pass through.

### Tests

- [x] **Smoke tests with Playwright.** `tests/smoke.spec.ts` runs four checks (home redirects to `/en` + renders chat, chat sends a message and gets a reply, `/help` slash command shows the commands list, `/classic` has `scrollWidth ≤ clientWidth + 1`) on desktop Chrome and Pixel 5. `playwright.config.ts` boots the dev server itself on port 3100 with `DISABLE_CLAUDE=true DISABLE_OLLAMA=true` so tests use the keyword-fallback tier and need no API keys. `npm run test:e2e` locally; `.github/workflows/e2e.yml` runs on every PR with the Playwright browser cache keyed on `package-lock.json`. `.github/workflows/ci.yml` adds lint + format:check + typecheck as a separate job so failures don't mask each other.

### Chat UX

- [x] **Stop button while responding.** `AbortController` per `handleSend` in `app/[locale]/page.tsx`, signal threaded through both the `fetch('/api/chat')` and the synthetic `streamText` loop. `ChatInput` swaps Send → Stop while `isResponding`. AbortError on user-initiated stop is silently absorbed.
- [x] **Copy-to-clipboard on AI messages.** Small icon button in `components/chat/ChatMessage.tsx` next to the timestamp; uses `navigator.clipboard.writeText(message.content)` and flips to a check icon (`aria-label="Copied"`) for 1.5s.

---

## P2 — Polish, nice-to-haves

- [x] **Unify fallback copy.** `chat.fallback` arrays in `messages/{en,no,pt}.json` were dead code — zero consumers (verified by grep). The active path is `lib/chat.ts`'s `fallbacks: Record<Locale, string[]>` consumed by `getFallback(locale)` server-side via `resolveById` / matcher. Deleted the unused JSON keys; `lib/chat.ts` is now the single source of fallback copy. No behavior change.
- [x] **Log rate-limit hits** in `app/api/chat/route.ts`. Added `console.warn(\`[chat] rate-limit hit, ip: ${ip}\`)`at the 429 site (matches the`[contact] honeypot triggered`style already in`app/api/contact/route.ts`). Contact route's own rate-limit is still silent — out of scope for this item, can be a follow-up if useful.
- [ ] **Surface `DATABASE_URL` health on `/api/health`.** Today the chat-event logger is best-effort silent — add an optional check so we know if we're losing analytics.
- [x] **Stronger testimonial alt text.** `components/chat/ChatMessage.tsx` was `Testimonial from {name}`; changed to `{name}, {role ?? company}` (matches the visible-text pattern below the photo). Note: all photos rendered in the chat card today are `source: 'we-share'` screenshots — `linkedin` testimonials have no `photo` field. The `testimonials/[slug]` and `testimonials/index` pages still use `We Share card from {name}` (more accurate for those contexts since they only show the card screenshot, never a portrait); left unchanged — different surface, different convention.
- [ ] **Consider `next/font`** for the body font to eliminate FOUT and any layout shift, if not already in use.
- [x] **Added `public/humans.txt`** with TEAM/SITE/THANKS sections.
- [ ] **Open Graph debug pass.** Run `https://www.opengraph.xyz/url/https%3A%2F%2Ffurevikstrand.cloud` after the OG-image work lands and screenshot the result for the README.
- [ ] **Add `@next/bundle-analyzer`** as a dev dep with a `npm run analyze` script. Without it we're flying blind on what `framer-motion` / `react-markdown` / `mysql2` actually cost in the client bundle.
- [x] **Pin Node version with `engines` in `package.json`** — already done as part of the P0 lint/format/typecheck setup (`"engines": { "node": ">=20" }`). Listed twice; closed here.
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
