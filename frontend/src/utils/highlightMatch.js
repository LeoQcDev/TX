// @/utils/highlightMatch.js
// Funcion para resaltar las coincidencias al valor introducido

import React from 'react';

export const highlightMatch = (text, searchTerm, filterType = null, columnType = null) => {
  // Si no hay término de búsqueda, o si se está filtrando por un tipo distinto de columna
  if (!searchTerm || (filterType && filterType !== columnType)) return text;

  // Escapar los caracteres especiales en la búsqueda
  const escapeRegExp = (string) => {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  };

  // Dividir el texto según el término de búsqueda (insensible a mayúsculas/minúsculas)
  const parts = String(text).split(new RegExp(`(${escapeRegExp(searchTerm)})`, 'gi'));

  // Resaltar las partes que coinciden con el término de búsqueda
  return parts.map((part, index) =>
    part.toLowerCase() === searchTerm.toLowerCase() ? (
      <span key={index} style={{backgroundColor: '#EFE4B0'}}>
        {part}
      </span>
    ) : (
      part
    )
  );
};
