// src/components/form/FormTextArea.jsx
const FormTextArea = ({ id, register, error, disabled, placeholder, className = "", ...props }) => {
    return (
      <textarea
        id={id}
        {...register}
        className={`form-textarea block w-full rounded-md shadow-sm ${
          error ? "border-red-500" : "border-gray-300"
        } ${disabled ? "bg-gray-100" : ""} ${className}`}
        aria-invalid={error ? "true" : "false"}
        aria-describedby={`${id}-error`}
        placeholder={placeholder}
        disabled={disabled}
        rows={4}
        {...props}
      />
    );
  };
  
  export default FormTextArea;