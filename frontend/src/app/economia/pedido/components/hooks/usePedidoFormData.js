import { useState, useEffect } from "react";
import { fetchClients } from "@/services/clientServices/clients";
import { fetchGenericosProducto } from "@/services/genericoProductoServices/genericosProducto";
import { fetchUnidadesCompra } from "@/services/unidadCompraServices/unidadesCompra";
import { fetchAprobaciones } from "@/services/aprobacionServices/aprobaciones";

export const usePedidoFormData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [genericosProducto, setGenericosProducto] = useState([]);
  const [unidadesCompra, setUnidadesCompra] = useState([]);
  const [aprobaciones, setAprobaciones] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, genericosData, unidadesData, aprobacionesData] = await Promise.all([
          fetchClients(),
          fetchGenericosProducto(),
          fetchUnidadesCompra(),
          fetchAprobaciones(),
        ]);

        setClientes(clientesData);
        setGenericosProducto(genericosData);
        setUnidadesCompra(unidadesData);
        setAprobaciones(aprobacionesData);
      } catch (error) {
        console.error("Error al cargar los datos del formulario:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  return {
    isLoading,
    clientes,
    genericosProducto,
    unidadesCompra,
    aprobaciones,
  };
}; 