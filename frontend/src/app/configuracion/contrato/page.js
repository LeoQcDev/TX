"use client";

import React from "react";
import { useContratos } from "./hooks/useContratos";
import ContractTable from "./components/ContractTable";
import CreateContractForm from "./components/forms/CreateContractForm";
import EditContractForm from "./components/forms/EditContractForm";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import PageComponentsLayout from "@/components/PageComponentsLayout";
import PageButtonsLayout from "@/components/PageButtonsLayout";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import SearchField from "@/components/SearchField";
import Notification from "@/components/Notification";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import LoadingErrorWrapper from "@/components/LoadingErrorWrapper";

const ContractPage = () => {
  const {
    contratos,
    filteredContratos,
    selectedContratos,
    selectedContrato,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    searchTerm,
    filterType,
    notificationMessage,
    notificationType,
    showNotification,
    handleSearchChange,
    setFilterType,
    handleFilterTypeChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleCancelCreate,
    handleCancelEdit,
    handleContratoCreado,
    handleContratoEditado,
    handleError,
    setSelectedContratos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useContratos();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando Contratos..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Contratos" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateContractForm
          onSuccess={handleContratoCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditContractForm
          idContract={selectedContrato?.id}
          initialData={selectedContrato}
          onSuccess={handleContratoEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              filterType={filterType}
              handleFilterTypeChange={handleFilterTypeChange}
              filterOptions={[
                { value: "contract_number", label: "# de Contrato" },
                { value: "client.name", label: "Nombre del Cliente" },
              ]}
              placeholder="Buscar por:"
            />
            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedContratos.length === 0} // Cambiar según la entidad
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear Contrato" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <ContractTable
            contracts={filteredContratos}
            selectedContracts={selectedContratos}
            setSelectedContracts={setSelectedContratos}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
            filterType={filterType}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedContratos.length > 1
                ? "los contratos seleccionados"
                : "el contrato seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default ContractPage;
