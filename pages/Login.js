// Login.js
import React, { useState } from 'react';
import '../styles/login.css';
import { useNavigate, Link } from 'react-router-dom';
import { Eye, EyeOff, Mail, Lock, Users } from 'lucide-react';
import {useAuth} from '../contexts/authcontext';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="login-header">
          <Link to="/" className="logo-link">
            <Users className="logo-icon" />
            <span className="logo-text">Skill Swap</span>
          </Link>
          <h2>Welcome back</h2>
          <p>Sign in to your account to continue learning and teaching</p>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          {error && <div className="error-box">{error}</div>}

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <div className="input-icon">
              <Mail className="icon" />
              <input
                id="email"
                type="email"
                value={email}
                required
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <div className="input-icon">
              <Lock className="icon" />
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                required
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="toggle-password"
              >
                {showPassword ? <EyeOff className="icon" /> : <Eye className="icon" />}
              </button>
            </div>
          </div>

          <div className="form-options">
            <label className="remember-label">
              <input type="checkbox" /> Remember me
            </label>
            <Link to="/forgot-password" className="link">Forgot password?</Link>
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isLoading}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="form-footer">
          <p>Don't have an account? <Link to="/register" className="link">Sign up here</Link></p>
        </div>

        <div className="demo-box">
          <strong>Demo Credentials:</strong>
          <p>Email: demo@example.com | Password: any password</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
