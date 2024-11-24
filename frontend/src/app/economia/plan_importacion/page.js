"use client";

import React from "react";
import { usePlanImportacionFormData } from "./hooks/usePlanImportacionFormData";
import PlanImportacionTable from "./components/PlanImportacionTable";
import CreatePlanImportacionForm from "./components/forms/CreatePlanImportacionForm";
import EditPlanImportacionForm from "./components/forms/EditPlanImportacionForm";
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
import { FormProvider } from "@/contexts/FormContext";

const PlanImportacionPage = () => {
  const {
    planesImportacion,
    selectedPlanesImportacion,
    selectedPlanImportacion,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredPlanesImportacion,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handlePlanImportacionDoubleClick,
    handleCancelCreate,
    handleCancelEdit,
    handlePlanImportacionCreado,
    handlePlanImportacionEditado,
    handleError,
    setSelectedPlanesImportacion,
    setShowNotification,
  } = usePlanImportacionFormData();

  if (isLoading || error) {
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando planes de importación..."
      />
    );
  }

  const id = (planesImportacion[planesImportacion.length - 1]?.id ?? 0) + 1;
  console.log("planes", filteredPlanesImportacion);
  console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaa", selectedPlanImportacion);

  return (
    <FormProvider>
      <PageLayout>
        <PageTitle>Planes de Importación</PageTitle>

        {showNotification && (
          <Notification
            message={notificationMessage}
            type={notificationType}
            onClose={() => setShowNotification(false)}
          />
        )}

        <div className="container mx-auto px-4 py-8">
          {isFormCreateOpen ? (
            <CreatePlanImportacionForm
              onSuccess={handlePlanImportacionCreado}
              onError={handleError}
              onCancel={handleCancelCreate}
              id={id}
            />
          ) : isFormEditOpen ? (
            <EditPlanImportacionForm
              initialData={selectedPlanImportacion}
              onSuccess={handlePlanImportacionEditado}
              onError={handleError}
              onCancel={handleCancelEdit}
            />
          ) : (
            <>
              <PageComponentsLayout>
                <SearchField
                  searchTerm={searchTerm}
                  handleSearchChange={handleSearchChange}
                  placeholder="Buscar plan de importación..."
                />

                <PageButtonsLayout>
                  <DeleteButton
                    onClick={handleOpenModal}
                    disabled={!selectedPlanesImportacion?.length}
                  />
                  <CreateButton
                    onClick={handleCreateClick}
                    label="Crear plan de importación"
                  />
                </PageButtonsLayout>
              </PageComponentsLayout>

              <div className="mt-8">
                <PlanImportacionTable
                  planesImportacion={filteredPlanesImportacion}
                  selectedPlanesImportacion={selectedPlanesImportacion}
                  setSelectedPlanesImportacion={setSelectedPlanesImportacion}
                  onPlanImportacionDoubleClick={
                    handlePlanImportacionDoubleClick
                  }
                  onEditClick={handleEditClick}
                  searchTerm={searchTerm}
                />
              </div>

              <ConfirmationModal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                onConfirm={handleEliminar}
                entidad={
                  selectedPlanesImportacion?.length > 1
                    ? "los planes de importación seleccionados"
                    : "el plan de importación seleccionado"
                }
              />
            </>
          )}
        </div>
      </PageLayout>
    </FormProvider>
  );
};

export default PlanImportacionPage;
