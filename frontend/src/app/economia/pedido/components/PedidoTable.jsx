import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";
import { formatDate } from "@/utils/formatters";

const PedidoTable = ({
  pedidos,
  selectedPedidos,
  setSelectedPedidos,
  onPedidoDoubleClick,
  onEditClick,
  searchTerm,
}) => {
  const headers = [
    "Número 711",
    "Cliente",
    "Genérico",
    "Unidad de Compra",
    "Financiamiento",
    "Presentador",
    "Tipo",
    "Fecha Entrada"
  ];

  const renderCells = (pedido) => [
    <td key="Número" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.numero_711}
    </td>,
    <td key="Cliente" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.cliente?.name || 'N/A'}
    </td>,
    <td key="Genérico" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.generico_producto?.nombre || 'N/A'}
    </td>,
    <td key="Unidad" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.unidad_compra?.nombre_departamento || 'N/A'}
    </td>,
    <td key="Financiamiento" className="px-6 py-4 text-center whitespace-nowrap">
      {typeof pedido.financiamiento === 'number' 
        ? pedido.financiamiento.toFixed(2) 
        : pedido.financiamiento || '0.00'}
    </td>,
    <td key="Presentador" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.presentador}
    </td>,
    <td key="Tipo" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.tipo_pedido}
    </td>,
    <td key="Fecha" className="px-6 py-4 text-center whitespace-nowrap">
      {formatDate(pedido.fecha_entrada_tecnotex)}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={pedidos}
      selectedItems={selectedPedidos}
      setSelectedItems={setSelectedPedidos}
      onEditClick={onEditClick}
      onRowDoubleClick={onPedidoDoubleClick}
      searchTerm={searchTerm}
      rowRenderer={renderCells}
    />
  );
};

export default PedidoTable; 