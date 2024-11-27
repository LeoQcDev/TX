"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const UnidadMedidaTable = ({
  unidadesMedida,
  selectedUnidadesMedida,
  setSelectedUnidadesMedida,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["ID", "Nombre", "Denominación"];

  const renderRow = (unidadMedida, searchTerm) => [
    <td
      key="id"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(unidadMedida.id.toString(), searchTerm)}
    </td>,
    <td
      key="nombre"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(unidadMedida.nombre, searchTerm)}
    </td>,
    <td
      key="denominacion"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(unidadMedida.denominacion, searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={unidadesMedida}
      selectedItems={selectedUnidadesMedida}
      setSelectedItems={setSelectedUnidadesMedida}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(UnidadMedidaTable);
