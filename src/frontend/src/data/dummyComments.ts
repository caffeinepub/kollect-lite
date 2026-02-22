export interface Comment {
  id: string;
  caseId: string;
  timestamp: Date;
  agentName: string;
  commentText: string;
}

// Generate dummy comments for various cases
export const DUMMY_COMMENTS: Comment[] = [
  // CASE-001 comments
  {
    id: 'CMT-001',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    agentName: 'Agent Sarah K.',
    commentText: 'Payment arrangement agreed upon.',
  },
  {
    id: 'CMT-002',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
    agentName: 'Agent John M.',
    commentText: 'Left voicemail regarding overdue balance.',
  },
  {
    id: 'CMT-003',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000), // 8 days ago
    agentName: 'Agent Sarah K.',
    commentText: 'Sent follow-up email with payment options.',
  },
  {
    id: 'CMT-004',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000), // 12 days ago
    agentName: 'Agent David O.',
    commentText: 'Case escalated to supervisor.',
  },
  {
    id: 'CMT-005',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000), // 15 days ago
    agentName: 'Agent John M.',
    commentText: 'Attempted contact, no answer.',
  },
  {
    id: 'CMT-006',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000), // 18 days ago
    agentName: 'Agent Sarah K.',
    commentText: 'Customer confirmed receipt of notice.',
  },
  {
    id: 'CMT-007',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000), // 21 days ago
    agentName: 'Agent Mary A.',
    commentText: 'Updated contact information.',
  },

  // CASE-002 comments
  {
    id: 'CMT-008',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    agentName: 'Agent Peter W.',
    commentText: 'Customer promised to pay by end of week.',
  },
  {
    id: 'CMT-009',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000), // 4 days ago
    agentName: 'Agent Lucy N.',
    commentText: 'Payment arrangement established.',
  },
  {
    id: 'CMT-010',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    agentName: 'Agent Peter W.',
    commentText: 'Sent SMS reminder about overdue payment.',
  },
  {
    id: 'CMT-011',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000), // 10 days ago
    agentName: 'Agent Grace W.',
    commentText: 'Left voicemail with payment details.',
  },
  {
    id: 'CMT-012',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000), // 14 days ago
    agentName: 'Agent Lucy N.',
    commentText: 'Initial contact made successfully.',
  },

  // CASE-003 comments
  {
    id: 'CMT-013',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
    agentName: 'Agent James K.',
    commentText: 'Customer disputed amount, escalating to supervisor.',
  },
  {
    id: 'CMT-014',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
    agentName: 'Agent Ann C.',
    commentText: 'Contact information verified and updated.',
  },
  {
    id: 'CMT-015',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000), // 9 days ago
    agentName: 'Agent James K.',
    commentText: 'Sent follow-up email with online payment link.',
  },
  {
    id: 'CMT-016',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000), // 13 days ago
    agentName: 'Agent Thomas O.',
    commentText: 'Customer requested extension.',
  },
  {
    id: 'CMT-017',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000), // 16 days ago
    agentName: 'Agent Ann C.',
    commentText: 'Attempted contact, left callback number.',
  },

  // CASE-004 comments
  {
    id: 'CMT-018',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Robert K.',
    commentText: 'Case escalated to legal department.',
  },
  {
    id: 'CMT-019',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Catherine W.',
    commentText: 'Multiple contact attempts unsuccessful.',
  },
  {
    id: 'CMT-020',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Robert K.',
    commentText: 'Left voicemail regarding urgent payment.',
  },
  {
    id: 'CMT-021',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Daniel K.',
    commentText: 'Sent email with final notice.',
  },

  // CASE-005 comments
  {
    id: 'CMT-022',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Jane N.',
    commentText: 'Confirmed payment received, updating records.',
  },
  {
    id: 'CMT-023',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Patrick M.',
    commentText: 'Payment arrangement established.',
  },
  {
    id: 'CMT-024',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Jane N.',
    commentText: 'Sent SMS with payment instructions.',
  },
  {
    id: 'CMT-025',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Susan A.',
    commentText: 'Initial contact successful.',
  },

  // Add comments for remaining cases
  {
    id: 'CMT-026',
    caseId: 'CASE-006',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Francis K.',
    commentText: 'Approved 2-month installment arrangement.',
  },
  {
    id: 'CMT-027',
    caseId: 'CASE-006',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Margaret W.',
    commentText: 'Sent follow-up email with account statement.',
  },
  {
    id: 'CMT-028',
    caseId: 'CASE-007',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Michael J.',
    commentText: 'Case escalated to supervisor.',
  },
  {
    id: 'CMT-029',
    caseId: 'CASE-007',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Sarah W.',
    commentText: 'Left voicemail regarding overdue balance.',
  },
  {
    id: 'CMT-030',
    caseId: 'CASE-008',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: 'Agent David O.',
    commentText: 'Customer promised to pay by Friday.',
  },
  {
    id: 'CMT-031',
    caseId: 'CASE-008',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Grace W.',
    commentText: 'Sent SMS reminder with payment details.',
  },
];

// Helper function to get comments for a specific case
export function getCommentsByCaseId(caseId: string): Comment[] {
  return DUMMY_COMMENTS.filter(comment => comment.caseId === caseId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Most recent first
}
