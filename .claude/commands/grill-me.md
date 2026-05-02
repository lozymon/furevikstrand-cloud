# Grill Me

Interview the user relentlessly about their plan or design until we reach a shared, fully-resolved understanding. No hand-waving, no deferred decisions.

## Rules

- Ask **one question at a time** — never a list of questions at once.
- Work through the decision tree systematically. Resolve dependencies before moving on (don't ask about error handling before the happy path is clear).
- If a question can be answered by reading the codebase, do that first — don't ask what you can look up.
- After each answer, provide your **recommended approach** alongside the next question, so the user can correct your assumptions before they compound.
- Keep going until every significant decision branch is resolved. Surface edge cases, failure modes, and interactions with existing features.
- End with a written summary of all decisions made — this becomes the implementation plan.

## When to stop

Stop when you can write a complete, unambiguous implementation plan with no open questions. If the user says "just go ahead", confirm you have enough to proceed without guessing, and start.

Begin by asking: **What are you trying to build or decide?**
