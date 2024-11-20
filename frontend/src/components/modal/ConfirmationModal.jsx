// @/components/ConfirmationModal.jsx
// Modal para confirmar eliminación

import { useState, useEffect } from "react";
import XButton from "../XButton";
import ModalButtons from "./ModalButtons";
import ModalCancelButton from "./ModalCancelButton";
import ModalActionButton from "./ModalActionButton";

const ConfirmationModal = ({ isOpen, onClose, onConfirm, entidad }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
    } else {
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 bg-black/50 flex justify-center items-center z-50 transition-all duration-300 ${
        isOpen
          ? "backdrop-blur-sm bg-black/50"
          : "backdrop-blur-none bg-transparent"
      }`}
      onClick={onClose}
    >
      <div
        className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-xl max-w-md w-full m-4 transition-all duration-300 ${
          isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Confirmar eliminación
          </h2>
          <XButton action={onClose} />
        </div>
        <p className="text-gray-600 dark:text-gray-300 mb-6">
          ¿Está seguro de que desea eliminar{" "}
          <span className="font-medium">{entidad}</span>?
        </p>
        <ModalButtons>
          <ModalCancelButton onClick={onClose} label="Descartar" />
          <ModalActionButton onClick={onConfirm} label="Eliminar" />
        </ModalButtons>
      </div>
    </div>
  );
};

export default ConfirmationModal;
