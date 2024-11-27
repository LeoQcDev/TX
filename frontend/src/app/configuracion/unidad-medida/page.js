"use client";

import React from "react";
import { useUnidadMedida } from "./hooks/useUnidadMedida";
import UnidadMedidaTable from "./components/UnidadMedidaTable";
import CreateUnidadMedidaForm from "./components/forms/CreateUnidadMedidaForm";
import EditUnidadMedidaForm from "./components/forms/EditUnidadMedidaForm";
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

const UnidadMedidaPage = () => {
  const {
    unidadesMedida,
    filteredUnidadesMedida,
    selectedUnidadesMedida,
    selectedUnidadMedida,
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
    handleUnidadMedidaCreado,
    handleUnidadMedidaEditado,
    handleError,
    setSelectedUnidadesMedida,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useUnidadMedida();

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
      <PageTitle title="Unidades de Medida" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateUnidadMedidaForm
          onSuccess={handleUnidadMedidaCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditUnidadMedidaForm
          idUnidadMedida={selectedUnidadMedida?.id}
          initialData={selectedUnidadMedida}
          onSuccess={handleUnidadMedidaEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar unidad de medida"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedUnidadesMedida.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear unidad de medida"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <UnidadMedidaTable
            unidadesMedida={filteredUnidadesMedida}
            selectedUnidadesMedida={selectedUnidadesMedida}
            setSelectedUnidadesMedida={setSelectedUnidadesMedida}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedUnidadesMedida.length > 1
                ? "las unidades de medida seleccionadas"
                : "la unidad de medida seleccionada"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default UnidadMedidaPage;
