---
title: 'Cachen som krysset tenants'
summary: 'To kunder brukte en hel morgen på å gi hverandre tilbud med feil priser fordi en NestJS-singleton hadde et in-memory Map nøklet kun på SKU. Fiksen var tre tegn.'
publishAt: 2026-05-19T09:00:00+02:00
tags: [nestjs, typescript, multitenant, caching, war-story]
---

To av våre største kunder brukte en hel morgen på å gi hverandre tilbud med feil priser. Fiksen var tre tegn i en cache-nøkkel.

Pristjenesten vår hadde et `Map<string, Price>` på en NestJS-singleton, nøklet på SKU. Fungerte perfekt i tester, fordi testene aldri hadde mer enn én tenant. I prod delte to tenants en leverandør, og dermed delte de SKU-er. Den forespørselen som først fylte cachen, satte prisen for alle andre som spurte etter samme SKU.

Det klassiske mønsteret:

```ts
@Injectable()
class PricingService {
  private cache = new Map<string, Price>()

  async getPrice(sku: string) {
    if (!this.cache.has(sku)) {
      this.cache.set(sku, await this.repo.fetch(sku))
    }
    return this.cache.get(sku)!
  }
}
```

Ser greit ut. Er det ikke. Cachen lever på tvers av forespørsler — det er hele poenget med å cache. Men nøkkelen bærer ingen tenant, så en tenant-spesifikk verdi ligger i en tenant-agnostisk slot.

Fiksen:

```ts
async getPrice(tenantId: string, sku: string) {
  const key = `${tenantId}:${sku}`
  if (!this.cache.has(key)) {
    this.cache.set(key, await this.repo.fetch(tenantId, sku))
  }
  return this.cache.get(key)!
}
```

Tre tegn i nøkkelen, én parameter i signaturen. Tolv linjer med hendelsesrapport.

Bugen slår ikke til før to tenants kolliderer på den indre nøkkelen — som betyr at den overlever hver test og hvert staging-miljø som er seedet med én tenant. Etter fiksen gikk vi gjennom alle andre in-memory `Map` og `Set` i tjenesten for samme mønster. Fant to til. Samme patch.

Tommelfingerregel: et hvilket som helst in-memory map i en multi-tenant tjeneste er en datalekkasje som venter på å skje hvis nøkkelen ikke bærer tenant-en. Skop nøkkelen. Stol ikke på noe som deles.
