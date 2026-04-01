import { Calendar, User, X } from "lucide-react";

export interface DebtCardActivity {
  id: string;
  date: string;
  time: string;
  action: string;
  outcome: string;
  comment: string;
  officer: string;
  nextReviewDate: string;
}

interface DebtCardModalProps {
  caseId: string;
  debtorName: string;
  onClose: () => void;
  extraActivities?: DebtCardActivity[];
}

const OFFICER_A = "Jane Wanjiku";
const OFFICER_B = "Brian Ochieng";

const HISTORY_ACTIVITIES: Record<string, DebtCardActivity[]> = {
  default: [
    {
      id: "a1",
      date: "18 Mar 2026",
      time: "09:14",
      action: "Call",
      outcome: "PTP",
      comment: "Client promised to pay KES 3,000 by end of week.",
      officer: OFFICER_A,
      nextReviewDate: "25 Mar 2026",
    },
    {
      id: "a2",
      date: "14 Mar 2026",
      time: "14:30",
      action: "Call",
      outcome: "Callback",
      comment: "Client requested a callback after 3pm.",
      officer: OFFICER_A,
      nextReviewDate: "18 Mar 2026",
    },
    {
      id: "a3",
      date: "10 Mar 2026",
      time: "11:05",
      action: "SMS",
      outcome: "Unreachable",
      comment: "No response to SMS reminder sent.",
      officer: OFFICER_A,
      nextReviewDate: "14 Mar 2026",
    },
    {
      id: "a4",
      date: "28 Feb 2026",
      time: "10:22",
      action: "Call",
      outcome: "PTP Honored",
      comment: "Confirmed full payment received for February instalment.",
      officer: OFFICER_B,
      nextReviewDate: "10 Mar 2026",
    },
    {
      id: "a5",
      date: "21 Feb 2026",
      time: "15:45",
      action: "Email",
      outcome: "Negotiation",
      comment: "Sent restructured repayment proposal via email.",
      officer: OFFICER_B,
      nextReviewDate: "28 Feb 2026",
    },
    {
      id: "a6",
      date: "14 Feb 2026",
      time: "08:50",
      action: "Call",
      outcome: "PTP Broken",
      comment: "Client failed to honour agreed PTP from last week.",
      officer: OFFICER_B,
      nextReviewDate: "21 Feb 2026",
    },
    {
      id: "a7",
      date: "07 Feb 2026",
      time: "13:10",
      action: "Visit",
      outcome: "Skip Trace",
      comment: "Field visit — client not found at registered address.",
      officer: OFFICER_B,
      nextReviewDate: "14 Feb 2026",
    },
  ],
};

const OUTCOME_CARD_BG: Record<string, string> = {
  PTP: "bg-green-50 border-green-200",
  "PTP Honored": "bg-emerald-50 border-emerald-200",
  "PTP Broken": "bg-red-50 border-red-200",
  Callback: "bg-sky-50 border-sky-200",
  Negotiation: "bg-indigo-50 border-indigo-200",
  Unreachable: "bg-gray-50 border-gray-200",
  "Skip Trace": "bg-amber-50 border-amber-200",
  Disputed: "bg-pink-50 border-pink-200",
  Deceased: "bg-slate-50 border-slate-200",
  FNF: "bg-lime-50 border-lime-200",
  "R-Plan": "bg-violet-50 border-violet-200",
  "Debt Fully Charged": "bg-red-50 border-red-200",
  "Recommend Legal": "bg-rose-50 border-rose-200",
  "Recommend Outsource to ICA": "bg-fuchsia-50 border-fuchsia-200",
};

const ACTION_PILL_COLOR: Record<string, string> = {
  Call: "bg-blue-100 text-blue-700",
  Email: "bg-purple-100 text-purple-700",
  SMS: "bg-teal-100 text-teal-700",
  Visit: "bg-orange-100 text-orange-700",
};

