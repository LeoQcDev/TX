// @/components/ConfirmButton.jsx
// Boton de accion

import React from "react";

const FormConfirmButton = ({ isSubmitting, action }) => {
  const buttonText = () => {
    switch (action) {
      case "crear":
        return isSubmitting ? "Creando..." : "Crear";
      case "actualizar":
        return isSubmitting ? "Actualizando..." : "Actualizar";
      case "eliminar":
        return isSubmitting ? "Eliminando..." : "Eliminar";
      default:
        return "";
    }
  };

  return (
    <button
      type="submit"
      className="px-4 py-2 bg-blackRedTX text-sm font-medium text-white rounded-md hover:bg-red-700 
      focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50"
      disabled={isSubmitting}
    >
      {buttonText()}
    </button>
  );
};

export default FormConfirmButton;
