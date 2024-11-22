import { createObject, updateObject } from "@/services/objectServices/objects"; // Importamos las funciones de servicio
import { useForm } from "react-hook-form";
import ObjectForm from "./ObjectForm";

const ObjectFormContainer = ({
  actionType,
  idObject,
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
      nombre: initialData.nombre || "",
      descripcion: initialData.descripcion || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = async data => {
    try {
      if (actionType === "create") {
        await createObject(data);
      } else {
        await updateObject(idObject, data);
      }

      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.nombre) {
        setError("nombre", {
          type: "manual",
          message: "Ya existe un Objeto registrado con esta Nombre",
        });
        onError("Error: Ya existe un Objeto registrado con esta Nombre");
      } else {
        onError(
          `Error al ${actionType === "create" ? "crear" : "editar"} el Objeto`
        );
      }
    }
  };

  return (
    <ObjectForm
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

export default ObjectFormContainer;
