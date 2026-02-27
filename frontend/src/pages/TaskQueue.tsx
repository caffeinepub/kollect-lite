import { useState, useMemo } from 'react';
import { Search } from 'lucide-react';
import CaseCard from '../components/CaseCard';
import PhoneMockup from '../components/PhoneMockup';
import { Case, CaseStatus } from '../backend';

// Dummy data for 19 realistic collection cases (Michael Johnson / CASE-001 removed)
const DUMMY_CASES: Case[] = [
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
  {
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
];

type FilterType = 'workload' | 'priority' | 'notContacted';

export default function TaskQueue() {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('workload');
  
  const cases = DUMMY_CASES;

  // Apply filters based on active filter
  const filteredCases = useMemo(() => {
    let filtered = cases;

    if (activeFilter === 'priority') {
      // Filter cases with DPD >= 90
      filtered = cases.filter((c) => Number(c.dpd) >= 90);
    } else if (activeFilter === 'notContacted') {
      // Filter cases that have not been contacted (status is active)
      filtered = cases.filter((c) => c.status === CaseStatus.active);
    }
    // 'workload' shows all cases

    return filtered;
  }, [cases, activeFilter]);

  const displayedCases = filteredCases.slice(0, 10);

  // Calculate counts for filter buttons
  const workloadCount = cases.length;
  const priorityCount = cases.filter((c) => Number(c.dpd) >= 90).length;
  const notContactedCount = cases.filter((c) => c.status === CaseStatus.active).length;

  return (
    <PhoneMockup>
      <div className="p-3">
        <h1 className="text-base font-bold text-gray-900 mb-2">Individual workload</h1>
        
        {/* Filter buttons */}
        <div className="flex items-center gap-1.5 mb-2">
          <button
            onClick={() => setActiveFilter('workload')}
            className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
              activeFilter === 'workload'
                ? 'border-teal-dark bg-teal-dark text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-teal-dark'
            }`}
          >
            Workload ({workloadCount})
          </button>
          <button
            onClick={() => setActiveFilter('priority')}
            className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
              activeFilter === 'priority'
                ? 'border-teal-dark bg-teal-dark text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-teal-dark'
            }`}
          >
            Priority ({priorityCount})
          </button>
          <button
            onClick={() => setActiveFilter('notContacted')}
            className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
              activeFilter === 'notContacted'
                ? 'border-teal-dark bg-teal-dark text-white'
                : 'border-gray-300 bg-white text-gray-600 hover:border-teal-dark'
            }`}
          >
            Not Contacted ({notContactedCount})
          </button>
        </div>

        {/* Search bar */}
        <div className="relative mb-3">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
          <input
            type="text"
            placeholder="Search cases..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-teal-dark focus:border-teal-dark"
          />
        </div>

        {/* Case list */}
        <div className="space-y-2">
          {displayedCases
            .filter((c) =>
              searchQuery
                ? c.debtorName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  c.customerId.toLowerCase().includes(searchQuery.toLowerCase())
                : true
            )
            .map((caseItem) => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}
        </div>

        {filteredCases.length > 10 && (
          <p className="text-center text-[10px] text-gray-400 mt-2">
            Showing 10 of {filteredCases.length} cases
          </p>
        )}
      </div>
    </PhoneMockup>
  );
}
