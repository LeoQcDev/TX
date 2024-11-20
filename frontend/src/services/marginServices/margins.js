import { fetchData, createData, updateData, deleteData } from "@/services/api";

// Función para obtener los márrgenes
export const fetchMargins = async () => {
  return await fetchData("/margenes-comerciales/");
};

// Función para crear un nuevo Margen
export const createMargin = async (data) => {
  return await createData("/margenes-comerciales/", data);
};

// Función para actualizar un Margen existente
export const updateMargin = async (idMargin, data) => {
  return await updateData("/margenes-comerciales", `${idMargin}/`, data);
};

// Función para eliminar un Margen existente
export const deleteMargin = async (idMargin) => {
  return await deleteData("/margenes-comerciales", idMargin);
};
