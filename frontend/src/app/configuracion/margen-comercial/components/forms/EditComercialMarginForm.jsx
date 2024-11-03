import ComercialMarginFormContainer from './ComercialMarginFormContainer'; // Importamos el Container

const EditComercialMarginForm = ({ idMargin, initialData, onSuccess, onError, onCancel }) => {
  return (
    <ComercialMarginFormContainer
      actionType="edit"          // Indicar al container que es para editar
      idMargin={idMargin}        // Pasar el ID del margen que se va a editar
      initialData={initialData}  // Pasar los datos iniciales del margen a editar
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditComercialMarginForm;