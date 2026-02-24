import { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import ActivityTimeline from './ActivityTimeline';
import { useAddComment } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [commentText, setCommentText] = useState('');

  const addCommentMutation = useAddComment();

  const handleAddComment = async () => {
    const trimmedComment = commentText.trim();
    
    if (!trimmedComment) {
      toast.error('Please enter a comment');
      return;
    }

    try {
      await addCommentMutation.mutateAsync({
        caseId,
        message: trimmedComment,
      });

      // Reset form
      setCommentText('');
      
      toast.success('Comment added successfully');
      
      // Show history after adding
      setShowHistory(true);
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  // Check if comments field has any non-whitespace content
  const isCommentsEmpty = commentText.trim().length === 0;
  const isButtonDisabled = isCommentsEmpty || addCommentMutation.isPending;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-lg">⚡</span>
        Activity
      </h2>
      
      <div className="space-y-3">
        {/* Comments label and History link on same line */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-900">
            Comments
          </label>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Comments textarea */}
        <Textarea
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="Enter your comment here..."
          className="min-h-[100px] text-sm resize-none"
        />

        {/* Add Comment button with light background */}
        <Button
          onClick={handleAddComment}
          disabled={isButtonDisabled}
          className="w-full h-10 text-sm bg-teal-50 hover:bg-teal-100 text-teal-dark border border-teal-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
          {addCommentMutation.isPending ? 'Adding...' : 'Add Comment'}
        </Button>

        {showHistory && <ActivityTimeline caseId={caseId} />}
      </div>
    </div>
  );
}
