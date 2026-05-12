---
title: 'The cache that crossed tenants'
summary: "Two customers spent a morning quoting each other's prices because a NestJS singleton held an in-memory Map keyed by SKU and nothing else. The fix was three characters."
publishAt: 2026-05-19T09:00:00+02:00
tags: [nestjs, typescript, multitenant, caching, war-story]
---

Two of our biggest customers spent a morning quoting each other's prices. The fix was three characters in a cache key.

Our pricing service held a `Map<string, Price>` on a NestJS singleton, keyed by SKU. Worked beautifully in tests, because tests only ever had one tenant. In prod, two tenants shared a supplier and therefore shared SKUs. Whichever request populated the cache first set the price for everyone who asked for that SKU after.

The classic shape:

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

Looks fine. Isn't. The cache lives across requests — that's the point of caching. But the key carries no tenant, so a tenant-scoped value sits in a tenant-agnostic slot.

The fix:

```ts
async getPrice(tenantId: string, sku: string) {
  const key = `${tenantId}:${sku}`
  if (!this.cache.has(key)) {
    this.cache.set(key, await this.repo.fetch(tenantId, sku))
  }
  return this.cache.get(key)!
}
```

Three characters of key, one parameter on the signature. Twelve lines of incident report.

The bug doesn't fire until two tenants collide on the inner key — which means it survives every test and every staging environment seeded with one tenant. After the fix, we audited every other in-memory `Map` and `Set` in the service for the same shape. Found two more. Same patch.

Rule of thumb: any in-memory map in a multi-tenant service is a data leak waiting to happen if the key doesn't carry the tenant. Scope the key. Trust nothing shared.
