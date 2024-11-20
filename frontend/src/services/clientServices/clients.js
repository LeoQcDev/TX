import {
  fetchData,
  createData,
  updateDataPartial,
  deleteData,
} from "@/services/api";

// Función para obtener los contratos
export const fetchClients = async () => {
  return await fetchData("/clientes/");
};

// Función para crear un nuevo Contrato
export const createClient = async (data) => {
  return await createData("/clientes/", data);
};

// Función para actualizar un Contrato existente
export const updateClient = async (idClient, data) => {
  return await updateDataPartial("/clientes", `${idClient}`, data);
};

// Función para eliminar un Contrato existente
export const deleteClient = async (idClient) => {
  return await deleteData("/clientes", idClient);
};
