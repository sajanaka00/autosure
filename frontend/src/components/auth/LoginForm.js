import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, AlertCircle } from 'lucide-react';
import { api } from '../../services/api';
import { tokenManager } from '../../utils/tokenManager';
import loginImage from '../../assets/images/login-bg.jpg'; // Dental office image
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
    <div className="login-page-wrapper">
      <div className="login-auth-container">
        <div className="login-auth-image-section">
          <img
            src={loginImage}
            alt="Login illustration"
            className="login-auth-image"
          />
        </div>

        <div className="login-auth-form">
          <div className="login-auth-header">
            <h2 className="login-auth-title">Welcome Back</h2>
            <p className="login-subtitle">Enter your credentials to access your account</p>
          </div>

          {apiError && (
            <div className="login-auth-error-alert">
              <AlertCircle className="login-auth-error-icon" />
              <p className="login-auth-error-text">{apiError}</p>
            </div>
          )}

          <div className="login-auth-form-fields">
            <div className="login-auth-field-row">
              <div className="login-auth-field-group">
                <label className="login-auth-field-label" htmlFor="email">Email</label>
                <div className="login-auth-input-wrapper">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`login-auth-form-input ${errors.email ? 'login-auth-input-error' : ''}`}
                    placeholder="name@example.com"
                  />
                  <Mail className="login-input-icon" />
                </div>
                {errors.email && <p className="login-auth-field-error-text">{errors.email}</p>}
              </div>

              <div className="login-auth-field-group">
                <label className="login-auth-field-label" htmlFor="password">Password</label>
                <div className="login-auth-input-wrapper">
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
                    className={`login-auth-form-input ${errors.password ? 'login-auth-input-error' : ''}`}
                    placeholder="••••••••"
                  />
                  <Lock className="login-input-icon" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="login-auth-password-toggle"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <p className="login-auth-field-error-text">{errors.password}</p>}
              </div>
            </div>

            <button
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="login-auth-submit-button"
            >
              {isLoading ? 'SIGNING IN...' : 'SIGN IN'}
            </button>
          </div>

          <div className="login-auth-form-footer">
            <p className="login-auth-footer-text">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={onSwitchToSignup}
                className="login-auth-footer-link"
              >
                Create Account
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}