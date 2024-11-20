"use client";

import React from "react";
import { usePlanImportacionFormData } from "./hooks/usePlanImportacionFormData";
import PlanImportacionTable from "./components/forms/PlanImportacionTable";
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

  return (
    <PageLayout>
      <PageTitle>Planes de Importación</PageTitle>

      <PageButtonsLayout>
        <DeleteButton
          onClick={handleOpenModal}
          disabled={!selectedPlanesImportacion?.length}
        />
        <CreateButton onClick={handleCreateClick} />
        <SearchField
          value={searchTerm}
          onChange={handleSearchChange}
          placeholder="Buscar plan de importación..."
        />
      </PageButtonsLayout>

      <PageComponentsLayout>
        <PlanImportacionTable
          planesImportacion={filteredPlanesImportacion}
          selectedPlanesImportacion={selectedPlanesImportacion}
          setSelectedPlanesImportacion={setSelectedPlanesImportacion}
          onPlanImportacionDoubleClick={handlePlanImportacionDoubleClick}
          onEditClick={handleEditClick}
          searchTerm={searchTerm}
        />
      </PageComponentsLayout>

      {isFormCreateOpen && (
        <CreatePlanImportacionForm
          onSuccess={handlePlanImportacionCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      )}

      {isFormEditOpen && selectedPlanImportacion && (
        <EditPlanImportacionForm
          planImportacion={selectedPlanImportacion}
          onSuccess={handlePlanImportacionEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      )}

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

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
    </PageLayout>
  );
};

export default PlanImportacionPage;