"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";
import { formatDate } from "@/utils/formatters";

const PlanImportacionTable = ({
  planesImportacion,
  selectedPlanesImportacion,
  setSelectedPlanesImportacion,
  onPlanImportacionDoubleClick,
  onEditClick,
  searchTerm,
}) => {
  const headers = [
    "Código PI",
    "Cliente",
    "Fecha Emisión",
    "Año PI",
    "Importe PI",   
  ];

  const renderCells = (plan) => [
    <td key="codigo" className="px-6 py-4 text-center whitespace-nowrap">
      {searchTerm ? highlightMatch(plan.codigo_pi, searchTerm) : plan.codigo_pi}
    </td>,
    <td key="cliente" className="px-6 py-4 text-center whitespace-nowrap">
      {plan.cliente?.name || 'N/A'}
    </td>,
    <td key="fecha" className="px-6 py-4 text-center whitespace-nowrap">
      {formatDate(plan.fecha_emision)}
    </td>,
    <td key="anio" className="px-6 py-4 text-center whitespace-nowrap">
      {plan.anio_pi || 'N/A'}
    </td>,
    <td key="importe" className="px-6 py-4 text-center whitespace-nowrap">
      {typeof plan.importe_pi === 'number' 
        ? plan.importe_pi.toFixed(2) 
        : plan.importe_pi || '0.00'}
    </td>,
  ];

  return (
    <div className="mt-8 flex flex-col">
      <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
            <GenericTable
              headers={headers}
              data={planesImportacion}
              selectedItems={selectedPlanesImportacion}
              setSelectedItems={setSelectedPlanesImportacion}
              onEditClick={onEditClick}
              onRowDoubleClick={onPlanImportacionDoubleClick}
              searchTerm={searchTerm}
              rowRenderer={renderCells}
              planImportacion
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlanImportacionTable;