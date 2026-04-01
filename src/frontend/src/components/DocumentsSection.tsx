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

interface UploadedDoc {
  id: string;
  name: string;
  fileType: string;
  uploadDate: string;
}

const getDocumentIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type === "image" || type === "jpg" || type === "jpeg" || type === "png") {
    return Image;
  }
  if (type === "pdf" || type === "doc" || type === "docx" || type === "txt") {
    return FileText;
  }
  return File;
};

interface DocumentsSectionProps {
  caseId: string;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export default function DocumentsSection({
  isCollapsed: controlledCollapsed,
  onToggle,
}: DocumentsSectionProps) {
  const [internalCollapsed, setInternalCollapsed] = useState(true);
  const isCollapsed =
    controlledCollapsed !== undefined ? controlledCollapsed : internalCollapsed;
  const handleToggle = onToggle ?? (() => setInternalCollapsed((p) => !p));

  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [uploadedDocs, setUploadedDocs] = useState<UploadedDoc[]>([]);

  const handlePreview = (docId: string) => {
    console.log("Preview document:", docId);
  };

  const handleUploadClick = () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png";
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) setPendingFile(file);
    };
    input.click();
  };

  const handleCancel = () => setPendingFile(null);

  const handleSubmit = () => {
    if (!pendingFile) return;
    const ext = pendingFile.name.split(".").pop()?.toUpperCase() ?? "FILE";
    const newDoc: UploadedDoc = {
      id: Date.now().toString(),
      name: pendingFile.name,
      fileType: ext,
      uploadDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };
    setUploadedDocs((prev) => [newDoc, ...prev]);
    setPendingFile(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <button
        type="button"
        onClick={handleToggle}
        className="w-full flex items-center justify-between px-3 py-2 bg-gray-50 border-b border-gray-200"
        data-ocid="documents.collapse.toggle"
      >
        <h2 className="text-xs font-semibold text-gray-700 tracking-wide uppercase">
          Documents
        </h2>
        {isCollapsed ? (
          <ChevronDown className="w-4 h-4 text-gray-500" />
        ) : (
          <ChevronUp className="w-4 h-4 text-gray-500" />
        )}
      </button>

      {!isCollapsed && (
        <div className="space-y-3 p-3">
          {uploadedDocs.length > 0 ? (
            <div className="space-y-2">
              {uploadedDocs.map((doc) => {
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
            <div className="text-center py-5 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300">
              <FileText className="w-7 h-7 text-gray-400 mx-auto mb-1.5" />
              <p className="text-xs text-gray-500">
                No documents uploaded for this action yet
              </p>
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
                className="flex-1 h-9 text-sm font-medium bg-blue-600 hover:bg-blue-700 text-white transition-colors"
              >
                <CheckCircle className="w-4 h-4 mr-1.5" />
                Submit
              </Button>
            </div>
          ) : (
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
