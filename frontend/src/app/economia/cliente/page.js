"use client";

import React from "react";
import { useClientes } from "./hooks/useClientes";
import ClientTable from "./components/ClientTable";
import CreateClientForm from "./components/forms/CreateClientForm";
import EditClientForm from "./components/forms/EditClientForm";
import ClientDetail from "./components/ClientDetail";
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

const ClientPage = () => {
  const {
    clientes,
    selectedClientes,
    selectedCliente,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredClientes,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleClienteDoubleClick,
    handleCancelCreate,
    handleCancelEdit,
    handleCloseDetalle,
    handleClienteCreado,
    handleClienteEditado,
    handleError,
    setSelectedClientes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
    showInactive,
    toggleActiveStatus,
  } = useClientes();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando Clientes..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Clientes" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {/* Muestra el formulario o la tabla según el estado */}
      {isFormCreateOpen ? (
        <CreateClientForm
          onSuccess={handleClienteCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditClientForm
          idClient={selectedCliente?.id}
          initialData={selectedCliente}
          onSuccess={handleClienteEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar cliente"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedClientes.length === 0} // Cambiar según la entidad
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear cliente" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <button
            onClick={toggleActiveStatus}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 text-left"
          >
            {showInactive
              ? "Mostrar clientes activos"
              : "Mostrar clientes inactivos"}
          </button>

          <ClientTable
            clients={filteredClientes}
            selectedClients={selectedClientes}
            setSelectedClients={setSelectedClientes}
            onClienteDoubleClick={handleClienteDoubleClick}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedClientes.length > 1
                ? "los clientes seleccionados"
                : "el cliente seleccionado"
            }
          />

          {selectedCliente && (
            <ClientDetail
              client={selectedCliente}
              onClose={handleCloseDetalle}
            />
          )}
        </>
      )}
    </PageLayout>
  );
};

export default ClientPage;
