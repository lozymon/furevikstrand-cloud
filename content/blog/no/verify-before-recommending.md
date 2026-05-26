---
title: 'Verifiser før du anbefaler: når AI-en siterer, så grepper du'
summary: 'Den farligste AI-outputen er ikke feil — den er utdatert. Claude siterer selvsikkert et flag fjernet forrige kvartal, en omdøpt funksjon, en sti som ikke finnes lenger. Behandle hvert navngitt symbol som en hypotese. Grep før du handler.'
publishAt: 2026-05-26T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

Den farligste AI-outputen er ikke feil. Den er _utdatert_.

Claude vil anbefale et flag som ble fjernet for tre måneder siden, en funksjon som ble omdøpt forrige kvartal, en filsti som ikke eksisterer lenger. Hver sitering høres riktig ut fordi den _var_ riktig.

![Til venstre: en AI-respons som sier "Bruk --strict-flagget og kall validateInput() fra src/lib/auth/middleware.ts" stemplet SELVSIKKER. Til høyre: terminal-output fra grep som viser at flagget er borte, funksjonen ble omdøpt, og filen flyttet — tre stille bugs AI-en ikke visste om.](/blog/verify-before-recommending/no.svg)

## Standard-feilmodusen

Dette er ikke hallusinasjon. Hallusinasjon er at modellen finner opp et plausibelt-men-falskt API. Dette er verre: modellen gjentar noe som _var_ sant dagen den lærte det, og har ingen måte å merke at det ikke er det lenger.

Tre varianter dukker opp i praksis:

1. **Omdøpte symboler.** En funksjon ble refaktorert forrige kvartal; assistenten siterer fortsatt det gamle navnet.
2. **Fjernede flag.** Et CLI-alternativ ble deprecated; assistenten anbefaler det fortsatt fordi det dukket opp i en doc som er cachet et sted.
3. **Flyttede stier.** En fil ble omorganisert; assistenten siterer den gamle importen.

Ingen av disse ser feil ut på siden. Markdownen er uendret. Modellen sender ut svaret med samme selvtillit som en sitering den genererte i morges.

## Hvorfor dette skjer med ethvert system med persistent tilstand

Det er fristende å kalle dette en modellfeil, men samme mønster dukker opp overalt et lagret snapshot møter en kodebase i bevegelse:

- **Auto-memory.** En memory skrevet for seks uker siden sier at auth-flyten ligger i `src/lib/auth/middleware.ts`. Filen ble omdøpt for to uker siden. Memoryen er nå en hallusinasjons-motor pekt mot prosjektet ditt.
- **RAG over docs.** Indeksen ble sist bygget før omskrivingen. Spørringer returnerer selvsikkert-formaterte svar fra den gamle API-overflaten.
- **Fine-tunede modeller.** Trent på forrige kvartals repo-snapshot. Siterer en funksjon som ble slettet i opprydnings-PR-en.

Det felles trekket er at lagringslaget ikke vet når innholdet ble utdatert. Kodebasen beveger seg; snapshotet gjør det ikke.

## Disiplinen

Fiksen er én vane: når AI-en navngir et spesifikt symbol, behandle det som en hypotese. Verifiser før du handler.

"Verifiser" er nesten alltid et ti-sekunders `grep`:

- _"Bruk `--strict`-flagget"_ → eksisterer `--strict` fortsatt? Grep CLI-en.
- _"Session-middlewaren ligger i `src/lib/auth/session.ts`"_ → eksisterer stien? `ls` den.
- _"Kall `validateInput()`"_ → grep for funksjonen. Ble den omdøpt i forrige refaktor?

Ti sekunder med verifisering fanger det som ellers ville blitt femten minutter med forvirring. Kostnad-nytte-balansen er så skjev at det burde være refleks.

Samme vane gjelder memory-drevne anbefalinger. Hvis en memory refererer til en sti, en funksjon, eller en person på et prosjekt, så er den referansen et krav som må sjekkes — ikke et faktum.

## Hva dette ikke betyr

Det betyr ikke å mistro modellen. Modellen har rett langt oftere enn ikke. Disiplinen er smal: den slår inn på _spesifikke navngitte symboler_, ikke på konseptuell veiledning.

Når AI-en sier _"vurder å trekke ut dette i en helper"_ — det er råd, ingen grep nødvendig. Når den sier _"trekk ut dette i `formatRowForCSV()` som helperen i `src/utils/csv.ts`"_ — _nå_ grepper du. Det navngitte symbolet er delen som eldes. Rådet gjør det ikke.

Dette er også grunnen til at generiske "stol, men verifiser"-formuleringer underpresterer. De er for brede til å bli en vane. _Grep før du handler på et navngitt symbol_ er en vane. Du kan bygge en refleks rundt den.

## Regelen

Når AI-en siterer, så verifiserer du. Når den husker, så sjekker du.

Kodebasen er nåtiden. Memoryen er et snapshot. Når de er uenige, vinner kodebasen.

De ti sekundene med grep er den billigste forsikringen i arbeidsflyten.
