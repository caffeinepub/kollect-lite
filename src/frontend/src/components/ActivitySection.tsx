import { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import ActivityTimeline from './ActivityTimeline';
import { useAddComment } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [action, setAction] = useState('');
  const [outcome, setOutcome] = useState('');

  const addCommentMutation = useAddComment();

  const handleAddComment = async () => {
    const trimmedComment = commentText.trim();
    const trimmedAction = action.trim();
    const trimmedOutcome = outcome.trim();
    
    if (!trimmedComment) {
      toast.error('Please enter a comment');
      return;
    }

    if (!trimmedAction) {
      toast.error('Please enter an action');
      return;
    }

    if (!trimmedOutcome) {
      toast.error('Please enter an outcome');
      return;
    }

    try {
      await addCommentMutation.mutateAsync({
        caseId,
        message: trimmedComment,
        action: trimmedAction,
        outcome: trimmedOutcome,
      });

      // Reset form
      setCommentText('');
      setAction('');
      setOutcome('');
      
      toast.success('Comment added successfully');
      
      // Show history after adding
      setShowHistory(true);
    } catch (error) {
      console.error('Error adding comment:', error);
      toast.error('Failed to add comment');
    }
  };

  // Check if all required fields have content
  const isFormIncomplete = 
    commentText.trim().length === 0 || 
    action.trim().length === 0 || 
    outcome.trim().length === 0;
  const isButtonDisabled = isFormIncomplete || addCommentMutation.isPending;

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
            Add Activity
          </label>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900 transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Action and Outcome fields side by side */}
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-1">
            <Label htmlFor="action" className="text-xs text-gray-700">
              Action
            </Label>
            <Input
              id="action"
              value={action}
              onChange={(e) => setAction(e.target.value)}
              placeholder="e.g., Called customer"
              className="text-sm h-9"
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="outcome" className="text-xs text-gray-700">
              Outcome
            </Label>
            <Input
              id="outcome"
              value={outcome}
              onChange={(e) => setOutcome(e.target.value)}
              placeholder="e.g., Promise to pay"
              className="text-sm h-9"
            />
          </div>
        </div>

        {/* Comments textarea */}
        <div className="space-y-1">
          <Label htmlFor="comments" className="text-xs text-gray-700">
            Comments
          </Label>
          <Textarea
            id="comments"
            value={commentText}
            onChange={(e) => setCommentText(e.target.value)}
            placeholder="Enter your comment here..."
            className="min-h-[100px] text-sm resize-none"
          />
        </div>

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
