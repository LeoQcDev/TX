import PlanImportacionFormContainer from "./PlanImportacionFormContainer";

const EditPlanImportacionForm = ({ 
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <PlanImportacionFormContainer
      actionType="edit"      
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditPlanImportacionForm; 