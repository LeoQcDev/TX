"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const ObjetoTable = ({
  objetos,
  selectedObjetos,
  setSelectedObjetos,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Nombre", "Descripción"];

  const renderRow = (objeto, searchTerm) => [
    <td key="nombre" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(objeto.nombre, searchTerm)}
    </td>,
    <td key="descripcion" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(objeto.descripcion, searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={objetos}
      selectedItems={selectedObjetos}
      setSelectedItems={setSelectedObjetos}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ObjetoTable);