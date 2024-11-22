"use client";

import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";
import React from "react";

const ObjectTable = ({
  objects,
  selectedObjects,
  setSelectedObjects,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Nombre","Descripción"];

  const renderRow = (object, searchTerm) => [
    <td key="nom" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(object.nombre, searchTerm)}
    </td>,
    <td key="descrip" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(object.descripcion)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={objects}
      selectedItems={selectedObjects}
      setSelectedItems={setSelectedObjects}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ObjectTable);
