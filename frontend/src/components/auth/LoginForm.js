import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import loginImage from '../../assets/images/login-bg1.jpg'; // Dental office image
import '../../styles/loginForm.css';

export default function LoginForm({ onLogin, onSwitchToSignup }) {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState('');

  const validateForm = () => {
    const newErrors = {};
    
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
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    setApiError('');
    
    console.log('Attempting login with:', { email: formData.email });
    
    try {
      const response = await api.login(formData);
      console.log('Login response:', response);
      
      tokenManager.setToken(response.token);
      tokenManager.setUser(response.user);
      
      if (onLogin) {
        onLogin(response.user);
      }
    } catch (error) {
      console.error('Login error:', error);
      setApiError(error.message || 'Login failed');
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
    <div className="auth-login-container">
      <div className="auth-login-image-section">
        <img 
          src={loginImage} 
          alt="Login illustration" 
          className="auth-login-image"
        />
      </div>
      
      <div className="auth-login-form">
        <div className="auth-login-header">
          <h2 className="auth-login-title">Sign in to your Account</h2>
        </div>

        {apiError && (
          <div className="auth-error-alert">
            <AlertCircle className="auth-error-icon" />
            <p className="auth-error-text">{apiError}</p>
          </div>
        )}

        <div className="auth-form-fields">
          <div className="auth-field-group">
            <label className="auth-field-label" htmlFor="email">
              Username
            </label>
            <div className="auth-input-wrapper">
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`auth-form-input ${errors.email ? 'auth-input-error' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <div className="auth-field-error">
                <AlertCircle className="auth-error-icon-small" />
                <p className="auth-field-error-text">{errors.email}</p>
              </div>
            )}
          </div>

          <div className="auth-field-group">
            <label className="auth-field-label" htmlFor="password">
              Password
            </label>
            <div className="auth-input-wrapper auth-password-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleSubmit(e);
                  }
                }}
                className={`auth-form-input auth-password-input ${errors.password ? 'auth-input-error' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="auth-password-toggle"
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>
            {errors.password && (
              <div className="auth-field-error">
                <AlertCircle className="auth-error-icon-small" />
                <p className="auth-field-error-text">{errors.password}</p>
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="auth-submit-button"
          >
            {isLoading ? 'Logging in...' : 'LOGIN'}
          </button>
        </div>

        <div className="auth-form-footer">
          <p className="auth-footer-text">
            Do you have an Account?
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="auth-footer-link"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}