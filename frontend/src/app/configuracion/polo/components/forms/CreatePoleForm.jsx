import PoleFormContainer from './PoleFormContainer'; // Importamos el Container

const CreatePoleForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <PoleFormContainer
      actionType="create"  // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreatePoleForm;
