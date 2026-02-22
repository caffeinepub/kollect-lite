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

  // Color palette for alternating comment boxes
  const colors = [
    'bg-[#E6F4F1]', // light blue
    'bg-[#F0E6F4]', // light purple
    'bg-[#E6F4E6]', // light green
  ];

  return (
    <div className="mt-4 pt-4 border-t border-gray-200">
      <h3 className="text-base font-semibold text-gray-900 mb-4">Activity Timeline</h3>
      
      <div className="space-y-0">
        {sortedActivities.map((activity, index) => {
          // Convert nanoseconds to milliseconds
          const timestamp = new Date(Number(activity.timestamp) / 1000000);
          
          // Format timestamp as "DD MMM YYYY, HH:MM"
          const formattedDate = timestamp.toLocaleDateString('en-GB', {
            day: '2-digit',
            month: 'short',
            year: 'numeric',
          });
          const formattedTime = timestamp.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
          });
          const formattedTimestamp = `${formattedDate}, ${formattedTime}`;
          
          // Get color for this activity
          const colorClass = colors[index % colors.length];
          
          return (
            <div key={index} className="relative flex items-start gap-3 pb-6 last:pb-0">
              {/* Timestamp on the left */}
              <div className="flex-shrink-0 w-32 pt-1">
                <div className="flex items-center gap-1.5 text-xs text-gray-500">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2"/>
                    <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2"/>
                  </svg>
                  <span className="whitespace-nowrap">{formattedTimestamp}</span>
                </div>
              </div>

              {/* Timeline marker and line */}
              <div className="relative flex flex-col items-center flex-shrink-0">
                {/* Circular marker */}
                <div className="w-3 h-3 rounded-full bg-[#1e3a5f] border-2 border-white shadow-sm z-10" />
                
                {/* Vertical line (only if not last item) */}
                {index < sortedActivities.length - 1 && (
                  <div className="absolute top-3 left-1/2 -translate-x-1/2 w-0.5 h-full bg-gray-300" />
                )}
              </div>

              {/* Comment box */}
              <div className={`flex-1 ${colorClass} rounded-lg p-3 shadow-sm`}>
                <p className="text-sm text-gray-800 leading-relaxed">
                  {activity.comments || `${activity.actionType}: ${activity.outcome}`}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
