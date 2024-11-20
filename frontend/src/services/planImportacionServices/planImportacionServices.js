import api from "../api";

export const getPlanesImportacion = async () => {
  const response = await api.get("/plan-importacion/");
  return response.data;
};

export const getPlanImportacion = async (id) => {
  const response = await api.get(`/plan-importacion/${id}/`);
  return response.data;
};

export const createPlanImportacion = async (data) => {
  const response = await api.post("/plan-importacion/", data);
  return response.data;
};

export const updatePlanImportacion = async (id, data) => {
  const response = await api.put(`/plan-importacion/${id}/`, data);
  return response.data;
};

export const deletePlanImportacion = async (id) => {
  await api.delete(`/plan-importacion/${id}/`);
}; 