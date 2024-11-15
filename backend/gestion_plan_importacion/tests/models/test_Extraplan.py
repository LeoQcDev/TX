from django.test import TestCase
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Extraplan

class ExtraplanModelTest(TestCase):

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

    def test_creacion_extraplan(self):
        """Prueba que se puede crear un extraplan correctamente"""
        extraplan = Extraplan.objects.create(
            plan_importacion=self.plan_importacion,
            fecha_emision=timezone.now(),
            motivo="Motivo Test",
            importe_extraplan=500.00
        )
        self.assertEqual(extraplan.plan_importacion, self.plan_importacion)
        self.assertEqual(extraplan.motivo, "Motivo Test")
        self.assertEqual(extraplan.importe_extraplan, 500.00)

    def test_extraplan_str(self):
        """Prueba que el método __str__ retorna el formato correcto"""
        extraplan = Extraplan.objects.create(
            plan_importacion=self.plan_importacion,
            fecha_emision=timezone.now(),
            motivo="Motivo Test",
            importe_extraplan=500.00
        )
        expected_str = f"Extraplan {extraplan.codigo_extraplan} para {self.plan_importacion.codigo_pi}"
        self.assertEqual(str(extraplan), expected_str)