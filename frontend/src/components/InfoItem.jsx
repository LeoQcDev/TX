// @/components/InfoItem.jsx
// Componente para mostrar la info en el modal ClienteDetail

import React from 'react'

const InfoItem = ({ label, value, icon: Icon }) => {
  return (
    <div className="mb-2 flex items-center">
      {Icon && <Icon className="w-4 h-4 mr-2 text-gray-600" />}
      <span className="font-medium text-gray-700">{label}:</span>{' '}
      <span className="text-gray-900 ml-1">{value || 'N/A'}</span>
    </div>
  )
};

export default InfoItem;