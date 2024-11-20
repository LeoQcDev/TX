"use client";

import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";
import FormTextArea from "@/components/form/FormTextArea";

const ObjetoForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo Objeto" : "Editar Objeto"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="nombre"
          label="Nombre del Objeto"
          type="text"
          placeholder="Ej: Objeto A"
          register={register("nombre", {
            required: "Campo obligatorio. Por favor complételo",
            maxLength: {
              value: 100,
              message: "El nombre no puede exceder los 100 caracteres",
            },
          })}
          component={FormInput}
          error={errors.nombre}
          watch={watch}
          required
        />

        <FormField
          id="descripcion"
          label="Descripción"
          placeholder="Descripción del objeto"
          register={register("descripcion", {
            required: "Campo obligatorio. Por favor complételo",
          })}
          component={FormTextArea}
          error={errors.descripcion}
          watch={watch}
          required
        />

        <FormButtons>
          <FormCancelButton onCancel={onCancel} isSubmitting={isSubmitting} />
          <FormConfirmButton
            isSubmitting={isSubmitting}
            action={actionType === "create" ? "crear" : "actualizar"}
          />
        </FormButtons>
      </form>
    </div>
  );
};

export default ObjetoForm;