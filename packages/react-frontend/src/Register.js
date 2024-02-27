import React, { useState } from 'react';

const Register = ({ onRegister, onSwitchToLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordsMatch, setPasswordsMatch] = useState(true);

  const handleRegister = (e) => {
    e.preventDefault();
    // Check if passwords match
    if (password === confirmPassword) {
      setPasswordsMatch(true);
      onRegister({ email, password });
    } else {
      setPasswordsMatch(false);
    }
  };

  return (
    <div className="mx-auto mt-8 p-8 bg-gray-200 rounded-md w-[500px] h-[500px]">
      <h2 className="text-2xl font-bold mb-4">Register</h2>
      <form onSubmit={handleRegister}>
        <label className="block mb-4">
          Email:
          <input
            type="text"
            value={email}
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
        <label className="block mb-4">
          Confirm Password:
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={`w-full h-12 px-3 border rounded-md ${
              !passwordsMatch ? 'border-red-500' : ''
            }`}
          />
        </label>
        {!passwordsMatch && (
          <p className="text-red-500 mb-4">Passwords do not match. Please try again.</p>
        )}
        <button type="submit" className="w-full h-12 bg-blue-500 text-white rounded-md">
          Register
        </button>
      </form>
      <p className="mt-4 text-blue-500">
        Already have an account?{' '}
        <span className="cursor-pointer" onClick={onSwitchToLogin}>
          Login here.
        </span>
      </p>
    </div>
  );
};

export default Register;