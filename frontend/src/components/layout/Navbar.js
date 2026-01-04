import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { tokenManager } from '../../utils/tokenManager';
import { User, Menu, X, ChevronDown } from 'lucide-react';
import Logo from '../../assets/images/vectors/logo.png'
import './Navbar.css';

export default function Navbar({ user, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [nearFooter, setNearFooter] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Check if current page is home page
  const isHomePage = location.pathname === '/';

  // Add/remove home-page class to body for navbar styling
  useEffect(() => {
    if (isHomePage) {
      document.body.classList.add('home-page');
    } else {
      document.body.classList.remove('home-page');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('home-page');
    };
  }, [isHomePage]);

  // Smart footer detection and curved section management
  useEffect(() => {
    const handleScroll = () => {
      const footer = document.querySelector('footer, .footer, .site-footer');
      const navbar = document.querySelector('.navbar-group');

      if (footer && navbar) {
        const footerRect = footer.getBoundingClientRect();
        const navbarHeight = 130; // Total navbar + curve height

        // Check if footer is near the top of the viewport
        const isNearFooter = footerRect.top <= navbarHeight;

        setNearFooter(isNearFooter);

        // Add/remove class to navbar for styling
        if (isNearFooter) {
          navbar.classList.add('near-footer');
        } else {
          navbar.classList.remove('near-footer');
        }

        // Alternative approach: Check footer background color and add class to body
        const footerStyle = window.getComputedStyle(footer);
        const footerBg = footerStyle.backgroundColor;

        // If footer has dark background, add class to body
        if (isDarkColor(footerBg) && isNearFooter) {
          document.body.classList.add('has-dark-footer');
        } else {
          document.body.classList.remove('has-dark-footer');
        }
      }
    };

    // Helper function to detect if a color is dark
    const isDarkColor = (color) => {
      // Convert rgb/rgba to check brightness
      const rgb = color.match(/\d+/g);
      if (rgb) {
        const brightness = (parseInt(rgb[0]) * 299 + parseInt(rgb[1]) * 587 + parseInt(rgb[2]) * 114) / 1000;
        return brightness < 128; // Dark if brightness is less than 128
      }
      // Check for common dark color keywords
      return ['black', 'dark', 'navy', 'darkblue', 'darkgreen', 'darkred'].some(darkColor =>
        color.toLowerCase().includes(darkColor)
      );
    };

    // Add scroll listener
    window.addEventListener('scroll', handleScroll);
    // Initial check
    handleScroll();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.classList.remove('has-dark-footer');
      const navbar = document.querySelector('.navbar-group');
      if (navbar) {
        navbar.classList.remove('near-footer');
      }
    };
  }, [location.pathname]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.nav-item')) {
        setDropdownOpen({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
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
      if (prev[dropdown]) {
        return {};
      }
      return { [dropdown]: true };
    });
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
    setDropdownOpen({});
  };

  const scrollToSection = (sectionId) => {
    if (isHomePage) {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    } else {
      navigate(`/#${sectionId}`);
    }

    setDropdownOpen({});
    setMobileMenuOpen(false);
  };

  const handleNavClick = (itemId, dropdownItem = null) => {
    let route = '/';

    if (itemId === 'home' && dropdownItem) {
      const sectionMap = {
        'Browse by Type': 'browse-by-type',
        'Get Fair Price': 'get-fair-price',
        'Why Choose Us': 'why-choose-us',
        'Explore All Vehicles': 'explore-vehicles',
        'Testimonials': 'testimonials'
      };

      const sectionId = sectionMap[dropdownItem];
      if (sectionId) {
        scrollToSection(sectionId);
        return;
      }
    }

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
        route = '/about-us';
        break;
      case 'contact':
        route = '/contact-us';
        break;
      case 'admin':
        route = '/admin';
        break;
      case 'dealer-dashboard':
        route = '/dealer-dashboard';
        break;
      case 'submit-listing':
        route = '/vehicles/add';
        break;
      default:
        route = '/';
    }

    if (dropdownItem && itemId !== 'home') {
      const queryParam = dropdownItem.toLowerCase().replace(/\s+/g, '-');
      route += `?category=${queryParam}`;
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
    if (path.startsWith('/pages')) return 'pages';
    if (path.startsWith('/about-us')) return 'about';
    if (path.startsWith('/contact-us')) return 'contact';
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
        hasDropdown: isHomePage,
        dropdownItems: isHomePage ? ['Browse by Type', 'Get Fair Price', 'Why Choose Us', 'Explore All Vehicles', 'Testimonials'] : []
      },
      {
        id: 'listings',
        label: 'Vehicles',
      },
      { id: 'blog', label: 'Blog' },
      { id: 'about', label: 'About Us' },
      { id: 'contact', label: 'Contact Us' }
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
    <div className={`navbar-group ${nearFooter ? 'near-footer' : ''}`}>
      {!isHomePage && (
        <div className="curved-background">
          <div className="white-curved-overlay"></div>
        </div>
      )}

      <nav className="navbar-main">
        <div className="navbar-container">
          <div className="navbar-logo-link" onClick={() => handleNavClick('home')}>
            <div className="navbar-logo">
              <div className="logo-container">
                <img src={Logo} alt="BOXCARS" className="logo-image" />
              </div>
            </div>
          </div>

          <div className="navbar-navigation">
            {navItems.map((item) => (
              <div key={item.id} className="nav-item">
                <div className="nav-link-wrapper">
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
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
                  <div className="dropdown-menu">
                    {item.dropdownItems && item.dropdownItems.map((dropdownItem, index) => (
                      <button
                        key={index}
                        className="dropdown-item"
                        onClick={(e) => {
                          e.preventDefault();
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

          <div className="navbar-actions">
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

            {!isCustomer && (
              <button
                className="submit-listing-button"
                onClick={() => handleNavClick('submit-listing')}
              >
                <span className="submit-listing-text">Submit Listing</span>
              </button>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

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
