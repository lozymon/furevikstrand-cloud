---
title: 'Hvorfor vi sendte EntityManager som parameter'
summary: 'En stock-drift-bug som ingen klarte å reprodusere lokalt. Fiksen var én signaturendring — slutt å injecte EntityManager i NestJS-singletons, send den per request i stedet.'
publishAt: 2026-05-12T09:00:00-03:00
tags: [nestjs, typescript, concurrency, dependency-injection, war-story]
---

Vi hadde en stock-drift-bug som ingen klarte å reprodusere lokalt. Fiksen var én funksjonssignatur-endring.

Subscription-tjenesten vår hadde en stock manager som injectet `EntityManager` via DI og holdt på referansen. Samtidige forespørsler delte samme instans. Under last begynte transaksjonene å lekke inn i hverandre — én forespørsels rollback kunne forkaste en annen forespørsels committed skrivning.

Det klassiske NestJS-mønsteret:

```ts
@Injectable()
class StockManager {
  constructor(@InjectEntityManager() private em: EntityManager) {}

  async reserve(eventId: string) {
    return this.em.transaction(async (tx) => {
      /* ... */
    })
  }
}
```

Ser greit ut. Er det ikke. Den injectede `em`-en er en singleton scoped til modulen. Hver samtidige forespørsel deler den. Transaksjonskonteksten inni `.transaction(...)`-callbacken er request-spesifikk — TypeORM håndterer det riktig. Men wrapper-feltet på `this` er ikke det.

Under last kunne to forespørsler som kalte `reserve()` på samme millisekund race på måter testmiljøet ikke klarte å reprodusere, fordi testmiljøet i praksis var single-threaded. Konkret: hvis forespørsel A sin transaksjon var i ferd med å fullføres når forespørsel B sin transaksjon startet og rullet tilbake, kunne B sin rollback forkaste committet state fra A. Ikke alltid. Bare ofte nok til å drifte stock-telleren med én eller to enheter per dag i produksjon.

Fiksen: send `EntityManager` som eksplisitt parameter til hver metode, sourcet fra forespørselens transaksjonskontekst.

```ts
async reserve(eventId: string, manager: EntityManager) {
  return manager.transaction(async (tx) => {
    /* ... */
  })
}
```

Kallerne henter den per-request `EntityManager` via en NestJS-interceptor eller en `AsyncLocalStorage`-lookup. Én signaturendring per metode. Tre dagers refaktorering på tvers av tjenesten. Driften forsvant innen en uke etter deploy.

I NestJS er fristelsen å injecte alt. Men injectable + mutable + shared = bug-formen vi shippet. Velg to av tre og du er trygg. Velg alle tre, og du shipper bugen vi shippet.

Tommelfingerregel: hvis samme instans lever på tvers av forespørsler OG den har state som endres per forespørsel, har du en concurrency-bug som venter på å skje. Send state, ikke injecte den.
