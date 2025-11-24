import { useState } from "react";
import { Page, Navbar, Block, Button, Card } from "konsta/react";
import { useNavigate } from "react-router-dom";
import { FileText, Upload, Eye, Trash2, Download } from "lucide-react";

interface Document {
  id: string;
  name: string;
  type: string;
  date: string;
  size?: string;
}

const DocumentsPage = () => {
  const navigate = useNavigate();
  const [documents] = useState<Document[]>([
    {
      id: "1",
      name: "Blood Test Report",
      type: "Lab Report",
      date: "2024-01-15",
      size: "2.5 MB"
    },
    {
      id: "2",
      name: "Prescription - Dr. Ahmed",
      type: "Prescription",
      date: "2024-01-10",
      size: "1.2 MB"
    },
    {
      id: "3",
      name: "X-Ray Chest",
      type: "Imaging",
      date: "2023-12-20",
      size: "4.8 MB"
    },
    {
      id: "4",
      name: "Vaccination Certificate",
      type: "Certificate",
      date: "2023-11-05",
      size: "0.8 MB"
    }
  ]);

  const handleUpload = () => {
    console.log("Upload document - Frontend only");
  };

  const handleView = (doc: Document) => {
    console.log("View document:", doc.name);
  };

  const handleDelete = (id: string) => {
    console.log("Delete document:", id);
  };

  const handleDownload = (doc: Document) => {
    console.log("Download document:", doc.name);
  };

  return (
    <Page>
      <Navbar 
        title="Medical Documents" 
        left={<button onClick={() => navigate(-1)}>Back</button>}
      />
      
      <Block className="mt-4 space-y-4">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold">My Documents</h2>
            <p className="text-sm text-gray-600">Prescriptions, reports, and records</p>
          </div>
          <Button onClick={handleUpload}>
            <Upload className="w-4 h-4 mr-1" />
            Upload
          </Button>
        </div>

        <div className="space-y-3">
          {documents.map((doc) => (
            <Card key={doc.id} className="p-4">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-life-green/10 flex items-center justify-center flex-shrink-0">
                  <FileText className="w-6 h-6 text-life-green" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold truncate">{doc.name}</h3>
                  <div className="flex items-center gap-2 text-sm text-gray-600 mt-1">
                    <span className="px-2 py-0.5 bg-gray-100 rounded text-xs">
                      {doc.type}
                    </span>
                    <span>•</span>
                    <span>{doc.date}</span>
                    {doc.size && (
                      <>
                        <span>•</span>
                        <span>{doc.size}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex gap-2 mt-4">
                <Button
                  small
                  className="flex-1"
                  onClick={() => handleView(doc)}
                >
                  <Eye className="w-4 h-4 mr-1" />
                  View
                </Button>
                <Button
                  small
                  outline
                  className="flex-1"
                  onClick={() => handleDownload(doc)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
                <button
                  onClick={() => handleDelete(doc.id)}
                  className="px-3 text-red-500"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </Card>
          ))}
        </div>

        {documents.length === 0 && (
          <div className="text-center py-12">
            <FileText className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">No documents uploaded yet</p>
            <Button onClick={handleUpload}>
              <Upload className="w-4 h-4 mr-1" />
              Upload Document
            </Button>
          </div>
        )}
      </Block>
    </Page>
  );
};

export default DocumentsPage;
