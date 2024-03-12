import React, { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import Header from './components/header';
import Login from './Login';
import Register from './Register';
import WeekChart from './WeekChart';

function App() {
  const [authenticated, setAuthenticated] = useState(false);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const id = JSON.parse(localStorage.getItem('userId'));
    const isAuthenticated = JSON.parse(localStorage.getItem('authenticated'));
    if (id && isAuthenticated) {
      setUserId(id);
      setAuthenticated(true)
    }
    console.log(userId)
  }, []);

  useEffect(() => {
    localStorage.setItem('userId', JSON.stringify(userId));
    console.log("set the user Id in local storage as " + userId)
  }, [userId]);

  const handleLogin = (userID) => {
    setUserId(userID);
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true')
    navigate(`/WeekChart`, { state: {userId: userID} });
  };

  const handleRegister = (userID) => {
    setUserId(userID);
    setAuthenticated(true);
    localStorage.setItem('authenticated', 'true')
    navigate(`/WeekChart`, { state: {userId: userID} });
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
                <Route path={`/WeekChart/*`} element={<WeekChart />} />
              </>
            )}
          </Routes>
        </div>
      </div>
  );
}

export default App;
