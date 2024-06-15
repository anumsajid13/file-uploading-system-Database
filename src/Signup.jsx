import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import background from './background.jpg';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const validateUsername = (username) => {
    // Only allowing alphanumeric characters and underscores in the username
    const usernameRegex = /^[a-zA-Z0-9_]+$/;
    return usernameRegex.test(username);
  };

  const validatePassword = (password) => {
    // at least 8 characters long password, contain at least one number and one special character
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(password);
  };

  const handleSignup = async () => {
    if (!validateUsername(username)) {
      setMessage('Username can only contain alphanumeric characters and underscores.');
      return;
    }

    if (!validatePassword(password)) {
      setMessage('Password must be at least 8 characters long and contain at least one number and one special character.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      setMessage(data.message);
    } catch (error) {
      setMessage('Error occurred during signup.');
    }
  };

  return (
    <>
      <Navbar isLoggedIn={false} onLogout={() => {}} />
      <div
        className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-gray-900"
       
      >
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md text-center">
          <h1 className="text-2xl font-bold mb-4 text-gray-800">Signup</h1>
          <input
            type="text"
            placeholder="Email"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="mb-4 p-2 w-full rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none"
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mb-4 p-2 w-full rounded-lg border border-gray-300 focus:border-purple-500 focus:outline-none"
          />
          <button
            onClick={handleSignup}
            className="bg-blue-900 text-white py-2 px-4 rounded-lg hover:bg-blue-500 transition duration-300 w-full"
          >
            Signup
          </button>
          {message && <p className="mt-4 text-red-500">{message}</p>}
        </div>
        <div className="mt-4 text-white">
          <p>
            Already have an account?{' '}
            <span
              onClick={() => navigate('/login')}
              className="cursor-pointer text-purple-500 hover:underline"
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </>
  );
};

export default Signup;
