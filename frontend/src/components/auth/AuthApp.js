import { useState, useEffect } from 'react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import Dashboard from '../pages/dashboard/Dashboard';

export default function AuthApp() {
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
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
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
