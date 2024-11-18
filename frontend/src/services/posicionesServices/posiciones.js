import { createData } from "@/services/api";

export const createPosicion = async (data) => {
  return await createData("/posiciones/", data);
}; 