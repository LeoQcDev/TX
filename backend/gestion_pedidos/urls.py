from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenericoProductoViewSet, UnidadCompraViewSet, PedidoViewSet, PosicionViewSet, ProductoViewSet, UnidadMedidaViewSet

router = DefaultRouter()
router.register(r'generics', GenericoProductoViewSet)
router.register(r'units', UnidadCompraViewSet)
router.register(r'pedidos', PedidoViewSet)
router.register(r'posiciones', PosicionViewSet)
router.register(r'productos', ProductoViewSet)
router.register(r'unidades-medida', UnidadMedidaViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 