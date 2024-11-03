// @/components/PageLayout.jsx
// contenedor principal de las paginas de cada entidad

import React from "react";

const PageLayout = ({ children }) => {
  return (
    <div className="container mx-auto px-4 transition-all duration-300">
      {children}
    </div>
  );
};

export default PageLayout;
