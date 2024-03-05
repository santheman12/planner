import React, { useState } from 'react';
// import { PlusIcon, CheckIcon } from '@heroicons/react/solid';
import { IoCheckmark } from "react-icons/io5";

const Checkmark = ({ onToggle, isComplete}) => {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      className={`w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center focus:outline-none ${
        isComplete ? 'bg-green-500' : 'bg-gray-200'
      }`}
      onClick={toggleActive, onToggle}
    >
      <div className="transition-transform duration-500 ease-in-out">
        {isActive ? (
          <IoCheckmark className="w-4 h-4 text-white" />
        ) : (
          <IoCheckmark className="w-3 h-3 text-black" />
        )}
      </div>
    </button>
  );
};

export default Checkmark;
