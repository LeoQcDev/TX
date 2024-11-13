import React from "react";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";

const PedidoForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  clientes,
  genericosProducto,
  unidadesCompra,
  aprobaciones,
}) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo pedido" : "Editar pedido"}
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <FormField
            id="numero_711"
            label="Número 711"
            type="text"
            placeholder="123/OC"
            register={register("numero_711", {
              required: "Campo obligatorio",
              pattern: {
                value: /^[0-9]+\/OC$/,
                message: "El formato debe ser números seguidos de /OC",
              },
            })}
            component={FormInput}
            error={errors.numero_711}
            required
          />

          <FormField
            id="cliente"
            label="Cliente"
            register={register("cliente", {
              required: "Debe seleccionar un cliente",
            })}
            component={FormSelect}
            options={clientes}
            defaultOption="Seleccione un cliente"
            error={errors.cliente}
            required
          />

          <FormField
            id="generico_producto"
            label="Genérico de Producto"
            register={register("generico_producto", {
              required: "Debe seleccionar un genérico",
            })}
            component={FormSelect}
            options={genericosProducto}
            defaultOption="Seleccione un genérico"
            error={errors.generico_producto}
            required
          />

          <FormField
            id="unidad_compra"
            label="Unidad de Compra"
            register={register("unidad_compra", {
              required: "Debe seleccionar una unidad",
            })}
            component={FormSelect}
            options={unidadesCompra}
            defaultOption="Seleccione una unidad"
            error={errors.unidad_compra}
            required
          />

          <FormField
            id="financiamiento"
            label="Financiamiento"
            type="text"
            register={register("financiamiento", {
              required: "Campo obligatorio",
            })}
            component={FormInput}
            error={errors.financiamiento}
            required
          />

          <FormField
            id="presentador"
            label="Presentador"
            type="text"
            register={register("presentador", {
              required: "Campo obligatorio",
            })}
            component={FormInput}
            error={errors.presentador}
            required
          />

          <FormField
            id="tipo_pedido"
            label="Tipo de Pedido"
            type="text"
            register={register("tipo_pedido", {
              required: "Campo obligatorio",
            })}
            component={FormInput}
            error={errors.tipo_pedido}
            required
          />

          <FormField
            id="aprobacion"
            label="Aprobación"
            register={register("aprobacion", {
              required: "Debe seleccionar una aprobación",
            })}
            component={FormSelect}
            options={aprobaciones}
            defaultOption="Seleccione una aprobación"
            error={errors.aprobacion}
            required
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

export default PedidoForm; 