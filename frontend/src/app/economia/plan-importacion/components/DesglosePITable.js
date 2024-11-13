"use client";

import React from "react";
import PropTypes from "prop-types";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const DesglosePITable = ({
  desglosesPI,
  selectedDesglosesPI,
  setSelectedDesglosesPI,
  onDesglosePIDoubleClick,
  onEditClick,
  searchTerm,
}) => {
  const headers = [
    "Objeto",
    "Importe por Objeto",
    "Líquido",
    "Mediano Plazo",
    "Largo Plazo",
    "Desglose Total"
  ];

  const renderRow = (desglosePI, searchTerm) => [
    <td key="objeto" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(desglosePI.objeto.nombre, searchTerm)}
    </td>,
    <td key="importe_por_objeto" className="px-6 py-4 text-center whitespace-nowrap">
      ${desglosePI.importe_por_objeto.toFixed(2)}
    </td>,
    <td key="liquido" className="px-6 py-4 text-center whitespace-nowrap">
      ${desglosePI.liquido.toFixed(2)}
    </td>,
    <td key="mediano_plazo" className="px-6 py-4 text-center whitespace-nowrap">
      ${desglosePI.mediano_plazo.toFixed(2)}
    </td>,
    <td key="largo_plazo" className="px-6 py-4 text-center whitespace-nowrap">
      ${desglosePI.largo_plazo.toFixed(2)}
    </td>,
    <td key="desglose_total" className="px-6 py-4 text-center whitespace-nowrap">
      ${desglosePI.desglose_total.toFixed(2)}
    </td>
  ];

  return (
    <GenericTable
      headers={headers}
      data={desglosesPI}
      selectedItems={selectedDesglosesPI}
      setSelectedItems={setSelectedDesglosesPI}
      onDoubleClick={onDesglosePIDoubleClick}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

DesglosePITable.propTypes = {
  desglosesPI: PropTypes.array.isRequired,
  selectedDesglosesPI: PropTypes.array,
  setSelectedDesglosesPI: PropTypes.func,
  onDesglosePIDoubleClick: PropTypes.func,
  onEditClick: PropTypes.func,
  searchTerm: PropTypes.string
};

DesglosePITable.defaultProps = {
  selectedDesglosesPI: [],
  setSelectedDesglosesPI: () => {},
  onDesglosePIDoubleClick: () => {},
  onEditClick: () => {},
  searchTerm: ""
};

export default React.memo(DesglosePITable);