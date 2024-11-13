"use client";

import React from "react";
import PropTypes from "prop-types";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const PlanImportacionTable = ({
  planesImportacion,
  selectedPlanesImportacion,
  setSelectedPlanesImportacion,
  onPlanImportacionDoubleClick,
  onEditClick,
  searchTerm,
}) => {
  const headers = ["Código PI", "Cliente", "Fecha de Emisión", "Importe PI", "Año PI"];

  const renderRow = (planImportacion, searchTerm) => [
    <td key="codigo_pi" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(planImportacion.codigo_pi, searchTerm)}
    </td>,
    <td key="cliente" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(planImportacion.cliente.name, searchTerm)}
    </td>,
    <td key="fecha_emision" className="px-6 py-4 text-center whitespace-nowrap">
      {new Date(planImportacion.fecha_emision).toLocaleDateString()}
    </td>,
    <td key="importe_pi" className="px-6 py-4 text-center whitespace-nowrap">
      ${planImportacion.importe_pi.toFixed(2)}
    </td>,
    <td key="anio_pi" className="px-6 py-4 text-center whitespace-nowrap">
      {planImportacion.anio_pi}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={planesImportacion}
      selectedItems={selectedPlanesImportacion}
      setSelectedItems={setSelectedPlanesImportacion}
      onDoubleClick={onPlanImportacionDoubleClick}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

PlanImportacionTable.propTypes = {
  planesImportacion: PropTypes.array.isRequired,
  selectedPlanesImportacion: PropTypes.array.isRequired,
  setSelectedPlanesImportacion: PropTypes.func.isRequired,
  onPlanImportacionDoubleClick: PropTypes.func.isRequired,
  onEditClick: PropTypes.func.isRequired,
  searchTerm: PropTypes.string.isRequired,
};

export default React.memo(PlanImportacionTable);