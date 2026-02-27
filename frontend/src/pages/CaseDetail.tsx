import { useParams, useNavigate } from '@tanstack/react-router';
import { ArrowLeft, Phone, MessageSquare, Mail, Copy, Check, Users } from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '../components/ui/popover';
import StatusBadge from '../components/StatusBadge';
import ActivitySection from '../components/ActivitySection';
import DocumentsSection from '../components/DocumentsSection';
import PhoneMockup from '../components/PhoneMockup';
import { Case, CaseStatus } from '../backend';
import { useState, useEffect } from 'react';

// Dummy case data lookup (Michael Johnson / CASE-001 removed)
const DUMMY_CASES_MAP: Record<string, Case> = {
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
    primaryContact: '254-723-456789',
    secondaryContact: '254-733-222333',
    productType: 'Credit Card',
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
    primaryContact: '254-734-567890',
    secondaryContact: '254-744-333444',
    productType: 'Overdrawn',
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
    primaryContact: '254-745-678901',
    secondaryContact: '254-755-444555',
    productType: 'Loan',
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
    primaryContact: '254-756-789012',
    secondaryContact: '254-766-555666',
    productType: 'Credit Card',
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
    primaryContact: '254-767-890123',
    secondaryContact: '254-777-666777',
    productType: 'Loan',
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
    primaryContact: '254-778-901234',
    secondaryContact: '254-788-777888',
    productType: 'Overdrawn',
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
    primaryContact: '254-789-012345',
    secondaryContact: '254-799-888999',
    productType: 'Loan',
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
    primaryContact: '254-790-123456',
    secondaryContact: '254-700-999000',
    productType: 'Credit Card',
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
    primaryContact: '254-701-234567',
    secondaryContact: '254-711-000111',
    productType: 'Loan',
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
    primaryContact: '254-712-345679',
    secondaryContact: '254-722-111222',
    productType: 'Overdrawn',
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
    primaryContact: '254-723-456780',
    secondaryContact: '254-733-222333',
    productType: 'Loan',
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
    primaryContact: '254-734-567891',
    secondaryContact: '254-744-333444',
    productType: 'Credit Card',
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
    primaryContact: '254-745-678902',
    secondaryContact: '254-755-444555',
    productType: 'Loan',
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
    primaryContact: '254-756-789013',
    secondaryContact: '254-766-555666',
    productType: 'Overdrawn',
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
    primaryContact: '254-767-890124',
    secondaryContact: '254-777-666777',
    productType: 'Loan',
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
    primaryContact: '254-778-901235',
    secondaryContact: '254-788-777888',
    productType: 'Credit Card',
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
    primaryContact: '254-789-012346',
    secondaryContact: '254-799-888999',
    productType: 'Loan',
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
    primaryContact: '254-790-123457',
    secondaryContact: '254-700-999000',
    productType: 'Overdrawn',
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
    primaryContact: '254-701-234568',
    secondaryContact: '254-711-000111',
    productType: 'Loan',
  },
};

export default function CaseDetail() {
  const { caseId } = useParams({ from: '/case/$caseId' });
  const navigate = useNavigate();
  const [copiedCustomerId, setCopiedCustomerId] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState('');
  const [contactPopoverOpen, setContactPopoverOpen] = useState(false);

  const caseData = DUMMY_CASES_MAP[caseId];

  // Set primary contact as default when case data loads
  useEffect(() => {
    if (caseData) {
      setSelectedMobile(caseData.primaryContact);
    }
  }, [caseData]);

  if (!caseData) {
    return (
      <PhoneMockup>
        <div className="p-4">
          <p className="text-gray-500">Case not found</p>
        </div>
      </PhoneMockup>
    );
  }

  const handleBack = () => {
    navigate({ to: '/' });
  };

  const handleCopyCustomerId = async () => {
    try {
      await navigator.clipboard.writeText(caseData.customerId);
      setCopiedCustomerId(true);
      setTimeout(() => setCopiedCustomerId(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleSelectContact = (phoneNumber: string) => {
    setSelectedMobile(phoneNumber);
    setContactPopoverOpen(false);
  };

  return (
    <PhoneMockup>
      <div className="p-3">
        {/* Header - Status badge uses updated label mappings from StatusBadge component */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={handleBack}
            className="flex items-center gap-1 text-teal-dark hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <StatusBadge status={caseData.status} />
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
          {/* Name and Action Buttons Row */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">{caseData.debtorName}</h2>
            <div className="flex items-center gap-1.5">
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
              >
                <Phone className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
              >
                <MessageSquare className="w-3.5 h-3.5" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-7 w-7 p-0"
              >
                <Mail className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-24">Customer ID:</span>
              <button
                onClick={handleCopyCustomerId}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="font-mono text-xs font-semibold text-gray-900">{caseData.customerId}</span>
                {copiedCustomerId ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-500" />
                )}
              </button>
            </div>
            
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-24">Mobile:</span>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded">
                  <Phone className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-900">{selectedMobile}</span>
                </div>
                <Popover open={contactPopoverOpen} onOpenChange={setContactPopoverOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                    >
                      <Users className="w-3.5 h-3.5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 shadow-lg" align="start">
                    <div className="space-y-1.5">
                      <button
                        onClick={() => handleSelectContact(caseData.primaryContact)}
                        className={`w-full text-left px-2 py-1.5 rounded-md transition-all ${
                          selectedMobile === caseData.primaryContact
                            ? 'bg-teal-50 border border-teal-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] font-semibold text-gray-900">Primary</span>
                          {selectedMobile === caseData.primaryContact && (
                            <Check className="w-3 h-3 text-teal-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-gray-500" />
                          <span className="text-[11px] text-gray-700 font-medium">{caseData.primaryContact}</span>
                        </div>
                      </button>
                      <button
                        onClick={() => handleSelectContact(caseData.secondaryContact)}
                        className={`w-full text-left px-2 py-1.5 rounded-md transition-all ${
                          selectedMobile === caseData.secondaryContact
                            ? 'bg-teal-50 border border-teal-500'
                            : 'bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] font-semibold text-gray-900">Secondary</span>
                          {selectedMobile === caseData.secondaryContact && (
                            <Check className="w-3 h-3 text-teal-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-gray-500" />
                          <span className="text-[11px] text-gray-700 font-medium">{caseData.secondaryContact}</span>
                        </div>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>

        {/* Financial Metrics */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
          <div className="grid grid-cols-3 gap-2 text-center">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Amount Due</p>
              <p className="text-xs font-bold text-gray-900">KES {caseData.amountDue.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Paid</p>
              <p className="text-xs font-bold text-green-600">KES {caseData.paidAmount.toLocaleString()}</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Balance</p>
              <p className="text-xs font-bold text-red-600">KES {caseData.payoffBalance.toLocaleString()}</p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Days Past Due</p>
              <p className="text-sm font-bold text-red-600">{caseData.dpd.toString()} days</p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Product Type</p>
              <p className="text-sm font-bold text-gray-900">{caseData.productType}</p>
            </div>
          </div>
        </div>

        {/* Activity Section */}
        <ActivitySection caseId={caseData.id} />

        {/* Documents Section */}
        <DocumentsSection caseId={caseData.id} />

        {/* Action Buttons */}
        <div className="flex gap-2 mt-3">
          <Button
            variant="outline"
            className="flex-1 h-9 text-sm"
            onClick={handleBack}
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-9 text-sm bg-teal-dark hover:bg-teal-700"
          >
            Save Changes
          </Button>
        </div>
      </div>
    </PhoneMockup>
  );
}
