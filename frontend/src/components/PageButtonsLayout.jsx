// @/components/PageButtonsLayout.jsx
// contenedor principal de los botones de las paginas de cada entidad

import React from "react";

const PageButtonsLayout = ({ children }) => {
  return <div className="flex space-x-2 w-full md:w-auto">{children}</div>;
};

export default PageButtonsLayout;
