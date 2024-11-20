import axios from 'axios';

// Configuración del cliente Axios
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Funciones de manejo de errores
const handleApiError = (error) => {
  if (error.response) {
    const { data, status } = error.response;
    if (status === 400 && data) {
      // Manejar errores de validación
      for (let campo in data) {
        if (data.hasOwnProperty(campo)) {
          const mensaje = Array.isArray(data[campo])
            ? data[campo].join(', ')
            : data[campo];
          console.error(`Error en el campo ${campo}: ${mensaje}`);
        }
      }
    } else {
      console.error('Error en la respuesta de la API:', error.response);
    }
  } else {
    console.error('Error en la solicitud:', error.message);
  }
  throw error;
};;

// Funciones de API
export const fetchData = async (endpoint) => {
  try {
    const response = await api.get(endpoint);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const createData = async (endpoint, data) => {
  try {
    const response = await api.post(endpoint, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateData = async (endpoint, id, data) => {
  try {
    const response = await api.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const updateDataPartial = async (endpoint, id, data) => {
  try {
    const response = await api.patch(`${endpoint}/${id}/`, data);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export const deleteData = async (endpoint, id) => {
  try {
    const response = await api.delete(`${endpoint}/${id}/`);
    return response.data;
  } catch (error) {
    handleApiError(error);
  }
};

export default api;