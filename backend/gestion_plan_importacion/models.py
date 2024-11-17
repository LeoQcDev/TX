from django.db import models
from django.core.validators import RegexValidator, MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import timedelta
from gestion_clientes.models import Client



def validate_date_range_one_day(value):
    return timezone.now() <= value <= timezone.now() + timedelta(days=1)


def validate_date_range_two_days(value):
    return timezone.now() <= value <= timezone.now() + timedelta(days=2)



class PlanImportacion(models.Model):
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    fecha_emision = models.DateTimeField(default=timezone.now)
    importe_pi = models.DecimalField(max_digits=10, decimal_places=2, null=False)
    anio_pi = models.PositiveSmallIntegerField(validators=[
        MinValueValidator(2000),
        MaxValueValidator(2100)
    ])
    codigo_pi = models.CharField(max_length=8, unique=True, editable=False)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si es una nueva instancia
            # Generar el código PI automáticamente
            last_plan = PlanImportacion.objects.filter(anio_pi=self.anio_pi).order_by('codigo_pi').last()
            if last_plan:
                last_code = int(last_plan.codigo_pi[4:])
                new_code = f"{self.anio_pi}{last_code + 1:04d}"
            else:
                new_code = f"{self.anio_pi}0001"
            self.codigo_pi = new_code
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Plan Importación {self.codigo_pi} - {self.cliente.name}"

    class Meta:
        unique_together = ['cliente', 'anio_pi']
        verbose_name = "Plan de Importación"
        verbose_name_plural = "Planes de Importación"

class Objeto(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name


class Extraplan(models.Model):
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE, related_name='extraplanes')
    codigo_extraplan = models.CharField(max_length=9, unique=True, editable=False,null=True)
    fecha_emision = models.DateTimeField(default=timezone.now)
    motivo = models.TextField()
    importe_extraplan = models.DecimalField(max_digits=10, decimal_places=2, null=False)

    def save(self, *args, **kwargs):
        if not self.pk:  # Si es una nueva instancia
            # Generar el código Extraplan automáticamente
            last_extraplan = Extraplan.objects.filter(plan_importacion__anio_pi=self.plan_importacion.anio_pi).order_by('codigo_extraplan').last()
            if last_extraplan:
                last_code = int(last_extraplan.codigo_extraplan[5:])
                new_code = f"{self.plan_importacion.anio_pi}E{last_code + 1:04d}"
            else:
                new_code = f"{self.plan_importacion.anio_pi}E0001"
            self.codigo_extraplan = new_code
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Extraplan {self.codigo_extraplan} para {self.plan_importacion.codigo_pi}"

    class Meta:
        verbose_name = "Extraplan"
        verbose_name_plural = "Extraplanes"

class GenericoProductoPI(models.Model):
    codigo_pi = models.IntegerField(unique=True)

    def __str__(self):
        return f"Genérico Producto PI: {self.codigo_pi}"

    class Meta:
        verbose_name = "Genérico de Producto PI"
        verbose_name_plural = "Genéricos de Producto PI"

class Objeto(models.Model):
    nombre = models.CharField(max_length=100, unique=True)
    descripcion = models.TextField()

    def __str__(self):
        return self.nombre

    class Meta:
        verbose_name = "Objeto"
        verbose_name_plural = "Objetos"

class DesglosePI(models.Model):
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE, related_name='desgloses')
    objeto = models.ForeignKey(Objeto, on_delete=models.CASCADE)
    importe_por_objeto = models.DecimalField(max_digits=10, decimal_places=2)
    liquido = models.DecimalField(max_digits=10, decimal_places=2)
    mediano_plazo = models.DecimalField(max_digits=10, decimal_places=2)
    largo_plazo = models.DecimalField(max_digits=10, decimal_places=2)
    desglose_total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.desglose_total = self.liquido + self.mediano_plazo + self.largo_plazo
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Desglose para {self.plan_importacion.codigo_pi} - {self.objeto.nombre}"

class DesgloseExtraplan(models.Model):
    extraplan = models.ForeignKey(Extraplan, on_delete=models.CASCADE, related_name='desgloses')
    objeto = models.ForeignKey(Objeto, on_delete=models.CASCADE)
    importe_por_objeto = models.DecimalField(max_digits=10, decimal_places=2)
    liquido = models.DecimalField(max_digits=10, decimal_places=2)
    mediano_plazo = models.DecimalField(max_digits=10, decimal_places=2)
    largo_plazo = models.DecimalField(max_digits=10, decimal_places=2)
    desglose_total = models.DecimalField(max_digits=10, decimal_places=2, editable=False)

    def save(self, *args, **kwargs):
        self.desglose_total = self.liquido + self.mediano_plazo + self.largo_plazo
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Desglose para {self.extraplan.codigo_extraplan} - {self.objeto.nombre}"

