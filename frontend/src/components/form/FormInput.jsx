const FormInput = ({
  id,
  type,
  register,
  error,
  disabled,
  placeholder,
  maxLength,
  className = "",
  ...props
}) => {
  return (
    <input
      id={id}
      type={type}
      {...register}
      className={`form-input-base ${
        error ? "form-input-error" : "border-gray-300"
      } 
        ${disabled ? "form-input-disabled" : ""} ${className}`}
      aria-invalid={error ? "true" : "false"}
      aria-describedby={`${id}-error`}
      placeholder={placeholder}
      maxLength={maxLength}
      disabled={disabled}
      {...props}
    />
  );
};

export default FormInput;
