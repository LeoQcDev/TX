import axios from "@/config/axios";

// Obtener todos los planes de importación
export const fetchPlanesImportacion = async () => {
  try {
    const response = await axios.get("/api/planes-importacion/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un plan de importación por ID
export const fetchPlanImportacionById = async (id) => {
  try {
    const response = await axios.get(`/api/planes-importacion/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo plan de importación
export const createPlanImportacion = async (planImportacionData) => {
  try {
    const response = await axios.post("/api/planes-importacion/", planImportacionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un plan de importación existente
export const updatePlanImportacion = async (id, planImportacionData) => {
  try {
    const response = await axios.put(`/api/planes-importacion/${id}/`, planImportacionData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un plan de importación
export const deletePlanImportacion = async (id) => {
  try {
    await axios.delete(`/api/planes-importacion/${id}/`);
  } catch (error) {
    throw error;
  }
};

// Cambiar estado de un plan de importación
export const togglePlanImportacionStatus = async (id) => {
  try {
    const response = await axios.patch(`/api/planes-importacion/${id}/toggle-status/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener desglose de un plan de importación
export const fetchDesglosePlanImportacion = async (id) => {
  try {
    const response = await axios.get(`/api/planes-importacion/${id}/desglose/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear desglose para un plan de importación
export const createDesglosePlanImportacion = async (id, desgloseData) => {
  try {
    const response = await axios.post(`/api/planes-importacion/${id}/desglose/`, desgloseData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar desglose de un plan de importación
export const updateDesglosePlanImportacion = async (id, desgloseId, desgloseData) => {
  try {
    const response = await axios.put(
      `/api/planes-importacion/${id}/desglose/${desgloseId}/`,
      desgloseData
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar desglose de un plan de importación
export const deleteDesglosePlanImportacion = async (id, desgloseId) => {
  try {
    await axios.delete(`/api/planes-importacion/${id}/desglose/${desgloseId}/`);
  } catch (error) {
    throw error;
  }
}; 