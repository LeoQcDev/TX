import React from "react";
import { useForm } from "react-hook-form";
import GenericoProductoForm from "./GenericoProductoForm";
import { createGenericoProducto, updateGenericoProducto } from "@/services/genericoProductoServices/genericosProducto"; // Importamos las funciones de servicio

const GenericoProductoFormContainer = ({
  actionType,
  idGenerico,
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
      grupo: initialData.grupo || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Usamos la función para crear un Polo
        await createGenericoProducto(data);
      } else {
        // Usamos la función para actualizar un Polo
        await updateGenericoProducto(idGenerico, data);
      }

      onSuccess(); // Llamar a la función de éxito si todo fue bien
      clearErrors();
      reset();
    } catch (error) {
      onError(
        `Error al ${
          actionType === "create" ? "crear" : "editar"
        } el producto genérico`
      );
    }
  };

  return (
    <GenericoProductoForm
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

export default GenericoProductoFormContainer;
