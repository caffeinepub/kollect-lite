# Specification

## Summary
**Goal:** Make the TaskQueue page's top section sticky, and wrap the Splash and Login pages inside the existing PhoneMockup component for phone-frame preview.

**Planned changes:**
- Make the entire top section of the TaskQueue page sticky, including: the brand header (logo, user name, user ID, logout button), the tab bar (Queue / Dispute / Profile), the workload filter chips row, and the search bar — so all four sub-sections remain fixed at the top while the case list scrolls independently beneath them.
- Wrap the Splash page (`/`) inside the existing `PhoneMockup` component so the animated crosshair/logo screen renders within a phone frame by default.
- Wrap the Login page (`/login`) inside the existing `PhoneMockup` component so the logo/login screen renders within a phone frame by default.
- Apply a visually distinct background outside the phone frame (e.g., neutral or dark) to emphasise the mockup on desktop.
- Leave the TaskQueue (`/tasks`) and CaseDetail (`/case/$caseId`) pages unaffected and full-width.

**User-visible outcome:** The TaskQueue header, tabs, filters, and search bar stay visible at all times while scrolling through cases. The Splash and Login screens appear inside a phone mockup frame on desktop, allowing the user to preview how they look on a mobile device.
