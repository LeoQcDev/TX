import {
  fetchData,
  createData,
  updateDataPartial,
  deleteData,
} from "@/services/api";

export const fetchPedidos = async () => {
  return await fetchData("/pedidos/");
};

export const createPedido = async (data) => {
  try {
    const response = await createData("/pedidos/", data);
    return response;
  } catch (error) {
    console.error("Error creating pedido:", error);
    throw error;
  }
};

export const updatePedido = async (idPedido, data) => {
  return await updateDataPartial("/pedidos", `${idPedido}`, data);
};

export const deletePedido = async (idPedido) => {
  return await deleteData("/pedidos", idPedido);
}; 