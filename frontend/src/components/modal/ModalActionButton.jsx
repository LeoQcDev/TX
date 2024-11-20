// @/components/ModalActionButton.jsx
// Boton de accion en los modales

import React from "react";

const ModalActionButton = ({ onClick, label, isProcessing }) => (
  <button
    type="button"
    onClick={onClick}
    className="px-4 py-2 bg-blackRedTX text-sm font-medium text-white rounded-md hover:bg-red-700 
    focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50"
    disabled={isProcessing}
  >
    {label}
  </button>
);

export default ModalActionButton;
