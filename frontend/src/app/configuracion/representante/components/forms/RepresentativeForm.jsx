// Componente presentacional
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";
import { validateEmail, validatePhone } from "@/utils/validations";

const FormRepresentative = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create"
          ? "Nuevo Representante"
          : "Editar Representante"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/*nombre*/}
          <FormField
            id="name"
            label="Nombre"
            type="text"
            placeholder="Ej: Juan"
            register={register("name", {
              required: "Campo obligatorio. Por favor complételo",
            })}
            component={FormInput}
            error={errors.name}
            watch={watch}
            required
          />

          {/*apellidos*/}
          <FormField
            id="last_name"
            label="Apellidos"
            type="text"
            placeholder="Ej: Pérez García"
            register={register("last_name", {
              required: "Campo obligatorio. Por favor complételo",
            })}
            component={FormInput}
            error={errors.last_name}
            watch={watch}
            required
          />

          {/*correo*/}
          <FormField
            id="representative_email"
            label="Correo"
            type="email"
            placeholder="Ej: ejemplo@dominio.com"
            register={register("representative_email", {
              required: "Campo obligatorio. Por favor complételo",
              validate: validateEmail,
            })}
            component={FormInput}
            error={errors.representative_email}
            watch={watch}
            required
          />

          {/*teléfono*/}
          <FormField
            id="representative_phone"
            label="Teléfono"
            type="text"
            placeholder="Ej: +53 XXXXXXXX"
            register={register("representative_phone", {
              required: "Campo obligatorio. Por favor complételo",
              validate: validatePhone,
            })}
            component={FormInput}
            error={errors.representative_phone}
            watch={watch}
            required
            maxLength={12}
          />
        </div>
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

export default FormRepresentative;
