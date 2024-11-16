import React from "react";
import { useForm } from "react-hook-form";
import { updatePedido } from "@/services/pedidoServices/pedidos";
import PedidoForm from "./PedidoForm";
import { usePedidoFormData } from "../hooks/usePedidoFormData";

const EditPedidoForm = ({ idPedido, initialData, onSuccess, onError, onCancel }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
  } = useForm({
    defaultValues: initialData,
  });

  const { isLoading, clientes, genericosProducto, unidadesCompra, aprobaciones, codigosAprobacion } =
    usePedidoFormData();

  const onSubmit = async (data) => {
    try {
      await updatePedido(idPedido, data);
      onSuccess();
    } catch (error) {
      onError(
        error.response?.data?.detail || "Error al actualizar el pedido"
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
      actionType="edit"
      onCancel={onCancel}
      setValue={setValue}
      control={control}
      clientes={clientes}
      genericosProducto={genericosProducto}
      unidadesCompra={unidadesCompra}
      aprobaciones={aprobaciones}
      codigosAprobacion={codigosAprobacion}
    />
  );
};

export default EditPedidoForm; 