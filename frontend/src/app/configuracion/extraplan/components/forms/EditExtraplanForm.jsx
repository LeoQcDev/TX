import ExtraplanFormContainer from "./ExtraplanFormContainer"; // Importamos el Container

const EditExtraplanForm = ({
  idExtraplan,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <ExtraplanFormContainer
      actionType="edit"
      idExtraplan={idExtraplan}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditExtraplanForm;
