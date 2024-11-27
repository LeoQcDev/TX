// Componente presentacional
"use client";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

const UnidadCompraForm = ({
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
        {actionType === "create" ? "Nueva unidad de compra" : "Editar unidad de compra"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="nombre_departamento"
          label="Nombre del departamento"
          type="text"
          placeholder="Nombre del departamento"
          register={register("nombre_departamento", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 3,
              message: "El nombre debe tener al menos 3 caracteres"
            },
            maxLength: {
              value: 100,
              message: "El nombre no puede exceder los 100 caracteres"
            }
          })}
          component={FormInput}
          error={errors.nombre_departamento}
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

export default UnidadCompraForm;
