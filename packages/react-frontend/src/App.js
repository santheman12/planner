import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/header'; // Import the Header component
import Login from './Login';
import Register from './Register';
import WeekChart from './WeekChart';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = (userID) => {
    console.log("logged in with ID:", userID);
    setAuthenticated(true);
  };

  const handleRegister = (userID) => {
    console.log("registered in with ID:", userID);
    setAuthenticated(true);
  };

  const switchToRegister = () => {
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  const handleSignOut = () => {
    setAuthenticated(false);
    setIsLoginMode(true);
  };

  return (
    <Router>
      <div className="App">
        <Header handleSignOut={handleSignOut} />
        <div className="App-body mt-10">
          <Routes>
            <Route path="/login" element={!authenticated ? (
              isLoginMode ? (
                <Login login={handleLogin} onSwitchToRegister={switchToRegister} />
              ) : (
                <Register register={handleRegister} onSwitchToLogin={switchToLogin} />
              )
            ) : (
              <Navigate to="/weekview" />
            )} />
            <Route path="/weekview" element={<WeekChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
