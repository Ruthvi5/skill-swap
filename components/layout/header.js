// Header.js
import React from 'react';
import './header.css';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/authcontext';
import { Users, MessageSquare, LogOut, User, Settings } from 'lucide-react';

function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="header-inner">
          <Link to="/" className="brand">
            <Users className="icon" />
            <span className="brand-title">Skill Swap</span>
          </Link>

          <nav className="nav">
            {user ? (
              <>
                <Link to="/requests" className="nav-link">
                  <MessageSquare className="icon-small" />
                  <span>Requests</span>
                  <span className="badge">3</span>
                </Link>

                <div className="profile-group">
                  <button className="profile-button">
                    <img
                      src={user.image || 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?w=40&h=40&fit=crop&crop=face'}
                      alt={user.name}
                      className="avatar"
                    />
                    <span className="user-name">{user.name}</span>
                  </button>

                  <div className="dropdown">
                    <Link to="/profile" className="dropdown-item">
                      <User className="icon-small" />
                      <span>My Profile</span>
                    </Link>
                    <Link to="/settings" className="dropdown-item">
                      <Settings className="icon-small" />
                      <span>Settings</span>
                    </Link>
                    <button onClick={handleLogout} className="dropdown-item logout-btn">
                      <LogOut className="icon-small" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <div className="auth-links">
                <Link to="/login" className="login-btn">Login</Link>
                <Link to="/register" className="signup-btn">Sign Up</Link>
              </div>
            )}
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
