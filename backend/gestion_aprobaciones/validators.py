from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Client, Aprobacion

@receiver(post_save, sender=Client)
def update_aprobaciones_estado(sender, instance, **kwargs):
    # Actualizar el estado de todas las aprobaciones del cliente
    Aprobacion.objects.filter(cliente=instance).update(aprobacion_status=instance.client_status)