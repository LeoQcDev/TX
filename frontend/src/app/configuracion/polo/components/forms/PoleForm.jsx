// Componente presentacional
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";

const PoleForm = ({
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
        {actionType === "create" ? "Nuevo polo" : "Editar polo"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="denomination"
          label="Denominación"
          type="text"
          register={register("denomination", {
            required: "Campo obligatorio. Por favor complételo",
          })}
          component={FormInput}
          error={errors.denomination}
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

export default PoleForm;
