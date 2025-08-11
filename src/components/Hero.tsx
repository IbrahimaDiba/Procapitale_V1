import { ChevronRight, TrendingUp, Shield, Users } from 'lucide-react';

interface HeroProps {
  onNavigate: (view: string) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  return (
    <section className="bg-gradient-to-br from-green-50 to-blue-50 py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 leading-tight">
                Financement
                <span className="text-blue-600"> TPE/PME </span>
                Africaine
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                La première marketplace numérique pour faciliter l'accès au financement 
                des petites et moyennes entreprises africaines.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onNavigate('register')}
                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all flex items-center justify-center group"
              >
                Commencer maintenant
                <ChevronRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </button>
              <button className="border border-gray-300 text-gray-700 px-8 py-4 rounded-lg hover:bg-gray-50 transition-all">
                Découvrir nos services
              </button>
            </div>

            <div className="grid grid-cols-3 gap-8 pt-8">
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">500M+</div>
                <div className="text-sm text-gray-600">FCFA financés</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Users className="h-8 w-8 text-blue-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">200+</div>
                <div className="text-sm text-gray-600">Entreprises</div>
              </div>
              <div className="text-center">
                <div className="flex justify-center mb-2">
                  <Shield className="h-8 w-8 text-purple-600" />
                </div>
                <div className="text-2xl font-bold text-gray-900">100%</div>
                <div className="text-sm text-gray-600">Sécurisé</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-gray-500">Financement en cours</div>
                  <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm">Actif</div>
                </div>
                <div className="space-y-2">
                  <div className="text-2xl font-bold text-gray-900">15,000,000 FCFA</div>
                  <div className="text-sm text-gray-600">Facture #INV-2024-001</div>
                </div>
                <div className="bg-gray-100 rounded-lg h-2">
                  <div className="bg-blue-600 h-2 rounded-lg" style={{ width: '75%' }}></div>
                </div>
                <div className="text-sm text-gray-600">75% financé • 7 jours restants</div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-blue-600 text-white p-4 rounded-xl shadow-lg">
              <div className="text-sm font-medium">Taux d'approbation</div>
              <div className="text-2xl font-bold">96%</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;