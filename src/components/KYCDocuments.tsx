import { useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface KYCDocumentsProps {
  userType: string | null;
  userData: any;
  onNavigate: (view: string) => void;
}

const KYCDocuments: React.FC<KYCDocumentsProps> = ({ userType, userData, onNavigate }) => {
  const [formData, setFormData] = useState({
    nom: '',
    prenom: '',
    registre: '',
    ninea: ''
  });
  const [validationStatus, setValidationStatus] = useState('pending');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Validation simple
    if (formData.nom && formData.prenom && formData.registre && formData.ninea) {
      setValidationStatus('validated');
      alert('Informations KYC soumises avec succès!');
    } else {
      alert('Veuillez remplir tous les champs obligatoires.');
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

        {/* KYC Form */}
        <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                  Nom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="nom"
                  name="nom"
                  value={formData.nom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre nom de famille"
                  required
                />
              </div>

              <div>
                <label htmlFor="prenom" className="block text-sm font-medium text-gray-700 mb-2">
                  Prénom <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  id="prenom"
                  name="prenom"
                  value={formData.prenom}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Votre prénom"
                  required
                />
              </div>
            </div>

            <div>
              <label htmlFor="registre" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro de Registre <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="registre"
                name="registre"
                value={formData.registre}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro de registre de commerce"
                required
              />
            </div>

            <div>
              <label htmlFor="ninea" className="block text-sm font-medium text-gray-700 mb-2">
                Numéro NINEA <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                id="ninea"
                name="ninea"
                value={formData.ninea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Numéro d'identification national des entreprises"
                required
              />
            </div>

            {/* Validation Status */}
            {validationStatus === 'validated' && (
              <div className="flex items-center p-4 bg-green-50 border border-green-200 rounded-lg">
                <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
                <div>
                  <p className="font-medium text-green-900">Informations validées</p>
                  <p className="text-sm text-green-700">Vos informations KYC ont été soumises avec succès.</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-between pt-6">
              <button
                type="button"
                onClick={() => onNavigate('dashboard')}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Retour au tableau de bord
              </button>
              <button
                type="submit"
                className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                Valider les informations
              </button>
            </div>
          </form>
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