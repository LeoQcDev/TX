import { useObjetos } from "@/app/configuracion/objeto/hooks/useObjetos";
import CreateButton from "@/components/CreateButton";
import DeleteButton from "@/components/DeleteButton";
import EditButton from "@/components/EditButton";
import ConfirmationModal from "@/components/modal/ConfirmationModal";
import Notification from "@/components/Notification";
import PageButtonsLayout from "@/components/PageButtonsLayout";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useFormContext } from "@/contexts/FormContext";

const EditableTable = ({ planId, importeTotal }) => {
  const { objects } = useObjetos();
  const predefinedNames = objects ? objects.map(objeto => objeto.nombre) : [];
  const router = useRouter();

  const { control, register, handleSubmit, getValues, setValue, watch } =
    useForm({
      defaultValues: { rows: [] },
    });

  console.log("rowwwwwws", getValues());

  const { fields, append, remove, update } = useFieldArray({
    control,
    name: "rows",
  });

  const { setTriggerSubmit } = useFormContext();

  useEffect(() => {
    setTriggerSubmit(() => handleSubmit(onSubmit));
  }, [setTriggerSubmit, handleSubmit]);

  useEffect(() => {
    const savedData = localStorage.getItem(planId);
    if (savedData) {
      const parsedData = JSON.parse(savedData);
      setValue("rows", parsedData);
    }
  }, [planId, setValue]);

  const [editRowId, setEditRowId] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState("");
  const [notificationType, setNotificationType] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  const handleCloseModal = () => setIsModalOpen(false);

  const onSubmit = data => {
    console.log("Data saved:", data.rows);
    localStorage.setItem(planId, JSON.stringify(data.rows));
    setEditRowId(null);
  };
  console.log("qqqqqqqqqqxxxxx", importeTotal);

  const validateRow = row => {
    const totalDesglose =
      row.cortoPlazo + row.medianoPlazo + row.largoPlazo + row.liquido;
    const total = getValues().rows.reduce(
      (total, item) => total + item.importe,
      0
    );
    if (total > parseInt(importeTotal)) {
      setErrorMessage(
        "El importe total no puede ser mayor al importe total del plan de importación, por favor actualice su importe de plan de producción"
      );
      return false;
    }
    if (totalDesglose > row.importe) {
      setErrorMessage(
        `El desglose total no puede ser mayor al importe para "${row.nombre}"`
      );
      return false;
    }
    setErrorMessage(""); // Limpiar error si la validación pasa
    return true;
  };

  const handleEdit = (id, index) => {
    setEditRowId(id);
    setErrorMessage("");
  };

  const handleCancel = () => {
    setEditRowId(null);
    setErrorMessage("");
  };

  const showNotificationMessage = (type, message) => {
    setNotificationMessage(message);
    setNotificationType(type);
    setShowNotification(true);
  };

  const handleEliminar = async () => {
    try {
      handleDeleteSelected();
      setSelectedRows([]);
      setIsModalOpen(false);
      showNotificationMessage(
        "success",
        "Objeto(s) eliminado(s) exitosamente"
      );
    } catch (error) {
      showNotificationMessage(
        "error",
        "Error al eliminar el/los Objeto(s)"
      );
    }
  };

  const handleRowSelection = id => {
    setSelectedRows(prev =>
      prev.includes(id) ? prev.filter(rowId => rowId !== id) : [...prev, id]
    );
  };

  const handleDeleteSelected = () => {
    const updatedRows = fields.filter(row => !selectedRows.includes(row.id));
    setValue("rows", updatedRows);
    setSelectedRows([]);
  };
  const handleSave = (index, row) => {
    if (validateRow(row)) {
      update(index, row);
      setEditRowId(null);
    }
  };

  const handleAddRow = () => {
    const newRow = {
      id: Date.now(),
      nombre: predefinedNames[0], // Valor por defecto
      importe: 0,
      liquido: 0,
      cortoPlazo: 0,
      medianoPlazo: 0,
      largoPlazo: 0,
      desgloseTotal: 0,
    };
    append(newRow);
    setEditRowId(newRow.id);
  };

  const filteredRows = fields.filter(row =>
    row.nombre.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (predefinedNames.length == 0)
    return (
      <div className="text-center p-4 bg-white shadow-md rounded-lg my-6 flex flex-col items-center">
        No hay objetos disponibles para crear un plan de importación. Por favor,
        cree un objeto primero.
        <Button
          className="flex items-center px-4 py-2 bg-blackRedTX text-white rounded-md hover:bg-red-700 
      focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50"
          onClick={() => router.push("/configuracion/objeto")}
          variant="contained"
          color="primary"
        >
          Crear objeto
        </Button>
      </div>
    );

  return (
    <div>
      {showNotification && (
        <Notification
          message={notificationMessage}
          type={notificationType}
          onClose={() => setShowNotification(false)}
        />
      )}
      {/* Search Bar */}
      <div className="mb-4 flex justify-between items-center">
        <input
          type="text"
          placeholder="Buscar por nombre..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          className="border px-4 py-2 rounded"
        />
        <PageButtonsLayout>
          <DeleteButton
            onClick={() => setIsModalOpen(true)}
            disabled={!selectedRows?.length}
            type = 'button'
          />
          <button
            onClick={handleAddRow}
            type="button"
            className="flex items-center px-4 py-2 bg-blackRedTX text-white rounded-md hover:bg-red-700 
      focus:outline-none focus:ring-2 focus:ring-red-800 focus:ring-opacity-50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-2"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                clipRule="evenodd"
              />
            </svg>
            Añadir objeto
          </button>
        </PageButtonsLayout>
      </div>

      {/* Table */}
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded-lg my-6 max-h-[400px] overflow-auto"
      >
        {errorMessage && (
          <div className="text-red-600 font-bold mb-4">{errorMessage}</div>
        )}
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200">
            <tr>
              <th className="px-6 py-3 text-center">
                <input
                  type="checkbox"
                  onChange={e =>
                    setSelectedRows(
                      e.target.checked ? fields.map(row => row.id) : []
                    )
                  }
                  checked={
                    selectedRows.length > 0 &&
                    selectedRows.length === fields.length
                  }
                />
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider w-36">
                Nombre
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Importe
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Líquido
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Corto Plazo
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Mediano Plazo
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Largo Plazo
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Desglose Total
              </th>
              <th className="px-6 py-3 text-center text-xs font-semibold text-gray-800 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="text-gray-600 text-sm font-light">
            {filteredRows.map((row, index) => {
              const isEditing = editRowId === row.id;
              const rowValues = getValues(`rows.${index}`);

              return (
                <tr
                  key={row.id}
                  className={
                    index % 2 === 0
                      ? "bg-gray-50 hover:bg-gray-100"
                      : "bg-white hover:bg-gray-100"
                  }
                >
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleRowSelection(row.id)}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <select
                        {...register(`rows.${index}.nombre`)}
                        defaultValue={row.nombre}
                        className="w-full rounded border border-gray-300"
                      >
                        {predefinedNames.map(name => (
                          <option key={name} value={name}>
                            {name}
                          </option>
                        ))}
                      </select>
                    ) : (
                      row.nombre
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        {...register(`rows.${index}.importe`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={row.importe}
                        className="w-full px-2 py-1 border border-gray-300"
                      />
                    ) : (
                      row.importe
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        {...register(`rows.${index}.liquido`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={row.liquido}
                        disabled={!isEditing}
                        className="w-full px-2 py-1 border border-gray-300"
                      />
                    ) : (
                      row.liquido
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        {...register(`rows.${index}.cortoPlazo`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={row.cortoPlazo}
                        disabled={!isEditing}
                        className="w-full px-2 py-1 border border-gray-300"
                      />
                    ) : (
                      row.cortoPlazo
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        {...register(`rows.${index}.medianoPlazo`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={row.medianoPlazo}
                        disabled={!isEditing}
                        className="w-full px-2 py-1 border border-gray-300"
                      />
                    ) : (
                      row.medianoPlazo
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <input
                        type="number"
                        {...register(`rows.${index}.largoPlazo`, {
                          valueAsNumber: true,
                        })}
                        defaultValue={row.largoPlazo}
                        disabled={!isEditing}
                        className="w-full px-2 py-1 border border-gray-300"
                      />
                    ) : (
                      row.largoPlazo
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {rowValues.cortoPlazo +
                      rowValues.medianoPlazo +
                      rowValues.largoPlazo +
                      rowValues.liquido}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {isEditing ? (
                      <div className="flex space-x-4">
                        {/* Botón de Guardar */}
                        <button
                          type="button"
                          onClick={() => handleSave(index, rowValues)}
                          className="flex items-center bg-green-500 text-white text-sm p-2 rounded hover:bg-green-600"
                        >
                          <CheckCircle className="size-4" />
                        </button>

                        {/* Botón de Cancelar */}
                        <button
                          type="button"
                          className="flex items-center bg-red-500 text-white text-sm p-2  rounded hover:bg-red-600"
                          onClick={handleCancel}
                        >
                          <XCircle className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <EditButton onEditClick={() => handleEdit(row.id)} />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </form>
      <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onConfirm={handleEliminar}
        entidad={
          selectedRows?.length > 1
            ? "los objetos seleccionados"
            : "el objeto seleccionado"
        }
      />
    </div>
  );
};

export default EditableTable;
