"use client";

import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import LoadingErrorWrapper from "@/components/LoadingErrorWrapper";
import Notification from "@/components/Notification";
import PageButtonsLayout from "@/components/PageButtonsLayout";
import PageComponentsLayout from "@/components/PageComponentsLayout";
import PageLayout from "@/components/PageLayout";
import PageTitle from "@/components/PageTitle";
import SearchField from "@/components/SearchField";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import ExtraplanTable from "./components/ExtraplanTable";
import CreateExtraplanForm from "./components/forms/CreateExtraplanForm";
import EditExtraplanForm from "./components/forms/EditExtraplanForm";
import { useExtraplanes } from "./hooks/useExtraplan";

const ExtraplanPage = () => {
  const {  
    filteredExtraplanes,
    planesImportacion,
    selectedExtraplanes,
    selectedExtraplan,
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
    handleExtraplanCreado,
    handleExtraplanEditado,
    handleError,
    setSelectedExtraplanes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useExtraplanes();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando extraplanes..."
      />
    );
    console.log('extraplan_page',filteredExtraplanes)
  return (
    <PageLayout>
      <PageTitle title="Extraplanes" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateExtraplanForm
          onSuccess={handleExtraplanCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
          
        />
      ) : isFormEditOpen ? (
        <EditExtraplanForm
          planesImportacion={planesImportacion}
          idExtraplan={selectedExtraplan?.id}
          initialData={selectedExtraplan}
          onSuccess={handleExtraplanEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar extraplan"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedExtraplanes.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear extraplan"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <ExtraplanTable
            extraplanes={filteredExtraplanes}
            selectedExtraplanes={selectedExtraplanes}
            setSelectedExtraplanes={setSelectedExtraplanes}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedExtraplanes.length > 1
                ? "los extraplanes seleccionados"
                : "el extraplan seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default ExtraplanPage;
