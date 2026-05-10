---
title: 'Jeg bygde mitt eget dashboard for å se hva besøkende spør chatten om'
summary: '/admin er en server-rendret, basic-auth-gated Next.js-side som leser chat-events fra MySQL — 13 paneler for trafikk og chat, inkludert en miss-kø som gjør oppdagede hull til leverte svar på rundt 30 sekunder.'
publishAt: 2026-05-05T09:00:00+02:00
tags: [admin, analytics, selfhosted, privacy, mysql, nextjs]
---

Jeg ville vite hva besøkende faktisk spør portefølje-chatten min om — uten å sende meldingene deres til Google eller Plausible.

Så jeg bygde mitt eget dashboard.

`/admin` på furevikstrand.cloud er en server-rendret Next.js-side, basic-auth-gated, som returnerer 404 når env-variablene ikke er satt så den ikke er oppdagbar. Den leser fra en MySQL-tabell der jeg logger hvert chat-event og sidebesøk (best-effort — hvis databasen er nede, går forespørselen fortsatt gjennom).

13 paneler, to seksjoner.

**Trafikk:** konvertering (besøk → chat-sesjoner), topp-referrers, land (slått opp lokalt via `geoip-lite`, ingen ekstern API), sider, enhetsfordeling, UTM-kilder.

**Chat:** fallback-rate over 30 dager, fordeling på svarkilde (Claude / Ollama / fallback), språkfordeling, topp-temaer, distribusjon av sesjons-dybde, sesjoner per dag, og den mest nyttige — **nylige fallback-bommer**: hvert spørsmål nøkkelord-matcheren min ikke klarte å svare på.

Den miss-tabellen er arbeidskøen. Hver rad har en «copy ts»-knapp som genererer en ferdig `KnowledgeEntry`-stub — nøkler avledet fra meldingen, språk + timestamp-kommentar, TODO-skall for svar på en/no/pt. Lukker løkken fra «så et hull» til «leverte et svar» på rundt 30 sekunder.

Hva er det minste i stacken din du har tatt inn på egen hånd i stedet for å betale en SaaS for det?
