"use client";

import { usePlanImportacionFormData } from "@/app/economia/plan_importacion/hooks/usePlanImportacionFormData";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";
import React from "react";

const ExtraplanTable = ({
  extraplanes,
  selectedExtraplanes,
  setSelectedExtraplanes,
  onEditClick,
  searchTerm,
}) => {
  const { filteredPlanesImportacion } = usePlanImportacionFormData();
  console.log("sss", filteredPlanesImportacion);
  const headers = ["Cód. PI", "Importe", "Motivo", "Fecha de Emisión"];
  console.log("extraplanes", extraplanes);
  const renderRow = (extraplan, searchTerm) => [
    <td key="code_pi" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(extraplan.plan_importacion_codigo)}
    </td>,
    <td key="importe" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(extraplan.importe_extraplan)}
    </td>,
    <td key="motivo" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(extraplan.motivo, searchTerm)}
    </td>,
    <td key="fecha_emision" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(extraplan.fecha_emision.split('T')[0])}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={extraplanes}
      selectedItems={selectedExtraplanes}
      setSelectedItems={setSelectedExtraplanes}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ExtraplanTable);
