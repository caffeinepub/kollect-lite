import { Upload, FileText, Scan } from 'lucide-react';
import { Button } from './ui/button';

interface DocumentsSectionProps {
  caseId: string;
}

// Dummy documents
const DUMMY_DOCUMENTS = [
  { id: '1', name: 'Contract_Agreement.pdf', fileType: 'PDF', uploadDate: '2024-01-10' },
  { id: '2', name: 'Payment_Receipt.pdf', fileType: 'PDF', uploadDate: '2024-01-15' },
];

export default function DocumentsSection({ caseId }: DocumentsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-2.5">
      <h2 className="text-sm font-semibold text-gray-900 mb-2">Documents</h2>
      
      <div className="space-y-2">
        {DUMMY_DOCUMENTS.length > 0 ? (
          <div className="space-y-1.5">
            {DUMMY_DOCUMENTS.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center gap-2 p-1.5 bg-gray-50 rounded border border-gray-200"
              >
                <FileText className="w-4 h-4 text-gray-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 truncate">
                    {doc.name}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    {doc.fileType} • {doc.uploadDate}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-gray-500 text-center py-3">
            No documents uploaded yet
          </p>
        )}

        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
            <Upload className="w-3 h-3 mr-1" />
            Upload
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-7 text-xs">
            <Scan className="w-3 h-3 mr-1" />
            Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
