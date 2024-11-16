from django.db import models
from django.core.exceptions import ValidationError
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion


class Financiero(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    
    class Meta:
        verbose_name = "Financiero"
        verbose_name_plural = "Financieros"

class CasaFinanciera(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Casa Financiera"
        verbose_name_plural = "Casas Financieras"

class TipoFactura(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Tipo de Factura"
        verbose_name_plural = "Tipos de Facturas"

class Objeto(models.Model):
    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = "Objeto"
        verbose_name_plural = "Objetos"

class CodigoAprobacion(models.Model):
    codigo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    objeto = models.ForeignKey(Objeto, on_delete=models.CASCADE)
    reservado_go = models.FloatField(default=0)
    aprobado = models.FloatField(default=0)
    pedido = models.FloatField(default=0)
    sin_solicitar = models.FloatField(default=0)
    contratado = models.FloatField(default=0)
    sin_contratar = models.FloatField(default=0)

    def __str__(self):
        return self.codigo
    class Meta:
        verbose_name = "Codigo de Aprobacion"
        verbose_name_plural = "Codigos de Aprobaciones"

class Aprobacion(models.Model):
    numero_aprobacion = models.CharField(max_length=100, null=False)
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE)
    financiero = models.ForeignKey(Financiero, on_delete=models.CASCADE)
    casa_financiera = models.ForeignKey(CasaFinanciera, on_delete=models.CASCADE)
    numero_rs = models.IntegerField(null=True, blank=True)
    fecha_emision = models.DateTimeField()
    fecha_vencimiento = models.DateField()
    tipo_factura = models.ForeignKey(TipoFactura, on_delete=models.CASCADE)
    aprobado = models.FloatField(default=0)
    reservado_go = models.FloatField(default=0)
    sin_solicitar = models.FloatField(default=0)
    solicitado = models.FloatField(default=0)
    contratado = models.FloatField(default=0)
    sin_contratar = models.FloatField(default=0)
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE)
    codigos_aprobacion = models.ManyToManyField(CodigoAprobacion)

    def clean(self):
        if self.fecha_vencimiento and self.fecha_emision:
            if self.fecha_vencimiento < self.fecha_emision.date():
                raise ValidationError('La fecha de vencimiento no puede ser menor a la fecha de emisión')

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.numero_aprobacion
    class Meta:
        verbose_name = "Aprobacion"
        verbose_name_plural = "Aprobaciones"