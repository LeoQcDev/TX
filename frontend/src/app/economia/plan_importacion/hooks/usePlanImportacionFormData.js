import { useState, useEffect, useCallback } from "react";
import { fetchClients } from "@/services/clientServices/clients";
import { 
  fetchPlanesImportacion,
  deletePlanImportacion 
} from "@/services/planImportacionServices/planImportacionServices";

export const usePlanImportacionFormData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [planesImportacion, setPlanesImportacion] = useState([]);
  const [selectedPlanesImportacion, setSelectedPlanesImportacion] = useState([]);
  const [selectedPlanImportacion, setSelectedPlanImportacion] = useState(null);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const obtenerPlanesImportacion = useCallback(async () => {
    try {
      setIsLoading(true);
      console.log('Obteniendo planes de importación...');
      
      const [clientesData, planesData] = await Promise.all([
        fetchClients(),
        fetchPlanesImportacion(),
      ]);

      console.log('Datos sin formatear:', { clientesData, planesData });

      const clientesFormateados = clientesData.map(cliente => ({
        id: cliente.id,
        name: cliente.name,
      }));
      console.log('Clientes formateados:', clientesFormateados);
      const planesFormateados = planesData.map(plan => ({
        id: plan.id,
        codigo_pi: plan.codigo_pi,
        cliente: {
          id: plan.cliente.id,
          name: plan.cliente.name
        },
        fecha_emision: plan.fecha_emision,
        anio_pi: plan.anio_pi,
        importe_pi: plan.importe_pi
      }));
      console.log('Datos formateados:', {
        clientesFormateados,
        planesFormateados
      });

      setClientes(clientesFormateados);
      setPlanesImportacion(planesFormateados);
      setError(null);
    } catch (error) {
      console.error('Error completo:', error);
      setError("Error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log('useEffect ejecutándose...');
    obtenerPlanesImportacion();
  }, [obtenerPlanesImportacion]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredPlanesImportacion = planesImportacion.filter((plan) => {
    const searchString = searchTerm.toLowerCase();
    return (
      plan.codigo_pi?.toLowerCase().includes(searchString) ||
      plan.cliente?.name?.toLowerCase().includes(searchString) ||
      plan.anio_pi?.toString().includes(searchString)
    );
  });

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);
  const handleCreateClick = () => setIsFormCreateOpen(true);
  const handleCancelCreate = () => setIsFormCreateOpen(false);
  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedPlanImportacion(null);
  };

  const handleEditClick = (planImportacion) => {
    setSelectedPlanImportacion(planImportacion);
    setIsFormEditOpen(true);
  };

  const handlePlanImportacionDoubleClick = (planImportacion) => {
    setSelectedPlanImportacion(planImportacion);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedPlanesImportacion.map((plan) => deletePlanImportacion(plan.id))
      );
      obtenerPlanesImportacion();
      setSelectedPlanesImportacion([]);
      setIsModalOpen(false);
      showNotificationMessage("success", "Plan(es) de importación eliminado(s) exitosamente");
    } catch (error) {
      showNotificationMessage("error", "Error al eliminar el/los plan(es) de importación");
    }
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
    showNotificationMessage("error", message);
  };

  console.log('Estado actual:', {
    planesImportacion,
    filteredPlanesImportacion,
    isLoading,
    error
  });

  return {
    isLoading,
    error,
    clientes,
    planesImportacion,
    selectedPlanesImportacion,
    selectedPlanImportacion,
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
    handlePlanImportacionCreado,
    handlePlanImportacionEditado,
    handleError,
    setSelectedPlanesImportacion,
    setShowNotification,
  };
}; 