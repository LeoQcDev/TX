// @/components/XButton.jsx
// Botones comunes de los formularios

import React from "react";
import { X } from "lucide-react";

const XButton = ({ action }) => {
  return (
    <button
      onClick={action}
      className="text-gray-200 hover:text-red-300 transition-colors"
      aria-label="Cerrar"
    >
      <X className="h-6 w-6" />
    </button>
  );
};

export default XButton;
