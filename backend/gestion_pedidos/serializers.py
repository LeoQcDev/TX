from rest_framework import serializers
from .models import GenericoProducto, UnidadCompra, Pedido, Posicion, Producto, UnidadMedida


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

class PosicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posicion
        fields = '__all__'

class ProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'

class UnidadMedidaSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadMedida
        fields = '__all__'
