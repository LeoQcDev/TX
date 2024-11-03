"use client";

import React from "react";
import { usePolos } from "./hooks/usePolos";
import PoleTable from "./components/PoleTable";
import CreatePoleForm from "./components/forms/CreatePoleForm";
import EditPoleForm from "./components/forms/EditPoleForm";
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

const PolePage = () => {
  const {
    polos,
    filteredPolos,
    selectedPolos,
    selectedPolo,
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
    handlePoloCreado,
    handlePoloEditado,
    handleError,
    setSelectedPolos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = usePolos();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando Polos..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Polos" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreatePoleForm
          onSuccess={handlePoloCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditPoleForm
          idPole={selectedPolo?.id}
          initialData={selectedPolo}
          onSuccess={handlePoloEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar Polo"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedPolos.length === 0} // Cambiar según la entidad
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear Polo" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <PoleTable
            poles={filteredPolos}
            selectedPoles={selectedPolos}
            setSelectedPoles={setSelectedPolos}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedPolos.length > 1
                ? "los polos seleccionados"
                : "el polo seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default PolePage;
