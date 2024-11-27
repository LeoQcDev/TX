import GenericoProductoFormContainer from './GenericoProductoFormContainer'; // Importamos el Container

const EditGenericoProductoForm = ({ idGenerico, initialData, onSuccess, onError, onCancel }) => {
  return (
    <GenericoProductoFormContainer
      actionType="edit"
      idGenerico={idGenerico}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditGenericoProductoForm;