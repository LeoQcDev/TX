import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPoles, deletePole } from "@/services/poleServices/poles";
import Fuse from "fuse.js";

export const usePolos = () => {
  const [polos, setPolos] = useState([]);
  const [selectedPolos, setSelectedPolos] = useState([]);
  const [selectedPolo, setSelectedPolo] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getPoles = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPoles();
      setPolos(data);
    } catch (error) {
      setError("Error al obtener los Polos");
      handleError("Error al obtener los Polos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getPoles();
  }, [getPoles]);

  const fuse = useMemo(
    () =>
      new Fuse(polos, {
        keys: ["denomination"],
        threshold: 0.3,
      }),
    [polos]
  );

  const filteredPolos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return polos;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [fuse, searchTerm, polos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedPolos.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedPolos([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedPolos.map(async (poloId) => {
          await deletePole(poloId);
        })
      );
      getPoles();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedPolos.length > 1
          ? "Polos eliminados exitosamente"
          : "Polo eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail || "Error desconocido al eliminar el Polo"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (polo) => {
    setSelectedPolo(polo);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedPolo(null);
  };

  const handlePoloCreado = () => {
    setIsFormCreateOpen(false);
    getPoles();
    showNotificationMessage("success", "Polo creado exitosamente");
  };

  const handlePoloEditado = () => {
    setIsFormEditOpen(false);
    setSelectedPolo(null);
    getPoles();
    showNotificationMessage("success", "Polo editado exitosamente");
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
    polos,
    filteredPolos,
    selectedPolos,
    selectedPolo,
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
    handlePoloCreado,
    handlePoloEditado,
    handleError,
    setSelectedPolos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
