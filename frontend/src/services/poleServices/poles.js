import { fetchData, createData, updateData, deleteData } from "@/services/api";

// Función para obtener los polos
export const fetchPoles = async () => {
  return await fetchData("/polos/");
};

// Función para crear un nuevo Polo
export const createPole = async (data) => {
  return await createData("/polos/", data);
};

// Función para actualizar un Polo existente
export const updatePole = async (idPole, data) => {
  return await updateData("/polos", `${idPole}/`, data);
};

// Función para eliminar un Polo existente
export const deletePole = async (idPole) => {
  return await deleteData("/polos", idPole);
};
