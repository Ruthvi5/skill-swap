// SwapRequests.js
import React, { useState } from 'react';
import {
  MessageSquare,
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  ArrowRight,
} from 'lucide-react';
import { mockSwapRequests } from '../data/mockdata';
import '../styles/swaprequests.css';

const SwapRequests = () => {
  const [filter, setFilter] = useState('all');
  const [requests] = useState(mockSwapRequests);

  const filteredRequests =
    filter === 'all' ? requests : requests.filter((r) => r.status === filter);

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending':
        return <Clock className="status-icon yellow" />;
      case 'accepted':
        return <CheckCircle className="status-icon green" />;
      case 'rejected':
        return <XCircle className="status-icon red" />;
      default:
        return <Clock className="status-icon gray" />;
    }
  };

  const handleAccept = (id) => {
    alert(`Accepted swap request ${id}`);
  };

  const handleReject = (id) => {
    alert(`Rejected swap request ${id}`);
  };

  const handleMessage = (name) => {
    alert(`Opening chat with ${name}...`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diff = Math.ceil((now - date) / (1000 * 60 * 60 * 24));
    if (diff === 1) return '1 day ago';
    if (diff < 7) return `${diff} days ago`;
    if (diff < 14) return '1 week ago';
    return `${Math.floor(diff / 7)} weeks ago`;
  };

  return (
    <div className="swap-requests-page">
      <div className="container">
        <h1 className="page-title">
          <MessageSquare className="icon" /> Swap Requests
        </h1>
        <div className="filters">
          {['all', 'pending', 'accepted', 'rejected'].map((key) => (
            <button
              key={key}
              className={`filter-tab ${filter === key ? 'active' : ''}`}
              onClick={() => setFilter(key)}
            >
              {key.charAt(0).toUpperCase() + key.slice(1)}
            </button>
          ))}
        </div>

        {filteredRequests.length > 0 ? (
          <div className="request-grid">
            {filteredRequests.map((request) => (
              <div key={request.id} className="request-card">
                <div className="request-header">
                  <img src={request.fromUser.image} alt={request.fromUser.name} className="avatar" />
                  <div className="user-info">
                    <h3>{request.fromUser.name}</h3>
                    <p>{request.fromUser.title}</p>
                    <div className="rating">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className={`dot ${
                            i < Math.floor(request.fromUser.rating) ? 'filled' : ''
                          }`}
                        ></div>
                      ))}
                      <span>{request.fromUser.rating.toFixed(1)}</span>
                    </div>
                  </div>
                  <div className={`status-badge ${request.status}`}>{getStatusIcon(request.status)} {request.status}</div>
                </div>
                <div className="skills">
                  <div className="skill-box">
                    <small>Offers</small>
                    <span className="tag green">{request.skillOffered}</span>
                  </div>
                  <ArrowRight className="arrow" />
                  <div className="skill-box">
                    <small>Wants</small>
                    <span className="tag blue">{request.skillWanted}</span>
                  </div>
                </div>
                <p className="message">"{request.message}"</p>
                <div className="request-footer">
                  <span className="date">
                    <Calendar className="icon small" /> Requested {formatDate(request.createdAt)}
                  </span>
                  <div className="actions">
                    {request.status === 'pending' && (
                      <>
                        <button onClick={() => handleAccept(request.id)} className="btn green">Accept</button>
                        <button onClick={() => handleReject(request.id)} className="btn red">Reject</button>
                      </>
                    )}
                    {request.status === 'accepted' && (
                      <button className="btn blue">View Session</button>
                    )}
                    <button onClick={() => handleMessage(request.fromUser.name)} className="btn gray">
                      <MessageSquare className="icon small" /> Message
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty">
            <MessageSquare className="icon large" />
            <h3>No requests found</h3>
            <p>
              {filter === 'all'
                ? "You don't have any swap requests yet."
                : `No ${filter} requests at the moment.`}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SwapRequests;
