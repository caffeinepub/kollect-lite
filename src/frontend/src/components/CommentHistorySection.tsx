import { MessageSquare } from 'lucide-react';
import { getCommentsByCaseId } from '../data/dummyComments';

interface CommentHistorySectionProps {
  caseId: string;
}

export default function CommentHistorySection({ caseId }: CommentHistorySectionProps) {
  const comments = getCommentsByCaseId(caseId);

  if (comments.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
        <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-dark" />
          Comment History
        </h2>
        <div className="text-center py-4 text-sm text-gray-500">
          No comments yet
        </div>
      </div>
    );
  }

  // Color rotation for comment backgrounds
  const getCommentColor = (index: number) => {
    const colors = ['bg-sky-100', 'bg-purple-100', 'bg-green-100'];
    return colors[index % colors.length];
  };

  // Format timestamp to match reference image: "19 Feb 2026, 12:10"
  const formatTimestamp = (date: Date) => {
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

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <MessageSquare className="w-4 h-4 text-teal-dark" />
        Comment History
      </h2>
      
      {/* Scrollable container with fixed height for exactly 3 comments */}
      <div className="overflow-y-auto" style={{ maxHeight: '360px' }}>
        <div className="relative">
          {comments.map((comment, index) => (
            <div key={comment.id} className="relative flex gap-3 pb-6 last:pb-0">
              {/* Timeline dot and connector line */}
              <div className="relative flex flex-col items-center">
                <div className="w-3 h-3 rounded-full bg-teal-dark flex-shrink-0 mt-1.5" />
                {index < comments.length - 1 && (
                  <div className="w-0.5 bg-gray-300 flex-grow mt-1" style={{ minHeight: '80px' }} />
                )}
              </div>

              {/* Comment content */}
              <div className="flex-1 min-w-0">
                {/* Timestamp */}
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="2" />
                    <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
                  </svg>
                  <span className="text-xs text-gray-600 font-medium">
                    {formatTimestamp(comment.timestamp)}
                  </span>
                </div>

                {/* Comment box with colored background */}
                <div className={`${getCommentColor(index)} rounded-lg p-3 border border-gray-200`}>
                  <p className="text-sm text-gray-900 leading-relaxed">
                    {comment.commentText}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
