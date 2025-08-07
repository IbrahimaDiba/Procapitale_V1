import { useState } from 'react';
import { ChevronRight, Eye, EyeOff } from 'lucide-react';

interface LoginProps {
  onLogin: (userType: string) => void;
  onNavigate: (view: string) => void;
}

const Login: React.FC<LoginProps> = ({ onLogin, onNavigate }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [userType, setUserType] = useState('supplier');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLogin(userType);
  };

  const userTypes = [
    { value: 'supplier', label: 'Fournisseur (PME/PMI)' },
    { value: 'micro', label: 'Micro-entreprise' },
    { value: 'buyer', label: 'Acheteur' },
    { value: 'financier', label: 'Financier' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">
            Connexion à ProCapital
          </h2>
          <p className="mt-2 text-gray-600">
            Accédez à votre espace personnel
          </p>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div>
              <label htmlFor="userType" className="block text-sm font-medium text-gray-700 mb-2">
                Type de compte
              </label>
              <select
                id="userType"
                value={userType}
                onChange={(e) => setUserType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                {userTypes.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Adresse email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                placeholder="votre@email.com"
                required
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
                Mot de passe
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                  placeholder="Votre mot de passe"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                >
                  {showPassword ? <EyeOff size={20} className="text-gray-400" /> : <Eye size={20} className="text-gray-400" />}
                </button>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember"
                type="checkbox"
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="remember" className="ml-2 block text-sm text-gray-700">
                Se souvenir de moi
              </label>
            </div>
                            <button type="button" className="text-sm text-blue-600 hover:text-blue-500">
              Mot de passe oublié ?
            </button>
          </div>

          <button
            type="submit"
                            className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center group"
          >
            Se connecter
            <ChevronRight size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
          </button>

          <div className="text-center">
            <span className="text-gray-600">Pas encore de compte ? </span>
            <button
              type="button"
              onClick={() => onNavigate('register')}
              className="text-blue-600 hover:text-blue-500 font-medium"
            >
              S'inscrire
            </button>
          </div>
        </form>

        <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="text-sm text-blue-800">
            <strong>Comptes de démonstration :</strong>
            <div className="mt-2 space-y-1">
              <div>Fournisseur : demo@fournisseur.sn</div>
              <div>Acheteur : demo@acheteur.sn</div>
              <div>Financier : demo@financier.sn</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;