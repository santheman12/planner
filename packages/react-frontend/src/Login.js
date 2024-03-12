import React, { useState } from 'react';

const Login = ({ login, onSwitchToRegister }) => {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [validLogin, setValidLogin] = useState(true);

  const handleLogin = async (e) => {
    e.preventDefault();
  
    // Make a request to the server to authenticate the user
    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });
  
      if (response.ok) {
        const data = await response.json();
        login(data.userId);
      } else {
        setValidLogin(false);
        console.error('Login failed:', response.statusText);
      }
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-gray-200 rounded-md w-[500px] h-[500px]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <label className="block mb-4">
          Username:
          <input
            type="text"
            value={username}
            onChange={(e) => {
              setUserName(e.target.value);
              console.log('Username changed:', e.target.value);
            }}
            className="w-full h-12 px-3 border rounded-md"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log('Password changed:', e.target.value);
            }}
            className="w-full h-12 px-3 border rounded-md"
          />
        </label>
        {!validLogin && (
          <p className="text-red-500 mb-4">Invalid login.</p>
        )}
        <button type="submit" className="w-full h-12 bg-blue-500 text-white rounded-md">
          Login
        </button>
      </form>
      <p className="mt-4 text-blue-500">
        New User?{' '}
        <span className="cursor-pointer" onClick={onSwitchToRegister}>
          Register here.
        </span>
      </p>
    </div>
  );
};

export default Login;