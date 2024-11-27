// Componente presentacional
"use client";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

const UnidadMedidaForm = ({
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
        {actionType === "create" ? "Nueva unidad de medida" : "Editar unidad de medida"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="nombre"
          label="Nombre"
          type="text"
          placeholder="Nombre de la unidad de medida"
          register={register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres"
            },
            maxLength: {
              value: 50,
              message: "El nombre no puede exceder los 50 caracteres"
            }
          })}
          component={FormInput}
          error={errors.nombre}
          required
        />

        <FormField
          id="denominacion"
          label="Denominación"
          type="text"
          placeholder="Ej: kg, m, l"
          register={register("denominacion", {
            required: "La denominación es obligatoria",
            minLength: {
              value: 1,
              message: "La denominación debe tener al menos 1 caracter"
            },
            maxLength: {
              value: 10,
              message: "La denominación no puede exceder los 10 caracteres"
            }
          })}
          component={FormInput}
          error={errors.denominacion}
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

export default UnidadMedidaForm;
