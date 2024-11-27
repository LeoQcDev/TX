import GenericoProductoFormContainer from './GenericoProductoFormContainer'; // Importamos el Container

const CreateGenericoProductoForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <GenericoProductoFormContainer
      actionType="create"   // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateGenericoProductoForm;