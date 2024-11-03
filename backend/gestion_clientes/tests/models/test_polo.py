from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.models import ProtectedError
from django.db.utils import IntegrityError, DataError
from gestion_clientes.models import Client, Pole
from gestion_clientes.utils.generdor_string import generar_cadena_aleatoria


# Pruebas para el modelo Polo
class PoloModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            'denomination': 'Industria Textil'
        }
        self.pole = Pole.objects.create(**self.valid_data)

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtencion

    def test_str_method(self):
        """Prueba que el método __str__ retorna la denominacion del polo"""
        self.assertEqual(str(self.pole), "Industria Textil")

    # 1.2 Pruebas de creacion

    def test_creacion_polo_exitoso(self):
        """Prueba que un polo se crea correctamente"""
        pole = Pole.objects.get(denomination="Industria Textil")
        try:
            self.assertEqual(pole.denomination, "Industria Textil")
            self.assertTrue(pole.pole_status)  # Por defecto es True
        except AssertionError:
            self.fail("No debería lanzar un AssertionError")

    def test_estado_polo_por_defecto(self):
        """Prueba que el campo estado_polo sea True por defecto"""
        self.assertTrue(self.pole.pole_status)

    # Pruebas de modificacion

    def test_desactivar_polo(self):
        """Prueba que se puede desactivar el estado de un polo"""
        self.pole.pole_status = False
        try:
            # Se salva el nuevo valor del estado
            self.pole.save()
            # Se comprueba si es False
            self.assertFalse(self.pole.pole_status)
        except ValidationError:
            self.fail("No deberia lanzar un ValidationError")
        except AssertionError:
            self.fail("No debería lanzar un AssertionError")

    def test_modificar_denominacion(self):
        """Prueba que se puede modificar la denominacion de un polo"""
        self.pole.denomination = "Industria Pesquera"
        try:
            # Valida y salva el nuevo valor
            self.pole.full_clean()
            self.pole.save()
            # Valida sea igual al valor esperado
            self.assertEqual(self.pole.denomination, "Industria Pesquera")
        except ValidationError:
            self.fail("No deberia lanzar un ValidationError")
        except AssertionError:
            self.fail("No debería lanzar un AssertionError")

    def test_modificar_polo(self):
        """Prueba que se pueden modificar ambos atributos de un polo"""
        self.pole.denomination = "Industria Agraria"
        self.pole.pole_status = False
        try:
            # Valida y salva los nuevos valores
            self.pole.full_clean()
            self.pole.save()
            # Valida que sean iguales al valor esperado
            self.assertEqual(self.pole.denomination, "Industria Agraria")
            self.assertFalse(self.pole.pole_status)
        except ValidationError:
            self.fail("No deberia lanzar un ValidationError")
        except AssertionError:
            self.fail("No debería lanzar un AssertionError")

    # Pruebas de eliminacion

    def test_eliminar_polo_no_asociado(self):
        """Prueba que un polo no asociado se elimina correctamente"""
        pole = Pole.objects.create(denomination="Grupo Automotriz")
        # se guarda el ID para futuras verificaciones
        pole_id = pole.id
        pole.delete()
        with self.assertRaises(Pole.DoesNotExist):
            # Se espera se lance un DoesNoExist
            Pole.objects.get(id=pole_id)

    # 2 Pruebas negativas

    # 2.1 Pruebas de creacion

    def test_creacion_polo_sin_denominacion_nivel_de_app(self):
        """Prueba que no se puede crear un polo sin denominacion"""
        pole = Pole(denomination=None)
        with self.assertRaises(ValidationError):
            # Se intenta crear un polo sin denominación, debe lanzar un ValidationError
            pole.full_clean()
            pole.save()

    def test_creacion_polo_sin_denominacion_nivel_de_db(self):
        """Prueba que no se puede crear un Polo sin denominación"""
        with self.assertRaises(IntegrityError):
            # Se intenta crear un polo con denominación None, debe lanzar un IntegrityError
            Pole.objects.create(denomination=None)

    def test_creacion_polo_con_denominacion_vacia(self):
        """Prueba que no se puede crear un Polo con denominación vacía"""
        pole = Pole(denomination="")
        with self.assertRaises(ValidationError):
            # Se intenta crear un polo con una denominación vacía
            pole.full_clean()
            pole.save()

    def test_creacion_polo_con_denominacion_longitud_mayor_de_cincuenta(self):
        """Prueba que no se puede crear un Polo con una denominación de más de 50 caracteres"""
        with self.assertRaises(DataError):
            # Se intenta crear un polo con una denominación de más de 50 caracteres
            Pole.objects.create(denomination=f"{generar_cadena_aleatoria}")

    def test_unicidad_denominacion(self):
        """Prueba que no se pueda crear un polo con una denominacion duplicada"""
        with self.assertRaises(ValidationError):
            # se intenta crear un polo con la misma denominación
            duplicated_pole = Pole(denomination="Industria Textil")  # Ya existe en pole
            # Verifica las restricciones del modelo antes de guardar
            duplicated_pole.full_clean()

    # 2.2 Pruebas de modificacion

    # 2.3 Pruebas de eliminacion

    def test_eliminar_polo_asociado_a_cliente(self):
        """Prueba que no se pueda eliminar un polo que tiene un cliente asociado debido a on_delete=PROTECT"""
        pole = Pole.objects.create(denomination="Textil")
        # se crea un cliente asociado a ese polo
        client = Client.objects.create(
            code="12345", name="LeoQc Corp", is_aei=False, pole=pole
        )
        # se intenta eliminar el polo, debería lanzar un error de protección
        with self.assertRaises(ProtectedError):
            # Intenta eliminar, se espera que el servidor responda con ProtectedError
            pole.delete()
