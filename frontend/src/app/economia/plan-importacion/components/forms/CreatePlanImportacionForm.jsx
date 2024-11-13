import React from "react";
import PropTypes from "prop-types";
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

CreatePlanImportacionForm.propTypes = {
  onSuccess: PropTypes.func.isRequired,
  onError: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default CreatePlanImportacionForm; 