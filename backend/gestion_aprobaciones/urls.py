from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    FinancieroViewSet,
    CasaFinancieraViewSet,
    TipoFacturaViewSet,
    ObjetoViewSet,
    CodigoAprobacionViewSet,
    AprobacionViewSet,
)

router = DefaultRouter()
router.register(r'financieros', FinancieroViewSet)
router.register(r'casas-financieras', CasaFinancieraViewSet)
router.register(r'tipos-factura', TipoFacturaViewSet)
router.register(r'objetos', ObjetoViewSet)
router.register(r'codigos-aprobacion', CodigoAprobacionViewSet)
router.register(r'aprobaciones', AprobacionViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 