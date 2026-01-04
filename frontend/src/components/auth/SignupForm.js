import { useState } from 'react';
import { Eye, EyeOff, User, Mail, Lock, Phone, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import signupImage from '../../assets/images/signup-bg.jpg'; // Signup image
import './SignupForm.css';

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
    if (e) e.preventDefault();

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
    <div className="signup-page-wrapper">
      <div className="signup-auth-container">
        <div className="signup-auth-form">
          <div className="signup-auth-header">
            <h2 className="signup-auth-title">Create Account</h2>
            <p className="signup-subtitle">Join us to explore the best auto deals</p>
          </div>

          {apiError && (
            <div className="signup-auth-error-alert">
              <AlertCircle className="signup-auth-error-icon" />
              <p className="signup-auth-error-text">{apiError}</p>
            </div>
          )}

          <div className="signup-auth-form-fields">
            <div className="signup-auth-field-row">
              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="firstName">First Name</label>
                <div className="signup-auth-input-wrapper">
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className={`signup-auth-form-input ${errors.firstName ? 'signup-auth-input-error' : ''}`}
                    placeholder="John"
                  />
                  <User className="signup-auth-input-icon" />
                </div>
                {errors.firstName && <p className="signup-auth-field-error-text">{errors.firstName}</p>}
              </div>

              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="lastName">Last Name</label>
                <div className="signup-auth-input-wrapper">
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className={`signup-auth-form-input ${errors.lastName ? 'signup-auth-input-error' : ''}`}
                    placeholder="Doe"
                  />
                  <User className="signup-auth-input-icon" />
                </div>
                {errors.lastName && <p className="signup-auth-field-error-text">{errors.lastName}</p>}
              </div>
            </div>

            <div className="signup-auth-field-row">
              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="email">Email</label>
                <div className="signup-auth-input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`signup-auth-form-input ${errors.email ? 'signup-auth-input-error' : ''}`}
                    placeholder="name@example.com"
                  />
                  <Mail className="signup-auth-input-icon" />
                </div>
                {errors.email && <p className="signup-auth-field-error-text">{errors.email}</p>}
              </div>

              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="phone">Phone</label>
                <div className="signup-auth-input-wrapper">
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="signup-auth-form-input"
                    placeholder="+1 234 567 890"
                  />
                  <Phone className="signup-auth-input-icon" />
                </div>
              </div>
            </div>

            <div className="signup-auth-field-row">
              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="password">Password</label>
                <div className="signup-auth-input-wrapper">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className={`signup-auth-form-input ${errors.password ? 'signup-auth-input-error' : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="signup-auth-input-icon" />
                </div>
                {errors.password && <p className="signup-auth-field-error-text">{errors.password}</p>}
              </div>

              <div className="signup-auth-field-group">
                <label className="signup-auth-field-label" htmlFor="confirmPassword">Confirm</label>
                <div className="signup-auth-input-wrapper">
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
                    className={`signup-auth-form-input ${errors.confirmPassword ? 'signup-auth-input-error' : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="signup-auth-input-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="signup-auth-password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.confirmPassword && <p className="signup-auth-field-error-text">{errors.confirmPassword}</p>}
              </div>
            </div>

            <div className="signup-auth-field-group">
              <label className="signup-auth-field-label">I am a</label>
              <div className="signup-auth-radio-group">
                <label className="signup-auth-radio-option">
                  <input
                    type="radio"
                    name="role"
                    value="customer"
                    checked={formData.role === 'customer'}
                    onChange={handleInputChange}
                    className="signup-auth-radio-input"
                  />
                  <span className="signup-auth-radio-custom"></span>
                  <span className="signup-auth-radio-label">Customer</span>
                </label>
                <label className="signup-auth-radio-option">
                  <input
                    type="radio"
                    name="role"
                    value="dealer"
                    checked={formData.role === 'dealer'}
                    onChange={handleInputChange}
                    className="signup-auth-radio-input"
                  />
                  <span className="signup-auth-radio-custom"></span>
                  <span className="signup-auth-radio-label">Dealer</span>
                </label>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="signup-auth-submit-button"
            >
              {isLoading ? 'Creating Account...' : 'SIGN UP'}
            </button>
          </div>

          <div className="signup-auth-form-footer">
            <p className="signup-auth-footer-text">
              Already have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToLogin}
                className="signup-auth-footer-link"
              >
                Sign in
              </button>
            </p>
          </div>
        </div>

        <div className="signup-auth-image-section">
          <img
            src={signupImage}
            alt="Signup illustration"
            className="signup-auth-image"
          />
        </div>
      </div>
    </div>
  );
}