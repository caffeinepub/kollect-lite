import { Badge } from './ui/badge';
import { format } from 'date-fns';
import { Activity } from '../backend';

interface ActivityTimelineProps {
  caseId: string;
}

// Dummy activities data for each case
const DUMMY_ACTIVITIES: Record<string, Activity[]> = {
  'CASE-001': [
    {
      timestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'Unreachable',
      comments: 'Called debtor, no answer. Left voicemail requesting callback.',
    },
    {
      timestamp: BigInt(Date.now() - 5 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'Callback',
      comments: 'Sent final notice email with payment options.',
    },
    {
      timestamp: BigInt(Date.now() - 10 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'SMS',
      outcome: 'PTP',
      comments: 'SMS reminder sent about overdue payment.',
    },
    {
      timestamp: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'PTP Broken',
      comments: 'Debtor acknowledged debt but requested more time. No commitment made.',
    },
    {
      timestamp: BigInt(Date.now() - 20 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'Skip tracing',
      comments: 'Initial collection notice sent.',
    },
  ],
  'CASE-002': [
    {
      timestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'PTP',
      outcome: 'PTP',
      paymentDetails: 'KES 2,500 by 2026-02-28',
      comments: 'Customer agreed to pay KES 2,500 by end of month.',
    },
    {
      timestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'R-plan',
      comments: 'Discussed payment plan options. Debtor interested in installment plan.',
    },
    {
      timestamp: BigInt(Date.now() - 7 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'SMS',
      outcome: 'Callback',
      comments: 'Payment reminder SMS sent.',
    },
    {
      timestamp: BigInt(Date.now() - 12 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'PTP',
      comments: 'Collection notice with account details sent.',
    },
  ],
  'CASE-003': [
    {
      timestamp: BigInt(Date.now() - 1 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'PTP Honored',
      comments: 'Confirmed payment of KES 1,000 received via M-Pesa.',
    },
    {
      timestamp: BigInt(Date.now() - 4 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'PTP',
      outcome: 'PTP',
      paymentDetails: 'KES 1,000 by 2026-02-19',
      comments: 'Customer committed to partial payment by February 19.',
    },
    {
      timestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'Callback',
      comments: 'Debtor explained temporary financial difficulty. Willing to pay.',
    },
    {
      timestamp: BigInt(Date.now() - 14 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'SMS',
      outcome: 'PTP',
      comments: 'Initial payment reminder sent.',
    },
  ],
  'CASE-004': [
    {
      timestamp: BigInt(Date.now() - 3 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'Debt Fully Charged',
      comments: 'Legal action warning sent. Final notice before escalation.',
    },
    {
      timestamp: BigInt(Date.now() - 8 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'Unreachable',
      comments: 'Multiple call attempts. No response from debtor.',
    },
    {
      timestamp: BigInt(Date.now() - 15 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'SMS',
      outcome: 'Unreachable',
      comments: 'SMS sent but no response received.',
    },
    {
      timestamp: BigInt(Date.now() - 22 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'Skip tracing',
      comments: 'Initial collection notice sent.',
    },
  ],
  'CASE-005': [
    {
      timestamp: BigInt(Date.now() - 2 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'PTP',
      comments: 'Debtor agreed to pay by end of week.',
    },
    {
      timestamp: BigInt(Date.now() - 6 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'SMS',
      outcome: 'Callback',
      comments: 'Payment reminder sent.',
    },
    {
      timestamp: BigInt(Date.now() - 11 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Email',
      outcome: 'PTP',
      comments: 'Collection notice sent.',
    },
    {
      timestamp: BigInt(Date.now() - 16 * 24 * 60 * 60 * 1000) * BigInt(1000000),
      actionType: 'Call',
      outcome: 'R-plan',
      comments: 'Discussed payment options.',
    },
  ],
};

export default function ActivityTimeline({ caseId }: ActivityTimelineProps) {
  const activities = DUMMY_ACTIVITIES[caseId] || [];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-semibold text-gray-900">Activity History</h3>
      <div className="max-h-[266px] overflow-y-auto pr-2">
        <div className="space-y-4">
          {activities.map((activity, index) => {
            const timestamp = Number(activity.timestamp / BigInt(1000000));
            const date = new Date(timestamp);

            return (
              <div key={index} className="relative pl-6 pb-4 border-l-2 border-gray-200 last:border-l-0 last:pb-0">
                <div className="absolute left-[-5px] top-0 w-2 h-2 rounded-full bg-teal-dark" />
                <div className="space-y-2">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <span>{format(date, 'MMM dd, yyyy')}</span>
                    <span>•</span>
                    <span>{format(date, 'HH:mm')}</span>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant="outline" className="text-xs">
                      {activity.actionType}
                    </Badge>
                    <Badge variant="secondary" className="text-xs">
                      {activity.outcome}
                    </Badge>
                  </div>
                  {activity.paymentDetails && (
                    <div className="bg-amber-50 border border-amber-200 rounded-md p-2 text-xs text-amber-900">
                      <span className="font-semibold">Payment Promise:</span> {activity.paymentDetails}
                    </div>
                  )}
                  {activity.comments && (
                    <div className="bg-blue-50 border border-blue-100 rounded-md p-3 text-sm text-gray-700">
                      {activity.comments}
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
