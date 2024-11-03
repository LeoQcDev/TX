// @/components/CancelButton.jsx
// Boton cancelar

import React from "react";

const FormCancelButton = ({ onCancel, isSubmitting }) => (
  <button
    type="button"
    onClick={onCancel}
    className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 
    focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent"
    disabled={isSubmitting}
  >
    Cancelar
  </button>
);

export default FormCancelButton;
