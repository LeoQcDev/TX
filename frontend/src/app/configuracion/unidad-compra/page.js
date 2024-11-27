"use client";

import React from "react";
import { useUnidadCompra } from "./hooks/useUnidadCompra";
import UnidadCompraTable from "./components/UnidadCompraTable";
import CreateUnidadCompraForm from "./components/forms/CreateUnidadCompraForm";
import EditUnidadCompraForm from "./components/forms/EditUnidadCompraForm";
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

const UnidadCompraPage = () => {
  const {
    unidadesCompra,
    filteredUnidadesCompra,
    selectedUnidadesCompra,
    selectedUnidadCompra,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    searchTerm,
    notificationMessage,
    notificationType,
    showNotification,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleCancelCreate,
    handleCancelEdit,
    handleUnidadCompraCreado,
    handleUnidadCompraEditado,
    handleError,
    setSelectedUnidadesCompra,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useUnidadCompra();

  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando unidades de compra..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Unidades de Compra" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateUnidadCompraForm
          onSuccess={handleUnidadCompraCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditUnidadCompraForm
          idUnidadCompra={selectedUnidadCompra?.id}
          initialData={selectedUnidadCompra}
          onSuccess={handleUnidadCompraEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar unidad de compra"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedUnidadesCompra.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear unidad de compra"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <UnidadCompraTable
            unidadesCompra={filteredUnidadesCompra}
            selectedUnidadesCompra={selectedUnidadesCompra}
            setSelectedUnidadesCompra={setSelectedUnidadesCompra}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedUnidadesCompra.length > 1
                ? "las unidades de compra seleccionadas"
                : "la unidad de compra seleccionada"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default UnidadCompraPage;
