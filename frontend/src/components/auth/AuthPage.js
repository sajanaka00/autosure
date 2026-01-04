import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import '../../styles/auth.css';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../pages/dashboard/Dashboard';

export default function AuthPage() {
  const [currentView, setCurrentView] = useState('login');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session on app load
    const checkAuth = async () => {
      const token = tokenManager.getToken();
      const storedUser = tokenManager.getUser();

      if (token && storedUser) {
        try {
          // Verify token is still valid
          await api.getCurrentUser(token);
          setUser(storedUser);
          setCurrentView('dashboard');
        } catch (error) {
          // Token is invalid, clear storage
          tokenManager.removeToken();
          tokenManager.removeUser();
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const handleLogin = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleSignup = (userData) => {
    setUser(userData);
    setCurrentView('dashboard');
  };

  const handleLogout = () => {
    setUser(null);
    setCurrentView('login');
  };

  const switchToSignup = () => setCurrentView('signup');
  const switchToLogin = () => setCurrentView('login');

  if (isLoading) {
    return (
      <div className="auth-loading-container">
        <div className="text-center">
          <div className="auth-loading-spinner"></div>
          <p className="auth-loading-text">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="auth-page-root">
      {currentView === 'dashboard' ? (
        <Dashboard user={user} onLogout={handleLogout} />
      ) : currentView === 'login' ? (
        <LoginForm onLogin={handleLogin} onSwitchToSignup={switchToSignup} />
      ) : (
        <SignupForm onSignup={handleSignup} onSwitchToLogin={switchToLogin} />
      )}
    </div>
  );
}
