"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const UnidadCompraTable = ({
  unidadesCompra,
  selectedUnidadesCompra,
  setSelectedUnidadesCompra,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["ID", "Nombre", "Grupo"];

  const renderRow = (unidadCompra, searchTerm) => [
    <td
      key="id"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(unidadCompra.id.toString(), searchTerm)}
    </td>,
    <td
      key="nombre"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(unidadCompra.nombre_departamento, searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={unidadesCompra}
      selectedItems={selectedUnidadesCompra}
      setSelectedItems={setSelectedUnidadesCompra}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(UnidadCompraTable);
