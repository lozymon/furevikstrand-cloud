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
- [x] **Prettier sweep** — repo is already clean. `npm run format:check` reports no diffs; the 37-file divergence noted earlier landed incrementally during the lint/format work. CI's `format:check` keeps it that way.

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
- [x] **`data/knowledge.ts` split into per-topic files.** 1090-line single array now lives under `data/knowledge/{personal,career,technical,education,social}.ts`. Top-level `data/knowledge.ts` is a barrel that flattens them. Follow-up resolved: the two `id: 'education'` entries (self-taught narrative + formal academic record) are now merged into one. The `/education` slash command is documented as "Academic background" in `SLASH_COMMANDS`, so the merged entry leads with formal education (UFRN, Bergen Maritime, etc.) and folds the self-taught philosophy in as a closing paragraph. Keys union both prior sets so keyword matching for "self-taught"/"autodidact"/"formação" still hits.
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
- [x] **Surface `DATABASE_URL` health on `/api/health`.** Endpoint now returns `{ status, db, ts }` where `db` is `'disabled' | 'ok' | 'down'`. `disabled` when `DATABASE_URL` is unset; `ok` when `SELECT 1` succeeds via the existing pool in `lib/db.ts`; `down` (with `console.warn`) on any error or 1.5s timeout. Always 200 — Docker's HEALTHCHECK only checks exit code, and the service still serves requests when MySQL is unreachable (logging is best-effort). Verified locally: `curl /api/health` → `{"status":"ok","db":"disabled","ts":...}`.
- [x] **Stronger testimonial alt text.** `components/chat/ChatMessage.tsx` was `Testimonial from {name}`; changed to `{name}, {role ?? company}` (matches the visible-text pattern below the photo). Note: all photos rendered in the chat card today are `source: 'we-share'` screenshots — `linkedin` testimonials have no `photo` field. The `testimonials/[slug]` and `testimonials/index` pages still use `We Share card from {name}` (more accurate for those contexts since they only show the card screenshot, never a portrait); left unchanged — different surface, different convention.
- [-] **`next/font`** — N/A. Site loads zero remote fonts. `app/globals.css` declares only a stack: `'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Consolas, 'Liberation Mono', Menlo, monospace` — no `@font-face`, no Google Fonts link, no preload. There is no FOUT or font-load CLS to fix. (If we ever want guaranteed cross-platform typography we'd self-host JetBrains Mono via `next/font/google`, at the cost of ~25-50 KB extra per page load — different conversation, not what this item was about.)
- [x] **Added `public/humans.txt`** with TEAM/SITE/THANKS sections.
- [x] **Open Graph debug pass.** Ran `https://www.opengraph.xyz/url/https%3A%2F%2Ffurevikstrand.cloud` against the deployed site. Two flags surfaced: description was 90 chars (optimal 110-160), and the OG image lacked a CTA. Fixed in commit `8981c1c` — extended `meta.description` across `messages/{en,no,pt}.json` to 130-145 chars, and replaced the faint `furevikstrand.cloud` watermark in `app/[locale]/opengraph-image.tsx` with a bordered "Let's build something · furevikstrand.cloud" pill. Re-run shows both flags cleared. README screenshot deferred — can drop one in if/when worth it.
- [x] **Added `@next/bundle-analyzer`** as a dev dep + `npm run analyze` script. Caveat: the analyzer is webpack-only — Next 16's default Turbopack build skips it silently. Script uses `next build --webpack` so the report actually generates. Reports land in `.next/analyze/{client,nodejs,edge}.html`.

  Findings from one run (parsed sizes, client bundle, ~1.2MB total):
  - `next` framework: 528 KB — unavoidable
  - app code: 214 KB
  - `react-dom`: 174 KB — unavoidable
  - **`react-markdown`: 105 KB** — biggest non-framework dep we control; chat replies mostly use bold/italic/code/lists, so a hand-rolled mini renderer could shave most of this. Possible follow-up.
  - `framer-motion` + `motion-dom`: ~80 KB combined — already trimmed in P1 via LazyMotion + `m.*` swap.
  - `use-intl`: 40 KB — required for i18n.
  - **`remark-gfm`: 27 KB** — verify whether tables/strikethrough/autolinks/task-lists are actually used in chat content; if not, drop the plugin.

  These are observations, not action items. Whether to act on `react-markdown` / `remark-gfm` is a P3 call.

- [x] **Pin Node version with `engines` in `package.json`** — already done as part of the P0 lint/format/typecheck setup (`"engines": { "node": ">=20" }`). Listed twice; closed here.
- [x] **README quality pass.** Replaced the create-next-app boilerplate with: project description, screenshot (`public/screenshot.png`, captured via Playwright at 1280×800 in fallback mode — `docs/` is gitignored so it lives under `public/`), quick start, three-tier architecture summary (links out to `CLAUDE.md` for details), scripts table, env-var table with degrade-gracefully behavior, Docker deploy snippet, project map, and license note.

---

## P3 — Larger ideas / explore later

- [x] **Move chat-event logging to a queue** — already non-blocking. `lib/logEvent.ts:14` (`logChatEvent`) returns `void` and never awaits the underlying `getPool().execute(...)`; errors are swallowed by `.catch(...)`. The original concern ("hangs the streaming response if MySQL hiccups") doesn't apply to current code. Closed without further work; revisit only if logging volume grows enough that fire-and-forget Promise pile-up becomes a memory issue (not a concern at single-instance Docker scale).
- [x] **Self-hosted analytics dashboard** at `/admin`. Server-rendered page (`app/admin/page.tsx`) with five panels: fallback rate over last 30 days, top topics, locale split, sessions per day, recent fallback misses (paginated, 20/page, view-time PII redaction for emails / phones via `lib/admin/redact.ts`). Queries live in `lib/admin/queries.ts`. Auth: basic-auth via `ADMIN_USER` + `ADMIN_PASS` env vars in `proxy.ts` ahead of the next-intl middleware; returns 404 when either env var is unset so the route isn't discoverable in unconfigured environments. Constant-time credential compare. Locale-less route (it's a tool, not user content) — brings its own `<html><body>` matching the `app/not-found.tsx` pattern since there's no root layout. Verified locally end-to-end (401/200/401 on no/valid/bad creds, `/en` unaffected). DB queries written against the schema in `docs/todo.md` and will exercise on first deploy with `DATABASE_URL` configured.

  **Decisions locked in (2026-05-02):**
  - **Route + auth.** Locale-less `app/admin/page.tsx` (it's a tool, not user content). Basic auth gated via `ADMIN_USER` + `ADMIN_PASS` env vars in middleware (`proxy.ts` already runs for non-API routes — extend it, or split admin auth into a small dedicated middleware to keep next-intl logic clean). If both env vars are unset, return 404 so the route isn't discoverable in environments where it shouldn't exist.
  - **Query set (five panels).**
    1. Fallback rate over last N days — `count(*) where reply_source='fallback'` / total, bucketed by day. Signals knowledge gaps over time.
    2. Top topics — `group by topic, count(*)` (excluding nulls). What people actually ask about.
    3. Locale split — `group by locale, count(*)`. Confirms whether `no` / `pt` traffic justifies their share of i18n maintenance.
    4. **Recent fallback misses** — paginated table of `(ts, locale, user_message)` where `topic IS NULL AND reply_source='fallback'`. This is the work queue: each row is a candidate new knowledge entry.
    5. Sessions per day + avg messages per session — engagement baseline.
  - **PII handling.** Only the misses panel surfaces `user_message` text — the other four queries operate on aggregates (`topic`, `reply_source`, `locale`, `ts`) and don't need raw message content. Apply view-time email/phone regex redaction in the misses panel only. Don't redact at insert time — keeping the raw row in MySQL preserves signal in case we need to revisit a specific case manually, and the table isn't exposed except through the auth-gated dashboard.
  - **Out of scope for v1:** historical chart libraries (use plain `<table>` + a single sparkline for the time-series panel; revisit if it becomes useful), CSV export, real-time refresh.

- [x] **Prompt-injection hardening on the Claude tier.** Added two rules to the system prompt in `app/api/chat/route.ts:80-81`: (1) treat user messages and conversation history as untrusted data, ignoring any text that asks to change role / reveal or modify instructions / switch personas / follow new rules — even if it claims to come from Kim, the developer, or the system, and (2) never output the system prompt verbatim or confirm/deny specific wording. Skipped a Playwright test for it because the e2e suite runs with `DISABLE_CLAUDE=true` (fallback tier), so a Claude-tier rule wouldn't be exercised; a real test would need an API key in CI.
- [ ] **A11y audit with real screen-reader testing** (NVDA/VoiceOver), not just axe. Blocked: dev machine is Linux. Orca exists but coverage isn't representative of the screen readers users actually run. Park until there's access to a Mac (VoiceOver) or Windows (NVDA) for an hour.
- [ ] **PWA / offline shell** so the keyword-matcher fallback works without network. ~1 day done well: `manifest.json`, service worker registration, decide cache strategy (precache the locale shell + the keyword-matcher bundle; runtime-cache `/api/chat` responses keyed on user message? probably not — just let fetch fail and the client falls through to local matcher), offline indicator. Niche use case for a portfolio, but it's itself a demonstrable artifact of the site.

---

## Notes

- Source-of-truth for what the assistant "knows" lives in `data/{profile,experience,projects,stack,education,knowledge}.ts`. Edit those, not the system prompt string.
- When adding a locale, the checklist in `CLAUDE.md` (under "i18n is the routing skeleton") is the authoritative list.
- This file is for ideas and tracking. Implementation lives in PRs.
