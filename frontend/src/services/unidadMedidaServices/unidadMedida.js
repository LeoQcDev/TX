import {
    fetchData,
    createData,
    updateDataPartial,
    deleteData,
  } from "@/services/api";
  
  // Función para obtener las unidades de medida
  export const fetchUnidadesMedida = async () => {
    return await fetchData("/unidades-medida/");
  };
  
  // Función para crear un nuevo Representante
  export const createUnidadMedida = async (data) => {
    return await createData("/unidades-medida/", data);
  };
  
  // Función para actualizar una unidad de medida existente
  export const updateUnidadMedida = async (idUnidadMedida, data) => {
    return await updateDataPartial(
      "/unidades-medida",
      `${idUnidadMedida}`,
      data
    );
  };
  
  // Función para eliminar un Representante existente
export const deleteUnidadMedida = async (idUnidadMedida) => {
  return await deleteData("/unidades-medida", idUnidadMedida);
};
