import React, { useState } from 'react';
import Login from './Login';
import Register from './Register';
import WeekChart from './WeekChart';

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
    <div className="App">
      <div className="App-body mt-10">
        {!authenticated ? (
          isLoginMode ? (
            <Login onLogin={handleLogin} onSwitchToRegister={switchToRegister} />
          ) : (
            <Register onRegister={handleRegister} onSwitchToLogin={switchToLogin} />
          )
        ) : (
          <div className="chart-container">
            <WeekChart />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;