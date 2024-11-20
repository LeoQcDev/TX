// Componente presentacional
"use client";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

const ComercialMarginForm = ({
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
        {actionType === "create" ? "Nuevo Margen" : "Editar Margen"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="comercial_margin"
          label="Cantidad margen"
          type="number"
          placeholder="Ej: 25"
          register={register("comercial_margin", {
            required: "Campo obligatorio. Por favor complételo",
            min: {
              value: 1,
              message: "El valor mínimo es 1",
            },
            max: {
              value: 100,
              message: "El valor máximo es 100",
            },
            validate: (value) =>
              Number.isInteger(Number(value)) ||
              "Solo se permiten números enteros",
          })}
          component={FormInput}
          step="1"
          error={errors.comercial_margin}
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

export default ComercialMarginForm;
