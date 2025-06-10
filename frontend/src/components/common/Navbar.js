import { User, Car, Plus, List, LogOut, Home } from 'lucide-react';
import { tokenManager } from '../../utils/tokenManager';
import '../../styles/navbar.css';

export default function Navbar({ user, activeTab, onTabChange, onLogout }) {
  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    onLogout();
  };

  const getRoleColor = (role) => {
    switch (role) {
      case 'admin': return 'role-admin';
      case 'dealer': return 'role-dealer';
      default: return 'role-user';
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
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          <div className="navbar-brand">
            <div className="brand-icon">
              <Car className="brand-icon-svg" />
            </div>
            <div className="brand-text">
              <h1 className="brand-title">CarDealer</h1>
            </div>
          </div>
          
          {/* Navigation Links */}
          <div className="nav-links">
            {getNavItems().map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange(item.id)}
                  className={`nav-link ${activeTab === item.id ? 'nav-link-active' : ''}`}
                >
                  <Icon className="nav-icon" />
                  {item.label}
                </button>
              );
            })}
          </div>
          
          {/* User Menu */}
          <div className="user-menu">
            <div className="user-info">
              <div className="user-avatar">
                <User className="user-avatar-icon" />
              </div>
              <span className="user-name">{user.firstName}</span>
              <span className={`user-role ${getRoleColor(user.role)}`}>
                {user.role}
              </span>
            </div>
            <button
              onClick={handleLogout}
              className="logout-btn"
            >
              <LogOut className="logout-icon" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}