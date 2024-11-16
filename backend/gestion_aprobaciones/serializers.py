from rest_framework import serializers
from .models import (
    Financiero,
    CasaFinanciera,
    TipoFactura,
    Objeto,
    CodigoAprobacion,
    Aprobacion,
)
from gestion_clientes.serializers import ClientSerializer


class FinancieroSerializer(serializers.ModelSerializer):
    class Meta:
        model = Financiero
        fields = '__all__'


class CasaFinancieraSerializer(serializers.ModelSerializer):
    class Meta:
        model = CasaFinanciera
        fields = '__all__'


class TipoFacturaSerializer(serializers.ModelSerializer):
    class Meta:
        model = TipoFactura
        fields = '__all__'


class ObjetoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Objeto
        fields = '__all__'
        ref_name = "AprobacionObjeto"


class CodigoAprobacionSerializer(serializers.ModelSerializer):
    objeto_name = serializers.CharField(source='objeto.name', read_only=True)

    class Meta:
        model = CodigoAprobacion
        fields = '__all__'


class AprobacionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Aprobacion
        fields = '__all__' 