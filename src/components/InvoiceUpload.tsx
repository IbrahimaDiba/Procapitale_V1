import { useState } from 'react';
import { Upload, FileText, CheckCircle, AlertCircle, X, Eye, Calendar, DollarSign, Download, ZoomIn } from 'lucide-react';

interface InvoiceUploadProps {
  userType: string | null;
  onNavigate: (view: string) => void;
}

const InvoiceUpload: React.FC<InvoiceUploadProps> = ({ userType, onNavigate }) => {
  const [invoices, setInvoices] = useState<any[]>([
    {
      id: 'INV-001',
      fileName: 'Facture_SENELEC_2024_001.pdf',
      amount: 15000000,
      buyer: 'SENELEC',
      dueDate: '2024-02-15',
      status: 'validated',
      uploadDate: '2024-01-15',
      financingRequested: true
    },
    {
      id: 'INV-002',
      fileName: 'Facture_MinSante_2024_002.pdf',
      amount: 8500000,
      buyer: 'Ministère de la Santé',
      dueDate: '2024-02-20',
      status: 'pending',
      uploadDate: '2024-01-16',
      financingRequested: true
    }
  ]);
  
  const [dragActive, setDragActive] = useState(false);
  const [showUploadForm, setShowUploadForm] = useState(false);
  const [showInvoiceViewer, setShowInvoiceViewer] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [formData, setFormData] = useState({
    invoiceNumber: '',
    amount: '',
    buyer: '',
    dueDate: '',
    description: '',
    financingRequested: true
  });

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
      setShowUploadForm(true);
    }
  };

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files);
    setUploadedFiles(fileArray);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Créer la nouvelle facture avec le fichier uploadé
    const newInvoice = {
      id: `INV-${String(invoices.length + 1).padStart(3, '0')}`,
      fileName: uploadedFiles.length > 0 ? uploadedFiles[0].name : `Facture_${formData.buyer.replace(/\s+/g, '_')}_${formData.invoiceNumber}.pdf`,
      amount: parseInt(formData.amount),
      buyer: formData.buyer,
      dueDate: formData.dueDate,
      status: 'pending',
      uploadDate: new Date().toISOString().split('T')[0],
      financingRequested: formData.financingRequested,
      description: formData.description,
      file: uploadedFiles.length > 0 ? uploadedFiles[0] : null
    };
    
    setInvoices(prev => [newInvoice, ...prev]);
    setShowUploadForm(false);
    setUploadedFiles([]);
    setFormData({
      invoiceNumber: '',
      amount: '',
      buyer: '',
      dueDate: '',
      description: '',
      financingRequested: true
    });
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'validated':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <AlertCircle className="w-5 h-5 text-red-600" />;
      case 'financed':
        return <DollarSign className="w-5 h-5 text-blue-600" />;
      default:
        return <FileText className="w-5 h-5 text-yellow-600" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'validated':
        return 'Validée';
      case 'rejected':
        return 'Rejetée';
      case 'financed':
        return 'Financée';
      default:
        return 'En attente';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'validated':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'financed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const calculateDaysUntilDue = (dueDate: string) => {
    const due = new Date(dueDate);
    const today = new Date();
    const diffTime = due.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const handleViewInvoice = (invoice: any) => {
    setSelectedInvoice(invoice);
    setShowInvoiceViewer(true);
  };

  const renderInvoiceContent = (invoice: any) => {
    // Si la facture a un fichier uploadé, on l'affiche
    if (invoice.file) {
      return (
        <div className="space-y-4">
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <h4 className="font-semibold text-blue-900 mb-2">Fichier uploadé</h4>
            <p className="text-blue-800 text-sm">
              <strong>Nom:</strong> {invoice.file.name}<br/>
              <strong>Taille:</strong> {(invoice.file.size / 1024 / 1024).toFixed(2)} MB<br/>
              <strong>Type:</strong> {invoice.file.type}
            </p>
          </div>
          
          {/* Aperçu du fichier selon son type */}
          {invoice.file.type.startsWith('image/') ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Aperçu de l'image</h5>
              <img 
                src={URL.createObjectURL(invoice.file)} 
                alt="Aperçu de la facture"
                className="max-w-full h-auto rounded-lg shadow-sm"
              />
            </div>
          ) : invoice.file.type === 'application/pdf' ? (
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Aperçu PDF</h5>
              <iframe
                src={URL.createObjectURL(invoice.file)}
                className="w-full h-96 border border-gray-300 rounded-lg"
                title="Aperçu PDF"
              />
            </div>
          ) : (
            <div className="border border-gray-200 rounded-lg p-4">
              <h5 className="font-medium text-gray-900 mb-2">Fichier uploadé</h5>
              <p className="text-gray-600">
                Type de fichier non supporté pour l'aperçu. 
                Vous pouvez télécharger le fichier pour le visualiser.
              </p>
            </div>
          )}
        </div>
      );
    }
    
    // Sinon, on affiche le contenu généré
    return (
      <div 
        className="invoice-preview"
        dangerouslySetInnerHTML={{ 
          __html: generateMockInvoiceContent(invoice) 
        }}
      />
    );
  };

  const closeInvoiceViewer = () => {
    setShowInvoiceViewer(false);
    setSelectedInvoice(null);
  };

  const generateMockInvoiceContent = (invoice: any) => {
    return `
      <div style="font-family: Arial, sans-serif; max-width: 800px; margin: 0 auto; padding: 20px; border: 1px solid #ddd;">
        <div style="text-align: center; border-bottom: 2px solid #4ade80; padding-bottom: 20px; margin-bottom: 30px;">
          <h1 style="color: #1f2937; margin: 0;">PROCAPITAL</h1>
          <p style="color: #6b7280; margin: 5px 0;">Marketplace de Financement TPE/PME</p>
        </div>
        
        <div style="display: flex; justify-content: space-between; margin-bottom: 30px;">
          <div>
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">FACTURE</h3>
            <p style="margin: 5px 0;"><strong>Numéro:</strong> ${invoice.id}</p>
            <p style="margin: 5px 0;"><strong>Date:</strong> ${invoice.uploadDate}</p>
            <p style="margin: 5px 0;"><strong>Échéance:</strong> ${invoice.dueDate}</p>
          </div>
          <div style="text-align: right;">
            <h3 style="color: #1f2937; margin: 0 0 10px 0;">MONTANT</h3>
            <p style="font-size: 24px; font-weight: bold; color: #059669; margin: 0;">${formatAmount(invoice.amount)}</p>
          </div>
        </div>
        
        <div style="margin-bottom: 30px;">
          <div style="background: #f3f4f6; padding: 15px; border-radius: 8px;">
            <h4 style="margin: 0 0 10px 0; color: #1f2937;">Détails de la facture</h4>
            <p style="margin: 5px 0;"><strong>Acheteur:</strong> ${invoice.buyer}</p>
            <p style="margin: 5px 0;"><strong>Fournisseur:</strong> ${userType === 'supplier' ? 'Votre entreprise' : 'Entreprise fournisseur'}</p>
            <p style="margin: 5px 0;"><strong>Statut:</strong> <span style="color: ${invoice.status === 'validated' ? '#059669' : invoice.status === 'pending' ? '#d97706' : '#dc2626'}">${getStatusText(invoice.status)}</span></p>
            ${invoice.description ? `<p style="margin: 5px 0;"><strong>Description:</strong> ${invoice.description}</p>` : ''}
          </div>
        </div>
        
        <div style="border-top: 1px solid #e5e7eb; padding-top: 20px; margin-top: 30px;">
          <div style="display: flex; justify-content: space-between; align-items: center;">
            <div>
              <p style="margin: 5px 0; color: #6b7280;">Facture générée par ProCapital</p>
              <p style="margin: 5px 0; color: #6b7280;">ID: ${invoice.id}</p>
            </div>
            <div style="text-align: right;">
              <p style="margin: 5px 0; color: #6b7280;">${invoice.financingRequested ? 'Financement demandé' : 'Financement non demandé'}</p>
            </div>
          </div>
        </div>
      </div>
    `;
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-green-600 hover:text-green-700 mb-4 flex items-center"
          >
            ← Retour au dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Factures</h1>
              <p className="text-gray-600 mt-2">
                Téléversez et gérez vos factures pour accéder au financement
              </p>
            </div>
            <button
              onClick={() => setShowUploadForm(true)}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center"
            >
              <Upload className="w-5 h-5 mr-2" />
              Nouvelle facture
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total factures</p>
                <p className="text-2xl font-bold text-gray-900">{invoices.length}</p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(invoices.reduce((sum, inv) => sum + inv.amount, 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Validées</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.filter(inv => inv.status === 'validated').length}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">En attente</p>
                <p className="text-2xl font-bold text-gray-900">
                  {invoices.filter(inv => inv.status === 'pending').length}
                </p>
              </div>
              <AlertCircle className="w-8 h-8 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Upload Form Modal */}
        {showUploadForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Nouvelle Facture</h2>
                <button
                  onClick={() => setShowUploadForm(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X size={24} />
                </button>
              </div>

              {/* Upload Zone */}
              <div
                className={`border-2 border-dashed rounded-lg p-6 text-center mb-6 transition-colors ${
                  dragActive 
                    ? 'border-green-500 bg-green-50' 
                    : 'border-gray-300 hover:border-gray-400'
                }`}
                onDragEnter={handleDrag}
                onDragLeave={handleDrag}
                onDragOver={handleDrag}
                onDrop={handleDrop}
              >
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Glissez-déposez votre facture ici</p>
                <input
                  type="file"
                  accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                  onChange={(e) => e.target.files && handleFiles(e.target.files)}
                  className="hidden"
                  id="invoice-upload"
                />
                <label
                  htmlFor="invoice-upload"
                  className="bg-gray-100 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-200 transition-colors cursor-pointer inline-block"
                >
                  Sélectionner un fichier
                </label>
              </div>

              {/* Fichiers uploadés */}
              {uploadedFiles.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-3">Fichiers sélectionnés</h4>
                  <div className="space-y-2">
                    {uploadedFiles.map((file, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <FileText className="w-5 h-5 text-green-600" />
                          <div>
                            <p className="font-medium text-gray-900">{file.name}</p>
                            <p className="text-sm text-gray-600">
                              {(file.size / 1024 / 1024).toFixed(2)} MB • {file.type}
                            </p>
                          </div>
                        </div>
                        <button
                          onClick={() => setUploadedFiles(uploadedFiles.filter((_, i) => i !== index))}
                          className="text-red-600 hover:text-red-800"
                        >
                          <X size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Numéro de facture *
                    </label>
                    <input
                      type="text"
                      name="invoiceNumber"
                      value={formData.invoiceNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="FAC-2024-001"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Montant (FCFA) *
                    </label>
                    <input
                      type="number"
                      name="amount"
                      value={formData.amount}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      placeholder="1000000"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Acheteur *
                    </label>
                    <select
                      name="buyer"
                      value={formData.buyer}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    >
                      <option value="">Sélectionner un acheteur</option>
                      <option value="SENELEC">SENELEC</option>
                      <option value="SONATEL">SONATEL</option>
                      <option value="Ministère de la Santé">Ministère de la Santé</option>
                      <option value="Ministère de l'Éducation">Ministère de l'Éducation</option>
                      <option value="Autre">Autre</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Date d'échéance *
                    </label>
                    <input
                      type="date"
                      name="dueDate"
                      value={formData.dueDate}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Description
                  </label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                    placeholder="Description des services/produits facturés"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="financingRequested"
                    checked={formData.financingRequested}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-700">
                    Demander un financement pour cette facture
                  </label>
                </div>

                <div className="flex justify-end space-x-4 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowUploadForm(false)}
                    className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Annuler
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Téléverser la facture
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Invoices List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">Mes Factures</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Facture</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Acheteur</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Montant</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Échéance</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Statut</th>
                  <th className="text-left py-3 px-6 font-medium text-gray-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {invoices.map((invoice, index) => {
                  const daysUntilDue = calculateDaysUntilDue(invoice.dueDate);
                  return (
                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          {getStatusIcon(invoice.status)}
                          <div className="ml-3">
                            <p className="font-medium text-gray-900">{invoice.id}</p>
                            <p className="text-sm text-gray-600">{invoice.fileName}</p>
                            {invoice.file && (
                              <div className="flex items-center mt-1">
                                <FileText className="w-3 h-3 text-green-600 mr-1" />
                                <span className="text-xs text-green-600">Fichier uploadé</span>
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-6 text-gray-900">{invoice.buyer}</td>
                      <td className="py-4 px-6 font-medium text-gray-900">
                        {formatAmount(invoice.amount)}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 text-gray-400 mr-1" />
                          <span className={`text-sm ${
                            daysUntilDue < 0 ? 'text-red-600' : 
                            daysUntilDue < 30 ? 'text-yellow-600' : 'text-gray-600'
                          }`}>
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500">
                          {daysUntilDue < 0 ? `Échue depuis ${Math.abs(daysUntilDue)} jours` :
                           daysUntilDue === 0 ? 'Échue aujourd\'hui' :
                           `${daysUntilDue} jours restants`}
                        </p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                          {getStatusText(invoice.status)}
                        </span>
                        {invoice.financingRequested && (
                          <div className="text-xs text-blue-600 mt-1">Financement demandé</div>
                        )}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button 
                            onClick={() => handleViewInvoice(invoice)}
                            className="text-blue-600 hover:text-blue-800 transition-colors"
                            title="Voir la facture"
                          >
                            <Eye size={16} />
                          </button>
                          <button 
                            className="text-gray-600 hover:text-gray-800 transition-colors"
                            title="Télécharger"
                          >
                            <Download size={16} />
                          </button>
                          {invoice.status === 'validated' && invoice.financingRequested && (
                            <button 
                              onClick={() => onNavigate('auctions')}
                              className="text-green-600 hover:text-green-800 text-xs font-medium"
                            >
                              Voir enchères
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">Processus de validation</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</div>
              <span>Téléversement de la facture</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</div>
              <span>Validation par l'acheteur</span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</div>
              <span>Mise aux enchères pour financement</span>
            </div>
          </div>
        </div>

        {/* Invoice Viewer Modal */}
        {showInvoiceViewer && selectedInvoice && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <FileText className="w-6 h-6 text-green-600" />
                  <div>
                    <h2 className="text-xl font-bold text-gray-900">Visualisation de la facture</h2>
                    <p className="text-sm text-gray-600">{selectedInvoice.fileName}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => {
                      if (selectedInvoice.file) {
                        // Télécharger le vrai fichier
                        const link = document.createElement('a');
                        link.href = URL.createObjectURL(selectedInvoice.file);
                        link.download = selectedInvoice.file.name;
                        link.click();
                      } else {
                        // Télécharger le contenu généré
                        const link = document.createElement('a');
                        link.href = 'data:text/html;charset=utf-8,' + encodeURIComponent(generateMockInvoiceContent(selectedInvoice));
                        link.download = selectedInvoice.fileName;
                        link.click();
                      }
                    }}
                    className="flex items-center space-x-1 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    title="Télécharger la facture"
                  >
                    <Download size={16} />
                    <span>Télécharger</span>
                  </button>
                  <button
                    onClick={closeInvoiceViewer}
                    className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Fermer"
                  >
                    <X size={24} />
                  </button>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-lg font-semibold text-gray-900">Aperçu de la facture</h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(selectedInvoice.status)}`}>
                      {getStatusText(selectedInvoice.status)}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p><strong>Numéro:</strong> {selectedInvoice.id}</p>
                      <p><strong>Acheteur:</strong> {selectedInvoice.buyer}</p>
                      <p><strong>Montant:</strong> {formatAmount(selectedInvoice.amount)}</p>
                    </div>
                    <div>
                      <p><strong>Date d'échéance:</strong> {selectedInvoice.dueDate}</p>
                      <p><strong>Financement:</strong> {selectedInvoice.financingRequested ? 'Demandé' : 'Non demandé'}</p>
                      <p><strong>Jours restants:</strong> {calculateDaysUntilDue(selectedInvoice.dueDate)}</p>
                    </div>
                  </div>
                </div>

                {/* Invoice Preview */}
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-white p-6">
                    {renderInvoiceContent(selectedInvoice)}
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-6 flex justify-end space-x-3">
                  <button
                    onClick={closeInvoiceViewer}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Fermer
                  </button>
                  {selectedInvoice.status === 'validated' && selectedInvoice.financingRequested && (
                    <button
                      onClick={() => {
                        closeInvoiceViewer();
                        onNavigate('auctions');
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Voir les enchères
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default InvoiceUpload;