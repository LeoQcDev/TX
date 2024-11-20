import { fetchData, createData, updateDataPartial, deleteData } from "@/services/api";

export const fetchCodigosAprobacion = async () => {
  return await fetchData("/codigos-aprobacion/");
};

export const createCodigoAprobacion = async (data) => {
  return await createData("/codigos-aprobacion/", data);
};

export const updateCodigoAprobacion = async (id, data) => {
  return await updateDataPartial("/codigos-aprobacion", `${id}`, data);
};

export const deleteCodigoAprobacion = async (id) => {
  return await deleteData("/codigos-aprobacion", id);
};
