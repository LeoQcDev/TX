import React, { useEffect } from "react";
import {
  Phone,
  Mail,
  Globe,
  MapPin,
  FileText,
  User,
  Building,
  Hash,
  Briefcase,
} from "lucide-react";
import SectionTitle from "@/components/SectionTitle";
import InfoItem from "@/components/InfoItem";
import ContractInfoItem from "@/components/ContractInfoItem";
import XButton from "@/components/XButton";
import useEscapeKey from "@/hooks/useEscapeKey";

const ClientDetail = ({ client, onClose }) => {
  useEscapeKey(onClose);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        <div className="flex justify-between items-center p-6 bg-blackRedTX">
          <h2 className="text-2xl font-bold text-white">
            Detalles del cliente
          </h2>
          <XButton action={onClose} />
        </div>
        <div className="overflow-y-auto p-6 max-h-[calc(90vh-80px)]">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <section className="bg-gray-50 p-4 rounded-lg shadow">
              <SectionTitle icon={Building}>Información general</SectionTitle>
              <InfoItem label="Nombre" value={client.name} icon={Building} />
              <InfoItem label="Código" value={client.code} icon={Hash} />
              <InfoItem
                label="Código REEUP"
                value={client.reeup_code}
                icon={Hash}
              />
              <InfoItem
                label="Código NIP"
                value={client.nip_code}
                icon={Hash}
              />
              <InfoItem
                label="Polo"
                value={client.pole?.denomination}
                icon={MapPin}
              />
              <InfoItem
                label="Margen comercial"
                value={client.commercial_margin?.commercial_margin}
                icon={Briefcase}
              />
              <InfoItem
                label="Registro mercantil"
                value={client.commercial_registry}
                icon={FileText}
              />
              <div className="mb-2 flex items-center">
                <span className="font-medium text-gray-700 mr-1">AEI:</span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-semibold ${
                    client.is_aei
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {client.is_aei ? "Sí" : "No"}
                </span>
              </div>
              <InfoItem label="UBI" value={client.ubi?.name} icon={MapPin} />
            </section>

            <section className="bg-gray-50 p-4 rounded-lg shadow">
              <SectionTitle icon={Phone}>Contacto</SectionTitle>
              <InfoItem
                label="Dirección"
                value={
                  client.municipality && client.province
                    ? `${client.municipality}, ${client.province}`
                    : "N/A"
                }
                icon={MapPin}
              />
              <InfoItem
                label="Correo Electrónico"
                value={client.client_email}
                icon={Mail}
              />
              <InfoItem
                label="Teléfono"
                value={client.client_phone}
                icon={Phone}
              />
              <InfoItem label="Fax" value={client.fax} icon={Phone} />
              <InfoItem label="Página Web" value={client.web} icon={Globe} />
            </section>

            <section className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
              <SectionTitle icon={FileText}>Datos del contrato</SectionTitle>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <ContractInfoItem
                  label="Número de contrato"
                  value={client.contract?.contract_number}
                  icon={Hash}
                />
                <ContractInfoItem
                  label="Fecha de firma"
                  value={client.contract?.signature_date}
                  icon={FileText}
                />
                <ContractInfoItem
                  label="Fecha de vencimiento"
                  value={client.contract?.expiration_date}
                  icon={FileText}
                />
              </div>
            </section>

            <section className="md:col-span-2 bg-gray-50 p-4 rounded-lg shadow">
              <SectionTitle icon={User}>Representante</SectionTitle>
              {client?.representative ? (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <InfoItem
                    label="Nombre y apellidos"
                    value={`${client.representative.name} ${client.representative.last_name}`}
                    icon={User}
                  />
                  <InfoItem
                    label="Correo"
                    value={client.representative.representative_email}
                    icon={Mail}
                  />
                  <InfoItem
                    label="Teléfono"
                    value={client.representative.representative_phone}
                    icon={Phone}
                  />
                </div>
              ) : (
                <p className="text-gray-600 italic">
                  Sin representante asignado.
                </p>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientDetail;
