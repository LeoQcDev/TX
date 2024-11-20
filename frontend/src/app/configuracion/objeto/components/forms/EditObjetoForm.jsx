"use client";

import React from "react";
import ObjetoFormContainer from "./ObjetoFormContainer";

const EditObjetoForm = ({ idObjeto, initialData, onSuccess, onError, onCancel }) => {
  return (
    <ObjetoFormContainer
      initialData={initialData}
      actionType="edit"
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditObjetoForm;