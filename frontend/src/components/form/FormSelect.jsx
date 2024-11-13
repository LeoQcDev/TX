const FormSelect = ({
  id,
  register,
  error,
  disabled,
  options,
  defaultOption = "Seleccione una opción",
  className = "",
  ...props
}) => {
  return (
    <select
      id={id}
      {...register}
      className={`form-input-base hover:cursor-pointer disabled:cursor-not-allowed ${
        error ? "form-input-error" : "border-gray-300"
      } 
        ${disabled ? "form-input-disabled" : ""} ${className}`}
      disabled={disabled}
      {...props}
    >
      <option value="">{defaultOption}</option>
      {options?.map((option) => (
        <option key={option.id} value={option.id}>
          {option.name ||
            option.denomination ||
            option.commercial_margin ||
            option.name}{" "}
          {/* Ojo con esto, añadir aquí el atributo que mostraran en sus select */}
        </option>
      ))}
    </select>
  );
};

export default FormSelect;
