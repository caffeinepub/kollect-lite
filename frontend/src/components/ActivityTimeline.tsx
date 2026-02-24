import { Badge } from './ui/badge';
import { useGetCaseActivities } from '../hooks/useQueries';

interface ActivityTimelineProps {
  caseId: string;
}

export default function ActivityTimeline({ caseId }: ActivityTimelineProps) {
  const { data: activities = [], isLoading } = useGetCaseActivities(caseId);

  if (isLoading) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Loading activities...
      </div>
    );
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No activities yet
      </div>
    );
  }

  // Sort activities by timestamp in descending order (newest first)
  const sortedActivities = [...activities].sort((a, b) => {
    const timeA = Number(a.timestamp);
    const timeB = Number(b.timestamp);
    return timeB - timeA;
  });

  return (
    <div className="space-y-2 max-h-[200px] overflow-y-auto">
      {sortedActivities.map((activity, index) => {
        // Convert nanoseconds to milliseconds
        const timestamp = new Date(Number(activity.timestamp) / 1000000);
        
        return (
          <div
            key={index}
            className="border-l-2 border-teal-dark pl-2 pb-2 last:pb-0"
          >
            <div className="flex items-center gap-1.5 mb-1">
              <span className="text-[10px] text-gray-500">
                {timestamp.toLocaleDateString()} {timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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

            {(activity.ptpAmount !== undefined || activity.ptpDate) && (
              <div className="bg-teal-50 border border-teal-200 rounded px-1.5 py-0.5 mb-1">
                <p className="text-[10px] text-teal-800 font-medium">
                  🤝 PTP: {activity.ptpAmount !== undefined ? `$${activity.ptpAmount.toFixed(2)}` : ''} 
                  {activity.ptpAmount !== undefined && activity.ptpDate ? ' - ' : ''}
                  {activity.ptpDate ? new Date(activity.ptpDate).toLocaleDateString() : ''}
                </p>
              </div>
            )}

            {activity.comments && (
              <p className="text-[11px] text-gray-700 leading-tight">
                {activity.comments}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
