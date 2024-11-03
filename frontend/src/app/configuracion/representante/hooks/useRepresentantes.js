import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchRepresentatives,
  deleteRepresentative,
} from "@/services/representativeServices/representatives";
import Fuse from "fuse.js";

export const useRepresentantes = () => {
  const [representantes, setRepresentantes] = useState([]);
  const [selectedRepresentantes, setSelectedRepresentantes] = useState([]);
  const [selectedRepresentante, setSelectedRepresentante] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const getRepresentantatives = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchRepresentatives();
      setRepresentantes(data);
    } catch (error) {
      setError("Error al obtener los representantes");
      handleError("Error al obtener los representantes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getRepresentantatives();
  }, [getRepresentantatives]);

  // Configurar búsqueda difusa
  const fuse = new Fuse(representantes, {
    // Buscar por nombre y apellido
    keys: ["name", "last_name"],
    threshold: 0.3,
  });

  const filteredRepresentantes = useMemo(() => {
    if (searchTerm.trim() === "") {
      return representantes;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [fuse, searchTerm, representantes]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedRepresentantes.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedRepresentantes([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedRepresentantes.map(async (representanteId) => {
          await deleteRepresentative(representanteId);
        })
      );
      getRepresentantatives();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedRepresentantes.length > 1
          ? "Representantes eliminados exitosamente"
          : "Representante eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el Representante"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (representante) => {
    setSelectedRepresentante(representante);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedRepresentante(null);
  };

  const handleRepresentanteCreado = () => {
    setIsFormCreateOpen(false);
    getRepresentantatives();
    showNotificationMessage("success", "Representante creado exitosamente");
  };

  const handleRepresentanteEditado = () => {
    setIsFormEditOpen(false);
    setSelectedRepresentante(null);
    getRepresentantatives();
    showNotificationMessage("success", "Representante editado exitosamente");
  };

  const handleError = (message) => {
    setNotificationMessage(message);
    setNotificationType("error");
    setShowNotification(true);
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  return {
    representantes,
    selectedRepresentantes,
    selectedRepresentante,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredRepresentantes,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleCancelCreate,
    handleCancelEdit,
    handleRepresentanteCreado,
    handleRepresentanteEditado,
    handleError,
    setSelectedRepresentantes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
