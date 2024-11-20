import { CheckCircle2, XCircle } from "lucide-react";

const FormField = ({
  id,
  label,
  register,
  error,
  watch,
  required,
  disabled,
  type,
  options,
  defaultOption,
  component: Component,
  ...inputProps
}) => {
  const isCheckbox = type === "checkbox";

  return (
    <div>
      <div className={`${isCheckbox ? "flex items-center gap-2" : ""}`}>
        {!isCheckbox && (
          <label
            htmlFor={id}
            className="block text-base font-medium text-gray-700 mb-1"
          >
            {label}
          </label>
        )}
        <div className={`relative ${isCheckbox ? "flex items-center" : ""}`}>
          <Component
            id={id}
            register={register}
            error={error}
            disabled={disabled}
            options={options}
            defaultOption={defaultOption}
            {...inputProps}
            type={type}
          />
        </div>
        {isCheckbox && (
          <label
            htmlFor={id}
            className="text-base font-medium text-gray-700 select-none"
          >
            {label}
          </label>
        )}
      </div>
      {error ? (
        <p id={`${id}-error`} className="mt-2 text-sm text-red-600">
          {error.message}
          <XCircle className="ml-2 h-5 w-5 text-red-500 inline" />
        </p>
      ) : (
        <p className="mt-2 text-sm text-gray-500">
          {required && !isCheckbox && "Obligatorio"}
          {watch && watch(id) && !isCheckbox && (
            <CheckCircle2 className="ml-2 h-5 w-5 text-green-500 inline" />
          )}
        </p>
      )}
    </div>
  );
};

export default FormField;
