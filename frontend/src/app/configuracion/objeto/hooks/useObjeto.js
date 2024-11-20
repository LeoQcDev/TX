import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchObjetos,
  deleteObjeto,
} from "@/services/objetoServices/objeto";
import Fuse from "fuse.js";

export const useObjetos = () => {
  const [objetos, setObjetos] = useState([]);
  const [selectedObjetos, setSelectedObjetos] = useState([]);
  const [selectedObjeto, setSelectedObjeto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("nombre");

  const obtenerObjetos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchObjetos();
      setObjetos(data);
    } catch (error) {
      setError("Error al obtener los objetos");
      handleError("Error al obtener los objetos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerObjetos();
  }, [obtenerObjetos]);

  // Configurar búsqueda difusa
  const fuse = new Fuse(objetos, {
    keys: filterType === "nombre" ? ["nombre"] : ["descripcion"],
    threshold: 0.3,
  });

  const filteredObjetos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return objetos;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [fuse, searchTerm, objetos]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedObjetos.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedObjetos([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedObjetos.map(async (idObjeto) => {
          await deleteObjeto(idObjeto);
        })
      );
      obtenerObjetos();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedObjetos.length > 1
          ? "Objetos eliminados exitosamente"
          : "Objeto eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el Objeto"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (objeto) => {
    setSelectedObjeto(objeto);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedObjeto(null);
  };

  const handleObjetoCreado = () => {
    setIsFormCreateOpen(false);
    obtenerObjetos();
    showNotificationMessage("success", "Objeto creado exitosamente");
  };

  const handleObjetoEditado = () => {
    setIsFormEditOpen(false);
    setSelectedObjeto(null);
    obtenerObjetos();
    showNotificationMessage("success", "Objeto editado exitosamente");
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
    filterType,
    notificationMessage,
    notificationType,
    showNotification,
    handleSearchChange,
    setFilterType,
    handleFilterTypeChange,
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
  };
};