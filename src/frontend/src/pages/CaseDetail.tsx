import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Phone, MessageSquare, Mail } from 'lucide-react';
import { Button } from '../components/ui/button';
import StatusBadge from '../components/StatusBadge';
import ActivitySection from '../components/ActivitySection';
import DocumentsSection from '../components/DocumentsSection';
import CopyButton from '../components/CopyButton';
import PhoneMockup from '../components/PhoneMockup';
import { Case, CaseStatus } from '../backend';

// Dummy case data lookup
const DUMMY_CASES_MAP: Record<string, Case> = {
  'CASE-001': {
    id: 'CASE-001',
    debtorName: 'Michael Johnson',
    status: CaseStatus.escalated,
    contractId: 'CNT-45821',
    customerId: 'CUST-10234',
    dpd: BigInt(185),
    phoneNumber: '254-712-345678',
    amountDue: 12500,
    paidAmount: 2000,
    payoffBalance: 10500,
  },
  'CASE-002': {
    id: 'CASE-002',
    debtorName: 'Sarah Williams',
    status: CaseStatus.active,
    contractId: 'CNT-45822',
    customerId: 'CUST-10235',
    dpd: BigInt(45),
    phoneNumber: '254-723-456789',
    amountDue: 8750,
    paidAmount: 1500,
    payoffBalance: 7250,
  },
  'CASE-003': {
    id: 'CASE-003',
    debtorName: 'David Omondi',
    status: CaseStatus.ptp,
    contractId: 'CNT-45823',
    customerId: 'CUST-10236',
    dpd: BigInt(30),
    phoneNumber: '254-734-567890',
    amountDue: 5600,
    paidAmount: 3000,
    payoffBalance: 2600,
  },
  'CASE-004': {
    id: 'CASE-004',
    debtorName: 'Grace Wanjiku',
    status: CaseStatus.escalated,
    contractId: 'CNT-45824',
    customerId: 'CUST-10237',
    dpd: BigInt(120),
    phoneNumber: '254-745-678901',
    amountDue: 15000,
    paidAmount: 0,
    payoffBalance: 15000,
  },
  'CASE-005': {
    id: 'CASE-005',
    debtorName: 'James Kamau',
    status: CaseStatus.active,
    contractId: 'CNT-45825',
    customerId: 'CUST-10238',
    dpd: BigInt(22),
    phoneNumber: '254-756-789012',
    amountDue: 4200,
    paidAmount: 1000,
    payoffBalance: 3200,
  },
  'CASE-006': {
    id: 'CASE-006',
    debtorName: 'Mary Akinyi',
    status: CaseStatus.ptp,
    contractId: 'CNT-45826',
    customerId: 'CUST-10239',
    dpd: BigInt(18),
    phoneNumber: '254-767-890123',
    amountDue: 6800,
    paidAmount: 2500,
    payoffBalance: 4300,
  },
  'CASE-007': {
    id: 'CASE-007',
    debtorName: 'Peter Mwangi',
    status: CaseStatus.escalated,
    contractId: 'CNT-45827',
    customerId: 'CUST-10240',
    dpd: BigInt(95),
    phoneNumber: '254-778-901234',
    amountDue: 9500,
    paidAmount: 500,
    payoffBalance: 9000,
  },
  'CASE-008': {
    id: 'CASE-008',
    debtorName: 'Lucy Njeri',
    status: CaseStatus.active,
    contractId: 'CNT-45828',
    customerId: 'CUST-10241',
    dpd: BigInt(38),
    phoneNumber: '254-789-012345',
    amountDue: 7300,
    paidAmount: 1800,
    payoffBalance: 5500,
  },
  'CASE-009': {
    id: 'CASE-009',
    debtorName: 'John Otieno',
    status: CaseStatus.ptp,
    contractId: 'CNT-45829',
    customerId: 'CUST-10242',
    dpd: BigInt(12),
    phoneNumber: '254-790-123456',
    amountDue: 3500,
    paidAmount: 1500,
    payoffBalance: 2000,
  },
  'CASE-010': {
    id: 'CASE-010',
    debtorName: 'Elizabeth Mutua',
    status: CaseStatus.active,
    contractId: 'CNT-45830',
    customerId: 'CUST-10243',
    dpd: BigInt(55),
    phoneNumber: '254-701-234567',
    amountDue: 11200,
    paidAmount: 3500,
    payoffBalance: 7700,
  },
  'CASE-011': {
    id: 'CASE-011',
    debtorName: 'Robert Kipchoge',
    status: CaseStatus.escalated,
    contractId: 'CNT-45831',
    customerId: 'CUST-10244',
    dpd: BigInt(150),
    phoneNumber: '254-712-345679',
    amountDue: 13800,
    paidAmount: 1000,
    payoffBalance: 12800,
  },
  'CASE-012': {
    id: 'CASE-012',
    debtorName: 'Catherine Wambui',
    status: CaseStatus.active,
    contractId: 'CNT-45832',
    customerId: 'CUST-10245',
    dpd: BigInt(28),
    phoneNumber: '254-723-456780',
    amountDue: 5900,
    paidAmount: 2200,
    payoffBalance: 3700,
  },
  'CASE-013': {
    id: 'CASE-013',
    debtorName: 'Daniel Kimani',
    status: CaseStatus.ptp,
    contractId: 'CNT-45833',
    customerId: 'CUST-10246',
    dpd: BigInt(8),
    phoneNumber: '254-734-567891',
    amountDue: 4500,
    paidAmount: 2000,
    payoffBalance: 2500,
  },
  'CASE-014': {
    id: 'CASE-014',
    debtorName: 'Ann Chebet',
    status: CaseStatus.escalated,
    contractId: 'CNT-45834',
    customerId: 'CUST-10247',
    dpd: BigInt(110),
    phoneNumber: '254-745-678902',
    amountDue: 10500,
    paidAmount: 0,
    payoffBalance: 10500,
  },
  'CASE-015': {
    id: 'CASE-015',
    debtorName: 'Thomas Odhiambo',
    status: CaseStatus.active,
    contractId: 'CNT-45835',
    customerId: 'CUST-10248',
    dpd: BigInt(42),
    phoneNumber: '254-756-789013',
    amountDue: 8200,
    paidAmount: 2800,
    payoffBalance: 5400,
  },
  'CASE-016': {
    id: 'CASE-016',
    debtorName: 'Jane Nyambura',
    status: CaseStatus.ptp,
    contractId: 'CNT-45836',
    customerId: 'CUST-10249',
    dpd: BigInt(15),
    phoneNumber: '254-767-890124',
    amountDue: 6200,
    paidAmount: 3500,
    payoffBalance: 2700,
  },
  'CASE-017': {
    id: 'CASE-017',
    debtorName: 'Patrick Maina',
    status: CaseStatus.escalated,
    contractId: 'CNT-45837',
    customerId: 'CUST-10250',
    dpd: BigInt(88),
    phoneNumber: '254-778-901235',
    amountDue: 9800,
    paidAmount: 1200,
    payoffBalance: 8600,
  },
  'CASE-018': {
    id: 'CASE-018',
    debtorName: 'Susan Adhiambo',
    status: CaseStatus.active,
    contractId: 'CNT-45838',
    customerId: 'CUST-10251',
    dpd: BigInt(35),
    phoneNumber: '254-789-012346',
    amountDue: 7100,
    paidAmount: 2400,
    payoffBalance: 4700,
  },
  'CASE-019': {
    id: 'CASE-019',
    debtorName: 'Francis Kariuki',
    status: CaseStatus.ptp,
    contractId: 'CNT-45839',
    customerId: 'CUST-10252',
    dpd: BigInt(5),
    phoneNumber: '254-790-123457',
    amountDue: 3200,
    paidAmount: 1800,
    payoffBalance: 1400,
  },
  'CASE-020': {
    id: 'CASE-020',
    debtorName: 'Margaret Wangari',
    status: CaseStatus.active,
    contractId: 'CNT-45840',
    customerId: 'CUST-10253',
    dpd: BigInt(62),
    phoneNumber: '254-701-234568',
    amountDue: 10800,
    paidAmount: 4200,
    payoffBalance: 6600,
  },
};

