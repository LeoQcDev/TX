from rest_framework import serializers
from .models import GenericoProducto, UnidadCompra, Pedido


class GenericoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericoProducto
        fields = '__all__'

class UnidadCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadCompra
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):

    class Meta:
        model = Pedido
        fields = '__all__'
