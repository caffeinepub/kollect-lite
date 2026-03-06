import {
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Eye,
  File,
  FileText,
  Image,
  Scan,
  Upload,
  X,
} from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";

// Dummy documents
const DUMMY_DOCUMENTS = [
  {
    id: "1",
    name: "Contract_Agreement.pdf",
    fileType: "PDF",
    uploadDate: "2024-01-10",
  },
  {
    id: "2",
    name: "Payment_Receipt.pdf",
    fileType: "PDF",
    uploadDate: "2024-01-15",
  },
];

// Helper function to get the appropriate icon based on file type
const getDocumentIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type === "pdf" || type === "doc" || type === "docx" || type === "txt") {
    return FileText;
  }
  if (
    type === "jpg" ||
    type === "jpeg" ||
    type === "png" ||
    type === "gif" ||
    type === "image"
  ) {
    return Image;
  }
  return File;
};

export default function DocumentsSection(_props: { caseId: string }) {
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(true);

  const handlePreview = (docId: string) => {
    console.log("Preview document:", docId);
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        setPendingFile(file);
      }
    };
    input.click();
  };

  const handleCancel = () => {
    setPendingFile(null);
  };

  const handleSubmit = () => {
    // Submit logic will be wired to backend when ready
    setPendingFile(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <button
        type="button"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="w-full flex items-center justify-between mb-0"
        data-ocid="documents.collapse.toggle"
      >
        <h2 className="text-base font-semibold text-gray-900">Documents</h2>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="space-y-3 mt-3">
          {DUMMY_DOCUMENTS.length > 0 ? (
            <div className="space-y-2">
              {DUMMY_DOCUMENTS.map((doc) => {
                const IconComponent = getDocumentIcon(doc.fileType);
                return (
                  <div
                    key={doc.id}
                    className="flex items-start gap-3 p-3 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 hover:border-teal-200 hover:shadow-sm transition-all duration-200"
                  >
                    <div className="flex-shrink-0 w-10 h-10 bg-teal-50 rounded-lg flex items-center justify-center">
                      <IconComponent className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate mb-0.5">
                        {doc.name}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className="font-medium text-teal-600">
                          {doc.fileType}
                        </span>
                        <span className="text-gray-300">•</span>
                        <span>{doc.uploadDate}</span>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={() => handlePreview(doc.id)}
                      className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:text-teal-600 hover:bg-teal-50 transition-all duration-200"
                      aria-label="Preview document"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-6 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FileText className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No documents uploaded yet</p>
            </div>
          )}

          {/* Pending file preview */}
          {pendingFile && (
            <div className="flex items-center gap-3 p-3 bg-teal-50 rounded-lg border border-teal-200">
              <div className="flex-shrink-0 w-9 h-9 bg-teal-100 rounded-lg flex items-center justify-center">
                <FileText className="w-4 h-4 text-teal-600" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-medium text-gray-800 truncate">
                  {pendingFile.name}
                </p>
                <p className="text-[10px] text-teal-600 font-medium">
                  Ready to upload
                </p>
              </div>
            </div>
          )}

          {/* Action buttons */}
          {pendingFile ? (
            /* Cancel + Submit pair when a file is staged */
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleCancel}
                className="flex-1 h-9 text-sm font-medium border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <X className="w-4 h-4 mr-1.5" />
                Cancel
              </Button>
              <Button
                size="sm"
                onClick={handleSubmit}
                className="flex-1 h-9 text-sm font-medium bg-forest-base hover:bg-forest-medium text-white transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Submit
              </Button>
            </div>
          ) : (
            /* Upload + Scan pair when no file is staged */
            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                size="sm"
                onClick={handleUploadClick}
                className="flex-1 h-9 text-sm font-medium hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-colors"
              >
                <Upload className="w-4 h-4 mr-1.5" />
                Upload
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="flex-1 h-9 text-sm font-medium hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-colors"
              >
                <Scan className="w-4 h-4 mr-1.5" />
                Scan
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
