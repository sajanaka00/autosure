import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
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
    <div className="login-container">
      <div className="login-form">
        <div className="login-header">
          <h2 className="login-title">Welcome Back</h2>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {apiError && (
          <div className="error-alert">
            <AlertCircle className="error-icon" />
            <p className="error-text">{apiError}</p>
          </div>
        )}

        <div className="form-fields">
          <div className="field-group">
            <label className="field-label" htmlFor="email">
              Email Address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                type="email"
                id="email"
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
            <label className="field-label" htmlFor="password">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
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

          <button
            type="button"
            onClick={handleSubmit}
            disabled={isLoading}
            className="submit-button"
          >
            {isLoading ? 'Logging in...' : 'Sign In'}
          </button>
        </div>

        <div className="form-footer">
          <p className="footer-text">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={onSwitchToSignup}
              className="footer-link"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}