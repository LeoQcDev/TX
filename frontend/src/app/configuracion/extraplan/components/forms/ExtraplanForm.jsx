// Componente presentacional
import { usePlanImportacionFormData } from "@/app/economia/plan_importacion/hooks/usePlanImportacionFormData";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormInput from "@/components/form/FormInput";
import FormSelect from "@/components/form/FormSelect";
import { useExtraplanes } from "../../hooks/useExtraplan";

const ExtraplanForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
}) => {
  const { planesImportacion } = useExtraplanes();
  const planesCodes = planesImportacion.map(p => ({
    id: p.id,
    name: p.codigo_pi,
  }));
  console.log("doesplanesimpor", planesCodes);
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo Extraplan" : "Editar Extraplan"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <FormField
          id="plan_importacion"
          label="Código PI"
          register={register("plan_importacion", {
            required: "El Código del Plan de Importación es requerido",
          })}
          component={FormSelect}
          options={planesCodes}
          defaultOption="Seleccione un Plan de Importación"
          error={errors.plan_importacion}
          required
        />
        <FormField
          id="importe_extraplan"
          label="Importe"
          type="number"
          register={register("importe_extraplan", {
            required: "Campo obligatorio. Por favor complételo",
            min: { value: 0, message: "El valor mínimo es 0" },
          })}
          component={FormInput}
          error={errors.importe_extraplan}
          watch={watch}
          required
        />
        <FormField
          id="motivo"
          label="Motivo"
          type="text"
          register={register("motivo", {
            required: "Campo obligatorio. Por favor complételo",
          })}
          component={FormInput}
          error={errors.motivo}
          watch={watch}
          required
        />
        <FormField
          id="fecha_emision"
          label="Fecha de Emisión"
          type="date"
          register={register("fecha_emision", {
            required: "Campo obligatorio. Por favor complételo",
          })}
          component={FormInput}
          error={errors.fecha_emision}
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

export default ExtraplanForm;
