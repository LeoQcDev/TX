import PlanImportacionFormContainer from "./PlanImportacionFormContainer";

const CreatePlanImportacionForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <PlanImportacionFormContainer
      actionType="create"
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreatePlanImportacionForm; 