---
title: 'Tre slash-kommandoer som tjener inn plassen sin'
summary: 'De fleste Claude Code-funksjoner forblir ubrukt — folk forlater aldri chat. /review, /security-review, og /init betaler for seg selv på dag én, men hver har en feilbruk som gjør dem til teater. Verktøyet er gratis; vanen er kostnaden.'
publishAt: 2026-05-28T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

De fleste Claude Code-funksjoner forblir ubrukt fordi folk aldri kommer forbi chat.

![Tre vertikale kort på mørk bakgrunn. Hvert kort viser en slash-kommando, hva den gjør på én linje, og en "vanlig feil"-utheving. Kort 1: /review — les diffen før push — feil: kjøre den etter push. Kort 2: /security-review — audit sikkerhets-sensitive filer — feil: kjøre den på hele branchen. Kort 3: /init — bootstrap CLAUDE.md — feil: beholde outputen som den er.](/blog/three-slash-commands/no.svg)

Chat er inngangsoverflaten. Det er ikke produktet. Produktet er alt du bygger oppå: skills, agenter, hooks, slash-kommandoer, settings. Mesteparten forblir ubrukt fordi chat-overflaten alene er _nok_ til å føle seg produktiv — og "nok" er fienden av "faktisk bra."

Tre kommandoer tjener inn plassen sin på dag én. Hver kommer med én vanlig feil som gjør den til teater.

## `/review` — les diffen før du pusher

Hva den gjør: kjører en code review-pass på den nåværende branchen. Fanger den halvferdige testen, den gjenglemte `TODO`-en, den ubrukte importen, funksjonen som mistet sin eneste kaller for to refaktorer siden.

Hvordan jeg bruker den: før _hver_ push. Solo-brancher inkludert. Marginalkostnaden er 30 sekunder. Forventet verdi over et år med brancher er enorm — én fanget regresjon betaler for tusenvis av kjøringer.

Den vanlige feilen: å kjøre `/review` _etter_ pushen. På det tidspunktet er reviewen teater — du har allerede lagt endringen til teamets mentale modell, og enhver fangst nå krever en oppfølger-PR. Hele poenget med den lokale reviewen er at den er gratis å handle på. Kjør den før pushen, så push.

## `/security-review` — smal scope eller støy

Hva den gjør: auditer endringene for vanlige sikkerhetsproblemer — input-håndtering, auth, hemmeligheter, eksterne grenser.

Når den skal brukes: enhver endring som rører autentisering, alt som leser brukerinput, alt som når utenfor tillitsgrensen (HTTP, fil-IO, subprocess, database). For alt annet overstiger støy-kostnaden nytten.

Den vanlige feilen: å peke den på hele branchen. En 400-linjers PR med tolv filer overflater tolv plausibelt-klingende "vurder"-funn, halvparten av dem gjelder kode som ikke ble rørt og aldri hadde problemet. Signalet drukner.

Fiksen er å skopere: kjør den på _kun de sikkerhets-sensitive filene_. To filer inn, fire funn ut, alle relevante. Nå gjør reviewen arbeid.

## `/init` — start, ikke ship

Hva den gjør: bootstrapper en `CLAUDE.md` ved å lese kodebasen og oppsummere struktur, konvensjoner, og inngangspunkter.

Når den skal brukes: ethvert nytt repo, eller ethvert eksisterende repo uten en CLAUDE.md. Outputen er en nyttig startstruktur — seksjoner du ikke trengte å navngi, stillas du ikke trengte å skrive.

Den vanlige feilen: å beholde outputen som den er. Bootstrapen er generisk. Den ser ut som dokumentasjon. Den fungerer som tapet — modellen leser den og får en vag følelse av kodebasen, men ingen reell begrensning på atferd.

Verdien kommer fra redigeringene _du_ gjør oppå. Din smak, dine hendelser, dine "ikke gjør"-er. Hver memory der inne bør være noe du ville sagt til en lagkamerat etter en hendelse — ikke noe som kan utledes fra `ls`. Bootstrapen er lerretet; verdien er malingen.

## Mønsteret

Alle tre har samme form:

1. Gratis å kjøre.
2. Høy verdi på riktig tidspunkt.
3. Null verdi — eller negativ — hvis du bruker dem feil.

Grunnen til at folk ikke plukker dem opp er ikke mangel på tilgang. Det er at disiplinen "kjør dette _her_, ikke _der_" er usynlig før du allerede har betalt for feilen én gang.

## Regelen

Verktøyet er gratis. Vanen er kostnaden.

Hvis du har brukt Claude Code i en uke og ikke har rørt noen av disse tre, opererer du på den minst mulige overflaten av et mye større produkt. Å plukke opp én — og kjøre den på riktig tidspunkt med riktig scope — er den billigste arbeidsflyt-oppgraderingen tilgjengelig.

Betal vanen én gang. Den tjener inn for alltid.
