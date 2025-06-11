import { User } from 'lucide-react';
import '../../styles/home.css';

export default function Home({ user }) {
  const getRoleClass = (role) => {
    switch (role) {
      case 'admin': return 'badge-admin';
      case 'dealer': return 'badge-dealer';
      default: return 'badge-customer';
    }
  };

  return (
    <div className="home-container">
      <div className="welcome-section">
        <div className="welcome-avatar">
          <User className="avatar-icon" />
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
    </div>
  );
}