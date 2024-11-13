"use client";

import React from "react";
import { useMargenesComerciales } from "./hooks/useMargenesComerciales";
import ComercialMarginTable from "./components/ComercialMarginTable";
import CreateComercialMarginForm from "./components/forms/CreateComercialMarginForm";
import EditComercialMarginForm from "./components/forms/EditComercialMarginForm";
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

const ComercialMarginPage = () => {
  const {
    margenesComerciales,
    filteredMargenesComerciales,
    selectedMargenesComerciales,
    selectedMargenComercial,
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
    handleMargenComercialCreado,
    handleMargenComercialEditado,
    handleError,
    setSelectedMargenesComerciales,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useMargenesComerciales();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando márgenes comerciales..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Márgenes comerciales" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateComercialMarginForm
          onSuccess={handleMargenComercialCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditComercialMarginForm
          idMargin={selectedMargenComercial?.id}
          initialData={selectedMargenComercial}
          onSuccess={handleMargenComercialEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar margen"
              isNumber={true}
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedMargenesComerciales.length === 0} // Cambiar según la entidad
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear margen" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <ComercialMarginTable
            comercialMargins={filteredMargenesComerciales}
            selectedComercialMargins={selectedMargenesComerciales}
            setSelectedComercialMargins={setSelectedMargenesComerciales}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedMargenesComerciales.length > 1
                ? "los márgenes seleccionados"
                : "el margen seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default ComercialMarginPage;
