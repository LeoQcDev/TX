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
import ObjectTable from "./components/ObjectTable";
import CreateObjectForm from "./components/forms/CreateObjectForm";
import EditObjectForm from "./components/forms/EditObjectForm";
import { useObjetos } from "./hooks/useObjetos";

const ObjectPage = () => {
  const {
    objects,
    filteredObjects,
    selectedObjects,
    selectedObject,
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
    handleObjectCreado,
    handleObjectEditado,
    handleError,
    setSelectedObjects,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useObjetos();

  // Usar el componente de carga y error para prevenir renderizado innecesario
  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando objetos..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Objetos" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateObjectForm
          onSuccess={handleObjectCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditObjectForm
          idObject={selectedObject?.id}
          initialData={selectedObject}
          onSuccess={handleObjectEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar objeto"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedObjects.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear objeto" // Cambiar según la entidad
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <ObjectTable
            objects={filteredObjects}
            selectedObjects={selectedObjects}
            setSelectedObjects={setSelectedObjects}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedObjects.length > 1
                ? "los objetos seleccionados"
                : "el objeto seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default ObjectPage;
