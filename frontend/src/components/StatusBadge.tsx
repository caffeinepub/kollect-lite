import { CaseStatus } from '../backend';
import { Badge } from './ui/badge';

interface StatusBadgeProps {
  status: CaseStatus;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  // Note: Display labels are mapped for UI purposes while maintaining backend compatibility
  // escalated -> ACTIVE, ptp -> Closed
  const getStatusConfig = () => {
    switch (status) {
      case CaseStatus.escalated:
        return { label: 'ACTIVE', className: 'bg-blue-600 text-white hover:bg-blue-700' };
      case CaseStatus.active:
        return { label: 'ACTIVE', className: 'bg-blue-600 text-white hover:bg-blue-700' };
      case CaseStatus.ptp:
        return { label: 'Closed', className: 'bg-gray-500 text-white hover:bg-gray-600' };
      default:
        return { label: 'UNKNOWN', className: 'bg-gray-400 text-white' };
    }
  };

  const config = getStatusConfig();

  return (
    <Badge className={`${config.className} mt-1 text-xs font-semibold uppercase`}>
      {config.label}
    </Badge>
  );
}
