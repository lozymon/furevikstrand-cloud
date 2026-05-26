---
title: 'Verify before recommending: when the AI cites, you grep'
summary: "The most dangerous AI output isn't wrong — it's outdated. Claude confidently cites a flag removed last quarter, a renamed function, a path that no longer exists. Treat every named symbol as a hypothesis. Grep before you act."
publishAt: 2026-05-26T09:00:00-03:00
tags: [claude-code, ai, developer-tools, practice]
---

The most dangerous AI output isn't wrong. It's _outdated_.

Claude will recommend a flag that was removed three months ago, a function that got renamed last quarter, a file path that doesn't exist anymore. Each citation sounds right because it _was_ right.

![Left: an AI response saying "Use the --strict flag and call validateInput() from src/lib/auth/middleware.ts" stamped CONFIDENT. Right: terminal output of grep showing the flag is gone, the function was renamed, and the file moved — three quiet bugs the AI didn't know about.](/blog/verify-before-recommending/en.svg)

## The default failure mode

This isn't hallucination. Hallucination is the model inventing a plausible-but-fake API. This is worse: the model is repeating something that _was_ true the day it learned it, and has no way to notice it isn't anymore.

Three flavors show up in practice:

1. **Renamed symbols.** A function got refactored last quarter; the assistant still cites the old name.
2. **Removed flags.** A CLI option got deprecated; the assistant still recommends it because it appeared in a doc that's still cached somewhere.
3. **Moved paths.** A file got reorganized; the assistant cites the old import.

None of these look wrong on the page. The Markdown is unchanged. The model emits the answer with the same confidence as a citation it generated this morning.

## Why this happens to any system with persistent state

It's tempting to call this a model failure, but the same pattern shows up everywhere a stored snapshot meets a moving codebase:

- **Auto-memory.** A memory written six weeks ago says the auth flow lives in `src/lib/auth/middleware.ts`. The file was renamed two weeks ago. The memory is now a hallucination engine pointed at your project.
- **RAG over docs.** The index was last rebuilt before the rewrite. Queries return confidently-formatted answers from the old API surface.
- **Fine-tuned models.** Trained on last quarter's repo snapshot. Cites a function that was deleted in the cleanup PR.

The common feature is that the storage layer doesn't know when its contents went stale. The codebase keeps moving; the snapshot does not.

## The discipline

The fix is one habit: when the AI names a specific symbol, treat it as a hypothesis. Verify before acting.

"Verify" is almost always a ten-second `grep`:

- _"Use the `--strict` flag"_ → does `--strict` still exist? Grep the CLI.
- _"The session middleware is at `src/lib/auth/session.ts`"_ → does the path exist? `ls` it.
- _"Call `validateInput()`"_ → grep for the function. Was it renamed in the last refactor?

Ten seconds of verification catches what would otherwise be a fifteen-minute confusion. The cost-benefit is so lopsided it should be reflexive.

The same habit applies to memory-driven recommendations. If a memory references a path, a function, or a person on a project, that reference is a claim that needs checking — not a fact.

## What this doesn't mean

It doesn't mean distrusting the model. The model is right far more often than not. The discipline is narrow: it kicks in on _specific named symbols_, not on conceptual guidance.

When the AI says _"consider extracting this into a helper"_ — that's advice, no grep needed. When it says _"extract this into `formatRowForCSV()` like the helper in `src/utils/csv.ts`"_ — _now_ you grep. The named symbol is the part that ages. The advice doesn't.

This is also why generic "trust but verify" framings underperform. They're too broad to be a habit. _Grep before you act on a named symbol_ is a habit. You can build a reflex around it.

## The rule

When the AI cites, you verify. When it remembers, you check.

The codebase is the present. The memory is a snapshot. When they disagree, the codebase wins.

The ten seconds of grep is the cheapest insurance in the workflow.
