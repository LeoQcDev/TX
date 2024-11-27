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
    setError,
  } = useForm({
    defaultValues: {
      fecha_entrada_tecnotex: new Date().toISOString().split('T')[0],
      fecha_presentado: new Date().toISOString().split('T')[0],
    },
    mode: "onSubmit"
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
      const requiredFields = {
        numero_711: "El número 711 es requerido",
        cliente: "Debe seleccionar un cliente",
        plan_importacion: "Debe seleccionar un plan de importación",
        aprobaciones: "Debe seleccionar al menos una aprobación",
        codigos_aprobacion: "Debe seleccionar al menos un código de aprobación"
      };

      let hasErrors = false;

      Object.entries(requiredFields).forEach(([field, message]) => {
        if (!data[field] || (Array.isArray(data[field]) && data[field].length === 0)) {
          setError(field, {
            type: 'manual',
            message
          });
          hasErrors = true;
        }
      });

      if (hasErrors) {
        return;
      }

      const formattedData = {
        cliente: parseInt(data.cliente),
        numero_711: data.numero_711,
        fecha_entrada_tecnotex: new Date(data.fecha_entrada_tecnotex).toISOString(),
        fecha_presentado: new Date(data.fecha_presentado).toISOString(),
        plan_importacion: parseInt(data.plan_importacion),
        aprobaciones: data.aprobaciones || [],
        codigos_aprobacion: data.codigos_aprobacion || []
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