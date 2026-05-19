---
title: 'Negativ-rom-prompten'
summary: 'Du ber Claude om en én-linjes fiks og får en refaktor, tre nye tester, en omdøpt fil og en forklarende kommentar. Fiksen er å scope med negativer — navngi banen assistenten ikke skal gå inn i, så holder resten av prompten seg kort.'
publishAt: 2026-05-20T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

Du ber om en én-linjes fiks. Du får en refaktor, tre nye tester, en omdøpt fil, og en kommentar som forklarer hvorfor endringen er trygg.

![Til venstre: en prompt som sier "Fiks buggen." produserer en utbredt 300-linjers diff som refaktorerer omkringliggende kode, legger til tester, omdøper en fil, og forklarer seg selv. Til høyre: en prompt som sier "Fiks buggen. Ikke refaktorer." produserer en én-linjes diff — akkurat det som ble bedt om.](/blog/negative-space-prompt/no.svg)

## Standard-feilmodusen

Standard-feilmodusen til enhver kapabel assistent — menneske eller AI — er _over-handling_. Bedt om å gjøre én ting, gjør den fem. Hver av ekstrahandlingene virker hjelpsom isolert. Ingen av dem ble bedt om. Sammen dobler de diffen, tripler review-tiden, og begraver den faktiske fiksen i støy.

Hver promptguide jeg har lest prøver å fikse dette ved å legge til flere positive instruksjoner: vær mer spesifikk på hva du vil ha, gi mer kontekst, forklar begrensningene, list opp stegene. Det funker, sånn passe. Det tar også lengre tid å skrive enn fiksen selv.

Det finnes en raskere måte: scope med negativer.

## Hvordan det ser ut

Mønsteret er å legge til én kort setning som sperrer av over-rekkevidden du forventer:

- "Fiks denne buggen. **Ikke refaktorer koden rundt.**"
- "Legg til dette feltet. **Ikke legg til validering; grensen over validerer allerede.**"
- "Skriv migreringen. **Ikke legg til en feature flag.**"
- "Oppdater dokumentet. **Ikke omstrukturer overskriftene.**"
- "Legg til dette endepunktet. **Ikke legg til tester ennå; jeg gjør det i en separat runde.**"

Hver negativ er én kort setning. Ingen av dem krever å ramse opp hva du _vil ha_. De funker fordi de kutter den spesifikke banen assistenten ville ha over-strukket seg inn i.

## Hvorfor dette slår positiv scoping

Du kan få samme utfall ved å være maksimalt spesifikk i positiv retning: "Endre linje 42 fra `==` til `===`. Ikke modifiser noen annen linje i denne filen eller noen annen fil." Det funker. Det tar også tretti sekunder å skrive og leses som en juridisk kontrakt.

Negativ scoping er raskere fordi over-handling har et lite, forutsigbart ordforråd. Nesten hver over-rekkevidde faller inn i én av fire bøtter:

1. **Refaktorering inne i en fiks.** "Fiks X, ikke refaktorer."
2. **Spekulativ validering.** "Ikke legg til validering for tilfeller som ikke kan skje."
3. **Selvforklarende kommentarer.** "Ikke kommenter med mindre WHY-en ikke er åpenbar."
4. **Tester du ikke ba om.** "Ikke skriv tester; jeg gjør det separat."

Hvis du kan navngi banen du _ikke_ vil ha, kan resten av prompten holdes kort. Du beskriver _negativrommet_ av endringen, ikke en oppramsing av dens positive innhold.

## Den ikke-åpenbare delen

Dette er ikke et AI-problem. Det er et _briefing_-problem. Gi en juniorutvikler en vag ticket og de vil enten stille tre oppklarende spørsmål eller — hvis de ikke føler seg trygge nok til å spørre — gjette sjenerøst og shippe mer enn du ville. Gi dem samme ticket pluss "ikke omstrukturer noe, bare patch symptomet," så får du tilbake nøyaktig det du trengte.

Den negative scopen funker på mennesker av samme grunn som den funker på assistenter: den fjerner tvetydighet i dimensjonen som faktisk betyr noe. Den positive forespørselen var alltid klar. Rommet for "hjelpsomme tillegg" var det som trengte å sperres av.

## Når du _ikke_ skal bruke det

Negativ scoping feiler i to tilfeller:

1. **Når prompten i seg selv er utforskende.** "Undersøk denne trege spørringen" bør ikke ha negativer — du vil at assistenten skal følge spor, ikke for-sperre dem.
2. **Når du ikke ennå vet hva du vil.** Negativ scoping forutsetter en kjent form av "ferdig." Hvis specen er uklar, produserer flere negativer bare flere selvsikkert-feil snevre utputter. Planlegg først, scope senere.

Regelen: bruk negativ scope når du vet hvordan "ferdig" ser ut og vil at assistenten skal stoppe ved døra. Bruk åpne prompter når du vil at den skal vandre.

## Regelen

Det du forteller en assistent _ikke_ skal gjøres er mer bærende enn det du ber om. Hver prompt som kommer tilbake med overraskelses-ekstra er en prompt som lot en bane stå åpen. Å navngi banen er én setning. Å skrive en full positiv spec er et avsnitt.

Billig å legge til. Vanskelig å hoppe over når du først har følt forskjellen.
