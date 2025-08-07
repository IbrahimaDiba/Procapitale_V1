import { useState } from 'react';
import { User, Building, Mail, Phone, MapPin, Edit, Save, X, Shield, Bell, CreditCard } from 'lucide-react';

interface ProfileProps {
  userType: string | null;
  userData: any;
  onNavigate: (view: string) => void;
}

const Profile: React.FC<ProfileProps> = ({ userType, userData, onNavigate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [activeTab, setActiveTab] = useState('general');
  const [formData, setFormData] = useState({
    name: userData?.name || 'Utilisateur Demo',
    email: userData?.email || 'demo@example.sn',
    phone: '+221 77 123 45 67',
    company: userData?.company || 'Entreprise Demo',
    address: 'Dakar, Sénégal',
    ninea: '123456789',
    rccm: 'SN-DKR-2020-A-1234',
    sector: 'Technologies',
    website: 'www.entreprise-demo.sn',
    description: 'Entreprise spécialisée dans les solutions technologiques innovantes.'
  });

  const [notifications, setNotifications] = useState({
    email: true,
    sms: false,
    push: true,
    marketing: false
  });

  const [security, setSecurity] = useState({
    twoFactor: true,
    loginAlerts: true,
    sessionTimeout: '30'
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof prev]
    }));
  };

  const handleSecurityChange = (key: string, value: any) => {
    setSecurity(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    // Simulate save
    setIsEditing(false);
    alert('Profil mis à jour avec succès !');
  };

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'supplier': return 'Fournisseur (PME/PMI)';
      case 'buyer': return 'Acheteur';
      case 'financier': return 'Financier';
      case 'micro': return 'Micro-entreprise';
      default: return 'Utilisateur';
    }
  };

  const getKYCStatus = () => {
    const status = userData?.kycStatus || 'pending';
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
      approved: { color: 'bg-green-100 text-green-800', text: 'Approuvé' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejeté' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };

  const renderGeneralTab = () => (
    <div className="space-y-6">
      {/* Profile Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mr-6">
            <User className="w-10 h-10 text-green-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{formData.name}</h2>
            <p className="text-gray-600">{getUserTypeLabel()}</p>
            <div className="flex items-center mt-2">
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKYCStatus().color}`}>
                KYC: {getKYCStatus().text}
              </span>
            </div>
          </div>
        </div>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className={`flex items-center px-4 py-2 rounded-lg transition-colors ${
            isEditing 
              ? 'bg-red-600 text-white hover:bg-red-700' 
              : 'bg-green-600 text-white hover:bg-green-700'
          }`}
        >
          {isEditing ? <X className="w-4 h-4 mr-2" /> : <Edit className="w-4 h-4 mr-2" />}
          {isEditing ? 'Annuler' : 'Modifier'}
        </button>
      </div>

      {/* Personal Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations personnelles</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom complet
            </label>
            <div className="flex items-center">
              <User className="w-5 h-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">{formData.name}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>
            <div className="flex items-center">
              <Mail className="w-5 h-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">{formData.email}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <div className="flex items-center">
              <Phone className="w-5 h-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">{formData.phone}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Adresse
            </label>
            <div className="flex items-center">
              <MapPin className="w-5 h-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">{formData.address}</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Company Information */}
      <div className="bg-gray-50 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations entreprise</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
            </label>
            <div className="flex items-center">
              <Building className="w-5 h-5 text-gray-400 mr-3" />
              {isEditing ? (
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleInputChange}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              ) : (
                <span className="text-gray-900">{formData.company}</span>
              )}
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secteur d'activité
            </label>
            {isEditing ? (
              <select
                name="sector"
                value={formData.sector}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="Technologies">Technologies</option>
                <option value="BTP">BTP</option>
                <option value="Commerce">Commerce</option>
                <option value="Services">Services</option>
                <option value="Agriculture">Agriculture</option>
                <option value="Industrie">Industrie</option>
              </select>
            ) : (
              <span className="text-gray-900">{formData.sector}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro NINEA
            </label>
            {isEditing ? (
              <input
                type="text"
                name="ninea"
                value={formData.ninea}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <span className="text-gray-900">{formData.ninea}</span>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Numéro RCCM
            </label>
            {isEditing ? (
              <input
                type="text"
                name="rccm"
                value={formData.rccm}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <span className="text-gray-900">{formData.rccm}</span>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Site web
            </label>
            {isEditing ? (
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <span className="text-blue-600 hover:text-blue-800">
                <a href={`https://${formData.website}`} target="_blank" rel="noopener noreferrer">
                  {formData.website}
                </a>
              </span>
            )}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Description de l'entreprise
            </label>
            {isEditing ? (
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              />
            ) : (
              <span className="text-gray-900">{formData.description}</span>
            )}
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="flex justify-end space-x-4">
          <button
            onClick={() => setIsEditing(false)}
            className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Annuler
          </button>
          <button
            onClick={handleSave}
            className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Sauvegarder
          </button>
        </div>
      )}
    </div>
  );

  const renderNotificationsTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Préférences de notification</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notifications par email</p>
              <p className="text-sm text-gray-600">Recevoir les alertes importantes par email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications.email}
                onChange={() => handleNotificationChange('email')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notifications SMS</p>
              <p className="text-sm text-gray-600">Recevoir les alertes urgentes par SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications.sms}
                onChange={() => handleNotificationChange('sms')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Notifications push</p>
              <p className="text-sm text-gray-600">Recevoir les notifications dans le navigateur</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications.push}
                onChange={() => handleNotificationChange('push')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Communications marketing</p>
              <p className="text-sm text-gray-600">Recevoir les offres et actualités ProCapital</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={notifications.marketing}
                onChange={() => handleNotificationChange('marketing')}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de sécurité</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Authentification à deux facteurs</p>
              <p className="text-sm text-gray-600">Sécurisez votre compte avec un code SMS</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={security.twoFactor}
                onChange={() => handleSecurityChange('twoFactor', !security.twoFactor)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <p className="font-medium text-gray-900">Alertes de connexion</p>
              <p className="text-sm text-gray-600">Être notifié des nouvelles connexions</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={security.loginAlerts}
                onChange={() => handleSecurityChange('loginAlerts', !security.loginAlerts)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
            </label>
          </div>
          
          <div className="p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <p className="font-medium text-gray-900">Délai d'expiration de session</p>
            </div>
            <select
              value={security.sessionTimeout}
              onChange={(e) => handleSecurityChange('sessionTimeout', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
            >
              <option value="15">15 minutes</option>
              <option value="30">30 minutes</option>
              <option value="60">1 heure</option>
              <option value="120">2 heures</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <h4 className="font-semibold text-red-900 mb-2">Zone de danger</h4>
        <p className="text-sm text-red-800 mb-4">
          Ces actions sont irréversibles. Procédez avec prudence.
        </p>
        <div className="space-y-2">
          <button className="w-full bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700 transition-colors">
            Changer le mot de passe
          </button>
          <button className="w-full border border-red-600 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors">
            Désactiver le compte
          </button>
        </div>
      </div>
    </div>
  );

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
          <h1 className="text-3xl font-bold text-gray-900">Mon Profil</h1>
          <p className="text-gray-600 mt-2">
            Gérez vos informations personnelles et paramètres de compte
          </p>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('general')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'general'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                Informations générales
              </button>
              <button
                onClick={() => setActiveTab('notifications')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'notifications'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Bell className="w-4 h-4 mr-2" />
                Notifications
              </button>
              <button
                onClick={() => setActiveTab('security')}
                className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center ${
                  activeTab === 'security'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                <Shield className="w-4 h-4 mr-2" />
                Sécurité
              </button>
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'general' && renderGeneralTab()}
            {activeTab === 'notifications' && renderNotificationsTab()}
            {activeTab === 'security' && renderSecurityTab()}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <button 
            onClick={() => onNavigate('kyc')}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all text-left"
          >
            <Shield className="w-8 h-8 text-green-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Documents KYC</h3>
            <p className="text-sm text-gray-600">Gérer vos documents de vérification</p>
          </button>
          
          <button 
            onClick={() => onNavigate('payments')}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all text-left"
          >
            <CreditCard className="w-8 h-8 text-blue-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Paiements</h3>
            <p className="text-sm text-gray-600">Configurer vos méthodes de paiement</p>
          </button>
          
          <button 
            onClick={() => onNavigate('scoring')}
            className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all text-left"
          >
            <Building className="w-8 h-8 text-purple-600 mb-4" />
            <h3 className="font-semibold text-gray-900 mb-2">Score Crédit</h3>
            <p className="text-sm text-gray-600">Consulter votre évaluation</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;