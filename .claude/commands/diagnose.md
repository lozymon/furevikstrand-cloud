# Diagnose

A discipline for hard bugs. Skip phases only when explicitly justified.

When exploring the codebase, start from `CLAUDE.md` for the architecture map (i18n routing, the three-tier chat pipeline, client chat state). For chat bugs, also check `X-Reply-Source` on the response — it tells you which tier handled the request and therefore where to look.

## Phase 1 — Build a feedback loop

**This is the skill.** Everything else is mechanical. If you have a fast, deterministic, agent-runnable pass/fail signal for the bug, you will find the cause. If you don't, no amount of staring at code will save you.

Spend disproportionate effort here. **Be aggressive. Be creative. Refuse to give up.**

### Ways to construct one — try in roughly this order

1. **Failing test** at whatever seam reaches the bug — unit, integration, e2e.
2. **Curl / HTTP script** against a running dev server.
3. **CLI invocation** with a fixture input, diffing stdout against a known-good snapshot.
4. **Headless browser script** (Playwright) — drives the UI, asserts on DOM/console/network.
5. **Replay a captured trace.** Save a real network request / payload to disk; replay in isolation.
6. **Throwaway harness.** Spin up a minimal subset of the system that exercises the bug code path.
7. **Property / fuzz loop.** If "sometimes wrong output", run 1000 random inputs.
8. **Bisection harness.** Automate "boot at state X, check, repeat" so you can `git bisect run` it.
9. **Differential loop.** Run same input through old vs new version and diff outputs.

Build the right feedback loop, and the bug is 90% fixed.

### Iterate on the loop itself

- Can I make it faster? (Cache setup, skip unrelated init, narrow test scope.)
- Can I make the signal sharper? (Assert on specific symptom, not "didn't crash".)
- Can I make it more deterministic? (Pin time, seed RNG, isolate filesystem.)

A 30-second flaky loop is barely better than no loop. A 2-second deterministic loop is a debugging superpower.

### When you genuinely cannot build a loop

Stop and say so explicitly. List what you tried. Ask the user for: (a) access to the reproducing environment, (b) a captured artifact (HAR, log dump), or (c) permission to add temporary instrumentation. Do **not** proceed to hypothesise without a loop.

Do not proceed to Phase 2 until you have a loop you believe in.

## Phase 2 — Reproduce

Run the loop. Watch the bug appear.

Confirm:

- [ ] The loop produces the failure the **user** described — not a nearby different failure.
- [ ] The failure is reproducible across multiple runs.
- [ ] You have captured the exact symptom (error message, wrong output) so later phases can verify the fix.

## Phase 3 — Hypothesise

Generate **3–5 ranked hypotheses** before testing any of them.

Each must be **falsifiable**: "If X is the cause, then changing Y will make the bug disappear."

Show the ranked list to the user before testing — they often have domain knowledge that re-ranks instantly.

## Phase 4 — Instrument

Each probe must map to a specific prediction from Phase 3. **Change one variable at a time.**

1. **Debugger / REPL** if the env supports it. One breakpoint beats ten logs.
2. **Targeted logs** at the boundaries that distinguish hypotheses.
3. Never "log everything and grep".

**Tag every debug log** with a unique prefix, e.g. `[DEBUG-a4f2]`. Cleanup at the end becomes a single grep.

## Phase 5 — Fix + regression test

Write the regression test **before the fix** — but only if there is a **correct seam** for it.

1. Turn the minimised repro into a failing test.
2. Watch it fail.
3. Apply the fix.
4. Watch it pass.
5. Re-run the Phase 1 feedback loop against the original scenario.

## Phase 6 — Cleanup + post-mortem

- [ ] Original repro no longer reproduces
- [ ] Regression test passes (or absence of seam is documented)
- [ ] All `[DEBUG-...]` instrumentation removed (`grep` the prefix)
- [ ] Throwaway prototypes deleted
- [ ] The correct hypothesis is stated in the commit message

Then ask: what would have prevented this bug?
