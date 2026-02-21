import { Badge } from './ui/badge';

interface ActivityTimelineProps {
  caseId: string;
}

// Dummy activity data
const DUMMY_ACTIVITIES = [
  {
    timestamp: new Date('2024-01-15T10:30:00'),
    actionType: 'Call',
    outcome: 'Promised to Pay',
    paymentDetails: 'KES 5,000 by Jan 20',
    comments: 'Customer agreed to make partial payment by end of week',
  },
  {
    timestamp: new Date('2024-01-10T14:15:00'),
    actionType: 'Email',
    outcome: 'Contacted',
    comments: 'Sent payment reminder email with account details',
  },
  {
    timestamp: new Date('2024-01-05T09:00:00'),
    actionType: 'SMS',
    outcome: 'Not Reached',
    comments: 'SMS sent but no response received',
  },
];

export default function ActivityTimeline({ caseId }: ActivityTimelineProps) {
  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto">
      {DUMMY_ACTIVITIES.map((activity, index) => (
        <div
          key={index}
          className="border-l-2 border-teal-dark pl-2 pb-2 last:pb-0"
        >
          <div className="flex items-center gap-1.5 mb-1">
            <span className="text-[10px] text-gray-500">
              {activity.timestamp.toLocaleDateString()} {activity.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </span>
          </div>
          
          <div className="flex gap-1 mb-1">
            <Badge variant="outline" className="text-[9px] px-1 py-0 h-4">
              {activity.actionType}
            </Badge>
            <Badge variant="secondary" className="text-[9px] px-1 py-0 h-4">
              {activity.outcome}
            </Badge>
          </div>

          {activity.paymentDetails && (
            <div className="bg-green-50 border border-green-200 rounded px-1.5 py-0.5 mb-1">
              <p className="text-[10px] text-green-800 font-medium">
                💰 {activity.paymentDetails}
              </p>
            </div>
          )}

          {activity.comments && (
            <div className="bg-blue-50 rounded px-1.5 py-1">
              <p className="text-[10px] text-gray-700">{activity.comments}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
