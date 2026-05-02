# Accessibility Check

Scan recently changed or specified components against the project's accessibility requirements (WCAG 2.1 AA).

## Scope

If the user names specific files or a feature, check those. Otherwise, check all files changed since the last commit: `git diff --name-only HEAD`.

## Checklist — verify each item for every component in scope

### Interactive elements

- [ ] Every icon-only button has `aria-label`
- [ ] Decorative icons have `aria-hidden="true"`
- [ ] All links have discernible text (not just "click here")

### Dialogs and drawers

- [ ] `role="dialog" aria-modal="true"` on the root element
- [ ] `aria-labelledby` pointing to the dialog title
- [ ] Focus trap is active when open (`focus-trap-react` or equivalent)
- [ ] Focus returns to the trigger element on close

### Avatars and images

- [ ] Member avatar initials: `role="img" aria-label="{name}"`
- [ ] Non-decorative images have descriptive `alt` text

### Live regions

- [ ] Toast confirmations: `aria-live="polite"`
- [ ] Error messages: `aria-live="assertive"`

### Forms

- [ ] Every input has an associated `<label>` (or `aria-label` / `aria-labelledby`)
- [ ] Error messages are associated with their input via `aria-describedby`
- [ ] Required fields marked with `aria-required="true"`

### Layout

- [ ] `<html lang={locale}>` is set by `app/[locale]/layout.tsx` — verify it renders for all three locales (`en`, `no`, `pt`)
- [ ] Skip link is the first focusable element in the root layout

### Chat-specific

- [ ] `ChatInput` textarea has an associated label or `aria-label`
- [ ] `TypingIndicator` and streamed assistant messages use `aria-live="polite"` so screen readers announce them
- [ ] Slash-menu (`SlashMenu`) is keyboard-navigable (arrow keys, Enter, Escape) and announces the active item
- [ ] `MobileSidebar` traps focus when open and returns focus to the menu trigger on close

## Output

List every issue found with the file path and line number. For each issue, give the fix. If everything passes, confirm that explicitly.
