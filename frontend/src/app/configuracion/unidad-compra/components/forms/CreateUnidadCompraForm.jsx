import UnidadCompraFormContainer from './UnidadCompraFormContainer'; // Importamos el Container

const CreateUnidadCompraForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <UnidadCompraFormContainer
      actionType="create"   // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateUnidadCompraForm;