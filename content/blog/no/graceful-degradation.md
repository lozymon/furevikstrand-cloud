---
title: 'En AI-chat som ikke ryker når API-nøkkelen går tom'
summary: 'Tre lag med graceful degradation — Claude, Ollama og en ren TypeScript-nøkkelordmatcher — holder chatten i gang selv om API-saldoen treffer null eller LLM-serveren faller ut.'
publishAt: 2026-05-03T09:00:00+02:00
tags: [chat, claude, ollama, typescript, nextjs]
---

De fleste porteføljesider med en AI-chat ryker i det øyeblikket API-nøkkelen går tom. Min gjør ikke det.

Jeg bygde furevikstrand.cloud med tre lag med graceful degradation:

1. **Claude (Haiku)** — primær, streamet.
2. **Lokal Ollama** — sekundær, også streamet, når den er self-hosted.
3. **Ren TypeScript-nøkkelordmatcher** — alltid tilgjengelig. Levenshtein + vektede nøkler over en håndlaget kunnskapsbase. Ingen nettverk, ingen API-nøkler.

![Diagram med tre lag: Claude (Haiku) faller gjennom til lokal Ollama, som faller gjennom til en TypeScript-nøkkelordmatcher. X-Reply-Source-headeren forteller hvilket lag som svarte.](/blog/graceful-degradation/no.png)

Hvert lag setter en `X-Reply-Source`-header på responsen, så klienten vet om den skal lese en stream eller en enkelt streng.

## Hvorfor det betyr noe

Det vanlige feilmønsteret for en AI-chat er at "siden ser ødelagt ut". Når man faller tilbake til en deterministisk matcher fungerer samtalen fortsatt — selv om Anthropic-saldoen min treffer null eller LLM-serveren går ned.

Bonus: den samme matcheren driver slash-kommandoene (`/about`, `/stack`, `/projects`), så offline-veien er den samme koden som online-veien — ikke en degradert kopi.

Bygd på Next.js 16 + React 19 + TypeScript, deployet via Docker.
