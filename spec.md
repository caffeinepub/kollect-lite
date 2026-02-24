# Specification

## Summary
**Goal:** Make the "Add Comment" button in the CommentHistorySection fully interactive so users can add new comments to a case's timeline.

**Planned changes:**
- Clicking the "Add Comment" button reveals an inline or modal input form with a text area and a PTP status selector (options: ptp_made, ptp_honored, ptp_broken, not_reached, disputed).
- Submitting the form appends the new comment to the displayed comment timeline using local state, following the existing Comment type and color-coding conventions.
- The new comment is color-coded according to the selected PTP status, consistent with the existing scheme.
- The form can be cancelled/dismissed without submitting.
- The "Add Comment" button is disabled or shows a loading state while submission is in progress.

**User-visible outcome:** Users can click "Add Comment" on a case, fill in a comment and PTP status, submit it, and immediately see the new comment appear in the comment timeline with the appropriate color coding.
