export type PtpStatus = 'ptp_made' | 'ptp_honored' | 'ptp_broken' | 'not_reached' | 'disputed';

export interface Comment {
  id: string;
  caseId: string;
  timestamp: Date;
  agentName: string;
  commentText: string;
  ptpStatus: PtpStatus;
}

// Generate dummy comments for various cases
export const DUMMY_COMMENTS: Comment[] = [
  // CASE-001 comments
  {
    id: 'CMT-001',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Sarah K.',
    commentText: 'Customer requested payment plan. Discussed options for splitting balance into 3 monthly installments.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-002',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    agentName: 'Agent John M.',
    commentText: 'Left voicemail regarding overdue balance. Customer has not returned call.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-003',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Sarah K.',
    commentText: 'Sent follow-up email with payment options and account statement.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-004',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 12 * 24 * 60 * 60 * 1000),
    agentName: 'Agent David O.',
    commentText: 'Case escalated to supervisor due to extended non-payment period.',
    ptpStatus: 'ptp_broken',
  },
  {
    id: 'CMT-005',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 15 * 24 * 60 * 60 * 1000),
    agentName: 'Agent John M.',
    commentText: 'Attempted contact - no answer. Will retry tomorrow morning.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-006',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 18 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Sarah K.',
    commentText: 'Customer confirmed receipt of notice. Mentioned financial difficulties.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-007',
    caseId: 'CASE-001',
    timestamp: new Date(Date.now() - 21 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Mary A.',
    commentText: 'Updated contact information. New phone number verified.',
    ptpStatus: 'not_reached',
  },

  // CASE-002 comments
  {
    id: 'CMT-008',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Peter W.',
    commentText: 'Customer confirmed receipt of notice and promised to pay by end of week.',
    ptpStatus: 'ptp_honored',
  },
  {
    id: 'CMT-009',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Lucy N.',
    commentText: 'Payment arrangement established. Customer will pay KES 2,500 on Friday.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-010',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Peter W.',
    commentText: 'Sent SMS reminder about overdue payment. Customer responded positively.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-011',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Grace W.',
    commentText: 'Left voicemail with payment details and account balance information.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-012',
    caseId: 'CASE-002',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Lucy N.',
    commentText: 'Initial contact made. Customer aware of outstanding balance.',
    ptpStatus: 'not_reached',
  },

  // CASE-003 comments
  {
    id: 'CMT-013',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    agentName: 'Agent James K.',
    commentText: 'Customer dispute noted. Investigating discrepancy in payment records.',
    ptpStatus: 'disputed',
  },
  {
    id: 'CMT-014',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Ann C.',
    commentText: 'Contact information verified. Email address updated in system.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-015',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    agentName: 'Agent James K.',
    commentText: 'Sent follow-up email with payment options and online payment link.',
    ptpStatus: 'disputed',
  },
  {
    id: 'CMT-016',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 13 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Thomas O.',
    commentText: 'Customer requested extension. Reviewing request with supervisor.',
    ptpStatus: 'ptp_broken',
  },
  {
    id: 'CMT-017',
    caseId: 'CASE-003',
    timestamp: new Date(Date.now() - 16 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Ann C.',
    commentText: 'Attempted contact - no answer. Left callback number.',
    ptpStatus: 'not_reached',
  },

  // CASE-004 comments
  {
    id: 'CMT-018',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Robert K.',
    commentText: 'Case escalated to legal department due to extended non-payment.',
    ptpStatus: 'ptp_broken',
  },
  {
    id: 'CMT-019',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Catherine W.',
    commentText: 'Multiple contact attempts unsuccessful. Sending formal notice.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-020',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 11 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Robert K.',
    commentText: 'Left voicemail regarding urgent payment requirement.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-021',
    caseId: 'CASE-004',
    timestamp: new Date(Date.now() - 17 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Daniel K.',
    commentText: 'Sent email with final notice before escalation.',
    ptpStatus: 'ptp_broken',
  },

  // CASE-005 comments
  {
    id: 'CMT-022',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Jane N.',
    commentText: 'Customer confirmed payment will be made tomorrow via M-Pesa.',
    ptpStatus: 'ptp_honored',
  },
  {
    id: 'CMT-023',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Patrick M.',
    commentText: 'Payment arrangement established. Customer agreed to pay KES 1,500 weekly.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-024',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Jane N.',
    commentText: 'Sent SMS with payment instructions and paybill number.',
    ptpStatus: 'not_reached',
  },
  {
    id: 'CMT-025',
    caseId: 'CASE-005',
    timestamp: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Susan A.',
    commentText: 'Initial contact successful. Customer aware of outstanding balance.',
    ptpStatus: 'ptp_made',
  },

  // CASE-006 comments
  {
    id: 'CMT-026',
    caseId: 'CASE-006',
    timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Francis K.',
    commentText: 'Customer requested payment plan. Approved 2-month installment arrangement.',
    ptpStatus: 'ptp_made',
  },
  {
    id: 'CMT-027',
    caseId: 'CASE-006',
    timestamp: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Margaret W.',
    commentText: 'Sent follow-up email with account statement and payment options.',
    ptpStatus: 'not_reached',
  },

  // CASE-007 comments
  {
    id: 'CMT-028',
    caseId: 'CASE-007',
    timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Michael J.',
    commentText: 'Case escalated to supervisor. Multiple unsuccessful contact attempts.',
    ptpStatus: 'ptp_broken',
  },
  {
    id: 'CMT-029',
    caseId: 'CASE-007',
    timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Sarah W.',
    commentText: 'Left voicemail regarding overdue balance and payment urgency.',
    ptpStatus: 'not_reached',
  },

  // CASE-008 comments
  {
    id: 'CMT-030',
    caseId: 'CASE-008',
    timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    agentName: 'Agent David O.',
    commentText: 'Customer confirmed receipt of notice. Promised to pay by Friday.',
    ptpStatus: 'ptp_honored',
  },
  {
    id: 'CMT-031',
    caseId: 'CASE-008',
    timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    agentName: 'Agent Grace W.',
    commentText: 'Sent SMS reminder with payment details and account balance.',
    ptpStatus: 'not_reached',
  },
];

// Helper function to get comments for a specific case
export function getCommentsByCaseId(caseId: string): Comment[] {
  return DUMMY_COMMENTS.filter(comment => comment.caseId === caseId)
    .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()); // Most recent first
}
