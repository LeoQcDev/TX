import ComercialMarginFormContainer from './ComercialMarginFormContainer'; // Importamos el Container

const CreateComercialMarginForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ComercialMarginFormContainer
      actionType="create"   // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateComercialMarginForm;