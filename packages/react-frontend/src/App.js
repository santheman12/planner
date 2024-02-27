import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState } from 'react';
import Header from './components/header'; // Import the Header component
import Login from './Login';
import Register from './Register';
import WeekChart from './WeekChart';
import DailyChart from './DailyChart';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);

  const handleLogin = (userData) => {
    // Your login logic here, and if successful:
    setAuthenticated(true);
  };

  const handleRegister = (userData) => {
    // Your registration logic here, and if successful:
    setAuthenticated(true);
  };

  const switchToRegister = () => {
    setIsLoginMode(false);
  };

  const switchToLogin = () => {
    setIsLoginMode(true);
  };

  return (
    <Router>
      <div className="App">
        <Header />
        <div className="App-body mt-10">
          <Routes>
            <Route path="/" element={!authenticated ? (
              isLoginMode ? (
                <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
              ) : (
                <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
              )
            ) : (
              <WeekChart />
            )} />
            <Route path="/DailyChart" element={<DailyChart />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
