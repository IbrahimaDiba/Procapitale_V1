import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Download } from 'lucide-react';

interface KYCDocumentsProps {
  userType: string | null;
  userData: any;
  onNavigate: (view: string) => void;
}

const KYCDocuments: React.FC<KYCDocumentsProps> = ({ userType, userData, onNavigate }) => {
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);

  const requiredDocuments = {
    supplier: [
      { id: 'ninea', name: 'Certificat NINEA', required: true, status: 'pending' },
      { id: 'rccm', name: 'Registre de Commerce (RCCM)', required: true, status: 'pending' },
      { id: 'fiscal', name: 'Quitus fiscal', required: true, status: 'pending' },
      { id: 'bank', name: 'RIB bancaire', required: true, status: 'pending' },
      { id: 'id', name: 'Pièce d\'identité du dirigeant', required: true, status: 'pending' },
      { id: 'financial', name: 'États financiers (2 dernières années)', required: true, status: 'pending' },
      { id: 'contracts', name: 'Contrats/Marchés en cours', required: false, status: 'pending' }
    ],
    buyer: [
      { id: 'ninea', name: 'Certificat NINEA', required: true, status: 'pending' },
      { id: 'rccm', name: 'Registre de Commerce (RCCM)', required: true, status: 'pending' },
      { id: 'bank', name: 'RIB bancaire', required: true, status: 'pending' },
      { id: 'id', name: 'Pièce d\'identité du dirigeant', required: true, status: 'pending' },
      { id: 'authorization', name: 'Lettre d\'autorisation', required: true, status: 'pending' }
    ],
    financier: [
      { id: 'license', name: 'Licence d\'établissement financier', required: true, status: 'pending' },
      { id: 'bank', name: 'RIB bancaire', required: true, status: 'pending' },
      { id: 'id', name: 'Pièce d\'identité du dirigeant', required: true, status: 'pending' },
      { id: 'financial', name: 'États financiers certifiés', required: true, status: 'pending' },
      { id: 'capital', name: 'Justificatif de capital', required: true, status: 'pending' }
    ],
    micro: [
      { id: 'ninea', name: 'Certificat NINEA', required: true, status: 'pending' },
      { id: 'bank', name: 'RIB bancaire', required: true, status: 'pending' },
      { id: 'id', name: 'Pièce d\'identité', required: true, status: 'pending' },
      { id: 'activity', name: 'Justificatif d\'activité', required: true, status: 'pending' }
    ]
  };

  const documents = requiredDocuments[userType as keyof typeof requiredDocuments] || requiredDocuments.supplier;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    Array.from(files).forEach(file => {
      const newFile = {
        id: Date.now() + Math.random(),
        name: file.name,
        size: file.size,
        type: file.type,
        status: 'uploaded',
        uploadDate: new Date().toISOString()
      };
      setUploadedFiles(prev => [...prev, newFile]);
    });
  };

  const removeFile = (fileId: number) => {
    setUploadedFiles(prev => prev.filter(file => file.id !== fileId));
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'uploaded':
        return <FileText className="w-5 h-5 text-blue-600" />;
      default:
        return <Upload className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Approuvé';
      case 'rejected':
        return 'Rejeté';
      case 'uploaded':
        return 'Téléversé';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'uploaded':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-green-600 hover:text-green-700 mb-4 flex items-center"
          >
            ← Retour au dashboard
          </button>
          <h1 className="text-3xl font-bold text-gray-900">Documents KYC</h1>
          <p className="text-gray-600 mt-2">
            Téléversez vos documents pour valider votre profil et accéder aux services de financement
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Progression KYC</h3>
            <span className="text-sm text-gray-600">
              {uploadedFiles.length} / {documents.filter(doc => doc.required).length} documents requis
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-green-600 h-2 rounded-full transition-all duration-300"
              style={{ 
                width: `${(uploadedFiles.length / documents.filter(doc => doc.required).length) * 100}%` 
              }}
            ></div>
          </div>
        </div>

        {/* Upload Zone */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Zone de téléversement</h3>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              dragActive 
                ? 'border-green-500 bg-green-50' 
                : 'border-gray-300 hover:border-gray-400'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg font-medium text-gray-900 mb-2">
              Glissez-déposez vos fichiers ici
            </p>
            <p className="text-gray-600 mb-4">
              ou cliquez pour sélectionner des fichiers
            </p>
            <input
              type="file"
              multiple
              accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-green-600 text-white px-6 py-2 rounded-lg hover:bg-green-700 transition-colors cursor-pointer inline-block"
            >
              Sélectionner des fichiers
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Formats acceptés: PDF, JPG, PNG, DOC, DOCX (max 10MB par fichier)
            </p>
          </div>
        </div>

        {/* Documents List */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents requis</h3>
          <div className="space-y-4">
            {documents.map((doc, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  {getStatusIcon(doc.status)}
                  <div className="ml-3">
                    <p className="font-medium text-gray-900">
                      {doc.name}
                      {doc.required && <span className="text-red-500 ml-1">*</span>}
                    </p>
                    <p className="text-sm text-gray-600">
                      {doc.required ? 'Document obligatoire' : 'Document optionnel'}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(doc.status)}`}>
                    {getStatusText(doc.status)}
                  </span>
                  {doc.status === 'approved' && (
                    <button className="text-blue-600 hover:text-blue-800">
                      <Download size={16} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Uploaded Files */}
        {uploadedFiles.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200 mb-8">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Fichiers téléversés</h3>
            <div className="space-y-3">
              {uploadedFiles.map((file) => (
                <div key={file.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center">
                    <FileText className="w-5 h-5 text-blue-600 mr-3" />
                    <div>
                      <p className="font-medium text-gray-900">{file.name}</p>
                      <p className="text-sm text-gray-600">
                        {formatFileSize(file.size)} • Téléversé le {new Date(file.uploadDate).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => removeFile(file.id)}
                    className="text-red-600 hover:text-red-800"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => onNavigate('dashboard')}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Sauvegarder et continuer plus tard
          </button>
          <button
            className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            disabled={uploadedFiles.length === 0}
          >
            Soumettre pour validation
          </button>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">Besoin d'aide ?</h4>
          <p className="text-blue-800 text-sm mb-3">
            Notre équipe est disponible pour vous accompagner dans le processus KYC.
          </p>
          <div className="flex space-x-4">
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              📞 Appeler le support
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              💬 Chat en ligne
            </button>
            <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
              📧 Envoyer un email
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default KYCDocuments;