import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchUnidadesCompra = async () => {
  return await fetchData("/unidades-compra/");
};

export const createUnidadCompra = async (data) => {
  return await createData("/unidades-compra/", data);
};

export const updateUnidadCompra = async (id, data) => {
  return await updateDataPartial("/unidades-compra", `${id}`, data);
};

export const deleteUnidadCompra = async (id) => {
  return await deleteData("/unidades-compra", id);
}; 