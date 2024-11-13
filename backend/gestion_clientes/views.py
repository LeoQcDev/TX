from rest_framework import viewsets, status
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import Client, Pole, CommercialMargin, Representative, Contract
from .serializers import (
    ClientSerializer,
    PoleSerializer,
    CommercialMarginSerializer,
    RepresentativeSerializer,
    ContractSerializer,
)
from .filters import (
    PoleFilter,
    CommercialMarginFilter,
    RepresentativeFilter,
    ContractFilter,
    ClientFilter,
)


# Vista para el modelo Cliente
class ClientViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar operaciones CRUD del modelo Cliente.

    Se incluyen filtros mediante DjangoFilterBackend y se
    sobreescribe el método destroy para evitar eliminar
    un cliente que tenga contrato asociado.
    """

    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ClientFilter

    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribe el método destroy para evitar la eliminación
        de un cliente que tenga contratos asociados.
        Retorna un error si el cliente tiene un contrato.
        """
        client = self.get_object()
        if client.contract:
            return Response(
                {
                    "detail": "No se puede eliminar un cliente que tiene un contrato asociado"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


# Vista para el modelo Polo
class PoleViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar operaciones CRUD del modelo Polo.

    Se incluyen filtros mediante DjangoFilterBackend y se
    sobreescribe el método destroy para evitar eliminar
    un polo que esté asociado a clientes.
    """

    queryset = Pole.objects.all()
    serializer_class = PoleSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = PoleFilter

    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribe el método destroy para evitar la eliminación
        de un polo que esté asociado a uno o más clientes.
        Retorna un error si el polo tiene clientes asociados.
        """
        pole = self.get_object()
        if Client.objects.filter(pole=pole).exists():
            return Response(
                {
                    "detail": "No se puede eliminar un polo que esté asociado a uno o más clientes"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


# Vista para el modelo MargenComercial
class CommercialMarginViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar operaciones CRUD del modelo MargenComercial.

    Se incluyen filtros mediante DjangoFilterBackend y se sobreescribe
    el método destroy para evitar eliminar un margen comercial que
    esté asociado a clientes.
    """

    queryset = CommercialMargin.objects.all()
    serializer_class = CommercialMarginSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = CommercialMarginFilter

    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribe el método destroy para evitar la eliminación de un
        margen comercial que esté asociado a uno o más clientes.
        Retorna un error si el margen comercial tiene clientes asociados.
        """
        commercial_margin = self.get_object()
        if Client.objects.filter(commercial_margin=commercial_margin).exists():
            return Response(
                {
                    "detail": "No se puede eliminar un margen comercial que esté asociado a uno o más clientes"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


# Vista para el modelo Representante
class RepresentativeViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar operaciones CRUD del modelo Representante.

    Se incluyen filtros mediante DjangoFilterBackend y se sobreescribe
    el método destroy para evitar eliminar un representante que esté
    asociado a clientes.
    """

    queryset = Representative.objects.all()
    serializer_class = RepresentativeSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = RepresentativeFilter

    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribe el método destroy para evitar la eliminación de
        un representante que esté asociado a uno o más clientes.
        Retorna un error si el representante tiene clientes asociados.
        """
        representative = self.get_object()
        if Client.objects.filter(representative=representative).exists():
            return Response(
                {
                    "detail": "No se puede eliminar un representante que esté asociado a uno o más clientes"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)


# Vista para el modelo Contrato
class ContractViewSet(viewsets.ModelViewSet):
    """
    ViewSet para gestionar operaciones CRUD del modelo Contrato.

    Se incluyen filtros mediante DjangoFilterBackend y se sobreescribe
    el método destroy para evitar eliminar un contrato que esté
    asociado a un cliente.
    """

    queryset = Contract.objects.all()
    serializer_class = ContractSerializer
    filter_backends = [DjangoFilterBackend]
    filterset_class = ContractFilter

    def destroy(self, request, *args, **kwargs):
        """
        Sobreescribe el método destroy para evitar la eliminación
        de un contrato que esté asociado a un cliente.
        Retorna un error si el contrato tiene un cliente asociado.
        """
        contract = self.get_object()
        if Client.objects.filter(contract=contract).exists():
            return Response(
                {
                    "detail": "No se puede eliminar un contrato que esté asociado a un cliente"
                },
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)
