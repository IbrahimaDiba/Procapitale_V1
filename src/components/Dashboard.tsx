import { useState } from 'react';
import { 
  BarChart3, 
  FileText, 
  CreditCard, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertCircle,
  Upload,
  Download,
  Eye,
  Plus
} from 'lucide-react';

interface DashboardProps {
  userType: string | null;
  userData: any;
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ userType, userData, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('overview');

  const getTitle = () => {
    switch (userType) {
      case 'supplier': return 'Dashboard Fournisseur';
      case 'buyer': return 'Dashboard Acheteur';
      case 'financier': return 'Dashboard Financier';
      case 'micro': return 'Dashboard Micro-entreprise';
      default: return 'Dashboard';
    }
  };

  const mockData = {
    supplier: {
      stats: [
        { title: 'Factures en cours', value: '12', icon: FileText, color: 'text-blue-600' },
        { title: 'Montant financé', value: '45M FCFA', icon: CreditCard, color: 'text-blue-600' },
        { title: 'Taux d\'approbation', value: '96%', icon: TrendingUp, color: 'text-purple-600' },
        { title: 'Délai moyen', value: '3 jours', icon: Clock, color: 'text-orange-600' }
      ],
      recentInvoices: [
        { id: 'INV-001', amount: '15,000,000', status: 'financed', buyer: 'SENELEC', date: '2024-01-15' },
        { id: 'INV-002', amount: '8,500,000', status: 'pending', buyer: 'Ministère Santé', date: '2024-01-14' },
        { id: 'INV-003', amount: '12,000,000', status: 'approved', buyer: 'SONATEL', date: '2024-01-13' }
      ]
    },
    buyer: {
      stats: [
        { title: 'Fournisseurs actifs', value: '85', icon: Users, color: 'text-blue-600' },
        { title: 'Factures validées', value: '150', icon: CheckCircle, color: 'text-blue-600' },
        { title: 'En attente validation', value: '12', icon: AlertCircle, color: 'text-orange-600' },
        { title: 'Économies réalisées', value: '2.5M FCFA', icon: TrendingUp, color: 'text-purple-600' }
      ],
      pendingValidations: [
        { supplier: 'Tech Solutions SARL', amount: '5,000,000', invoice: 'INV-104', date: '2024-01-15' },
        { supplier: 'BTP Moderne', amount: '18,000,000', invoice: 'INV-105', date: '2024-01-14' },
        { supplier: 'Services Plus', amount: '3,200,000', invoice: 'INV-106', date: '2024-01-13' }
      ]
    },
    financier: {
      stats: [
        { title: 'Opportunités actives', value: '28', icon: FileText, color: 'text-blue-600' },
        { title: 'Portefeuille investi', value: '250M FCFA', icon: CreditCard, color: 'text-blue-600' },
        { title: 'Rendement moyen', value: '12.5%', icon: TrendingUp, color: 'text-purple-600' },
        { title: 'Offres gagnantes', value: '18', icon: CheckCircle, color: 'text-orange-600' }
      ],
      opportunities: [
        { invoice: 'INV-089', supplier: 'Construction SA', amount: '22,000,000', rate: '11%', duration: '45 jours' },
        { invoice: 'INV-090', supplier: 'Import Export SARL', amount: '15,500,000', rate: '12%', duration: '30 jours' },
        { invoice: 'INV-091', supplier: 'Services Tech', amount: '8,000,000', rate: '10%', duration: '60 jours' }
      ]
    }
  };

  const data = mockData[userType as keyof typeof mockData] || mockData.supplier;

