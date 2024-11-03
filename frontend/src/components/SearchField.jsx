// @/component/SearchField.jsx
// Campo de búsqueda

import React from "react";

const SearchField = ({
  searchTerm,
  handleSearchChange,
  filterType,
  handleFilterTypeChange,
  filterOptions = [], // Para los casos donde el usuario elige el filtro
  placeholder = "Buscar...",
  isNumber = false, // Para márgenes comerciales
}) => {
  return (
    <div className="w-full md:w-1/3 mb-4 md:mb-0">
      {filterOptions.length > 0 ? (
        <div className="flex w-full space-x-2">
          <div
            className="flex border rounded-md shadow-sm focus-within:ring-2 
            focus-within:ring-gray-700 focus-within:border-transparent 
              focus-within:shadow-md transition-shadow duration-300 "
          >
            <input
              type="text"
              placeholder={placeholder}
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full px-4 py-2 border-0 rounded-l-md shadow-sm focus:outline-none focus:ring-0
                bg-white text-gray-600"
            />
            <select
              value={filterType}
              onChange={handleFilterTypeChange}
              className="px-4 py-2 border-0 rounded-r-md shadow-sm focus:outline-none focus:ring-0
                bg-white text-gray-600"
              aria-label="Seleccionar tipo de búsqueda"
            >
              {filterOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      ) : (
        <input
          type={isNumber ? "number" : "text"}
          min={isNumber ? 1 : undefined}
          max={isNumber ? 100 : undefined}
          step={isNumber ? 1 : undefined}
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearchChange}
          className="w-full px-4 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 
            focus:ring-gray-700 focus:border-transparent focus:shadow-md transition-shadow duration-300"
        />
      )}
    </div>
  );
};

export default SearchField;
