"use client";

import React from "react";
import { useObjetos } from "./hooks/useObjeto";
import ObjetoTable from "./components/ObjetoTable.jsx";
import CreateObjetoForm from "./components/forms/CreateObjetoForm";
import EditObjetoForm from "./components/forms/EditObjetoForm";
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

const ObjetoPage = () => {
  const {
    objetos,
    filteredObjetos,
    selectedObjetos,
    selectedObjeto,
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
    handleObjetoCreado,
    handleObjetoEditado,
    handleError,
    setSelectedObjetos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useObjetos();

  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando Objetos..."
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
        <CreateObjetoForm
          onSuccess={handleObjetoCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditObjetoForm
          idObjeto={selectedObjeto?.id}
          initialData={selectedObjeto}
          onSuccess={handleObjetoEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar Objeto"
              isNumber={false}
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedObjetos.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear Objeto"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <ObjetoTable
            objetos={filteredObjetos}
            selectedObjetos={selectedObjetos}
            setSelectedObjetos={setSelectedObjetos}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedObjetos.length > 1
                ? "los objetos seleccionados"
                : "el objeto seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default ObjetoPage;