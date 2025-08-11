import { FileText, Repeat, Truck, Clock, Building, ChevronRight } from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: Truck,
      title: 'Supply Chain Financing',
      description: 'Optimisez le financement de votre chaîne d\'approvisionnement.',
      color: 'bg-purple-100 text-purple-600',
      features: ['Financement fournisseurs', 'Optimisation cash-flow', 'Relations renforcées']
    },
    {
      icon: Repeat,
      title: 'Affacturage (Factoring)',
      description: 'Transformez vos factures en liquidités immédiates.',
      color: 'bg-blue-100 text-blue-600',
      features: ['Factoring classique', 'Reverse factoring', 'Sans recours']
    },
    {
      icon: Clock,
      title: 'Financement BFR',
      description: 'Financements courts termes pour votre besoin en fonds de roulement.',
      color: 'bg-orange-100 text-orange-600',
      features: ['Moins de 90 jours', 'Procédure simplifiée', 'Réponse rapide']
    },
    {
      icon: Building,
      title: 'Financement de marchés publics',
      description: 'Financez vos contrats publics rapidement et en toute sécurité.',
      color: 'bg-green-100 text-green-600',
      features: ['Pré-financement', 'Garanties bancaires', 'Suivi en temps réel']
    },
    {
      icon: FileText,
      title: 'Asset-based Financing',
      description: 'Financements garantis par vos actifs et créances.',
      color: 'bg-indigo-100 text-indigo-600',
      features: ['Garanties flexibles', 'Montants élevés', 'Conditions avantageuses']
    }
  ];

  return (
    <section id="services" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Nos Services de Financement
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Une gamme complète de solutions financières adaptées aux besoins 
            spécifiques des TPE/PME africaines.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div 
              key={index}
              className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-all duration-300 group cursor-pointer"
            >
              <div className="mb-4">
                <div className={`w-12 h-12 ${service.color} rounded-lg flex items-center justify-center mb-4`}>
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {service.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {service.description}
                </p>
              </div>

              <div className="space-y-2 mb-6">
                {service.features.map((feature, idx) => (
                  <div key={idx} className="flex items-center text-sm text-gray-600">
                    <div className="w-1.5 h-1.5 bg-green-600 rounded-full mr-2"></div>
                    {feature}
                  </div>
                ))}
              </div>

              <button className="flex items-center text-green-600 font-medium group-hover:text-green-700 transition-colors">
                En savoir plus
                <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-center text-white">
          <h3 className="text-2xl font-bold mb-4">
            Besoin d'un financement personnalisé ?
          </h3>
          <p className="text-lg mb-6 opacity-90">
            Nos experts analysent votre situation et vous proposent la solution la plus adaptée.
          </p>
          <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-medium hover:bg-gray-100 transition-colors">
            Demander un devis
          </button>
        </div>
      </div>
    </section>
  );
};

export default Services;