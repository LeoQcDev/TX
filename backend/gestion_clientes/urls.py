from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ClientViewSet,
    PoleViewSet,
    CommercialMarginViewSet,
    RepresentativeViewSet,
    ContractViewSet,
)

# Crea un router para generar automáticamente las rutas de las vistas (ViewSets)
router = DefaultRouter()
router.register(r"clientes", ClientViewSet)
router.register(r"polos", PoleViewSet)
router.register(r"margenes-comerciales", CommercialMarginViewSet)
router.register(r"representantes", RepresentativeViewSet)
router.register(r"contratos", ContractViewSet)

# Incluye las rutas generadas automáticamente
urlpatterns = [
    path("", include(router.urls)),
]
