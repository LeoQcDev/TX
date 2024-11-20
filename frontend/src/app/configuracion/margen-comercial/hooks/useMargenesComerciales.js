import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchMargins, deleteMargin } from "@/services/marginServices/margins";

export const useMargenesComerciales = () => {
  const [margenesComerciales, setMargenesComerciales] = useState([]);
  const [selectedMargenesComerciales, setSelectedMargenesComerciales] =
    useState([]);
  const [selectedMargenComercial, setSelectedMargenComercial] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getComercialMargins = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchMargins();
      setMargenesComerciales(data);
    } catch (error) {
      setError("Error al obtener los margenes comerciales.");
      handleError("Error al obtener los polos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getComercialMargins();
  }, [getComercialMargins]);

  const filteredMargenesComerciales = useMemo(() => {
    if (searchTerm.trim() === "") {
      return margenesComerciales;
    }
    return margenesComerciales.filter((margenComercial) =>
      margenComercial.commercial_margin.toString().includes(searchTerm)
    );
  }, [searchTerm, margenesComerciales]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedMargenesComerciales.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedMargenesComerciales([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedMargenesComerciales.map(async (margenId) => {
          await deleteMargin(margenId);
        })
      );
      getComercialMargins();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedMargenesComerciales.length > 1
          ? "Márgenes Comerciales eliminados exitosamente"
          : "Margen Comercial eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data.detail ||
          "Error desconocido al eliminar el margen comercial"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (margenComercial) => {
    setSelectedMargenComercial(margenComercial);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedMargenComercial(null);
  };

  const handleMargenComercialCreado = () => {
    setIsFormCreateOpen(false);
    getComercialMargins();
    showNotificationMessage("success", "Margen Comercial creado exitosamente");
  };

  const handleMargenComercialEditado = () => {
    setIsFormEditOpen(false);
    setSelectedMargenComercial(null);
    getComercialMargins();
    showNotificationMessage("success", "Margen Comercial editado exitosamente");
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
    margenesComerciales,
    filteredMargenesComerciales,
    selectedMargenesComerciales,
    selectedMargenComercial,
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
    handleMargenComercialCreado,
    handleMargenComercialEditado,
    handleError,
    setSelectedMargenesComerciales,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
