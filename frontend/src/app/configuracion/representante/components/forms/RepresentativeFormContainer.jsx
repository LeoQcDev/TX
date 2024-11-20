import React from "react";
import { useForm } from "react-hook-form";
import RepresentativeForm from "./RepresentativeForm";
import {
  createRepresentative,
  updateRepresentative,
} from "@/services/representativeServices/representatives";

const RepresentativeFormContainer = ({
  actionType,
  idRepresentative,
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
      name: initialData.name || "",
      last_name: initialData.last_name || "",
      representative_email: initialData.representative_email || "",
      representative_phone: initialData.representative_phone || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  //  Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Se usa función para crear
        await createRepresentative(data);
      } else {
        // Se usa función para actualizar
        await updateRepresentative(idRepresentative, data);
      }

      // Si todo OK
      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400) {
        if (
          error.response.data?.representative_email &&
          error.response.data?.representative_phone
        ) {
          setError("representative_email", {
            type: "manual",
            message: "Ya existe un Representante registrado con este correo",
          });
          setError("representative_phone", {
            type: "manual",
            message: "Ya existe un Representante registrado con este teléfono",
          });
          onError(
            "Error: Ya existe un Representante registrado con este correo y teléfono"
          );
        } else if (error.response.data?.representative_email) {
          setError("representative_email", {
            type: "manual",
            message: "Ya existe un Representante registrado con este correo",
          });
          onError(
            "Error: Ya existe un Representante registrado con este correo"
          );
        } else if (error.response.data?.representative_phone) {
          setError("representative_phone", {
            type: "manual",
            message: "Ya existe un Representante registrado con este teléfono",
          });
          onError(
            "Error: Ya existe un Representante registrado con este teléfono"
          );
        }
      } else {
        onError(
          `Error al ${
            actionType === "create" ? "crear" : "editar"
          } el Representante`
        );
      }
    }
  };

  return (
    <RepresentativeForm
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

export default RepresentativeFormContainer;
