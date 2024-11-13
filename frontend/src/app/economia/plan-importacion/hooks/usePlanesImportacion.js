import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchPlanesImportacion, deletePlanImportacion } from "@/services/planImportacionServices/planImportacion";
import Fuse from "fuse.js";

export const usePlanesImportacion = () => {
  const [planesImportacion, setPlanesImportacion] = useState([]);
  const [selectedPlanesImportacion, setSelectedPlanesImportacion] = useState([]);
  const [selectedPlanImportacion, setSelectedPlanImportacion] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");

  const [showInactive, setShowInactive] = useState(false);

  const obtenerPlanesImportacion = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPlanesImportacion();
      setPlanesImportacion(data);
    } catch (error) {
      setError("Error al obtener los Planes de Importación");
      handleError("Error al obtener los Planes de Importación");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerPlanesImportacion();
  }, [obtenerPlanesImportacion]);

  const filteredPlanesImportacion = useMemo(() => {
    const statusFiltered = planesImportacion.filter((plan) =>
      showInactive ? !plan.plan_status : plan.plan_status
    );

    if (searchTerm.trim() === "") {
      return statusFiltered;
    }
    const fuse = new Fuse(statusFiltered, {
      keys: ["codigo_pi", "cliente.name"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((result) => result.item);
  }, [planesImportacion, searchTerm, showInactive]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedPlanesImportacion.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedPlanesImportacion([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedPlanesImportacion.map(async (idPlanImportacion) => {
          await deletePlanImportacion(idPlanImportacion);
        })
      );
      obtenerPlanesImportacion();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedPlanesImportacion.length > 1
          ? "Planes de Importación eliminados exitosamente"
          : "Plan de Importación eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el Plan de Importación"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (planImportacion) => {
    setSelectedPlanImportacion(planImportacion);
    setIsFormEditOpen(true);
  };

  const handlePlanImportacionDoubleClick = (planImportacion) => {
    setSelectedPlanImportacion(planImportacion);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedPlanImportacion(null);
  };

  const handleCloseDetalle = () => {
    setSelectedPlanImportacion(null);
  };

  const handlePlanImportacionCreado = () => {
    setIsFormCreateOpen(false);
    obtenerPlanesImportacion();
    showNotificationMessage("success", "Plan de Importación creado exitosamente");
  };

  const handlePlanImportacionEditado = () => {
    setIsFormEditOpen(false);
    setSelectedPlanImportacion(null);
    obtenerPlanesImportacion();
    showNotificationMessage("success", "Plan de Importación editado exitosamente");
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

  const toggleActiveStatus = () => {
    setShowInactive(!showInactive);
    setSelectedPlanesImportacion([]);
  };

  return {
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
  };
};