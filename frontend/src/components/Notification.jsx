// @/components/Notification.jsx
// Componente para notificaciones personalizadas

import { useEffect, useState } from "react";
import { X, AlertCircle, CheckCircle, Info } from "lucide-react";

const Notification = ({ message, type = "info", onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Trigger enter animation after a short delay
    const enterTimer = setTimeout(() => setIsVisible(true), 100);

    const exitTimer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 500); // Delay onClose to allow exit animation
    }, 5000);

    return () => {
      clearTimeout(enterTimer);
      clearTimeout(exitTimer);
    };
  }, [onClose]);

  const getTypeStyles = () => {
    switch (type) {
      case "success":
        return " bg-green-500 text-white";
      case "error":
        return "bg-red-500 text-white";
      case "warning":
        return "bg-yellow-500 text-white";
      default:
        return "bg-blue-500 text-white";
    }
  };

  const getIcon = () => {
    switch (type) {
      case "success":
        return <CheckCircle className="w-5 h-5 flex-shrink-0" />;
      case "error":
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      case "warning":
        return <AlertCircle className="w-5 h-5 flex-shrink-0" />;
      default:
        return <Info className="w-5 h-5 flex-shrink-0" />;
    }
  };

  return (
    <div
      className={`fixed bottom-4 right-4 max-w-sm min-w-[200px] transform transition-all duration-500 ease-in-out ${
        isVisible ? "translate-x-0 opacity-100" : "translate-x-full opacity-0"
      }`}
      role="alert"
      aria-live="assertive"
    >
      <div
        className={`${getTypeStyles()} rounded-lg shadow-lg p-4 flex items-start`}
      >
        <div className="flex-1 flex items-start">
          <div className="mr-3 mt-0.5">{getIcon()}</div>
          <p className="success-message text-sm font-medium break-words">
            {message}
          </p>
        </div>
        <button
          onClick={() => setIsVisible(false)}
          className="ml-3 flex-shrink-0 text-white hover:text-gray-200 focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded-full"
          aria-label="Cerrar notificación"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;
