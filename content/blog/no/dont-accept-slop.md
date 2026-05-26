---
title: 'Ikke godta slop på første pass'
summary: 'AI-ens oppsummering av hva den gjorde er ikke det samme som hva den gjorde. Oppsummeringen føles som artefakten. Diffen er artefakten — og den eneste reviewen som holder seks måneder senere er den gjort mot diffen, ikke oppsummeringen.'
publishAt: 2026-05-27T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

AI-ens oppsummering av hva den gjorde er ikke det samme som hva den gjorde.

![Til venstre: en AI-oppsummering som sier "La til input-validering og forbedret feilhåndtering for brukerregistreringsflyten" — selvsikker, plausibel, fire linjer. Til høyre: den faktiske diffen — 60 linjer med try/catch rundt interne kall, tre stykker validering for argumenter som kommer fra allerede-validerte grenser, og en kommentar som forklarer at endringen er trygg.](/blog/dont-accept-slop/no.svg)

## Oppsummering vs diff

Oppsummeringen er en selvsikker gjenfortelling. Den er ofte korrekt. Den er av og til feil om akkurat de delene som teller — den uønskede refaktoren, den spekulative valideringen, kommentar-blokken der en omdøping ville holdt.

Oppsummeringen _føles_ som artefakten. Diffen _er_ artefakten. Seks måneder fra nå vil oppsummeringen være glemt og koden vil fortsatt være der, formende neste persons lesing.

## Tre tegn på slop

Mønstrene er forutsigbare nok til å kjenne igjen på sekunder:

1. **Formen er feil.** Du ba om en fiks, du fikk en refaktor. Du ba om en omdøping, du fikk en ny abstraksjon. Du ba om en kommentar, du fikk en wrapper-funksjon pluss en test for wrapperen. Diffen "fungerer." Det er ikke hva du ville ha.

2. **Defensiv kode for tilfeller som ikke kan skje.** Try/catch rundt interne funksjonskall. Argument-validering for parametre som kommer fra din egen kode. Fallback-stier ingenting noensinne treffer. Vibben er _jeg er forsiktig_. Realiteten er død kode som fremtidige lesere vil behandle som bærende.

3. **Tester som tester mocken, ikke atferden.** Mocken returnerer `{ ok: true }`. Testen asserter at resultatet er `{ ok: true }`. Hvis implementasjonen under test ble erstattet med `return null`, ville testen fortsatt passere — fordi mocken gjør alt arbeidet. Dette er ikke en test. Det er en placebo.

Det alle tre har til felles: de ser produktive ut i oppsummeringen, og de er dødvekt i diffen.

## Hvorfor oppsummeringen er markedsføring

Oppsummeringen genereres av modellen rett etter at den handler, og oppsummerer sitt eget arbeid. Modeller trent til å være hjelpsomme har en tendens til å beskrive arbeidet sitt i hjelpsomt-klingende termer. _"La til validering"_ er den typen frase som høres ut som et steg fremover. _"Skrev 60 linjer død defensiv kode"_ dukker aldri opp i en oppsummering, selv når det er den mer nøyaktige beskrivelsen.

Dette er ikke uærlighet. Det er den naturlige formen på selv-fortelling. Vi gjør det samme på våre egne PR-er.

Korreksjonen er mekanisk: ikke godta oppsummeringen som reviewen. Les diffen. Hver linje.

## 30-sekunders-vanen

For differ under 200 linjer er review-passet:

1. Skann diffen. _Les hver endrede linje._ Ikke en oppsummering, ikke en sammenfoldet visning — selve linjene.
2. For hver blokk, spør: ville jeg skrevet dette?
3. Avvis enhver linje som feiler testen. Enten slett den selv eller be om et strammere pass.

For større differ er vanen den samme, men vanskeligere — og nettopp der slop gjemmer seg best. Større differ er der den fire-linjers oppryddingen blir en 200-linjers refaktor.

Hvis en diff er _"for lang å reviewe,"_ er det riktige svaret _"da er den for lang å merge."_ Be om at den brytes opp, eller skoperes ned.

## Når regelen kan slakkes

Jeg bruker ikke dette på:

- Bortkast-skript jeg skal kjøre én gang og slette.
- Generert boilerplate jeg eksplisitt har bedt om (et migrerings-stillas, et test-fixture).
- Output fra formatere eller lintere.

Overalt ellers går diffen gjennom 30-sekunders-passet før den blir staget.

## Regelen

Oppsummeringen er markedsføring. Diffen er produktet. Reviewen du skylder er til diffen.

Slop hoper seg opp. Innen du legger merke til wrapper-klassen ingen kan navngi, har den blitt importert av tolv filer. De 30 sekundene du ikke brukte på å lese blir til de 30 minuttene du bruker på å slette.

Seks måneder senere er det ingen som husker oppsummeringen. Koden er det som er igjen.
