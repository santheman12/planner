import React, { useState } from 'react';

const Login = ({ onLogin, onSwitchToRegister }) => {
  const [Email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    // Validate inputs
    onLogin({ Email, password });
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-gray-200 rounded-md w-[500px] h-[500px]">
      <h2 className="text-2xl font-bold mb-4">Login</h2>
      <form onSubmit={handleLogin}>
        <label className="block mb-4">
          Email:
          <input
            type="text"
            value={Email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full h-12 px-3 border rounded-md"
          />
        </label>
        <label className="block mb-4">
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full h-12 px-3 border rounded-md"
          />
        </label>
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