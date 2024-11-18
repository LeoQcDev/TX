import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchAprobaciones = async () => {
  const response = await fetchData("/aprobaciones/");
  
  return response;
};

export const createAprobacion = async (data) => {
  return await createData("/aprobaciones/", data);
};

export const updateAprobacion = async (id, data) => {
  return await updateDataPartial("/aprobaciones", `${id}`, data);
};

export const deleteAprobacion = async (id) => {
  return await deleteData("/aprobaciones", id);
}; 