---
title: 'The CLAUDE.md that actually changes behavior'
summary: 'Most CLAUDE.md files describe the project. Stack, folders, build commands — things Claude can derive in two ls calls. The files that actually change behavior have three rule types: negative, incident-rooted, taste-with-a-why.'
publishAt: 2026-05-19T09:00:00-03:00
tags: [claude-code, ai, prompting, developer-tools]
---

My first few CLAUDE.md files didn't change Claude's behavior at all.

![Left: a CLAUDE.md full of project description (stack, folders, build command) labeled "Claude could derive this." Right: a CLAUDE.md full of negative rules, incident-rooted rules, and taste rules with a why — labeled "changes what gets written."](/blog/claude-md-that-changes-behavior/en.svg)

## The instinct that fails

When you first open a blank CLAUDE.md, the instinct is to describe the project. Stack, folders, build commands, package manager, deploy target.

```txt
Stack: Next.js + Postgres
Folders: src/, app/, lib/
Build: npm run build
Tests: npm test
```

This feels productive. It is not. Claude can derive almost all of it from the repo in two `ls` calls and a `package.json` read. The file describes what the model can already see, which means it changes nothing about the output. You haven't tuned the assistant; you've written a README.

The CLAUDE.md files that actually shift behavior have three flavors of rule, and almost no project description.

## What works: three rule types

### 1. Negative rules

Rules of the form "don't do X." These are load-bearing because the default failure mode of any assistant is _over-action_: you ask for a bug fix and get a refactor, or you ask for one function and get a new abstraction.

Examples that pay off across a codebase:

- "Don't add comments unless the WHY is non-obvious."
- "No backwards-compatibility shims. Change the code."
- "Don't add error handling for cases that can't happen — only validate at system boundaries."
- "Ask before destructive git commands."

Each negative rule fences off one common over-reach. The cumulative effect is a reviewer's worth of restraint, applied silently on every turn.

### 2. Incident-rooted rules

Rules that exist because something specific went wrong, and you don't want it to happen again. These have a _why_, and the why is the entire point.

- "Integration tests must hit a real database, not mocks. Reason: Q3 mock/prod divergence masked a broken migration."
- "Never delete files in `/migrations/` even if they look stale. Reason: rollback support depends on the full history."
- "Use the existing logger, not console.log. Reason: console output gets dropped by the production log shipper."

The reason matters as much as the rule. Without a _why_, an incident-rooted rule looks arbitrary at edge cases, and the model will either over-apply it or quietly skip it. With a _why_, the model can exercise judgment when the edge case shows up.

### 3. Taste rules with a why

Preference calls about how you like work to be done — but never bare preferences. Every taste rule needs the reason.

- "Prefer one bundled PR for refactors in this area. Reason: reviewers asked."
- "Default to terse PR descriptions. Reason: long ones don't get read."
- "Avoid premature abstractions. Three similar lines is better than a helper used once."

The taste rule + reason pattern is the difference between an assistant that mirrors your style and one that drifts back to its training-data defaults the moment your prompt gets short.

## The smell test

For every line in your CLAUDE.md, ask:

> If I removed this line, would Claude's output be measurably worse?

If the answer is no, the line is decoration. Decoration is expensive — it eats your context window every turn, and it dilutes the signal of the lines that do matter. Cut it.

Lines that pass the smell test are almost always one of the three types above. Lines that fail are almost always project description.

## The rule you should remove

A counterintuitive practice: every few weeks, look at your CLAUDE.md and find the _one rule that backfired_. Maybe it's too strict and the model started doing wrong things to obey it. Maybe it's too vague and the model interpreted it differently than you meant. Maybe the codebase moved and the rule no longer applies.

Cut it.

A CLAUDE.md that only ever grows is a CLAUDE.md that has accumulated dead rules — and dead rules are worse than no rules, because the model treats them with equal weight to the live ones. The discipline of removing one stale rule per review keeps the file's signal high.

## Why this matters more than you'd think

CLAUDE.md is one of the highest-leverage 30 minutes you'll spend on AI tooling. Unlike prompts — which apply once and then are forgotten — CLAUDE.md applies on every turn, in every conversation, until you change it. A good rule pays you back hundreds of times. A bad rule misleads you hundreds of times.

The shape of the file matters less than what's in it. Markdown, plain text, bullets, prose — Claude handles all of them. What matters is whether the file _constrains_ or _describes_. Describing is comforting and useless. Constraining is uncomfortable and the entire point.

## The rule

If a line in CLAUDE.md doesn't change what gets written, it doesn't belong. Negative rules, incident-rooted rules with a why, taste rules with a why — those earn their place. Project description does not.

The model can read your codebase. It cannot read your incidents.
