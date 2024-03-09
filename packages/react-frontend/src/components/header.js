import React from 'react';
import { Link } from 'react-router-dom';
import logo from './Logo.png'

const Header = () => {
  return (
    <header className="bg-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <nav>
          <ul className="flex space-x-1 text-gray-800">
            <li><Link to="/login" className="hover:text-white">Sign Out</Link></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;

