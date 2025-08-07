import { useState } from 'react';
import { Clock, DollarSign, Users, TrendingUp, Eye, Gavel, AlertCircle, CheckCircle } from 'lucide-react';

interface AuctionsProps {
  userType: string | null;
  onNavigate: (view: string) => void;
}

const Auctions: React.FC<AuctionsProps> = ({ userType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('active');
  const [selectedAuction, setSelectedAuction] = useState<any>(null);
  const [bidAmount, setBidAmount] = useState('');

  // Mock auction data
  const auctions = {
    active: [
      {
        id: 'AUC-001',
        invoice: 'INV-001',
        supplier: 'Tech Solutions SARL',
        buyer: 'SENELEC',
        amount: 15000000,
        duration: 45,
        timeLeft: '2j 14h 30m',
        currentBestRate: 9.5,
        bidsCount: 8,
        status: 'active',
        description: 'Fourniture équipements informatiques',
        supplierRating: 'A+',
        documents: ['Facture', 'Bon de commande', 'Contrat']
      },
      {
        id: 'AUC-002',
        invoice: 'INV-002',
        supplier: 'BTP Moderne',
        buyer: 'Ministère Infrastructure',
        amount: 25000000,
        duration: 60,
        timeLeft: '5j 8h 15m',
        currentBestRate: 10.2,
        bidsCount: 12,
        status: 'active',
        description: 'Travaux de construction route',
        supplierRating: 'A',
        documents: ['Facture', 'Devis', 'Autorisation']
      },
      {
        id: 'AUC-003',
        invoice: 'INV-003',
        supplier: 'Services Plus',
        buyer: 'SONATEL',
        amount: 8500000,
        duration: 30,
        timeLeft: '1j 3h 45m',
        currentBestRate: 8.8,
        bidsCount: 15,
        status: 'active',
        description: 'Services de maintenance',
        supplierRating: 'A-',
        documents: ['Facture', 'Contrat maintenance']
      }
    ],
    won: [
      {
        id: 'AUC-004',
        invoice: 'INV-004',
        supplier: 'Import Export SA',
        buyer: 'Ministère Santé',
        amount: 12000000,
        duration: 45,
        finalRate: 9.2,
        bidsCount: 10,
        status: 'won',
        description: 'Fourniture matériel médical',
        supplierRating: 'A+',
        winDate: '2024-01-10'
      }
    ],
    lost: [
      {
        id: 'AUC-005',
        invoice: 'INV-005',
        supplier: 'Construction Pro',
        buyer: 'Mairie Dakar',
        amount: 18000000,
        duration: 50,
        finalRate: 8.5,
        bidsCount: 18,
        status: 'lost',
        description: 'Aménagement urbain',
        supplierRating: 'A',
        lostDate: '2024-01-08'
      }
    ]
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const calculateROI = (amount: number, rate: number, duration: number) => {
    return ((amount * rate / 100) * (duration / 365)).toFixed(0);
  };

  const handleBidSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate bid submission
    alert(`Offre soumise: ${bidAmount}% pour l'enchère ${selectedAuction.id}`);
    setSelectedAuction(null);
    setBidAmount('');
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'won':
        return 'bg-blue-100 text-blue-800';
      case 'lost':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active':
        return 'En cours';
      case 'won':
        return 'Remportée';
      case 'lost':
        return 'Perdue';
      default:
        return 'Inconnue';
    }
  };

  const getRatingColor = (rating: string) => {
    if (rating.startsWith('A')) return 'text-green-600';
    if (rating.startsWith('B')) return 'text-blue-600';
    return 'text-yellow-600';
  };

  const renderAuctionCard = (auction: any) => (
    <div key={auction.id} className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-all">
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center mb-2">
            <h3 className="text-lg font-semibold text-gray-900">{auction.id}</h3>
            <span className={`ml-2 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(auction.status)}`}>
              {getStatusText(auction.status)}
            </span>
          </div>
          <p className="text-gray-600 text-sm mb-1">{auction.description}</p>
          <div className="flex items-center text-sm text-gray-500">
            <span>{auction.supplier}</span>
            <span className="mx-2">•</span>
            <span className={`font-medium ${getRatingColor(auction.supplierRating)}`}>
              {auction.supplierRating}
            </span>
          </div>
        </div>
        {auction.status === 'active' && auction.timeLeft && (
          <div className="text-right">
            <div className="flex items-center text-orange-600 mb-1">
              <Clock className="w-4 h-4 mr-1" />
              <span className="text-sm font-medium">{auction.timeLeft}</span>
            </div>
            <p className="text-xs text-gray-500">Temps restant</p>
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-xs text-gray-500 mb-1">Montant</p>
          <p className="font-semibold text-gray-900">{formatAmount(auction.amount)}</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">Durée</p>
          <p className="font-semibold text-gray-900">{auction.duration} jours</p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">
            {auction.status === 'active' ? 'Meilleur taux' : 'Taux final'}
          </p>
          <p className="font-semibold text-green-600">
            {auction.currentBestRate || auction.finalRate}%
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-500 mb-1">
            {auction.status === 'active' ? 'Offres' : 'Total offres'}
          </p>
          <div className="flex items-center">
            <Users className="w-4 h-4 text-gray-400 mr-1" />
            <span className="font-semibold text-gray-900">{auction.bidsCount}</span>
          </div>
        </div>
      </div>

      {auction.status === 'active' && (
        <div className="bg-gray-50 rounded-lg p-3 mb-4">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">ROI estimé:</span>
            <span className="font-semibold text-green-600">
              +{calculateROI(auction.amount, auction.currentBestRate, auction.duration)} FCFA
            </span>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center">
        <div className="flex items-center text-sm text-gray-500">
          <span>{auction.buyer}</span>
          <span className="mx-2">•</span>
          <span>{auction.documents.length} documents</span>
        </div>
        <div className="flex space-x-2">
          <button
            onClick={() => setSelectedAuction(auction)}
            className="flex items-center px-3 py-2 text-sm border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Eye className="w-4 h-4 mr-1" />
            Détails
          </button>
          {auction.status === 'active' && userType === 'financier' && (
            <button
              onClick={() => setSelectedAuction(auction)}
              className="flex items-center px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Gavel className="w-4 h-4 mr-1" />
              Enchérir
            </button>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <button
            onClick={() => onNavigate('dashboard')}
            className="text-green-600 hover:text-green-700 mb-4 flex items-center"
          >
            ← Retour au dashboard
          </button>
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {userType === 'financier' ? 'Enchères d\'Investissement' : 'Mes Enchères'}
              </h1>
              <p className="text-gray-600 mt-2">
                {userType === 'financier' 
                  ? 'Découvrez les opportunités d\'investissement et participez aux enchères'
                  : 'Suivez l\'état de vos factures mises aux enchères'
                }
              </p>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Enchères actives</p>
                <p className="text-2xl font-bold text-gray-900">{auctions.active.length}</p>
              </div>
              <Clock className="w-8 h-8 text-green-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Montant total</p>
                <p className="text-2xl font-bold text-gray-900">
                  {formatAmount(auctions.active.reduce((sum, auction) => sum + auction.amount, 0))}
                </p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Taux moyen</p>
                <p className="text-2xl font-bold text-gray-900">
                  {(auctions.active.reduce((sum, auction) => sum + auction.currentBestRate, 0) / auctions.active.length).toFixed(1)}%
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-purple-600" />
            </div>
          </div>
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total offres</p>
                <p className="text-2xl font-bold text-gray-900">
                  {auctions.active.reduce((sum, auction) => sum + auction.bidsCount, 0)}
                </p>
              </div>
              <Users className="w-8 h-8 text-orange-600" />
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('active')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'active'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Enchères actives ({auctions.active.length})
              </button>
              {userType === 'financier' && (
                <>
                  <button
                    onClick={() => setActiveTab('won')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'won'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Remportées ({auctions.won.length})
                  </button>
                  <button
                    onClick={() => setActiveTab('lost')}
                    className={`py-4 px-1 border-b-2 font-medium text-sm ${
                      activeTab === 'lost'
                        ? 'border-green-500 text-green-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Perdues ({auctions.lost.length})
                  </button>
                </>
              )}
            </nav>
          </div>

          <div className="p-6">
            <div className="grid gap-6">
              {auctions[activeTab as keyof typeof auctions].map(renderAuctionCard)}
            </div>
          </div>
        </div>

        {/* Auction Detail Modal */}
        {selectedAuction && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">
                  Détails de l'enchère {selectedAuction.id}
                </h2>
                <button
                  onClick={() => setSelectedAuction(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>

              <div className="grid md:grid-cols-2 gap-8">
                {/* Left Column - Details */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Informations générales</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Fournisseur:</span>
                        <span className="font-medium">{selectedAuction.supplier}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Acheteur:</span>
                        <span className="font-medium">{selectedAuction.buyer}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Montant:</span>
                        <span className="font-medium">{formatAmount(selectedAuction.amount)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Durée:</span>
                        <span className="font-medium">{selectedAuction.duration} jours</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Rating fournisseur:</span>
                        <span className={`font-medium ${getRatingColor(selectedAuction.supplierRating)}`}>
                          {selectedAuction.supplierRating}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Description</h3>
                    <p className="text-gray-600">{selectedAuction.description}</p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Documents</h3>
                    <div className="space-y-2">
                      {selectedAuction.documents.map((doc: string, index: number) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <span className="text-gray-700">{doc}</span>
                          <button className="text-blue-600 hover:text-blue-800 text-sm">
                            Télécharger
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Right Column - Bidding */}
                <div className="space-y-6">
                  {selectedAuction.status === 'active' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <Clock className="w-5 h-5 text-green-600 mr-2" />
                        <span className="font-semibold text-green-900">Temps restant</span>
                      </div>
                      <p className="text-2xl font-bold text-green-600">{selectedAuction.timeLeft}</p>
                    </div>
                  )}

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">Statistiques des enchères</h3>
                    <div className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Nombre d'offres:</span>
                        <span className="font-medium">{selectedAuction.bidsCount}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Meilleur taux actuel:</span>
                        <span className="font-medium text-green-600">
                          {selectedAuction.currentBestRate || selectedAuction.finalRate}%
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">ROI estimé:</span>
                        <span className="font-medium text-green-600">
                          +{calculateROI(
                            selectedAuction.amount, 
                            selectedAuction.currentBestRate || selectedAuction.finalRate, 
                            selectedAuction.duration
                          )} FCFA
                        </span>
                      </div>
                    </div>
                  </div>

                  {selectedAuction.status === 'active' && userType === 'financier' && (
                    <form onSubmit={handleBidSubmit} className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Votre offre de taux (%)
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          min="0"
                          max="20"
                          value={bidAmount}
                          onChange={(e) => setBidAmount(e.target.value)}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                          placeholder="Ex: 9.5"
                          required
                        />
                        <p className="text-xs text-gray-500 mt-1">
                          Taux actuel à battre: {selectedAuction.currentBestRate}%
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="w-full bg-green-600 text-white py-3 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                      >
                        <Gavel className="w-5 h-5 mr-2" />
                        Soumettre l'offre
                      </button>
                    </form>
                  )}

                  {selectedAuction.status === 'won' && (
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
                        <span className="font-semibold text-blue-900">Enchère remportée</span>
                      </div>
                      <p className="text-blue-800">
                        Félicitations ! Vous avez remporté cette enchère avec un taux de {selectedAuction.finalRate}%
                      </p>
                    </div>
                  )}

                  {selectedAuction.status === 'lost' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <div className="flex items-center mb-2">
                        <AlertCircle className="w-5 h-5 text-red-600 mr-2" />
                        <span className="font-semibold text-red-900">Enchère perdue</span>
                      </div>
                      <p className="text-red-800">
                        Cette enchère a été remportée par un autre financier au taux de {selectedAuction.finalRate}%
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Help Section */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">
            {userType === 'financier' ? 'Comment participer aux enchères ?' : 'Comment fonctionnent les enchères ?'}
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">1</div>
              <span>
                {userType === 'financier' 
                  ? 'Analysez les opportunités disponibles'
                  : 'Votre facture validée est mise aux enchères'
                }
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">2</div>
              <span>
                {userType === 'financier'
                  ? 'Soumettez votre offre de taux'
                  : 'Les financiers soumettent leurs offres'
                }
              </span>
            </div>
            <div className="flex items-center">
              <div className="w-6 h-6 bg-blue-200 rounded-full flex items-center justify-center text-xs font-bold mr-2">3</div>
              <span>
                {userType === 'financier'
                  ? 'Le meilleur taux remporte l\'enchère'
                  : 'Le meilleur taux finance votre facture'
                }
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auctions;