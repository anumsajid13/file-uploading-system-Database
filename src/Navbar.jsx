import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
   
    navigate('/');
  };

  return (
    <nav className="bg-gray-900 p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-xl font-bold">
          <Link to="/">My File Uploader</Link>
        </div>
        <ul className="flex space-x-4 text-white">
          {isLoggedIn ? (
            <>
              <li>
                <Link to="/upload" className="hover:text-blue-300 transition duration-300">Upload</Link>
              </li>
              <li>
                <Link to="/files" className="hover:text-blue-300 transition duration-300">My Files</Link>
              </li>
              <li>
                <button onClick={handleLogout} className="hover:text-blue-300 transition duration-300">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link to="/login" className="hover:text-blue-300 transition duration-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-blue-300 transition duration-300">Sign Up</Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
