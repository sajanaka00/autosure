import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '../../assets/images/vectors/logo.png'
import '../../styles/navbar.css';

export default function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      // Check if the click is outside the navbar
      if (!event.target.closest('.navbar-navigation')) {
        setDropdownOpen({});
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  // Close dropdowns when route changes
  useEffect(() => {
    setDropdownOpen({});
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    tokenManager.removeToken();
    tokenManager.removeUser();
    onLogout();
  };

  const toggleDropdown = (dropdown) => {
    setDropdownOpen(prev => {
      // If the same dropdown is already open, close it
      if (prev[dropdown]) {
        return {};
      }
      // Otherwise, close all dropdowns and open the clicked one
      return { [dropdown]: true };
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    // Close any open dropdowns when opening mobile menu
    setDropdownOpen({});
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
      case 'pages':
        route = '/pages';
        break;
      case 'about':
        route = '/about';
        break;
      case 'contact':
        route = '/contact';
        break;
      case 'admin':
        route = '/admin';
        break;
      case 'dealer-dashboard':
        route = '/dealer-dashboard';
        break;
      case 'submit-listing':
        route = '/submit-listing';
        break;
      default:
        route = '/';
    }
    
    if (dropdownItem) {
      const queryParam = dropdownItem.toLowerCase().replace(/\s+/g, '-');
      route += `?category=${queryParam}`;
    }
    
    navigate(route);
    // Close all dropdowns and mobile menu after navigation
    setDropdownOpen({});
    setMobileMenuOpen(false);
  };

  const getCurrentActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/vehicles')) return 'listings';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/pages')) return 'pages';
    if (path.startsWith('/about')) return 'about';
    if (path.startsWith('/contact')) return 'contact';
    if (path.startsWith('/admin')) return 'admin';
    if (path.startsWith('/dealer-dashboard')) return 'dealer-dashboard';
    return '';
  };

  const activeTab = getCurrentActiveTab();

  const isCustomer = user?.role === 'customer' || user?.userType === 'customer';
  const isAdmin = user?.role === 'admin' || user?.userType === 'admin';
  const isDealer = user?.role === 'dealer' || user?.userType === 'dealer';

  const getNavItems = () => {
    const baseNavItems = [
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
      { 
        id: 'pages', 
        label: 'Pages',
        hasDropdown: true,
        dropdownItems: ['Services', 'FAQ', 'Terms', 'Privacy']
      },
      { id: 'about', label: 'About' },
      { id: 'contact', label: 'Contact' }
    ];

    if (isAdmin) {
      baseNavItems.push({ id: 'admin', label: 'Admin Dashboard' });
    }
    
    if (isDealer) {
      baseNavItems.push({ id: 'dealer-dashboard', label: 'Dealer Portal' });
    }

    return baseNavItems;
  };

  const navItems = getNavItems();

  return (
    <div className="navbar-group">
      {/* Curved Background Section */}
      <div className="curved-background">
        <div className="white-curved-overlay"></div>
      </div>
      
      {/* Main Navbar */}
      <nav className="navbar-main">
        <div className="navbar-container">
          {/* Logo Section */}
          <div className="navbar-logo-link" onClick={() => handleNavClick('home')}>
            <div className="navbar-logo">
              <div className="logo-container">
                <img src={Logo} alt="BOXCARS" className="logo-image" />
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="navbar-navigation">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item">
                <div className="nav-link-wrapper">
                  <button
                    onClick={(e) => {
                      e.stopPropagation(); // Prevent event bubbling
                      if (item.hasDropdown) {
                        toggleDropdown(item.id);
                      } else {
                        handleNavClick(item.id);
                      }
                    }}
                    className={`nav-link-text ${activeTab === item.id ? 'active' : ''}`}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`nav-dropdown-icon ${dropdownOpen[item.id] ? 'rotated' : ''}`} />
                    )}
                  </button>
                  {item.hasDropdown && activeTab === item.id && (
                    <div className="nav-underline"></div>
                  )}
                </div>
                
                {item.hasDropdown && dropdownOpen[item.id] && (
                  <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
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
          <div className="navbar-actions">
            {/* Sign In / User Info */}
            {user ? (
              <div className="user-info-container">
                <User className="user-icon" />
                <span className="user-name">{user?.firstName}</span>
                {user?.role && (
                  <span className={`user-role-badge ${user.role}`}>{user.role}</span>
                )}
                <button onClick={handleLogout} className="logout-button">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="sign-in-container" onClick={() => navigate('/login')}>
                <User className="sign-in-icon" />
                <span className="sign-in-text">Sign in</span>
              </div>
            )}
            
            {/* Submit Listing Button */}
            {!isCustomer && (
              <button 
                className="submit-listing-button"
                onClick={() => handleNavClick('submit-listing')}
              >
                <span className="submit-listing-text">Submit Listing</span>
              </button>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
          <div className="mobile-menu-content">
            {navItems.map((item) => (
              <div key={item.id}>
                <button
                  onClick={() => {
                    if (item.hasDropdown) {
                      toggleDropdown(item.id);
                    } else {
                      handleNavClick(item.id);
                    }
                  }}
                  className={`mobile-nav-link ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className={`nav-dropdown-icon ${dropdownOpen[item.id] ? 'rotated' : ''}`} style={{ marginLeft: 'auto', width: '16px', height: '16px' }} />
                  )}
                </button>
                
                {/* Mobile Dropdown Items */}
                {item.hasDropdown && dropdownOpen[item.id] && (
                  <div style={{ paddingLeft: '20px', backgroundColor: '#f8fafc' }}>
                    {item.dropdownItems && item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="mobile-nav-link"
                        style={{ fontSize: '14px', paddingLeft: '0', borderBottom: 'none' }}
                        onClick={() => handleNavClick(item.id, dropdownItem)}
                      >
                        {dropdownItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}

            {!isCustomer && (
              <button 
                className="mobile-submit-listing"
                onClick={() => handleNavClick('submit-listing')}
              >
                Submit Listing
              </button>
            )}
            
            <div className="mobile-user-section">
              {user ? (
                <div className="mobile-user-info">
                  <div className="mobile-user-details">
                    <User size={20} />
                    <span className="mobile-user-name">{user?.firstName}</span>
                    {user?.role && (
                      <span className={`mobile-user-role-badge ${user.role}`}>{user.role}</span>
                    )}
                  </div>
                  <button onClick={handleLogout} className="mobile-logout-button">
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="mobile-sign-in" onClick={() => navigate('/login')}>
                  <User size={20} />
                  <span>Sign in</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}