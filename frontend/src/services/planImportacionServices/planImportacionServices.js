import {
  fetchData,
  createData,
  updateDataPartial,
  deleteData,
} from "@/services/api";

export const fetchPlanesImportacion = async () => {
  return await fetchData("/plan-importacion/");
};

export const createPlanImportacion = async (data) => {
  try {
    const response = await createData("/plan-importacion/", data);
    return response;
  } catch (error) {
    console.error("Error creating plan importacion:", error);
    throw error;
  }
};

export const updatePlanImportacion = async (idPlanImportacion, data) => {
  return await updateDataPartial("/plan-importacion", `${idPlanImportacion}`, data);
};

export const deletePlanImportacion = async (idPlanImportacion) => {
  return await deleteData("/plan-importacion", idPlanImportacion);
};

// Alias para mantener compatibilidad con código existente
export const getPlanesImportacion = fetchPlanesImportacion;