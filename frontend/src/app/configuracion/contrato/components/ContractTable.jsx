"use client";

import React from "react";
import GenericTable from "@/components/GenericTable";
import { highlightMatch } from "@/utils/highlightMatch";

const ContractTable = ({
  contracts,
  selectedContracts,
  setSelectedContracts,
  onEditClick,
  searchTerm,
  filterType,
}) => {
  const headers = [
    "Número de contrato",
    "Cliente",
    "Fecha de firma",
    "Fecha de vencimiento",
  ];

  const renderRow = (contract, searchTerm, filterType) => [
    <td className="px-6 py-4 whitespace-nowrap text-center">
      {highlightMatch(
        contract.contract_number,
        searchTerm,
        filterType,
        "contract_number"
      )}
    </td>,
    <td className="px-6 py-4 whitespace-nowrap text-center">
      {highlightMatch(
        contract.client?.name,
        searchTerm,
        filterType,
        "client.name"
      )}
    </td>,
    <td className="px-6 py-4 whitespace-nowrap text-center">
      {contract.signature_date}
    </td>,
    <td className="px-6 py-4 whitespace-nowrap text-center">
      {contract.expiration_date}
    </td>,
  ];

  return (
    <GenericTable
      headers={headers}
      data={contracts}
      selectedItems={selectedContracts}
      setSelectedItems={setSelectedContracts}
      onEditClick={onEditClick}
      searchTerm={searchTerm}
      rowRenderer={renderRow}
    />
  );
};

export default React.memo(ContractTable);
