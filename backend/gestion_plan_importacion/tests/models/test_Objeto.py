from django.test import TestCase
from gestion_plan_importacion.models import Objeto

class ObjetoModelTest(TestCase):

    def setUp(self):
        # Crear un objeto de prueba
        self.objeto = Objeto.objects.create(
            nombre="Objeto Test",
            descripcion="Descripción del objeto de prueba"
        )

    def test_objeto_creation(self):
        """Prueba que se puede crear un objeto correctamente"""
        self.assertEqual(self.objeto.nombre, "Objeto Test")
        self.assertEqual(self.objeto.descripcion, "Descripción del objeto de prueba")

    def test_objeto_str(self):
        """Prueba que el método __str__ retorna el formato correcto"""
        self.assertEqual(str(self.objeto), "Objeto Test")