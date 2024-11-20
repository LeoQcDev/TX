// PlanImportacionForm.jsx
import React from "react";
import Select from "react-select";

const PlanImportacionForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  clients,
}) => {
  const clientOptions = clients.map(client => ({
    value: client.id,
    label: client.name
  }));

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="codigo_pi" className="block text-sm font-medium">
            Código
          </label>
          <input
            id="codigo_pi"
            type="text"
            {...register("codigo_pi", {
              required: "El código es requerido",
              pattern: {
                value: /^[A-Za-z0-9-]+$/,
                message: "Código inválido",
              },
            })}
            className={`w-full rounded-md border p-2 ${
              errors.codigo_pi ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.codigo_pi && (
            <p className="text-sm text-red-500">{errors.codigo_pi.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="cliente" className="block text-sm font-medium">
            Cliente
          </label>
          <Select
            inputId="cliente"
            options={clientOptions}
            className={errors.cliente ? "border-red-500" : ""}
            onChange={(option) => 
              register("cliente").onChange({ target: { value: option.value } })
            }
            placeholder="Seleccione un cliente"
          />
          {errors.cliente && (
            <p className="text-sm text-red-500">{errors.cliente.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="fecha_emision" className="block text-sm font-medium">
            Fecha de Emisión
          </label>
          <input
            id="fecha_emision"
            type="date"
            {...register("fecha_emision", {
              required: "La fecha de emisión es requerida",
            })}
            className={`w-full rounded-md border p-2 ${
              errors.fecha_emision ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.fecha_emision && (
            <p className="text-sm text-red-500">{errors.fecha_emision.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="importe_pi" className="block text-sm font-medium">
            Importe
          </label>
          <input
            id="importe_pi"
            type="number"
            {...register("importe_pi", {
              required: "El importe es requerido",
              min: {
                value: 0,
                message: "El importe debe ser mayor a 0",
              },
            })}
            className={`w-full rounded-md border p-2 ${
              errors.importe_pi ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.importe_pi && (
            <p className="text-sm text-red-500">{errors.importe_pi.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <label htmlFor="anio_pi" className="block text-sm font-medium">
            Año
          </label>
          <input
            id="anio_pi"
            type="number"
            {...register("anio_pi", {
              required: "El año es requerido",
              min: {
                value: 2000,
                message: "Año inválido",
              },
            })}
            className={`w-full rounded-md border p-2 ${
              errors.anio_pi ? "border-red-500" : "border-gray-300"
            }`}
          />
          {errors.anio_pi && (
            <p className="text-sm text-red-500">{errors.anio_pi.message}</p>
          )}
        </div>
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {actionType === "create" ? "Crear" : "Actualizar"}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default PlanImportacionForm;