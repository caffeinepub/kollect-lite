# Kollect Lite

## Current State
The app is a mobile-first collector portal in a phone frame. The CaseDetail page has an Action dropdown with three items: 360 View, Debt Card, and Documents. The ActivitySection component has an Add Comment button that submits comments. The TaskQueueHeader shows the app name, user info, and a logout button — but no dark mode toggle. Dark mode CSS tokens already exist in index.css under `.dark {}` but are never applied.

## Requested Changes (Diff)

### Add
- A dark mode toggle button in the TaskQueueHeader (top right area, next to the logout button). Use a Sun/Moon icon from lucide-react. Clicking it toggles a `dark` class on the `<html>` element and persists the preference to localStorage.
- Apply the `.dark` class-based dark mode to PhoneMockup background and all phone screen content (the screen area, overlays, modals, bottom nav). The phone screen background in dark mode should be `#0E1A2E` (very dark navy). The outer mockup wrapper (page bg) in dark: `#111827` (near-black grey).

### Modify
- **CaseDetail.tsx**: Remove the 360 View `<DropdownMenuItem>` from the Action dropdown. The dropdown now only shows Debt Card and Documents.
- **ActivitySection.tsx**: Remove the entire Add Comment `<Button>` block (lines around 332–351). Keep the comment textarea and outcome/PTP fields — just remove the button that submits the comment. Note: if the button removal breaks the comment submission flow, replace the button with a small icon-only send button inline with the textarea (a small blue send icon on the right edge of the textarea, visible only when text is present).

### Remove
- 360 View dropdown item from Action menu in CaseDetail
- Add Comment button from ActivitySection

## Implementation Plan
1. Add `useDarkMode` hook (or inline logic) in a new `src/hooks/useDarkMode.ts` that reads/writes `localStorage` and toggles `document.documentElement.classList`.
2. Add Moon/Sun toggle icon button to TaskQueueHeader, wired to the hook.
3. Ensure PhoneMockup and the phone screen area respect dark mode (swap bg colors).
4. Remove 360 View from CaseDetail action dropdown.
5. Remove Add Comment button from ActivitySection; add inline send icon on textarea if needed to preserve submit functionality.
6. Validate and build.
