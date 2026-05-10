---
title: 'I built my own analytics to see what visitors ask my chat'
summary: '/admin is a server-rendered, basic-auth gated Next.js page that reads chat events from MySQL — 13 panels covering traffic and chat, including a misses queue that turns spotted gaps into shipped answers in about 30 seconds.'
publishAt: 2026-05-05T09:00:00+02:00
tags: [admin, analytics, selfhosted, privacy, mysql, nextjs]
---

I wanted to know what visitors actually ask my portfolio chat — without sending their messages to Google or Plausible.

So I built my own dashboard.

`/admin` on furevikstrand.cloud is a server-rendered Next.js page, basic-auth gated, that returns 404 when the env vars aren't set so it isn't discoverable. It reads from a MySQL table I log every chat event and page visit to (best-effort — if the DB is down, the request still succeeds).

13 panels, two sections.

**Traffic:** conversion (visits → chat sessions), top referrers, countries (resolved locally via `geoip-lite`, no external API), pages, device split, UTM sources.

**Chat:** fallback rate over 30 days, reply-source split (Claude / Ollama / fallback), locale split, top topics, session-depth distribution, sessions per day, and the most useful one — **recent fallback misses**: every question my keyword matcher couldn't answer.

That misses panel is the work queue. Each row has a "copy ts" button that emits a paste-ready `KnowledgeEntry` stub — derived keys from the message, locale + timestamp comment, TODO shells for replies in en/no/pt. Closes the loop from "spotted a gap" to "shipped an answer" in about 30 seconds.

What's the smallest piece of your stack you've pulled in-house instead of paying a SaaS for?
