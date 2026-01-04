import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '../../assets/images/vectors/logo.png'
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const isHomePage = location.pathname === '/';

  // Toggle scrolling effect if needed in future
  useEffect(() => {
    // Optional: Add scroll listener if we want dynamic changes
  }, []);

  // Close dropdowns on route change
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
      if (prev[dropdown]) return {};
      return { [dropdown]: true };
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownOpen({});
  };

  const handleNavClick = (itemId, dropdownItem = null) => {
    let route = '/';

    if (itemId === 'home' && dropdownItem) {
      if (dropdownItem === 'Browse by Type') navigate('/#browse-by-type');
      return;
    }

    switch (itemId) {
      case 'home': route = '/'; break;
      case 'listings': route = '/vehicles'; break;
      case 'blog': route = '/blog'; break;
      case 'about': route = '/about-us'; break;
      case 'contact': route = '/contact-us'; break;
      case 'admin': route = '/admin'; break;
      case 'dealer-dashboard': route = '/dealer-dashboard'; break;
      case 'submit-listing': route = '/vehicles/add'; break;
      default: route = '/';
    }

    if (dropdownItem && itemId !== 'home') {
      route += `?filter=${dropdownItem}`;
    }

    navigate(route);
    setDropdownOpen({});
    setMobileMenuOpen(false);
  };

  const getCurrentActiveTab = () => {
    const path = location.pathname;
    if (path === '/') return 'home';
    if (path.startsWith('/vehicles')) return 'listings';
    if (path.startsWith('/blog')) return 'blog';
    if (path.startsWith('/about-us')) return 'about';
    if (path.startsWith('/contact-us')) return 'contact';
    return '';
  };

  const activeTab = getCurrentActiveTab();
  const isCustomer = user?.role === 'customer';
  const isAdmin = user?.role === 'admin';
  const isDealer = user?.role === 'dealer';

  const navItems = [
    {
      id: 'home',
      label: 'Home',
      hasDropdown: isHomePage,
      dropdownItems: ['Browse by Type', 'Explore All Vehicles']
    },
    { id: 'listings', label: 'Vehicles' },
    { id: 'blog', label: 'Blog' },
    { id: 'about', label: 'About' },
    { id: 'contact', label: 'Contact' }
  ];

  if (isAdmin) navItems.push({ id: 'admin', label: 'Admin' });
  if (isDealer) navItems.push({ id: 'dealer-dashboard', label: 'Portal' });

  return (
    <div className="navbar-group">
      <nav className="navbar-main">
        <div className="navbar-container">
          {/* Logo */}
          <div className="navbar-logo-link" onClick={() => handleNavClick('home')}>
            <img src={Logo} alt="BOXCARS" className="logo-image" />
          </div>

          {/* Desktop Nav */}
          <div className="navbar-navigation">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    if (item.hasDropdown) toggleDropdown(item.id);
                    else handleNavClick(item.id);
                  }}
                  className={`nav-link-text ${activeTab === item.id ? 'active' : ''}`}
                >
                  {item.label}
                  {item.hasDropdown && (
                    <ChevronDown className={`nav-dropdown-icon ${dropdownOpen[item.id] ? 'rotated' : ''}`} />
                  )}
                </button>

                {item.hasDropdown && dropdownOpen[item.id] && (
                  <div className="dropdown-menu">
                    {item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleNavClick(item.id, dropdownItem);
                        }}
                      >
                        {dropdownItem}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Actions */}
          <div className="navbar-actions">
            {user ? (
              <div className="user-info-container">
                <User size={20} color="white" />
                <span className="user-name">{user?.firstName}</span>
                <button onClick={handleLogout} className="logout-button">Exit</button>
              </div>
            ) : (
              <div className="sign-in-container" onClick={() => navigate('/login')}>
                Sign In
              </div>
            )}

            {!isCustomer && (
              <button
                className="submit-listing-button"
                onClick={() => handleNavClick('submit-listing')}
              >
                + Submit Listing
              </button>
            )}
          </div>

          {/* Mobile Toggle */}
          <button className="mobile-menu-toggle" onClick={toggleMobileMenu}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${mobileMenuOpen ? 'active' : ''}`}>
        <div className="mobile-menu-content">
          {navItems.map((item) => (
            <div key={item.id}>
              <button
                className="mobile-nav-link"
                onClick={() => item.hasDropdown ? toggleDropdown(item.id) : handleNavClick(item.id)}
              >
                {item.label}
              </button>
              {item.hasDropdown && dropdownOpen[item.id] && (
                <div style={{ paddingLeft: 20 }}>
                  {item.dropdownItems.map(subItem => (
                    <div key={subItem} onClick={() => handleNavClick(item.id, subItem)} style={{ padding: 10, color: '#666' }}>
                      {subItem}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
