"use client";

import React from "react";
import ObjetoFormContainer from "./ObjetoFormContainer";

const CreateObjetoForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ObjetoFormContainer
      initialData={{}} // No hay datos iniciales para la creación
      actionType="create"
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateObjetoForm;