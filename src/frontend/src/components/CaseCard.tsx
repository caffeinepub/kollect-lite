import { useNavigate } from "@tanstack/react-router";
import { Phone, User } from "lucide-react";
import type { Case as BaseCase } from "../backend";
import CopyButton from "./CopyButton";
import StatusBadge from "./StatusBadge";

type Case = BaseCase & { productName?: string };

interface CaseCardProps {
  caseData: Case;
}

function getDpdBadgeClasses(dpd: bigint): string {
  const dpdNumber = Number(dpd);
  if (dpdNumber <= 30) {
    return "bg-green-100 text-green-800 border-green-300";
  }
  if (dpdNumber <= 60) {
    return "bg-amber-100 text-amber-800 border-amber-300";
  }
  return "bg-red-100 text-red-800 border-red-300";
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: "/case/$caseId", params: { caseId: caseData.id } });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="w-full text-left bg-white rounded-lg shadow-sm border border-gray-200 p-3 hover:shadow-md hover:border-forest-base transition-all cursor-pointer"
    >
      <div className="flex items-start gap-2.5">
        <div className="flex-shrink-0 w-9 h-9 bg-gradient-to-br from-teal-pill to-teal-pill-mid rounded-full flex items-center justify-center border border-teal-pill-border">
          <User className="w-4 h-4 text-forest-dark" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="text-sm font-bold text-gray-900 truncate">
              {caseData.debtorName}
            </h3>
            <StatusBadge status={caseData.status} />
          </div>

          <div className="space-y-2">
            {/* Customer ID */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 min-w-[70px]">
                Customer ID
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-gradient-to-r from-gray-50 to-gray-100 border border-gray-300 rounded-md shadow-sm">
                <span className="font-mono text-xs font-semibold text-gray-900">
                  {caseData.customerId}
                </span>
                <CopyButton text={caseData.customerId} />
              </div>
            </div>

            {/* Phone number */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 min-w-[70px]">
                Mobile
              </span>
              <div className="flex items-center gap-1.5 px-2 py-1 bg-teal-pill border border-teal-pill-border rounded-md">
                <Phone className="w-3 h-3 text-forest-base" />
                <span className="text-xs font-semibold text-forest-dark">
                  {caseData.phoneNumber}
                </span>
              </div>
            </div>

            {/* DPD badge */}
            <div className="flex items-center justify-between gap-2 pt-1">
              <span
                className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold border-2 shadow-sm ${getDpdBadgeClasses(caseData.dpd)}`}
              >
                DPD: {caseData.dpd.toString()}
              </span>
              <span className="text-[10px] text-gray-400 font-mono tracking-tight">
                {caseData.contractId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}
