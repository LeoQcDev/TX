import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchGenericosProducto,
  deleteGenericoProducto,
} from "@/services/genericoProductoServices/genericosProducto";

export const useGenericoProducto = () => {
  const [genericoProductos, setGenericoProductos] = useState([]);
  const [selectedGenericoProductos, setSelectedGenericoProductos] =
    useState([]);
  const [selectedGenericoProducto, setSelectedGenericoProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getGenericoProductos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchGenericosProducto();
      setGenericoProductos(data);
    } catch (error) {
      setError("Error al obtener los productos genéricos.");
      handleError("Error al obtener los productos genéricos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getGenericoProductos();
  }, [getGenericoProductos]);

  const filteredGenericoProductos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return genericoProductos;
    }
    return genericoProductos.filter((genericoProducto) =>
      genericoProducto.name.toString().includes(searchTerm)
    );
  }, [searchTerm, genericoProductos]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedGenericoProductos.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedGenericoProductos([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedGenericoProductos.map(async (genericoProductoId) => {
          await deleteGenericoProducto(genericoProductoId);
        })
      );
      getGenericoProductos();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedGenericoProductos.length > 1
          ? "Productos genéricos eliminados exitosamente"
          : "Producto genérico eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data.detail ||
          "Error desconocido al eliminar el producto genérico"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (genericoProducto) => {
    setSelectedGenericoProducto(genericoProducto);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedGenericoProducto(null);
  };

  const handleGenericoProductoCreado = () => {
    setIsFormCreateOpen(false);
    getGenericoProductos();
    showNotificationMessage("success", "Producto genérico creado exitosamente");
  };

  const handleGenericoProductoEditado = () => {
    setIsFormEditOpen(false);
    setSelectedGenericoProducto(null);
    getGenericoProductos();
    showNotificationMessage("success", "Producto genérico editado exitosamente");
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
    genericosProducto: genericoProductos,
    filteredGenericosProducto: filteredGenericoProductos,
    selectedGenericosProducto: selectedGenericoProductos,
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
    setSelectedGenericosProducto: setSelectedGenericoProductos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
