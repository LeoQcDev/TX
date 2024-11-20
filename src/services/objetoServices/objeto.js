 

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createObjeto = async (objetoData) => {
  try {
    const response = await axios.post(`${API_URL}/api/objeto/`, objetoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const updateObjeto = async (id, objetoData) => {
  try {
    const response = await axios.put(`${API_URL}/api/objeto/${id}/`, objetoData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const getObjetos = async () => {
  try {
    const response = await axios.get(`${API_URL}/api/objeto/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};

export const deleteObjeto = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/api/objeto/${id}/`);
    return response.data;
  } catch (error) {
    throw error.response?.data || error.message;
  }
};