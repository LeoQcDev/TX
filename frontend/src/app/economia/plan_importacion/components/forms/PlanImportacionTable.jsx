"use client";

import React from "react";
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
  console.log('Table - Planes recibidos:', planesImportacion);
  console.log('Table - Planes seleccionados:', selectedPlanesImportacion);

  const headers = [
    "Código PI",
    "Cliente",
    "Fecha Emisión",
    "Año PI",
    "Importe PI"
  ];

  const renderRow = (plan) => [
    <td key="codigo" className="px-6 py-4 whitespace-nowrap">
      {searchTerm ? highlightMatch(plan.codigo_pi, searchTerm) : plan.codigo_pi}
    </td>,
    <td key="cliente" className="px-6 py-4 whitespace-nowrap">
      {searchTerm ? highlightMatch(plan.cliente.name, searchTerm) : plan.cliente.name}
    </td>,
    <td key="fecha" className="px-6 py-4 text-center whitespace-nowrap">
      {new Date(plan.fecha_emision).toLocaleDateString()}
    </td>,
    <td key="anio" className="px-6 py-4 text-center whitespace-nowrap">
      {plan.anio_pi}
    </td>,
    <td key="importe" className="px-6 py-4 text-right whitespace-nowrap">
      {new Intl.NumberFormat("es-ES", {
        style: "currency",
        currency: "EUR",
      }).format(plan.importe_pi)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={planesImportacion}
      selectedItems={selectedPlanesImportacion}
      setSelectedItems={setSelectedPlanesImportacion}
      onEditClick={onEditClick}
      onRowDoubleClick={onPlanImportacionDoubleClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default PlanImportacionTable;