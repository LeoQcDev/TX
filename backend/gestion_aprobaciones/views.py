from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import (
    Financiero,
    CasaFinanciera,
    TipoFactura,
    Objeto,
    CodigoAprobacion,
    Aprobacion,
)
from .serializers import (
    FinancieroSerializer,
    CasaFinancieraSerializer,
    TipoFacturaSerializer,
    ObjetoSerializer,
    CodigoAprobacionSerializer,
    AprobacionSerializer,
)


class FinancieroViewSet(viewsets.ModelViewSet):
    queryset = Financiero.objects.all()
    serializer_class = FinancieroSerializer
    


class CasaFinancieraViewSet(viewsets.ModelViewSet):
    queryset = CasaFinanciera.objects.all()
    serializer_class = CasaFinancieraSerializer
    


class TipoFacturaViewSet(viewsets.ModelViewSet):
    queryset = TipoFactura.objects.all()
    serializer_class = TipoFacturaSerializer
    


class ObjetoViewSet(viewsets.ModelViewSet):
    queryset = Objeto.objects.all()
    serializer_class = ObjetoSerializer
    


class CodigoAprobacionViewSet(viewsets.ModelViewSet):
    queryset = CodigoAprobacion.objects.all()
    serializer_class = CodigoAprobacionSerializer
    


class AprobacionViewSet(viewsets.ModelViewSet):
    queryset = Aprobacion.objects.all()
    serializer_class = AprobacionSerializer
