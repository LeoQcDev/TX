import ContractFormContainer from "./ContractFormContainer";

const CreateContractForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <ContractFormContainer
      actionType="create" // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateContractForm;
