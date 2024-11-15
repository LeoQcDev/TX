from rest_framework import viewsets, status
from rest_framework.permissions import IsAuthenticated
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.response import Response
from .models import PlanImportacion, Extraplan, GenericoProductoPI, Objeto, DesglosePI, DesgloseExtraplan
from .serializers import PlanImportacionSerializer, ExtraplanSerializer, GenericoProductoPISerializer, ObjetoSerializer, DesglosePISerializer, DesgloseExtraplanSerializer
from .filters import PlanImportacionFilter, ExtraplanFilter, GenericoProductoPIFilter, ObjetoFilter, DesglosePIFilter, DesgloseExtraplanFilter

class PlanImportacionViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en PlanImportacion
    """
    queryset = PlanImportacion.objects.all()
    serializer_class = PlanImportacionSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = PlanImportacionFilter

    def destroy(self, request, *args, **kwargs):
        plan_importacion = self.get_object()
        if Extraplan.objects.filter(plan_importacion=plan_importacion).exists():
            return Response(
                {"detail": "No se puede eliminar un plan de importación que tenga extraplanes asociados"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        return super().destroy(request, *args, **kwargs)

    def get_queryset(self):
        """
        Opcionalmente filtra los resultados basados en parámetros de consulta
        """
        queryset = PlanImportacion.objects.all()
        cliente = self.request.query_params.get('cliente', None)
        if cliente is not None:
            queryset = queryset.filter(cliente__id=cliente)
        return queryset

class ExtraplanViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en Extraplan
    """
    queryset = Extraplan.objects.all()
    serializer_class = ExtraplanSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ExtraplanFilter

class GenericoProductoPIViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en GenericoProductoPI
    """
    queryset = GenericoProductoPI.objects.all()
    serializer_class = GenericoProductoPISerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = GenericoProductoPIFilter

class ObjetoViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en Objeto
    """
    queryset = Objeto.objects.all()
    serializer_class = ObjetoSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = ObjetoFilter

class DesglosePIViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en DesglosePI
    """
    queryset = DesglosePI.objects.all()
    serializer_class = DesglosePISerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DesglosePIFilter

class DesgloseExtraplanViewSet(viewsets.ModelViewSet):
    """
    ViewSet para operaciones CRUD en DesgloseExtraplan
    """
    queryset = DesgloseExtraplan.objects.all()
    serializer_class = DesgloseExtraplanSerializer
    permission_classes = [IsAuthenticated]
    filter_backends = [DjangoFilterBackend]
    filterset_class = DesgloseExtraplanFilter