"use client";

import React from "react";
import PropTypes from "prop-types";
import DesglosePITable from "./DesglosePITable"; // Asegúrate de importar el componente de tabla de desglose

const PlanImportacionDetail = ({ planImportacion, onClose }) => {
  if (!planImportacion) return null;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-gray-800">
        Detalles del Plan de Importación
      </h2>
      <div className="space-y-4">
        <div>
          <strong>Código PI:</strong> {planImportacion.codigo_pi}
        </div>
        <div>
          <strong>Cliente:</strong> {planImportacion.cliente.name}
        </div>
        <div>
          <strong>Fecha de Emisión:</strong> {new Date(planImportacion.fecha_emision).toLocaleDateString()}
        </div>
        <div>
          <strong>Importe PI:</strong> ${planImportacion.importe_pi.toFixed(2)}
        </div>
        <div>
          <strong>Año PI:</strong> {planImportacion.anio_pi}
        </div>
      </div>

      {/* Mostrar el desglose PI asociado */}
      <h3 className="text-xl font-bold mt-6 mb-2 text-gray-800">Desglose PI</h3>
      <DesglosePITable
        desglosesPI={planImportacion.desglosesPI} // Asegúrate de que este campo esté disponible
        selectedDesglosesPI={[]} // Puedes manejar la selección si es necesario
        setSelectedDesglosesPI={() => {}} // Implementa la lógica de selección si es necesario
        onDesglosePIDoubleClick={() => {}} // Implementa la lógica de doble clic si es necesario
        onEditClick={() => {}} // Implementa la lógica de edición si es necesario
        searchTerm="" // Puedes implementar la búsqueda si es necesario
      />

      <button
        onClick={onClose}
        className="mt-6 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Cerrar
      </button>
    </div>
  );
};

PlanImportacionDetail.propTypes = {
  planImportacion: PropTypes.shape({
    codigo_pi: PropTypes.string.isRequired,
    cliente: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    fecha_emision: PropTypes.string.isRequired,
    importe_pi: PropTypes.number.isRequired,
    anio_pi: PropTypes.number.isRequired,
    desglosesPI: PropTypes.array.isRequired, // Asegúrate de que este campo esté definido
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default PlanImportacionDetail;