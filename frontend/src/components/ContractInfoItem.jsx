// @/components/ContractInfoItem.jsx
// Componente para mostrar la informacion de los contratos en el modal CustomerDetail

import React from "react";

const ContractInfoItem = ({ label, value, icon: Icon }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center mb-1">
        {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
        <span className="font-medium text-gray-700">{label}</span>
      </div>
      <div className="pl-6 text-gray-900">{value || "N/A"}</div>
    </div>
  );
};

export default ContractInfoItem;
