---
title: 'The bug that lived in the gap between two services'
summary: "Two services computed 'sold' two different ways. The admin got a 409 Conflict that made no sense from either seat. The bug wasn't in either service — it was in the gap between them, and a contract test stops the next one."
publishAt: 2026-05-14T09:00:00-03:00
tags: [microservices, debugging, distributed-systems, war-story]
---

A bug fix took two weeks because the bug wasn't in the code I changed.

![Two services computing the same number two different ways: display path says sold=7, validation path says sold=10, Δ=3 in the gap between them.](/blog/gap-between-services/en.svg)

## The symptom

An admin opens the inventory page for an item. The page says **3 available**. They want to correct it down to **0** because they know the item is sold out.

They submit. The server returns a generic **409 Conflict**. No detail, no diff, just "conflict."

They try **1**. Same 409.

They try **3** — equal to what the page already shows. It accepts. They refresh.

The page still says **3 available**.

That's the bug as the admin saw it. From their seat, the form is broken: it rejects values that should be fine, and accepts a value that visibly doesn't take effect.

## What was actually happening

There are two paths in this flow, and they were each computing "sold" against a different source of truth.

- **Display path.** The inventory page hits the local database directly. Fast query. It counted finalized purchases and excluded reservation-coupon subscriptions, because that's how the report was originally specified.
- **Validation path.** The save endpoint cross-checks with a separate microservice over HTTP before accepting the new "available" value. That service has its own model of what "sold" means, and it _includes_ reservation-coupon subscriptions.

For most items the two definitions agreed, so nobody noticed. This particular item had three reservation-coupon subscribers. The display said `sold = 7`. The validator said `sold = 10`. The admin was staring at a page that thought there were three units of headroom that, from the validator's perspective, didn't exist.

So setting `available = 0` failed validation (the validator thought 10 were sold; you can't have fewer available than sold). Setting `available = 3` passed validation (3 ≥ 3 from the display's view, and the validator's `available - sold` check also held because the validator's threshold for _this_ path was structured differently). And the page kept showing 3 afterward because the _display_ query hadn't changed — its number hadn't been wrong by its own rules.

Two queries. Each correct against its own definition. Both naming the same thing.

## Why the fix took two weeks

The first week was spent treating it as a bug in the page. Then as a bug in the validation endpoint. Then as a bug in the API contract. Each of those is a defensible reading — and each is wrong, because the bug isn't _in_ either side.

The moment we wrote the two queries down next to each other and asked "what's the function that produces this number?" was the moment it became obvious. We didn't have one function. We had two definitions of the same word.

> When two services compute "the same number" two different ways, you don't have a counter. You have a race against your own reporting.

The reservation-coupon entity type had been added months earlier. It got plumbed into the validator's calculation (because subscriptions are how the validator reasons about commitments), and it didn't get plumbed into the display query (because the display query was scoped to "finalized purchases" and reservation coupons technically aren't that yet).

Every reviewer who saw either change in isolation would have approved it. Neither side was wrong on its own.

## The fix

The instinct is to pick a side. _Display is the right answer; update the validator._ Or _the validator is authoritative; update the display._ Picking sides is half the fix.

The real fix has two parts:

1. **Decide which definition is correct, in the domain — not in either service.** "Sold," in this domain, includes reservation-coupon subscribers, because the business cares about commitments, not just completed checkouts. Write that down somewhere durable.
2. **Apply that definition everywhere the number appears.** Both services. The display query. The validation query. The reconciliation report. The CSV export. Every reporter that names the number gets the same definition.

Step 2 is the slow one. You have to actually find all the reporters. We found four in this codebase. There were probably more.

## When you can't share the function

The clean version of this rule is: write the function once, call it from both paths.

That's often impossible across microservice boundaries — different runtimes, different perf budgets, different SLAs. You can't share the Python function with the Node service. Fine. The fallback is:

**Write a contract test that runs against both implementations with the same input matrix and asserts equality.**

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

The point of the contract test isn't to catch the bug we already fixed. It's to fail loudly the next time someone adds a new entity type that should count toward "sold" and only updates one side. Which is going to happen, because the codebase doesn't have a single function to update — it has two, in two services, and the reviewer of either change won't see the other.

## The shape, generalized

If your domain has a number that matters, it has exactly one definition.

"Matters" is doing work in that sentence. Plenty of numbers don't matter in this strict sense — a cached count on a dashboard, a rough estimate in a tooltip, an analytics figure that's allowed to lag. Those can drift. Nobody dies.

The ones that matter are the ones that _gate behavior_: validation, billing, capacity, eligibility, locking. When two services both gate behavior on "the same number" and compute it differently, you don't have a counter. You have a contract bug masquerading as a counter.

The diagnostic question is:

> If service A's number and service B's number disagree, which one is the system going to act on, and what happens to the user?

If the answer is "depends on which endpoint they hit," you have this bug. You just haven't found the input shape that triggers it yet.

## Where the same shape hides

This came up for stock counts. The same shape shows up in plenty of other places:

- **"Is this user a member of this group?"** Auth says yes. Billing says no. They disagree on whether a trial period counts.
- **"How many seats are available?"** Booking page says 4. Checkout says 2. They disagree on whether held-but-unpaid reservations count.
- **"What's the user's tier?"** Frontend says Pro. Backend says Free. They disagree on whether an auto-renewal failure has demoted them yet.
- **"Has this invoice been paid?"** Webhook says yes. Database says no. They disagree on what "paid" means in a partial-refund window.

All of these are the same bug. Two queries, one name, two definitions, no contract.

## The rule

If a number matters, it has exactly one definition. If you can't share the function across services, write a contract test that forces them to agree on every input shape you care about. Anything less and you're scheduling the bug — you just don't know which input will trigger it, or which on-call will get the page.

The bug isn't in either service. It's in the gap.
