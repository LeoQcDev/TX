// @/components/ModalButtons.jsx
// Botones comunes de los formularios

import React from "react";

const ModalButtons = ({ children }) => {
  return <div className="flex justify-end space-x-4">{children}</div>;
};

export default ModalButtons;
