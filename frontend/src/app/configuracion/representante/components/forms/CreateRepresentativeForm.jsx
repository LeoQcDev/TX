import RepresentativeFormContainer from "./RepresentativeFormContainer";

const CreateRepresentativeForm = ({ onSuccess, onError, onCancel }) => {
  return (
    <RepresentativeFormContainer
      actionType="create" // Le indicamos al container que es para crear
      onSuccess={onSuccess}
      onError={onError}
      onCancel={onCancel}
    />
  );
};

export default CreateRepresentativeForm;
