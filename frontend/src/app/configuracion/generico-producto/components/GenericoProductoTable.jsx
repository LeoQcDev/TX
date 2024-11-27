"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const GenericoProductoTable = ({
  genericosProducto,
  selectedGenericosProducto,
  setSelectedGenericosProducto,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["ID", "Nombre", "Grupo"];

  const renderRow = (genericoProducto, searchTerm) => [
    <td
      key="id"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(genericoProducto.id.toString(), searchTerm)}
    </td>,
    <td
      key="nombre"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(genericoProducto.nombre, searchTerm)}
    </td>,
    <td
      key="grupo"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(genericoProducto.grupo || "-", searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={genericosProducto}
      selectedItems={selectedGenericosProducto}
      setSelectedItems={setSelectedGenericosProducto}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(GenericoProductoTable);
