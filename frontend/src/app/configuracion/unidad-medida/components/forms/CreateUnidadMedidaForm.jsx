import UnidadMedidaFormContainer from './UnidadMedidaFormContainer'; // Importamos el Container

const CreateUnidadMedidaForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <UnidadMedidaFormContainer
      actionType="create"   // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateUnidadMedidaForm;