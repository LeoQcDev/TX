import ContractFormContainer from "./ContractFormContainer"; // Importamos el Container

const EditContractForm = ({
  idContract,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <ContractFormContainer
      actionType="edit" // Le indicamos al container que es para editar
      idContract={idContract} // Pasamos el ID del contrato que se va a editar
      initialData={initialData} // Pasamos los datos iniciales del contrato a editar
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EditContractForm;
