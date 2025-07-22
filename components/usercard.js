// UserCard.js
import React from 'react';
import './usercard.css';

function UserCard({ user }) {
  return (
    <div className="card">
      <div className="card-left">
        <img src={user.profilePic} alt={user.name} className="profile-img" />
      </div>

      <div className="card-middle">
        <div className="user-name">{user.name}</div>

        <div className="skill-block">
          <span className="skill-label offered">Skills Offered:</span>
          <span>{user.skillsOffered.join(', ')}</span>
        </div>

        <div className="skill-block">
          <span className="skill-label wanted">Skills Wanted:</span>
          <span>{user.skillsWanted.join(', ')}</span>
        </div>
      </div>

      <div className="card-right">
        <button className="swap-btn">Request Swap</button>
        <div className="rating">
          <i className="fas fa-star" />
          {user.rating || '4.8'}
        </div>
      </div>
    </div>
  );
}

export default UserCard;
