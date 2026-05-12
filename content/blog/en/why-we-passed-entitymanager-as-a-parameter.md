---
title: 'Why we passed EntityManager as a parameter'
summary: 'A stock-drift bug nobody could reproduce locally. The fix was a function signature change — stop injecting EntityManager into NestJS singletons, pass it per-request instead.'
publishAt: 2026-05-12T09:00:00-03:00
tags: [nestjs, typescript, concurrency, dependency-injection, war-story]
---

We had a stock-drift bug that nobody could reproduce locally. The fix was a function signature change.

Our subscription service had a stock manager that injected `EntityManager` via DI and held a reference. Concurrent requests shared the same instance. Under load, transactions started bleeding into each other — one request's rollback would discard another request's committed write.

The classic NestJS shape:

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

Looks fine. Isn't. The injected `em` is a singleton scoped to the module. Every concurrent request shares it. The transaction context inside the `.transaction(...)` callback is request-specific — TypeORM handles that correctly. But the wrapper field on `this` isn't.

Under load, two requests calling `reserve()` at the same millisecond could race in ways the test environment couldn't reproduce, because the test environment was effectively single-threaded. Specifically: if request A's transaction was in flight when request B's transaction started and rolled back, B's rollback could discard committed state from A. Not always. Just often enough to drift the stock counter by one or two units per day in production.

The fix: pass `EntityManager` as an explicit parameter to every method, sourced from the request's transaction context.

```ts
async reserve(eventId: string, manager: EntityManager) {
  return manager.transaction(async (tx) => {
    /* ... */
  })
}
```

Callers source the per-request `EntityManager` via a NestJS interceptor or an `AsyncLocalStorage` lookup. One signature change per method. Three days of refactor across the service. Drift gone within a week of the deploy.

In NestJS the temptation is to inject everything. But injectable + mutable + shared = the bug shape we shipped. Pick any two and you're fine. Pick all three and you ship the bug we shipped.

Rule of thumb: if the same instance lives across requests AND it has state that changes per request, you have a concurrency bug waiting to happen. Pass the state, don't inject it.
