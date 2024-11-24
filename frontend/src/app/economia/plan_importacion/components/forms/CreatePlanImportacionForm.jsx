import PlanImportacionFormContainer from "./PlanImportacionFormContainer";

const CreatePlanImportacionForm = ({ onSuccess, onError, onCancel, id }) => {
  return (
    <PlanImportacionFormContainer
      actionType="create"
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
      id = {id}
    />
  );
};

export default CreatePlanImportacionForm; 