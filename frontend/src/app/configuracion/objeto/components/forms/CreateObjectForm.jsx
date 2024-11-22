import ObjectFormContainer from "./ObjectFormContainer"; // Importamos el Container

const CreateObjectForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ObjectFormContainer
      actionType="create" // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateObjectForm;
