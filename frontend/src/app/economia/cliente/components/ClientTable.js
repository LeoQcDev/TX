"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";
import { CheckIcon } from "lucide-react";

const ClientTable = ({
  clients,
  selectedClients,
  setSelectedClients,
  onEditClick,
  onClienteDoubleClick,
  searchTerm,
}) => {
  const headers = [
    "Nombre de la Empresa",
    "AEI",
    "Código Cliente",
    "Polo",
    "Fecha de Vencimiento",
  ];

  const renderRow = (client, searchTerm) => [
    <td key="nombre" className="px-6 py-4 text-center whitespace-nowrap">
      {highlightMatch(client.name, searchTerm)}
    </td>,
    <td key="aei" className="px-6 py-4 text-center whitespace-nowrap">
      {client.is_aei ? <CheckIcon className="text-gray-500" /> : ""}
    </td>,
    <td key="codigo" className="px-6 py-4 text-center whitespace-nowrap">
      {client.code}
    </td>,
    <td key="polo" className="px-6 py-4 text-center whitespace-nowrap">
      {client.pole.denomination}
    </td>,
    <td
      key="fecha_vencimiento"
      className="px-6 py-4 text-center whitespace-nowrap"
    >
      {client.contract?.expiration_date
        ? new Date(client.contract.expiration_date).toLocaleDateString()
        : "N/A"}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={clients}
      selectedItems={selectedClients}
      setSelectedItems={setSelectedClients}
      onEditClick={onEditClick}
      onRowDoubleClick={onClienteDoubleClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ClientTable);
