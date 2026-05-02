# i18n Sync

Verify that all translation keys are consistent across the three locale files: `messages/en.json`, `messages/no.json`, and `messages/pt.json`.

The locale union is defined in `i18n/routing.ts` as `['en', 'no', 'pt']`. If a fourth locale is ever added, update both that file and this command.

## Steps

1. Read all three message files.
2. Recursively collect every key path (e.g. `chat.welcome`, `meta.title`) from each file.
3. Find:
   - **Missing keys** — present in `en.json` but absent in `no.json` or `pt.json`
   - **Extra keys** — present in `no.json` or `pt.json` but absent in `en.json`
   - **Untranslated values** — value in `no.json` or `pt.json` is identical to the English value (likely a copy-paste placeholder), flag these as suspected untranslated
4. Report findings grouped by locale, with the full key path for each issue.
5. If there are missing keys, offer to scaffold them with `TODO:` placeholder values so the structure stays in sync.

## Rules

- `en.json` is the source of truth — it defines the required key set.
- Do not change any values — only report and scaffold missing keys if requested.
- After scaffolding, remind the user to replace `TODO:` values before shipping.
