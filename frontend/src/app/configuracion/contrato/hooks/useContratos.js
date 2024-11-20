import { useState, useEffect, useCallback, useMemo } from "react";
import {
  fetchContracts,
  deleteContract,
} from "@/services/contractServices/contract";
import Fuse from "fuse.js";

export const useContratos = () => {
  const [contratos, setContratos] = useState([]);
  const [selectedContratos, setSelectedContratos] = useState([]);
  const [selectedContrato, setSelectedContrato] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("contract_number");

  const obtenerContratos = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchContracts();
      setContratos(data);
    } catch (error) {
      setError("Error al obtener los contratos");
      handleError("Error al obtener los polos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    obtenerContratos();
  }, [obtenerContratos]);

  // Configurar búsqueda difusa
  const fuse = new Fuse(contratos, {
    // Buscar por número de contrato o por nombre del cliente
    keys:
      filterType === "contract_number" ? ["contract_number"] : ["client.name"],
    threshold: 0.3,
  });

  const filteredContratos = useMemo(() => {
    if (searchTerm.trim() === "") {
      return contratos;
    }
    return fuse.search(searchTerm).map((result) => result.item);
  }, [fuse, searchTerm, contratos]);

  const handleFilterTypeChange = (event) => {
    setFilterType(event.target.value); // Actualiza el tipo de filtro
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedContratos.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedContratos([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedContratos.map(async (idContract) => {
          await deleteContract(idContract);
        })
      );
      obtenerContratos();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedContratos.length > 1
          ? "Contratos eliminados exitosamente"
          : "Contrato eliminado exitosamente"
      );
    } catch (error) {
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el Contrato"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = (contrato) => {
    setSelectedContrato(contrato);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedContrato(null);
  };

  const handleContratoCreado = () => {
    setIsFormCreateOpen(false);
    obtenerContratos();
    showNotificationMessage("success", "Contrato creado exitosamente");
  };

  const handleContratoEditado = () => {
    setIsFormEditOpen(false);
    setSelectedContrato(null);
    obtenerContratos();
    showNotificationMessage("success", "Contrato editado exitosamente");
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
    contratos,
    filteredContratos,
    selectedContratos,
    selectedContrato,
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
    handleContratoCreado,
    handleContratoEditado,
    handleError,
    setSelectedContratos,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
