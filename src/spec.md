# Specification

## Summary
**Goal:** Add contact selector to mobile field and display Product Type in account information section.

**Planned changes:**
- Add an icon button next to the mobile field that opens a dropdown showing primary and secondary contact phone numbers
- Allow clicking a contact in the dropdown to populate the mobile field with the selected phone number
- Set primary contact as the default value in the mobile field on page load
- Add a "Product Type" field label and value display below the "Days Past Due" field in the horizontal info area
- Display the product type value which can be "Loan", "Credit Card", or "Overdrawn"
- Update the Case type in the backend to include primaryContact, secondaryContact, and productType fields

**User-visible outcome:** Users can quickly select between primary and secondary contact numbers for cases, and can view the product type (Loan, Credit Card, or Overdrawn) in the account information area alongside Days Past Due.
