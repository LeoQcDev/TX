// @/components/PageComponentsLayout.jsx
// Contenedor principal de los botones y campo de busqueda de las paginas de cada entidad

import React from "react";

const PageComponentsLayout = ({ children }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-0.5 space-y-4 md:space-y-0 md:space-x-4">
      {children}
    </div>
  );
};

export default PageComponentsLayout;
