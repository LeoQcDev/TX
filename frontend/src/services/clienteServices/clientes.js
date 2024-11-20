import axios from "@/config/axios";

// Obtener todos los clientes
export const fetchClientes = async () => {
  try {
    const response = await axios.get("/api/clientes/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener un cliente por ID
export const fetchClienteById = async (id) => {
  try {
    const response = await axios.get(`/api/clientes/${id}/`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Obtener clientes sin contrato
export const fetchClientesSinContrato = async () => {
  try {
    const response = await axios.get("/api/clientes/sin-contrato/");
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Crear un nuevo cliente
export const createCliente = async (clienteData) => {
  try {
    const response = await axios.post("/api/clientes/", clienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Actualizar un cliente existente
export const updateCliente = async (id, clienteData) => {
  try {
    const response = await axios.put(`/api/clientes/${id}/`, clienteData);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// Eliminar un cliente
export const deleteCliente = async (id) => {
  try {
    await axios.delete(`/api/clientes/${id}/`);
  } catch (error) {
    throw error;
  }
};

// Cambiar estado de un cliente
export const toggleClienteStatus = async (id) => {
  try {
    const response = await axios.patch(`/api/clientes/${id}/toggle-status/`);
    return response.data;
  } catch (error) {
    throw error;
  }
}; 