function getDpdBadgeClasses(dpd: bigint): string {
  const dpdNumber = Number(dpd);
  
  if (dpdNumber <= 30) {
    return 'bg-green-100 text-green-800';
  } else if (dpdNumber <= 60) {
    return 'bg-amber-100 text-amber-800';
  } else {
    return 'bg-red-100 text-red-800';
  }
}

export default function CaseDetail() {
  const { caseId } = useParams({ from: '/case/$caseId' });
  const navigate = useNavigate();
  const caseData = DUMMY_CASES_MAP[caseId];

  if (!caseData) {
    return (
      <PhoneMockup>
        <div className="p-3">
          <button
            onClick={() => navigate({ to: '/' })}
            className="mb-3 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
          >
            <ArrowLeft className="w-3 h-3" />
            Back to Dashboard
          </button>
          <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-red-800">
            <p className="font-medium text-sm">Error loading case</p>
            <p className="text-xs mt-1">Case not found</p>
          </div>
        </div>
      </PhoneMockup>
    );
  }

  const dpdValue = Number(caseData.dpd);

  return (
    <PhoneMockup>
      <div className="p-3 pb-3">
        <button
          onClick={() => navigate({ to: '/' })}
          className="mb-3 flex items-center gap-1 text-xs text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="w-3 h-3" />
          Back to Dashboard
        </button>

        {/* Debtor Info Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 mb-2">
          <div className="flex items-start justify-between mb-2">
            <div>
              <h1 className="text-base font-bold text-gray-900">{caseData.debtorName}</h1>
              <StatusBadge status={caseData.status} />
            </div>
            <div className="flex gap-1">
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <Phone className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <MessageSquare className="w-3 h-3" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <Mail className="w-3 h-3" />
              </Button>
            </div>
          </div>

          <div className="space-y-1.5 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="text-gray-600 font-medium">Customer ID:</span>
              <div className="flex items-center gap-1">
                <span className="font-mono">{caseData.customerId}</span>
                <CopyButton text={caseData.customerId} />
              </div>
            </div>
            
            <div className="flex items-center gap-1.5">
              <span className="text-gray-600 font-medium">Mobile:</span>
              <span>{caseData.phoneNumber}</span>
            </div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 mb-2">
          <div className="grid grid-cols-2 gap-2 mb-2">
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Amount Due</p>
              <p className="text-sm font-semibold text-gray-900">
                KES {caseData.amountDue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Paid Amount</p>
              <p className="text-sm font-semibold text-gray-900">
                KES {caseData.paidAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Payoff Balance</p>
              <p className="text-sm font-semibold text-gray-900">
                KES {caseData.payoffBalance.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-600 mb-0.5">Days Past Due</p>
              <span className={`inline-flex items-center px-1.5 py-0.5 rounded text-xs font-semibold ${getDpdBadgeClasses(caseData.dpd)}`}>
                {dpdValue} days
              </span>
            </div>
          </div>
          
          <div className="pt-2 border-t border-gray-200">
            <p className="text-[10px] text-gray-600 mb-0.5">Contract ID</p>
            <p className="text-xs font-mono text-gray-900">{caseData.contractId}</p>
          </div>
        </div>

        {/* Documents Section */}
        <div className="mb-2">
          <DocumentsSection caseId={caseData.id} />
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5 mb-2">
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => navigate({ to: '/' })}
              className="flex-1 h-8 text-xs"
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                // Submit logic here
                navigate({ to: '/' });
              }}
              className="flex-1 h-8 text-xs bg-teal-dark hover:bg-teal-dark/90"
            >
              Submit
            </Button>
          </div>
        </div>

        {/* Activity Section */}
        <div className="mb-2">
          <ActivitySection caseId={caseData.id} />
        </div>
      </div>
    </PhoneMockup>
  );
}
