---
title: 'The negative-space prompt'
summary: 'You ask Claude for a one-line fix and get a refactor, three new tests, a renamed file, and an explanatory comment. The fix is to scope with negatives — name the lane the assistant should not enter, and the rest of the prompt stays short.'
publishAt: 2026-05-20T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

You ask for a one-line fix. You get a refactor, three new tests, a renamed file, and a comment explaining why the change is safe.

![Left: a prompt that says "Fix the bug." produces a sprawling 300-line diff that refactors surrounding code, adds tests, renames a file, and explains itself. Right: a prompt that says "Fix the bug. Don't refactor." produces a one-line diff — exactly what was asked for.](/blog/negative-space-prompt/en.svg)

## The default failure mode

The default failure mode of any capable assistant — human or AI — is _over-action_. Asked to do one thing, it does five. Each of the extras seems helpful in isolation. None of them were asked for. Together they double the diff, triple the review time, and bury the actual fix in noise.

Every prompting guide I've read tries to fix this by adding more positive instructions: be more specific about what you want, give more context, explain the constraints, list the steps. This works, kind of. It also takes longer to write than the fix itself.

There's a faster way: scope with negatives.

## What it looks like

The pattern is to append one short sentence that fences off the over-reach you expect:

- "Fix this bug. **Don't refactor the surrounding code.**"
- "Add this field. **Don't add validation; the boundary above already validates.**"
- "Write the migration. **Don't add a feature flag.**"
- "Update the doc. **Don't restructure the headings.**"
- "Add this endpoint. **Don't add tests yet; I'll do that in a separate pass.**"

Each negative is one short sentence. None of them require enumerating what you _do_ want. They work because they cut off the specific lane the assistant would have over-extended into.

## Why this beats positive scoping

You can get the same outcome by being maximally specific in the positive direction: "Change line 42 from `==` to `===`. Do not modify any other line in this file or any other file." That works. It also takes thirty seconds to type and reads like a legal contract.

Negative scoping is faster because over-action has a small, predictable vocabulary. Almost every over-reach falls into one of four buckets:

1. **Refactoring inside a fix.** "Fix X, don't refactor."
2. **Speculative validation.** "Don't add validation for cases that can't happen."
3. **Self-explaining comments.** "Don't comment unless the WHY is non-obvious."
4. **Tests you didn't ask for.** "Don't write tests; I'll do that separately."

If you can name the lane you don't want, the rest of the prompt can stay short. You're describing the _negative space_ of the change, not enumerating its positive content.

## The non-obvious part

This isn't an AI problem. It's a _briefing_ problem. Hand a junior engineer a vague ticket and they'll either ask three clarifying questions or — if they don't feel safe asking — guess generously and ship more than you wanted. Hand them the same ticket plus "don't restructure anything, just patch the symptom," and you get back exactly what you needed.

The negative scope works on humans for the same reason it works on assistants: it removes ambiguity in the dimension that actually matters. The positive ask was always clear. The room for "helpful additions" was the part that needed fencing off.

## When _not_ to use it

Negative scoping fails in two cases:

1. **When the prompt is itself exploratory.** "Investigate this slow query" shouldn't have negatives — you want the assistant to follow leads, not pre-fence them.
2. **When you don't yet know what you want.** Negative scoping presumes a known shape of "done." If the spec is fuzzy, more negatives just produce more confidently-wrong narrow outputs. Plan first, scope later.

The rule: use negative scope when you know what done looks like and want the assistant to stop at the door. Use open-ended prompts when you want it to wander.

## The rule

What you tell an assistant _not_ to do is more load-bearing than what you ask for. Every prompt that comes back with surprise extras is a prompt that left a lane open. Naming the lane is one sentence. Writing a full positive spec is a paragraph.

Cheap to add. Hard to skip once you've felt the difference.
