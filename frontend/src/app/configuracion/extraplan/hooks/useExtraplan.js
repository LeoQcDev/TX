import {
  deleteExtraplan,
  fetchExtraplanes,
} from "@/services/extraplaneServices/extraplanes";
import { fetchPlanesImportacion } from "@/services/planImportacionServices/planImportacionServices";
import Fuse from "fuse.js";
import {
  useCallback,
  useEffect,
  useCallback as useExtraplan,
  useMemo,
  useState,
} from "react";

export const useExtraplanes = () => {
  const [extraplanes, setExtraplanes] = useState([]);
  const [planesImportacion, setPlanesImportacion] = useState([]);
  const [selectedExtraplanes, setSelectedExtraplanes] = useState([]);
  const [selectedExtraplan, setSelectedExtraplan] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getExtraplanes = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const [data, planes] = await Promise.all([
        fetchExtraplanes(),
        fetchPlanesImportacion(),
      ]);
      // Crear un diccionario para un acceso más rápido por `id`
      const codesMap = planes.reduce((map, plan) => {
        map[plan.id] = plan.codigo_pi; // Clave: id, Valor: código
        return map;
      }, {});

      const updatedData = data.map(item => {
        const planImportacionId = item.plan_importacion;
        return {
          ...item,
          plan_importacion_codigo: codesMap[planImportacionId] || null,
        };
      });

      console.log("Datos actualizados con códigos:", updatedData);

      setPlanesImportacion(planes);
      setExtraplanes(updatedData);
    } catch (error) {
      console.log("se parte", error);
      setError("Error al obtener los Extraplanes");
      handleError("Error al obtener los Extraplanes");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    console.log("useEffect ejecutándose...");
    getExtraplanes();
  }, [getExtraplanes]);

  const fuse = useMemo(
    () =>
      new Fuse(extraplanes, {
        keys: ["motivo", "plan_importacion_codigo"],
        threshold: 0.3,
      }),
    [extraplanes]
  );

  const filteredExtraplanes = useMemo(() => {
    if (searchTerm.trim() === "") {
      return extraplanes;
    }
    return fuse.search(searchTerm).map(result => result.item);
  }, [fuse, searchTerm, extraplanes]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedExtraplanes.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedExtraplanes([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    handleCloseModal();
    try {
      await Promise.all(
        selectedExtraplanes.map(async ExtraplanId => {
          await deleteExtraplan(ExtraplanId);
        })
      );
      getExtraplanes();
      showNotificationMessage(
        "success",
        selectedExtraplanes.length > 1
          ? "Extraplanes eliminados exitosamente"
          : "Extraplan eliminado exitosamente"
      );
    } catch (error) {
     
      handleError(
        error.response?.data?.detail ||
          "Error desconocido al eliminar el Extraplan"
      );
      handleCloseModal();
    }
  };

  const handleCreateClick = () => {
    setIsFormCreateOpen(true);
  };

  const handleEditClick = Extraplan => {
    setSelectedExtraplan(Extraplan);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedExtraplan(null);
  };

  const handleExtraplanCreado = () => {
    setIsFormCreateOpen(false);
    getExtraplanes();
    showNotificationMessage("success", "Extraplan creado exitosamente");
  };

  const handleExtraplanEditado = () => {
    setIsFormEditOpen(false);
    setSelectedExtraplan(null);
    getExtraplanes();
    showNotificationMessage("success", "Extraplan editado exitosamente");
  };

  const handleError = message => {
    showNotificationMessage("error", message);
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  return {
    extraplanes,
    planesImportacion,
    filteredExtraplanes,
    selectedExtraplanes,
    selectedExtraplan,
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
    handleExtraplanCreado,
    handleExtraplanEditado,
    handleError,
    setSelectedExtraplanes,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
