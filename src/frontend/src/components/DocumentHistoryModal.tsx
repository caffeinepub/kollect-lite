import { Eye, File, FileText, Image, User, X } from "lucide-react";

const HISTORY_DOCUMENTS = [
  {
    id: "d1",
    name: "Contract_Agreement.pdf",
    fileType: "PDF",
    uploadDate: "10 Jan 2024",
    uploadedBy: "Brian Ochieng",
  },
  {
    id: "d2",
    name: "Payment_Receipt_Feb.pdf",
    fileType: "PDF",
    uploadDate: "28 Feb 2026",
    uploadedBy: "Brian Ochieng",
  },
  {
    id: "d3",
    name: "Demand_Letter_Signed.pdf",
    fileType: "PDF",
    uploadDate: "07 Feb 2026",
    uploadedBy: "Brian Ochieng",
  },
  {
    id: "d4",
    name: "ID_Copy_Customer.jpg",
    fileType: "IMAGE",
    uploadDate: "10 Jan 2024",
    uploadedBy: "Brian Ochieng",
  },
  {
    id: "d5",
    name: "Repayment_Plan_Draft.pdf",
    fileType: "PDF",
    uploadDate: "21 Feb 2026",
    uploadedBy: "Brian Ochieng",
  },
  {
    id: "d6",
    name: "Field_Visit_Report.pdf",
    fileType: "PDF",
    uploadDate: "07 Feb 2026",
    uploadedBy: "Brian Ochieng",
  },
];

function getDocIcon(fileType: string) {
  const t = fileType.toLowerCase();
  if (t === "image" || t === "jpg" || t === "png") return Image;
  if (t === "pdf" || t === "doc" || t === "docx") return FileText;
  return File;
}

interface DocumentHistoryModalProps {
  debtorName: string;
  onClose: () => void;
}

export default function DocumentHistoryModal({
  debtorName,
  onClose,
}: DocumentHistoryModalProps) {
  return (
    <div className="h-full flex flex-col bg-gray-50">
      {/* ── Status bar ── */}
      <div className="flex items-center justify-between px-5 pt-2 pb-1 bg-white border-b border-gray-100 flex-shrink-0">
        <span className="text-[11px] font-semibold text-gray-700">9:41</span>
        <svg
          className="w-4 h-3"
          viewBox="0 0 16 12"
          fill="none"
          aria-label="Battery"
          role="img"
        >
          <path
            d="M1 5.5C1 3.567 2.567 2 4.5 2h7C13.433 2 15 3.567 15 5.5v1c0 1.933-1.567 3.5-3.5 3.5h-7C2.567 10 1 8.433 1 6.5v-1z"
            fill="#374151"
          />
          <path
            d="M15.5 4.5v3c.828 0 1.5-.672 1.5-1.5s-.672-1.5-1.5-1.5z"
            fill="#374151"
          />
        </svg>
      </div>

      {/* ── Header row ── */}
      <div className="flex items-center justify-between px-4 py-2.5 bg-white border-t border-black/10 border-b border-black/10 flex-shrink-0">
        <div className="flex items-center">
          <span className="text-base font-extrabold text-[#0E2347] tracking-tight">
            Documents
          </span>
          <span className="text-gray-300 mx-2 font-light">|</span>
          <span className="text-sm font-medium text-gray-500">
            {debtorName}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-7 h-7 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
          aria-label="Close Documents"
        >
          <X className="w-4 h-4 text-gray-600" />
        </button>
      </div>

      {/* ── Scrollable body ── */}
      <div className="flex-1 overflow-y-auto px-4 py-4">
        {/* Section label */}
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xs font-semibold text-gray-500 tracking-wide uppercase">
            Document History
          </h3>
          <span className="text-[10px] text-gray-400 font-medium">
            {HISTORY_DOCUMENTS.length} files
          </span>
        </div>

        {/* Document cards — each fully rounded, spaced, standalone */}
        <div className="flex flex-col gap-3">
          {HISTORY_DOCUMENTS.map((doc) => {
            const IconComp = getDocIcon(doc.fileType);
            return (
              <div
                key={doc.id}
                className="flex items-center gap-3 px-4 py-3.5 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:border-blue-100 transition-all"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-xl border border-blue-100 flex items-center justify-center flex-shrink-0">
                  <IconComp className="w-5 h-5 text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-800 truncate">
                    {doc.name}
                  </p>
                  <div className="flex items-center gap-1.5 text-[9px] text-gray-400 mt-1">
                    <span className="font-semibold text-blue-500">
                      {doc.fileType}
                    </span>
                    <span>·</span>
                    <span>{doc.uploadDate}</span>
                    <span>·</span>
                    <User className="w-2 h-2" />
                    <span>{doc.uploadedBy}</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="w-8 h-8 flex items-center justify-center rounded-xl text-gray-300 hover:text-blue-600 hover:bg-blue-50 transition-all flex-shrink-0"
                  aria-label="Preview"
                >
                  <Eye className="w-4 h-4" />
                </button>
              </div>
            );
          })}
        </div>

        <p className="text-center text-[10px] text-gray-400 mt-5">
          Showing all {HISTORY_DOCUMENTS.length} historical documents
        </p>
      </div>
    </div>
  );
}
