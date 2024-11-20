// @/components/CustomCheckBox.jsx
// Checkbox personalizado

import React from "react";
import { CheckIcon } from "lucide-react";

const CustomCheckBox = ({ checked, onChange, className }) => (
  <div
    className={`relative w-5 h-5 ${className}`}
    onClick={() => onChange(!checked)}
  >
    <input
      type="checkbox"
      checked={checked}
      onChange={() => {}}
      className="sr-only"
    />
    <div
      className={`absolute inset-0 border-2 rounded transition-colors duration-200 ease-in-out ${
        checked ? "bg-blue-500 border-blue-500" : "bg-white border-gray-300"
      }`}
    >
      {checked && (
        <CheckIcon className="absolute inset-0 w-full h-full text-white p-0.5" />
      )}
    </div>
  </div>
);

export default CustomCheckBox;
