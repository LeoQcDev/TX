from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientViewSet,
    PoleViewSet,
    ComercialMarginViewSet,
    RepresentativeViewSet,
    ContractViewSet,
)

# Crea un router para generar automáticamente las rutas de las vistas
router = DefaultRouter()
router.register(r"clientes", ClientViewSet)
router.register(r"polos", PoleViewSet)
router.register(r"margenes-comerciales", ComercialMarginViewSet)
router.register(r"representantes", RepresentativeViewSet)
router.register(r"contratos", ContractViewSet)

# Incluye las rutas generadas automáticamente
urlpatterns = [
    path("", include(router.urls)),
]
