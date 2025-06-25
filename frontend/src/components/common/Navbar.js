import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { User, Plus, LogOut, ChevronDown, Phone, Menu, X } from 'lucide-react';
import '../../styles/navbar.css';

export default function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

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

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown]
    }));
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleNavClick = (itemId, dropdownItem = null) => {
    let route = '/';
    
    switch (itemId) {
      case 'home':
        route = '/';
        break;
      case 'vehicles':
        route = '/vehicles';
        break;
      case 'news':
        route = '/blog';
        break;
      case 'contact':
        route = '/contact';
        break;
      case 'add-vehicles':
        route = '/add-vehicles';
        break;
      default:
        route = '/';
    }
    
    // Handle dropdown items with query parameters or specific routes
    if (dropdownItem) {
      const queryParam = dropdownItem.toLowerCase().replace(/\s+/g, '-');
      route += `?category=${queryParam}`;
    }
    
    navigate(route);
    
    // Close any open dropdowns and mobile menu
    setDropdownOpen({});
    setMobileMenuOpen(false);
  };

  // Get current active tab based on location
  const getCurrentActiveTab = () => {
    const path = location.pathname;
    if (path === '/' || path.startsWith('/auth')) return 'home';
    if (path.startsWith('/vehicles')) return 'vehicles';
    if (path.startsWith('/blog') || path.startsWith('/news')) return 'news';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/add-vehicles')) return 'add-vehicles';
    return '';
  };

  const activeTab = getCurrentActiveTab();

  // Navigation items based on user role
  const getNavItems = () => {
    const commonItems = [
      { 
        id: 'home', 
        label: 'Home',
        hasDropdown: true,
        dropdownItems: ['Featured Cars', 'New Arrivals', 'Best Deals']
      },
      { 
        id: 'vehicles', 
        label: 'Vehicles',
        hasDropdown: true,
        dropdownItems: ['All Cars', 'By Brand', 'By Price', 'Advanced Search']
      },
      { 
        id: 'news', 
        label: 'News',
        hasDropdown: true,
        dropdownItems: ['Latest Posts', 'Car Reviews', 'Tips & Guides']
      },
      { id: 'contact', label: 'Contact' }
    ];

    if (user.role === 'admin') {
      return [
        ...commonItems.slice(0, 2), // Home, Vehicles
        { id: 'add-vehicles', label: 'Add Vehicles' },
        ...commonItems.slice(2) // News, Contact
      ];
    } else if (user.role === 'dealer') {
      return commonItems;
    } else {
      // Regular user gets same items as dealer
      return commonItems;
    }
  };

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Mobile Layout */}
          <div className="mobile-navbar-content">
            <div className="mobile-brand-center">
              <h1 className="brand-title">BOXCARS</h1>
            </div>
            
            <div className="mobile-actions">
              <button 
                onClick={toggleMobileMenu}
                className="mobile-menu-toggle"
              >
                {mobileMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
              </button>
            </div>
          </div>

          {/* Desktop Layout */}
          <div className="desktop-navbar-content">
            {/* Brand */}
            <div className="navbar-brand">    
              <div className="brand-logo">
                <h1 className="brand-title">LOGO</h1>
              </div>
              
              <div className="phone-info">
                <Phone className="phone-icon" />
                <span className="phone-number">+75 123 456 789</span>
              </div>
            </div>
            
            {/* Navigation Links */}
            <div className="nav-links">
              {getNavItems().map((item) => (
                <div key={item.id} className="nav-item">
                  <button
                    onClick={() => item.hasDropdown ? toggleDropdown(item.id) : handleNavClick(item.id)}
                    className={`nav-link ${(activeTab === item.id || (item.id === 'news' && location.pathname.startsWith('/blog'))) ? 'nav-link-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`chevron-icon ${dropdownOpen[item.id] ? 'chevron-rotated' : ''}`} />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && dropdownOpen[item.id] && (
                    <div className="dropdown-menu">
                      {/* Main navigation item */}
                      <button
                        className="dropdown-item dropdown-main-item"
                        onClick={() => handleNavClick(item.id)}
                      >
                        {item.id === 'news' ? 'All Posts' : `All ${item.label}`}
                      </button>
                      
                      {/* Dropdown sub-items */}
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          className="dropdown-item"
                          onClick={() => handleNavClick(item.id, dropdownItem)}
                        >
                          {dropdownItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            {/* Right Side Actions */}
            <div className="nav-actions">
              {/* User Info */}
              <div className="user-info">
                <User className="user-icon" />
                <span className="user-name">{user?.firstName}</span>
                <span className={`user-role ${getRoleColor(user?.role)}`}>
                  {user?.role}
                </span>
              </div>
              
              {/* Submit Listing Button */}
              <button className="submit-listing-btn">
                <Plus className="plus-icon" />
                <span>Submit Listing</span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="mobile-menu-overlay" onClick={toggleMobileMenu}>
          <div className="mobile-menu" onClick={(e) => e.stopPropagation()}>
            <div className="mobile-menu-content">
              {getNavItems().map((item) => (
                <div key={item.id} className="mobile-nav-item">
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className={`mobile-nav-link ${(activeTab === item.id || (item.id === 'news' && location.pathname.startsWith('/blog'))) ? 'mobile-nav-link-active' : ''}`}
                  >
                    {item.label}
                  </button>
                  
                  {/* Mobile dropdown items */}
                  {item.hasDropdown && (
                    <div className="mobile-dropdown-items">
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          onClick={() => handleNavClick(item.id, dropdownItem)}
                          className="mobile-dropdown-item"
                        >
                          {dropdownItem}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              
              <div className="mobile-user-section">
                <div className="mobile-user-info">
                  <div className="mobile-user-details">
                    <User className="mobile-user-icon" />
                    <span className="mobile-user-name">{user?.firstName}</span>
                    <span className={`mobile-user-role ${getRoleColor(user?.role)}`}>
                      {user?.role}
                    </span>
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-btn">
                    <LogOut className="mobile-logout-icon" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}