import UnidadCompraFormContainer from './UnidadCompraFormContainer'; // Importamos el Container

const EditUnidadCompraForm = ({ idUnidadCompra, initialData, onSuccess, onError, onCancel }) => {
  return (
    <UnidadCompraFormContainer
      actionType="edit"
      idUnidadCompra={idUnidadCompra}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditUnidadCompraForm;