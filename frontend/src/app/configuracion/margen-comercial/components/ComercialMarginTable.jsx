"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const ComercialMarginTable = ({
  comercialMargins,
  selectedComercialMargins,
  setSelectedComercialMargins,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Margen Comercial"];

  const renderRow = (comercialMargin, searchTerm) => [
    <td
      key="comercial_margin"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {highlightMatch(comercialMargin.comercial_margin, searchTerm)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={comercialMargins}
      selectedItems={selectedComercialMargins}
      setSelectedItems={setSelectedComercialMargins}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ComercialMarginTable);
