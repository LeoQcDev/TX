import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import { validateContractNumber, validateDate } from "@/utils/validations";

const ContractForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  clients,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo Contrato" : "Editar Contrato"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Número de Contrato */}
        <FormField
          id="contract_number"
          label="Número de Contrato"
          type="text"
          placeholder="TX-00000"
          register={register("contract_number", {
            required: "Campo obligatorio. Por favor complételo",
            validate: validateContractNumber,
          })}
          component={FormInput}
          required
          error={errors.contract_number}
          watch={watch}
          maxLength={8}
          disabled={actionType === "edit"}
        />

        {/* Fecha de Firma */}
        <FormField
          id="signature_date"
          label="Fecha de Firma"
          type="date"
          placeholder="DD/MM/YYYY"
          register={register("signature_date", {
            required: "Campo obligatorio. Por favor complételo",
            validate: validateDate,
          })}
          component={FormInput}
          error={errors.signature_date}
          watch={watch}
          required
        />

        {/* Cliente */}
        <FormField
          id="client"
          label="Cliente"
          register={register("client", {
            required: "Campo obligatorio. Por favor seleccione un cliente",
          })}
          component={FormSelect}
          options={clients}
          defaultOption="Seleccione un cliente"
          required
          error={errors.client}
          watch={watch}
          disabled={actionType === "edit"}
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

export default ContractForm;
