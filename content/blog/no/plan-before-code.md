---
title: 'Planlegg før kode: fellen med "bare skriv det"'
summary: 'Claude skriver kode fra hvilken som helst vag prompt — som regel i feil form, og du merker det først 300 linjer inn. Fiksen er én setning: planlegg først. Verdien er ikke planen; det er uenigheten den overflater mens den ennå er gratis.'
publishAt: 2026-05-21T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools, practice]
---

Jeg mistet det meste av en dag denne måneden på en refaktor som måtte reverteres på review. Modellen produserte en selvsikker, plausibel diff. Den hadde feil form. Planen ville fanget det på 90 sekunder.

![Til venstre: en prompt "Refaktorer auth-flyten." produserer en 300-linjers diff som trekker ut en base-klasse, legger til tre strategy-klasser, skriver om kallere, og skriver 18 tester — stemplet "FEIL ABSTRAKSJON — REVERTÉR." Til høyre: samme prompt med "Planlegg først." lagt til produserer en nummerert plan, med én overstryking på strategy-pattern-steget — fanget før koden var skrevet.](/blog/plan-before-code/no.svg)

## Standard-feilmodusen

Claude skriver gjerne kode fra en vag prompt. Det er standard — modellen belønnes for å produsere output, ikke for å stoppe og spørre. Resultatet er som regel _plausibelt_ og feil på en måte du ikke merker før diffen er 300 linjer dyp, abstraksjonen har spredt seg til seks kallere, og å revertere føles nesten like dyrt som å fortsette.

Dette er ikke en modellfeil. Det er en _briefing_-feil. Prompten begrenset ikke formen på svaret, så assistenten valgte en. Den valgte plausibelt. Den valgte feil. Det samme skjer med en juniorutvikler som får en vag ticket; forskjellen er at utvikleren er tregere, så feil retning overflates som regel tidligere.

## Hvordan planlegging ser ut

Fiksen er én ekstra setning:

> "Refaktorer auth-flyten. Planlegg først — ikke skriv kode ennå."

Eller, hvis du foretrekker en slash-kommando, den tilsvarende innebygde agenten. Uansett: modellen produserer en nummerert plan i stedet for en diff. Du leser den. Du slår tilbake på delene som ser feil ut. Du godkjenner. _Så_ skriver den koden.

En typisk plan ser slik ut:

```txt
1. Les eksisterende bruk av authFlow() på tvers av kodebasen.
2. Trekk ut den delte valideringslogikken til en helper.
3. Legg til et strategy-pattern for de tre nåværende tilfellene.
4. Oppdater hver kaller til å bruke det nye inngangspunktet.
5. Legg til tester for hver strategy-gren.
```

Det er også her uenigheten skjer. Steg 3 — "legg til et strategy-pattern" — er nettopp den typen plausibelt-klingende grep som blir til en angret abstraksjon. Med planen foran deg kan du si: "Nei, to av de tilfellene skal slettes om kort tid. Bare inline det tredje." Nå er steg 3 borte før noen kode var skrevet.

## Den ikke-åpenbare delen

Instinktet er å tenke at verdien av planen er _planen i seg selv_ — et veikart, en delt forståelse, et dokument. Det er det ikke.

Verdien er _fangsten_. Planen er bare mediet der uenigheten overflates mens den fortsatt er gratis å rette opp. Samme uenighet, overflatet i en 300-linjers diff, koster deg en revert og en omstart. Overflatet i tre setninger pseudokode, koster den deg femten sekunder.

Når du har internalisert dette, slutter planen å føles som overhead og begynner å føles som billig forsikring. Prisen er én ekstra setning i prompten og 90 sekunder med lesing. Avkastningen er hver feil-retning-commit du ikke shippet.

## Når du ikke skal planlegge

Planlegging er overhead. Som alt overhead bør det bare betales når alternativet er dyrere. Tre tilfeller der jeg hopper over planen:

1. **Trivielt, mekanisk arbeid.** Omdøpinger, formatering, "bruk dette mønsteret 12 steder til." Diffen er forutsigbar. Planlegging legger til friksjon uten å legge til fangster.
2. **Utforskende arbeid.** Undersøke en treg spørring, spore hvorfor en test er flaky. Du _vil_ at assistenten skal følge spor, ikke for-sperre dem. For tidlig planlegging er bare for tidlig begrensning.
3. **Bortkast-kode.** Et skript du skal kjøre én gang og slette. Feil retning er billig; planen er ikke verdt sekundene den koster.

Heuristikken: hvis du kan _forutsi formen på diffen_, hopp over planen. Hvis du ikke kan, planlegg først. Kostnaden av å gjette feil på dette skalerer med størrelsen på endringen.

## 1-linje-regelen

Hvis du ikke kan forutsi diffen, planlegg først.

Det er det. Billig å huske. Billig å bruke. De åtte timene du ikke mister på en angret abstraksjon betaler mer enn nok for sekundene du brukte på å tenke over om du skulle planlegge.

Modellen skriver gjerne feil ting. Jobben din er å merke at den kanskje er i ferd med å gjøre det — og å be om planen i stedet.
