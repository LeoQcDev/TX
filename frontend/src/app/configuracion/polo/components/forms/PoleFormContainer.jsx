import React from "react";
import { useForm } from "react-hook-form";
import PoleForm from "./PoleForm";
import { createPole, updatePole } from "@/services/poleServices/poles"; // Importamos las funciones de servicio

const PoleFormContainer = ({
  actionType,
  idPole,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
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
      denomination: initialData.denomination || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Usamos la función para crear un Polo
        await createPole(data);
      } else {
        // Usamos la función para actualizar un Polo
        await updatePole(idPole, data);
      }

      onSuccess(); // Llamar a la función de éxito si todo fue bien
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.denominacion) {
        setError("denomination", {
          type: "manual",
          message: "Ya existe un Polo registrado con esta denominación",
        });
        onError("Error: Ya existe un Polo registrado con esta denominación");
      } else {
        onError(
          `Error al ${actionType === "create" ? "crear" : "editar"} el Polo`
        );
      }
    }
  };

  return (
    <PoleForm
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

export default PoleFormContainer;
