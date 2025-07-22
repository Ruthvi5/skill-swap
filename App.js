import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import MyProfile from './pages/myprofile';
import UserProfile from './pages/userprofile';
import SwapRequests from './pages/swaprequests';
import Header from './components/layout/header';

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/myprofile" element={<MyProfile />} />
        <Route path="/user/:id" element={<UserProfile />} />
        <Route path="/swap-requests" element={<SwapRequests />} />
      </Routes>
    </Router>
  );
}

export default App;
