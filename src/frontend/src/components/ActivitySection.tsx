import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useAddActivity } from "../hooks/useQueries";
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

export interface NewActivityEntry {
  id: string;
  date: string;
  time: string;
  action: string;
  outcome: string;
  comment: string;
  officer: string;
  nextReviewDate: string;
}

interface ActivitySectionProps {
  caseId: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
  onCommentAdded?: (entry: NewActivityEntry) => void;
}

export default function ActivitySection({
  caseId,
  isCollapsed: controlledCollapsed,
  onToggle,
  onCommentAdded,
}: ActivitySectionProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(false);
  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const handleToggle = onToggle ?? (() => setInternalCollapsed((p) => !p));

  const [actionType, setActionType] = useState("");
  const [outcome, setOutcome] = useState("");
  const [comments, setComments] = useState("");
  const [ptpAmount, setPtpAmount] = useState("");
  const [ptpDate, setPtpDate] = useState("");
  const [capturedBy, setCapturedBy] = useState("");
  const [recommendationSummary, setRecommendationSummary] = useState("");

  const addActivityMutation = useAddActivity();

  const _handleAddComment = async () => {
    if (!actionType || !outcome) {
      toast.error("Please select both action and outcome");
      return;
    }
    if (outcome === "PTP" && (!ptpAmount || !ptpDate)) {
      toast.error("Please enter PTP Amount and PTP Date");
      return;
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

      // Build a debt-card activity entry and bubble it up
      if (onCommentAdded) {
        const now = new Date();
        const reviewDate = new Date(now);
        reviewDate.setDate(reviewDate.getDate() + 7);
        const fmt = (d: Date) =>
          d.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "short",
            year: "numeric",
          });
        const timeFmt = now.toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        });
        onCommentAdded({
          id: `new-${Date.now()}`,
          date: fmt(now),
          time: timeFmt,
          action: actionType,
          outcome,
          comment: comments,
          officer: "Sarah Mitchell",
          nextReviewDate: fmt(reviewDate),
        });
      }

      setActionType("");
      setOutcome("");
      setComments("");
      setPtpAmount("");
      setPtpDate("");
      setCapturedBy("");
      setRecommendationSummary("");
      toast.success("Activity added successfully");
    } catch (error) {
      console.error("Error adding activity:", error);
      toast.error("Failed to add activity");
    }
  };

  const isPTP = outcome === "PTP";

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200"
        data-ocid="activity.collapse.toggle"
      >
        <h2 className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
          Activity
        </h2>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="space-y-3 p-3">
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
                {/* max-h limits to ~6 items (each ~32px) with scroll */}
                <SelectContent className="max-h-[192px] overflow-y-auto">
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

          {/* Comment */}
          <div>
            <label
              htmlFor="activity-comment"
              className="text-xs font-medium text-gray-700 block mb-1"
            >
              Comment
            </label>
            <Textarea
              id="activity-comment"
              placeholder="Add a comment..."
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="text-xs resize-none"
              rows={3}
              data-ocid="activity.comment.textarea"
            />
          </div>
        </div>
      )}
    </div>
  );
}
