from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.utils import IntegrityError
from django.db.models import ProtectedError
from django.utils import timezone
from datetime import timedelta
from gestion_clientes.models import Contract, Client, Pole


# Pruebas para el modelo Contrato
class ContratoModelTest(TestCase):

    def setUp(self):
        self.current_date = timezone.now().date()
        self.valid_data = {
            'contract_number': 'TX-00001',
            'signature_date': self.current_date,
            'contract_status': True
        }
        self.contract = Contract.objects.create(**self.valid_data)
        
        # Crear un segundo contrato para pruebas de duplicados
        self.contract_2 = Contract.objects.create(
            contract_number='TX-00002',
            signature_date=self.current_date
        )

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtención

    def test_contract_str_devuelve_numero(self):
        self.assertEqual(str(self.contract), "TX-00001")

    # 1.2 Pruebas de creación

    def test_contrato_se_crea_con_datos_validos(self):
        new_contract = Contract.objects.create(
            contract_number="TX-00003",
            signature_date=self.current_date
        )
        self.assertTrue(Contract.objects.filter(id=new_contract.id).exists())

    # 1.3 Pruebas de modificación

    def test_actualizacion_contrato(self):
        new_data = {
            'signature_date': self.current_date + timedelta(days=5)
        }
        
        for field, value in new_data.items():
            setattr(self.contract, field, value)
        
        self.contract.full_clean()
        self.contract.save()
        
        updated_contract = Contract.objects.get(id=self.contract.id)
        for field, value in new_data.items():
            self.assertEqual(getattr(updated_contract, field), value)

    # 1.4 Pruebas de eliminación

    def test_eliminacion_contrato_sin_clientes(self):
        contract_id = self.contract.id
        self.contract.delete()
        self.assertFalse(Contract.objects.filter(id=contract_id).exists())

    # 1.5 Pruebas de métodos

    def test_fecha_vencimiento_calculada_correctamente(self):
        expected_expiration_date = self.current_date + timedelta(days=3 * 365)
        self.assertEqual(self.contract.expiration_date, expected_expiration_date)

    def test_fecha_vencimiento_es_none_sin_fecha_firma(self):
        contract = Contract(contract_number="TX-00004")
        self.assertIsNone(contract.expiration_date)

    # 2 Pruebas negativas

    # 2.1 Pruebas de creacion

    def test_validaciones_numero_contrato(self):
        invalid_cases = [
            ("", ValidationError),
            ("12345", ValidationError),  # Formato inválido
            ("TX-00002", ValidationError),  # Duplicado
        ]

        for contract_number, expected_error in invalid_cases:
            with self.subTest(contract_number=contract_number):
                contract = Contract(
                    contract_number=contract_number,
                    signature_date=self.current_date
                )
                with self.assertRaises(expected_error):
                    contract.full_clean()
                    
    def test_numero_contrato_no_puede_ser_nulo(self):
        with self.assertRaises(ValidationError):
            contract = Contract(
                signature_date=self.current_date
            )
            contract.full_clean()
            contract.save()

    def test_validacion_signature_date(self):
        past_date = self.current_date - timedelta(days=1)
        contract = Contract(
            contract_number="TX-00005",
            signature_date=past_date
        )
        
        with self.assertRaises(ValidationError):
            contract.full_clean()

    # 2.2 Pruebas de modificacion

    def test_modificacion_numero_contrato_duplicado(self):
        """Prueba que no se puede modificar el número de contrato a uno existente"""
        self.contract.contract_number = self.contract_2.contract_number
        
        with self.assertRaises(ValidationError):
            self.contract.full_clean()

    # 2.3 Pruebas de eliminacion

    def test_eliminacion_contrato_asociado_a_cliente(self):
        """Prueba que no se puede eliminar un contrato asociado a un cliente"""
        # Se crea un objeto polo y un cliente para la prueba
        pole = Pole.objects.create(denomination="Serios SA")
        Client.objects.create(
            name="Leomar",
            code="12001",
            pole=pole,
            contract=self.contract
        )
        
        with self.assertRaises(ProtectedError):
            # Intenta eliminar, se espera que el servidor responda con ProtectedError
            self.contract.delete()
