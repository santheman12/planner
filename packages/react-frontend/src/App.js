import React, { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Login from './Login';
import Register from './Register';
import WeekChart from './WeekChart';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const handleLogin = (userID) => {
    console.log("logged in with ID:", userID);
    setUserId(userID);
    setAuthenticated(true);
    navigate(`/WeekChart/${userID}`);
  };

  const handleRegister = (userID) => {
    console.log("registered in with ID:", userID);
    setUserId(userID);
    setAuthenticated(true);
    navigate(`/WeekChart/${userID}`);
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
    setUserId(null);
    navigate('/');
    console.log("hitting the function");
  };

  return (
    
      <div className="App">
        <Header handleSignOut={handleSignOut} />
        <div className="App-body mt-10">
          <Routes>
            {!authenticated ? (
              isLoginMode ? (
                <Route path="/" element={<Login login={handleLogin} onSwitchToRegister={switchToRegister} />} />
              ) : (
                <Route path="/" element={<Register register={handleRegister} onSwitchToLogin={switchToLogin} />} />
              )
            ) : (
              <>
                <Route path={`/WeekChart/:userId`} element={<WeekChart />} />
                {/* <Route path={`/DailyChart/${userId}`} element={<DailyChart />} /> */}
              </>
            )}
          </Routes>
        </div>
      </div>
  );
}

export default App;
