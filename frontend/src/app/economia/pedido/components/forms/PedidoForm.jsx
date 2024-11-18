import React, { useState, useEffect, useCallback } from "react";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { Button } from "@/components/ui/button";

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


  const [approvalRows, setApprovalRows] = useState([{ approval: "", codes: [""] }]);
  const [selectedApprovals, setSelectedApprovals] = useState({});
  const [selectedCodes, setSelectedCodes] = useState({});
  const [totalFinanciamiento, setTotalFinanciamiento] = useState(0);

  const calculateFinanciamiento = useCallback(() => {
    let total = 0;
    Object.values(selectedCodes).forEach(rowCodes => {
      Object.values(rowCodes).forEach(codeId => {
        const selectedCode = codigosAprobacion.find(c => c.id.toString() === codeId);
        if (selectedCode) {
          total += selectedCode.aprobado || 0;
        }
      });
    });
    setTotalFinanciamiento(total);
    setValue('financiamiento', total.toFixed(2));
  }, [selectedCodes, codigosAprobacion, setValue]);

  useEffect(() => {
    calculateFinanciamiento();
  }, [selectedCodes, calculateFinanciamiento]);

  const addApprovalRow = () => {
    setApprovalRows([...approvalRows, { approval: "", codes: [""] }]);
  };

  const removeApprovalRow = (index) => {
    const newRows = approvalRows.filter((_, i) => i !== index);
    setApprovalRows(newRows);
    
    setSelectedCodes(prev => {
      const newCodes = { ...prev };
      delete newCodes[index];
      return newCodes;
    });
    
    setSelectedApprovals(prev => {
      const newApprovals = { ...prev };
      delete newApprovals[index];
      return newApprovals;
    });
  };

  const addCodeField = (rowIndex) => {
    const newRows = [...approvalRows];
    newRows[rowIndex].codes.push("");
    setApprovalRows(newRows);
  };

  const removeCodeField = (rowIndex, codeIndex) => {
    const newRows = [...approvalRows];
    newRows[rowIndex].codes = newRows[rowIndex].codes.filter((_, i) => i !== codeIndex);
    setApprovalRows(newRows);
    
    setSelectedCodes(prev => {
      const newCodes = { ...prev };
      if (newCodes[rowIndex]) {
        const { [codeIndex]: removedCode, ...rest } = newCodes[rowIndex];
        newCodes[rowIndex] = rest;
      }
      return newCodes;
    });
  };

  const isApprovalSelected = (approvalId) => {
    return Object.values(selectedApprovals).some(
      selectedId => selectedId === approvalId.toString()
    );
  };

  const handleApprovalChange = (rowIndex, value) => {
    setSelectedApprovals(prev => ({
      ...prev,
      [rowIndex]: value
    }));
    setSelectedCodes(prev => {
      const newCodes = { ...prev };
      delete newCodes[rowIndex];
      return newCodes;
    });
  };

  const handleCodeChange = (rowIndex, codeIndex, value) => {
    setSelectedCodes(prev => ({
      ...prev,
      [rowIndex]: {
        ...prev[rowIndex],
        [codeIndex]: value
      }
    }));
  };

  const getSelectedCodesForRow = (rowIndex) => {
    if (!selectedCodes[rowIndex]) return [];
    return Object.values(selectedCodes[rowIndex]);
  };

  const getFilteredCodes = (rowIndex, inputId) => {
    const selectedCodesInRow = getSelectedCodesForRow(rowIndex);
    const currentValue = document.getElementById(inputId)?.value;
    const selectedApprovalId = selectedApprovals[rowIndex];
    
    if (!selectedApprovalId) return [];
    
    const selectedApproval = aprobaciones.find(apr => apr.id.toString() === selectedApprovalId);
    if (!selectedApproval || !selectedApproval.codigos_aprobacion) return [];
    
    return codigosAprobacion
      .filter(codigo => 
        // El código pertenece a la aprobación seleccionada
        selectedApproval.codigos_aprobacion.includes(codigo.id) &&
        // Y o bien es el código actualmente seleccionado o no está seleccionado en esta fila
        (codigo.id.toString() === currentValue || 
         !selectedCodesInRow.includes(codigo.id.toString()))
      )
      .map(codigo => ({
        id: codigo.id,
        name: `${codigo.codigo} - ${codigo.aprobado.toFixed(2)}`
      }));
  };

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
            {approvalRows.map((row, rowIndex) => (
              <div key={rowIndex} className="flex gap-4 items-start">
                <div className="w-1/3">
                  <FormSelect
                    options={aprobaciones
                      .filter(apr => !isApprovalSelected(apr.id.toString()) || 
                        selectedApprovals[rowIndex] === apr.id.toString())
                      .map(apr => ({
                        id: apr.id,
                        name: apr.name
                      }))}
                    defaultOption="Seleccione una aprobación"
                    {...register(`approvals.${rowIndex}.approval`, {
                      required: "Seleccione una aprobación",
                      onChange: (e) => handleApprovalChange(rowIndex, e.target.value)
                    })}
                  />
                </div>
                <div className="flex-1 space-y-2">
                  {row.codes.map((_, codeIndex) => (
                    <div key={codeIndex} className="flex gap-2">
                      <FormSelect
                        id={`approval-code-${rowIndex}-${codeIndex}`}
                        options={getFilteredCodes(rowIndex, `approval-code-${rowIndex}-${codeIndex}`)}
                        defaultOption="Seleccione un código"
                        {...register(`approvals.${rowIndex}.codes.${codeIndex}`, {
                          required: "Seleccione un código",
                          onChange: (e) => handleCodeChange(rowIndex, codeIndex, e.target.value)
                        })}
                        disabled={!selectedApprovals[rowIndex]}
                      />
                      <button
                        type="button"
                        onClick={() => removeCodeField(rowIndex, codeIndex)}
                        className="p-2 text-red-600 hover:text-red-800"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addCodeField(rowIndex)}
                    className="text-blue-600 hover:text-blue-800 text-sm flex items-center gap-1"
                  >
                    <PlusIcon className="w-4 h-4" />
                    Añadir código
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeApprovalRow(rowIndex)}
                  className="p-2 text-red-600 hover:text-red-800"
                >
                  <TrashIcon className="w-5 h-5" />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={addApprovalRow}
            className="mt-4 text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <PlusIcon className="w-5 h-5" />
            Añadir nueva aprobación
          </button>
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