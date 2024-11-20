// @/components/SectionTitle.jsx
// Componente de sección de título

import React from "react";

const SectionTitle = ({ children, icon: Icon }) => {
  return (
    <h3 className="text-lg font-semibold mb-3 flex items-center text-gray-800">
      <Icon className="w-5 h-5 mr-2 text-red-800" />
      {children}
    </h3>
  );
};

export default SectionTitle;
