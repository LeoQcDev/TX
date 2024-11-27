import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { createPedido, updatePedido } from "@/services/pedidoServices/pedidos";
import { usePedidoFormData } from "../hooks/usePedidoFormData";
import PedidoForm from "./PedidoForm";
import CreatePosicionForm from "@/app/economia/posicion/CreatePosicionForm";

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
    cliente: initialData.cliente?.id?.toString() || '',
    generico_producto: initialData.generico_producto?.id?.toString() || '',
    unidad_compra: initialData.unidad_compra?.id?.toString() || '',
    plan_importacion: initialData.plan_importacion?.id?.toString() || initialData.plan_importacion?.toString() || '',
    fecha_entrada_tecnotex: initialData.fecha_entrada_tecnotex || new Date().toISOString().split('T')[0],
    fecha_presentado: initialData.fecha_presentado || new Date().toISOString().split('T')[0],
    aprobaciones: Array.isArray(initialData.aprobaciones) 
      ? initialData.aprobaciones.map(apr => typeof apr === 'object' ? apr.id : apr) 
      : [],
    codigos_aprobacion: Array.isArray(initialData.codigos_aprobacion)
      ? initialData.codigos_aprobacion.map(cod => typeof cod === 'object' ? cod.id : cod)
      : [],
    presentador: initialData.presentador || '',
    grupo: initialData.grupo || '',
    tipo_pedido: initialData.tipo_pedido || '',
    numero_711: initialData.numero_711 || ''
  };

  console.log('Initial Data Raw:', initialData);
  console.log('Formatted Initial Data:', formattedInitialData);



  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    watch,
    setValue,
    control,
    clearErrors,
    reset,
    setError,
  } = useForm({
    defaultValues: formattedInitialData,
    mode: "onChange",
    reValidateMode: "onChange",
    criteriaMode: "all"
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
  
  console.log('Aprobaciones recibidas:', aprobaciones);
  console.log('Códigos de aprobación recibidos:', codigosAprobacion);

  const handleFormSubmit = async (event) => {
    try {
      event.preventDefault();
      
      const formData = new FormData(event.target);
      const data = Object.fromEntries(formData);
      
      if (!watch('aprobaciones')?.length) {
        setError('aprobaciones', {
          type: 'manual',
          message: 'Debe seleccionar al menos una aprobación'
        });
        return;
      }

      if (!watch('codigos_aprobacion')?.length) {
        setError('codigos_aprobacion', {
          type: 'manual',
          message: 'Debe seleccionar al menos un código de aprobación'
        });
        return;
      }

      const formatDate = (dateString) => {
        if (!dateString) return null;
        const date = new Date(dateString);
        if (isNaN(date.getTime())) return null;
        return date.toISOString().split('T')[0];
      };

      let formattedData;
      
      if (actionType === "create") {
        formattedData = {
          cliente: data.cliente && data.cliente !== '' ? parseInt(data.cliente) : null,
          numero_711: data.numero_711 || '',
          plan_importacion: data.plan_importacion && data.plan_importacion !== '' ? parseInt(data.plan_importacion) : null,
          aprobaciones: watch('aprobaciones') || [],
          codigos_aprobacion: watch('codigos_aprobacion') || []
        };
      } else {
        formattedData = {
          ...data,
          cliente: data.cliente && data.cliente !== '' ? parseInt(data.cliente) : null,
          plan_importacion: data.plan_importacion && data.plan_importacion !== '' ? parseInt(data.plan_importacion) : null,
          aprobaciones: watch('aprobaciones') || [],
          codigos_aprobacion: watch('codigos_aprobacion') || [],
          fecha_entrada_tecnotex: formatDate(data.fecha_entrada_tecnotex) || formatDate(new Date()),
          fecha_presentado: formatDate(data.fecha_presentado) || formatDate(new Date()),
          unidad_compra: data.unidad_compra && data.unidad_compra !== '' ? parseInt(data.unidad_compra) : null,
          generico_producto: data.generico_producto && data.generico_producto !== '' ? parseInt(data.generico_producto) : null,
          presentador: data.presentador || '',
          grupo: data.grupo || '',
          tipo_pedido: data.tipo_pedido || ''
        };
      }

      const requiredFields = ['cliente', 'numero_711', 'plan_importacion'];
      const missingFields = requiredFields.filter(field => !formattedData[field]);
      
      if (missingFields.length > 0) {
        missingFields.forEach(field => {
          setError(field, {
            type: 'manual',
            message: 'Este campo es requerido'
          });
        });
        return;
      }

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