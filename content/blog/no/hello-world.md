---
title: 'Hei, blogg'
summary: 'Hvorfor dette nettstedet endelig har en blogg, og hvordan den henger sammen med chat-assistenten på forsiden.'
publishAt: 2026-05-01T09:00:00+02:00
tags: [meta, chat, claude]
---

Det er en blogg her nå. Det interessante er ikke bloggen i seg selv —
markdown-filer i en mappe, render dem, ferdig — men hvordan den snakker
med chat-assistenten på forsiden.

## Hvordan den snakker med chatten

Hvert innleggs tittel, sammendrag og tagger går rett inn i Claudes
system-prompt. Spør assistenten om et innlegg ved navn, eller om taggene
("noe om TypeScript?"), og den vet å nevne innlegget og lenke til det.

Innleggene dukker også opp via nøkkelord-fallback-laget — den rene
TypeScript-fuzzy-matcheren som kjører når både Claude og Ollama er
slått av. Slik fungerer chatten likt i tester og offline.

## Utkast og planlegging

Utkast og innlegg med fremtidig `publishAt` styres av én enkelt
hjelpefunksjon. Skjult overalt i produksjon, synlig overalt i dev. Én
sannhetskilde — indeks-siden, slug-siden, system-prompten og
nøkkelord-fallbacken er alle enige.

Vil du ha et dypere blikk på arkitekturen? Chat-assistenten på forsiden
kan ta deg gjennom det. Det er akkurat den typen spørsmål den er bygd for.
