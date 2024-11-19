import React, { useState, useEffect, useCallback, useMemo } from "react";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";
import Select from "react-select";

const PedidoForm = ({
  onSubmit,
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  onCreatePosicion,
  idPedido,
  clientes,
  genericosProducto,
  unidadesCompra,
  aprobaciones,
  codigosAprobacion,
  planesImportacion,
  setValue
}) => {

  console.log('Aprobaciones disponibles:', aprobaciones);
  console.log('Códigos de aprobación disponibles:', codigosAprobacion);

  const aprobacionesOptions = useMemo(() => 
    aprobaciones?.map(apr => ({
      value: apr.id.toString(),
      label: apr.name
    })) || [],
  [aprobaciones]);

  const codigosOptions = useMemo(() => 
    codigosAprobacion?.map(codigo => ({
      value: codigo.id.toString(),
      label: codigo.name
    })) || [],
  [codigosAprobacion]);

  const [selectedApprovals, setSelectedApprovals] = useState([]);
  const [selectedCodes, setSelectedCodes] = useState([]);
  const [totalFinanciamiento, setTotalFinanciamiento] = useState(0);

  const calculateFinanciamiento = useCallback(() => {
    const total = selectedCodes.reduce((sum, code) => {
      const selectedCode = codigosAprobacion.find(c => c.id.toString() === code.value);
      return sum + (selectedCode?.aprobado || 0);
    }, 0);
    
    setTotalFinanciamiento(total);
    setValue('financiamiento', total.toFixed(2));
  }, [selectedCodes, codigosAprobacion, setValue]);

  useEffect(() => {
    calculateFinanciamiento();
  }, [selectedCodes, calculateFinanciamiento]);

  const handleApprovalsChange = (selected) => {
    setSelectedApprovals(selected || []);
    if (!selected?.length) {
      setSelectedCodes([]);
    }
    setValue('aprobaciones', selected?.map(item => parseInt(item.value)) || []);
  };

  const handleCodesChange = (selected) => {
    setSelectedCodes(selected || []);
    setValue('codigos_aprobacion', selected?.map(item => parseInt(item.value)) || []);
  };

  const getAvailableCodes = useCallback(() => {
    if (!selectedApprovals.length) return [];
    
    const selectedApprovalIds = selectedApprovals.map(apr => parseInt(apr.value));
    return codigosAprobacion
      .filter(codigo => {
        return aprobaciones.some(apr => 
          selectedApprovalIds.includes(apr.id) && 
          apr.codigos_aprobacion.includes(codigo.id)
        );
      })
      .map(codigo => ({
        value: codigo.id.toString(),
        label: codigo.name
      }));
  }, [selectedApprovals, codigosAprobacion, aprobaciones]);

  useEffect(() => {
    if (watch('aprobaciones')?.length) {
      const initialApprovals = watch('aprobaciones').map(id => ({
        value: id.toString(),
        label: aprobaciones.find(a => a.id.toString() === id.toString())?.name
      }));
      setSelectedApprovals(initialApprovals);
    }

    if (watch('codigos_aprobacion')?.length) {
      const initialCodes = watch('codigos_aprobacion').map(id => ({
        value: id.toString(),
        label: codigosAprobacion.find(c => c.id.toString() === id.toString())?.name
      }));
      setSelectedCodes(initialCodes);
    }
  }, [watch, aprobaciones, codigosAprobacion]);

  useEffect(() => {
    console.log('PedidoForm - Form Values:', {
      cliente: watch('cliente'),
      generico_producto: watch('generico_producto'),
      unidad_compra: watch('unidad_compra'),
      plan_importacion: watch('plan_importacion'),
      aprobaciones: watch('approvals'),
      codigos_aprobacion: watch('approvals.0.codes')
    });
  }, [watch]);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo pedido" : "Editar pedido"}
      </h2>

      {actionType === "edit" && (
        <div className="mb-6">
          <Button
            type="button"
            onClick={() => onCreatePosicion(idPedido)}
            className="flex items-center gap-2 bg-blackRedTX hover:bg-blackRedTX/90 text-white"
          >
            <PlusIcon className="w-5 h-5" />
            Crear Posición
          </Button>
        </div>
      )}

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
              }
            })}
            component={FormInput}
            error={errors.numero_711}
            required
          />

          <FormField
            id="cliente"
            label="Cliente"
            register={register("cliente", {
              required: "Debe seleccionar un cliente"
            })}
            component={FormSelect}
            options={clientes}
            defaultOption="Seleccione un cliente"
            error={errors.cliente}
            required
            value={watch("cliente")}
          />

          <FormField
            id="generico_producto"
            label="Genérico"
            register={register("generico_producto", {
              required: "Debe seleccionar un genérico"
            })}
            component={FormSelect}
            options={genericosProducto}
            defaultOption="Seleccione un genérico"
            error={errors.generico_producto}
            required
            value={watch("generico_producto")}
          />

          <FormField
            id="unidad_compra"
            label="Unidad de Compra"
            register={register("unidad_compra", {
              required: "Debe seleccionar una unidad"
            })}
            component={FormSelect}
            options={unidadesCompra}
            defaultOption="Seleccione una unidad"
            error={errors.unidad_compra}
            required
            value={watch("unidad_compra")}
          />

          <FormField
            id="plan_importacion"
            label="Plan de Importación"
            register={register("plan_importacion", {
              required: "Debe seleccionar un plan"
            })}
            component={FormSelect}
            options={planesImportacion}
            defaultOption="Seleccione un plan"
            error={errors.plan_importacion}
            required
            value={watch("plan_importacion")}
          />

          <FormField
            id="financiamiento"
            label="Financiamiento"
            type="text"
            register={register("financiamiento")}
            component={FormInput}
            error={errors.financiamiento}
            disabled={true}
            value={totalFinanciamiento.toFixed(2)}
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
        </div>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Aprobaciones y Códigos</h3>
          <div className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Aprobaciones *
                </label>
                <Select
                  isMulti
                  options={aprobacionesOptions}
                  value={selectedApprovals}
                  onChange={handleApprovalsChange}
                  className={`basic-multi-select ${errors.aprobaciones ? 'border-red-500' : ''}`}
                  classNamePrefix="select"
                  placeholder="Seleccione las aprobaciones"
                  noOptionsMessage={() => "No hay aprobaciones disponibles"}
                />
                {errors.aprobaciones && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.aprobaciones.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Códigos de Aprobación *
                </label>
                <Select
                  isMulti
                  options={getAvailableCodes()}
                  value={selectedCodes}
                  onChange={handleCodesChange}
                  className={`basic-multi-select ${errors.codigos_aprobacion ? 'border-red-500' : ''}`}
                  classNamePrefix="select"
                  placeholder="Seleccione los códigos"
                  isDisabled={!selectedApprovals.length}
                  noOptionsMessage={() => 
                    selectedApprovals.length 
                      ? "No hay códigos disponibles para las aprobaciones seleccionadas"
                      : "Seleccione primero una aprobación"
                  }
                />
                {errors.codigos_aprobacion && (
                  <p className="mt-1 text-sm text-red-600">
                    {errors.codigos_aprobacion.message}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>

        <FormButtons>
          <FormCancelButton 
            onCancel={onCancel} 
            isSubmitting={isSubmitting} 
          />
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