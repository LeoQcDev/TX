import { createExtraplan, updateExtraplan } from "@/services/extraplaneServices/extraplanes"; 
import { useForm } from "react-hook-form";
import ExtraplanForm from "./ExtraplanForm";

const ExtraplanFormContainer = ({
  actionType,
  idExtraplan,
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
      plan_importacion: initialData.plan_importacion || "",
      importe_extraplan: initialData.importe || 0,
      motivo: initialData.motivo || "",
      fecha_emision:
        initialData.fecha_emision?.split("T")[0] ||
        new Date().toISOString().split("T")[0],
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  const handleFormSubmit = async data => {
    try {
      if (actionType === "create") {
        await createExtraplan(data);
      } else {
        await updateExtraplan(idExtraplan, data);
      }

      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400 && error.response.data?.nombre) {
        setError("nombre", {
          type: "manual",
          message: "Ya existe un Extraplan registrado con esta Nombre",
        });
        onError("Error: Ya existe un Extraplan registrado con esta Nombre");
      } else {
        onError(
          `Error al ${actionType === "create" ? "crear" : "editar"} el Extraplan`
        );
      }
    }
  };

  return (
    <ExtraplanForm
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

export default ExtraplanFormContainer;
