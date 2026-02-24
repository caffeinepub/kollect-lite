import { useState } from 'react';
import { MessageSquare, Plus, X, Loader2 } from 'lucide-react';
import { getCommentsByCaseId, PtpStatus, Comment } from '../data/dummyComments';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

interface CommentHistorySectionProps {
  caseId: string;
}

// Color config per PTP status
const STATUS_CONFIG: Record<
  PtpStatus,
  { bg: string; border: string; dot: string; label: string }
> = {
  ptp_made:    { bg: 'bg-green-100',  border: 'border-green-200',  dot: 'bg-green-500',  label: 'PTP Made' },
  ptp_honored: { bg: 'bg-blue-100',   border: 'border-blue-200',   dot: 'bg-blue-500',   label: 'PTP Honored' },
  ptp_broken:  { bg: 'bg-red-100',    border: 'border-red-200',    dot: 'bg-red-400',    label: 'PTP Broken' },
  not_reached: { bg: 'bg-gray-100',   border: 'border-gray-200',   dot: 'bg-gray-400',   label: 'Not Reached' },
  disputed:    { bg: 'bg-amber-100',  border: 'border-amber-200',  dot: 'bg-amber-400',  label: 'Disputed' },
};

const LEGEND_ORDER: PtpStatus[] = ['ptp_made', 'ptp_honored', 'ptp_broken', 'not_reached', 'disputed'];

const PTP_STATUS_OPTIONS: { value: PtpStatus; label: string }[] = [
  { value: 'ptp_made',    label: 'PTP Made' },
  { value: 'ptp_honored', label: 'PTP Honored' },
  { value: 'ptp_broken',  label: 'PTP Broken' },
  { value: 'not_reached', label: 'Not Reached' },
  { value: 'disputed',    label: 'Disputed' },
];

// Format timestamp: "19 Feb 2026, 12:10"
const formatTimestamp = (date: Date) => {
  const day = date.getDate();
  const month = date.toLocaleDateString('en-US', { month: 'short' });
  const year = date.getFullYear();
  const time = date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  });
  return `${day} ${month} ${year}, ${time}`;
};

let commentCounter = 1000;

