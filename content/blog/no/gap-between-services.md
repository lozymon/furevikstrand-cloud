---
title: 'Buggen som levde i gapet mellom to tjenester'
summary: "To tjenester regnet 'sold' på to forskjellige måter. Admin fikk en 409 Conflict som ikke ga mening fra noen av sidene. Buggen var ikke i noen av tjenestene — den var i gapet mellom dem, og en kontrakttest stopper den neste."
publishAt: 2026-05-14T09:00:00-03:00
tags: [microservices, debugging, distributed-systems, war-story]
---

En bug-fiks tok to uker fordi buggen ikke var i koden jeg endret.

![To tjenester som regner ut samme tall på to forskjellige måter: visningsveien sier sold=7, valideringsveien sier sold=10, Δ=3 i gapet mellom dem.](/blog/gap-between-services/no.svg)

## Symptomet

En admin åpner inventarsiden for en vare. Siden sier **3 tilgjengelig**. De vil korrigere det ned til **0** fordi de vet at varen er utsolgt.

De submitter. Serveren returnerer en generisk **409 Conflict**. Ingen detaljer, ingen diff, bare "conflict."

De prøver **1**. Samme 409.

De prøver **3** — likt det siden allerede viser. Det aksepteres. De refresher.

Siden sier fortsatt **3 tilgjengelig**.

Det er buggen slik admin så den. Fra deres ståsted er skjemaet ødelagt: det avviser verdier som burde være OK, og aksepterer en verdi som synlig ikke får effekt.

## Hva som faktisk skjedde

Det er to veier gjennom denne flyten, og de regnet hver "sold" mot forskjellige sannhetskilder.

- **Visningsveien.** Inventarsiden treffer lokal database direkte. Rask spørring. Den telte fullførte kjøp og ekskluderte reservasjons-kupong-abonnementer, fordi det var slik rapporten opprinnelig ble spesifisert.
- **Valideringsveien.** Lagre-endepunktet kryssjekker med en separat mikrotjeneste over HTTP før den aksepterer den nye "available"-verdien. Den tjenesten har sin egen modell av hva "sold" betyr, og den _inkluderer_ reservasjons-kupong-abonnementer.

For de fleste varer var de to definisjonene enige, så ingen merket det. Akkurat denne varen hadde tre reservasjons-kupong-abonnenter. Visningen sa `sold = 7`. Validatoren sa `sold = 10`. Admin stirret på en side som trodde det var tre enheter slingringsmonn som — fra validatorens perspektiv — ikke fantes.

Så `available = 0` feilet validering (validatoren trodde 10 var solgt; du kan ikke ha færre tilgjengelig enn solgt). `available = 3` passerte validering (3 ≥ 3 fra visningens syn, og validatorens `available - sold`-sjekk holdt også fordi validatorens terskel for _denne_ veien var strukturert annerledes). Og siden fortsatte å vise 3 etterpå fordi _visnings_-spørringen ikke hadde endret seg — tallet hadde ikke vært galt etter sine egne regler.

To spørringer. Hver korrekt mot sin egen definisjon. Begge med samme navn på det.

## Hvorfor fiksen tok to uker

Den første uken ble brukt på å behandle det som en bug i siden. Så som en bug i valideringsendepunktet. Så som en bug i API-kontrakten. Hver av disse er en forsvarlig lesning — og hver er feil, fordi buggen ikke er _i_ noen av sidene.

Øyeblikket vi skrev de to spørringene ned ved siden av hverandre og spurte "hva er funksjonen som produserer dette tallet?" var øyeblikket det ble åpenbart. Vi hadde ikke én funksjon. Vi hadde to definisjoner av samme ord.

> Når to tjenester regner ut "samme tall" på to forskjellige måter, har du ikke en teller. Du har et kappløp mot din egen rapportering.

Reservasjons-kupong-entiteten ble lagt til måneder tidligere. Den ble plumbet inn i validatorens beregning (fordi abonnementer er hvordan validatoren resonnerer rundt forpliktelser), og den ble ikke plumbet inn i visningsspørringen (fordi visningsspørringen var scopet til "fullførte kjøp" og reservasjons-kuponger teknisk sett ikke er det ennå).

Hver reviewer som så hver endring isolert ville ha godkjent den. Ingen av sidene var feil i seg selv.

## Fiksen

Instinktet er å velge side. _Visningen er det rette svaret; oppdater validatoren._ Eller _validatoren er autoritativ; oppdater visningen._ Å velge side er halve fiksen.

Den ekte fiksen har to deler:

