import { useNavigate } from '@tanstack/react-router';
import { User, Phone } from 'lucide-react';
import StatusBadge from './StatusBadge';
import CopyButton from './CopyButton';
import { Case } from '../backend';

interface CaseCardProps {
  caseData: Case;
}

function getDpdBadgeClasses(dpd: bigint): string {
  const dpdNumber = Number(dpd);
  
  if (dpdNumber <= 30) {
    return 'bg-green-100 text-green-800 border-green-300';
  } else if (dpdNumber <= 60) {
    return 'bg-amber-100 text-amber-800 border-amber-300';
  } else {
    return 'bg-red-100 text-red-800 border-red-300';
  }
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/case/$caseId', params: { caseId: caseData.id } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 hover:shadow-md transition-shadow cursor-pointer"
    >
      <div className="flex items-start gap-2">
        <div className="flex-shrink-0 w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center">
          <User className="w-4 h-4 text-gray-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2 mb-1">
            <h3 className="text-sm font-semibold text-gray-900 truncate">
              {caseData.debtorName}
            </h3>
            <StatusBadge status={caseData.status} />
          </div>
          
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs text-gray-600">
              <span className="font-medium">Customer ID:</span>
              <div className="flex items-center gap-1 px-1.5 py-0.5 border border-gray-300 rounded bg-gray-50">
                <span className="font-mono">{caseData.customerId}</span>
                <CopyButton text={caseData.customerId} />
              </div>
            </div>
            
            <div className="flex items-center gap-1 text-xs text-gray-600">
              <Phone className="w-3 h-3" />
              <span>{caseData.phoneNumber}</span>
            </div>
            
            <div className="flex items-center justify-between gap-2">
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-[10px] font-semibold border ${getDpdBadgeClasses(caseData.dpd)}`}>
                DPD: {caseData.dpd.toString()}
              </span>
              <span className="text-[10px] text-gray-500 font-mono">
                {caseData.contractId}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
