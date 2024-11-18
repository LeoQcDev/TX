import { useState, useEffect } from "react";
import { fetchClients } from "@/services/clientServices/clients";
import { fetchGenericosProducto } from "@/services/genericoProductoServices/genericosProducto";
import { fetchUnidadesCompra } from "@/services/unidadCompraServices/unidadesCompra";
import { fetchAprobaciones } from "@/services/aprobacionServices/aprobaciones";
import { fetchCodigosAprobacion } from "@/services/codigoAprobacionServices/codigoAprobacion";
import { getPlanesImportacion as fetchPlanesImportacion } from "@/services/planImportacionServices/planImportacionServices";
import { fetchProductos } from "@/services/productoServices/productoServices";

export const usePedidoFormData = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [clientes, setClientes] = useState([]);
  const [genericosProducto, setGenericosProducto] = useState([]);
  const [unidadesCompra, setUnidadesCompra] = useState([]);
  const [aprobaciones, setAprobaciones] = useState([]);
  const [codigosAprobacion, setCodigosAprobacion] = useState([]);
  const [planesImportacion, setPlanesImportacion] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [
          clientesData,
          genericosData,
          unidadesData,
          aprobacionesData,
          codigosData,
          planesData,
          productosData
        ] = await Promise.all([
          fetchClients(),
          fetchGenericosProducto(),
          fetchUnidadesCompra(),
          fetchAprobaciones(),
          fetchCodigosAprobacion(),
          fetchPlanesImportacion(),
          fetchProductos()
        ]);



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
        console.log(aprobacionesData);
        
        const aprobacionesFormateadas = aprobacionesData.map(aprobacion => ({
          id: aprobacion.id,
          name: aprobacion.numero_aprobacion,
          codigos_aprobacion: aprobacion.codigos_aprobacion || []
        }));
        console.log(aprobacionesFormateadas);
        
        const codigosAprobacionFormateados = codigosData.map(codigo => ({
          id: codigo.id,
          name: `${codigo.codigo} - ${codigo.aprobado}`,
          codigo: codigo.codigo,
          aprobado: codigo.aprobado
        }));

        const planesFormateados = planesData.map(plan => ({
          id: plan.id,
          name: plan.codigo_pi
        }));

        const productosFormateados = productosData.map(producto => ({
          id: producto.id,
          name: producto.nombre
        }));

        

        setClientes(clientesFormateados);
        setGenericosProducto(genericosFormateados);
        setUnidadesCompra(unidadesFormateadas);
        setAprobaciones(aprobacionesFormateadas);
        setCodigosAprobacion(codigosAprobacionFormateados);
        setPlanesImportacion(planesFormateados);
        setProductos(productosFormateados);
      } catch (error) {
        console.error("Error fetching form data:", error);
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
    planesImportacion,
    productos
  };
}; 