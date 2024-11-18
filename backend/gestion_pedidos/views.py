from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import GenericoProducto, UnidadCompra, Pedido, Posicion, Producto, UnidadMedida
from .serializers import GenericoProductoSerializer, UnidadCompraSerializer, PedidoSerializer, PosicionSerializer, ProductoSerializer, UnidadMedidaSerializer
from gestion_clientes.serializers import ClientSerializer
from gestion_plan_importacion.serializers import PlanImportacionSerializer
from gestion_aprobaciones.serializers import AprobacionSerializer, CodigoAprobacionSerializer

class GenericoProductoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD operations in GenericoProducto
    """
    queryset = GenericoProducto.objects.all()
    serializer_class = GenericoProductoSerializer


class UnidadCompraViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD operations in UnidadCompra
    """
    queryset = UnidadCompra.objects.all()
    serializer_class = UnidadCompraSerializer


class PedidoViewSet(viewsets.ModelViewSet):
    """
    ViewSet for CRUD operations in Pedido
    """
    queryset = Pedido.objects.all()
    serializer_class = PedidoSerializer

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            class ReadPedidoSerializer(PedidoSerializer):
                cliente = ClientSerializer()
                generico_producto = GenericoProductoSerializer()
                unidad_compra = UnidadCompraSerializer()
                plan_importacion = PlanImportacionSerializer()
                aprobaciones = AprobacionSerializer(many=True)
                codigos_aprobacion = CodigoAprobacionSerializer(many=True)
                
                class Meta(PedidoSerializer.Meta):
                    depth = 1
            return ReadPedidoSerializer
        return PedidoSerializer

class PosicionViewSet(viewsets.ModelViewSet):
    queryset = Posicion.objects.all()
    serializer_class = PosicionSerializer


class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer


class UnidadMedidaViewSet(viewsets.ModelViewSet):
    queryset = UnidadMedida.objects.all()
    serializer_class = UnidadMedidaSerializer

