import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
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
  const [ptpAmount, setPtpAmount] = useState('');
  const [ptpDate, setPtpDate] = useState('');

  const addActivityMutation = useAddActivity();

  const handleAddComment = async () => {
    if (!actionType || !outcome) {
      toast.error('Please select both action and outcome');
      return;
    }

    if (outcome === 'Promised to Pay') {
      if (!ptpAmount || !ptpDate) {
        toast.error('Please enter PTP Amount and PTP Date');
        return;
      }
    }

    try {
      await addActivityMutation.mutateAsync({
        caseId,
        activity: {
          timestamp: BigInt(Date.now() * 1000000),
          actionType,
          outcome,
          comments: comments || undefined,
          paymentDetails: undefined,
          ptpAmount: outcome === 'Promised to Pay' && ptpAmount ? parseFloat(ptpAmount) : undefined,
          ptpDate: outcome === 'Promised to Pay' && ptpDate ? ptpDate : undefined,
        },
      });

      setActionType('');
      setOutcome('');
      setComments('');
      setPtpAmount('');
      setPtpDate('');

      toast.success('Activity added successfully');
      setShowHistory(true);
    } catch (error) {
      console.error('Error adding activity:', error);
      toast.error('Failed to add activity');
    }
  };

  const isPTP = outcome === 'Promised to Pay';

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
              <SelectTrigger className="h-9 text-sm focus:ring-forest-base focus:border-forest-base">
                <SelectValue placeholder="Select action" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Call">Call</SelectItem>
                <SelectItem value="Email">Email</SelectItem>
                <SelectItem value="SMS">SMS</SelectItem>
                <SelectItem value="Visit">Visit</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-1.5">
              Outcome
            </label>
            <Select value={outcome} onValueChange={setOutcome}>
              <SelectTrigger className="h-9 text-sm focus:ring-forest-base focus:border-forest-base">
                <SelectValue placeholder="Select outcome" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Contacted">Contacted</SelectItem>
                <SelectItem value="Not Reachable">Not Reachable</SelectItem>
                <SelectItem value="Promised to Pay">Promised to Pay</SelectItem>
                <SelectItem value="Refused to Pay">Refused to Pay</SelectItem>
                <SelectItem value="Left Message">Left Message</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* PTP fields - conditional */}
        {isPTP && (
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                PTP Amount
              </label>
              <Input
                type="number"
                placeholder="0.00"
                value={ptpAmount}
                onChange={(e) => setPtpAmount(e.target.value)}
                className="h-9 text-sm focus:ring-forest-base focus:border-forest-base"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                PTP Date
              </label>
              <Input
                type="date"
                value={ptpDate}
                onChange={(e) => setPtpDate(e.target.value)}
                className="h-9 text-sm focus:ring-forest-base focus:border-forest-base"
              />
            </div>
          </div>
        )}

        {/* Comments */}
        <div>
          <label className="block text-sm font-medium text-gray-900 mb-1.5">
            Comments
          </label>
          <Textarea
            placeholder="Add a comment..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="text-sm resize-none focus:ring-forest-base focus:border-forest-base"
            rows={3}
          />
        </div>

        {/* Add Comment button */}
        <Button
          onClick={handleAddComment}
          disabled={addActivityMutation.isPending}
          className="w-full h-9 text-sm bg-forest-base hover:bg-forest-medium text-white"
        >
          {addActivityMutation.isPending ? (
            <span className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Adding...
            </span>
          ) : (
            <span className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Comment
            </span>
          )}
        </Button>

        {/* History toggle */}
        <button
          onClick={() => setShowHistory(!showHistory)}
          className="w-full text-xs text-forest-base hover:text-forest-dark font-medium py-1 transition-colors"
        >
          {showHistory ? '▲ Hide History' : '▼ Show History'}
        </button>

        {showHistory && <ActivityTimeline caseId={caseId} />}
      </div>
    </div>
  );
}
