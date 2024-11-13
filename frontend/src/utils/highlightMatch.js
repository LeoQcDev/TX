// @/utils/highlightMatch.js
// Funcion para resaltar las coincidencias al valor introducido

import React from 'react';

export const highlightMatch = (text, searchTerm, filterType, field) => {
  if (!text || !searchTerm) return text;

  // Si se proporciona filterType y field, solo resalta si coinciden
  if (filterType && field && filterType !== field) return text;

  const regex = new RegExp(`(${searchTerm})`, 'gi');
  const parts = text.toString().split(regex);

  return parts.map((part, index) =>
    regex.test(part) ? (
      <span key={index} className="bg-yellow-200">
        {part}
      </span>
    ) : (
      part
    )
  );
};
