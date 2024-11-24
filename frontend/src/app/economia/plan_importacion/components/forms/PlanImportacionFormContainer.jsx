import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  createPlanImportacion,
  updatePlanImportacion,
} from "@/services/planImportacionServices/planImportacionServices";
import { usePlanImportacionFormData } from "../../hooks/usePlanImportacionFormData";
import PlanImportacionForm from "./PlanImportacionForm";
import { formatYearAndNumber } from "@/utils/formatters";
import { useFormContext } from "@/contexts/FormContext";

const PlanImportacionFormContainer = ({
  actionType,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
  id,
}) => {
  console.log("initalData", initialData);
  const anio = initialData.anio_pi || new Date().getFullYear() + 1;
  const formattedInitialData = {
    ...initialData,
    cliente: initialData.cliente?.id || 0,
    fecha_emision:
      initialData.fecha_emision?.split("T")[0] ||
      new Date().toISOString().split("T")[0],
    importe_pi: initialData.importe_pi || "",
    anio_pi: anio,
    codigo_pi: initialData.codigo_pi || formatYearAndNumber(anio, id),
    objeto: initialData.objeto?.id?.toString() || "",
  };

  const anioDefault = actionType == 'edit' ? initialData.anio_pi : undefined;

  console.log("Initial Data Raw:", initialData);
  console.log("Formatted Initial Data:", formattedInitialData);

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
    getValues,
  } = useForm({
    defaultValues: formattedInitialData,
  });
  console.log("zzzzzzzzzzzzzzzzzzzzz", getValues());
  console.log(formattedInitialData);
  const { isLoading, clientes, objetos } = usePlanImportacionFormData();
  console.log("objetos", clientes);

  const anioPi = watch("anio_pi");
  const code = watch("codigo_pi");
  const { triggerSubmit } = useFormContext();
  const fecha = watch("fecha_emision");
 

  useEffect(() => {
    if (fecha) setValue("anio_pi", parseInt(fecha.split('-')[0]) + 1);
    if (anioPi && actionType == "create") {
      const codigoPi = formatYearAndNumber(
        parseInt(anioPi),
        initialData.id || 1
      );
      setValue("codigo_pi", codigoPi);
    }
  }, [anioPi, setValue, initialData.id, fecha]);

  const handleFormSubmit = async data => {
    console.log(parseInt(data.cliente));
    try {
      const formattedData = {
        cliente_id: parseInt(data.cliente),
        objeto: parseInt(data.objeto),
        fecha_emision: new Date(data.fecha_emision).toISOString(),
        importe_pi: parseFloat(data.importe_pi),
        anio_pi: parseInt(data.anio_pi),
        codigo_pi: data.codigo_pi,
      };

      if (actionType === "create") {
        await createPlanImportacion(formattedData);
        if (triggerSubmit) triggerSubmit();
      } else {
        await updatePlanImportacion(initialData.id, formattedData);
        if (triggerSubmit) triggerSubmit();
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
              : errorData[field],
          });
        });
      }
      onError(
        error.response?.data?.detail ||
          `Error al ${
            actionType === "create" ? "crear" : "editar"
          } el Plan de Importación`
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
      objetos={objetos}
      code={code}
      anioDefault={anioDefault}
    />
  );
};

export default PlanImportacionFormContainer;
