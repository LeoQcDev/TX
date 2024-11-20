import {
  fetchData,
  createData,
  updateDataPartial,
  deleteData,
} from "@/services/api";

// Función para obtener los contratos
export const fetchContracts = async () => {
  return await fetchData("/contratos/");
};

// Función para crear un nuevo Contrato
export const createContract = async (data) => {
  return await createData("/contratos/", data);
};

// Función para actualizar un Contrato existente
export const updateContract = async (idContract, data) => {
  return await updateDataPartial("/contratos", `${idContract}`, data);
};

// Función para eliminar un Contrato existente
export const deleteContract = async (idContract) => {
  return await deleteData("/contratos", idContract);
};
