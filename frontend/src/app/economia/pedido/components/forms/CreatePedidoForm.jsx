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
  } = useForm();

  const { isLoading, clientes, genericosProducto, unidadesCompra, aprobaciones } =
    usePedidoFormData();

  const onSubmit = async (data) => {
    try {
      await createPedido(data);
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
    />
  );
};

export default CreatePedidoForm; 