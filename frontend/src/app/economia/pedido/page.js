"use client";

import React from "react";
import { usePedidos } from "./hooks/usePedidos";
import PedidoTable from "./components/PedidoTable";
import PedidoFormContainer from "./components/forms/PedidoFormContainer";
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

const PedidoPage = () => {
  const {
    pedidos,
    selectedPedidos,
    selectedPedido,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredPedidos,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handlePedidoDoubleClick,
    handleCancelCreate,
    handleCancelEdit,
    handlePedidoCreado,
    handlePedidoEditado,
    handleError,
    setSelectedPedidos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = usePedidos();

  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando Pedidos..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Pedidos" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      <div className="container mx-auto px-4 py-8">
        {isFormCreateOpen ? (
          <PedidoFormContainer
            actionType="create"
            onSuccess={handlePedidoCreado}
            onError={handleError}
            onCancel={handleCancelCreate}
          />
        ) : isFormEditOpen ? (
          <PedidoFormContainer
            actionType="edit"
            idPedido={selectedPedido?.id}
            initialData={selectedPedido}
            onSuccess={handlePedidoEditado}
            onError={handleError}
            onCancel={handleCancelEdit}
          />
        ) : (
          <>
            <PageComponentsLayout>
              <SearchField
                searchTerm={searchTerm}
                handleSearchChange={handleSearchChange}
                placeholder="Buscar pedido"
              />

              <PageButtonsLayout>
                <DeleteButton
                  onClick={handleOpenModal}
                  disabled={selectedPedidos.length === 0}
                />
                <CreateButton
                  onClick={handleCreateClick}
                  label="Crear pedido"
                />
              </PageButtonsLayout>
            </PageComponentsLayout>

            <PedidoTable
              pedidos={filteredPedidos}
              selectedPedidos={selectedPedidos}
              setSelectedPedidos={setSelectedPedidos}
              onPedidoDoubleClick={handlePedidoDoubleClick}
              onEditClick={handleEditClick}
              searchTerm={searchTerm}
            />

            <ConfirmationModal
              isOpen={isModalOpen}
              onClose={handleCloseModal}
              onConfirm={handleEliminar}
              entidad={
                selectedPedidos.length > 1
                  ? "los pedidos seleccionados"
                  : "el pedido seleccionado"
              }
            />
          </>
        )}
      </div>
    </PageLayout>
  );
};

export default PedidoPage;