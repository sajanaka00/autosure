import { User, Car, Plus, List, LogOut, Home, ChevronDown, FileText, Phone, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { tokenManager } from '../../utils/tokenManager';
import '../../styles/navbar.css';

// export default function Navbar({ user, activeTab, onTabChange, onLogout }) {
//   const [dropdownOpen, setDropdownOpen] = useState({});

//   const handleLogout = () => {
//     tokenManager.removeToken();
//     tokenManager.removeUser();
//     onLogout();
//   };

//   const getRoleColor = (role) => {
//     switch (role) {
//       case 'admin': return 'role-admin';
//       case 'dealer': return 'role-dealer';
//       default: return 'role-user';
//     }
//   };

//   const toggleDropdown = (dropdown) => {
//     setDropdownOpen(prev => ({
//       ...prev,
//       [dropdown]: !prev[dropdown]
//     }));
//   };

//   // Navigation items based on user role
//   const getNavItems = () => {
//     const commonItems = [
//       { 
//         id: 'home', 
//         label: 'Home',
//         hasDropdown: true,
//         dropdownItems: ['Featured Cars', 'New Arrivals', 'Best Deals']
//       },
//       { 
//         id: 'vehicles', 
//         label: 'Vehicles',
//         hasDropdown: true,
//         dropdownItems: ['All Cars', 'By Brand', 'By Price', 'Advanced Search']
//       },
//       { 
//         id: 'news', 
//         label: 'News',
//         hasDropdown: true,
//         dropdownItems: ['Latest Posts', 'Car Reviews', 'Tips & Guides']
//       },
//       { id: 'contact', label: 'Contact' }
//     ];

//     if (user.role === 'admin') {
//       return [
//         ...commonItems.slice(0, 2), // Home, Vehicles
//         { id: 'add-vehicles', label: 'Add Vehicles' },
//         ...commonItems.slice(2) // News, Contact
//       ];
//     } else if (user.role === 'dealer') {
//       return commonItems;
//     } else {
//       // Regular user gets same items as dealer
//       return commonItems;
//     }
//   };

//   return (
//     <nav className="modern-navbar">
//       <div className="navbar-container">
//         <div className="navbar-content">
//           {/* Brand */}
//           <div className="navbar-brand">
//             <div className="phone-info">
//               <Phone className="phone-icon" />
//               <span className="phone-number">+75 123 456 789</span>
//             </div>
            
//             <div className="brand-logo">
//               <h1 className="brand-title">BOXCARS</h1>
//             </div>
//           </div>
          
//           {/* Navigation Links */}
//           <div className="nav-links">
//             {getNavItems().map((item) => (
//               <div key={item.id} className="nav-item">
//                 <button
//                   onClick={() => item.hasDropdown ? toggleDropdown(item.id) : onTabChange(item.id)}
//                   className={`nav-link ${activeTab === item.id ? 'nav-link-active' : ''}`}
//                 >
//                   <span>{item.label}</span>
//                   {item.hasDropdown && (
//                     <ChevronDown className={`chevron-icon ${dropdownOpen[item.id] ? 'chevron-rotated' : ''}`} />
//                   )}
//                 </button>
                
//                 {/* Dropdown Menu */}
//                 {item.hasDropdown && dropdownOpen[item.id] && (
//                   <div className="dropdown-menu">
//                     {item.dropdownItems.map((dropdownItem, index) => (
//                       <button
//                         key={index}
//                         className="dropdown-item"
//                         onClick={() => {
//                           onTabChange(`${item.id}-${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`);
//                           setDropdownOpen(prev => ({ ...prev, [item.id]: false }));
//                         }}
//                       >
//                         {dropdownItem}
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>
//             ))}
//           </div>
          
//           {/* Right Side Actions */}
//           <div className="nav-actions">
//             {/* User Info */}
//             <div className="user-info">
//               <User className="user-icon" />
//               <span className="user-name">{user?.firstName}</span>
//               <span className={`user-role ${getRoleColor(user?.role)}`}>
//                 {user?.role}
//               </span>
//             </div>
            
//             {/* Submit Listing Button */}
//             <button className="submit-listing-btn">
//               <Plus className="plus-icon" />
//               <span>Submit Listing</span>
//             </button>
            
//             {/* Mobile Menu Button */}
//             <button className="mobile-menu-btn">
//               <List className="list-icon" />
//             </button>
//           </div>
//         </div>
//       </div>
      
//       {/* Mobile Navigation */}
//       <div className="mobile-nav">
//         <div className="mobile-nav-content">
//           {getNavItems().map((item) => (
//             <button
//               key={item.id}
//               onClick={() => onTabChange(item.id)}
//               className={`mobile-nav-link ${activeTab === item.id ? 'mobile-nav-link-active' : ''}`}
//             >
//               {item.label}
//             </button>
//           ))}
          
//             <div className="mobile-user-section">
//               <div className="mobile-user-info">
//                 <div className="mobile-user-details">
//                   <User className="mobile-user-icon" />
//                   <span className="mobile-user-name">{user?.firstName}</span>
//                   <span className={`mobile-user-role ${getRoleColor(user?.role)}`}>
//                     {user?.role}
//                   </span>
//                 </div>
//                 <button onClick={handleLogout} className="mobile-logout-btn">
//                   <LogOut className="mobile-logout-icon" />
//                 </button>
//               </div>
//             </div>
//         </div>
//       </div>
//     </nav>
//   );
// }

export default function Navbar({ user, activeTab, onTabChange, onLogout }) {
  const [dropdownOpen, setDropdownOpen] = useState({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
            {/* <div className="mobile-phone-info">
              <Phone className="phone-icon" />
              <span className="phone-number">+75 123 456 789</span>
            </div> */}
            
            <div className="mobile-brand-center">
              <h1 className="brand-title">BOXCARS</h1>
            </div>
            
            <div className="mobile-actions">
              {/* <button className="submit-listing-btn-mobile">
                <Plus className="plus-icon" />
                <span>Submit Listing</span>
              </button> */}
              
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
                    onClick={() => item.hasDropdown ? toggleDropdown(item.id) : onTabChange(item.id)}
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
                      {item.dropdownItems.map((dropdownItem, index) => (
                        <button
                          key={index}
                          className="dropdown-item"
                          onClick={() => {
                            onTabChange(`${item.id}-${dropdownItem.toLowerCase().replace(/\s+/g, '-')}`);
                            setDropdownOpen(prev => ({ ...prev, [item.id]: false }));
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
                <button
                  key={item.id}
                  onClick={() => {
                    onTabChange(item.id);
                    setMobileMenuOpen(false);
                  }}
                  className={`mobile-nav-link ${activeTab === item.id ? 'mobile-nav-link-active' : ''}`}
                >
                  {item.label}
                </button>
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