const OUTCOME_PILL_COLOR: Record<string, string> = {
  PTP: "bg-green-100 text-green-700",
  "PTP Honored": "bg-emerald-100 text-emerald-700",
  "PTP Broken": "bg-red-100 text-red-700",
  Callback: "bg-sky-100 text-sky-700",
  Negotiation: "bg-indigo-100 text-indigo-700",
  Unreachable: "bg-gray-100 text-gray-600",
  "Skip Trace": "bg-amber-100 text-amber-700",
  Disputed: "bg-pink-100 text-pink-700",
  Deceased: "bg-slate-100 text-slate-600",
  FNF: "bg-lime-100 text-lime-700",
  "R-Plan": "bg-violet-100 text-violet-700",
  "Debt Fully Charged": "bg-red-100 text-red-700",
  "Recommend Legal": "bg-rose-100 text-rose-700",
  "Recommend Outsource to ICA": "bg-fuchsia-100 text-fuchsia-700",
};

export default function DebtCardModal({
  caseId,
  debtorName,
  onClose,
  extraActivities = [],
}: DebtCardModalProps) {
  const baseActivities =
    HISTORY_ACTIVITIES[caseId] ?? HISTORY_ACTIVITIES.default;
  const activities = [...extraActivities, ...baseActivities];

  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* ── Status bar ── */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1 bg-white border-b border-gray-100 flex-shrink-0">
        <span className="text-[11px] font-semibold text-gray-700">9:41</span>
        <svg
          className="w-4 h-3"
          viewBox="0 0 16 12"
          fill="none"
          aria-label="Battery"
          role="img"
        >
          <path
            d="M1 5.5C1 3.567 2.567 2 4.5 2h7C13.433 2 15 3.567 15 5.5v1c0 1.933-1.567 3.5-3.5 3.5h-7C2.567 10 1 8.433 1 6.5v-1z"
            fill="#374151"
          />
          <path
            d="M15.5 4.5v3c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5z"
            fill="#374151"
          />
        </svg>
      </div>

      {/* ── Header row ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-black/10 border-b border-black/10 flex-shrink-0">
        <div className="flex items-center">
          <span className="text-base font-extrabold text-[#0E2347] tracking-tight">
            Debt Card
          </span>
          <span className="text-gray-300 mx-2 font-light">|</span>
          <span className="text-sm font-medium text-gray-500">
            {debtorName}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close Debt Card"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-3 py-3">
        {/* Section header */}
        <div className="flex items-center justify-between px-3 py-2 bg-gray-50 border border-gray-200 rounded-t-xl">
          <h3 className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
            Activity History
          </h3>
          <span className="text-[10px] text-gray-400 font-medium">
            {activities.length} records
          </span>
        </div>

        {/* Activity cards — height sized to show 5 full cards at once */}
        {/* Each card ~118px + 8px gap; 5 cards = ~598px; container p-2 = +8px = ~606px */}
        <div
          className="space-y-2 p-2 overflow-y-auto bg-white border border-t-0 border-gray-200 rounded-b-xl"
          style={{ height: "620px" }}
        >
          {activities.map((act) => {
            const cardBg =
              OUTCOME_CARD_BG[act.outcome] ?? "bg-gray-50 border-gray-200";
            return (
              <div
                key={act.id}
                className={`rounded-xl border p-3 border-l-4 ${cardBg}`}
              >
                {/* Top row */}
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-gray-700">
                    {act.date}
                    <span className="font-normal text-gray-400 ml-1">
                      {act.time}
                    </span>
                  </span>
                  <div className="flex items-center gap-1 text-[9px] text-gray-400">
                    <Calendar className="w-2.5 h-2.5" />
                    <span>Review: {act.nextReviewDate}</span>
                  </div>
                </div>

                {/* Pills */}
                <div className="flex items-center gap-1.5 mb-2 flex-wrap">
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      ACTION_PILL_COLOR[act.action] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {act.action}
                  </span>
                  <span
                    className={`text-[9px] font-semibold px-2 py-0.5 rounded-full ${
                      OUTCOME_PILL_COLOR[act.outcome] ??
                      "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {act.outcome}
                  </span>
                </div>

                {/* Comment */}
                <p className="text-[11px] text-gray-600 leading-snug mb-2">
                  {act.comment}
                </p>

                {/* Officer */}
                <div className="flex items-center gap-1 text-[9px] text-gray-400">
                  <User className="w-2.5 h-2.5" />
                  <span className="font-medium text-gray-500">
                    {act.officer}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