1. **Bestem hvilken definisjon som er riktig, i domenet — ikke i noen av tjenestene.** "Sold," i dette domenet, inkluderer reservasjons-kupong-abonnenter, fordi forretningen bryr seg om forpliktelser, ikke bare gjennomførte checkouts. Skriv det ned et sted som varer.
2. **Bruk den definisjonen overalt der tallet dukker opp.** Begge tjenestene. Visningsspørringen. Valideringsspørringen. Avstemmings-rapporten. CSV-eksporten. Hver rapport som navngir tallet får samme definisjon.

Steg 2 er den trege. Du må faktisk finne alle rapportene. Vi fant fire i denne kodebasen. Det var sannsynligvis flere.

## Når du ikke kan dele funksjonen

Den rene versjonen av regelen er: skriv funksjonen én gang, kall den fra begge veiene.

Det er ofte umulig på tvers av mikrotjeneste-grenser — forskjellige runtimes, forskjellige perf-budsjetter, forskjellige SLAer. Du kan ikke dele Python-funksjonen med Node-tjenesten. Greit. Reservealternativet er:

**Skriv en kontrakttest som kjører mot begge implementasjonene med samme input-matrise og asserter likhet.**

```ts
const cases = [
  { fixture: 'no-coupons', expectedSold: 7 },
  { fixture: 'with-reservation-3', expectedSold: 10 },
  { fixture: 'fully-cancelled-batch', expectedSold: 0 },
  // every input shape that matters in the domain
]

for (const c of cases) {
  test(`sold(${c.fixture}) — display path`, async () => {
    expect(await displaySvc.sold(c.fixture)).toBe(c.expectedSold)
  })
  test(`sold(${c.fixture}) — validation path`, async () => {
    expect(await validationSvc.sold(c.fixture)).toBe(c.expectedSold)
  })
}
```

Poenget med kontrakttesten er ikke å fange buggen vi allerede fikset. Det er å feile høylytt neste gang noen legger til en ny entitetstype som skal telle mot "sold" og bare oppdaterer én side. Det kommer til å skje, fordi kodebasen ikke har én funksjon å oppdatere — den har to, i to tjenester, og revieweren av hver endring kommer ikke til å se den andre.

## Mønsteret, generalisert

Hvis domenet ditt har et tall som betyr noe, har det nøyaktig én definisjon.

"Betyr noe" jobber hardt i den setningen. Mange tall betyr ikke noe i denne strenge forstanden — en cachet teller på et dashboard, et grovt estimat i en tooltip, en analytics-figur som har lov til å henge etter. De kan drifte. Ingen dør.

De som betyr noe er de som _styrer atferd_: validering, fakturering, kapasitet, tilgjengelighet, locking. Når to tjenester begge styrer atferd basert på "samme tall" og regner det forskjellig, har du ikke en teller. Du har en kontrakt-bug som later som den er en teller.

Det diagnostiske spørsmålet er:

> Hvis tjeneste A sitt tall og tjeneste B sitt tall er uenige, hvilket kommer systemet til å handle på, og hva skjer med brukeren?

Hvis svaret er "kommer an på hvilket endepunkt de treffer," har du denne buggen. Du har bare ikke funnet input-formen som trigger den ennå.

## Hvor det samme mønsteret skjuler seg

Dette kom opp for stock-tellinger. Det samme mønsteret dukker opp på mange andre steder:

- **"Er denne brukeren medlem av denne gruppen?"** Auth sier ja. Billing sier nei. De er uenige om en prøveperiode teller.
- **"Hvor mange seter er ledige?"** Bookingsiden sier 4. Checkout sier 2. De er uenige om holdt-men-ubetalte reservasjoner teller.
- **"Hva er brukerens tier?"** Frontend sier Pro. Backend sier Free. De er uenige om en autofornyelses-feil har downgrade-et dem ennå.
- **"Er denne fakturaen betalt?"** Webhook sier ja. Databasen sier nei. De er uenige om hva "betalt" betyr i et delvis-refusjons-vindu.

Alle disse er samme bug. To spørringer, ett navn, to definisjoner, ingen kontrakt.

## Regelen

Hvis et tall betyr noe, har det nøyaktig én definisjon. Hvis du ikke kan dele funksjonen på tvers av tjenester, skriv en kontrakttest som tvinger dem til å bli enige på hver input-form du bryr deg om. Noe mindre, og du skedulerer buggen — du vet bare ikke hvilken input som trigger den, eller hvilken on-call som får pagen.

Buggen er ikke i noen av tjenestene. Den er i gapet.
