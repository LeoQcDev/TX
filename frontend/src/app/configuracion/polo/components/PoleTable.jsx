"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const PoleTable = ({
  poles,
  selectedPoles,
  setSelectedPoles,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Denominación"];

  const renderRow = (pole, searchTerm) => [
    <td key="pole" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(pole.denomination, searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={poles}
      selectedItems={selectedPoles}
      setSelectedItems={setSelectedPoles}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(PoleTable);
