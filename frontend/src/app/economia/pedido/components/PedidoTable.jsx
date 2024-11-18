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
    <td key="numero" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.numero_711}
    </td>,
    <td key="cliente" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.cliente?.denominacion || 'N/A'}
    </td>,
    <td key="generico" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.generico_producto?.denominacion || 'N/A'}
    </td>,
    <td key="unidad" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.unidad_compra?.denominacion || 'N/A'}
    </td>,
    <td key="financiamiento" className="px-6 py-4 text-center whitespace-nowrap">
      {typeof pedido.financiamiento === 'number' 
        ? pedido.financiamiento.toFixed(2) 
        : pedido.financiamiento || '0.00'}
    </td>,
    <td key="presentador" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.presentador}
    </td>,
    <td key="tipo" className="px-6 py-4 text-center whitespace-nowrap">
      {pedido.tipo_pedido}
    </td>,
    <td key="fecha" className="px-6 py-4 text-center whitespace-nowrap">
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