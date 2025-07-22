import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  Star,
  MapPin,
  Gift,
  Search,
  Calendar,
  MessageSquare,
  Handshake
} from 'lucide-react';
import { mockUsers } from '../data/mockdata';
import { useAuth } from '../contexts/authcontext';
import '../styles/userprofile.css'

const UserProfile = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user: currentUser } = useAuth();

  const user = mockUsers.find((u) => u.id === id);

  if (!user) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">User not found</h2>
          <button onClick={() => navigate('/')} className="text-indigo-600 hover:text-indigo-500">
            Return to home
          </button>
        </div>
      </div>
    );
  }

  const handleRequestSwap = () => {
    if (!currentUser) {
      alert('Please log in to request a skill swap.');
      navigate('/login');
      return;
    }
    alert(`Swap request sent to ${user.name}!`);
  };

  const handleMessage = () => {
    if (!currentUser) {
      alert('Please log in to send a message.');
      navigate('/login');
      return;
    }
    alert(`Opening chat with ${user.name}...`);
  };

  return (
    <div className="user-profile-container">
      <div className="user-profile-header">
        <button onClick={() => navigate(-1)} className="back-button">
          <ArrowLeft className="icon" />
          <span>Back</span>
        </button>
        <div className="user-profile-main">
          <div className="user-image-section">
            <img src={user.image} alt={user.name} className="profile-image" />
            <div className="online-indicator"></div>
          </div>
          <div className="user-details">
            <h1 className="user-name">{user.name}</h1>
            <p className="user-title">{user.title}</p>
            <div className="location-rating">
              <div className="location">
                <MapPin className="icon" />
                <span>{user.location}</span>
              </div>
              <div className="rating">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={
                      i < Math.floor(user.rating) ? 'star filled' : 'star empty'
                    }
                  />
                ))}
                <span className="rating-score">{user.rating.toFixed(1)}</span>
                <span className="review-count">({user.reviews} reviews)</span>
              </div>
            </div>
          </div>
          <div className="action-buttons">
            <button onClick={handleRequestSwap} className="request-button">
              <Handshake className="icon" />
              <span>Request Swap</span>
            </button>
            <button onClick={handleMessage} className="message-button">
              <MessageSquare className="icon" />
              <span>Message</span>
            </button>
          </div>
        </div>
      </div>

      <div className="user-profile-content">
        <div className="main-section">
          <section className="about-section">
            <h2>About</h2>
            <p>{user.about}</p>
          </section>

          <section className="skills-section">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skills-offered">
                <h3><Gift className="icon" /> Skills Offered</h3>
                <div className="skills-list">
                  {user.skillsOffered.map((skill, index) => (
                    <span key={index} className="skill-badge green">{skill}</span>
                  ))}
                </div>
              </div>
              <div className="skills-wanted">
                <h3><Search className="icon" /> Skills Wanted</h3>
                <div className="skills-list">
                  {user.skillsWanted.map((skill, index) => (
                    <span key={index} className="skill-badge blue">{skill}</span>
                  ))}
                </div>
              </div>
            </div>
          </section>

          <section className="availability-section">
            <h2><Calendar className="icon" /> Availability</h2>
            <div className="availability-list">
              {user.availability.map((time, index) => (
                <span key={index} className="availability-item">{time}</span>
              ))}
            </div>
          </section>
        </div>

        <aside className="sidebar">
          <div className="stats-section">
            <h3>Statistics</h3>
            <div className="stat-item">
              <span>Skills Taught</span>
              <strong>{user.stats.taught}</strong>
            </div>
            <div className="stat-item">
              <span>Skills Learned</span>
              <strong>{user.stats.learned}</strong>
            </div>
            <div className="stat-item">
              <span>Total Reviews</span>
              <strong>{user.stats.reviews}</strong>
            </div>
          </div>

          <div className="activity-section">
            <h3>Recent Activity</h3>
            <div className="activity-item">
              <Gift className="icon green" />
              <div>
                <p>Taught UI/UX Design</p>
                <small>2 days ago</small>
              </div>
            </div>
            <div className="activity-item">
              <Search className="icon blue" />
              <div>
                <p>Learned React Development</p>
                <small>1 week ago</small>
              </div>
            </div>
            <div className="activity-item">
              <Handshake className="icon purple" />
              <div>
                <p>Completed skill swap</p>
                <small>2 weeks ago</small>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default UserProfile;
