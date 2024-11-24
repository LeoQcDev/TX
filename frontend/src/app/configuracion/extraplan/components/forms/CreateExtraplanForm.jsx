import ExtraplanFormContainer from "./ExtraplanFormContainer"; // Importamos el Container

const CreateExtraplanForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ExtraplanFormContainer
      actionType="create" // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateExtraplanForm;
