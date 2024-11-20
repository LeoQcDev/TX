import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchProductos = async () => {
  return await fetchData("/productos/");
};

export const createProducto = async (data) => {
  return await createData("/productos/", data);
};

export const updateProducto = async (id, data) => {
  return await updateDataPartial("/productos", `${id}`, data);
};

export const deleteProducto = async (id) => {
  return await deleteData("/productos", id);
};