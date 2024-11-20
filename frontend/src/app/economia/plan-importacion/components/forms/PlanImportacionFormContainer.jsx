import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PlanImportacionForm from "./PlanImportacionForm";
import { 
  createPlanImportacion, 
  updatePlanImportacion 
} from "@/services/planImportacionServices/planImportacion";
import { fetchClients } from "@/services/clientServices/clients";

const PlanImportacionFormContainer = ({
  actionType,
  idPlanImportacion,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  // Estado para los clientes del dropdown
  const [clients, setClients] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      codigo_pi: initialData.codigo_pi || "",
      cliente: initialData.cliente?.id || "",
      fecha_emision: initialData.fecha_emision || "",
      importe_pi: initialData.importe_pi || "",
      anio_pi: initialData.anio_pi || new Date().getFullYear(),
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Cargar clientes al montar el componente
  useEffect(() => {
    const loadClients = async () => {
      try {
        const clientsData = await fetchClients();
        setClients(clientsData.filter(client => client.client_status));
      } catch (error) {
        console.error("Error cargando clientes:", error);
        onError("Error cargando los clientes disponibles");
      }
    };
    loadClients();
  }, [onError]);

  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        await createPlanImportacion(data);
      } else {
        await updatePlanImportacion(idPlanImportacion, data);
      }
      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400) {
        if (error.response.data?.codigo_pi) {
          setError("codigo_pi", {
            type: "manual",
            message: "Ya existe un Plan de Importación con este código",
          });
          onError("Error: Ya existe un Plan de Importación con este código");
        } else {
          onError("Error en los datos del formulario");
        }
      } else {
        onError(
          `Error al ${
            actionType === "create" ? "crear" : "actualizar"
          } el Plan de Importación`
        );
      }
    }
  };

  return (
    <PlanImportacionForm
      handleSubmit={handleSubmit(handleFormSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isSubmitting}
      actionType={actionType}
      onCancel={onCancel}
      clients={clients}
    />
  );
};

export default PlanImportacionFormContainer;