from django.db import models
from django.core.exceptions import ValidationError
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion
from gestion_aprobaciones.models import Aprobacion, CodigoAprobacion
from django.core.validators import RegexValidator


def validate_date_range_three_days(value):
    """Valida que la fecha no sea más de 3 días antes que la actual"""
    three_days_ago = timezone.now() - timezone.timedelta(days=3)
    if value < three_days_ago:
        raise ValidationError('La fecha no puede ser más de 3 días antes que la actual')


class GenericoProducto(models.Model):
    nombre = models.CharField(max_length=200)
    grupo = models.CharField(max_length=100)

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Genérico de Producto"
        verbose_name_plural = "Genéricos de Producto"


class UnidadCompra(models.Model):
    nombre_departamento = models.CharField(max_length=200)

    def __str__(self):
        return self.nombre_departamento

    class Meta:
        verbose_name = "Unidad de Compra"
        verbose_name_plural = "Unidades de Compra"


class Pedido(models.Model):
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    numero_711 = models.CharField(
        max_length=20,
        validators=[
            RegexValidator(
                regex=r'^[0-9]+/OC$',
                message='El formato debe ser números seguidos de /OC'
            )
        ]
    )
    fecha_entrada_tecnotex = models.DateTimeField(
        default=timezone.now,
        validators=[validate_date_range_three_days]
    )
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE)
    financiamiento = models.CharField(max_length=100)
    aprobacion = models.ForeignKey(Aprobacion, on_delete=models.CASCADE)
    codigos_aprobacion = models.ManyToManyField(
        'gestion_aprobaciones.CodigoAprobacion',
        related_name='pedidos_relacionados'
    )
    
    # Información de pedido
    presentador = models.CharField(max_length=200)
    tipo_pedido = models.CharField(max_length=100)
    unidad_compra = models.ForeignKey(UnidadCompra, on_delete=models.CASCADE)
    generico_producto = models.ForeignKey(GenericoProducto, on_delete=models.CASCADE)
    fecha_presentado = models.DateTimeField(
        default=timezone.now,
        validators=[validate_date_range_three_days]
    )

    def __str__(self):
        return f"Pedido {self.numero_711} - {self.cliente.name}"

    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"
