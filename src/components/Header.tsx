import { useState } from 'react';
import { Building2, Menu, X, LogOut } from 'lucide-react';

interface HeaderProps {
  onNavigate: (view: string, type?: string) => void;
  isAuthenticated: boolean;
  userType: string | null;
  userData: any;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onNavigate, isAuthenticated, userType, userData, onLogout }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const getUserTypeLabel = () => {
    switch (userType) {
      case 'supplier': return 'Fournisseur';
      case 'buyer': return 'Acheteur';
      case 'financier': return 'Financier';
      case 'micro': return 'Micro-entreprise';
      default: return '';
    }
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center cursor-pointer"
            onClick={() => onNavigate('home')}
          >
            <Building2 className="h-10 w-10 text-blue-600" />
            <span className="ml-2 text-xl font-bold text-gray-900">ProCapital</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => onNavigate('home')}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              Accueil
            </button>
            {isAuthenticated && (
              <>
                <button 
                  onClick={() => onNavigate('dashboard')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => onNavigate('profile')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Profil
                </button>
              </>
            )}
            <button className="text-gray-700 hover:text-green-600 transition-colors">
              À propos
            </button>
            <button className="text-gray-700 hover:text-green-600 transition-colors">
              Contact
            </button>
          </nav>

          {/* Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <div className="text-right">
                  <div className="text-sm font-medium text-gray-900">{userData?.name}</div>
                  <div className="text-xs text-gray-600">{getUserTypeLabel()}</div>
                </div>
                <button
                  onClick={() => onNavigate('dashboard')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  Dashboard
                </button>
                <button
                  onClick={onLogout}
                  className="text-gray-600 hover:text-gray-800 transition-colors"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <>
                <button 
                  onClick={() => onNavigate('login')}
                  className="text-gray-700 hover:text-blue-600 transition-colors"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => onNavigate('register')}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2">
            <button 
              onClick={() => {
                onNavigate('home');
                setIsMenuOpen(false);
              }}
              className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Accueil
            </button>
            {isAuthenticated && (
              <>
                <button 
                  onClick={() => {
                    onNavigate('dashboard');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Dashboard
                </button>
                <button 
                  onClick={() => {
                    onNavigate('profile');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Profil
                </button>
              </>
            )}
            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              À propos
            </button>
            <button className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md">
              Contact
            </button>
            {isAuthenticated ? (
              <>
                <button
                  onClick={() => {
                    onLogout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Déconnexion
                </button>
              </>
            ) : (
              <>
                <button 
                  onClick={() => {
                    onNavigate('login');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  Connexion
                </button>
                <button 
                  onClick={() => {
                    onNavigate('register');
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 bg-blue-600 text-white rounded-md"
                >
                  S'inscrire
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;