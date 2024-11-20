"use client";

import React from "react";
import { useForm } from "react-hook-form";
import ObjetoForm from "./ObjetoForm";
import { createObjeto, updateObjeto } from "@/services/objetoServices/objeto";

const ObjetoFormContainer = ({
  initialData = {},
  actionType = "create",
  onSuccess,
  onError,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    reset,
  } = useForm({
    defaultValues: initialData,
  });

  const onSubmit = async (data) => {
    try {
      if (actionType === "create") {
        await createObjeto(data);
      } else {
        await updateObjeto(initialData.id, data);
      }
      onSuccess();
      reset();
    } catch (error) {
      onError(error.response?.data?.detail || "Error al procesar el formulario");
    }
  };

  return (
    <ObjetoForm
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isSubmitting}
      actionType={actionType}
      onCancel={onCancel}
    />
  );
};

export default ObjetoFormContainer;