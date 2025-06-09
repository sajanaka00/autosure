import { User, Car, Plus, List, LogOut, Home } from 'lucide-react';
import { tokenManager } from '../../utils/tokenManager';

export default function Navbar({ user, activeTab, onTabChange, onLogout }) {
  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    onLogout();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'dealer': return 'bg-green-100 text-green-800';
      default: return 'bg-blue-100 text-blue-800';
    }
  };

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { id: 'home', label: 'Home', icon: Home }
    ];

    if (user.role === 'dealer' || user.role === 'admin') {
      return [
        ...commonItems,
        { id: 'cars', label: 'My Cars', icon: Car },
        { id: 'add-car', label: 'Add Car', icon: Plus },
        { id: 'orders', label: 'Orders', icon: List }
      ];
    } else {
      return [
        ...commonItems,
        { id: 'browse', label: 'Browse Cars', icon: Car },
        { id: 'my-orders', label: 'My Orders', icon: List }
      ];
    }
  };

  return (
    <nav className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Car className="w-8 h-8 text-blue-600" />
            </div>
            <div className="ml-4">
              <h1 className="text-xl font-semibold text-gray-800">CarDealer</h1>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="flex items-center space-x-4">
            {getNavItems().map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === item.id
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-2" />
                  {item.label}
                </button>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <User className="w-4 h-4 text-blue-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{user.firstName}</span>
              <span className={`px-2 py-1 text-xs rounded-full ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center px-3 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}