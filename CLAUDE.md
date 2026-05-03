# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev     # Next.js dev server on http://localhost:3000
npm run build   # Production build (next build, output: standalone)
npm run start   # Run the built standalone server
```

Type-checking happens via `next build`. Run `npx tsc --noEmit` for a standalone type-check, `npm run lint` for ESLint, `npm run format` for Prettier.

`npm run test:e2e` runs Playwright smoke tests (`tests/`) against a dev server it boots itself on port 3100. Tests run on desktop Chrome + Pixel 5 viewports. The webServer is started with `DISABLE_CLAUDE=true DISABLE_OLLAMA=true` so the chat falls through to the keyword-fallback tier and tests don't need any API keys. Browsers are installed with `npx playwright install chromium`.

The path alias `@/*` resolves to the repo root (see `tsconfig.json`), so prefer `@/lib/...` over relative imports.

## Architecture

This is the source for **furevikstrand.cloud** — a single-developer portfolio whose centerpiece is an AI chat assistant that answers questions about Kim Furevikstrand. Built on Next.js 16 (App Router) + React 19 + Tailwind 4, deployed as a Docker `standalone` build.

### i18n is the routing skeleton

Locales `en | no | pt` are defined once in `i18n/routing.ts` and consumed everywhere:

- `proxy.ts` is the next-intl middleware (note: this file is named `proxy.ts`, not `middleware.ts`) that prefixes every non-API route with a locale.
- All pages live under `app/[locale]/...`. `app/[locale]/layout.tsx` wraps children in `NextIntlClientProvider` and the `ChatProvider`.
- UI strings live in `messages/{en,no,pt}.json`. The chat assistant additionally varies its replies by locale in two places: the Claude system prompt (`app/api/chat/route.ts`) and the keyword-fallback knowledge base (`data/knowledge.ts` — every entry has `replies` keyed by all three locales).
- The single source of truth for the locale union is `Locale` in `types/index.ts`. When adding a locale, update it everywhere: `routing.ts`, `Locale`, the `messages/` JSON files, every `Record<Locale, ...>` in `data/`, the language detector and continuation keys in `lib/chat.ts`, and the `localeInstruction` switch in `app/api/chat/route.ts`.

### The chat pipeline has three tiers, in priority order

`POST /api/chat` (`app/api/chat/route.ts`) tries each tier and falls through on failure:

1. **Claude API** (`@anthropic-ai/sdk`, streamed) — used when `ANTHROPIC_API_KEY` is set and `DISABLE_CLAUDE !== 'true'`. The system prompt is rebuilt per-request from `data/profile.ts`, `data/experience.ts`, `data/projects.ts`, `data/stack.ts`, and `data/education.ts`, so editing those files is how you change what the assistant knows. Default model: `claude-haiku-4-5` (override with `CLAUDE_MODEL`).
2. **Ollama** (NDJSON streamed) — used when `OLLAMA_HOST` is set and `DISABLE_OLLAMA !== 'true'`. Default model: `gemma3:4b`.
3. **Keyword matcher** in `lib/chat.ts` — pure-TS fuzzy scorer (Levenshtein + weighted keys) over `data/knowledge.ts`. Always available; no network or env required. This is also what `/about`, `/stack`, and other slash topic commands resolve through (`resolveById`).

The response sets `X-Reply-Source: claude | ollama | fallback` so the client (`app/[locale]/page.tsx`) knows whether to consume a stream or treat the body as a single string.

Other route-level concerns: in-memory rate limit (20 req/hour/IP, resets on server restart — fine for single-instance Docker, would need Redis on multi-instance), input is sliced to 500 chars and HTML-stripped, history is capped at the last 10 messages.

### Client-side chat state

`context/ChatContext.tsx` holds the chat in `sessionStorage` keyed by locale (`chat_history_{locale}`), so switching languages preserves separate conversations. `lib/session.ts` mints a per-tab UUID stored in `sessionStorage` for analytics correlation.

`app/[locale]/page.tsx` is the chat orchestrator and runs handlers in this order before hitting `/api/chat`: slash command (`handleSlashCommand`) → testimonial trigger (`resolveTestimonial`) → language auto-detection (`detectLocale` — if it detects a different locale from signal words like "hei", "olá", it routes to that locale instead of replying). Only if all three pass through does the request go to the API.

### Analytics / logging

`lib/logEvent.ts` writes to a MySQL `chat_events` table via a pooled `mysql2` connection (`lib/db.ts`). Logging is best-effort — if `DATABASE_URL` is unset or the insert fails, the request still succeeds. The schema is implied by the INSERT in `logEvent.ts`: `(session_id, locale, reply_source, topic, message_index, page, user_message, ai_reply)`.

### Adding a new page

`lib/nav.ts` is the single nav registry — add an entry there and both `TopBar` and `PageNav` pick it up. Then create `app/[locale]/<path>/page.tsx`. If you want the chat assistant to link to it, also update the "Available internal pages" list in the system prompt inside `app/api/chat/route.ts`.

### Contact form

`POST /api/contact` (`app/api/contact/route.ts`) sends via Resend when `RESEND_API_KEY` is set; otherwise it logs and returns `{ ok: true }` so the form works in dev without keys.

## Environment variables

See `.env.local` for the full list. The important ones:

- `ANTHROPIC_API_KEY` — enables tier 1 (Claude). Without it, tier 1 is skipped entirely.
- `CLAUDE_MODEL` — override the default Claude model.
- `DISABLE_CLAUDE`, `DISABLE_OLLAMA` — kill switches (`true` to disable even when keys/hosts are set).
- `OLLAMA_HOST`, `OLLAMA_MODEL` — enables tier 2.
- `DATABASE_URL` — MySQL connection string for chat event logging.
- `RESEND_API_KEY`, `RESEND_TO_EMAIL` — contact-form delivery.
- `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` — analytics; baked in at build time (see `Dockerfile`).

## Deploy

`Dockerfile` is a 3-stage Alpine Node 20 build that produces a `standalone` Next.js server on port 3000 with a `/api/health` healthcheck. `next.config.ts` sets `output: 'standalone'` for this reason — don't remove it without updating the Dockerfile.
