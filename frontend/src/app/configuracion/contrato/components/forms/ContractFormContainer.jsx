import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ContractForm from "./ContractForm";
import {
  createContract,
  updateContract,
} from "@/services/contractServices/contract";
import { fetchClients, updateClient } from "@/services/clientServices/clients";

const ContractFormContainer = ({
  actionType,
  idContract,
  initialData = {},
  onSuccess,
  onError,
  onCancel,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    clearErrors,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      contract_number: initialData.contract_number || "",
      signature_date: initialData.signature_date || "",
      client: initialData.client?.id || "",
    },
    mode: "onChange",
    reValidateMode: "onChange",
  });

  // Estado para cargar los clientes del dropdown
  const [clients, setClients] = useState([]);

  // Efecto secundario para cargar los clientes disponibles (sin contrato)
  useEffect(() => {
    const loadData = async () => {
      try {
        const allClients = await fetchClients();
        const filteredClients =
          actionType === "create"
            ? allClients.filter((client) => !client.contract)
            : allClients;
        setClients(filteredClients);
        if (initialData) {
          reset({
            contract_number: initialData.contract_number || "",
            signature_date: initialData.signature_date || "",
            client: initialData.client?.id || "",
          });
        }
      } catch (error) {
        console.error("Error cargando clientes:", error);
      }
    };
    loadData();
  }, [actionType]);

  //  Lógica para manejar la creación o actualización según el actionType
  const handleFormSubmit = async (data) => {
    try {
      if (actionType === "create") {
        // Se usa función para crear
        const response = await createContract({
          contract_number: data.contract_number,
          signature_date: data.signature_date,
          client: data.client?.id,
        });

        // Asigna al cliente seleccionado el contrato recien creado
        await updateClient(data.client, {
          contract: response.id,
        });
      } else {
        // Se usa función para actualizar
        await updateContract(idContract, data);
      }

      // Si todo OK
      onSuccess();
      clearErrors();
      reset();
    } catch (error) {
      if (
        error.response?.status === 400 &&
        error.response.data?.contract_number
      ) {
        setError("contract_number", {
          type: "manual",
          message: "Ya existe un Contrato registrado con este número",
        });
        onError("Error: Ya existe un Contrato registrado con este número");
      } else {
        onError("Ocurrió un error al crear el contrato");
      }
    }
  };

  return (
    <ContractForm
      handleSubmit={handleSubmit(handleFormSubmit)}
      register={register}
      errors={errors}
      watch={watch}
      isSubmitting={isSubmitting}
      actionType={actionType}
      onCancel={onCancel}
      clients={clients}
    />
  );
};

export default ContractFormContainer;
