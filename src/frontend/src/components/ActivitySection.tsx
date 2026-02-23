import { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import ActivityTimeline from './ActivityTimeline';
import { useAddActivity } from '../hooks/useQueries';
import { toast } from 'sonner';

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [actionType, setActionType] = useState('');
  const [outcome, setOutcome] = useState('');
  const [comments, setComments] = useState('');

  const addActivityMutation = useAddActivity();

  const handleAddComment = async () => {
    if (!actionType || !outcome) {
      toast.error('Please select both action and outcome');
      return;
    }

    try {
      await addActivityMutation.mutateAsync({
        caseId,
        activity: {
          timestamp: BigInt(Date.now() * 1000000), // Convert to nanoseconds
          actionType,
          outcome,
          comments: comments || undefined,
          paymentDetails: undefined,
        },
      });

      // Reset form
      setActionType('');
      setOutcome('');
      setComments('');
      
      toast.success('Activity added successfully');
      
      // Show history after adding
      setShowHistory(true);
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
    }
  };

  // Check if comments field has any non-whitespace content
  const isCommentsEmpty = comments.trim().length === 0;
  const isButtonDisabled = !actionType || !outcome || isCommentsEmpty || addActivityMutation.isPending;

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <h2 className="text-base font-semibold text-gray-900 mb-3 flex items-center gap-2">
        <span className="text-lg">⚡</span>
        Activity
      </h2>
      
      <div className="space-y-3">
        {/* Action and Outcome side by side */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Action
            </label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="Visit">Visit</SelectItem>
                <SelectItem value="PTP">Payment Promise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Outcome
            </label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger className="h-9 text-sm">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Not Reached">Not Reached</SelectItem>
                <SelectItem value="Promised to Pay">Promised to Pay</SelectItem>
                <SelectItem value="Paid">Paid</SelectItem>
                <SelectItem value="Disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Comments label and History link on same line */}
        <div className="flex items-center justify-between">
          <label className="text-sm font-medium text-gray-900">
            Comments
          </label>
          <button
            onClick={() => setShowHistory(!showHistory)}
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <RotateCcw className="w-4 h-4" />
            History
          </button>
        </div>

        {/* Comments textarea */}
        <Textarea
          value={comments}
          onChange={(e) => setComments(e.target.value)}
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
          {addActivityMutation.isPending ? 'Adding...' : 'Add Comment'}
        </Button>

        {showHistory && <ActivityTimeline caseId={caseId} />}
      </div>
    </div>
  );
}
