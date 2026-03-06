import { useNavigate, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Check,
  ChevronDown,
  Copy,
  Mail,
  MessageSquare,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import { useEffect, useState } from "react";
import { type Case as BaseCase, CaseStatus } from "../backend";
import ActivitySection from "../components/ActivitySection";
import DocumentsSection from "../components/DocumentsSection";
import PhoneMockup from "../components/PhoneMockup";
import { Button } from "../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

// Extend the base Case type to include productName
type Case = BaseCase & { productName?: string };

interface Guarantor {
  memberNo: string;
  name: string;
  guaranteedAmount: number;
  savingsAmount: number;
  shareAvailable: number;
  guarantorStatus: "Attached" | "Cancelled";
}

const DUMMY_GUARANTORS: Record<string, Guarantor[]> = {
  "CASE-002": [
    {
      memberNo: "147",
      name: "Joseph Njoroge",
      guaranteedAmount: 8000,
      savingsAmount: 3500,
      shareAvailable: 2200,
      guarantorStatus: "Attached",
    },
    {
      memberNo: "283",
      name: "Alice Mwangi",
      guaranteedAmount: 5500,
      savingsAmount: 2800,
      shareAvailable: 1600,
      guarantorStatus: "Attached",
    },
    {
      memberNo: "391",
      name: "Kenneth Otieno",
      guaranteedAmount: 3000,
      savingsAmount: 1200,
      shareAvailable: 800,
      guarantorStatus: "Cancelled",
    },
  ],
  "CASE-003": [
    {
      memberNo: "512",
      name: "Rebecca Wanjiku",
      guaranteedAmount: 5000,
      savingsAmount: 2000,
      shareAvailable: 1500,
      guarantorStatus: "Attached",
    },
    {
      memberNo: "634",
      name: "Samuel Kamau",
      guaranteedAmount: 4200,
      savingsAmount: 1800,
      shareAvailable: 1100,
      guarantorStatus: "Attached",
    },
  ],
  "CASE-004": [
    {
      memberNo: "728",
      name: "Hannah Chebet",
      guaranteedAmount: 12000,
      savingsAmount: 5500,
      shareAvailable: 3800,
      guarantorStatus: "Attached",
    },
    {
      memberNo: "845",
      name: "Philip Odhiambo",
      guaranteedAmount: 9000,
      savingsAmount: 4200,
      shareAvailable: 2900,
      guarantorStatus: "Attached",
    },
    {
      memberNo: "963",
      name: "Esther Kariuki",
      guaranteedAmount: 6500,
      savingsAmount: 3100,
      shareAvailable: 2000,
      guarantorStatus: "Cancelled",
    },
  ],
};

// Default guarantors for cases not explicitly listed
const DEFAULT_GUARANTORS: Guarantor[] = [
  {
    memberNo: "217",
    name: "Michael Kimani",
    guaranteedAmount: 7000,
    savingsAmount: 3200,
    shareAvailable: 2100,
    guarantorStatus: "Attached",
  },
  {
    memberNo: "459",
    name: "Priscilla Akinyi",
    guaranteedAmount: 4800,
    savingsAmount: 2100,
    shareAvailable: 1400,
    guarantorStatus: "Attached",
  },
];

// Dummy case data lookup (Michael Johnson / CASE-001 removed)
const DUMMY_CASES_MAP: Record<string, Case> = {
  "CASE-002": {
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
  "CASE-003": {
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
  "CASE-004": {
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
  "CASE-005": {
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
  "CASE-006": {
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
  "CASE-007": {
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
  "CASE-008": {
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
  "CASE-009": {
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
  "CASE-010": {
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
  "CASE-011": {
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
  "CASE-012": {
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
  "CASE-013": {
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
  "CASE-014": {
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
  "CASE-015": {
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
  "CASE-016": {
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
  "CASE-017": {
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
  "CASE-018": {
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
  "CASE-019": {
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
  "CASE-020": {
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
};

export default function CaseDetail() {
  const { caseId } = useParams({ from: "/case/$caseId" });
  const navigate = useNavigate();
  const [copiedCustomerId, setCopiedCustomerId] = useState(false);
  const [selectedMobile, setSelectedMobile] = useState("");
  const [contactPopoverOpen, setContactPopoverOpen] = useState(false);
  const [guarantorPopoverOpen, setGuarantorPopoverOpen] = useState(false);
  const [selectedGuarantorMemberNo, setSelectedGuarantorMemberNo] =
    useState("");
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const caseData = DUMMY_CASES_MAP[caseId];
  const guarantors = DUMMY_GUARANTORS[caseId] || DEFAULT_GUARANTORS;

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
    navigate({ to: "/tasks" });
  };

  const handleCopyCustomerId = async () => {
    try {
      await navigator.clipboard.writeText(caseData.customerId);
      setCopiedCustomerId(true);
      setTimeout(() => setCopiedCustomerId(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const handleSelectContact = (phoneNumber: string) => {
    setSelectedMobile(phoneNumber);
    setContactPopoverOpen(false);
  };

  return (
    <PhoneMockup>
      <div className="p-3">
        {/* Header */}
        <div className="flex items-center justify-between mb-3">
          <button
            type="button"
            onClick={handleBack}
            className="flex items-center gap-1 text-teal-dark hover:text-teal-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span className="text-sm font-medium">Back</span>
          </button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="sm"
                className="h-7 px-2.5 text-xs bg-blue-600 hover:bg-blue-700 text-white font-semibold flex items-center gap-1"
                data-ocid="case_detail.action.dropdown_menu"
              >
                {selectedAction ?? "Action"}
                <ChevronDown className="w-3 h-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-36">
              <DropdownMenuItem
                onClick={() => setSelectedAction("360 View")}
                className="text-xs cursor-pointer"
                data-ocid="case_detail.action.360_view.button"
              >
                360 View
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSelectedAction("Debt Card")}
                className="text-xs cursor-pointer"
                data-ocid="case_detail.action.debt_card.button"
              >
                Debt Card
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {/* Customer Info */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 mb-3">
          {/* Name and Action Buttons Row */}
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-bold text-gray-900">
              {caseData.debtorName}
            </h2>
            <div className="flex items-center gap-1.5">
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <Phone className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <MessageSquare className="w-3.5 h-3.5" />
              </Button>
              <Button variant="outline" size="sm" className="h-7 w-7 p-0">
                <Mail className="w-3.5 h-3.5" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-24">
                Customer ID:
              </span>
              <button
                type="button"
                onClick={handleCopyCustomerId}
                className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-300 rounded hover:bg-gray-100 transition-colors"
              >
                <span className="font-mono text-xs font-semibold text-gray-900">
                  {caseData.customerId}
                </span>
                {copiedCustomerId ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-500" />
                )}
              </button>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-24">
                Mobile:
              </span>
              <div className="flex items-center gap-1">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-blue-50 border border-blue-200 rounded">
                  <Phone className="w-3 h-3 text-blue-600" />
                  <span className="text-xs font-semibold text-blue-900">
                    {selectedMobile}
                  </span>
                </div>
                <Popover
                  open={contactPopoverOpen}
                  onOpenChange={setContactPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0"
                      data-ocid="customer.contact_picker.open_modal_button"
                    >
                      <Users className="w-3.5 h-3.5" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56 p-2 shadow-lg" align="start">
                    <div className="space-y-1.5">
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectContact(caseData.primaryContact)
                        }
                        className={`w-full text-left px-2 py-1.5 rounded-md transition-all ${
                          selectedMobile === caseData.primaryContact
                            ? "bg-teal-50 border border-teal-500"
                            : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] font-semibold text-gray-900">
                            Primary
                          </span>
                          {selectedMobile === caseData.primaryContact && (
                            <Check className="w-3 h-3 text-teal-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-gray-500" />
                          <span className="text-[11px] text-gray-700 font-medium">
                            {caseData.primaryContact}
                          </span>
                        </div>
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          handleSelectContact(caseData.secondaryContact)
                        }
                        className={`w-full text-left px-2 py-1.5 rounded-md transition-all ${
                          selectedMobile === caseData.secondaryContact
                            ? "bg-teal-50 border border-teal-500"
                            : "bg-white border border-gray-200 hover:bg-gray-50 hover:border-gray-300"
                        }`}
                      >
                        <div className="flex items-center justify-between mb-0.5">
                          <span className="text-[11px] font-semibold text-gray-900">
                            Secondary
                          </span>
                          {selectedMobile === caseData.secondaryContact && (
                            <Check className="w-3 h-3 text-teal-600" />
                          )}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="w-2.5 h-2.5 text-gray-500" />
                          <span className="text-[11px] text-gray-700 font-medium">
                            {caseData.secondaryContact}
                          </span>
                        </div>
                      </button>
                    </div>
                  </PopoverContent>
                </Popover>
              </div>
            </div>

            {/* Guarantor Details */}
            <div className="flex items-center gap-2">
              <span className="text-xs font-medium text-gray-500 w-24">
                Guarantor:
              </span>
              <div className="flex items-center gap-1 flex-1">
                <div className="flex items-center gap-1.5 px-2 py-1 bg-gray-50 border border-gray-200 rounded flex-1">
                  <span className="text-xs text-gray-700 font-mono">
                    {selectedGuarantorMemberNo || (
                      <span className="text-gray-400 italic">
                        None selected
                      </span>
                    )}
                  </span>
                </div>
                <Popover
                  open={guarantorPopoverOpen}
                  onOpenChange={setGuarantorPopoverOpen}
                >
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-7 w-7 p-0 border-blue-200 hover:bg-blue-50"
                      data-ocid="customer.guarantor_picker.open_modal_button"
                    >
                      <Shield className="w-3.5 h-3.5 text-blue-600" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-72 p-0 shadow-xl"
                    align="start"
                    side="bottom"
                  >
                    <div className="bg-blue-600 px-3 py-2 rounded-t-md">
                      <p className="text-xs font-semibold text-white">
                        Guarantors
                      </p>
                    </div>
                    <div className="divide-y divide-gray-100">
                      {/* Table header */}
                      <div className="grid grid-cols-5 gap-1 px-2 py-1.5 bg-gray-50">
                        <span className="text-[9px] font-semibold text-gray-500 col-span-1">
                          Member No
                        </span>
                        <span className="text-[9px] font-semibold text-gray-500 col-span-1">
                          Name
                        </span>
                        <span className="text-[9px] font-semibold text-gray-500 text-right">
                          Gtd Amt
                        </span>
                        <span className="text-[9px] font-semibold text-gray-500 text-center">
                          Status
                        </span>
                        <span className="text-[9px] font-semibold text-gray-500 text-center">
                          Select
                        </span>
                      </div>
                      {guarantors.map((g) => (
                        <div
                          key={g.memberNo}
                          className="grid grid-cols-5 gap-1 px-2 py-2 items-center hover:bg-gray-50 transition-colors"
                        >
                          <span className="text-[9px] font-mono text-blue-700 col-span-1 truncate">
                            {g.memberNo}
                          </span>
                          <span className="text-[9px] text-gray-800 font-medium col-span-1 truncate">
                            {g.name}
                          </span>
                          <span className="text-[9px] text-gray-700 text-right">
                            {g.guaranteedAmount.toLocaleString()}
                          </span>
                          <span className="flex justify-center">
                            <span
                              className={`text-[8px] font-semibold px-1.5 py-0.5 rounded-full ${
                                g.guarantorStatus === "Attached"
                                  ? "bg-green-100 text-green-700"
                                  : "bg-gray-200 text-gray-500"
                              }`}
                            >
                              {g.guarantorStatus}
                            </span>
                          </span>
                          <div className="flex justify-center">
                            <button
                              type="button"
                              onClick={() => {
                                setSelectedGuarantorMemberNo(g.memberNo);
                                setGuarantorPopoverOpen(false);
                              }}
                              className={`text-[9px] font-semibold px-2 py-0.5 rounded border transition-all ${
                                selectedGuarantorMemberNo === g.memberNo
                                  ? "bg-blue-600 border-blue-600 text-white"
                                  : "bg-white border-blue-300 text-blue-600 hover:bg-blue-50"
                              }`}
                              data-ocid="guarantor.select.button"
                            >
                              {selectedGuarantorMemberNo === g.memberNo
                                ? "✓"
                                : "Select"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                    <div className="px-3 py-2 bg-gray-50 border-t border-gray-100 rounded-b-md">
                      <p className="text-[9px] text-gray-400">
                        Savings shown in KES · Click Select to populate field
                      </p>
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
              <p className="text-xs font-bold text-red-600">
                KES {caseData.amountDue.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Paid</p>
              <p className="text-xs font-bold text-green-600">
                KES {caseData.paidAmount.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Balance</p>
              <p className="text-xs font-bold text-gray-900">
                KES {caseData.payoffBalance.toLocaleString()}
              </p>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200 grid grid-cols-2 gap-2 text-center">
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Product Type</p>
              <p className="text-xs font-bold text-gray-900">
                {caseData.productType}
              </p>
            </div>
            <div>
              <p className="text-[10px] text-gray-500 mb-0.5">Product Name</p>
              <p className="text-[9px] font-bold text-gray-900 leading-tight">
                {caseData.productName}
              </p>
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
            className="flex-1 h-9 text-sm border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={handleBack}
            data-ocid="case_detail.cancel.button"
          >
            Cancel
          </Button>
          <Button
            className="flex-1 h-9 text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-sm"
            data-ocid="case_detail.submit.button"
          >
            Submit
          </Button>
        </div>
      </div>
    </PhoneMockup>
  );
}
