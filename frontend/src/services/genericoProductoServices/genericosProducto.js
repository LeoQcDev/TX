import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchGenericosProducto = async () => {
  return await fetchData("/genericos-producto/");
};

export const createGenericoProducto = async (data) => {
  return await createData("/genericos-producto/", data);
};

export const updateGenericoProducto = async (id, data) => {
  return await updateDataPartial("/genericos-producto", `${id}`, data);
};

export const deleteGenericoProducto = async (id) => {
  return await deleteData("/genericos-producto", id);
}; 