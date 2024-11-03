from rest_framework import serializers
from .models import Client, Pole, ComercialMargin, Representative, Contract


# Convierte cadenas vacías a None
def validate_empty_string(value):
    return None if value == "" else value


# Serializa Polo a JSON
class PoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pole
        fields = "__all__"


# Serializa MargenComercial a JSON
class ComercialMarginSerializer(serializers.ModelSerializer):
    class Meta:
        model = ComercialMargin
        fields = "__all__"


# Serializa Contrato a JSON
class ContractSerializer(serializers.ModelSerializer):
    expiration_date = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()

    class Meta:
        model = Contract
        fields = "__all__"

    def get_expiration_date(self, obj):
        if obj.signature_date:
            return obj.expiration_date
        return None

    def get_client(self, obj):
        client = Client.objects.filter(contract=obj).first()
        if client:
            return {
                "id": client.id,
                "name": client.name,
                "code": client.code,
            }
        return None


# Serializa Representante a JSON
class RepresentativeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Representative
        fields = "__all__"

    def validate_correo_representante(self, value):
        return validate_empty_string(value)

    def validate_telefono_representante(self, value):
        return validate_empty_string(value)


class ClientUBISerializer(serializers.ModelSerializer):
    class Meta:
        model = Client
        fields = ["id", "name"]  # Solo campos esenciales


# Serializa Cliente a JSON
class ClientSerializer(serializers.ModelSerializer):
    pole = serializers.PrimaryKeyRelatedField(
        queryset=Pole.objects.all(), allow_null=False, required=True
    )
    representative = serializers.PrimaryKeyRelatedField(
        queryset=Representative.objects.all(), allow_null=True, required=False
    )
    contract = serializers.PrimaryKeyRelatedField(
        queryset=Contract.objects.all(), allow_null=True, required=False
    )
    comercial_margin = serializers.PrimaryKeyRelatedField(
        queryset=ComercialMargin.objects.all(), allow_null=True, required=False
    )
    ubi = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Client
        fields = "__all__"

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["pole"] = (
            PoleSerializer(instance.pole).data if instance.pole else None
        )
        representation["contract"] = (
            ContractSerializer(instance.contract).data if instance.contract else None
        )
        representation["representative"] = (
            RepresentativeSerializer(instance.representative).data
            if instance.representative
            else None
        )
        representation["ubi"] = (
            ClientUBISerializer(instance.ubi).data if instance.ubi else None
        )
        representation["comercial_margin"] = (
            ComercialMarginSerializer(instance.comercial_margin).data
            if instance.comercial_margin
            else None
        )
        return representation

    # convertir "" a None en los campos unique=true con null=true
    def validate_comercial_margin(self, value):
        return validate_empty_string(value)

    def validate_reeup_code(self, value):
        return validate_empty_string(value)

    def validate_nip_code(self, value):
        return validate_empty_string(value)

    def validate_comercial_registry(self, value):
        return validate_empty_string(value)

    def validate_client_phone(self, value):
        return validate_empty_string(value)

    def validate_client_email(self, value):
        return validate_empty_string(value)

    def validate_fax(self, value):
        return validate_empty_string(value)

    def validate_web(self, value):
        return validate_empty_string(value)
