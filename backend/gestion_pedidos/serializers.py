from rest_framework import serializers
from .models import GenericoProducto, UnidadCompra, Pedido, Posicion, Producto, UnidadMedida
from gestion_clientes.serializers import ClientSerializer
from gestion_clientes.models import Client

class GenericoProductoSerializer(serializers.ModelSerializer):
    class Meta:
        model = GenericoProducto
        fields = '__all__'

class UnidadCompraSerializer(serializers.ModelSerializer):
    class Meta:
        model = UnidadCompra
        fields = '__all__'

class PedidoSerializer(serializers.ModelSerializer):
    cliente = ClientSerializer(read_only=True)
    generico_producto = GenericoProductoSerializer(read_only=True)
    unidad_compra = UnidadCompraSerializer(read_only=True)
    
    # Para las operaciones de escritura, necesitamos los campos de ID
    cliente_id = serializers.PrimaryKeyRelatedField(
        source='cliente',
        queryset=Client.objects.all(),
        write_only=True
    )
    generico_producto_id = serializers.PrimaryKeyRelatedField(
        source='generico_producto',
        queryset=GenericoProducto.objects.all(),
        write_only=True
    )
    unidad_compra_id = serializers.PrimaryKeyRelatedField(
        source='unidad_compra',
        queryset=UnidadCompra.objects.all(),
        write_only=True
    )

    class Meta:
        model = Pedido
        fields = [
            'id', 'numero_711', 'fecha_entrada_tecnotex', 'plan_importacion',
            'financiamiento', 'aprobaciones', 'codigos_aprobacion', 'presentador',
            'tipo_pedido', 'fecha_presentado',
            # Campos anidados para lectura
            'cliente', 'generico_producto', 'unidad_compra',
            # Campos ID para escritura
            'cliente_id', 'generico_producto_id', 'unidad_compra_id'
        ]

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
