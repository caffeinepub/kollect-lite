import CaseCard from '../components/CaseCard';
import { Case, CaseStatus } from '../backend';

// Dummy data for 20 realistic collection cases
const DUMMY_CASES: Case[] = [
  {
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
  },
];

export default function TaskQueue() {
  const cases = DUMMY_CASES;
  const totalCases = cases.length;
  const displayedCases = cases.slice(0, 10);

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Task Queue</h1>
        <p className="text-gray-600 mt-1">
          {totalCases} cases assigned (showing {displayedCases.length} of {totalCases})
        </p>
      </div>

      {displayedCases.length === 0 ? (
        <div className="bg-white rounded-lg shadow-sm p-12 text-center">
          <p className="text-gray-500">No cases assigned</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {displayedCases.map((caseItem) => (
            <CaseCard key={caseItem.id} caseData={caseItem} />
          ))}
        </div>
      )}
    </div>
  );
}
