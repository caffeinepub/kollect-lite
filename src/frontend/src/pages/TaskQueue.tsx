import { AlertCircle, Search, UserCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { type Case as BaseCase, CaseStatus } from "../backend";
import CaseCard from "../components/CaseCard";

type Case = BaseCase & { productName?: string };
import PhoneMockup from "../components/PhoneMockup";
import TaskQueueHeader from "../components/TaskQueueHeader";
import TaskQueueTabs, { type TabId } from "../components/TaskQueueTabs";

// Dummy data for 19 realistic collection cases
const DUMMY_CASES: Case[] = [
  {
    id: "CASE-002",
    debtorName: "Sarah Williams",
    status: CaseStatus.active,
    contractId: "AA20264X82B7K9",
    customerId: "102350",
    dpd: BigInt(45),
    phoneNumber: "254-723-456789",
    amountDue: 8750,
    paidAmount: 1500,
    payoffBalance: 7250,
    primaryContact: "254-723-456789",
    secondaryContact: "254-733-222333",
    productType: "Credit Card",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-003",
    debtorName: "David Omondi",
    status: CaseStatus.ptp,
    contractId: "AA20267M31K5R8",
    customerId: "102360",
    dpd: BigInt(30),
    phoneNumber: "254-734-567890",
    amountDue: 5600,
    paidAmount: 3000,
    payoffBalance: 2600,
    primaryContact: "254-734-567890",
    secondaryContact: "254-744-333444",
    productType: "Overdrawn",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-004",
    debtorName: "Grace Wanjiku",
    status: CaseStatus.escalated,
    contractId: "AA20269A64W2N7",
    customerId: "102370",
    dpd: BigInt(120),
    phoneNumber: "254-745-678901",
    amountDue: 15000,
    paidAmount: 0,
    payoffBalance: 15000,
    primaryContact: "254-745-678901",
    secondaryContact: "254-755-444555",
    productType: "Loan",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-005",
    debtorName: "James Kamau",
    status: CaseStatus.active,
    contractId: "AA20262B75H9C3",
    customerId: "102380",
    dpd: BigInt(22),
    phoneNumber: "254-756-789012",
    amountDue: 4200,
    paidAmount: 1000,
    payoffBalance: 3200,
    primaryContact: "254-756-789012",
    secondaryContact: "254-766-555666",
    productType: "Credit Card",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-006",
    debtorName: "Mary Akinyi",
    status: CaseStatus.ptp,
    contractId: "AA20266D48J1F5",
    customerId: "102390",
    dpd: BigInt(18),
    phoneNumber: "254-767-890123",
    amountDue: 6800,
    paidAmount: 2500,
    payoffBalance: 4300,
    primaryContact: "254-767-890123",
    secondaryContact: "254-777-666777",
    productType: "Loan",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-007",
    debtorName: "Peter Mwangi",
    status: CaseStatus.escalated,
    contractId: "AA20268E93L6G4",
    customerId: "102400",
    dpd: BigInt(95),
    phoneNumber: "254-778-901234",
    amountDue: 9500,
    paidAmount: 500,
    payoffBalance: 9000,
    primaryContact: "254-778-901234",
    secondaryContact: "254-788-777888",
    productType: "Overdrawn",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-008",
    debtorName: "Lucy Njeri",
    status: CaseStatus.active,
    contractId: "AA20263F17M8H2",
    customerId: "102410",
    dpd: BigInt(38),
    phoneNumber: "254-789-012345",
    amountDue: 7300,
    paidAmount: 1800,
    payoffBalance: 5500,
    primaryContact: "254-789-012345",
    secondaryContact: "254-799-888999",
    productType: "Loan",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-009",
    debtorName: "John Otieno",
    status: CaseStatus.ptp,
    contractId: "AA20265G62P4J9",
    customerId: "102420",
    dpd: BigInt(12),
    phoneNumber: "254-790-123456",
    amountDue: 3500,
    paidAmount: 1500,
    payoffBalance: 2000,
    primaryContact: "254-790-123456",
    secondaryContact: "254-700-999000",
    productType: "Credit Card",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-010",
    debtorName: "Elizabeth Mutua",
    status: CaseStatus.active,
    contractId: "AA20261H56Q3K7",
    customerId: "102430",
    dpd: BigInt(55),
    phoneNumber: "254-701-234567",
    amountDue: 11200,
    paidAmount: 3500,
    payoffBalance: 7700,
    primaryContact: "254-701-234567",
    secondaryContact: "254-711-000111",
    productType: "Loan",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-011",
    debtorName: "Robert Kipchoge",
    status: CaseStatus.escalated,
    contractId: "AA20264J89R1L5",
    customerId: "102440",
    dpd: BigInt(150),
    phoneNumber: "254-712-345679",
    amountDue: 13800,
    paidAmount: 1000,
    payoffBalance: 12800,
    primaryContact: "254-712-345679",
    secondaryContact: "254-722-111222",
    productType: "Overdrawn",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-012",
    debtorName: "Catherine Wambui",
    status: CaseStatus.active,
    contractId: "AA20267K24S8M3",
    customerId: "102450",
    dpd: BigInt(28),
    phoneNumber: "254-723-456780",
    amountDue: 5900,
    paidAmount: 2200,
    payoffBalance: 3700,
    primaryContact: "254-723-456780",
    secondaryContact: "254-733-222333",
    productType: "Loan",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-013",
    debtorName: "Daniel Kimani",
    status: CaseStatus.ptp,
    contractId: "AA20262L67T5N8",
    customerId: "102460",
    dpd: BigInt(8),
    phoneNumber: "254-734-567891",
    amountDue: 4500,
    paidAmount: 2000,
    payoffBalance: 2500,
    primaryContact: "254-734-567891",
    secondaryContact: "254-744-333444",
    productType: "Credit Card",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-014",
    debtorName: "Ann Chebet",
    status: CaseStatus.escalated,
    contractId: "AA20269M38U2P6",
    customerId: "102470",
    dpd: BigInt(110),
    phoneNumber: "254-745-678902",
    amountDue: 10500,
    paidAmount: 0,
    payoffBalance: 10500,
    primaryContact: "254-745-678902",
    secondaryContact: "254-755-444555",
    productType: "Loan",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-015",
    debtorName: "Thomas Odhiambo",
    status: CaseStatus.active,
    contractId: "AA20266N41V9Q4",
    customerId: "102480",
    dpd: BigInt(42),
    phoneNumber: "254-756-789013",
    amountDue: 8200,
    paidAmount: 2800,
    payoffBalance: 5400,
    primaryContact: "254-756-789013",
    secondaryContact: "254-766-555666",
    productType: "Overdrawn",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-016",
    debtorName: "Jane Nyambura",
    status: CaseStatus.ptp,
    contractId: "AA20263P75W1R7",
    customerId: "102490",
    dpd: BigInt(15),
    phoneNumber: "254-767-890124",
    amountDue: 6200,
    paidAmount: 3500,
    payoffBalance: 2700,
    primaryContact: "254-767-890124",
    secondaryContact: "254-777-666777",
    productType: "Loan",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-017",
    debtorName: "Patrick Maina",
    status: CaseStatus.escalated,
    contractId: "AA20268Q12X4S9",
    customerId: "102500",
    dpd: BigInt(88),
    phoneNumber: "254-778-901235",
    amountDue: 9800,
    paidAmount: 1200,
    payoffBalance: 8600,
    primaryContact: "254-778-901235",
    secondaryContact: "254-788-777888",
    productType: "Credit Card",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
  {
    id: "CASE-018",
    debtorName: "Susan Adhiambo",
    status: CaseStatus.active,
    contractId: "AA20265R46Y7T1",
    customerId: "102510",
    dpd: BigInt(35),
    phoneNumber: "254-789-012346",
    amountDue: 7100,
    paidAmount: 2400,
    payoffBalance: 4700,
    primaryContact: "254-789-012346",
    secondaryContact: "254-799-888999",
    productType: "Loan",
    productName: "ASSET.FIN.CORPORATE",
  },
  {
    id: "CASE-019",
    debtorName: "Francis Kariuki",
    status: CaseStatus.ptp,
    contractId: "AA20261S87Z2U6",
    customerId: "102520",
    dpd: BigInt(5),
    phoneNumber: "254-790-123457",
    amountDue: 3200,
    paidAmount: 1800,
    payoffBalance: 1400,
    primaryContact: "254-790-123457",
    secondaryContact: "254-700-999000",
    productType: "Overdrawn",
    productName: "ASSET.FINC.INDIVIDUAL",
  },
  {
    id: "CASE-020",
    debtorName: "Margaret Wangari",
    status: CaseStatus.active,
    contractId: "AA20264T93A8V5",
    customerId: "102530",
    dpd: BigInt(62),
    phoneNumber: "254-701-234568",
    amountDue: 10800,
    paidAmount: 4200,
    payoffBalance: 6600,
    primaryContact: "254-701-234568",
    secondaryContact: "254-711-000111",
    productType: "Loan",
    productName: "AF.HPR.COM.VEHCL.KBRR",
  },
];

type FilterType = "workload" | "priority" | "notContacted";

export default function TaskQueue() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("workload");
  const [activeTab, setActiveTab] = useState<TabId>("queue");

  const cases = DUMMY_CASES;

  const filteredCases = useMemo(() => {
    let filtered = cases;
    if (activeFilter === "priority") {
      filtered = cases.filter((c) => Number(c.dpd) >= 90);
    } else if (activeFilter === "notContacted") {
      filtered = cases.filter((c) => c.status === CaseStatus.active);
    }
    return filtered;
  }, [cases, activeFilter]);

  const displayedCases = filteredCases.slice(0, 10);

  const workloadCount = cases.length;
  const priorityCount = cases.filter((c) => Number(c.dpd) >= 90).length;
  const notContactedCount = cases.filter(
    (c) => c.status === CaseStatus.active,
  ).length;

  const bottomNav = (
    <TaskQueueTabs activeTab={activeTab} onTabChange={setActiveTab} />
  );

  return (
    <PhoneMockup bottomNav={bottomNav}>
      {/*
        Sticky top section: brand header + filter chips + search bar.
        Tab bar has been moved to the fixed bottom nav via PhoneMockup's bottomNav prop.
      */}
      <div className="sticky top-0 z-20">
        {/* Brand header */}
        <TaskQueueHeader />

        {/* Filter chips + search bar — only shown when Queue tab is active */}
        {activeTab === "queue" && (
          <div className="bg-gray-50 border-b border-gray-200 px-3 pt-2.5 pb-2 shadow-sm">
            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 mb-2">
              <button
                type="button"
                onClick={() => setActiveFilter("workload")}
                className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
                  activeFilter === "workload"
                    ? "border-forest-base bg-forest-base text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-forest-base"
                }`}
              >
                Workload ({workloadCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("priority")}
                className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
                  activeFilter === "priority"
                    ? "border-forest-base bg-forest-base text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-forest-base"
                }`}
              >
                Priority ({priorityCount})
              </button>
              <button
                type="button"
                onClick={() => setActiveFilter("notContacted")}
                className={`px-2 py-0.5 text-[10px] rounded-full border-2 font-medium transition-colors ${
                  activeFilter === "notContacted"
                    ? "border-forest-base bg-forest-base text-white"
                    : "border-gray-300 bg-white text-gray-600 hover:border-forest-base"
                }`}
              >
                Not Contacted ({notContactedCount})
              </button>
            </div>

            {/* Search bar */}
            <div className="relative">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
              <input
                type="text"
                placeholder="Search cases..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-7 pr-3 py-1.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-forest-base focus:border-forest-base bg-white"
              />
            </div>
          </div>
        )}
      </div>

      {/* Scrollable tab content — flows below the sticky section */}
      {activeTab === "queue" && (
        <div className="p-3 space-y-2">
          {displayedCases
            .filter((c) =>
              searchQuery
                ? c.debtorName
                    .toLowerCase()
                    .includes(searchQuery.toLowerCase()) ||
                  c.customerId.toLowerCase().includes(searchQuery.toLowerCase())
                : true,
            )
            .map((caseItem) => (
              <CaseCard key={caseItem.id} caseData={caseItem} />
            ))}

          {displayedCases.length === 0 && (
            <div className="text-center py-8 text-sm text-gray-500">
              No cases found
            </div>
          )}
        </div>
      )}

      {activeTab === "dispute" && (
        <div className="p-4 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-14 h-14 rounded-full bg-forest-pale border-2 border-teal-pill-border flex items-center justify-center mb-4">
            <AlertCircle className="w-7 h-7 text-forest-base" />
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Dispute Creation
          </h2>
          <p className="text-xs text-gray-500 max-w-[220px]">
            Raise and manage disputes for collection cases. This workflow is
            coming soon.
          </p>
          <div className="mt-4 px-4 py-2 rounded-full bg-teal-pill border border-teal-pill-border text-[10px] font-semibold text-forest-dark tracking-widest uppercase">
            Coming Soon
          </div>
        </div>
      )}

      {activeTab === "profile" && (
        <div className="p-4 flex flex-col items-center justify-center min-h-[300px] text-center">
          <div className="w-14 h-14 rounded-full bg-forest-pale border-2 border-teal-pill-border flex items-center justify-center mb-4">
            <UserCheck className="w-7 h-7 text-forest-base" />
          </div>
          <h2 className="text-base font-bold text-gray-800 mb-1">
            Collector Performance
          </h2>
          <p className="text-xs text-gray-500 max-w-[220px]">
            View your collection metrics, targets, and performance history.
            Coming soon.
          </p>
          <div className="mt-4 px-4 py-2 rounded-full bg-teal-pill border border-teal-pill-border text-[10px] font-semibold text-forest-dark tracking-widest uppercase">
            Coming Soon
          </div>
        </div>
      )}
    </PhoneMockup>
  );
}
