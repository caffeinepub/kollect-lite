import { useState } from 'react';
import { History } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import ActivityTimeline from './ActivityTimeline';

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const [showHistory, setShowHistory] = useState(false);
  const [actionType, setActionType] = useState('');
  const [outcome, setOutcome] = useState('');
  const [comments, setComments] = useState('');

  const handleAddComment = () => {
    // Add activity logic here
    console.log('Adding activity:', { actionType, outcome, comments });
    // Reset form
    setActionType('');
    setOutcome('');
    setComments('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-sm font-semibold text-gray-900">Comments</h2>
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="flex items-center gap-1 text-xs text-teal-dark hover:text-teal-dark/80 font-medium"
        >
          <History className="w-3.5 h-3.5" />
          History
        </button>
      </div>
      
      <div className="space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <div>
            <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
              Action
            </label>
            <Select value={actionType} onValueChange={setActionType}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="call">Call</SelectItem>
                <SelectItem value="email">Email</SelectItem>
                <SelectItem value="sms">SMS</SelectItem>
                <SelectItem value="visit">Visit</SelectItem>
                <SelectItem value="ptp">Payment Promise</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
              Outcome
            </label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger className="h-7 text-xs">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contacted">Contacted</SelectItem>
                <SelectItem value="not-reached">Not Reached</SelectItem>
                <SelectItem value="promised">Promised to Pay</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="disputed">Disputed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-[10px] font-medium text-gray-700 mb-0.5">
            Add Comment
          </label>
          <Textarea
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Add your comments here..."
            className="min-h-[60px] text-xs resize-none"
          />
        </div>

        <Button
          onClick={handleAddComment}
          disabled={!actionType || !outcome}
          className="w-full h-7 text-xs bg-teal-dark hover:bg-teal-dark/90"
        >
          Add Comment
        </Button>

        {showHistory && (
          <div className="pt-2 border-t border-gray-200">
            <ActivityTimeline caseId={caseId} />
          </div>
        )}
      </div>
    </div>
  );
}
