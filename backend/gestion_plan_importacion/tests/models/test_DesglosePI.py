from django.test import TestCase
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Objeto, DesglosePI

class DesglosePIModelTest(TestCase):

    def setUp(self):
        # Crear un cliente de prueba
        self.cliente = Client.objects.create(
            name="Cliente Test",
            code="123456"
        )

        # Crear un plan de importación de prueba
        self.plan_importacion = PlanImportacion.objects.create(
            cliente=self.cliente,
            fecha_emision=timezone.now(),
            importe_pi=1000.00,
            anio_pi=2024
        )

        # Crear un objeto de prueba
        self.objeto = Objeto.objects.create(
            nombre="Objeto Test",
            descripcion="Descripción del objeto de prueba"
        )

    def test_creacion_desglose_pi(self):
        """Prueba que se puede crear un desglose PI correctamente"""
        desglose_pi = DesglosePI.objects.create(
            plan_importacion=self.plan_importacion,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )
        self.assertEqual(desglose_pi.plan_importacion, self.plan_importacion)
        self.assertEqual(desglose_pi.objeto, self.objeto)
        self.assertEqual(desglose_pi.importe_por_objeto, 300.00)
        self.assertEqual(desglose_pi.liquido, 100.00)
        self.assertEqual(desglose_pi.mediano_plazo, 100.00)
        self.assertEqual(desglose_pi.largo_plazo, 100.00)
        self.assertEqual(desglose_pi.desglose_total, 300.00)

    def test_desglose_pi_str(self):
        """Prueba que el método __str__ retorna el formato correcto"""
        desglose_pi = DesglosePI.objects.create(
            plan_importacion=self.plan_importacion,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )
        expected_str = f"Desglose para {self.plan_importacion.codigo_pi} - {self.objeto.nombre}"
        self.assertEqual(str(desglose_pi), expected_str)