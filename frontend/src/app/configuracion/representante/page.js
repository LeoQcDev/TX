"use client";

import React from "react";
import { useRepresentantes } from "./hooks/useRepresentantes";
import RepresentativeTable from "./components/RepresentativeTable";
import CreateRepresentativeForm from "./components/forms/CreateRepresentativeForm";
import EditRepresentativeForm from "./components/forms/EditRepresentativeForm";
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

const RepresentativePage = () => {
  const {
    representantes,
    selectedRepresentantes,
    selectedRepresentante,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredRepresentantes,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleCancelCreate,
    handleCancelEdit,
    handleRepresentanteCreado,
    handleRepresentanteEditado,
    handleError,
    setSelectedRepresentantes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useRepresentantes();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando representantes..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Representantes" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateRepresentativeForm
          onSuccess={handleRepresentanteCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditRepresentativeForm
          idRepresentative={selectedRepresentante?.id}
          initialData={selectedRepresentante}
          onSuccess={handleRepresentanteEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar representante"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedRepresentantes.length === 0} // Cambiar según la entidad
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear representante" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <RepresentativeTable
            representatives={filteredRepresentantes}
            selectedRepresentatives={selectedRepresentantes}
            setSelectedRepresentatives={setSelectedRepresentantes}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedRepresentantes.length > 1
                ? "los representantes seleccionados"
                : "el representante seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default RepresentativePage;
