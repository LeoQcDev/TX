from django.core.validators import RegexValidator

validate_code = RegexValidator(
    regex=r"^\d{5}", message="El código del cliente debe tener 5 dígitos"
)
validate_nip = RegexValidator(
    regex=r"^\d{9}", message="El código NIP debe tener 9 dígitos"
)
validate_reeup = RegexValidator(
    regex=r"^\d{6}", message="El código REEUP debe tener 6 dígitos"
)
validate_phone = RegexValidator(
    regex=r"^\+53\s\d{8}$", message="El teléfono debe tener el formato +53 XXXXXXXX"
)
validate_contract_number = RegexValidator(
    regex=r"^TX-\d{5}", message="El número de contrato debe tener el formato TX-ddddd"
)
validate_commercial_registry = RegexValidator(
    regex=r"^\d{7}", message="El código de registro mercantil debe tener 7 dígitos"
)
