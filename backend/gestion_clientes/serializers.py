from rest_framework import serializers
from .models import Client, Pole, CommercialMargin, Representative, Contract


# Convierte cadenas vacías a None
def validate_empty_string(value):
    return None if value == "" else value


# Serializa Polo a JSON
class PoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pole
        fields = "__all__"


# Serializa MargenComercial a JSON
class CommercialMarginSerializer(serializers.ModelSerializer):
    class Meta:
        model = CommercialMargin
        fields = "__all__"


# Serializa Contrato a JSON
class ContractSerializer(serializers.ModelSerializer):
    expiration_date = serializers.SerializerMethodField()
    client = serializers.SerializerMethodField()

    class Meta:
        model = Contract
        fields = "__all__"

    # Obtiene la fecha de expiración del contrato
    def get_expiration_date(self, obj):
        if obj.signature_date:
            return obj.expiration_date
        return None

    # Obtiene el cliente asociado al contrato
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

    # Convierte cadenas vacías a None
    def validate_correo_representante(self, value):
        return validate_empty_string(value)

    # Convierte cadenas vacías a None
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
    commercial_margin = serializers.PrimaryKeyRelatedField(
        queryset=CommercialMargin.objects.all(), allow_null=True, required=False
    )
    ubi = serializers.PrimaryKeyRelatedField(
        queryset=Client.objects.all(), allow_null=True, required=False
    )

    class Meta:
        model = Client
        fields = "__all__"

    # Personaliza la representación de las relaciones anidadas
    def to_representation(self, instance):
        """
        Personaliza la representación de las relaciones anidadas
        """
        representation = super().to_representation(instance)
        
        # Utilizar dict comprehension para mayor legibilidad
        related_fields = {
            'pole': PoleSerializer,
            'contract': ContractSerializer,
            'representative': RepresentativeSerializer,
            'ubi': ClientUBISerializer,
            'commercial_margin': CommercialMarginSerializer
        }
        
        for field, serializer_class in related_fields.items():
            related_instance = getattr(instance, field)
            representation[field] = (
                serializer_class(related_instance).data if related_instance else None
            )
            
        return representation

    # Convierte cadenas vacías a None en los campos unique=true con null=true
    def validate_commercial_margin(self, value):
        return validate_empty_string(value)

    def validate_reeup_code(self, value):
        return validate_empty_string(value)

    def validate_nip_code(self, value):
        return validate_empty_string(value)

    def validate_commercial_registry(self, value):
        return validate_empty_string(value)

    def validate_client_phone(self, value):
        return validate_empty_string(value)

    def validate_client_email(self, value):
        return validate_empty_string(value)

    def validate_fax(self, value):
        return validate_empty_string(value)

    def validate_web(self, value):
        return validate_empty_string(value)
