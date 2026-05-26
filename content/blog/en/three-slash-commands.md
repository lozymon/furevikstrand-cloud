---
title: 'Three slash commands that earn their keep'
summary: 'Most Claude Code features go unused — people never leave chat. /review, /security-review, and /init pay for themselves on day one, but each has a misuse that turns it into theater. The tool is free; the habit is the cost.'
publishAt: 2026-05-28T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

Most Claude Code features go unused because people never get past chat.

![Three vertical cards on a dark background. Each card shows a slash command, what it does in one line, and a "common mistake" callout. Card 1: /review — read the diff before pushing — mistake: running it after the push. Card 2: /security-review — audit security-sensitive files — mistake: running it on the whole branch. Card 3: /init — bootstrap CLAUDE.md — mistake: keeping the output as-is.](/blog/three-slash-commands/en.svg)

Chat is the entry surface. It is not the product. The product is everything you build on top: skills, agents, hooks, slash commands, settings. Most of it stays unused because the chat surface alone is _enough_ to feel productive — and "enough" is the enemy of "actually good."

Three commands earn their keep on day one. Each comes with one common mistake that turns it into theater.

## `/review` — read the diff before pushing

What it does: runs a code review pass on the current branch. Catches the half-finished test, the leftover `TODO`, the unused import, the function that lost its only caller two refactors ago.

How I use it: before _every_ push. Solo branches included. The marginal cost is 30 seconds. The expected value across a year of branches is enormous — one caught regression pays for thousands of runs.

The common mistake: running `/review` _after_ the push. At that point the review is theater — you've already added the change to the team's mental model, and any catches now require a follow-up PR. The whole point of the local review is that it's free to act on. Run it before the push, then push.

## `/security-review` — narrow scope or noise

What it does: audits the changes for common security issues — input handling, auth, secrets, external boundaries.

When to use: any change that touches authentication, anything reading user input, anything reaching outside the trust boundary (HTTP, file IO, subprocess, database). For everything else, the noise cost exceeds the benefit.

The common mistake: pointing it at the whole branch. A 400-line PR with twelve files surfaces twelve plausible-sounding "consider" findings, half of which apply to code that wasn't touched and never had the problem. Signal drowns.

The fix is to scope: run it on the _security-sensitive files only_. Two files in, four findings out, all of them relevant. Now the review is doing work.

## `/init` — start, don't ship

What it does: bootstraps a `CLAUDE.md` by reading the codebase and summarizing structure, conventions, and entry points.

When to use: any new repo, or any existing repo without a CLAUDE.md. The output is a useful starting structure — sections you didn't have to name, scaffolding you didn't have to write.

The common mistake: keeping the output as-is. The bootstrap is generic. It looks like documentation. It functions like wallpaper — the model reads it and gets a vague sense of the codebase but no actual constraint on behavior.

The value comes from the edits _you_ make on top. Your taste, your incidents, your "don't"s. Every memory in there should be something you'd have said to a teammate after an incident — not something that could be derived from `ls`. The bootstrap is the canvas; the value is the paint.

## The pattern

All three have the same shape:

1. Free to run.
2. High value at the right moment.
3. Zero value — or negative — if you use them wrong.

The reason people don't pick them up isn't lack of access. It's that the discipline of "run this _here_, not _there_" is invisible until you've already paid for the mistake once.

## The rule

The tool is free. The habit is the cost.

If you've been using Claude Code for a week and haven't touched any of these three, you're operating on the smallest possible surface of a much larger product. Picking one up — and running it at the right time on the right scope — is the cheapest workflow upgrade available.

Pay the habit once. It earns out forever.
