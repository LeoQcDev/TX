import React from "react";
import { useForm } from "react-hook-form";
import UnidadCompraForm from "./UnidadCompraForm";
import { createUnidadCompra, updateUnidadCompra } from "@/services/unidadCompraServices/unidadesCompra";

const UnidadCompraFormContainer = ({
  actionType,
  idUnidadCompra,
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
      nombre_departamento: initialData.nombre_departamento || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Usamos la función para crear un Polo
        await createUnidadCompra(data);
      } else {
        // Usamos la función para actualizar un Polo
        await updateUnidadCompra(idUnidadCompra, data);
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
    <UnidadCompraForm
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

export default UnidadCompraFormContainer;
