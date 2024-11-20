import React from "react";
import ClientFormContainer from "./ClientFormContainer";

const EditClientForm = ({
  idClient,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <ClientFormContainer
      actionType="edit"
      idClient={idClient}
      initialData={initialData}
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditClientForm;
