import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchGenericosProducto = async () => {
  return await fetchData("/generics/");
};

export const createGenericoProducto = async (data) => {
  return await createData("/generics/", data);
};

export const updateGenericoProducto = async (id, data) => {
  return await updateDataPartial("/generics", `${id}`, data);
};

export const deleteGenericoProducto = async (id) => {
  return await deleteData("/generics", id);
}; 