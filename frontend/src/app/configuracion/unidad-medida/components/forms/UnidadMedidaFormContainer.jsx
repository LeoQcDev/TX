import React from "react";
import { useForm } from "react-hook-form";
import UnidadMedidaForm from "./UnidadMedidaForm";
import { createUnidadMedida, updateUnidadMedida } from "@/services/unidadMedidaServices/unidadMedida";

const UnidadMedidaFormContainer = ({
  actionType,
  idUnidadMedida,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    clearErrors,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      nombre: initialData.nombre || "",
      denominacion: initialData.denominacion || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Usamos la función para crear un Polo
        await createUnidadMedida(data);
      } else {
        // Usamos la función para actualizar un Polo
        await updateUnidadMedida(idUnidadMedida, data);
      }

      onSuccess(); // Llamar a la función de éxito si todo fue bien
      clearErrors();
      reset();
    } catch (error) {
      onError(
        `Error al ${
          actionType === "create" ? "crear" : "editar"
        } la unidad de compra`
      );
    }
  };

  return (
    <UnidadMedidaForm
      handleSubmit={handleSubmit(handleFormSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isSubmitting}
      actionType={actionType}
      onCancel={onCancel}
    />
  );
};

export default UnidadMedidaFormContainer;
