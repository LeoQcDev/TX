import django_filters
from .models import PlanImportacion, Extraplan, GenericoProductoPI, Objeto, DesglosePI, DesgloseExtraplan

class PlanImportacionFilter(django_filters.FilterSet):
    codigo_pi = django_filters.CharFilter(lookup_expr="icontains")
    cliente = django_filters.ModelChoiceFilter(queryset=PlanImportacion.objects.values_list('cliente', flat=True).distinct())
    fecha_emision = django_filters.DateFromToRangeFilter()
    anio_pi = django_filters.NumberFilter()

    class Meta:
        model = PlanImportacion
        fields = [
            "codigo_pi",
            "cliente",
            "fecha_emision",
            "anio_pi",
        ]

class ExtraplanFilter(django_filters.FilterSet):
    plan_importacion = django_filters.ModelChoiceFilter(queryset=PlanImportacion.objects.all())
    codigo_extraplan = django_filters.CharFilter(lookup_expr="icontains")
    fecha_emision = django_filters.DateFromToRangeFilter()
    importe_extraplan = django_filters.RangeFilter()

    class Meta:
        model = Extraplan
        fields = [
            "plan_importacion",
            "codigo_extraplan",
            "fecha_emision",
            "importe_extraplan",
        ]

class GenericoProductoPIFilter(django_filters.FilterSet):
    codigo_pi = django_filters.NumberFilter()

    class Meta:
        model = GenericoProductoPI
        fields = ["codigo_pi"]

class ObjetoFilter(django_filters.FilterSet):
    nombre = django_filters.CharFilter(lookup_expr="icontains")
    descripcion = django_filters.CharFilter(lookup_expr="icontains")

    class Meta:
        model = Objeto
        fields = [
            "nombre",
            "descripcion",
        ]

class DesglosePIFilter(django_filters.FilterSet):
    plan_importacion = django_filters.ModelChoiceFilter(queryset=PlanImportacion.objects.all())
    objeto = django_filters.ModelChoiceFilter(queryset=Objeto.objects.all())
    importe_por_objeto = django_filters.RangeFilter()
    liquido = django_filters.RangeFilter()
    mediano_plazo = django_filters.RangeFilter()
    largo_plazo = django_filters.RangeFilter()

    class Meta:
        model = DesglosePI
        fields = [
            "plan_importacion",
            "objeto",
            "importe_por_objeto",
            "liquido",
            "mediano_plazo",
            "largo_plazo",
        ]

class DesgloseExtraplanFilter(django_filters.FilterSet):
    extraplan = django_filters.ModelChoiceFilter(queryset=Extraplan.objects.all())
    objeto = django_filters.ModelChoiceFilter(queryset=Objeto.objects.all())
    importe_por_objeto = django_filters.RangeFilter()
    liquido = django_filters.RangeFilter()
    mediano_plazo = django_filters.RangeFilter()
    largo_plazo = django_filters.RangeFilter()

    class Meta:
        model = DesgloseExtraplan
        fields = [
            "extraplan",
            "objeto",
            "importe_por_objeto",
            "liquido",
            "mediano_plazo",
            "largo_plazo",
        ]