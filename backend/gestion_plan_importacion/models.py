from django.db import models
from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta
from gestion_clientes.models import Client


def validate_date_range_one_day(value):
    return timezone.now() <= value <= timezone.now() + timedelta(days=1)


def validate_date_range_two_days(value):
    return timezone.now() <= value <= timezone.now() + timedelta(days=2)


def validate_last_three_months(value):
    year = value.year
    month = value.month
    return month >= 10 and month <= 12


class PlanImportacion(models.Model):
    ESTADISTICA_CHOICES = [
        ('CP', 'Corto Plazo'),
        ('MP', 'Mediano Plazo'),
        ('LP', 'Largo Plazo')
    ]

    cliente = models.OneToOneField(Client, on_delete=models.CASCADE)
    codigo_pi = models.CharField(
        max_length=20,
        validators=[RegexValidator(regex=r'^\d+$', message='El código debe contener solo números')]
    )
    fecha_entrada_tecnotex = models.DateTimeField(
        default=timezone.now,
        validators=[validate_date_range_one_day]
    )
    importe_inicial = models.DecimalField(max_digits=10, decimal_places=2)
    importe_actual = models.DecimalField(max_digits=10, decimal_places=2)
    objeto = models.CharField(max_length=200)
    estadistica = models.CharField(
        max_length=2,
        choices=ESTADISTICA_CHOICES
    )
    fecha_emision = models.DateTimeField(
        default=timezone.now,
        validators=[validate_date_range_two_days]
    )
    anio_pi = models.IntegerField()

    def save(self, *args, **kwargs):
        if not self.pk:  # Si es una nueva instancia
            self.importe_actual = self.importe_inicial
            self.anio_pi = timezone.now().year + 1
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Plan Importación {self.codigo_pi} - {self.cliente.name}"

    class Meta:
        verbose_name = "Plan de Importación"
        verbose_name_plural = "Planes de Importación"

class Objeto(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Extraplan(models.Model):
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE, related_name='extraplanes')
    importe = models.DecimalField(max_digits=10, decimal_places=2)
    motivo = models.TextField()
    fecha_creacion = models.DateTimeField(auto_now_add=True)

    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        # Actualizar el importe actual del plan de importación
        self.plan_importacion.importe_actual += self.importe
        self.plan_importacion.save()

    def __str__(self):
        return f"Extraplan para {self.plan_importacion.codigo_pi}"


class GenericoProductoPI(models.Model):
    codigo_pi = models.IntegerField(unique=True)

    def __str__(self):
        return f"Genérico Producto PI: {self.codigo_pi}"

    class Meta:
        verbose_name = "Genérico de Producto PI"
        verbose_name_plural = "Genéricos de Producto PI"
