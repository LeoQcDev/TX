from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import GenericoProductoViewSet, UnidadCompraViewSet, PedidoViewSet

router = DefaultRouter()
router.register(r'generics', GenericoProductoViewSet)
router.register(r'units', UnidadCompraViewSet)
router.register(r'pedidos', PedidoViewSet)

urlpatterns = [
    path('', include(router.urls)),
] 