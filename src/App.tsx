import { useState, useEffect } from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import UserJourneys from './components/UserJourneys';
import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Register from './components/Register';
import KYCDocuments from './components/KYCDocuments';
import InvoiceUpload from './components/InvoiceUpload';
import Scoring from './components/Scoring';
import Auctions from './components/Auctions';
import Payments from './components/Payments';
import Profile from './components/Profile';
import { logAppStatus } from './utils/appStatus';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [userType, setUserType] = useState<string | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userData, setUserData] = useState<any>(null);

  // Log app status on component mount
  useEffect(() => {
    logAppStatus();
  }, []);

  const handleNavigation = (view: string, type?: string) => {
    setCurrentView(view);
    if (type) setUserType(type);
  };

  const handleLogin = (type: string) => {
    setIsAuthenticated(true);
    setUserType(type);
    setUserData({
      name: `Utilisateur ${type}`,
      email: `demo@${type}.sn`,
      company: `Entreprise ${type}`,
      kycStatus: 'pending'
    });
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUserType(null);
    setUserData(null);
    setCurrentView('home');
  };

  const renderContent = () => {
    switch (currentView) {
      case 'login':
        return <Login onLogin={handleLogin} onNavigate={handleNavigation} />;
      case 'register':
        return <Register onNavigate={handleNavigation} userType={userType || ''} />;
      case 'kyc':
        return isAuthenticated ? (
          <KYCDocuments userType={userType} userData={userData} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'invoice-upload':
        return isAuthenticated ? (
          <InvoiceUpload userType={userType} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'scoring':
        return isAuthenticated ? (
          <Scoring userType={userType} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'auctions':
        return isAuthenticated ? (
          <Auctions userType={userType} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'payments':
        return isAuthenticated ? (
          <Payments userType={userType} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'profile':
        return isAuthenticated ? (
          <Profile userType={userType} userData={userData} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      case 'dashboard':
        return isAuthenticated ? (
          <Dashboard userType={userType} userData={userData} onLogout={handleLogout} onNavigate={handleNavigation} />
        ) : (
          <Login onLogin={handleLogin} onNavigate={handleNavigation} />
        );
      default:
        return (
          <>
            <Hero onNavigate={handleNavigation} />
            <Services />
            <UserJourneys onNavigate={handleNavigation} />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onNavigate={handleNavigation} 
        isAuthenticated={isAuthenticated}
        userType={userType}
        userData={userData}
        onLogout={handleLogout}
      />
      {renderContent()}
    </div>
  );
}

export default App;