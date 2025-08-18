import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import '../../styles/signupForm.css';

export default function SignupForm({ onSignup, onSwitchToLogin }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    role: 'customer'
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }
    
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');
    
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...userData } = formData;
      const response = await api.register(userData);
      
      tokenManager.setToken(response.token);
      tokenManager.setUser(response.user);
      
      // Call the onSignup callback with the user data
      onSignup?.(response.user);
    } catch (error) {
      setApiError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear specific field error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    
    // Clear API error when user makes changes
    if (apiError) setApiError('');
  };

  return (
    <div className="signup-container">
      <div className="signup-form">
        <div className="signup-header">
          <h2 className="signup-title">Create Account</h2>
          <p className="signup-subtitle">Sign up to get started</p>
        </div>

        {apiError && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <p className="error-text">{apiError}</p>
          </div>
        )}

        <div className="form-fields">
          <div className="field-row">
            <div className="field-group">
              <label className="field-label">First Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.firstName ? 'error' : ''}`}
                  placeholder="First name"
                />
              </div>
              {errors.firstName && (
                <p className="field-error">{errors.firstName}</p>
              )}
            </div>

            <div className="field-group">
              <label className="field-label">Last Name</label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`form-input ${errors.lastName ? 'error' : ''}`}
                  placeholder="Last name"
                />
              </div>
              {errors.lastName && (
                <p className="field-error">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Email Address</label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="field-error">{errors.email}</p>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Phone Number (Optional)</label>
            <div className="input-wrapper">
              <Phone className="input-icon" />
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className="form-input"
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Role</label>
            <div className="role-select-wrapper">
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="form-select"
              >
                <option value="customer">Customer</option>
                <option value="dealer">Dealer</option>
              </select>
            </div>
          </div>

          <div className="field-group">
            <label className="field-label">Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                className={`form-input password-input ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="password-toggle"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <p className="field-error">{errors.password}</p>
            )}
          </div>

          <div className="field-group">
            <label className="field-label">Confirm Password</label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                className={`form-input ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="field-error">{errors.confirmPassword}</p>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Creating Account...' : 'Sign Up'}
          </button>
        </div>

        <div className="form-footer">
          <p className="footer-text">
            Already have an account?{' '}
            <button
              onClick={onSwitchToLogin}
              className="footer-link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}