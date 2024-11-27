from django.db import models, transaction
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


class UnidadMedida(models.Model):
    nombre = models.CharField(max_length=100)
    denominacion = models.CharField(max_length=10)

    def __str__(self):
        return f"{self.nombre} ({self.denominacion})"

    class Meta:
        verbose_name = "Unidad de Medida"
        verbose_name_plural = "Unidades de Medida"


class Producto(models.Model):
    nombre = models.CharField(max_length=200)
    codigo = models.IntegerField()
    descripcion_producto = models.TextField()
    cantidad = models.IntegerField()
    precio_unitario = models.FloatField()
    especificaciones_tecnicas = models.TextField()
    unidad_medida = models.ForeignKey(UnidadMedida, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.codigo} - {self.nombre}"

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"


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
    financiamiento = models.FloatField(default=0, editable=False)
    aprobaciones = models.ManyToManyField(
        Aprobacion,
        related_name='pedidos',
        verbose_name="Aprobaciones"
    )
    codigos_aprobacion = models.ManyToManyField(
        'gestion_aprobaciones.CodigoAprobacion',
        related_name='pedidos_relacionados'
    )
    presentador = models.CharField(max_length=200,null=True)
    grupo = models.CharField(max_length=200,null=True)
    tipo_pedido = models.CharField(max_length=100,null=True)
    unidad_compra = models.ForeignKey(UnidadCompra, on_delete=models.CASCADE,null=True)
    generico_producto = models.ForeignKey(GenericoProducto, on_delete=models.CASCADE,null=True)
    fecha_presentado = models.DateTimeField(
        default=timezone.now,
        validators=[validate_date_range_three_days]
    )

    def save(self, *args, **kwargs):
        skip_recalculation = kwargs.pop('skip_recalculation', False)
        super().save(*args, **kwargs)
        
        if not skip_recalculation:
            self.recalcular_financiamiento()

    def __str__(self):
        return f"Pedido {self.numero_711} - {self.cliente.name}"

    class Meta:
        verbose_name = "Pedido"
        verbose_name_plural = "Pedidos"

    def recalcular_financiamiento(self):
        self.financiamiento = sum(codigo.aprobado for codigo in self.codigos_aprobacion.all())
        self.save(skip_recalculation=True, update_fields=['financiamiento'])


class Posicion(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='posiciones', on_delete=models.CASCADE)
    aprobacion = models.ForeignKey(Aprobacion, on_delete=models.CASCADE)
    codigo_aprobacion = models.ForeignKey(CodigoAprobacion, on_delete=models.CASCADE)
    productos = models.ManyToManyField(Producto)

    def __str__(self):
        return f"Posición de {self.pedido.numero_711}"

    class Meta:
        verbose_name = "Posición"
        verbose_name_plural = "Posiciones"
