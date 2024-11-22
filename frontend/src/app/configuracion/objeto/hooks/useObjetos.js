import { deleteObject, fetchObjects } from "@/services/objectServices/objects";
import Fuse from "fuse.js";
import { useCallback, useEffect, useMemo, useState } from "react";

export const useObjetos = () => {
  const [objects, setObjects] = useState([]);
  const [selectedObjects, setSelectedObjects] = useState([]);
  const [selectedObject, setSelectedObject] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFormCreateOpen, setIsFormCreateOpen] = useState(false);
  const [isFormEditOpen, setIsFormEditOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const getObjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await fetchObjects();
      setObjects(data);
    } catch (error) {
      setError("Error al obtener los Objetos");
      handleError("Error al obtener los Objetos");
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getObjects();
  }, [getObjects]);

  const fuse = useMemo(
    () =>
      new Fuse(objects, {
        keys: ["description"],
        threshold: 0.3,
      }),
    [objects]
  );

  const filteredObjects = useMemo(() => {
    if (searchTerm.trim() === "") {
      return objects;
    }
    return fuse.search(searchTerm).map(result => result.item);
  }, [fuse, searchTerm, objects]);

  const handleSearchChange = event => {
    setSearchTerm(event.target.value);
  };

  const handleOpenModal = () => {
    if (selectedObjects.length > 0) {
      setIsModalOpen(true);
    }
  };

  const handleCloseModal = () => {
    setSelectedObjects([]);
    setIsModalOpen(false);
  };

  const handleEliminar = async () => {
    try {
      await Promise.all(
        selectedObjects.map(async objectId => {
          await deleteObject(objectId);
        })
      );
      getObjects();
      handleCloseModal();
      showNotificationMessage(
        "success",
        selectedObjects.length > 1
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

  const handleEditClick = object => {
    setSelectedObject(object);
    setIsFormEditOpen(true);
  };

  const handleCancelCreate = () => {
    setIsFormCreateOpen(false);
  };

  const handleCancelEdit = () => {
    setIsFormEditOpen(false);
    setSelectedObject(null);
  };

  const handleObjectCreado = () => {
    setIsFormCreateOpen(false);
    getObjects();
    showNotificationMessage("success", "Objeto creado exitosamente");
  };

  const handleObjectEditado = () => {
    setIsFormEditOpen(false);
    setSelectedObject(null);
    getObjects();
    showNotificationMessage("success", "Objeto editado exitosamente");
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
    objects,
    filteredObjects,
    selectedObjects,
    selectedObject,
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
    handleObjectCreado,
    handleObjectEditado,
    handleError,
    setSelectedObjects,
    setShowNotification,
    setNotificationMessage,
    setNotificationType,
  };
};
