import { useState } from 'react';
import { RotateCcw, Plus } from 'lucide-react';
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

    // Validate PTP fields if outcome is "Promised to Pay"
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
          timestamp: BigInt(Date.now() * 1000000), // Convert to nanoseconds
          actionType,
          outcome,
          comments: comments || undefined,
          paymentDetails: undefined,
          ptpAmount: outcome === 'Promised to Pay' && ptpAmount ? parseFloat(ptpAmount) : undefined,
          ptpDate: outcome === 'Promised to Pay' && ptpDate ? ptpDate : undefined,
        },
      });

      // Reset form
      setActionType('');
      setOutcome('');
      setComments('');
      setPtpAmount('');
      setPtpDate('');
      
      toast.success('Activity added successfully');
      
      // Show history after adding
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
              <SelectTrigger className="h-9 text-sm">
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

        {/* Conditional PTP fields */}
        {isPTP && (
          <div className="grid grid-cols-2 gap-3 bg-teal-50 border border-teal-200 rounded-lg p-3">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1.5">
                PTP Amount
              </label>
              <Input
                type="number"
                value={ptpAmount}
                onChange={(e) => setPtpAmount(e.target.value)}
                placeholder="0.00"
                className="h-9 text-sm"
                step="0.01"
                min="0"
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
                className="h-9 text-sm"
              />
            </div>
          </div>
        )}

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
          disabled={!actionType || !outcome || addActivityMutation.isPending}
          className="w-full h-10 text-sm bg-teal-50 hover:bg-teal-100 text-teal-dark border border-teal-200 flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          {addActivityMutation.isPending ? 'Adding...' : 'Add Comment'}
        </Button>

        {showHistory && <ActivityTimeline caseId={caseId} />}
      </div>
    </div>
  );
}
