import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createClient, updateClient } from "@/services/clientServices/clients";
import { fetchClients } from "@/services/clientServices/clients";
import { fetchPoles } from "@/services/poleServices/poles";
import { fetchMargins } from "@/services/marginServices/margins";
import { fetchRepresentatives } from "@/services/representativeServices/representatives";

import ClientForm from "./ClientForm";

const ClientFormContainer = ({
  actionType,
  idClient,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  // Estados para los datos de los dropdowns
  const [poles, setPoles] = useState([]);
  const [comercialMargins, setComercialMargins] = useState([]);
  const [ubis, setUbis] = useState([]);
  const [representatives, setRepresentatives] = useState([]);
  const [query, setQuery] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    control,
    setValue,
    watch,
    reset,
  } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    defaultValues:
      actionType === "edit"
        ? {
            client_status: initialData.client_status,
            name: initialData.name,
            code: initialData.code,
            pole: initialData.pole?.id,
            reeup_code: initialData.reeup_code || "",
            nip_code: initialData.nip_code || "",
            comercial_registry: initialData.comercial_registry || "",
            comercial_margin: initialData.comercial_margin?.id || "",
            ubi: initialData.ubi?.id,
            client_email: initialData.client_email || "",
            client_phone: initialData.client_phone || "",
            fax: initialData.fax || "",
            web: initialData.web || "",
            street: initialData.street || "",
            between_street: initialData.between_street || "",
            municipality: initialData.municipality || "",
            province: initialData.province || "",
            country: initialData.country || "",
            zip_code: initialData.zip_code || "",
            representative: initialData.representative || "",
            contract_number: initialData.contract?.contract_number,
            signature_date: initialData.contract?.signature_date,
            expiration_date: initialData.contract?.expiration_date,
          }
        : {},
  });

  // Efecto para cargar datos iniciales
  useEffect(() => {
    const loadData = async () => {
      try {
        const [poleData, marginData, ubiData, representativeData] =
          await Promise.all([
            fetchPoles(),
            fetchMargins(),
            fetchClients(),
            fetchRepresentatives(),
          ]);
        setPoles(poleData);
        setComercialMargins(marginData);
        setUbis(ubiData);
        setRepresentatives(representativeData);
        if (actionType === "edit") {
          reset({
            client_status: initialData.client_status,
            name: initialData.name,
            code: initialData.code,
            pole: initialData.pole?.id,
            reeup_code: initialData.reeup_code || "",
            nip_code: initialData.nip_code || "",
            comercial_registry: initialData.comercial_registry || "",
            comercial_margin: initialData.comercial_margin?.id || "",
            ubi: initialData.ubi?.id,
            client_email: initialData.client_email || "",
            client_phone: initialData.client_phone || "",
            fax: initialData.fax || "",
            web: initialData.web || "",
            street: initialData.street || "",
            between_street: initialData.between_street || "",
            municipality: initialData.municipality || "",
            province: initialData.province || "",
            country: initialData.country || "",
            zip_code: initialData.zip_code || "",
            representative: initialData.representative || "",
            contract_number: initialData.contract?.contract_number,
            signature_date: initialData.contract?.signature_date,
            expiration_date: initialData.contract?.expiration_date,
          });
        }
      } catch (error) {
        console.error("Error cargando los datos:", error);
        onError("Error cargando los datos necesarios");
      }
    };
    loadData();
  }, [onError]);

  // Filtrado de representantes para el combobox
  const filteredRepresentatives =
    query === ""
      ? representatives
      : representatives.filter((rep) =>
          `${rep.name} ${rep.last_name}`
            .toLowerCase()
            .includes(query.toLowerCase())
        );

  // Manejo del envío del formulario
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        const newClient = {
          code: data.code,
          name: data.name,
          pole: data.pole ?? null,
          comercial_margin: data.comercial_margin ?? null,
          is_aei: data.is_aei,
          ubi: data.ubi ?? null,
        };
        await createClient(newClient);
      } else {
        const updatedClient = {
          client_status: data.client_status,
          reeup_code: data.reeup_code || "",
          nip_code: data.nip_code || "",
          comercial_registry: data.comercial_registry || "",
          comercial_margin: data.comercial_margin || "",
          client_email: data.client_email || "",
          client_phone: data.client_phone || "",
          fax: data.fax || "",
          web: data.web || "",
          street: data.street || "",
          between_street: data.between_street || "",
          municipality: data.municipality || "",
          province: data.province || "",
          country: "Cuba",
          zip_code: data.zip_code || "",
          representative: data.representative?.id || "",
        };
        await updateClient(idClient, updatedClient);
      }

      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (error.response?.status === 400) {
        const errorData = error.response.data;
        const errorFields = {
          name: "Ya existe un Cliente registrado con este nombre",
          code: "Ya existe un Cliente registrado con este código",
          reeup_code: "Ya existe un Cliente registrado con este código REEUP",
          nip_code: "Ya existe un Cliente registrado con este código NIP",
          comercial_registry:
            "Ya existe un Cliente registrado con este código de registro mercantil",
          client_email: "Ya existe un Cliente registrado con este correo",
          client_phone:
            "Ya existe un Cliente registrado con este número telefónico",
          web: "Ya existe un Cliente registrado con esta dirección web",
          fax: "Ya existe un Cliente registrado con este número de fax",
        };

        Object.entries(errorData).forEach(([field, value]) => {
          if (errorFields[field]) {
            setError(field, {
              type: "manual",
              message: errorFields[field],
            });
          }
        });
      } else {
        onError(
          `Error al ${actionType === "create" ? "crear" : "editar"} el Cliente`
        );
      }
    }
  };

  return (
    <ClientForm
      handleSubmit={handleSubmit(handleFormSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isSubmitting}
      actionType={actionType}
      onCancel={onCancel}
      poles={poles}
      comercialMargins={comercialMargins}
      ubis={ubis}
      representatives={representatives}
      control={control}
      query={query}
      setQuery={setQuery}
      filteredRepresentatives={filteredRepresentatives}
      setValue={setValue}
    />
  );
};

export default ClientFormContainer;
