import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchUnidadesCompra = async () => {
  return await fetchData("/units/");
};

export const createUnidadCompra = async (data) => {
  return await createData("/units/", data);
};

export const updateUnidadCompra = async (id, data) => {
  return await updateDataPartial("/units", `${id}`, data);
};

export const deleteUnidadCompra = async (id) => {
  return await deleteData("/units", id);
}; 