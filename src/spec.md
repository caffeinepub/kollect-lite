# Specification

## Summary
**Goal:** Redesign the Activity Timeline to display a structured layout with sub-header, date/timestamp, action/outcome pills, and comments.

**Planned changes:**
- Add 'Activity Timeline' sub-header at the top of the timeline section
- Display date and timestamp below the sub-header for each activity entry
- Show action pill and outcome pill horizontally arranged below the date/timestamp
- Display comment text below the pills
- Update backend Comment type to include action and outcome fields if needed
- Ensure useGetCaseComments query returns action and outcome data

**User-visible outcome:** Users will see a more organized activity timeline with clear visual hierarchy: sub-header, date/timestamp, color-coded action and outcome pills displayed horizontally, followed by the comment text.
