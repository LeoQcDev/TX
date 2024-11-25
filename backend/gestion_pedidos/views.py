from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import GenericoProducto, UnidadCompra, Pedido
from .serializers import GenericoProductoSerializer, UnidadCompraSerializer, PedidoSerializer


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

    def get_queryset(self):
        """
        Optionally filters results based on query parameters
        """
        queryset = Pedido.objects.all()
        client = self.request.query_params.get('client', None)
        Pedido_type = self.request.query_params.get('Pedido_type', None)

        if client is not None:
            queryset = queryset.filter(client__id=client)
        if Pedido_type is not None:
            queryset = queryset.filter(Pedido_type=Pedido_type)

        return queryset 