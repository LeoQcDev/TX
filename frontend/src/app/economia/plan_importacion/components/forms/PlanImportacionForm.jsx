import React from "react";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";

const PlanImportacionForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  setValue,
  control,
  clientes,
  objetos
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create"
          ? "Nuevo Plan de Importación"
          : "Editar Plan de Importación"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            id="cliente"
            label="Cliente"
            register={register("cliente", {
              required: "El cliente es requerido",
            })}
            component={FormSelect}
            options={clientes}
            defaultOption="Seleccione un cliente"
            error={errors.cliente}
            required
          />

          <FormField
            id="fecha_emision"
            label="Fecha de Emisión"
            type="date"
            register={register("fecha_emision", {
              required: "La fecha de emisión es requerida",
            })}
            component={FormInput}
            error={errors.fecha_emision}
            required
          />

          <FormField
            id="importe_pi"
            label="Importe PI"
            type="number"
            step="0.01"
            register={register("importe_pi", {
              required: "El importe es requerido",
              min: { value: 0, message: "El importe debe ser mayor a 0" },
            })}
            component={FormInput}
            error={errors.importe_pi}
            required
          />

          <FormField
            id="anio_pi"
            label="Año PI"
            type="number"
            register={register("anio_pi", {
              required: "El año es requerido",
              min: { value: 2000, message: "Año inválido" },
              max: { value: 2100, message: "Año inválido" },
            })}
            component={FormInput}
            error={errors.anio_pi}
            required
          />

          <FormField
            id="codigo_pi"
            label="Código PI"
            type="text"
            register={register("codigo_pi")}
            component={FormInput}
            error={errors.codigo_pi}
          />
          <FormField
            id="objeto"
            label="Objeto"
            register={register("objeto")}
            component={FormSelect}
            options={objetos}
            defaultOption="Seleccione un objeto"
            error={errors.objeto}            
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

export default PlanImportacionForm; 