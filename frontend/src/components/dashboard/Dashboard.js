import { User, Car, Plus, List, Home } from 'lucide-react';
import { useState } from 'react';
import Navbar from '../common/Navbar';
import '../../styles/dashboard.css';

export default function Dashboard({ user, onLogout }) {
  const [activeTab, setActiveTab] = useState('home');

  const getRoleClass = (role) => {
    switch (role) {
      case 'admin': return 'badge-admin';
      case 'dealer': return 'badge-dealer';
      default: return 'badge-customer';
    }
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'home':
        return (
          <div className="welcome-section">
            <div className="welcome-avatar">
              <User className="w-10 h-10 text-white" />
            </div>
            <h2 className="welcome-title">Welcome, {user.firstName}!</h2>
            <p className="welcome-subtitle">You're successfully logged in</p>

            <div className="user-info-card">
              <div className="user-info-item">
                <p className="user-info-label">Name</p>
                <p className="user-info-value">{user.firstName} {user.lastName}</p>
              </div>

              <div className="user-info-item">
                <p className="user-info-label">Email</p>
                <p className="user-info-value">{user.email}</p>
              </div>

              {user.phone && (
                <div className="user-info-item">
                  <p className="user-info-label">Phone</p>
                  <p className="user-info-value">{user.phone}</p>
                </div>
              )}

              <div className="user-info-item">
                <p className="user-info-label">Role</p>
                <span className={`status-badge ${getRoleClass(user.role)}`}>
                  {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                </span>
              </div>

              <div className="user-info-item">
                <p className="user-info-label">Account Status</p>
                <span className={`status-badge ${user.isVerified ? 'badge-verified' : 'badge-pending'}`}>
                  {user.isVerified ? 'Verified' : 'Pending Verification'}
                </span>
              </div>
            </div>
          </div>
        );

      case 'browse':
        return (
          <div className="fade-in">
            <h2 className="page-title">Browse Cars</h2>
            <div className="car-grid">
              {[1, 2, 3, 4, 5, 6].map((car) => (
                <div key={car} className="car-card">
                  <div className="car-image-placeholder">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="car-details">
                    <h3 className="car-title">Sample Car {car}</h3>
                    <p className="car-specs">2023 Model • Automatic</p>
                    <p className="car-price">$25,000</p>
                    <button className="btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'cars':
        return (
          <div className="fade-in">
            <h2 className="page-title">My Cars</h2>
            <div className="car-grid">
              {[1, 2, 3].map((car) => (
                <div key={car} className="car-card">
                  <div className="car-image-placeholder">
                    <Car className="w-16 h-16 text-gray-400" />
                  </div>
                  <div className="car-details">
                    <h3 className="car-title">My Car {car}</h3>
                    <p className="car-specs">2023 Model • Automatic</p>
                    <p className="car-price">$25,000</p>
                    <div className="btn-group">
                      <button className="btn-secondary">
                        Edit
                      </button>
                      <button className="btn-danger">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 'add-car':
        return (
          <div className="fade-in">
            <h2 className="page-title">Add New Car</h2>
            <div className="form-container">
              <form className="form-group">
                <div className="form-group">
                  <label className="form-label">Car Make</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-group">
                  <label className="form-label">Car Model</label>
                  <input type="text" className="form-input" />
                </div>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">Year</label>
                    <input type="number" className="form-input" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-input" />
                  </div>
                </div>
                <div className="form-group">
                  <label className="form-label">Description</label>
                  <textarea className="form-textarea"></textarea>
                </div>
                <button type="submit" className="btn-secondary">
                  Add Car
                </button>
              </form>
            </div>
          </div>
        );

      case 'orders':
        return (
          <div className="fade-in">
            <h2 className="page-title">Orders</h2>
            <div className="table-container">
              <table className="table">
                <thead className="table-header">
                  <tr>
                    <th>Order ID</th>
                    <th>Car</th>
                    <th>Customer</th>
                    <th>Status</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody className="table-body">
                  {[1, 2, 3].map((order) => (
                    <tr key={order}>
                      <td className="user-info-value">#ORD00{order}</td>
                      <td>Sample Car {order}</td>
                      <td>Customer {order}</td>
                      <td>
                        <span className="status-badge badge-verified">
                          Completed
                        </span>
                      </td>
                      <td className="user-info-value">$25,000</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );

      case 'my-orders':
        return (
          <div className="fade-in">
            <h2 className="page-title">My Orders</h2>
            <div>
              {[1, 2].map((order) => (
                <div key={order} className="order-card">
                  <div className="order-header">
                    <div>
                      <h3 className="order-title">Order #ORD00{order}</h3>
                      <p className="order-details">Sample Car {order} • 2023 Model</p>
                    </div>
                    <span className="status-badge badge-customer">
                      Processing
                    </span>
                  </div>
                  <div className="order-footer">
                    <p className="order-price">$25,000</p>
                    <button className="btn-primary">
                      View Details
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return (
          <div className="welcome-section">
            <p className="welcome-subtitle">Page not found</p>
          </div>
        );
    }
  };

  return (
    <div className="dashboard-container">
      <Navbar 
        user={user} 
        activeTab={activeTab} 
        onTabChange={setActiveTab} 
        onLogout={onLogout} 
      />

      <main className="dashboard-main">
        {renderContent()}
      </main>
    </div>
  );
}