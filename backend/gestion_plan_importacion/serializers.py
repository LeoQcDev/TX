from rest_framework import serializers
from .models import PlanImportacion, Extraplan, Objeto, DesglosePI, DesgloseExtraplan
from gestion_clientes.serializers import ClientSerializer
from gestion_clientes.models import Client


class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = ['id', 'nombre', 'descripcion']

        
class PlanImportacionSerializer(serializers.ModelSerializer):
    cliente = ClientSerializer(read_only=True)
    cliente_id = serializers.PrimaryKeyRelatedField(
        source='cliente',
        queryset=Client.objects.all(),
        write_only=True
    )
    extraplanes = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    objetos = ObjetoSerializer(many=True, read_only=True)

    class Meta:
        model = PlanImportacion
        fields = [
            'id',
            'cliente',
            'cliente_id',
            'codigo_pi',
            'fecha_emision',
            'importe_pi',
            'anio_pi',
            'extraplanes',
            'objetos'
        ]

    def to_representation(self, instance):
        representation = super().to_representation(instance)
        representation["cliente"] = ClientSerializer(instance.cliente).data if instance.cliente else None
        return representation

    def validate(self, data):
        if data.get('importe_pi') < 0:
            raise serializers.ValidationError("El importe no puede ser negativo.")
        return data

class ExtraplanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Extraplan
        fields = '__all__'




class DesglosePISerializer(serializers.ModelSerializer):
    class Meta:
        model = DesglosePI
        fields = '__all__'

class DesgloseExtraplanSerializer(serializers.ModelSerializer):
    class Meta:
        model = DesgloseExtraplan
        fields = '__all__'