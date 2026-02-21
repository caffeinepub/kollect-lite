import { useState } from 'react';
import { useAddActivity } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { History, Plus } from 'lucide-react';
import ActivityTimeline from './ActivityTimeline';

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const { mutate: addActivity, isPending } = useAddActivity();
  const [action, setAction] = useState('');
  const [outcome, setOutcome] = useState('');
  const [comments, setComments] = useState('');
  const [showHistory, setShowHistory] = useState(false);

  const handleSubmit = () => {
    if (!action || !outcome) return;

    addActivity(
      {
        caseId,
        activity: {
          timestamp: BigInt(Date.now()) * BigInt(1000000),
          actionType: action,
          outcome,
          comments: comments || undefined,
          paymentDetails: undefined,
        },
      },
      {
        onSuccess: () => {
          setAction('');
          setOutcome('');
          setComments('');
        },
      }
    );
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
        Activity
      </h2>

      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <Label htmlFor="action" className="text-sm font-medium text-gray-700 mb-1.5 block">
              Action
            </Label>
            <Select value={action} onValueChange={setAction}>
              <SelectTrigger id="action">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="PTP">PTP</SelectItem>
                <SelectItem value="Visit">Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="outcome" className="text-sm font-medium text-gray-700 mb-1.5 block">
              Outcome
            </Label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger id="outcome">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="PTP">PTP</SelectItem>
                <SelectItem value="PTP Honored">PTP Honored</SelectItem>
                <SelectItem value="PTP Broken">PTP Broken</SelectItem>
                <SelectItem value="Deceased">Deceased</SelectItem>
                <SelectItem value="R-plan">R-plan</SelectItem>
                <SelectItem value="Skip tracing">Skip tracing</SelectItem>
                <SelectItem value="Callback">Callback</SelectItem>
                <SelectItem value="Debt Fully Charged">Debt Fully Charged</SelectItem>
                <SelectItem value="Balance Disputed">Balance Disputed</SelectItem>
                <SelectItem value="Unreachable">Unreachable</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-1.5">
            <Label htmlFor="comments" className="text-sm font-medium text-gray-700">
              Comments
            </Label>
            <button
              onClick={() => setShowHistory(!showHistory)}
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <History className="w-4 h-4" />
              History
            </button>
          </div>
          <Textarea
            id="comments"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            placeholder="Enter your comment here..."
            rows={4}
            className="resize-none"
          />
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isPending || !action || !outcome}
          className="w-full gap-2"
          style={{ backgroundColor: '#6B8EA0' }}
        >
          <Plus className="w-4 h-4" />
          Add Comment
        </Button>

        {showHistory && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <ActivityTimeline caseId={caseId} />
          </div>
        )}
      </div>
    </div>
  );
}
