import { Upload, FileText, Scan, File, Image } from 'lucide-react';
import { Button } from './ui/button';

interface DocumentsSectionProps {
  caseId: string;
}

// Dummy documents
const DUMMY_DOCUMENTS = [
  { id: '1', name: 'Contract_Agreement.pdf', fileType: 'PDF', uploadDate: '2024-01-10' },
  { id: '2', name: 'Payment_Receipt.pdf', fileType: 'PDF', uploadDate: '2024-01-15' },
];

// Helper function to get the appropriate icon based on file type
const getDocumentIcon = (fileType: string) => {
  const type = fileType.toLowerCase();
  if (type === 'pdf' || type === 'doc' || type === 'docx' || type === 'txt') {
    return FileText;
  }
  if (type === 'jpg' || type === 'jpeg' || type === 'png' || type === 'gif' || type === 'image') {
    return Image;
  }
  return File;
};

export default function DocumentsSection({ caseId }: DocumentsSectionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
      <h2 className="text-base font-semibold text-gray-900 mb-3">Documents</h2>
      
      <div className="space-y-3">
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
                      <span className="font-medium text-teal-600">{doc.fileType}</span>
                      <span className="text-gray-300">•</span>
                      <span>{doc.uploadDate}</span>
                    </div>
                  </div>
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

        <div className="flex gap-2 pt-1">
          <Button variant="outline" size="sm" className="flex-1 h-9 text-sm font-medium hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-colors">
            <Upload className="w-4 h-4 mr-1.5" />
            Upload
          </Button>
          <Button variant="outline" size="sm" className="flex-1 h-9 text-sm font-medium hover:bg-teal-50 hover:text-teal-700 hover:border-teal-300 transition-colors">
            <Scan className="w-4 h-4 mr-1.5" />
            Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
