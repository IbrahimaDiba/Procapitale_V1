import { useState } from 'react';
import { CreditCard, ArrowUpRight, ArrowDownLeft, Clock, CheckCircle, AlertCircle, Download, Filter } from 'lucide-react';

interface PaymentsProps {
  userType: string | null;
  onNavigate: (view: string) => void;
}

const Payments: React.FC<PaymentsProps> = ({ userType, onNavigate }) => {
  const [activeTab, setActiveTab] = useState('transactions');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterPeriod, setFilterPeriod] = useState('30days');

  // Mock payment data
  const paymentData = {
    balance: {
      available: 45000000,
      pending: 12000000,
      total: 57000000
    },
    transactions: [
      {
        id: 'TXN-001',
        type: 'credit',
        amount: 15000000,
        description: 'Financement facture INV-001 - SENELEC',
        date: '2024-01-15',
        status: 'completed',
        reference: 'INV-001',
        counterparty: 'Financier Alpha',
        fee: 75000
      },
      {
        id: 'TXN-002',
        type: 'debit',
        amount: 8500000,
        description: 'Remboursement financement INV-002',
        date: '2024-01-14',
        status: 'completed',
        reference: 'INV-002',
        counterparty: 'Financier Beta',
        fee: 42500
      },
      {
        id: 'TXN-003',
        type: 'credit',
        amount: 12000000,
        description: 'Financement facture INV-003 - SONATEL',
        date: '2024-01-13',
        status: 'pending',
        reference: 'INV-003',
        counterparty: 'Financier Gamma',
        fee: 60000
      },
      {
        id: 'TXN-004',
        type: 'debit',
        amount: 150000,
        description: 'Frais de plateforme - Janvier 2024',
        date: '2024-01-12',
        status: 'completed',
        reference: 'FEE-001',
        counterparty: 'ProCapital',
        fee: 0
      }
    ],
    scheduledPayments: [
      {
        id: 'SCH-001',
        type: 'debit',
        amount: 15750000,
        description: 'Remboursement INV-001 + intérêts',
        dueDate: '2024-02-15',
        status: 'scheduled',
        reference: 'INV-001',
        counterparty: 'Financier Alpha'
      },
      {
        id: 'SCH-002',
        type: 'debit',
        amount: 12600000,
        description: 'Remboursement INV-003 + intérêts',
        dueDate: '2024-02-20',
        status: 'scheduled',
        reference: 'INV-003',
        counterparty: 'Financier Gamma'
      }
    ]
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('fr-FR').format(amount) + ' FCFA';
  };

  const getTransactionIcon = (type: string) => {
    return type === 'credit' ? (
      <ArrowDownLeft className="w-5 h-5 text-green-600" />
    ) : (
      <ArrowUpRight className="w-5 h-5 text-red-600" />
    );
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'pending':
        return <Clock className="w-4 h-4 text-yellow-600" />;
      case 'failed':
        return <AlertCircle className="w-4 h-4 text-red-600" />;
      default:
        return <Clock className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Terminée';
      case 'pending':
        return 'En attente';
      case 'failed':
        return 'Échouée';
      case 'scheduled':
        return 'Programmée';
      default:
        return 'Inconnue';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredTransactions = paymentData.transactions.filter(transaction => {
    if (filterStatus !== 'all' && transaction.status !== filterStatus) {
      return false;
    }
    // Add period filtering logic here if needed
    return true;
  });

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
              <h1 className="text-3xl font-bold text-gray-900">Gestion des Paiements</h1>
              <p className="text-gray-600 mt-2">
                Suivez vos transactions, soldes et paiements programmés
              </p>
            </div>
            <button className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors flex items-center">
              <Download className="w-5 h-5 mr-2" />
              Exporter
            </button>
          </div>
        </div>

        {/* Balance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Solde disponible</h3>
              <CreditCard className="w-8 h-8 text-green-600" />
            </div>
            <p className="text-3xl font-bold text-green-600">
              {formatAmount(paymentData.balance.available)}
            </p>
            <p className="text-sm text-gray-600 mt-2">Disponible immédiatement</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">En attente</h3>
              <Clock className="w-8 h-8 text-yellow-600" />
            </div>
            <p className="text-3xl font-bold text-yellow-600">
              {formatAmount(paymentData.balance.pending)}
            </p>
            <p className="text-sm text-gray-600 mt-2">En cours de traitement</p>
          </div>
          
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Solde total</h3>
              <ArrowUpRight className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-3xl font-bold text-blue-600">
              {formatAmount(paymentData.balance.total)}
            </p>
            <p className="text-sm text-gray-600 mt-2">Disponible + En attente</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              <button
                onClick={() => setActiveTab('transactions')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'transactions'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Historique des transactions
              </button>
              <button
                onClick={() => setActiveTab('scheduled')}
                className={`py-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'scheduled'
                    ? 'border-green-500 text-green-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Paiements programmés
              </button>
            </nav>
          </div>

          {/* Filters */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <Filter className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm text-gray-600">Filtres:</span>
              </div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="all">Tous les statuts</option>
                <option value="completed">Terminées</option>
                <option value="pending">En attente</option>
                <option value="failed">Échouées</option>
              </select>
              <select
                value={filterPeriod}
                onChange={(e) => setFilterPeriod(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
              >
                <option value="7days">7 derniers jours</option>
                <option value="30days">30 derniers jours</option>
                <option value="90days">90 derniers jours</option>
                <option value="1year">1 an</option>
              </select>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {activeTab === 'transactions' && (
              <div className="space-y-4">
                {filteredTransactions.map((transaction) => (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="flex items-center">
                      <div className="mr-4">
                        {getTransactionIcon(transaction.type)}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{transaction.description}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{transaction.counterparty}</span>
                          <span className="mx-2">•</span>
                          <span>{transaction.reference}</span>
                          <span className="mx-2">•</span>
                          <span>{new Date(transaction.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center mb-1">
                        <span className={`text-lg font-semibold ${
                          transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {transaction.type === 'credit' ? '+' : '-'}{formatAmount(transaction.amount)}
                        </span>
                      </div>
                      <div className="flex items-center justify-end">
                        {getStatusIcon(transaction.status)}
                        <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(transaction.status)}`}>
                          {getStatusText(transaction.status)}
                        </span>
                      </div>
                      {transaction.fee > 0 && (
                        <p className="text-xs text-gray-500 mt-1">
                          Frais: {formatAmount(transaction.fee)}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}

            {activeTab === 'scheduled' && (
              <div className="space-y-4">
                {paymentData.scheduledPayments.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center">
                      <div className="mr-4">
                        <Clock className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{payment.description}</p>
                        <div className="flex items-center text-sm text-gray-600 mt-1">
                          <span>{payment.counterparty}</span>
                          <span className="mx-2">•</span>
                          <span>{payment.reference}</span>
                          <span className="mx-2">•</span>
                          <span>Échéance: {new Date(payment.dueDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-semibold text-red-600">
                        -{formatAmount(payment.amount)}
                      </span>
                      <div className="flex items-center justify-end mt-1">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                          {getStatusText(payment.status)}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Payment Methods */}
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Méthodes de paiement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Compte bancaire principal</p>
                    <p className="text-sm text-gray-600">CBAO **** 1234</p>
                  </div>
                </div>
                <span className="px-2 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">
                  Principal
                </span>
              </div>
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                    <CreditCard className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium text-gray-900">Compte secondaire</p>
                    <p className="text-sm text-gray-600">UBA **** 5678</p>
                  </div>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Modifier
                </button>
              </div>
            </div>
            <button className="w-full mt-4 border-2 border-dashed border-gray-300 rounded-lg py-3 text-gray-600 hover:border-gray-400 hover:text-gray-700 transition-colors">
              + Ajouter un compte
            </button>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Paramètres de paiement</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Notifications de paiement</p>
                  <p className="text-sm text-gray-600">Recevoir des alertes par email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Paiements automatiques</p>
                  <p className="text-sm text-gray-600">Remboursements automatiques</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                </label>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-gray-900">Limite de transaction</p>
                  <p className="text-sm text-gray-600">50,000,000 FCFA par jour</p>
                </div>
                <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">
                  Modifier
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Help Section */}
        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
          <h4 className="font-semibold text-blue-900 mb-2">Sécurité des paiements</h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-blue-800">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span>Chiffrement SSL 256-bit</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span>Authentification à deux facteurs</span>
            </div>
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
              <span>Surveillance 24/7</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payments;