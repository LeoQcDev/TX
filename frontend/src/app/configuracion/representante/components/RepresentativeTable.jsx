"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const RepresentativeTable = ({
  representatives,
  selectedRepresentatives,
  setSelectedRepresentatives,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Nombre y apellidos", "Correo", "Teléfono"];

  const renderRow = (representative, searchTerm) => [
    <td key="nombre" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(representative.name, searchTerm)}{" "}
      {highlightMatch(representative.last_name, searchTerm)}
    </td>,
    <td key="correo" className="px-6 py-4 text-center whitespace-nowrap">
      {representative.representative_email}
    </td>,
    <td key="telefono" className="px-6 py-4 text-center whitespace-nowrap">
      {representative.representative_phone}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={representatives}
      selectedItems={selectedRepresentatives}
      setSelectedItems={setSelectedRepresentatives}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(RepresentativeTable);
