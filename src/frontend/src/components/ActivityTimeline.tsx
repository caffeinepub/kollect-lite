/**
 * Activity Timeline Component
 * Displays comment history with structured layout: sub-header, date/timestamp, action/outcome pills, and comment message.
 */

import { useGetCaseComments } from '../hooks/useQueries';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

interface ActivityTimelineProps {
  caseId: string;
}

export default function ActivityTimeline({ caseId }: ActivityTimelineProps) {
  const { data: comments = [], isLoading } = useGetCaseComments(caseId);
  const { identity } = useInternetIdentity();

  if (isLoading) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        Loading activity...
      </div>
    );
  }

  if (comments.length === 0) {
    return (
      <div className="text-center py-4 text-sm text-gray-500">
        No activity yet
      </div>
    );
  }

  // Sort comments by timestamp in descending order (newest first)
  const sortedComments = [...comments].sort((a, b) => {
    const timeA = Number(a.timestamp);
    const timeB = Number(b.timestamp);
    return timeB - timeA;
  });

  // Format timestamp
  const formatTimestamp = (timestamp: bigint) => {
    const date = new Date(Number(timestamp) / 1000000); // Convert nanoseconds to milliseconds
    const day = date.getDate();
    const month = date.toLocaleDateString('en-US', { month: 'short' });
    const year = date.getFullYear();
    const time = date.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
    return `${day} ${month} ${year}, ${time}`;
  };

  // Get author display name
  const getAuthorName = (authorPrincipal: any) => {
    if (!identity) return 'Unknown';
    const currentPrincipal = identity.getPrincipal().toString();
    const authorString = authorPrincipal.toString();
    
    if (currentPrincipal === authorString) {
      return 'You';
    }
    
    // Show shortened principal for other users
    return `User ${authorString.slice(0, 8)}...`;
  };

  return (
    <div className="space-y-4">
      {/* Activity Timeline Sub-header */}
      <h3 className="text-lg font-semibold text-gray-900">Activity Timeline</h3>
      
      {/* Timeline entries */}
      <div className="space-y-4 overflow-y-auto smooth-scroll" style={{ maxHeight: '400px' }}>
        {sortedComments.map((comment, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-4 border border-gray-200 space-y-3"
          >
            {/* Date and Timestamp */}
            <div className="text-sm text-gray-600 font-medium">
              {formatTimestamp(comment.timestamp)}
            </div>

            {/* Action and Outcome Pills - Horizontally arranged */}
            <div className="flex items-center gap-2 flex-wrap">
              {comment.action && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-medium">
                  {comment.action}
                </div>
              )}
              {comment.outcome && (
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-green-100 text-green-800 text-xs font-medium">
                  {comment.outcome}
                </div>
              )}
            </div>

            {/* Comment Message */}
            <p className="text-sm text-gray-900 leading-relaxed">
              {comment.message}
            </p>

            {/* Author info (subtle, at bottom) */}
            <div className="text-xs text-gray-500 pt-2 border-t border-gray-100">
              By {getAuthorName(comment.author)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
