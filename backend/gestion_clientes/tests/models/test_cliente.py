from django.test import TestCase
from django.core.exceptions import ValidationError
from django.utils import timezone
from gestion_clientes.models import (
    Client,
    Contract,
    Pole,
    ComercialMargin,
    Representative,
)


class ClienteModelTest(TestCase):

    def setUp(self):

        # Crear dependencias
        self.pole = Pole.objects.create(denomination="Polo Test")
        self.contract = Contract.objects.create(
            contract_number="TX-12345",
            signature_date=timezone.now()
        )
        self.comercial_margin = ComercialMargin.objects.create(comercial_margin=10)
        self.representative = Representative.objects.create(
            name="Juan",
            last_name="Pérez",
            representative_email="juan@example.com",
            representative_phone="+53 12345678"
        )

        # Datos base para cliente
        self.datos_validos = {
            'code': '12345',
            'name': 'Empresa Única',
            'reeup_code': '666666',
            'nip_code': '999999999',
            'client_email': 'cliente@empresa.com',
            'comercial_registry': '7777777',
            'client_phone': '+53 12345678',
            'pole': self.pole
        }
        self.client = Client.objects.create(**self.datos_validos)

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtencion

    def test_client_str_devuelve_name(self):
        self.assertEqual(str(self.client), "Empresa Única")

    # 1.2 Pruebas de creación

    def test_client_se_crea_con_datos_validos(self):
        nuevo_cliente = Client.objects.create(
            code="44444",
            name="Empresa Test",
            pole=self.pole
        )
        self.assertTrue(Client.objects.filter(id=nuevo_cliente.id).exists())
        self.assertTrue(nuevo_cliente.client_status)

    def test_creacion_client_aei_con_ubi(self):
        ubi = Client.objects.create(
            code="67890",
            name="Empresa UBI",
            is_aei=False,
            pole=self.pole
        )
        
        client_aei = Client.objects.create(
            code="54321",
            name="Empresa AEI",
            is_aei=True,
            ubi=ubi,
            pole=self.pole
        )
        
        self.assertEqual(client_aei.ubi, ubi)

    # 1.3 Pruebas de modificación

    def test_actualizacion_client(self):
        nuevos_datos = {
            'code': '54237',
            'name': 'Empresa Modificada'
        }
        
        for campo, valor in nuevos_datos.items():
            setattr(self.client, campo, valor)
        
        self.client.full_clean()
        self.client.save()
        
        client_actualizado = Client.objects.get(id=self.client.id)
        for campo, valor in nuevos_datos.items():
            self.assertEqual(getattr(client_actualizado, campo), valor)

    def test_cambio_polo_cliente(self):
        nuevo_polo = Pole.objects.create(denomination="Polo Nuevo")
        self.client.pole = nuevo_polo
        self.client.full_clean()
        self.client.save()
        
        client_actualizado = Client.objects.get(id=self.client.id)
        self.assertEqual(client_actualizado.pole, nuevo_polo)

    # 1.4 Pruebas de eliminación

    def test_eliminacion_client_sin_contract(self):
        client_id = self.client.id
        self.client.delete()
        self.assertFalse(Client.objects.filter(id=client_id).exists())

    # 2 Pruebas negativas

    # 2.1 Pruebas de creacion

    def test_validaciones_campos_unicos(self):
        campos_unicos = [
            'code', 'name', 'reeup_code', 'nip_code',
            'comercial_registry', 'client_email', 'client_phone'
        ]

        for campo in campos_unicos:
            with self.subTest(campo=campo):
                datos_nuevo = self.datos_validos.copy()
                datos_nuevo['code'] = '98765'  # Código diferente para evitar conflicto
                datos_nuevo['name'] = 'Otra Empresa'  # Nombre diferente para evitar conflicto
                
                # Usar el valor existente para el campo que estamos probando
                datos_nuevo[campo] = self.datos_validos[campo]
                
                with self.assertRaises(ValidationError):
                    client = Client(**datos_nuevo)
                    client.full_clean()

    def test_validaciones_cliente_aei(self):
        with self.assertRaises(ValidationError):
            Client(
                code="54321",
                name="Empresa AEI",
                is_aei=True,
                pole=self.pole
            ).full_clean()

    def test_validacion_ubi_no_puede_ser_si_mismo(self):
        self.client.ubi = self.client
        with self.assertRaises(ValidationError):
            self.client.full_clean()

    # 2.2 Pruebas de modificacion

    def test_proteccion_eliminacion_con_contract(self):
        client = Client.objects.create(
            code="00001",
            name="Empresa Contrato",
            contract=self.contract,
            pole=self.pole
        )
        
        with self.assertRaises(ValidationError):
            client.delete()
