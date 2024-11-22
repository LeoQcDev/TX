import ObjectFormContainer from "./ObjectFormContainer"; // Importamos el Container

const EditObjectForm = ({
  idObject,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <ObjectFormContainer
      actionType="edit"
      idObject={idObject}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditObjectForm;
