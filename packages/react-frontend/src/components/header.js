import React from 'react';
import logo from './Logo.png'

const Header = () => {
  return (
    <header className="bg-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
      <img src={logo} alt="Logo" className="h-10 w-auto" />
        <nav>
          <ul className="flex space-x-3 text-gray-800">
            <li><a href="#" className="hover:text-white">Login</a></li>
            <li><a href="#" className="hover:text-white">Calendar</a></li>
            <li><a href="#" className="hover:text-white">Todo</a></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
