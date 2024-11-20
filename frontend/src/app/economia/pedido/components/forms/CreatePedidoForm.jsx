import React from "react";
import { useForm } from "react-hook-form";
import { createPedido } from "@/services/pedidoServices/pedidos";
import PedidoForm from "./PedidoForm";
import { usePedidoFormData } from "../hooks/usePedidoFormData";

const CreatePedidoForm = ({ onSuccess, onError, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues: {
      fecha_entrada_tecnotex: new Date().toISOString().split('T')[0],
      fecha_presentado: new Date().toISOString().split('T')[0],
    }
  });

  const { 
    isLoading, 
    clientes, 
    genericosProducto, 
    unidadesCompra, 
    aprobaciones, 
    codigosAprobacion,
    planesImportacion 
  } = usePedidoFormData();

  const onSubmit = async (data) => {
    try {
      
      const formattedData = {
        cliente: parseInt(data.cliente),
        numero_711: data.numero_711,
        fecha_entrada_tecnotex: new Date(data.fecha_entrada_tecnotex).toISOString(),
        fecha_presentado: new Date(data.fecha_presentado).toISOString(),
        plan_importacion: parseInt(data.plan_importacion),
        generico_producto: parseInt(data.generico_producto),
        unidad_compra: parseInt(data.unidad_compra),
        presentador: data.presentador,
        tipo_pedido: data.tipo_pedido,
        // Don't send financiamiento as it's calculated on the backend
        aprobaciones: data.approvals.map(approval => parseInt(approval.approval)),
        codigos_aprobacion: data.approvals.flatMap(approval => 
          approval.codes.map(code => parseInt(code))
        )
      };
      await createPedido(formattedData);
      onSuccess();
    } catch (error) {
      onError(
        error.response?.data?.detail || "Error al crear el pedido"
      );
    }
  };

  return (
    <PedidoForm
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isLoading}
      actionType="create"
      onCancel={onCancel}
      setValue={setValue}
      control={control}
      clientes={clientes}
      genericosProducto={genericosProducto}
      unidadesCompra={unidadesCompra}
      aprobaciones={aprobaciones}
      codigosAprobacion={codigosAprobacion}
      planesImportacion={planesImportacion}
    />
  );
};

export default CreatePedidoForm; 