import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { updatePedido } from "@/services/pedidoServices/pedidos";
import PedidoForm from "./PedidoForm";
import { usePedidoFormData } from "../hooks/usePedidoFormData";
import CreatePosicionForm from "./CreatePosicionForm";

const EditPedidoForm = ({ idPedido, initialData, onSuccess, onError, onCancel }) => {
  const [showPosicionForm, setShowPosicionForm] = useState(false);

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

  const { isLoading, clientes, genericosProducto, unidadesCompra, aprobaciones, codigosAprobacion, productos } =
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

  const handleCreatePosicion = () => {
    setShowPosicionForm(true);
  };

  const handlePosicionCreated = () => {
    setShowPosicionForm(false);
    // Aquí podrías refrescar los datos del pedido si es necesario
  };

  if (showPosicionForm) {
    return (
      <CreatePosicionForm
        pedidoId={idPedido}
        aprobaciones={aprobaciones}
        codigosAprobacion={codigosAprobacion}
        productos={productos}
        onSuccess={handlePosicionCreated}
        onError={onError}
        onCancel={() => setShowPosicionForm(false)}
      />
    );
  }

  return (
    <PedidoForm
      handleSubmit={handleSubmit(onSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isLoading}
      actionType="edit"
      onCancel={onCancel}
      onCreatePosicion={handleCreatePosicion}
      idPedido={idPedido}
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