# Specification

## Summary
**Goal:** Redesign the login page and add a landing page for Kollect Lite with a clean, modern teal + charcoal visual theme.

**Planned changes:**
- Redesign `LoginPrompt.tsx` with a bold hero area featuring the Kollect Lite logo, a tagline, and a prominently styled "Login with Internet Identity" button using the teal accent color on a deep charcoal background.
- Create a new `LandingPage.tsx` for unauthenticated visitors, including a hero section with logo, headline, and "Get Started" CTA button; a features section with 3–4 icon cards (Case Management, Activity Tracking, Document Handling, Role-Based Access); and a minimal footer with copyright.
- Update `App.tsx` router so unauthenticated users see `LandingPage` at the root route, and authenticated users are redirected to the Task Queue.
- Apply a cohesive visual theme across both pages: deep charcoal background, teal accents, clear typographic hierarchy, subtle card shadows, and hover transitions on interactive elements.

**User-visible outcome:** Unauthenticated visitors see a polished landing page and login experience with consistent Kollect Lite branding, and are redirected to the Task Queue upon logging in.
