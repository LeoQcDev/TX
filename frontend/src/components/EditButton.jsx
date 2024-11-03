// @/components/EditButton.jsx
// Boton de edicion

import React from "react";
import { PencilIcon } from "lucide-react";

const EditButton = ({ onEditClick }) => (
  <button
    className="text-gray-500 hover:text-gray-600 bg-none border border-gray-300 hover:bg-gray-300 p-2 rounded-full transition duration-300 ease-in-out"
    onClick={onEditClick}
    aria-label="Editar"
  >
    <PencilIcon className="h-5 w-5" />
  </button>
);

export default EditButton;
