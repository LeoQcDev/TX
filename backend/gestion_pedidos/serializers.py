from rest_framework import serializers
from .models import GenericoProducto, UnidadCompra, Pedido, Posicion, Producto, UnidadMedida
from gestion_clientes.serializers import ClientSerializer
from gestion_clientes.models import Client
from gestion_plan_importacion.serializers import PlanImportacionSerializer
from gestion_aprobaciones.serializers import AprobacionSerializer, CodigoAprobacionSerializer
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

class PedidoReadSerializer(PedidoSerializer):
    cliente = ClientSerializer()
    generico_producto = GenericoProductoSerializer()
    unidad_compra = UnidadCompraSerializer()
    plan_importacion = PlanImportacionSerializer()
    aprobaciones = AprobacionSerializer(many=True)
    codigos_aprobacion = CodigoAprobacionSerializer(many=True)
    
    class Meta(PedidoSerializer.Meta):
        ref_name = 'PedidoRead'
        depth = 1
