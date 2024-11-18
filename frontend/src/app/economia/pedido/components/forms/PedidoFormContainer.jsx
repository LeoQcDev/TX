import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createPedido, updatePedido } from "@/services/pedidoServices/pedidos";
import { usePedidoFormData } from "../hooks/usePedidoFormData";
import PedidoForm from "./PedidoForm";
import CreatePosicionForm from "../posicion/CreatePosicionForm";

const PedidoFormContainer = ({
  actionType,
  idPedido,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  const [showPosicionForm, setShowPosicionForm] = useState(false);

  const formattedInitialData = {
    ...initialData,
    cliente: initialData.cliente?.id?.toString(),
    generico_producto: initialData.generico_producto?.id?.toString(),
    unidad_compra: initialData.unidad_compra?.id?.toString(),
    plan_importacion: initialData.plan_importacion?.toString(),
    fecha_entrada_tecnotex: initialData.fecha_entrada_tecnotex || new Date().toISOString().split('T')[0],
    fecha_presentado: initialData.fecha_presentado || new Date().toISOString().split('T')[0],
    aprobaciones: Array.isArray(initialData.aprobaciones) ? initialData.aprobaciones : [],
    codigos_aprobacion: Array.isArray(initialData.codigos_aprobacion) ? initialData.codigos_aprobacion : []
  };

  console.log('PedidoFormContainer - Formatted Data:', formattedInitialData);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    control,
    clearErrors,
    reset,
    setError,
  } = useForm({
    defaultValues: formattedInitialData
  });

  const { 
    isLoading, 
    clientes, 
    genericosProducto, 
    unidadesCompra, 
    aprobaciones, 
    codigosAprobacion,
    planesImportacion,
    productos 
  } = usePedidoFormData();
  
  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      
      const fechaEntrada = data.fecha_entrada_tecnotex || new Date().toISOString().split('T')[0];
      const fechaPresentado = data.fecha_presentado || new Date().toISOString().split('T')[0];

      const formattedData = {
        cliente: parseInt(data.cliente),
        numero_711: data.numero_711,
        fecha_entrada_tecnotex: new Date(fechaEntrada + 'T00:00:00Z').toISOString(),
        fecha_presentado: new Date(fechaPresentado + 'T00:00:00Z').toISOString(),
        plan_importacion: parseInt(data.plan_importacion),
        generico_producto: parseInt(data.generico_producto),
        unidad_compra: parseInt(data.unidad_compra),
        presentador: data.presentador,
        tipo_pedido: data.tipo_pedido,
        aprobaciones: Object.keys(data)
          .filter(key => key.match(/^approvals\.\d+\.approval$/))
          .map(key => parseInt(data[key])),
        codigos_aprobacion: Object.keys(data)
          .filter(key => key.match(/^approvals\.\d+\.codes\.\d+$/))
          .map(key => parseInt(data[key]))
          .filter(Boolean)
      };

      console.log('Datos que se enviarán al backend:', JSON.stringify(formattedData, null, 2));

      if (actionType === "create") {
        await createPedido(formattedData);
      } else {
        await updatePedido(idPedido, formattedData);
      }

      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      console.error("Error completo:", error);
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        if (errorData.numero_711) {
          setError("numero_711", {
            type: "manual",
            message: "Ya existe un Pedido con este número",
          });
        }
      }
      onError(
        error.response?.data?.detail || 
        `Error al ${actionType === "create" ? "crear" : "editar"} el Pedido`
      );
    }
  };

  const handleCreatePosicion = () => {
    setShowPosicionForm(true);
  };

  const handlePosicionCreated = () => {
    setShowPosicionForm(false);
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
      handleSubmit={handleFormSubmit}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isLoading}
      actionType={actionType}
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
      planesImportacion={planesImportacion}
    />
  );
};

export default PedidoFormContainer; 