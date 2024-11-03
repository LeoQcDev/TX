import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchClients, deleteClient } from "@/services/clientServices/clients";
import Fuse from "fuse.js";

export const useClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [selectedClientes, setSelectedClientes] = useState([]);
  const [selectedCliente, setSelectedCliente] = useState(null);
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

  const obtenerClientes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchClients();
      setClientes(data);
    } catch (error) {
      setError("Error al obtener los Clientes");
      handleError("Error al obtener los Clientes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerClientes();
  }, [obtenerClientes]);

  const filteredClientes = useMemo(() => {
    const statusFiltered = clientes.filter((client) =>
      showInactive ? !client.client_status : client.client_status
    );

    if (searchTerm.trim() === "") {
      return statusFiltered;
    }
    const fuse = new Fuse(statusFiltered, {
      keys: ["name"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((result) => result.item);
  }, [clientes, searchTerm, showInactive]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedClientes.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedClientes([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedClientes.map(async (idClient) => {
          await deleteClient(idClient);
        })
      );
      obtenerClientes();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedClientes.length > 1
          ? "Clientes eliminados exitosamente"
          : "Cliente eliminado exitosamente"
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
    setIsFormCreateOpen(true); // Muestra el formulario de creación
  };

  const handleEditClick = (cliente) => {
    setSelectedCliente(cliente);
    setIsFormEditOpen(true); // Muestra el formulario de edición
  };

  const handleClienteDoubleClick = (cliente) => {
    setSelectedCliente(cliente);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false); // Cierra el formulario y vuelve al listado de clientes
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedCliente(null);
  };

  const handleCloseDetalle = () => {
    setSelectedCliente(null);
  };

  // Función que se ejecuta cuando el formulario se completa con éxito
  const handleClienteCreado = () => {
    setIsFormCreateOpen(false); // Cierra el formulario
    obtenerClientes(); // Actualiza la lista de clientes
    showNotificationMessage("success", "Cliente creado exitosamente");
  };

  const handleClienteEditado = () => {
    setIsFormEditOpen(false);
    setSelectedCliente(null);
    obtenerClientes();
    showNotificationMessage("success", "Cliente editado exitosamente");
  };

  const handleError = (message) => {
    setNotificationMessage(message); // Establece el mensaje de notificación
    setNotificationType("error"); // Establece el tipo de notificación como error
    setShowNotification(true); // Muestra la notificación
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const toggleActiveStatus = () => {
    setShowInactive(!showInactive);
    setSelectedClientes([]); // Limpiamos la selección al cambiar
  };

  return {
    clientes,
    selectedClientes,
    selectedCliente,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredClientes,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handleClienteDoubleClick,
    handleCancelCreate,
    handleCancelEdit,
    handleCloseDetalle,
    handleClienteCreado,
    handleClienteEditado,
    handleError,
    setSelectedClientes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
    showInactive,
    toggleActiveStatus,
  };
};
