import { useState, useRef } from 'react';
import { useAddDocument } from '../hooks/useQueries';
import { Button } from './ui/button';
import { Eye, Upload, ScanLine, FileText } from 'lucide-react';
import { ExternalBlob, Document } from '../backend';

interface DocumentsSectionProps {
  caseId: string;
}

// Dummy documents data for each case
const DUMMY_DOCUMENTS: Record<string, Document[]> = {
  'CASE-001': [
    {
      id: 'DOC-45821-001',
      name: 'Correspondence Letter',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL('https://example.com/doc1.pdf'),
    },
    {
      id: 'DOC-45821-002',
      name: 'ID Copy',
      fileType: 'image/jpeg',
      blobReference: ExternalBlob.fromURL('https://example.com/doc2.jpg'),
    },
  ],
  'CASE-002': [
    {
      id: 'DOC-45822-001',
      name: 'Promise_to_Pay_Letter_2026-01-20.pdf',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL('https://example.com/doc6.pdf'),
    },
    {
      id: 'DOC-45822-002',
      name: 'Account_Statement_December.pdf',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL('https://example.com/doc7.pdf'),
    },
    {
      id: 'DOC-45822-003',
      name: 'Payment_Plan_Agreement.docx',
      fileType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      blobReference: ExternalBlob.fromURL('https://example.com/doc8.docx'),
    },
  ],
  'CASE-003': [
    {
      id: 'DOC-45823-001',
      name: 'Payment_Receipt_1000.00.jpg',
      fileType: 'image/jpeg',
      blobReference: ExternalBlob.fromURL('https://example.com/doc9.jpg'),
    },
    {
      id: 'DOC-45823-002',
      name: 'Promise_to_Pay_2026-02-19.pdf',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL('https://example.com/doc10.pdf'),
    },
  ],
};

// Generate documents for remaining cases
for (let i = 4; i <= 20; i++) {
  const caseId = `CASE-${String(i).padStart(3, '0')}`;
  DUMMY_DOCUMENTS[caseId] = [
    {
      id: `DOC-${i}-001`,
      name: 'Account_Statement.pdf',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL(`https://example.com/doc${i * 3}.pdf`),
    },
    {
      id: `DOC-${i}-002`,
      name: 'Collection_Notice.pdf',
      fileType: 'application/pdf',
      blobReference: ExternalBlob.fromURL(`https://example.com/doc${i * 3 + 1}.pdf`),
    },
  ];
}

export default function DocumentsSection({ caseId }: DocumentsSectionProps) {
  const documents = DUMMY_DOCUMENTS[caseId] || [];
  const { mutate: addDocument, isPending } = useAddDocument();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadProgress, setUploadProgress] = useState<number | null>(null);

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];
    const arrayBuffer = await file.arrayBuffer();
    const uint8Array = new Uint8Array(arrayBuffer);

    const blob = ExternalBlob.fromBytes(uint8Array).withUploadProgress((percentage) => {
      setUploadProgress(percentage);
    });

    addDocument(
      {
        caseId,
        document: {
          id: `doc-${Date.now()}`,
          name: file.name,
          fileType: file.type || 'application/pdf',
          blobReference: blob,
        },
      },
      {
        onSuccess: () => {
          setUploadProgress(null);
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        },
        onError: () => {
          setUploadProgress(null);
        },
      }
    );
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('pdf')) return <FileText className="w-5 h-5 text-red-500" />;
    if (fileType.includes('word') || fileType.includes('document')) return <FileText className="w-5 h-5 text-blue-500" />;
    if (fileType.includes('image') || fileType.includes('jpeg') || fileType.includes('jpg') || fileType.includes('png')) {
      return <FileText className="w-5 h-5 text-green-500" />;
    }
    return <FileText className="w-5 h-5 text-gray-500" />;
  };

  const getFileTypeLabel = (fileType: string) => {
    if (fileType.includes('pdf')) return 'PDF';
    if (fileType.includes('word') || fileType.includes('document')) return 'DOCX';
    if (fileType.includes('jpeg') || fileType.includes('jpg')) return 'JPG';
    if (fileType.includes('png')) return 'PNG';
    return 'FILE';
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
        <FileText className="w-5 h-5" />
        Documents
      </h2>

      {documents && documents.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 mb-3">Existing Documents</h3>
          <div className="space-y-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-3 flex-1">
                  {getFileIcon(doc.fileType)}
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-normal text-gray-900">{doc.name}</p>
                    <p className="text-xs text-gray-500">{getFileTypeLabel(doc.fileType)}</p>
                  </div>
                </div>
                <button
                  onClick={() => window.open(doc.blobReference.getDirectURL(), '_blank')}
                  className="ml-2 shrink-0 text-gray-400 hover:text-gray-600"
                >
                  <Eye className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-2 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Upload Documents</p>
          <input
            ref={fileInputRef}
            type="file"
            onChange={handleFileSelect}
            className="hidden"
            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
          />
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
            disabled={isPending}
            className="w-full gap-2"
          >
            <Upload className="w-4 h-4" />
            {isPending ? `${uploadProgress || 0}%` : 'Choose Files'}
          </Button>
        </div>
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Scan Document</p>
          <Button variant="outline" className="w-full gap-2" disabled>
            <ScanLine className="w-4 h-4" />
            Scan
          </Button>
        </div>
      </div>
    </div>
  );
}
