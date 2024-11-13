from django.test import TestCase
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Extraplan, Objeto, DesgloseExtraplan

class DesgloseExtraplanModelTest(TestCase):

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

        # Crear un extraplan de prueba
        self.extraplan = Extraplan.objects.create(
            plan_importacion=self.plan_importacion,
            fecha_emision=timezone.now(),
            motivo="Motivo Test",
            importe_extraplan=500.00
        )

        # Crear un objeto de prueba
        self.objeto = Objeto.objects.create(
            nombre="Objeto Test",
            descripcion="Descripción del objeto de prueba"
        )

    def test_creacion_desglose_extraplan(self):
        """Prueba que se puede crear un desglose extraplan correctamente"""
        desglose_extraplan = DesgloseExtraplan.objects.create(
            extraplan=self.extraplan,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )
        self.assertEqual(desglose_extraplan.extraplan, self.extraplan)
        self.assertEqual(desglose_extraplan.objeto, self.objeto)
        self.assertEqual(desglose_extraplan.importe_por_objeto, 300.00)
        self.assertEqual(desglose_extraplan.liquido, 100.00)
        self.assertEqual(desglose_extraplan.mediano_plazo, 100.00)
        self.assertEqual(desglose_extraplan.largo_plazo, 100.00)
        self.assertEqual(desglose_extraplan.desglose_total, 300.00)

    def test_desglose_extraplan_str(self):
        """Prueba que el método __str__ retorna el formato correcto"""
        desglose_extraplan = DesgloseExtraplan.objects.create(
            extraplan=self.extraplan,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )
        expected_str = f"Desglose para {self.extraplan.codigo_extraplan} - {self.objeto.nombre}"
        self.assertEqual(str(desglose_extraplan), expected_str)