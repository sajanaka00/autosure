import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { User, Phone, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '../../assets/images/logo.png'
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
      case 'listings':
        route = '/vehicles';
        break;
      case 'blog':
        route = '/blog';
        break;
      case 'about':
        route = '/about';
        break;
      case 'contact':
        route = '/contact';
        break;
      default:
        route = '/';
    }
    
    // Handle dropdown items with query parameters
    if (dropdownItem) {
      const queryParam = dropdownItem.toLowerCase().replace(/\s+/g, '-');
      route += `?category=${queryParam}`;
    }
    
    navigate(route);
    setDropdownOpen({});
    setMobileMenuOpen(false);
  };

  // Get current active tab based on location
  const getCurrentActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/vehicles')) return 'listings';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    return '';
  };

  const activeTab = getCurrentActiveTab();

  // Navigation items
  const navItems = [
    { 
      id: 'home', 
      label: 'Home',
      hasDropdown: true,
      dropdownItems: ['Featured Cars', 'New Arrivals', 'Best Deals']
    },
    { 
      id: 'listings', 
      label: 'Listings',
      hasDropdown: true,
      dropdownItems: ['All Cars', 'By Brand', 'By Price', 'Advanced Search']
    },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <nav className="modern-navbar">
      <div className="navbar-container">
        <div className="navbar-content">
          {/* Mobile Layout */}
          <div className="mobile-navbar-content">
            <div className="mobile-brand">
              <img src={Logo} alt="BOXCARS" className="brand-logo" />
              {/* Fallback text if logo fails to load */}
              <h1 className="brand-title" style={{ display: 'none' }}>BOXCARS</h1>
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
              <img src="/assets/logo.png" alt="BOXCARS" className="brand-logo" />
              {/* Fallback text if logo fails to load */}
              <h1 className="brand-title" style={{ display: 'none' }}>BOXCARS</h1>
            </div>
            
            {/* Navigation Links */}
            <div className="nav-links">
              {navItems.map((item) => (
                <div key={item.id} className="nav-item">
                  <button
                    onClick={() => item.hasDropdown ? toggleDropdown(item.id) : handleNavClick(item.id)}
                    className={`nav-link ${activeTab === item.id ? 'nav-link-active' : ''}`}
                  >
                    <span>{item.label}</span>
                    {item.hasDropdown && (
                      <ChevronDown className={`chevron-icon ${dropdownOpen[item.id] ? 'chevron-rotated' : ''}`} />
                    )}
                  </button>
                  
                  {/* Dropdown Menu */}
                  {item.hasDropdown && dropdownOpen[item.id] && (
                    <div className="dropdown-menu">
                      {/* Dropdown sub-items */}
                      {item.dropdownItems && item.dropdownItems.map((dropdownItem, index) => (
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
              {/* Phone Info */}
              <div className="phone-info">
                <Phone className="phone-icon" />
                <span className="phone-number">+75 123 456 789</span>
              </div>
              
              {/* Sign In / User Info */}
              {user ? (
                <div className="user-info">
                  <User className="user-icon" />
                  <span className="user-name">{user?.firstName}</span>
                </div>
              ) : (
                <button className="sign-in-btn">
                  <User className="user-icon" />
                  <span>Sign in</span>
                </button>
              )}
              
              {/* Submit Listing Button */}
              <button className="submit-listing-btn">
                + Submit Listing
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
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`mobile-nav-link ${activeTab === item.id ? 'mobile-nav-link-active' : ''}`}
                >
                  {item.label}
                </button>
              ))}
              
              <div className="mobile-user-section">
                {user ? (
                  <div className="mobile-user-info">
                    <div className="mobile-user-details">
                      <User className="mobile-user-icon" />
                      <span className="mobile-user-name">{user?.firstName}</span>
                    </div>
                    <button onClick={handleLogout} className="mobile-logout-btn">
                      Sign Out
                    </button>
                  </div>
                ) : (
                  <button className="mobile-sign-in-btn">
                    <User className="mobile-user-icon" />
                    <span>Sign in</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}