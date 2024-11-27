// Componente presentacional
"use client";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

const GenericoProductoForm = ({
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
        {actionType === "create" ? "Nuevo producto genérico" : "Editar producto genérico"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="nombre"
          label="Nombre"
          type="text"
          placeholder="Nombre del producto genérico"
          register={register("nombre", {
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
          error={errors.nombre}
          required
        />

        <FormField
          id="grupo"
          label="Grupo"
          type="text"
          placeholder="Ej: Ropa"
          register={register("grupo", {
            required: "El grupo es obligatorio",
            minLength: {
              value: 2,
              message: "El grupo debe tener al menos 2 caracteres"
            },
            maxLength: {
              value: 50,
              message: "El grupo no puede exceder los 50 caracteres"
            },
            pattern: {
              value: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
              message: "Solo se permiten letras y espacios"
            }
          })}
          component={FormInput}
          error={errors.grupo}
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

export default GenericoProductoForm;
