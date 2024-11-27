import UnidadMedidaFormContainer from './UnidadMedidaFormContainer'; // Importamos el Container

const EditUnidadMedidaForm = ({ idUnidadMedida, initialData, onSuccess, onError, onCancel }) => {
  return (
    <UnidadMedidaFormContainer
      actionType="edit"
      idUnidadMedida={idUnidadMedida}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditUnidadMedidaForm;