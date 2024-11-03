from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.models import ProtectedError
from gestion_clientes.models import Representative, Pole, Client


# Pruebas para el modelo Representante
class RepresentativeModelTest(TestCase):

    def setUp(self):
        """Crea un representante válido para las pruebas."""
        self.valid_data = {
            'name': 'Juan',
            'last_name': 'Pérez García',
            'representative_email': 'juan.perez@example.com',
            'representative_phone': '+53 55555555'
        }
        self.representative = Representative.objects.create(**self.valid_data)

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtencion

    def test_representante_str_devuelve_nombre_completo(self):
        """Prueba que el método __str__ retorna la denominacion del polo"""
        self.assertEqual(str(self.representative), "Juan Pérez García")

    # 1.2 Pruebas de creacion

    def test_representante_se_crea_con_datos_validos(self):
        """Prueba la creación de un representante con datos válidos"""
        new_representative = Representative.objects.create(
            name="Carlos",
            last_name="González",
            representative_email="carlos@example.com", 
            representative_phone="+53 99999999"
        )
        self.assertTrue(Representative.objects.filter(id=new_representative.id).exists())

    # 1.3 Pruebas de modificacion

    def test_actualizacion_datos_representante(self):
        """Prueba que se puede modificar el nombre, apellidos, telefono y correo del representante"""
        new_data = {
            'name': 'Leo',
            'last_name': 'Quevedo Castillo',
            'representative_email': 'leoqcmar@uci.cu',
            'representative_phone': '+53 59087957'
        }
        
        for field, value in new_data.items():
            setattr(self.representative, field, value)
        
        self.representative.full_clean()
        self.representative.save()
        
        updated_representative = Representative.objects.get(id=self.representative.id)
        for field, value in new_data.items():
            self.assertEqual(getattr(updated_representative, field), value)

    # 1.4 Pruebas de eliminación

    def test_eliminacion_representante_sin_clientes(self):
        """Prueba que se puede eliminar un representante que no esté asociado a un cliente"""
        self.representative.delete()
        self.assertFalse(Representative.objects.filter(id=self.representative.id).exists())

    # 2 Pruebas negativas
    # 2.1 Pruebas de creacion

    def test_validacion_campos_requeridos(self):
        """Prueba que no se puede crear un representante sin nombre, apellidos, correo o teléfono"""
        required_fields = ['name', 'last_name', 'representative_email', 'representative_phone']
        
        for field in required_fields:
            with self.subTest(field=field):
                data = self.valid_data.copy()
                data[field] = ''
                
                with self.assertRaises(ValidationError):
                    representative = Representative(**data)
                    representative.full_clean()

    def test_validacion_formato_correo(self):
        """Prueba que no se puede crear un representante con correo inválido"""
        self.representative.representative_email = "correo_invalido"
        with self.assertRaises(ValidationError):
            self.representative.full_clean()

    def test_validacion_formato_telefono(self):
        """Prueba que no se puede crear un representante con teléfono inválido"""
        self.representative.representative_phone = "12345"  # formato inválido
        with self.assertRaises(ValidationError):
            self.representative.full_clean()

    # 2.2 Pruebas de modificación

    def test_modificacion_correo_a_valor_invalido(self):
        """Prueba que no se puede modificar el correo del cliente a un valor invalido"""
        self.representative.representative_email = "leomarqc"
        with self.assertRaises(ValidationError):
            # Se espera que falle por el validador
            self.representative.full_clean()

    def test_modificacion_telefono_a_valor_invalido(self):
        """Prueba que no se puede modificar el telefono del cliente a un valor invalido"""
        self.representative.representative_phone = "123434333333333333333333333333333"
        with self.assertRaises(ValidationError):
            # Se espera que falle por el validador
            self.representative.full_clean()

    # 2.3 Pruebas de eliminación

    def test_proteccion_eliminacion_con_clientes(self):
        """Prueba que no se puede eliminar un representante que esté asociado a un cliente"""
        pole = Pole.objects.create(denomination="Grupo A")
        Client.objects.create(
            name="X-Men",
            code="23421",
            pole=pole,
            representative=self.representative
        )
        
        with self.assertRaises(ProtectedError):
            self.representative.delete()
