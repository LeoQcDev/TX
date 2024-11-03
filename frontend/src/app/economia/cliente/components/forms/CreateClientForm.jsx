import React from "react";
import ClientFormContainer from "./ClientFormContainer";

const CreateClientForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ClientFormContainer
      actionType="create"
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateClientForm;
