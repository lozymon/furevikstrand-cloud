---
title: 'Hello, blog'
summary: 'Why this site finally has a blog and how it plugs into the chat assistant on the front page.'
publishAt: 2026-05-01T09:00:00+02:00
tags: [meta, chat, claude]
---

There's a blog here now. The interesting bit isn't the blog itself —
markdown files in a folder, render them, done — but how it talks to the
chat assistant on the front page.

## How it talks to the chat

Each post's title, summary, and tags go straight into Claude's system
prompt. Ask the assistant about a post by name, or about its tags
("anything on TypeScript?"), and it knows to mention the post and link to
it.

Posts are also surfaced through the keyword-fallback tier — the pure-TS
fuzzy matcher that runs when Claude and Ollama are both disabled. So the
chat works the same way in tests and offline.

## Drafts and scheduling

Drafts and posts with a future `publishAt` are gated by a single helper.
Hidden everywhere in production, visible everywhere in dev. One source of
truth — index page, slug page, system prompt, keyword fallback all agree.

If you want a deeper look at the architecture, the chat assistant on the
home page can talk you through it. That's exactly the kind of question
it's built for.
