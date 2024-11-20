import React from "react";
import { useForm } from "react-hook-form";
import { 
  createPlanImportacion, 
  updatePlanImportacion 
} from "@/services/planImportacionServices/planImportacionServices";
import { usePlanImportacionFormData } from "../../hooks/usePlanImportacionFormData";
import PlanImportacionForm from "./PlanImportacionForm";

const PlanImportacionFormContainer = ({
  actionType,
  idPlanImportacion,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  const formattedInitialData = {
    ...initialData,
    cliente: initialData.cliente?.id?.toString() || '',
    fecha_emision: initialData.fecha_emision || new Date().toISOString().split('T')[0],
    importe_pi: initialData.importe_pi || '',
    anio_pi: initialData.anio_pi || new Date().getFullYear(),
    codigo_pi: initialData.codigo_pi || ''
  };

  console.log('Initial Data Raw:', initialData);
  console.log('Formatted Initial Data:', formattedInitialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    clearErrors,
    reset,
    setError,
  } = useForm({
    defaultValues: formattedInitialData
  });

  const { isLoading, clientes } = usePlanImportacionFormData();

  const handleFormSubmit = async (data) => {
    try {
      const formattedData = {
        cliente: parseInt(data.cliente),
        fecha_emision: new Date(data.fecha_emision).toISOString(),
        importe_pi: parseFloat(data.importe_pi),
        anio_pi: parseInt(data.anio_pi),
        codigo_pi: data.codigo_pi
      };

      if (actionType === "create") {
        await createPlanImportacion(formattedData);
      } else {
        await updatePlanImportacion(idPlanImportacion, formattedData);
      }

      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        Object.keys(errorData).forEach(field => {
          setError(field, {
            type: "manual",
            message: Array.isArray(errorData[field]) 
              ? errorData[field][0] 
              : errorData[field]
          });
        });
      }
      onError(
        error.response?.data?.detail || 
        `Error al ${actionType === "create" ? "crear" : "editar"} el Plan de Importación`
      );
    }
  };

  return (
    <PlanImportacionForm
      handleSubmit={handleSubmit(handleFormSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isLoading}
      actionType={actionType}
      onCancel={onCancel}
      setValue={setValue}
      control={control}
      clientes={clientes}
    />
  );
};

export default PlanImportacionFormContainer; 