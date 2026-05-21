---
title: 'Plan before code: the trap of "just write it"'
summary: "Claude will write code from any vague prompt — usually in the wrong shape, which you only notice 300 lines in. The fix is one sentence: plan first. The value isn't the plan; it's the disagreement it surfaces while still free to fix."
publishAt: 2026-05-21T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools, practice]
---

I lost most of a day this month to a refactor that needed to be reverted on review. The model produced a confident, plausible diff. It was the wrong shape. The plan would have caught it in 90 seconds.

![Left: a prompt "Refactor the auth flow." produces a 300-line diff that extracts a base class, adds three strategy classes, rewrites callers, and writes 18 tests — stamped "WRONG ABSTRACTION — REVERT." Right: the same prompt with "Plan first." appended produces a numbered plan, with one strike-through on the strategy-pattern step — caught before the code was written.](/blog/plan-before-code/en.svg)

## The default failure mode

Claude will happily write code from a vague prompt. It is the default — the model is rewarded for producing output, not for stopping to ask. The result is usually _plausible_ and wrong in a way you don't notice until the diff is 300 lines deep, the abstraction has spread to six callers, and reverting feels almost as expensive as continuing.

This is not a model failure. It is a _briefing_ failure. The prompt didn't constrain the shape of the answer, so the assistant picked one. It picked plausibly. It picked wrong. The same thing happens with a junior engineer handed a vague ticket; the difference is that the engineer is slower, so the wrong direction usually surfaces earlier.

## What planning looks like

The fix is one extra sentence:

> "Refactor the auth flow. Plan first — don't write code yet."

Or, if you prefer a slash command, the equivalent built-in agent. Either way: the model produces a numbered plan instead of a diff. You read it. You push back on the parts that look wrong. You approve. _Then_ it writes the code.

A typical plan looks like:

```txt
1. Read existing usage of authFlow() across the codebase.
2. Extract the shared validation logic into a helper.
3. Add a strategy pattern for the three current cases.
4. Update each caller to use the new entry point.
5. Add tests for each strategy branch.
```

This is also where the disagreement happens. Step 3 — "add a strategy pattern" — is exactly the kind of plausible-sounding move that turns into a regretted abstraction. With the plan in front of you, you can say: "No, two of those cases are about to be deleted. Just inline the third." Now step 3 is gone before any code was written.

## The non-obvious part

The instinct is to think the value of the plan is _the plan itself_ — a roadmap, a shared understanding, a document. That's not it.

The value is the _catch_. The plan is just the medium where the disagreement surfaces while it's still free to fix. The same disagreement, surfaced in a 300-line diff, costs you a revert and a restart. Surfaced in three sentences of pseudocode, it costs you fifteen seconds.

Once you've internalized this, the plan stops feeling like overhead and starts feeling like cheap insurance. The price is one extra sentence in the prompt and 90 seconds of reading. The payout is every wrong-direction commit you didn't ship.

## When not to plan

Planning is overhead. Like all overhead, it should be paid only when the alternative is more expensive. Three cases where I skip the plan:

1. **Trivial, mechanical work.** Renames, formatting, "apply this pattern in 12 more places." The diff is predictable. Planning adds friction without adding catches.
2. **Exploratory work.** Investigating a slow query, tracing why a test is flaky. You _want_ the assistant to follow leads, not pre-fence them. Premature planning is just premature constraint.
3. **Throwaway code.** A script you'll run once and delete. The wrong direction is cheap; the plan isn't worth the seconds it costs.

The heuristic: if you can _predict the shape of the diff_, skip the plan. If you can't, plan first. The cost of guessing wrong on this scales with the size of the change.

## The 1-line rule

If you can't predict the diff, plan first.

That's it. Cheap to remember. Cheap to apply. The eight hours you don't lose to a regrettable abstraction more than pays the seconds you spent thinking about whether to plan.

The model will happily write the wrong thing. Your job is to notice that it might be about to — and to ask for the plan instead.
