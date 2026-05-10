---
title: "An AI chat that doesn't break when the API key expires"
summary: 'Three tiers of graceful degradation — Claude, Ollama, and a pure-TypeScript keyword matcher — keep the chat working even if my API balance hits zero or my LLM server goes offline.'
publishAt: 2026-05-03T09:00:00+02:00
tags: [chat, claude, ollama, typescript, nextjs]
---

Most portfolio sites with an AI chat break the moment the API key expires. Mine doesn't.

I built furevikstrand.cloud with three-tier graceful degradation:

1. **Claude (Haiku)** — primary, streamed.
2. **Local Ollama** — secondary, also streamed, when self-hosted.
3. **Pure-TypeScript keyword matcher** — always available. Levenshtein + weighted keys over a hand-curated knowledge base. No network, no API keys.

Each tier sets an `X-Reply-Source` header on the response so the client knows whether to read a stream or a single string.

## Why this matters

The usual failure mode for an AI chat is "site looks broken." Falling through to a deterministic matcher means the conversation still works — even if my Anthropic balance hits zero or my LLM server goes offline.

Bonus: the same matcher powers slash commands (`/about`, `/stack`, `/projects`), so the offline path is the same code as the online one — not a degraded copy.

Built on Next.js 16 + React 19 + TypeScript, deployed via Docker.
