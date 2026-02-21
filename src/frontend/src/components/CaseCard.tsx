import { useNavigate } from '@tanstack/react-router';
import { Phone } from 'lucide-react';
import { Case } from '../backend';
import StatusBadge from './StatusBadge';
import CopyButton from './CopyButton';

interface CaseCardProps {
  caseData: Case;
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate({ to: '/case/$caseId', params: { caseId: caseData.id } });
  };

  return (
    <div
      onClick={handleClick}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer p-5 border border-gray-200"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">{caseData.debtorName}</h3>
          <StatusBadge status={caseData.status} />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-3">
        <div>
          <p className="text-xs text-gray-500">Contract ID</p>
          <p className="text-sm font-medium text-gray-900">{caseData.contractId}</p>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <div>
          <p className="text-xs text-gray-500">DPD</p>
          <p className="text-sm font-semibold text-red-600">{caseData.dpd.toString()} days</p>
        </div>
        <div className="flex flex-col items-end gap-2">
          <div className="flex items-center gap-2 text-gray-700">
            <Phone className="w-4 h-4" />
            <span className="text-sm">{caseData.phoneNumber}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-50 border border-gray-200 rounded-md">
            <span className="text-sm font-medium text-gray-900">{caseData.customerId}</span>
            <CopyButton text={caseData.customerId} />
          </div>
        </div>
      </div>
    </div>
  );
}
