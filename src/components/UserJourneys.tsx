import React from 'react';
import { Building2, Banknote, Briefcase, ChevronRight } from 'lucide-react';

interface UserJourneysProps {
  onNavigate: (view: string, type?: string) => void;
}

const UserJourneys: React.FC<UserJourneysProps> = ({ onNavigate }) => {
  const userTypes = [
    {
      type: 'supplier',
      icon: Building2,
      title: 'Fournisseurs (PME/PMI)',
      description: 'Accédez rapidement aux financements pour développer votre activité.',
      color: 'bg-green-100 text-green-600 border-green-200',
      journey: [
        'Création de profil entreprise',
        'Intégration outils comptables',
        'Téléversement factures',
        'Validation KYC',
        'Confirmation acheteur',
        'Financement automatique'
      ]
    },

    {
      type: 'buyer',
      icon: Briefcase,
      title: 'Acheteurs',
      description: 'Grandes entreprises et administrations, optimisez vos relations fournisseurs.',
      color: 'bg-purple-100 text-purple-600 border-purple-200',
      journey: [
        'Profil acheteur',
        'Liste fournisseurs',
        'Validation factures',
        'Participation enchères',
        'Suivi financement',
        'Paiement sécurisé'
      ]
    },
    {
      type: 'financier',
      icon: Banknote,
      title: 'Financiers',
      description: 'Investisseurs et institutions, découvrez de nouvelles opportunités.',
      color: 'bg-orange-100 text-orange-600 border-orange-200',
      journey: [
        'Inscription financier',
        'KYC complet',
        'Accès au scoring',
        'Offres de financement',
        'Réponse sous 3 jours',
        'Décaissement sécurisé'
      ]
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Parcours Utilisateurs
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Chaque type d'utilisateur bénéficie d'un parcours optimisé selon ses besoins spécifiques.
          </p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8">
          {userTypes.map((user, index) => (
            <div 
              key={index}
              className={`bg-white border-2 ${user.color} rounded-xl p-6 hover:shadow-lg transition-all duration-300`}
            >
              <div className="flex items-start justify-between mb-6">
                <div className="flex items-center">
                  <div className={`w-12 h-12 ${user.color} rounded-lg flex items-center justify-center mr-4`}>
                    <user.icon size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold text-gray-900">
                      {user.title}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1">
                      {user.description}
                    </p>
                  </div>
                </div>
              </div>
              <div className="space-y-3 mb-6">
                {user.journey.map((step, idx) => (
                  <div key={idx} className="flex items-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs font-medium text-gray-600 mr-3 flex-shrink-0">
                      {idx + 1}
                    </div>
                    <span className="text-gray-700">{step}</span>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <button 
                  onClick={() => onNavigate('register', user.type)}
                  className={`w-full py-3 rounded-lg font-medium hover:opacity-90 transition-all flex items-center justify-center group ${
                    user.type === 'supplier' ? 'bg-green-600' : 
                    user.type === 'buyer' ? 'bg-purple-600' : 
                    'bg-orange-600'
                  } text-white`}
                >
                  Commencer le parcours
                  <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 text-center">
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Processus Transparent et Sécurisé
            </h3>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Toutes les transactions sont sécurisées avec authentification à deux facteurs, chiffrement HTTPS et conformité aux standards bancaires internationaux.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                🔒 Chiffrement SSL
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                🛡️ 2FA obligatoire
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                ✅ KYC vérifié
              </div>
              <div className="bg-gray-100 px-4 py-2 rounded-full text-sm text-gray-700">
                📊 Scoring automatisé
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UserJourneys;