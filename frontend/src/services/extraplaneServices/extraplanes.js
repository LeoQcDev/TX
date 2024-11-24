import { fetchData, createData, updateData, deleteData } from "@/services/api";

// Función para obtener los polos
export const fetchExtraplanes = async () => {
  console.log('extraplan............................fetch')
  return await fetchData("/extraplan/");
};

// Función para crear un nuevo Polo
export const createExtraplan = async (data) => {
  return await createData("/extraplan/", data);
};

// Función para actualizar un Polo existente
export const updateExtraplan = async (idExtraplan, data) => {
  return await updateData("/extraplan", `${idExtraplan}/`, data);
};

// Función para eliminar un Polo existente
export const deleteExtraplan = async (idExtraplan) => {
  return await deleteData("/extraplan", idExtraplan);
};
