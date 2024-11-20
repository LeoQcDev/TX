import React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxOptions,
  ComboboxOption,
} from "@headlessui/react";
import { CheckCircle2 } from "lucide-react";

const FormCombobox = ({
  id,
  label,
  value,
  onChange,
  onQueryChange,
  options = [],
  displayValue,
  placeholder,
  disabled = false,
  required = false,
  error,
  showCheckIcon = true,
  className = "",
}) => {
  return (
    <div className={`relative mt-1 ${className}`}>
      <label className="block text-gray-700">{label}</label>
      <Combobox value={value} onChange={onChange}>
        <div className="relative mt-1">
          <ComboboxInput
            id={id}
            className={`form-input-base ${
              error ? "form-input-error" : "border-gray-300"
            } 
                ${disabled ? "form-input-disabled" : ""} ${className}`}
            onChange={(e) => onQueryChange(e.target.value)}
            displayValue={displayValue}
            placeholder={placeholder}
            disabled={disabled}
          />
          <ComboboxOptions className="absolute w-full bg-white border border-gray-300 mt-1 rounded-md z-10 max-h-60 overflow-auto">
            {options.length > 0 ? (
              options.map((option) => (
                <ComboboxOption
                  key={option.id}
                  value={option}
                  className={({ active }) =>
                    `cursor-pointer select-none p-2 ${
                      active ? "bg-blue-500 text-white" : "text-gray-900"
                    }`
                  }
                >
                  {displayValue(option)}
                </ComboboxOption>
              ))
            ) : (
              <div className="p-2 text-gray-700">
                No se encontraron resultados.
              </div>
            )}
          </ComboboxOptions>
        </div>
        {showCheckIcon && value && (
          <p className="mt-2 text-sm text-gray-500">
            <CheckCircle2 className="ml-2 h-5 w-5 text-green-500 inline" />
          </p>
        )}
      </Combobox>
      {error && <p className="mt-1 text-sm text-red-500">{error.message}</p>}
    </div>
  );
};

export default FormCombobox;
