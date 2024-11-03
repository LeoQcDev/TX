// @/components/ModalCancelButton.jsx
// Boton de cancelar en modales

import React from "react";

const ModalCancelButton = ({ onClick, label }) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
        focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
    >
      {label}
    </button>
  );
};

export default ModalCancelButton;
