// @/components/CreateButton.jsx
// Boton crear

import React from "react";

const CreateButton = ({ onClick, label}) => {
  return (
    <button
      onClick={onClick}
      id='create-button'
      className="flex items-center px-4 py-2 bg-blackRedTX text-white rounded-md hover:bg-red-700 
      focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5 mr-2"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
          clipRule="evenodd"
        />
      </svg>
      {label}
    </button>
  );
};

export default CreateButton;
