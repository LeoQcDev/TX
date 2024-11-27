import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchUnidadesCompra,
  deleteUnidadCompra
} from "@/services/unidadCompraServices/unidadesCompra";

export const useUnidadCompra = () => {
  const [unidadesCompra, setUnidadesCompra] = useState([]);
  const [selectedUnidadesCompra, setSelectedUnidadesCompra] =
    useState([]);
  const [selectedUnidadCompra, setSelectedUnidadCompra] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getUnidadesCompra = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUnidadesCompra();
      setUnidadesCompra(data);
    } catch (error) {
      setError("Error al obtener las unidades de compra.");
      handleError("Error al obtener las unidades de compra");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUnidadesCompra();
  }, [getUnidadesCompra]);

  const filteredUnidadesCompra = useMemo(() => {
    if (searchTerm.trim() === "") {
      return unidadesCompra;
    }
    return unidadesCompra.filter((unidadCompra) =>
      unidadCompra.nombre_departamento.toString().includes(searchTerm)
    );
  }, [searchTerm, unidadesCompra]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedUnidadesCompra.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedUnidadesCompra([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedUnidadesCompra.map(async (unidadCompraId) => {
          await deleteUnidadCompra(unidadCompraId);
        })
      );
      getUnidadesCompra();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedUnidadesCompra.length > 1
          ? "Unidades de compra eliminadas exitosamente"
          : "Unidad de compra eliminada exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data.detail ||
          "Error desconocido al eliminar la unidad de compra"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (unidadCompra) => {
    setSelectedUnidadCompra(unidadCompra);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedUnidadCompra(null);
  };

  const handleUnidadCompraCreado = () => {
    setIsFormCreateOpen(false);
    getUnidadesCompra();
    showNotificationMessage("success", "Unidad de compra creada exitosamente");
  };

  const handleUnidadCompraEditado = () => {
    setIsFormEditOpen(false);
    setSelectedUnidadCompra(null);
    getUnidadesCompra();
    showNotificationMessage("success", "Unidad de compra editada exitosamente");
  };

  const handleError = (message) => {
    showNotificationMessage("error", message);
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  return {
    unidadesCompra: unidadesCompra,
    filteredUnidadesCompra: filteredUnidadesCompra,
    selectedUnidadesCompra: selectedUnidadesCompra,
    selectedUnidadCompra,
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
    handleUnidadCompraCreado,
    handleUnidadCompraEditado,
    handleError,
    setSelectedUnidadesCompra: setSelectedUnidadesCompra,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
