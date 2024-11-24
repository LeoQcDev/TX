import { useState, useEffect, useCallback, useMemo } from "react";
import { fetchClients } from "@/services/clientServices/clients";
import {
  fetchPlanesImportacion,
  deletePlanImportacion,
} from "@/services/planImportacionServices/planImportacionServices";
import { fetchObjects } from "@/services/objectServices/objects";
import { fetchExtraplanes } from "@/services/extraplaneServices/extraplanes";

export const usePlanImportacionFormData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [objetos, setObjetos] = useState([]);
  const [planesImportacion, setPlanesImportacion] = useState([]);
  const [planesImportacionFull, setPlanesImportacionFull] = useState([]);
  const [selectedPlanesImportacion, setSelectedPlanesImportacion] = useState(
    []
  );
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
      console.log("Obteniendo planes de importación...");

      const [clientesData, planesData, extraplanData] = await Promise.all([
        fetchClients(),
        fetchPlanesImportacion(),
        fetchExtraplanes(),
      ]);
      // const objetosData =  localStorage.getItem(planId);
      console.log("Datos sin formatear:", {
        clientesData,
        planesData,
      });

      const clientesFormateados = clientesData.map(cliente => ({
        id: cliente.id,
        name: cliente.name,
      }));
      console.log("Clientes formateados:", clientesFormateados);
      const planesFormateados = planesData.map(plan => ({
        id: plan.id,
        codigo_pi: plan.codigo_pi,
        cliente: {
          id: plan.cliente.id,
          name: plan.cliente.name,
        },
        fecha_emision: plan.fecha_emision,
        anio_pi: plan.anio_pi,
        importe_pi: plan.importe_pi,
      }));
      console.log("Datos formateados:", {
        clientesFormateados,
        planesFormateados,
      });

      const fullPlandata = planesData.map(plan => {
        const planId = plan.id;
        const objetos = localStorage.getItem(plan.codigo_pi) || [];
        const extraplanes = extraplanData.filter(
          extraplan => extraplan.plan_importacion === planId
        );
        console.log("fffffff", objetos);
        return {
          ...plan,
          objetos: objetos.length > 0 ? JSON.parse(objetos) : [],
          extraplanes: extraplanes,
        };
      });
      setPlanesImportacionFull(fullPlandata);

      console.log("Datos full plan:", fullPlandata);

      setClientes(clientesFormateados);
      setPlanesImportacion(planesFormateados);

      setError(null);
    } catch (error) {
      console.error("Error completo:", error);
      setError("Error al cargar los datos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getFullDatosById = id => {
    return planesImportacionFull.find(p => p.id == id);
  };

  useEffect(() => {
    console.log("useEffect ejecutándose...");
    obtenerPlanesImportacion();
  }, [obtenerPlanesImportacion]);

  const handleSearchChange = e => {
    setSearchTerm(e.target.value);
  };

  const filteredPlanesImportacion = useMemo(() => {
    return planesImportacion.filter(plan => {
      const searchString = searchTerm.toLowerCase();
      return (
        plan.codigo_pi?.toLowerCase().includes(searchString) ||
        plan.cliente?.name?.toLowerCase().includes(searchString) ||
        plan.anio_pi?.toString().includes(searchString)
      );
    });
  }, [planesImportacion, searchTerm]);

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

  const handleEditClick = planImportacion => {
    setSelectedPlanImportacion(planImportacion);
    console.log("slectedplan", planImportacion);
    setIsFormEditOpen(true);
  };

  const handlePlanImportacionDoubleClick = planImportacion => {
    setSelectedPlanImportacion(planImportacion);
  };

  const handleEliminar = async () => {
    setIsModalOpen(false);
    try {
      await Promise.all(
        selectedPlanesImportacion.map(plan => deletePlanImportacion(plan))
      );
      obtenerPlanesImportacion();
      setSelectedPlanesImportacion([]);
      showNotificationMessage(
        "success",
        "Plan(es) de importación eliminado(s) exitosamente"
      );
    } catch (error) {
      showNotificationMessage(
        "error",
        error.response?.data?.detail ||
          "Error al eliminar el/los plan(es) de importación"
      );
    }
  };

  const handlePlanImportacionCreado = () => {
    setIsFormCreateOpen(false);
    obtenerPlanesImportacion();
    showNotificationMessage(
      "success",
      "Plan de Importación creado exitosamente"
    );
  };

  const handlePlanImportacionEditado = () => {
    setIsFormEditOpen(false);
    setSelectedPlanImportacion(null);
    obtenerPlanesImportacion();
    showNotificationMessage(
      "success",
      "Plan de Importación editado exitosamente"
    );
  };

  const handleError = message => {
    showNotificationMessage("error", message);
  };

  console.log("Estado actual:", {
    planesImportacion,
    filteredPlanesImportacion,
    isLoading,
    error,
  });

  return {
    isLoading,
    error,
    clientes,
    planesImportacion,
    getFullDatosById,
    objetos,
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
