---
title: 'Hiring managers read your build choices, not your About page'
summary: 'Every technical decision in furevikstrand.cloud was also a hiring signal — three-tier degradation, a self-hosted dashboard, a shared code path. None of it shows on a CV; all of it shows in the repo and the live site.'
publishAt: 2026-05-07T09:00:00+02:00
tags: [hiring, careeradvice, portfolio, softwareengineering]
---

Hiring managers don't read your portfolio's "About" page.
They read your build choices.

When I built furevikstrand.cloud, every technical decision was also a hiring signal. On purpose.

**Three-tier graceful degradation on the AI chat** (Claude → Ollama → keyword matcher)
Signal: I think about failure modes before they happen. Production thinking.

**A self-hosted `/admin` dashboard with 13 panels**
Signal: I instrument what I ship. Ownership mindset.

**Same code path for slash commands and offline fallback**
Signal: I avoid duplication that would rot. Long-horizon thinking.

None of that is in a bullet on my CV. It's in the repo. It's in the live site. It's in the way the thing behaves when things go wrong.

If you're building a portfolio: stop polishing the homepage. Pick three decisions where the non-obvious choice tells the story you want told. Then make those choices visible.

If a hiring manager looked at your last project, what signal would they read from your build choices?
