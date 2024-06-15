import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Signup from './Signup';
import Login from './Login';
import UploadFile from './UploadFile';
import UserFiles from './UserFiles';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  return (
    <Router>
      <AppRoutes isLoggedIn={isLoggedIn} onLogin={handleLogin} onLogout={setIsLoggedIn} />
    </Router>
  );
};

const AppRoutes = ({ isLoggedIn, onLogin, onLogout }) => {
 
  return (
    <>
    
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login onLogin={onLogin} />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/files" element={<UserFiles />} />
        <Route path="/" element={<Login onLogin={onLogin} />} />
      </Routes>
    </>
  );
};

export default App;