  const getKYCStatus = () => {
    const status = userData?.kycStatus || 'pending';
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-800', text: 'En attente' },
      approved: { color: 'bg-green-100 text-green-800', text: 'Approuvé' },
      rejected: { color: 'bg-red-100 text-red-800', text: 'Rejeté' }
    };
    return statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
  };
  const renderSupplierDashboard = () => (
    <div className="space-y-6">
      {/* KYC Status Alert */}
      {userData?.kycStatus !== 'approved' && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <AlertCircle className="w-5 h-5 text-yellow-600 mr-2" />
              <span className="text-yellow-800">
                Votre dossier KYC est en cours de validation. Complétez votre profil pour accélérer le processus.
              </span>
            </div>
            <button 
              onClick={() => onNavigate('kyc')}
              className="bg-yellow-600 text-white px-4 py-2 rounded-lg hover:bg-yellow-700 transition-colors"
            >
              Compléter KYC
            </button>
          </div>
        </div>
      )}

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onNavigate('invoice-upload')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <Upload className="w-6 h-6 text-gray-400 group-hover:text-green-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600">Téléverser une facture</span>
          </button>
          <button 
            onClick={() => onNavigate('scoring')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <Plus className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600">Voir mon scoring</span>
          </button>
          <button 
            onClick={() => onNavigate('auctions')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mr-2" />
            <span className="text-gray-600 group-hover:text-purple-600">Enchères actives</span>
          </button>
        </div>
      </div>

      {/* Recent Invoices */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factures récentes</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">Facture</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Montant</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Acheteur</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Statut</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {(data as any).recentInvoices?.map((invoice: any, index: number) => (
                <tr key={index} className="border-b border-gray-100">
                  <td className="py-3 px-4 font-medium">{invoice.id}</td>
                  <td className="py-3 px-4">{invoice.amount} FCFA</td>
                  <td className="py-3 px-4">{invoice.buyer}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      invoice.status === 'financed' ? 'bg-green-100 text-green-800' :
                      invoice.status === 'approved' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {invoice.status === 'financed' ? 'Financée' :
                       invoice.status === 'approved' ? 'Approuvée' : 'En attente'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <button className="text-blue-600 hover:text-blue-800">
                      <Eye size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );

  const renderBuyerDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => onNavigate('payments')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600">Gérer les paiements</span>
          </button>
          <button className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group">
            <Users className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mr-2" />
            <span className="text-gray-600 group-hover:text-purple-600">Gérer fournisseurs</span>
          </button>
        </div>
      </div>

      {/* Validations en attente */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Factures à valider</h3>
        <div className="space-y-4">
          {(data as any).pendingValidations?.map((validation: any, index: number) => (
            <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium text-gray-900">{validation.supplier}</p>
                <p className="text-sm text-gray-600">Facture {validation.invoice} • {validation.amount} FCFA</p>
                <p className="text-xs text-gray-500">{validation.date}</p>
              </div>
              <div className="flex space-x-2">
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Valider
                </button>
                <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                  Voir détails
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderFinancierDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {data.stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <stat.icon className={`w-8 h-8 ${stat.color}`} />
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions rapides</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button 
            onClick={() => onNavigate('auctions')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-green-500 hover:bg-green-50 transition-colors group"
          >
            <TrendingUp className="w-6 h-6 text-gray-400 group-hover:text-green-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600">Nouvelles opportunités</span>
          </button>
          <button 
            onClick={() => onNavigate('scoring')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-colors group"
          >
            <BarChart3 className="w-6 h-6 text-gray-400 group-hover:text-blue-500 mr-2" />
            <span className="text-gray-600 group-hover:text-blue-600">Analyse scoring</span>
          </button>
          <button 
            onClick={() => onNavigate('payments')}
            className="flex items-center justify-center p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-colors group"
          >
            <CreditCard className="w-6 h-6 text-gray-400 group-hover:text-purple-500 mr-2" />
            <span className="text-gray-600 group-hover:text-purple-600">Portefeuille</span>
          </button>
        </div>
      </div>

      {/* Opportunités d'investissement */}
      <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Opportunités d'investissement</h3>
        <div className="space-y-4">
          {(data as any).opportunities?.map((opportunity: any, index: number) => (
            <div key={index} className="border border-gray-200 rounded-lg p-4">
              <div className="flex items-center justify-between mb-3">
                <div>
                  <p className="font-medium text-gray-900">{opportunity.supplier}</p>
                  <p className="text-sm text-gray-600">Facture {opportunity.invoice}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-gray-900">{opportunity.amount} FCFA</p>
                  <p className="text-sm text-blue-600">Taux: {opportunity.rate}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Durée: {opportunity.duration}</span>
                <div className="flex space-x-2">
                  <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                    Faire une offre
                  </button>
                  <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
                    Détails
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (userType) {
      case 'buyer':
        return renderBuyerDashboard();
      case 'financier':
        return renderFinancierDashboard();
      default:
        return renderSupplierDashboard();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 flex items-center justify-between">
          <div>
          <h1 className="text-3xl font-bold text-gray-900">{getTitle()}</h1>
          <p className="text-gray-600 mt-2">
              Bienvenue {userData?.name} - Gérez vos financements et suivez vos transactions en temps réel
          </p>
          </div>
          <div className="flex items-center space-x-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getKYCStatus().color}`}>
              KYC: {getKYCStatus().text}
            </span>
          </div>
        </div>

        {renderContent()}
      </div>
    </div>
  );
};

export default Dashboard;