"use client";

import React from "react";
import { useGenericoProducto } from "./hooks/useGenericoProducto";
import GenericoProductoTable from "./components/GenericoProductoTable";
import CreateGenericoProductoForm from "./components/forms/CreateGenericoProductoForm";
import EditGenericoProductoForm from "./components/forms/EditGenericoProductoForm";
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

const GenericoProductoPage = () => {
  const {
    genericosProducto,
    filteredGenericosProducto,
    selectedGenericosProducto,
    selectedGenericoProducto,
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
    handleGenericoProductoCreado,
    handleGenericoProductoEditado,
    handleError,
    setSelectedGenericosProducto,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  } = useGenericoProducto();

  if (isLoading || error)
    return (
      <LoadingErrorWrapper
        isLoading={isLoading}
        error={error}
        loadingMessage="Cargando genéricos de producto..."
      />
    );

  return (
    <PageLayout>
      <PageTitle title="Genéricos de Producto" />

      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}

      {isFormCreateOpen ? (
        <CreateGenericoProductoForm
          onSuccess={handleGenericoProductoCreado}
          onError={handleError}
          onCancel={handleCancelCreate}
        />
      ) : isFormEditOpen ? (
        <EditGenericoProductoForm
          idGenerico={selectedGenericoProducto?.id}
          initialData={selectedGenericoProducto}
          onSuccess={handleGenericoProductoEditado}
          onError={handleError}
          onCancel={handleCancelEdit}
        />
      ) : (
        <>
          <PageComponentsLayout>
            <SearchField
              searchTerm={searchTerm}
              handleSearchChange={handleSearchChange}
              placeholder="Buscar genérico de producto"
            />

            <PageButtonsLayout>
              <DeleteButton
                onClick={handleOpenModal}
                disabled={selectedGenericosProducto.length === 0}
              />
              <CreateButton
                onClick={handleCreateClick}
                label="Crear genérico"
              />
            </PageButtonsLayout>
          </PageComponentsLayout>

          <GenericoProductoTable
            genericosProducto={filteredGenericosProducto}
            selectedGenericosProducto={selectedGenericosProducto}
            setSelectedGenericosProducto={setSelectedGenericosProducto}
            onEditClick={handleEditClick}
            searchTerm={searchTerm}
          />

          <ConfirmationModal
            isOpen={isModalOpen}
            onClose={handleCloseModal}
            onConfirm={handleEliminar}
            entidad={
              selectedGenericosProducto.length > 1
                ? "los genéricos seleccionados"
                : "el genérico seleccionado"
            }
          />
        </>
      )}
    </PageLayout>
  );
};

export default GenericoProductoPage;