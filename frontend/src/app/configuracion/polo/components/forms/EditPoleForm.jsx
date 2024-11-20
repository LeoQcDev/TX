import PoleFormContainer from './PoleFormContainer'; // Importamos el Container

const EditPoleForm = ({ idPole, initialData, onSuccess, onError, onCancel }) => {
  return (
    <PoleFormContainer
      actionType="edit"          // Le indicamos al container que es para editar
      idPole={idPole}            // Pasamos el ID del Polo que se va a editar
      initialData={initialData}  // Pasamos los datos iniciales del Polo a editar
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditPoleForm;
