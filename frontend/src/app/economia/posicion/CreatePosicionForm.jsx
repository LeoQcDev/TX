import React, { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import { Button } from "@/components/ui/button";
import { PlusIcon, TrashIcon } from "@heroicons/react/24/outline";
import { createPosicion } from "@/services/posicionesServices/posiciones";

const CreatePosicionForm = ({ 
  pedidoId, 
  aprobaciones, 
  codigosAprobacion,
  productos,
  unidadesMedida,
  onSuccess, 
  onError, 
  onCancel 
}) => {
  const [valorSinSolicitar, setValorSinSolicitar] = useState(0);
  const [selectedCodigo, setSelectedCodigo] = useState(null);

  const {
    register,
    handleSubmit,
    control,
    watch,
    formState: { errors },
    setValue
  } = useForm({
    defaultValues: {
      productos: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "productos"
  });

  const watchCodigoAprobacion = watch("codigo_aprobacion");
  const watchProductos = watch("productos");

  useEffect(() => {
    if (watchCodigoAprobacion) {
      const codigo = codigosAprobacion.find(c => c.id.toString() === watchCodigoAprobacion);
      if (codigo) {
        setSelectedCodigo(codigo);
        setValorSinSolicitar(codigo.aprobado || 0);
      }
    }
  }, [watchCodigoAprobacion, codigosAprobacion]);

  useEffect(() => {
    if (selectedCodigo && watchProductos) {
      const totalSolicitado = watchProductos.reduce((acc, producto) => {
        return acc + (producto.cantidad * producto.precio_unitario || 0);
      }, 0);
      setValorSinSolicitar(selectedCodigo.aprobado - totalSolicitado);
    }
  }, [watchProductos, selectedCodigo]);

  const onSubmit = async (data) => {
    try {
      const formattedData = {
        pedido: pedidoId,
        aprobacion: parseInt(data.aprobacion),
        codigo_aprobacion: parseInt(data.codigo_aprobacion),
        productos: data.productos.map(p => ({
          ...p,
          cantidad: parseInt(p.cantidad),
          precio_unitario: parseFloat(p.precio_unitario)
        }))
      };

      await createPosicion(formattedData);
      onSuccess();
    } catch (error) {
      onError(error.response?.data?.detail || "Error al crear la posición");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-7xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Nueva Posición</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-end">
          <FormField
            id="aprobacion"
            label="Aprobación"
            register={register("aprobacion", {
              required: "Debe seleccionar una aprobación"
            })}
            component={FormSelect}
            options={aprobaciones}
            defaultOption="Seleccione una aprobación"
            error={errors.aprobacion}
            required
          />

          <FormField
            id="codigo_aprobacion"
            label="Código de Aprobación"
            register={register("codigo_aprobacion", {
              required: "Debe seleccionar un código"
            })}
            component={FormSelect}
            options={codigosAprobacion}
            defaultOption="Seleccione un código"
            error={errors.codigo_aprobacion}
            required
          />

          <div className="flex flex-col">
            <label className="font-medium text-gray-700">Sin Solicitar</label>
            <div className="mt-1 p-2 border rounded-md bg-gray-50">
              ${valorSinSolicitar.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-semibold">Productos</h3>
            <Button
              type="button"
              onClick={() => append({})}
              className="bg-blackRedTX hover:bg-blackRedTX/90 text-white"
            >
              <PlusIcon className="w-5 h-5 mr-2" />
              Añadir Producto
            </Button>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Nombre
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Código
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Cantidad
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Precio Unitario
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Especificaciones
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Unidad Medida
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Total
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {fields.map((field, index) => (
                  <tr key={field.id}>
                    <td className="px-6 py-4">
                      <input
                        type="text"
                        {...register(`productos.${index}.nombre`, {
                          required: "Ingrese un nombre"
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        {...register(`productos.${index}.codigo`, {
                          required: "Ingrese un código"
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        {...register(`productos.${index}.descripcion_producto`, {
                          required: "Ingrese una descripción"
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        {...register(`productos.${index}.cantidad`, {
                          required: "Ingrese una cantidad",
                          min: 1
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <input
                        type="number"
                        step="0.01"
                        {...register(`productos.${index}.precio_unitario`, {
                          required: "Ingrese un precio",
                          min: 0
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <textarea
                        {...register(`productos.${index}.especificaciones_tecnicas`, {
                          required: "Ingrese especificaciones"
                        })}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <FormSelect
                        {...register(`productos.${index}.unidad_medida`, {
                          required: "Seleccione una unidad"
                        })}
                        options={unidadesMedida}
                        defaultOption="Seleccione"
                      />
                    </td>
                    <td className="px-6 py-4">
                      ${(watchProductos[index]?.cantidad * watchProductos[index]?.precio_unitario || 0).toFixed(2)}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="text-red-600 hover:text-red-900"
                      >
                        <TrashIcon className="w-5 h-5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <FormButtons>
          <FormCancelButton onCancel={onCancel} />
          <FormConfirmButton action="crear" />
        </FormButtons>
      </form>
    </div>
  );
};

export default CreatePosicionForm; 