import RepresentativeFormContainer from "./RepresentativeFormContainer"; // Importamos el Container

const EdiRepresentativeForm = ({
  idRepresentative,
  initialData,
  onSuccess,
  onError,
  onCancel,
}) => {
  return (
    <RepresentativeFormContainer
      actionType="edit" // Le indicamos al container que es para editar
      idRepresentative={idRepresentative} // Pasamos el ID del representante que se va a editar
      initialData={initialData} // Pasamos los datos iniciales del representante a editar
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default EdiRepresentativeForm;
