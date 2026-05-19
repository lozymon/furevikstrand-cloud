---
title: 'CLAUDE.md-en som faktisk endrer atferd'
summary: 'De fleste CLAUDE.md-filer beskriver prosjektet. Stack, mapper, build-kommandoer — ting Claude kan utlede med to ls-kall. Filene som faktisk endrer atferd har tre regeltyper: negative, hendelses-rotfestet, smak-med-en-grunn.'
publishAt: 2026-05-19T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

Mine første CLAUDE.md-filer endret ikke Claudes atferd i det hele tatt.

![Til venstre: en CLAUDE.md full av prosjektbeskrivelse (stack, mapper, build-kommando) merket "Claude kan utlede dette." Til høyre: en CLAUDE.md full av negative regler, hendelses-rotfestede regler, og smaksregler med en grunn — merket "endrer hva som blir skrevet."](/blog/claude-md-that-changes-behavior/no.svg)

## Instinktet som svikter

Når du først åpner en blank CLAUDE.md, er instinktet å beskrive prosjektet. Stack, mapper, build-kommandoer, package manager, deploy-target.

```txt
Stack: Next.js + Postgres
Folders: src/, app/, lib/
Build: npm run build
Tests: npm test
```

Det føles produktivt. Det er det ikke. Claude kan utlede nesten alt fra repoet med to `ls`-kall og en `package.json`-lesning. Filen beskriver det modellen allerede kan se, som betyr at den ikke endrer noe i outputen. Du har ikke tunet assistenten; du har skrevet en README.

CLAUDE.md-filene som faktisk skifter atferd har tre typer regler, og nesten ingen prosjektbeskrivelse.

## Hva som funker: tre regeltyper

### 1. Negative regler

Regler på formen "ikke gjør X." Disse er bærende fordi standardfeilmodusen til enhver assistent er _over-handling_: du ber om en bug-fiks og får en refaktorering, eller du ber om én funksjon og får en ny abstraksjon.

Eksempler som lønner seg på tvers av en kodebase:

- "Ikke legg til kommentarer med mindre WHY-en ikke er åpenbar."
- "Ingen bakoverkompatibilitets-shims. Endre koden."
- "Ikke legg til error handling for tilfeller som ikke kan skje — valider bare ved systemgrenser."
- "Spør før destruktive git-kommandoer."

Hver negative regel sperrer av én vanlig over-rekkevidde. Den kumulative effekten er en reviewer-mengde av tilbakeholdenhet, brukt stille på hvert eneste trekk.

### 2. Hendelses-rotfestede regler

Regler som finnes fordi noe spesifikt gikk galt, og du ikke vil at det skal skje igjen. Disse har en _grunn_, og grunnen er hele poenget.

- "Integrasjonstester må treffe en ekte database, ikke mocks. Grunn: Q3 mock/prod-divergens skjulte en ødelagt migrering."
- "Slett aldri filer i `/migrations/` selv om de ser ut som de er utgått. Grunn: rollback-støtte avhenger av hele historien."
- "Bruk eksisterende logger, ikke console.log. Grunn: console-output blir droppet av production log shipper."

Grunnen betyr like mye som regelen. Uten en _grunn_ ser en hendelses-rotfestet regel vilkårlig ut i edge cases, og modellen vil enten over-anvende den eller stille hoppe over den. Med en _grunn_ kan modellen utøve skjønn når edge casen dukker opp.

### 3. Smaksregler med en grunn

Preferansevalg om hvordan du liker arbeid skal gjøres — men aldri rene preferanser. Hver smaksregel trenger grunnen.

- "Foretrekk én samlet PR for refaktoreringer i dette området. Grunn: reviewerne ba om det."
- "Default til knappe PR-beskrivelser. Grunn: lange blir ikke lest."
- "Unngå premature abstraksjoner. Tre like linjer er bedre enn en helper brukt én gang."

Smaksregel + grunn-mønsteret er forskjellen mellom en assistent som speiler stilen din og en som drifter tilbake til treningsdata-defaultene i det øyeblikket prompten din blir kort.

## Smaks-testen

For hver linje i CLAUDE.md, spør:

> Hvis jeg fjernet denne linjen, ville Claudes output blitt målbart dårligere?

Hvis svaret er nei, er linjen dekorasjon. Dekorasjon er dyrt — det spiser kontekst-vinduet ditt hvert eneste trekk, og det utvanner signalet til linjene som betyr noe. Kutt den.

Linjer som passerer smaks-testen er nesten alltid en av de tre typene over. Linjer som feiler er nesten alltid prosjektbeskrivelse.

## Regelen du burde fjerne

En kontraintuitiv praksis: hver par uker, se på CLAUDE.md og finn den _ene regelen som slo tilbake_. Kanskje den er for streng og modellen begynte å gjøre feile ting for å adlyde den. Kanskje den er for vag og modellen tolket den annerledes enn du mente. Kanskje kodebasen flyttet seg og regelen ikke gjelder lenger.

Kutt den.

En CLAUDE.md som bare vokser er en CLAUDE.md som har akkumulert døde regler — og døde regler er verre enn ingen regler, fordi modellen behandler dem med samme vekt som de levende. Disiplinen med å fjerne én utgått regel per gjennomgang holder filens signal høyt.

## Hvorfor dette betyr mer enn du skulle tro

CLAUDE.md er en av de mest hevstang-tunge 30 minuttene du kommer til å bruke på AI-tooling. I motsetning til prompts — som gjelder én gang og så er glemt — gjelder CLAUDE.md på hvert trekk, i hver samtale, til du endrer den. En god regel betaler deg tilbake hundrevis av ganger. En dårlig regel villeder deg hundrevis av ganger.

Formen på filen betyr mindre enn det som står i den. Markdown, plain text, bullets, prosa — Claude håndterer alle. Det som betyr noe er om filen _begrenser_ eller _beskriver_. Å beskrive er trøstende og ubrukelig. Å begrense er ubehagelig og hele poenget.

## Regelen

Hvis en linje i CLAUDE.md ikke endrer hva som blir skrevet, hører den ikke hjemme der. Negative regler, hendelses-rotfestede regler med en grunn, smaksregler med en grunn — de gjør seg fortjent til plassen. Prosjektbeskrivelse gjør ikke det.

Modellen kan lese kodebasen din. Den kan ikke lese hendelsene dine.
