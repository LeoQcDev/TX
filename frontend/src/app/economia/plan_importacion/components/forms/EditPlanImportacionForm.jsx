import PlanImportacionFormContainer from "./PlanImportacionFormContainer";

const EditPlanImportacionForm = ({
  idPlanImportacion,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <PlanImportacionFormContainer
      actionType="edit"
      idPlanImportacion={idPlanImportacion}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditPlanImportacionForm; 