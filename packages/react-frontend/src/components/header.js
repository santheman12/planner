import React from 'react';
import logo from './Logo.png';

const Header = ({ handleSignOut }) => {
  const signOut = () => {
    handleSignOut()
  };

  return (
    <header className="bg-gray-400 py-4">
      <div className="container mx-auto flex justify-between items-center">
        <img src={logo} alt="Logo" className="h-10 w-auto" />
        <nav>
          <ul className="flex space-x-1 text-gray-800">
            <li><span onClick={signOut} className="cursor-pointer hover:text-white">Sign Out</span></li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;