import { useState, useEffect } from 'react';
import { ChevronRight, Building2, Users, Briefcase, Banknote } from 'lucide-react';

interface RegisterProps {
  onNavigate: (view: string, type?: string) => void;
  userType?: string;
}

const Register: React.FC<RegisterProps> = ({ onNavigate, userType: propUserType }) => {
  const [step, setStep] = useState(1);
  const [userType, setUserType] = useState(propUserType || '');
  
  // If userType is provided via props, skip to form step
  useEffect(() => {
    if (propUserType) {
      setUserType(propUserType);
      setStep(2);
    }
  }, [propUserType]);
  const [formData, setFormData] = useState({
    companyName: '',
    email: '',
    phone: '',
    address: '',
    ninea: '',
    password: '',
    confirmPassword: ''
  });

  const userTypes = [
    {
      type: 'supplier',
      icon: Building2,
      title: 'Fournisseur (PME/PMI)',
      description: 'Entreprises souhaitant accéder à des financements',
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    {
      type: 'micro',
      icon: Users,
      title: 'Micro-entreprise',
      description: 'Petites structures avec accompagnement personnalisé',
      color: 'bg-blue-100 text-blue-600 border-blue-200'
    },
    {
      type: 'buyer',
      icon: Briefcase,
      title: 'Acheteur',
      description: 'Grandes entreprises et administrations',
      color: 'bg-purple-100 text-purple-600 border-purple-200'
    },
    {
      type: 'financier',
      icon: Banknote,
      title: 'Financier',
      description: 'Investisseurs et institutions financières',
      color: 'bg-orange-100 text-orange-600 border-orange-200'
    }
  ];

  const handleUserTypeSelect = (type: string) => {
    setUserType(type);
    setStep(2);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration success
    onNavigate('login');
  };

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Choisissez votre type de compte
        </h2>
        <p className="text-xl text-gray-600">
          Sélectionnez le profil qui correspond le mieux à votre activité
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {userTypes.map((type) => (
          <button
            key={type.type}
            onClick={() => handleUserTypeSelect(type.type)}
            className={`border-2 ${type.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300 text-left group`}
          >
            <div className="flex items-start">
              <div className={`w-12 h-12 ${type.color} rounded-lg flex items-center justify-center mr-4 flex-shrink-0`}>
                <type.icon size={24} />
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {type.description}
                </p>
                <div className="flex items-center text-blue-600 font-medium group-hover:text-blue-700">
                  Choisir ce profil
                  <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );

  const renderStep2 = () => {
    const selectedType = userTypes.find(t => t.type === userType);
    
    return (
      <div className="max-w-md mx-auto">
        <div className="text-center mb-8">
          <div className={`w-16 h-16 ${selectedType?.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
            {selectedType && <selectedType.icon size={32} />}
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Inscription {selectedType?.title}
          </h2>
          <p className="text-gray-600">
            Créez votre compte pour accéder à la plateforme
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">
              Nom de l'entreprise
            </label>
            <input
              id="companyName"
              name="companyName"
              type="text"
              value={formData.companyName}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Nom de votre entreprise"
              required
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
              Adresse email professionnelle
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="contact@entreprise.sn"
              required
            />
          </div>

          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">
              Téléphone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="+221 XX XXX XX XX"
              required
            />
          </div>

          <div>
            <label htmlFor="ninea" className="block text-sm font-medium text-gray-700 mb-2">
              Numéro NINEA
            </label>
            <input
              id="ninea"
              name="ninea"
              type="text"
              value={formData.ninea}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Numéro d'identification NINEA"
              required
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Mot de passe sécurisé"
              required
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-2">
              Confirmer le mot de passe
            </label>
            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              placeholder="Confirmez votre mot de passe"
              required
            />
          </div>

          <div className="flex items-center">
            <input
              id="accept"
              type="checkbox"
                              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              required
            />
            <label htmlFor="accept" className="ml-2 block text-sm text-gray-700">
                              J'accepte les <a href="#" className="text-blue-600 hover:text-blue-500">conditions d'utilisation</a> et la <a href="#" className="text-blue-600 hover:text-blue-500">politique de confidentialité</a>
            </label>
          </div>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Retour
            </button>
            <button
              type="submit"
                              className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group"
            >
              Créer mon compte
              <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>

          <div className="text-center">
            <span className="text-gray-600">Déjà un compte ? </span>
            <button
              type="button"
              onClick={() => onNavigate('login')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {step === 1 ? renderStep1() : renderStep2()}
      </div>
    </div>
  );
};

export default Register;