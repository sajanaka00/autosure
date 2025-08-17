import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import signupImage from '../../assets/images/cars/bmwx1.jpg'; // Signup image
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');
    
    console.log('Attempting signup with:', { email: formData.email });
    
    try {
      // Remove confirmPassword before sending to backend
      const { confirmPassword, ...userData } = formData;
      const response = await api.register(userData);
      
      console.log('Signup response:', response);
      
      tokenManager.setToken(response.token);
      tokenManager.setUser(response.user);
      
      if (onSignup) {
        onSignup(response.user);
      }
    } catch (error) {
      console.error('Signup error:', error);
      setApiError(error.message || 'Signup failed');
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
    
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
    if (apiError) setApiError('');
  };

  return (
    <div className="auth-signup-container">
      <div className="auth-signup-form">
        <div className="auth-signup-header">
          <h2 className="auth-signup-title">Create Your Account</h2>
        </div>

        {apiError && (
          <div className="auth-signup-error-alert">
            <AlertCircle className="auth-signup-error-icon" />
            <p className="auth-signup-error-text">{apiError}</p>
          </div>
        )}

        <div className="auth-signup-form-fields">
          <div className="auth-signup-field-row">
            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="firstName">
                First Name
              </label>
              <div className="auth-signup-input-wrapper">
                <User className="auth-signup-input-icon" />
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className={`auth-signup-form-input ${errors.firstName ? 'auth-signup-input-error' : ''}`}
                  placeholder="First name"
                />
              </div>
              {errors.firstName && (
                <div className="auth-signup-field-error">
                  <AlertCircle className="auth-signup-error-icon-small" />
                  <p className="auth-signup-field-error-text">{errors.firstName}</p>
                </div>
              )}
            </div>

            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="lastName">
                Last Name
              </label>
              <div className="auth-signup-input-wrapper">
                <User className="auth-signup-input-icon" />
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className={`auth-signup-form-input ${errors.lastName ? 'auth-signup-input-error' : ''}`}
                  placeholder="Last name"
                />
              </div>
              {errors.lastName && (
                <div className="auth-signup-field-error">
                  <AlertCircle className="auth-signup-error-icon-small" />
                  <p className="auth-signup-field-error-text">{errors.lastName}</p>
                </div>
              )}
            </div>
          </div>

          <div className="auth-signup-field-row">
            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="email">
                Email Address
              </label>
              <div className="auth-signup-input-wrapper">
                <Mail className="auth-signup-input-icon" />
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className={`auth-signup-form-input ${errors.email ? 'auth-signup-input-error' : ''}`}
                  placeholder="Enter your email"
                />
              </div>
              {errors.email && (
                <div className="auth-signup-field-error">
                  <AlertCircle className="auth-signup-error-icon-small" />
                  <p className="auth-signup-field-error-text">{errors.email}</p>
                </div>
              )}
            </div>

            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="phone">
                Phone Number (Optional)
              </label>
              <div className="auth-signup-input-wrapper">
                <Phone className="auth-signup-input-icon" />
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="auth-signup-form-input"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>

          <div className="auth-signup-field-row">
            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="password">
                Password
              </label>
              <div className="auth-signup-input-wrapper auth-signup-password-wrapper">
                <Lock className="auth-signup-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className={`auth-signup-form-input auth-signup-password-input ${errors.password ? 'auth-signup-input-error' : ''}`}
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="auth-signup-password-toggle"
                >
                  {showPassword ? <EyeOff /> : <Eye />}
                </button>
              </div>
              {errors.password && (
                <div className="auth-signup-field-error">
                  <AlertCircle className="auth-signup-error-icon-small" />
                  <p className="auth-signup-field-error-text">{errors.password}</p>
                </div>
              )}
            </div>

            <div className="auth-signup-field-group">
              <label className="auth-signup-field-label" htmlFor="confirmPassword">
                Confirm Password
              </label>
              <div className="auth-signup-input-wrapper">
                <Lock className="auth-signup-input-icon" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="confirmPassword"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      handleSubmit(e);
                    }
                  }}
                  className={`auth-signup-form-input ${errors.confirmPassword ? 'auth-signup-input-error' : ''}`}
                  placeholder="Confirm your password"
                />
              </div>
              {errors.confirmPassword && (
                <div className="auth-signup-field-error">
                  <AlertCircle className="auth-signup-error-icon-small" />
                  <p className="auth-signup-field-error-text">{errors.confirmPassword}</p>
                </div>
              )}
            </div>
          </div>

          <div className="auth-signup-field-group">
            <label className="auth-signup-field-label">Role</label>
            <div className="auth-signup-radio-group">
              <label className="auth-signup-radio-option">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={formData.role === 'customer'}
                  onChange={handleInputChange}
                  className="auth-signup-radio-input"
                />
                <span className="auth-signup-radio-custom"></span>
                <span className="auth-signup-radio-label">Customer</span>
              </label>
              <label className="auth-signup-radio-option">
                <input
                  type="radio"
                  name="role"
                  value="dealer"
                  checked={formData.role === 'dealer'}
                  onChange={handleInputChange}
                  className="auth-signup-radio-input"
                />
                <span className="auth-signup-radio-custom"></span>
                <span className="auth-signup-radio-label">Dealer</span>
              </label>
            </div>
          </div>
          
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="auth-signup-submit-button"
          >
            {isLoading ? 'Creating Account...' : 'SIGN UP'}
          </button>
        </div>

        <div className="auth-signup-form-footer">
          <p className="auth-signup-footer-text">
            Already have an account?
            <button
              type="button"
              onClick={onSwitchToLogin}
              className="auth-signup-footer-link"
            >
              Sign in
            </button>
          </p>
        </div>
      </div>

      <div className="auth-signup-image-section">
        <img 
          src={signupImage} 
          alt="Signup illustration" 
          className="auth-signup-image"
        />
      </div>
    </div>
  );
}