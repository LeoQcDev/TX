import React from "react";
import FormButtons from "@/components/form/FormButtons";
import FormCancelButton from "@/components/form/FormCancelButton";
import FormConfirmButton from "@/components/form/FormConfirmButton";
import FormField from "@/components/form/FormField";
import FormSelect from "@/components/form/FormSelect";
import FormInput from "@/components/form/FormInput";
import FormCombobox from "@/components/form/FormCombobox";
import { Controller } from "react-hook-form";

import {
  validateReeupCode,
  validateNipCode,
  validateCommercialRegistry,
  validateZipCode,
  validatePhone,
  validateUrl,
  validateEmail,
  validateClientCode,
} from "@/utils/validations";

const ClientForm = ({
  handleSubmit,
  register,
  errors,
  watch,
  isSubmitting,
  actionType,
  onCancel,
  setValue,
  poles,
  comercialMargins,
  ubis,
  representatives,
  control,
  query,
  setQuery,
  filteredRepresentatives,
}) => {
  const client_status = watch("client_status", false);
  const isAEI = watch("is_aei", false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md max-w-5xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">
        {actionType === "create" ? "Nuevo Cliente" : "Editar Cliente"}
      </h2>

      {actionType === "edit" && (
        <FormField
          id="client_status"
          label={client_status ? "Desactivar Cliente" : "Activar Cliente"}
          type="checkbox"
          register={register("client_status")}
          component={FormInput}
          watch={watch}
        />
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Campos básicos */}
          <FormField
            id="name"
            label="Nombre"
            type="text"
            placeholder="Ej: Empresa S.A."
            register={register("name", {
              required: "Campo obligatorio. Por favor complételo",
            })}
            component={FormInput}
            watch={watch}
            error={errors.name}
            required
            disabled={actionType === "edit"}
            maxLength={50}
          />

          <FormField
            id="code"
            label="Código"
            type="text"
            placeholder="Ej: 10001"
            register={register("code", {
              required: "Campo obligatorio. Por favor complételo",
              validate: validateClientCode,
            })}
            component={FormInput}
            watch={watch}
            error={errors.code}
            required
            disabled={actionType === "edit"}
            maxLength={5}
          />

          {actionType === "edit" && (
            <>
              <FormField
                id="reeup_code"
                label="Código REEUP"
                type="text"
                placeholder="Ej: 123456"
                register={register("reeup_code", {
                  required: "Campo obligatorio. Por favor complételo",
                  validate: validateReeupCode,
                })}
                component={FormInput}
                watch={watch}
                error={errors.reeup_code}
                required
                disabled={!client_status}
                maxLength={6}
              />

              <FormField
                id="nip_code"
                label="Código NIP"
                type="text"
                placeholder="Ej: 123456789"
                register={register("nip_code", {
                  required: "Campo obligatorio. Por favor complételo",
                  validate: validateNipCode,
                })}
                component={FormInput}
                watch={watch}
                error={errors.nip_code}
                required
                disabled={!client_status}
                maxLength={9}
              />
            </>
          )}

          {/* Polo y UBI */}
          <FormField
            id="pole"
            label="Polo"
            register={register("pole", {
              required: "Campo obligatorio. Por favor seleccione un polo",
            })}
            component={FormSelect}
            defaultOption="Seleccione un polo"
            options={poles}
            watch={watch}
            error={errors.pole}
            required
            disabled={actionType === "edit"}
          />

          {/* Margen Comercial - Ahora disponible para ambos tipos de formulario */}
          <FormField
            id="comercial_margin"
            label="Margen Comercial"
            register={register("comercial_margin")}
            component={FormSelect}
            options={comercialMargins}
            defaultOption="Seleccione un margen"
            error={errors.comercial_margin}
            watch={watch}
            disabled={actionType === "edit" && !client_status}
          />

          {actionType === "create" && (
            <FormField
              id="is_aei"
              label="AEI"
              type="checkbox"
              register={register("is_aei")}
              component={FormInput}
              watch={watch}
            />
          )}

          <FormField
            id="ubi"
            label="UBI"
            register={register("ubi", {
              required: isAEI
                ? "Campo obligatorio. Por favor seleccione una UBI"
                : false,
            })}
            component={FormSelect}
            defaultOption="Seleccione una UBI"
            options={ubis}
            watch={watch}
            error={errors.ubi}
            required={isAEI}
            disabled={actionType === "edit" || !isAEI}
          />

          {/* Campos adicionales para edición */}
          {actionType === "edit" && (
            <>
              <FormField
                id="comercial_registry"
                label="Registro Mercantil"
                type="text"
                placeholder="Ej: 1234567"
                register={register("comercial_registry", {
                  required: "Campo obligatorio. Por favor complételo",
                  validate: validateCommercialRegistry,
                })}
                component={FormInput}
                watch={watch}
                error={errors.comercial_registry}
                required
                disabled={!client_status}
                maxLength={7}
              />

              {/* Campos de contacto */}
              <FormField
                id="client_email"
                label="Correo"
                type="email"
                placeholder="Ej: ejemplo@dominio.com"
                register={register("client_email", {
                  required: "Campo obligatorio. Por favor complételo",
                  validate: validateEmail,
                })}
                component={FormInput}
                watch={watch}
                error={errors.client_email}
                required
                maxLength={50}
                disabled={!client_status}
              />

              <FormField
                id="client_phone"
                label="Teléfono"
                type="text"
                placeholder="Ej: +53 XXXXXXXX"
                register={register("client_phone", {
                  required: "Campo obligatorio. Por favor complételo",
                  validate: validatePhone,
                })}
                component={FormInput}
                watch={watch}
                error={errors.client_phone}
                required
                disabled={!client_status}
                maxLength={12}
              />

              <FormField
                id="fax"
                label="Fax"
                type="text"
                placeholder="Ej: +53 XXXXXXXX"
                register={register("fax", {
                  validate: validatePhone,
                })}
                component={FormInput}
                watch={watch}
                error={errors.fax}
                disabled={!client_status}
                maxLength={12}
              />

              <FormField
                id="web"
                label="Web"
                type="text"
                placeholder="Ej: https://www.ejemplo.com"
                register={register("web", {
                  validate: validateUrl,
                })}
                component={FormInput}
                watch={watch}
                error={errors.web}
                maxLength={100}
                disabled={!client_status}
              />

              {/* Campos de dirección */}
              <div className="space-y-2">
                <FormField
                  id="street"
                  label="Calle"
                  type="text"
                  placeholder="Calle"
                  register={register("street", {
                    required: "Campo obligatorio. Por favor complételo",
                  })}
                  component={FormInput}
                  watch={watch}
                  error={errors.street}
                  required
                  maxLength={25}
                  disabled={!client_status}
                />

                <FormField
                  id="between_street"
                  label="Entre calles"
                  type="text"
                  placeholder="Entre calles"
                  register={register("between_street", {
                    required: "Campo obligatorio. Por favor complételo",
                  })}
                  component={FormInput}
                  watch={watch}
                  error={errors.between_street}
                  required
                  maxLength={50}
                  disabled={!client_status}
                />

                <FormField
                  id="municipality"
                  label="Municipio"
                  type="text"
                  placeholder="Municipio"
                  register={register("municipality")}
                  component={FormInput}
                  watch={watch}
                  maxLength={50}
                  disabled
                />

                <FormField
                  id="province"
                  label="Provincia"
                  type="text"
                  placeholder="Provincia"
                  register={register("province")}
                  component={FormInput}
                  watch={watch}
                  maxLength={50}
                  disabled
                />

                <FormField
                  id="country"
                  label="País"
                  type="text"
                  placeholder="País"
                  register={register("country")}
                  component={FormInput}
                  watch={watch}
                  maxLength={25}
                  disabled
                />

                <FormField
                  id="zip_code"
                  label="Código Postal"
                  type="text"
                  placeholder="Código Postal"
                  register={register("zip_code", {
                    required: "Campo obligatorio. Por favor complételo",
                    validate: (value) => validateZipCode(value, setValue),
                  })}
                  component={FormInput}
                  watch={watch}
                  error={errors.zip_code}
                  required
                  disabled={!client_status}
                  maxLength={5}
                />
              </div>

              {/* Combobox para Representante */}
              <Controller
                control={control}
                name="representative"
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }) => (
                  <FormCombobox
                    id="representative"
                    label="Representante"
                    value={value}
                    onChange={(selectedRep) => onChange(selectedRep)}
                    onQueryChange={setQuery}
                    options={filteredRepresentatives}
                    displayValue={(rep) => {
                      if (!rep && value) {
                        const selectedRep = representatives.find(
                          (r) => r.id === value
                        );
                        return selectedRep
                          ? `${selectedRep.name} ${selectedRep.last_name}`
                          : "";
                      }
                      return rep ? `${rep.name} ${rep.last_name}` : "";
                    }}
                    placeholder="Buscar representante"
                    disabled={!client_status}
                    error={error}
                  />
                )}
              />

              {/* Campos de contrato */}
              <div>
                <FormField
                  id="contract_number"
                  label="Número de Contrato"
                  register={register("contract_number")}
                  component={FormInput}
                  disabled
                />

                <FormField
                  id="signature_date"
                  label="Fecha de Firma"
                  register={register("signature_date")}
                  component={FormInput}
                  disabled
                />

                <FormField
                  id="expiration_date"
                  label="Fecha de Vencimiento"
                  register={register("expiration_date")}
                  component={FormInput}
                  disabled
                />
              </div>
            </>
          )}
        </div>

        <FormButtons>
          <FormCancelButton onCancel={onCancel} isSubmitting={isSubmitting} />
          <FormConfirmButton
            isSubmitting={isSubmitting}
            action={actionType === "create" ? "crear" : "actualizar"}
          />
        </FormButtons>
      </form>
    </div>
  );
};

export default ClientForm;
