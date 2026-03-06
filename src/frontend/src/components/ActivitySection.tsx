import { ChevronDown, ChevronUp, Plus } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddActivity } from "../hooks/useQueries";
import ActivityTimeline from "./ActivityTimeline";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from "./ui/textarea";

interface ActivitySectionProps {
  caseId: string;
}

export default function ActivitySection({ caseId }: ActivitySectionProps) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [showHistory, setShowHistory] = useState(false);
  const [actionType, setActionType] = useState("");
  const [outcome, setOutcome] = useState("");
  const [comments, setComments] = useState("");
  const [ptpAmount, setPtpAmount] = useState("");
  const [ptpDate, setPtpDate] = useState("");
  const [capturedBy, setCapturedBy] = useState("");
  const [recommendationSummary, setRecommendationSummary] = useState("");

  const addActivityMutation = useAddActivity();

  const handleAddComment = async () => {
    if (!actionType || !outcome) {
      toast.error("Please select both action and outcome");
      return;
    }

    if (outcome === "PTP") {
      if (!ptpAmount || !ptpDate) {
        toast.error("Please enter PTP Amount and PTP Date");
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
          ptpAmount:
            outcome === "PTP" && ptpAmount
              ? Number.parseFloat(ptpAmount)
              : undefined,
          ptpDate: outcome === "PTP" && ptpDate ? ptpDate : undefined,
        },
      });

      setActionType("");
      setOutcome("");
      setComments("");
      setPtpAmount("");
      setPtpDate("");
      setCapturedBy("");
      setRecommendationSummary("");

      toast.success("Activity added successfully");
      setShowHistory(true);
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("Failed to add activity");
    }
  };

  const isPTP = outcome === "PTP";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3">
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between mb-0"
        data-ocid="activity.collapse.toggle"
      >
        <h2 className="text-base font-semibold text-gray-900 flex items-center gap-2">
          <span className="text-lg">⚡</span>
          Activity
        </h2>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="space-y-3 mt-3">
          {/* Action and Outcome side by side */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="activity-action"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Action
              </label>
              <Select value={actionType} onValueChange={setActionType}>
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="activity.action.select"
                >
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
              <label
                htmlFor="activity-outcome"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Outcome
              </label>
              <Select value={outcome} onValueChange={setOutcome}>
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="activity.outcome.select"
                >
                  <SelectValue placeholder="Select outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="PTP">PTP</SelectItem>
                  <SelectItem value="Deceased">Deceased</SelectItem>
                  <SelectItem value="FNF">FNF</SelectItem>
                  <SelectItem value="R-Plan">R-Plan</SelectItem>
                  <SelectItem value="Negotiation">Negotiation</SelectItem>
                  <SelectItem value="Skip Trace">Skip Trace</SelectItem>
                  <SelectItem value="Callback">Callback</SelectItem>
                  <SelectItem value="PTP Honored">PTP Honored</SelectItem>
                  <SelectItem value="Debt Fully Charged">
                    Debt Fully Charged
                  </SelectItem>
                  <SelectItem value="Disputed">Disputed</SelectItem>
                  <SelectItem value="Unreachable">Unreachable</SelectItem>
                  <SelectItem value="Recommend Legal">
                    Recommend Legal
                  </SelectItem>
                  <SelectItem value="Recommend Outsource to ICA">
                    Recommend Outsource to ICA
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* PTP fields - conditional */}
          {isPTP && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label
                  htmlFor="activity-ptp-amount"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  PTP Amount
                </label>
                <Input
                  id="activity-ptp-amount"
                  type="number"
                  placeholder="0.00"
                  value={ptpAmount}
                  onChange={(e) => setPtpAmount(e.target.value)}
                  className="h-8 text-xs"
                  data-ocid="activity.ptp_amount.input"
                />
              </div>
              <div>
                <label
                  htmlFor="activity-ptp-date"
                  className="block text-xs font-medium text-gray-700 mb-1"
                >
                  PTP Date
                </label>
                <Input
                  id="activity-ptp-date"
                  type="date"
                  value={ptpDate}
                  onChange={(e) => setPtpDate(e.target.value)}
                  className="h-8 text-xs"
                  data-ocid="activity.ptp_date.input"
                />
              </div>
            </div>
          )}

          {/* Captured By and Recommendation Summary */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label
                htmlFor="activity-captured-by"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Captured By
              </label>
              <Select value={capturedBy} onValueChange={setCapturedBy}>
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="activity.captured_by.select"
                >
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Customer ID">Customer ID</SelectItem>
                  <SelectItem value="Loan Number">Loan Number</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label
                htmlFor="activity-recommendation"
                className="block text-xs font-medium text-gray-700 mb-1"
              >
                Recommendation
              </label>
              <Select
                value={recommendationSummary}
                onValueChange={setRecommendationSummary}
              >
                <SelectTrigger
                  className="h-8 text-xs"
                  data-ocid="activity.recommendation.select"
                >
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="None">None</SelectItem>
                  <SelectItem value="PI Report">PI Report</SelectItem>
                  <SelectItem value="Termination Letter">
                    Termination Letter
                  </SelectItem>
                  <SelectItem value="Employment Contract">
                    Employment Contract
                  </SelectItem>
                  <SelectItem value="Death Certificate">
                    Death Certificate
                  </SelectItem>
                  <SelectItem value="Acknowledged Demand Letter">
                    Acknowledged Demand Letter
                  </SelectItem>
                  <SelectItem value="Repayment Plan">Repayment Plan</SelectItem>
                  <SelectItem value="Customer Request">
                    Customer Request
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Comment label row — label left, Show History toggle right */}
          <div className="flex items-center justify-between">
            <label
              htmlFor="activity-comment"
              className="text-xs font-medium text-gray-700"
            >
              Comment
            </label>
            <button
              type="button"
              onClick={() => setShowHistory(!showHistory)}
              className="text-xs text-blue-600 hover:text-blue-800 font-medium transition-colors flex items-center gap-1"
              data-ocid="activity.history.toggle"
            >
              {showHistory ? "▲ Hide History" : "▼ Show History"}
            </button>
          </div>

          {/* Comment textarea */}
          <Textarea
            id="activity-comment"
            placeholder="Add a comment..."
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            className="text-xs resize-none"
            rows={3}
            data-ocid="activity.comment.textarea"
          />

          {/* Add Comment button */}
          <Button
            onClick={handleAddComment}
            disabled={!comments.trim() || addActivityMutation.isPending}
            className="w-full h-8 text-xs bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-40"
            data-ocid="activity.add_comment.button"
          >
            {addActivityMutation.isPending ? (
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Adding...
              </span>
            ) : (
              <span className="flex items-center gap-2">
                <Plus className="w-3.5 h-3.5" />
                Add Comment
              </span>
            )}
          </Button>

          {showHistory && <ActivityTimeline caseId={caseId} />}
        </div>
      )}
    </div>
  );
}
