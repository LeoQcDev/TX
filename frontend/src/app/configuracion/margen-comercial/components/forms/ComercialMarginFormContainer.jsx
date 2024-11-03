import React from "react";
import { useForm } from "react-hook-form";
import ComercialMarginForm from "./ComercialMarginForm";
import { createMargin, updateMargin } from "@/services/marginServices/margins"; // Importamos las funciones de servicio

const ComercialMarginFormContainer = ({
  actionType,
  idMargin,
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
      comercial_margin: initialData.comercial_margin || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Usamos la función para crear un Polo
        await createMargin(data);
      } else {
        // Usamos la función para actualizar un Polo
        await updateMargin(idMargin, data);
      }

      onSuccess(); // Llamar a la función de éxito si todo fue bien
      clearErrors();
      reset();
    } catch (error) {
      onError(
        `Error al ${
          actionType === "create" ? "crear" : "editar"
        } el Margen Comercial`
      );
    }
  };

  return (
    <ComercialMarginForm
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

export default ComercialMarginFormContainer;
