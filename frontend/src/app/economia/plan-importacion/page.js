"use client";

import React from "react";
import { usePlanesImportacion } from "./hooks/usePlanesImportacion";
import PlanImportacionTable from "./components/PlanImportacionTable";
import CreatePlanImportacionForm from "./components/forms/CreatePlanImportacionForm";
import EditPlanImportacionForm from "./components/forms/EditPlanImportacionForm";
import PlanImportacionDetail from "./components/PlanImportacionDetail";
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
    handleCloseDetalle,
    handlePlanImportacionCreado,
    handlePlanImportacionEditado,
    handleError,
    setSelectedPlanesImportacion,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
    showInactive,
    toggleActiveStatus,
  } = usePlanesImportacion();

  

  return (
  
    <PageLayout>
      <PageTitle title="Planes de Importación" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreatePlanImportacionForm
          onSuccess={handlePlanImportacionCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditPlanImportacionForm
          idPlanImportacion={selectedPlanImportacion?.id}
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
              placeholder="Buscar Plan de Importación"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedPlanesImportacion.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear Plan de Importación"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <button
            onClick={toggleActiveStatus}
            className="text-sm text-gray-600 hover:text-gray-900 transition-colors duration-200 text-left"
          >
            {showInactive
              ? "Mostrar planes activos"
              : "Mostrar planes inactivos"}
          </button>

          <PlanImportacionTable
            planesImportacion={filteredPlanesImportacion}
            selectedPlanesImportacion={selectedPlanesImportacion}
            setSelectedPlanesImportacion={setSelectedPlanesImportacion}
            onPlanImportacionDoubleClick={handlePlanImportacionDoubleClick}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedPlanesImportacion.length > 1
                ? "los planes seleccionados"
                : "el plan seleccionado"
            }
          />

          {selectedPlanImportacion && (
            <PlanImportacionDetail
              planImportacion={selectedPlanImportacion}
              onClose={handleCloseDetalle}
            />
          )}
        </>
      )}
    </PageLayout>
  );
};

export default PlanImportacionPage;