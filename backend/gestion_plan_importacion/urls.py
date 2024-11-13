from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PlanImportacionViewSet, ExtraplanViewSet, GenericoProductoPIViewSet, ObjetoViewSet

# Crea un enrutador y registra los ViewSets
router = DefaultRouter()
router.register(r'plan-importacion', PlanImportacionViewSet, basename='planimportacion')
router.register(r'extraplan', ExtraplanViewSet, basename='extraplan')
router.register(r'generico-producto-pi', GenericoProductoPIViewSet, basename='genericoproductopi')
router.register(r'objeto', ObjetoViewSet, basename='objeto')

# Define las URL patterns
urlpatterns = [
    path('', include(router.urls)),
]