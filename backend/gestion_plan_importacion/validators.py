from django.core.validators import RegexValidator
from django.utils import timezone
from datetime import timedelta
from django.core.exceptions import ValidationError

# Validador para el código de importación
validate_import_code = RegexValidator(
    regex=r'^\d+$',
    message='El código debe contener solo números'
)

# Validador para la fecha de entrada a Tecnotex (dentro de un día)
def validate_date_range_one_day(value):
    if not (timezone.now() <= value <= timezone.now() + timedelta(days=1)):
        raise ValidationError('La fecha debe estar dentro del rango de un día desde ahora.')

# Validador para la fecha de emisión (dentro de dos días)
def validate_date_range_two_days(value):
    if not (timezone.now() <= value <= timezone.now() + timedelta(days=2)):
        raise ValidationError('La fecha debe estar dentro del rango de dos días desde ahora.')

# Validador para el año del plan de importación (últimos tres meses del año)
def validate_last_three_months(value):
    if not (10 <= value.month <= 12):
        raise ValidationError('El mes debe estar entre octubre y diciembre.')

# Validador para el importe no negativo
def validate_importe_no_negativo(value):
    if value < 0:
        raise ValidationError("El importe no puede ser negativo.")

# Validador para que el importe no exceda el total permitido
def validate_importe_no_excede_total(importe, total):
    if importe > total:
        raise ValidationError("El importe no puede exceder el total permitido.")

# Validador para que el líquido no exceda el importe total
def validate_liquido_no_excede_importe(liquido, importe):
    if liquido > importe:
        raise ValidationError("El líquido no puede exceder el importe total.")

# Validador para que el mediano plazo no exceda el líquido
def validate_mediano_plazo_no_excede_liquido(mediano_plazo, liquido):
    if mediano_plazo > liquido:
        raise ValidationError("El mediano plazo no puede exceder el líquido.")

# Validador para que el largo plazo no exceda el líquido
def validate_largo_plazo_no_excede_liquido(largo_plazo, liquido):
    if largo_plazo > liquido:
        raise ValidationError("El largo plazo no puede exceder el líquido.")

# Validador para que el desglose total no exceda el líquido
def validate_desglose_total_no_excede_liquido(desglose_total, liquido):
    if desglose_total > liquido:
        raise ValidationError("El desglose total no puede exceder el líquido.")