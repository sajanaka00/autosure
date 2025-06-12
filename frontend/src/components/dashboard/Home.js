// import { User } from 'lucide-react';
// import '../../styles/home.css';

// export default function Home({ user }) {
//   const getRoleClass = (role) => {
//     switch (role) {
//       case 'admin': return 'badge-admin';
//       case 'dealer': return 'badge-dealer';
//       default: return 'badge-customer';
//     }
//   };

//   return (
//     <div className="home-container">
//       <div className="welcome-section">
//         <div className="welcome-avatar">
//           <User className="avatar-icon" />
//         </div>
//         <h2 className="welcome-title">Welcome, {user.firstName}!</h2>
//         <p className="welcome-subtitle">You're successfully logged in</p>

//         <div className="user-info-card">
//           <div className="user-info-item">
//             <p className="user-info-label">Name</p>
//             <p className="user-info-value">{user.firstName} {user.lastName}</p>
//           </div>

//           <div className="user-info-item">
//             <p className="user-info-label">Email</p>
//             <p className="user-info-value">{user.email}</p>
//           </div>

//           {user.phone && (
//             <div className="user-info-item">
//               <p className="user-info-label">Phone</p>
//               <p className="user-info-value">{user.phone}</p>
//             </div>
//           )}

//           <div className="user-info-item">
//             <p className="user-info-label">Role</p>
//             <span className={`status-badge ${getRoleClass(user.role)}`}>
//               {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
//             </span>
//           </div>

//           <div className="user-info-item">
//             <p className="user-info-label">Account Status</p>
//             <span className={`status-badge ${user.isVerified ? 'badge-verified' : 'badge-pending'}`}>
//               {user.isVerified ? 'Verified' : 'Pending Verification'}
//             </span>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

import { Search, Car, ShieldCheck } from 'lucide-react';
import '../../styles/home.css';

export default function Home() {
  return (
    <div className="home-container">

      {/* Hero Section */}
      <div className="hero-section">
        <div className="hero-overlay">
          <h1 className="hero-title">Find Your Perfect Car</h1>
          <p className="hero-subtitle">Find cars for sale and for rent near you</p>

          {/* Filter Bar */}
          <div className="filter-bar">
            <select className="filter-select"><option>Any Makes</option></select>
            <select className="filter-select"><option>Any Models</option></select>
            <select className="filter-select"><option>All Prices</option></select>
            <button className="search-btn"><Search size={16} /> Search Cars</button>
          </div>

          {/* Car Type Navigation */}
          <div className="car-types">
            <button><Car size={16} /> SUV</button>
            <button><Car size={16} /> Sedan</button>
            <button><Car size={16} /> Hatchback</button>
            <button><Car size={16} /> Coupe</button>
            <button><ShieldCheck size={16} /> Hybrid</button>
          </div>
        </div>
      </div>

      {/* Premium Brands */}
      <section className="brands-section">
        <div className="brands-header">
          <h2>Explore Our Premium Brands</h2>
          <a href="#" className="show-all">Show All Brands →</a>
        </div>

        <div className="brands-list">
          <div className="brand-item">Audi</div>
          <div className="brand-item">BMW</div>
          <div className="brand-item">Ford</div>
          <div className="brand-item">Mercedes Benz</div>
          <div className="brand-item">Peugeot</div>
          <div className="brand-item">Volkswagen</div>
        </div>
      </section>
    </div>
  );
}
