import {
  fetchData,
  createData,
  updateDataPartial,
  deleteData,
} from "@/services/api";

// Función para obtener los representantes
export const fetchRepresentatives = async () => {
  return await fetchData("/representantes/");
};

// Función para crear un nuevo Representante
export const createRepresentative = async (data) => {
  return await createData("/representantes/", data);
};

// Función para actualizar un Representante existente
export const updateRepresentative = async (idRepresentative, data) => {
  return await updateDataPartial(
    "/representantes",
    `${idRepresentative}`,
    data
  );
};

// Función para eliminar un Representante existente
export const deleteRepresentative = async (idRepresentative) => {
  return await deleteData("/representantes", idRepresentative);
};
