from django.db import models
from django.core.exceptions import ValidationError
from django.core.validators import MinValueValidator, MaxValueValidator
from django.utils import timezone
from datetime import timedelta
from .validators import (
    validate_code,
    validate_nip,
    validate_reeup,
    validate_commercial_registry,
    validate_contract_number,
    validate_phone,
)


# Client
class Client(models.Model):

    code = models.CharField(
        max_length=25,
        unique=True,
        null=False,
        blank=False,
        validators=[validate_code],
        db_index=True,
    )
    name = models.CharField(
        max_length=100, unique=True, null=False, blank=False, db_index=True
    )
    is_aei = models.BooleanField(default=False)
    reeup_code = models.CharField(
        max_length=25, unique=True, null=True, blank=True, validators=[validate_reeup]
    )
    nip_code = models.CharField(
        max_length=9, unique=True, null=True, blank=True, validators=[validate_nip]
    )
    client_status = models.BooleanField(default=True, db_index=True)

    # direccion
    street = models.CharField(max_length=50, null=True, blank=True)
    between_street = models.CharField(max_length=50, null=True, blank=True)
    country = models.CharField(max_length=50, null=True, default="Cuba", blank=True)
    province = models.CharField(max_length=50, null=True, blank=True)
    municipality = models.CharField(max_length=50, null=True, blank=True)
    zip_code = models.CharField(max_length=25, null=True, blank=True)

    client_email = models.EmailField(max_length=100, unique=True, null=True, blank=True)
    commercial_registry = models.CharField(
        max_length=25,
        unique=True,
        null=True,
        blank=True,
        validators=[validate_commercial_registry],
    )
    client_phone = models.CharField(
        max_length=15, unique=True, validators=[validate_phone], null=True, blank=True
    )
    fax = models.CharField(
        max_length=30, unique=True, validators=[validate_phone], null=True, blank=True
    )
    web = models.URLField(unique=True, null=True, blank=True)

    # relaciones
    contract = models.OneToOneField(
        "Contract", null=True, blank=True, on_delete=models.PROTECT
    )  # Relación 1 a 1 con Contrato
    pole = models.ForeignKey(
        "Pole", null=False, blank=False, on_delete=models.PROTECT
    )  # Relación 0..* a 1 con Polo
    commercial_margin = models.ForeignKey(
        "CommercialMargin", null=True, blank=True, on_delete=models.PROTECT
    )  # Relación 0..* a 1 con Margen Comercial
    representative = models.ForeignKey(
        "Representative", null=True, blank=True, on_delete=models.PROTECT
    )  # Relación 0..* a 1 con Representante

    # autoreferencia a ubi
    ubi = models.ForeignKey("self", null=True, blank=True, on_delete=models.SET_NULL)

    def clean(self):
        # Verificar si el cliente se tiene a sí mismo como UBI
        if self.ubi == self:
            raise ValidationError("Un cliente no puede tenerse a sí mismo como U.B.I")
        # Verificar si es AEI pero no tiene UBI asignada
        if self.is_aei and not self.ubi:
            raise ValidationError("Los clientes con AEI deben tener una UBI asignada")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def delete(self, *args, **kwargs):
        if self.contract:
            raise ValidationError(
                "No se puede eliminar un cliente que tiene un contrato."
            )
        super().delete(*args, **kwargs)

    def __str__(self):
        return self.name


# Contrato
class Contract(models.Model):

    contract_number = models.CharField(
        null=False, blank=False, max_length=8, unique=True, validators=[validate_contract_number], db_index=True
    )
    signature_date = models.DateField(null=True, blank=True)
    contract_status = models.BooleanField(default=True, db_index=True)

    def clean(self):
        if self.signature_date and self.signature_date < timezone.now().date():
            raise ValidationError(
                "La fecha de firma no puede ser menor que la fecha actual"
            )

    @property
    def expiration_date(self):
        if self.signature_date:
            return self.signature_date + timedelta(days=3 * 365)
        return None

    def __str__(self):
        return str(self.contract_number)


# Representante
class Representative(models.Model):

    name = models.CharField(max_length=25, null=False, blank=False, db_index=True)
    last_name = models.CharField(max_length=50, null=False, blank=False, db_index=True)
    representative_email = models.EmailField(
        unique=True, max_length=100, null=False, blank=False
    )
    representative_phone = models.CharField(
        unique=True, max_length=12, null=False, blank=False, validators=[validate_phone]
    )
    representative_status = models.BooleanField(default=True, db_index=True)

    def __str__(self):
        return f"{self.name} {self.last_name}"


# Polo
class Pole(models.Model):

    denomination = models.CharField(
        max_length=50, unique=True, null=False, blank=False, db_index=True
    )
    pole_status = models.BooleanField(default=True, db_index=True)

    def __str__(self):
        return self.denomination


# Margen Comercial
class CommercialMargin(models.Model):
    commercial_margin = models.FloatField(
        unique=False,
        null=False,
        blank=False,
        validators=[MinValueValidator(1), MaxValueValidator(100)],
        db_index=True,
    )
    commercial_margin_status = models.BooleanField(default=True, db_index=True)

    def __str__(self):
        return str(self.commercial_margin)
