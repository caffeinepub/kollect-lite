export interface Comment {
  id: string;
  caseId: string;
  timestamp: Date;
  agentName: string;
  commentText: string;
}

// Generate dummy comments for various cases
export const DUMMY_COMMENTS: Comment[] = [
  // CASE-002 comments
  {
    id: "CMT-008",
    caseId: "CASE-002",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    agentName: "Agent Peter W.",
    commentText:
      "Customer confirmed receipt of notice and promised to pay by end of week.",
  },
  {
    id: "CMT-009",
    caseId: "CASE-002",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    agentName: "Agent Lucy N.",
    commentText:
      "Payment arrangement established. Customer will pay KES 2,500 on Friday.",
  },
  {
    id: "CMT-010",
    caseId: "CASE-002",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    agentName: "Agent Peter W.",
    commentText:
      "Sent SMS reminder about overdue payment. Customer responded positively.",
  },
  {
    id: "CMT-011",
    caseId: "CASE-002",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    agentName: "Agent Grace W.",
    commentText:
      "Left voicemail with payment details and account balance information.",
  },
  {
    id: "CMT-012",
    caseId: "CASE-002",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    agentName: "Agent Lucy N.",
    commentText: "Initial contact made. Customer aware of outstanding balance.",
  },

  // CASE-003 comments
  {
    id: "CMT-013",
    caseId: "CASE-003",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    agentName: "Agent James K.",
    commentText:
      "Customer dispute noted. Investigating discrepancy in payment records.",
  },
  {
    id: "CMT-014",
    caseId: "CASE-003",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    agentName: "Agent Ann C.",
    commentText:
      "Contact information verified. Email address updated in system.",
  },
  {
    id: "CMT-015",
    caseId: "CASE-003",
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    agentName: "Agent James K.",
    commentText:
      "Sent follow-up email with payment options and online payment link.",
  },
  {
    id: "CMT-016",
    caseId: "CASE-003",
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13 days ago
    agentName: "Agent Thomas O.",
    commentText:
      "Customer requested extension. Reviewing request with supervisor.",
  },
  {
    id: "CMT-017",
    caseId: "CASE-003",
    timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    agentName: "Agent Ann C.",
    commentText: "Attempted contact - no answer. Left callback number.",
  },

  // CASE-004 comments
  {
    id: "CMT-018",
    caseId: "CASE-004",
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    agentName: "Agent Robert K.",
    commentText:
      "Case escalated to legal department due to extended non-payment.",
  },
  {
    id: "CMT-019",
    caseId: "CASE-004",
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    agentName: "Agent Catherine W.",
    commentText:
      "Multiple contact attempts unsuccessful. Sending formal notice.",
  },
  {
    id: "CMT-020",
    caseId: "CASE-004",
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    agentName: "Agent Robert K.",
    commentText: "Left voicemail regarding urgent payment requirement.",
  },
  {
    id: "CMT-021",
    caseId: "CASE-004",
    timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    agentName: "Agent Daniel K.",
    commentText: "Sent email with final notice before escalation.",
  },

  // CASE-005 comments
  {
    id: "CMT-022",
    caseId: "CASE-005",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: "Agent Jane N.",
    commentText: "Customer confirmed payment will be made tomorrow via M-Pesa.",
  },
  {
    id: "CMT-023",
    caseId: "CASE-005",
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    agentName: "Agent Patrick M.",
    commentText:
      "Payment arrangement established. Customer agreed to pay KES 1,500 weekly.",
  },
  {
    id: "CMT-024",
    caseId: "CASE-005",
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    agentName: "Agent Jane N.",
    commentText: "Sent SMS with payment instructions and paybill number.",
  },
  {
    id: "CMT-025",
    caseId: "CASE-005",
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    agentName: "Agent Susan A.",
    commentText:
      "Initial contact successful. Customer aware of outstanding balance.",
  },

  // Add comments for remaining cases
  {
    id: "CMT-026",
    caseId: "CASE-006",
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    agentName: "Agent Francis K.",
    commentText:
      "Customer requested payment plan. Approved 2-month installment arrangement.",
  },
  {
    id: "CMT-027",
    caseId: "CASE-006",
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    agentName: "Agent Margaret W.",
    commentText:
      "Sent follow-up email with account statement and payment options.",
  },
  {
    id: "CMT-028",
    caseId: "CASE-007",
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    agentName: "Agent Michael J.",
    commentText:
      "Case escalated to supervisor. Multiple unsuccessful contact attempts.",
  },
  {
    id: "CMT-029",
    caseId: "CASE-007",
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    agentName: "Agent Sarah W.",
    commentText:
      "Left voicemail regarding overdue balance and payment urgency.",
  },
  {
    id: "CMT-030",
    caseId: "CASE-008",
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: "Agent David O.",
    commentText:
      "Customer confirmed receipt of notice. Promised to pay by Friday.",
  },
  {
    id: "CMT-031",
    caseId: "CASE-008",
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    agentName: "Agent Grace W.",
    commentText: "Sent SMS reminder with payment details and account balance.",
  },
];

// Helper function to get comments for a specific case
export function getCommentsByCaseId(caseId: string): Comment[] {
  return DUMMY_COMMENTS.filter((comment) => comment.caseId === caseId).sort(
    (a, b) => b.timestamp.getTime() - a.timestamp.getTime(),
  ); // Most recent first
}
