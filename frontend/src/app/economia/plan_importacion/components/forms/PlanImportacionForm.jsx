import React from "react";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import EditableTable from "../objects/components/PlanImportacionObjetoTableForm";
import { useFormContext } from "@/contexts/FormContext";
import { usePlanImportacionFormData } from "../../hooks/usePlanImportacionFormData";

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
  objetos,
  code,
}) => {
  const validateMonth = value => {
    const date = new Date(value);
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    if (year < new Date().getFullYear())
      return "Solo se permiten fechas del año actual o posterior";

    return (
      (month >= 10 && month <= 12) ||
      "Solo se permiten fechas de octubre, noviembre y diciembre"
    );
  };

  const { planesImportacion } = usePlanImportacionFormData();

  const clientesPlanes = planesImportacion.reduce((acc, plan) => {
    const clienteId = plan.cliente.id;
    if (!acc[clienteId]) {
      acc[clienteId] = new Set();
    }
    acc[clienteId].add(plan.anio_pi);
    return acc;
  }, {});

  const clientesPlanesArray = Object.entries(clientesPlanes).map(
    ([cliente, years]) => ({
      cliente,
      years: Array.from(years),
    })
  );


  const validarPlanUnico = (clienteId, anio) => {
    console.log("Validando plan único para:", clienteId, anio)
    console.log("Clientes y planes:", clientesPlanesArray)

    const clienteData = clientesPlanesArray.find(
      entry => entry.cliente === clienteId
    );
    if (clienteData && clienteData.years.includes(anio)) {
      return `El cliente ${clientes.find(c=>(c.id==clienteId)).name} ya tiene un plan en el año ${anio}`;
    }
    return true; 
  };


  const clienteSeleccionado = watch("cliente");
  const importe = watch("importe_pi");

  return (
    <div className="bg-white p-6 rounded-lg shadow-md  mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create"
          ? "Nuevo Plan de Importación"
          : "Editar Plan de Importación"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
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
                validate: validateMonth,
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
                min: {
                  value: new Date().getFullYear(),
                  message: "Año inválido, debe ser posterior al actual",
                },
                max: { value: 2100, message: "Año inválido" },
                validate: anio => {                  
                  const anioNumber = parseInt(anio, 10);
                 
                  return (
                    validarPlanUnico(clienteSeleccionado, anioNumber) ||
                    "Error: Año duplicado para este cliente"
                  );
                },
              })}
              component={FormInput}
              error={errors.anio_pi}
              required
              disabled
            />

            <FormField
              id="codigo_pi"
              label="Código PI"
              type="text"
              register={register("codigo_pi")}
              component={FormInput}
              error={errors.codigo_pi}
              disabled
            />
          </div>
          <EditableTable planId={code} importeTotal={importe} />
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
