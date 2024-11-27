import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchUnidadesMedida,
  deleteUnidadMedida
} from "@/services/unidadMedidaServices/unidadMedida";

export const useUnidadMedida = () => {
  const [unidadesMedida, setUnidadesMedida] = useState([]);
  const [selectedUnidadesMedida, setSelectedUnidadesMedida] =
    useState([]);
  const [selectedUnidadMedida, setSelectedUnidadMedida] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getUnidadesMedida = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchUnidadesMedida();
      setUnidadesMedida(data);
    } catch (error) {
      setError("Error al obtener las unidades de medida.");
      handleError("Error al obtener las unidades de medida");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getUnidadesMedida();
  }, [getUnidadesMedida]);

  const filteredUnidadesMedida = useMemo(() => {
    if (searchTerm.trim() === "") {
      return unidadesMedida;
    }
    return unidadesMedida.filter((unidadMedida) =>
      unidadMedida.nombre_departamento.toString().includes(searchTerm)
    );
  }, [searchTerm, unidadesMedida]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedUnidadesMedida.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedUnidadesMedida([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedUnidadesMedida.map(async (unidadMedidaId) => {
          await deleteUnidadMedida(unidadMedidaId);
        })
      );
      getUnidadesMedida();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedUnidadesMedida.length > 1
          ? "Unidades de medida eliminadas exitosamente"
          : "Unidad de medida eliminada exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data.detail ||
          "Error desconocido al eliminar la unidad de medida"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (unidadMedida) => {
    setSelectedUnidadMedida(unidadMedida);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedUnidadMedida(null);
  };

  const handleUnidadMedidaCreado = () => {
    setIsFormCreateOpen(false);
    getUnidadesMedida();
    showNotificationMessage("success", "Unidad de medida creada exitosamente");
  };

  const handleUnidadMedidaEditado = () => {
    setIsFormEditOpen(false);
    setSelectedUnidadMedida(null);
    getUnidadesMedida();
    showNotificationMessage("success", "Unidad de medida editada exitosamente");
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
    unidadesMedida: unidadesMedida,
    filteredUnidadesMedida: filteredUnidadesMedida,
    selectedUnidadesMedida: selectedUnidadesMedida,
    selectedUnidadMedida,
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
    handleUnidadMedidaCreado,
    handleUnidadMedidaEditado,
    handleError,
    setSelectedUnidadesMedida: setSelectedUnidadesMedida,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
