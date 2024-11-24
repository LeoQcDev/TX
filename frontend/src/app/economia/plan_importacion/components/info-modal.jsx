"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Eye } from "lucide-react";
import { useState } from "react";
import { usePlanImportacionFormData } from "../hooks/usePlanImportacionFormData";
import { formatDate } from "@/lib/utils";

export function InfoModal({ id }) {
  const [open, setOpen] = useState(false);
  const { getFullDatosById } = usePlanImportacionFormData();
  const data = getFullDatosById(id);

  // Helper function to safely access nested properties
  const getNestedValue = (obj, path) => {
    return (
      path.split(".").reduce((acc, part) => acc && acc[part], obj) ?? "N/A"
    );
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Tooltip>
          <TooltipTrigger>
            <Button onClick={() => setOpen(!open)} variant="outline" className='rounded-full p-2 ml-2'>
              <Eye className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Ver detalles</TooltipContent>
        </Tooltip>
      </DialogTrigger>
      <DialogContent className="max-w-[90vw] max-h-[90vh]">
        <DialogHeader>
          <DialogTitle>Información Detallada</DialogTitle>
        </DialogHeader>
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="cliente">Cliente</TabsTrigger>
            <TabsTrigger value="objetos">Objetos</TabsTrigger>
            <TabsTrigger value="extraplanes">Extraplanes</TabsTrigger>
          </TabsList>
          <TabsContent value="general">
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <h3 className="text-lg font-semibold">Datos Generales</h3>
              <p>
                <strong>ID:</strong> {data?.id ?? "N/A"}
              </p>
              <p>
                <strong>Código PI:</strong> {data?.codigo_pi ?? "N/A"}
              </p>
              <p>
                <strong>Fecha de Emisión:</strong>{" "}
                {data?.fecha_emision ? formatDate(data?.fecha_emision) : "N/A"}
              </p>
              <p>
                <strong>Importe PI:</strong> {data?.importe_pi ?? "N/A"}
              </p>
              <p>
                <strong>Año PI:</strong> {data?.anio_pi ?? "N/A"}
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="cliente">
            <ScrollArea className="h-[60vh] w-full rounded-md border p-4">
              <h3 className="text-lg font-semibold">Información del Cliente</h3>
              <p>
                <strong>Nombre:</strong> {getNestedValue(data, "cliente.name")}
              </p>
              <p>
                <strong>Código:</strong> {getNestedValue(data, "cliente.code")}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {getNestedValue(data, "cliente.client_email")}
              </p>
              <p>
                <strong>Teléfono:</strong>{" "}
                {getNestedValue(data, "cliente.client_phone")}
              </p>
              <p>
                <strong>Dirección:</strong>{" "}
                {`${getNestedValue(data, "cliente.street")}, ${getNestedValue(
                  data,
                  "cliente.municipality"
                )}, ${getNestedValue(
                  data,
                  "cliente.province"
                )}, ${getNestedValue(data, "cliente.country")}`}
              </p>
              <p>
                <strong>Código Postal:</strong>{" "}
                {getNestedValue(data, "cliente.zip_code")}
              </p>
              <p>
                <strong>Sitio Web:</strong>{" "}
                {getNestedValue(data, "cliente.web")}
              </p>
              <h4 className="text-md font-semibold mt-4">Representante</h4>
              <p>
                <strong>Nombre:</strong>{" "}
                {`${getNestedValue(
                  data,
                  "cliente.representative.name"
                )} ${getNestedValue(data, "cliente.representative.last_name")}`}
              </p>
              <p>
                <strong>Email:</strong>{" "}
                {getNestedValue(
                  data,
                  "cliente.representative.representative_email"
                )}
              </p>
              <p>
                <strong>Teléfono:</strong>{" "}
                {getNestedValue(
                  data,
                  "cliente.representative.representative_phone"
                )}
              </p>
              <h4 className="text-md font-semibold mt-4">Contrato</h4>
              <p>
                <strong>Número de Contrato:</strong>{" "}
                {getNestedValue(data, "cliente.contract.contract_number")}
              </p>
              <p>
                <strong>Fecha de Firma:</strong>{" "}
                {getNestedValue(data, "cliente.contract.signature_date")
                  ? formatDate(
                      getNestedValue(data, "cliente.contract.signature_date")
                    )
                  : "N/A"}
              </p>
              <p>
                <strong>Fecha de Expiración:</strong>{" "}
                {getNestedValue(data, "cliente.contract.expiration_date")
                  ? formatDate(
                      getNestedValue(data, "cliente.contract.expiration_date")
                    )
                  : "N/A"}
              </p>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="objetos">
            <ScrollArea className="h-[60vh] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Importe</TableHead>
                    <TableHead>Líquido</TableHead>
                    <TableHead>Corto Plazo</TableHead>
                    <TableHead>Mediano Plazo</TableHead>
                    <TableHead>Largo Plazo</TableHead>
                    <TableHead>Desglose Total</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.objetos &&
                    data?.objetos.map(objeto => (
                      <TableRow key={objeto.id}>
                        <TableCell>{objeto.nombre ?? "N/A"}</TableCell>
                        <TableCell>{objeto.importe ?? "N/A"}</TableCell>
                        <TableCell>{objeto.liquido ?? "N/A"}</TableCell>
                        <TableCell>{objeto.cortoPlazo ?? "N/A"}</TableCell>
                        <TableCell>{objeto.medianoPlazo ?? "N/A"}</TableCell>
                        <TableCell>{objeto.largoPlazo ?? "N/A"}</TableCell>
                        <TableCell>{objeto.desgloseTotal ?? "N/A"}</TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
          <TabsContent value="extraplanes">
            <ScrollArea className="h-[60vh] w-full rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Código</TableHead>
                    <TableHead>Motivo</TableHead>
                    <TableHead>Fecha de Emisión</TableHead>
                    <TableHead>Importe</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data?.extraplanes &&
                    data?.extraplanes.map(extraplan => (
                      <TableRow key={extraplan.id}>
                        <TableCell>
                          {extraplan.codigo_extraplan ?? "N/A"}
                        </TableCell>
                        <TableCell>{extraplan.motivo ?? "N/A"}</TableCell>
                        <TableCell>
                          {extraplan.fecha_emision
                            ? formatDate(extraplan.fecha_emision)
                            : "N/A"}
                        </TableCell>
                        <TableCell>
                          {extraplan.importe_extraplan ?? "N/A"}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
