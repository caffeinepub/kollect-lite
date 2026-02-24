/**
 * VISUAL CODING SPECIFICATIONS - Activity Timeline (Comment History)
 * 
 * Container Dimensions:
 * - Max height: 264px (calculated as 3 comments × ~80px + 2 gaps × 12px)
 * - Overflow: vertical auto scrolling with smooth behavior
 * - Scroll behavior: smooth
 * 
 * Color Coding (Light backgrounds for quick scanning):
 * - Teal: bg-teal-50 (OKLCH: 0.96 0.04 180) - alternating pattern
 * - Gray: bg-gray-50 (OKLCH: 0.97 0 0) - alternating pattern
 * - Blue: bg-blue-50 (OKLCH: 0.96 0.02 240) - alternating pattern
 * - Border: border-gray-200 for all comment blocks
 * 
 * Spacing & Layout:
 * - Vertical gap between comments: space-y-3 (12px)
 * - Comment block padding: p-4 (16px all sides)
 * - Comment block border-radius: rounded-lg (8px)
 * - Border width: 1px solid
 * 
 * Typography:
 * - Comment text: text-sm (14px), leading-relaxed (1.625), font-normal (400)
 * - Timestamp: text-xs (12px), text-gray-600, font-medium (500)
 * - Author name: text-xs (12px), text-gray-700, font-semibold (600)
 * 
 * Scrollbar Styling:
 * - Native scrollbar with overflow-y-auto
 * - Smooth scroll behavior enabled
 * - Maximum 3 comments visible without scrolling
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

  // Color rotation for comment backgrounds
  const getCommentColor = (index: number) => {
    const colors = ['bg-teal-50', 'bg-gray-50', 'bg-blue-50'];
    return colors[index % colors.length];
  };

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
    <div className="space-y-3 overflow-y-auto smooth-scroll" style={{ maxHeight: '264px' }}>
      {sortedComments.map((comment, index) => (
        <div
          key={index}
          className={`${getCommentColor(index)} rounded-lg p-4 border border-gray-200`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-gray-700 font-semibold">
              {getAuthorName(comment.author)}
            </span>
            <span className="text-xs text-gray-600 font-medium">
              {formatTimestamp(comment.timestamp)}
            </span>
          </div>
          <p className="text-sm text-gray-900 leading-relaxed">
            {comment.message}
          </p>
        </div>
      ))}
    </div>
  );
}
