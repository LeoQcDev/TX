from django.db import models
from django.core.exceptions import ValidationError
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion,Objeto
from django.utils import timezone 

class Financiero(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name


class CasaFinanciera(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name


class TipoFactura(models.Model):
    name = models.CharField(max_length=100,unique=True)

    def __str__(self):
        return self.name

class CodigoAprobacion(models.Model):
    codigo = models.CharField(max_length=100)
    descripcion = models.CharField(max_length=255)
    objeto = models.ForeignKey(Objeto, on_delete=models.CASCADE)
    reservado_go = models.FloatField(default=0)
    aprobado = models.FloatField(default=0)
    monto_pedido = models.FloatField(default=0)
    contratado = models.FloatField(default=0)
        
    def __str__(self):
        return f"Código {self.codigo} - Aprobación {self.aprobacion.numero_aprobacion}"
    @property
    def sin_solicitar(self):
        return self.aprobado - self.monto_pedido

    @property
    def sin_contratar(self):
        return self.aprobado - self.contratado
    #Validacion para contratado y pedido#
    def clean(self):
        if self.monto_pedido > self.aprobado:
            raise ValidationError({'monto pedido': 'El monto pedido no puede sobrepasar el monto aprobado.'})
        
        if self.contratado > self.aprobado:
            raise ValidationError({'contratado': 'El monto contratado no puede sobrepasar el monto aprobado.'})

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs) 


class Aprobacion(models.Model):
    numero_aprobacion = models.CharField(max_length=100, null=False,unique=True)
    cliente = models.ForeignKey(Client, on_delete=models.CASCADE,related_name='aprobaciones')
    financiero = models.ForeignKey(Financiero, on_delete=models.CASCADE)
    casa_financiera = models.ForeignKey(CasaFinanciera, on_delete=models.CASCADE)
    numero_rs = models.FloatField(null=True, blank=True)
    fecha_emision = models.DateTimeField(auto_now_add=True)
    fecha_vencimiento = models.DateField()
    tipo_factura = models.ForeignKey(TipoFactura, on_delete=models.CASCADE)
    plan_importacion = models.ForeignKey(PlanImportacion, on_delete=models.CASCADE)
    codigos_aprobacion = models.ManyToManyField(CodigoAprobacion, related_name='aprobaciones')
    aprobacion_status = models.BooleanField(default=True) 


#Validacion para fecha de vencimiento
    def clean(self):
        if self.fecha_vencimiento and self.fecha_emision:
            if self.fecha_vencimiento < self.fecha_emision.date():
                raise ValidationError('La fecha de vencimiento no puede ser menor a la fecha de emisión')

    def save(self, *args, **kwargs):
         # Actualizar el estado de la aprobación basado en el estado del cliente
        self.aprobacion_status = self.cliente.client_status
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        return self.numero_aprobacion
        
       

    @property
    def reservado_go(self):
        return sum(codigo.reservado_go for codigo in self.codigos_aprobacion.all())

    @property
    def solicitado(self):
        return sum(codigo.solicitado for codigo in self.codigos_aprobacion.all())

    @property
    def sin_solicitar(self):
        return sum(codigo.sin_solicitar for codigo in self.codigos_aprobacion.all())

    @property
    def contratado(self):
        return sum(codigo.contratado for codigo in self.codigos_aprobacion.all())

    @property
    def aprobado(self):
        return sum(codigo.aprobado for codigo in self.codigos_aprobacion.all())
    @property
    def sin_contratar(self):
        return sum(codigo.sin_contratar for codigo in self.codigos_aprobacion.all())
   
