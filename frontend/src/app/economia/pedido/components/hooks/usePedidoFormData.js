import { useState, useEffect } from "react";
import { fetchClients } from "@/services/clientServices/clients";
import { fetchGenericosProducto } from "@/services/genericoProductoServices/genericosProducto";
import { fetchUnidadesCompra } from "@/services/unidadCompraServices/unidadesCompra";
import { fetchAprobaciones } from "@/services/aprobacionServices/aprobaciones";
import { fetchCodigosAprobacion } from "@/services/codigoAprobacionServices/codigoAprobacion";
export const usePedidoFormData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [genericosProducto, setGenericosProducto] = useState([]);
  const [unidadesCompra, setUnidadesCompra] = useState([]);
  const [aprobaciones, setAprobaciones] = useState([]);
  const [codigosAprobacion, setCodigosAprobacion] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [clientesData, genericosData, unidadesData, aprobacionesData, codigosAprobacionData] = await Promise.all([
          fetchClients(),
          fetchGenericosProducto(),
          fetchUnidadesCompra(),
          fetchAprobaciones(),
          fetchCodigosAprobacion(),
        ]);
        console.log(codigosAprobacionData);
        const clientesFormateados = clientesData.map(cliente => ({
          id: cliente.id,
          name: cliente.name,
        }));
        const genericosFormateados = genericosData.map(generico => ({
          id: generico.id,
          name: generico.nombre,
        }));
        const unidadesFormateadas = unidadesData.map(unidad => ({
          id: unidad.id,
          name: unidad.nombre_departamento,
        }));
        const aprobacionesFormateadas = aprobacionesData.map(aprobacion => ({
          id: aprobacion.id,
          name: aprobacion.numero_aprobacion,
          codigos_aprobacion: aprobacion.codigos_aprobacion || []
        }));
        const codigosAprobacionFormateados = codigosAprobacionData.map(codigo => ({
          id: codigo.id,
          name: `${codigo.codigo} - ${codigo.objeto_name}`,
          codigo: codigo.codigo,
          descripcion: codigo.descripcion
        }));
        setClientes(clientesFormateados);
        setGenericosProducto(genericosFormateados);
        setUnidadesCompra(unidadesFormateadas);
        setAprobaciones(aprobacionesFormateadas);
        setCodigosAprobacion(codigosAprobacionFormateados);
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
    codigosAprobacion,
  };
}; 