export default function CommentHistorySection({ caseId }: CommentHistorySectionProps) {
  const [comments, setComments] = useState<Comment[]>(() => getCommentsByCaseId(caseId));
  const [showForm, setShowForm] = useState(false);
  const [commentText, setCommentText] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<PtpStatus | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [validationError, setValidationError] = useState('');

  const handleOpenForm = () => {
    setShowForm(true);
    setCommentText('');
    setSelectedStatus('');
    setValidationError('');
  };

  const handleCancel = () => {
    setShowForm(false);
    setCommentText('');
    setSelectedStatus('');
    setValidationError('');
  };

  const handleSubmit = async () => {
    if (!commentText.trim()) {
      setValidationError('Please enter a comment.');
      return;
    }
    if (!selectedStatus) {
      setValidationError('Please select a PTP status.');
      return;
    }

    setValidationError('');
    setIsSubmitting(true);

    // Simulate brief async operation
    await new Promise((resolve) => setTimeout(resolve, 400));

    const newComment: Comment = {
      id: `CMT-NEW-${++commentCounter}`,
      caseId,
      timestamp: new Date(),
      agentName: 'You',
      commentText: commentText.trim(),
      ptpStatus: selectedStatus as PtpStatus,
    };

    setComments((prev) => [newComment, ...prev]);
    setIsSubmitting(false);
    setShowForm(false);
    setCommentText('');
    setSelectedStatus('');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
      {/* Header */}
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <MessageSquare className="w-4 h-4 text-teal-dark" />
          Comment History
        </h2>
        {!showForm && (
          <button
            onClick={handleOpenForm}
            className="flex items-center gap-1 text-xs font-medium text-teal-dark border border-teal-dark rounded-md px-2 py-1 hover:bg-teal-dark hover:text-white transition-colors"
          >
            <Plus className="w-3 h-3" />
            Add Comment
          </button>
        )}
      </div>

      {/* Compact color legend */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 mb-3 pb-2 border-b border-gray-100">
        {LEGEND_ORDER.map((status) => {
          const cfg = STATUS_CONFIG[status];
          return (
            <div key={status} className="flex items-center gap-1">
              <div className={`w-3 h-3 rounded-sm ${cfg.bg} ${cfg.border} border flex-shrink-0`} />
              <span className="text-xs text-gray-600">{cfg.label}</span>
            </div>
          );
        })}
      </div>

      {/* Inline Add Comment Form */}
      {showForm && (
        <div className="mb-3 rounded-lg border border-teal-dark/30 bg-teal-dark/5 p-3">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-teal-dark">New Comment</span>
            <button
              onClick={handleCancel}
              disabled={isSubmitting}
              className="text-gray-400 hover:text-gray-600 transition-colors disabled:opacity-50"
              aria-label="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* PTP Status Selector */}
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1 font-medium">PTP Status</label>
            <Select
              value={selectedStatus}
              onValueChange={(val) => {
                setSelectedStatus(val as PtpStatus);
                setValidationError('');
              }}
              disabled={isSubmitting}
            >
              <SelectTrigger className="h-8 text-xs">
                <SelectValue placeholder="Select status…" />
              </SelectTrigger>
              <SelectContent>
                {PTP_STATUS_OPTIONS.map((opt) => {
                  const cfg = STATUS_CONFIG[opt.value];
                  return (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      <span className="flex items-center gap-2">
                        <span className={`inline-block w-2.5 h-2.5 rounded-full ${cfg.dot}`} />
                        {opt.label}
                      </span>
                    </SelectItem>
                  );
                })}
              </SelectContent>
            </Select>
          </div>

          {/* Comment Textarea */}
          <div className="mb-2">
            <label className="block text-xs text-gray-600 mb-1 font-medium">Comment</label>
            <Textarea
              value={commentText}
              onChange={(e) => {
                setCommentText(e.target.value);
                setValidationError('');
              }}
              placeholder="Enter your comment…"
              className="text-xs resize-none min-h-[72px]"
              disabled={isSubmitting}
            />
          </div>

          {/* Validation error */}
          {validationError && (
            <p className="text-xs text-red-500 mb-2">{validationError}</p>
          )}

          {/* Form actions */}
          <div className="flex gap-2 justify-end">
            <Button
              variant="outline"
              size="sm"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="h-7 text-xs px-3"
            >
              Cancel
            </Button>
            <Button
              size="sm"
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="h-7 text-xs px-3 bg-teal-dark hover:bg-teal-dark/90 text-white"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                  Saving…
                </>
              ) : (
                'Save Comment'
              )}
            </Button>
          </div>
        </div>
      )}

      {/* Comment list */}
      {comments.length === 0 ? (
        <div className="text-center py-4 text-sm text-gray-500">No comments yet</div>
      ) : (
        <div className="overflow-y-auto" style={{ maxHeight: '360px' }}>
          <div className="relative">
            {comments.map((comment, index) => {
              const cfg = STATUS_CONFIG[comment.ptpStatus];
              return (
                <div key={comment.id} className="relative flex gap-3 pb-4 last:pb-0">
                  {/* Timeline dot and connector line */}
                  <div className="relative flex flex-col items-center">
                    <div className={`w-3 h-3 rounded-full ${cfg.dot} flex-shrink-0 mt-1.5`} />
                    {index < comments.length - 1 && (
                      <div className="w-0.5 bg-gray-300 flex-grow mt-1" style={{ minHeight: '72px' }} />
                    )}
                  </div>

                  {/* Comment content */}
                  <div className="flex-1 min-w-0">
                    {/* Timestamp */}
                    <div className="flex items-center gap-2 mb-1.5">
                      <svg className="w-3.5 h-3.5 text-gray-500 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <circle cx="12" cy="12" r="10" strokeWidth="2" />
                        <path strokeWidth="2" strokeLinecap="round" d="M12 6v6l4 2" />
                      </svg>
                      <span className="text-xs text-gray-600 font-medium">
                        {formatTimestamp(comment.timestamp)}
                      </span>
                    </div>

                    {/* Color-coded comment block */}
                    <div className={`${cfg.bg} ${cfg.border} border rounded-lg p-2.5`}>
                      {/* Status label pill */}
                      <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1.5 ${cfg.bg} ${cfg.border} border`}>
                        {cfg.label}
                      </span>
                      <p className="text-sm text-gray-900 leading-relaxed">
                        {comment.commentText}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">{comment.agentName}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
