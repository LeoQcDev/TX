import { useState, useCallback, useEffect, useMemo } from "react";
import { fetchPedidos, createPedido, updatePedido, deletePedido } from "@/services/pedidoServices/pedidos";
import Fuse from "fuse.js";

export const usePedidos = () => {
  const [pedidos, setPedidos] = useState([]);
  const [selectedPedidos, setSelectedPedidos] = useState([]);
  const [selectedPedido, setSelectedPedido] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const obtenerPedidos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchPedidos();
      setPedidos(data);
    } catch (error) {
      setError("Error al obtener los pedidos");
      handleError("Error al obtener los pedidos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerPedidos();
  }, [obtenerPedidos]);

  const filteredPedidos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return pedidos;
    }
    const fuse = new Fuse(pedidos, {
      keys: ["numero_711", "cliente.name"],
      threshold: 0.3,
    });
    return fuse.search(searchTerm).map((result) => result.item);
  }, [pedidos, searchTerm]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedPedidos.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedPedidos([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedPedidos.map(async (idPedido) => {
          await deletePedido(idPedido);
        })
      );
      obtenerPedidos();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedPedidos.length > 1
          ? "Pedidos eliminados exitosamente"
          : "Pedido eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el pedido"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (pedido) => {
    setSelectedPedido(pedido);
    setIsFormEditOpen(true);
  };

  const handlePedidoDoubleClick = (pedido) => {
    setSelectedPedido(pedido);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedPedido(null);
  };

  const handlePedidoCreado = () => {
    setIsFormCreateOpen(false);
    obtenerPedidos();
    showNotificationMessage("success", "Pedido creado exitosamente");
  };

  const handlePedidoEditado = () => {
    setIsFormEditOpen(false);
    setSelectedPedido(null);
    obtenerPedidos();
    showNotificationMessage("success", "Pedido editado exitosamente");
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
    pedidos,
    selectedPedidos,
    selectedPedido,
    isLoading,
    error,
    isModalOpen,
    isFormCreateOpen,
    isFormEditOpen,
    notificationMessage,
    notificationType,
    showNotification,
    filteredPedidos,
    searchTerm,
    handleSearchChange,
    handleOpenModal,
    handleCloseModal,
    handleEliminar,
    handleCreateClick,
    handleEditClick,
    handlePedidoDoubleClick,
    handleCancelCreate,
    handleCancelEdit,
    handlePedidoCreado,
    handlePedidoEditado,
    handleError,
    setSelectedPedidos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
}; 