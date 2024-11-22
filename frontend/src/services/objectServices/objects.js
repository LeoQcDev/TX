import { fetchData, createData, updateData, deleteData } from "@/services/api";

// Función para obtener los polos
export const fetchObjects = async () => {
  return await fetchData("/objeto/");
};

// Función para crear un nuevo Polo
export const createObject = async (data) => {
  return await createData("/objeto/", data);
};

// Función para actualizar un Polo existente
export const updateObject = async (idObject, data) => {
  return await updateData("/objeto", `${idObject}/`, data);
};

// Función para eliminar un Polo existente
export const deleteObject = async (idObject) => {
  return await deleteData("/objeto", idObject);
};
