import { useState, useEffect } from 'react';
import { BarChart3, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Info, Download, Share2, RefreshCw } from 'lucide-react';

interface ScoringProps {
  userType: string | null;
  onNavigate: (view: string) => void;
}

const Scoring: React.FC<ScoringProps> = ({ userType, onNavigate }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('6months');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [showDetails, setShowDetails] = useState(false);

  // Mock scoring data
  const scoringData = {
    overall: {
      score: 785,
      rating: 'A-',
      trend: 'up',
      change: '+15',
      lastUpdate: '2024-01-15'
    },
    categories: [
      {
        name: 'Solvabilité',
        score: 820,
        maxScore: 1000,
        weight: 30,
        trend: 'up',
        factors: [
          { name: 'Historique de paiement', impact: 'positive', value: 'Excellent' },
          { name: 'Ratio d\'endettement', impact: 'neutral', value: '45%' },
          { name: 'Liquidité', impact: 'positive', value: 'Bonne' }
        ]
      },
      {
        name: 'Performance Financière',
        score: 750,
        maxScore: 1000,
        weight: 25,
        trend: 'stable',
        factors: [
          { name: 'Chiffre d\'affaires', impact: 'positive', value: '+12% (12M)' },
          { name: 'Marge bénéficiaire', impact: 'neutral', value: '8.5%' },
          { name: 'Croissance', impact: 'positive', value: 'Stable' }
        ]
      },
      {
        name: 'Relation Client',
        score: 780,
        maxScore: 1000,
        weight: 20,
        trend: 'up',
        factors: [
          { name: 'Délais de paiement', impact: 'positive', value: '< 30 jours' },
          { name: 'Réclamations', impact: 'positive', value: 'Faible' },
          { name: 'Fidélité clients', impact: 'positive', value: '85%' }
        ]
      },
      {
        name: 'Conformité',
        score: 800,
        maxScore: 1000,
        weight: 15,
        trend: 'stable',
        factors: [
          { name: 'Documents KYC', impact: 'positive', value: 'Complets' },
          { name: 'Certifications', impact: 'positive', value: 'À jour' },
          { name: 'Réglementation', impact: 'positive', value: 'Conforme' }
        ]
      },
      {
        name: 'Secteur d\'Activité',
        score: 720,
        maxScore: 1000,
        weight: 10,
        trend: 'down',
        factors: [
          { name: 'Stabilité du secteur', impact: 'neutral', value: 'Moyenne' },
          { name: 'Concurrence', impact: 'negative', value: 'Élevée' },
          { name: 'Perspectives', impact: 'positive', value: 'Bonnes' }
        ]
      }
    ],
    history: [
      { date: '2024-01', score: 770 },
      { date: '2023-12', score: 765 },
      { date: '2023-11', score: 780 },
      { date: '2023-10', score: 775 },
      { date: '2023-09', score: 785 },
      { date: '2023-08', score: 785 }
    ],
    recommendations: [
      {
        type: 'improvement',
        title: 'Améliorer la marge bénéficiaire',
        description: 'Optimisez vos coûts opérationnels pour augmenter votre marge de 2-3%',
        impact: '+20 points',
        priority: 'high'
      },
      {
        type: 'maintain',
        title: 'Maintenir l\'excellence des paiements',
        description: 'Continuez à respecter vos délais de paiement pour préserver votre excellent historique',
        impact: 'Maintien',
        priority: 'medium'
      },
      {
        type: 'opportunity',
        title: 'Diversifier la clientèle',
        description: 'Réduisez la dépendance aux grands comptes en développant de nouveaux clients',
        impact: '+15 points',
        priority: 'medium'
      }
    ]
  };

  const getScoreColor = (score: number) => {
    if (score >= 800) return 'text-green-600';
    if (score >= 700) return 'text-blue-600';
    if (score >= 600) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBackground = (score: number) => {
    if (score >= 800) return 'bg-green-100';
    if (score >= 700) return 'bg-blue-100';
    if (score >= 600) return 'bg-yellow-100';
    return 'bg-red-100';
  };

  const getRating = (score: number) => {
    if (score >= 850) return 'AAA';
    if (score >= 800) return 'AA';
    if (score >= 750) return 'A+';
    if (score >= 700) return 'A';
    if (score >= 650) return 'A-';
    if (score >= 600) return 'BBB';
    if (score >= 550) return 'BB';
    return 'B';
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="w-4 h-4 text-green-600" />;
      case 'down':
        return <TrendingDown className="w-4 h-4 text-red-600" />;
      default:
        return <div className="w-4 h-4 bg-gray-400 rounded-full" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  const handleRefreshScore = () => {
    setIsLoading(true);
    // Simuler un rafraîchissement du score
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const handleDownloadReport = () => {
    const reportContent = `
      RAPPORT DE SCORING CRÉDIT
      =========================
      
      Score Global: ${getRating(scoringData.overall.score)} (${scoringData.overall.score}/1000)
      Dernière mise à jour: ${scoringData.overall.lastUpdate}
      
      ANALYSE PAR CATÉGORIE:
      ${scoringData.categories.map(cat => `
        ${cat.name} (${cat.weight}%): ${cat.score}/${cat.maxScore}
        - ${cat.factors.map(f => `${f.name}: ${f.value}`).join('\n        - ')}
      `).join('\n')}
      
      RECOMMANDATIONS:
      ${scoringData.recommendations.map(rec => `
        ${rec.title} (${rec.priority})
        ${rec.description}
        Impact: ${rec.impact}
      `).join('\n')}
    `;
    
    const blob = new Blob([reportContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `scoring_credit_${new Date().toISOString().split('T')[0]}.txt`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const handleShareScore = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Mon Score de Crédit ProCapital',
        text: `Mon score de crédit est ${getRating(scoringData.overall.score)} (${scoringData.overall.score}/1000)`,
        url: window.location.href
      });
    } else {
      // Fallback pour les navigateurs qui ne supportent pas l'API Share
      navigator.clipboard.writeText(`Mon score de crédit ProCapital: ${getRating(scoringData.overall.score)} (${scoringData.overall.score}/1000)`);
      alert('Score copié dans le presse-papiers !');
    }
  };

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
              <h1 className="text-3xl font-bold text-gray-900">Scoring Crédit</h1>
              <p className="text-gray-600 mt-2">
                Analyse détaillée de votre profil de risque et recommandations
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <p className="text-sm text-gray-600">Dernière mise à jour</p>
                <p className="font-medium text-gray-900">{scoringData.overall.lastUpdate}</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={handleRefreshScore}
                  disabled={isLoading}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors disabled:opacity-50"
                  title="Actualiser le score"
                >
                  <RefreshCw className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
                </button>
                <button
                  onClick={handleShareScore}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Partager le score"
                >
                  <Share2 className="w-5 h-5" />
                </button>
                <button
                  onClick={handleDownloadReport}
                  className="p-2 text-gray-600 hover:text-gray-800 transition-colors"
                  title="Télécharger le rapport"
                >
                  <Download className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Overall Score */}
        <div className="bg-white rounded-lg p-8 shadow-sm border border-gray-200 mb-8">
          <div className="text-center">
            <div className={`inline-flex items-center justify-center w-32 h-32 rounded-full ${getScoreBackground(scoringData.overall.score)} mb-4`}>
              <span className={`text-4xl font-bold ${getScoreColor(scoringData.overall.score)}`}>
                {scoringData.overall.score}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Score Global: {getRating(scoringData.overall.score)}
            </h2>
            <div className="flex items-center justify-center space-x-2">
              {getTrendIcon(scoringData.overall.trend)}
              <span className={`font-medium ${scoringData.overall.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                {scoringData.overall.change} points ce mois
              </span>
            </div>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Votre score de crédit est excellent. Vous avez accès aux meilleures conditions de financement 
              avec des taux préférentiels et des délais de traitement accélérés.
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Categories Breakdown */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-6">Analyse par Catégorie</h3>
              <div className="space-y-6">
                {scoringData.categories.map((category, index) => (
                  <div key={index} className="border-b border-gray-100 pb-6 last:border-b-0">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <button
                          onClick={() => setSelectedCategory(selectedCategory === category.name ? null : category.name)}
                          className="flex items-center hover:text-green-600 transition-colors"
                        >
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <span className="ml-2 text-sm text-gray-500">({category.weight}%)</span>
                          {getTrendIcon(category.trend)}
                        </button>
                      </div>
                      <div className="text-right">
                        <span className={`text-lg font-bold ${getScoreColor(category.score)}`}>
                          {category.score}
                        </span>
                        <span className="text-gray-500">/{category.maxScore}</span>
                      </div>
                    </div>
                    
                    {/* Progress Bar */}
                    <div className="w-full bg-gray-200 rounded-full h-2 mb-4">
                      <div 
                        className={`h-2 rounded-full ${
                          category.score >= 800 ? 'bg-green-600' :
                          category.score >= 700 ? 'bg-blue-600' :
                          category.score >= 600 ? 'bg-yellow-600' : 'bg-red-600'
                        }`}
                        style={{ width: `${(category.score / category.maxScore) * 100}%` }}
                      ></div>
                    </div>

                    {/* Factors */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {category.factors.map((factor, factorIndex) => (
                        <div key={factorIndex} className="bg-gray-50 rounded-lg p-3">
                          <p className="text-sm font-medium text-gray-900">{factor.name}</p>
                          <p className={`text-sm ${getImpactColor(factor.impact)}`}>
                            {factor.value}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Detailed Analysis */}
                    {selectedCategory === category.name && (
                      <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <h5 className="font-medium text-blue-900 mb-3">Analyse détaillée - {category.name}</h5>
                        <div className="space-y-3">
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-800">Score actuel</span>
                            <span className={`font-bold ${getScoreColor(category.score)}`}>{category.score}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-800">Poids dans le score global</span>
                            <span className="font-bold text-blue-900">{category.weight}%</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm text-blue-800">Tendance</span>
                            <div className="flex items-center">
                              {getTrendIcon(category.trend)}
                              <span className="ml-1 text-sm font-medium">
                                {category.trend === 'up' ? 'Amélioration' : 
                                 category.trend === 'down' ? 'Dégradation' : 'Stable'}
                              </span>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-blue-200">
                            <p className="text-sm text-blue-800">
                              <strong>Recommandation :</strong> {
                                category.score >= 800 ? 'Excellent ! Maintenez ce niveau.' :
                                category.score >= 700 ? 'Bon score. Quelques améliorations possibles.' :
                                category.score >= 600 ? 'Score moyen. Travaillez sur les points faibles.' :
                                'Score faible. Priorité à l\'amélioration.'
                              }
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Score History */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Évolution du Score</h3>
                <select
                  value={selectedPeriod}
                  onChange={(e) => setSelectedPeriod(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                >
                  <option value="3months">3 derniers mois</option>
                  <option value="6months">6 derniers mois</option>
                  <option value="12months">12 derniers mois</option>
                </select>
              </div>
              
              {/* Simple Chart Representation */}
              <div className="space-y-3">
                {scoringData.history.map((point, index) => (
                  <div key={index} className="flex items-center">
                    <div className="w-16 text-sm text-gray-600">{point.date}</div>
                    <div className="flex-1 mx-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${getScoreColor(point.score).replace('text-', 'bg-')}`}
                          style={{ width: `${(point.score / 1000) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className={`w-12 text-sm font-medium ${getScoreColor(point.score)}`}>
                      {point.score}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recommendations */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Recommandations</h3>
              <div className="space-y-4">
                {scoringData.recommendations.map((rec, index) => (
                  <div key={index} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-gray-900 text-sm">{rec.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(rec.priority)}`}>
                        {rec.priority === 'high' ? 'Priorité haute' :
                         rec.priority === 'medium' ? 'Priorité moyenne' : 'Priorité faible'}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{rec.description}</p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500">Impact potentiel</span>
                      <span className="text-sm font-medium text-green-600">{rec.impact}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Score Benefits */}
            <div className="bg-green-50 border border-green-200 rounded-lg p-6">
              <div className="flex items-center mb-4">
                <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
                <h3 className="font-semibold text-green-900">Avantages de votre score</h3>
              </div>
              <ul className="space-y-2 text-sm text-green-800">
                <li>• Taux d'intérêt préférentiels (8-10%)</li>
                <li>• Traitement prioritaire des dossiers</li>
                <li>• Montants de financement élevés</li>
                <li>• Délais de décaissement rapides</li>
                <li>• Conditions de remboursement flexibles</li>
              </ul>
            </div>

            {/* Actions */}
            <div className="bg-white rounded-lg p-6 shadow-sm border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Actions Rapides</h3>
              <div className="space-y-3">
                <button 
                  onClick={() => onNavigate('invoice-upload')}
                  className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Téléverser une facture
                </button>
                <button 
                  onClick={() => onNavigate('auctions')}
                  className="w-full border border-green-600 text-green-600 py-2 px-4 rounded-lg hover:bg-green-50 transition-colors flex items-center justify-center"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Voir les opportunités
                </button>
                <button 
                  onClick={handleDownloadReport}
                  className="w-full border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  <Download className="w-4 h-4 mr-2" />
                  Télécharger le rapport
                </button>
                <button 
                  onClick={handleShareScore}
                  className="w-full border border-blue-300 text-blue-600 py-2 px-4 rounded-lg hover:bg-blue-50 transition-colors flex items-center justify-center"
                >
                  <Share2 className="w-4 h-4 mr-2" />
                  Partager mon score
                </button>
              </div>
            </div>

            {/* Info Box */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start">
                <Info className="w-5 h-5 text-blue-600 mr-2 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="font-medium mb-1">Comment améliorer votre score ?</p>
                  <p>Maintenez un historique de paiement exemplaire, diversifiez votre clientèle et optimisez vos ratios financiers.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Scoring;