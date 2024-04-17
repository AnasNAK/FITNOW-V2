import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import Login from './Auth/component/Login';
import Register from './Auth/component/Register';
import Home from './FitnessProgress/component/Home';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    setIsLoggedIn(!!Cookies.get('authToken'));
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to="/Home" />} />
          <Route path="/Register" element={isLoggedIn ? <Navigate to="/Home" /> : <Register />} />
          <Route path="/Login" element={isLoggedIn ? <Navigate to="/Home" /> : <Login />} />
          <Route path="/Home" element={isLoggedIn ? <Home /> : <Navigate to="/Login" />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
