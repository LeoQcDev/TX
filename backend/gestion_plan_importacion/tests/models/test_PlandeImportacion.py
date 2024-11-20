from django.test import TestCase
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Objeto, DesglosePI

class PlanImportacionModelTest(TestCase):

    def setUp(self):
        # Crear un cliente de prueba
        self.cliente = Client.objects.create(
            name="Cliente Test",
            code="123456"
        )

    def test_creacion_plan_importacion(self):
        """Prueba que se puede crear un plan de importación correctamente"""
        plan_importacion = PlanImportacion.objects.create(
            cliente=self.cliente,
            fecha_emision=timezone.now(),
            importe_pi=1000.00,
            anio_pi=2024
        )
        self.assertEqual(plan_importacion.cliente.name, "Cliente Test")
        self.assertEqual(plan_importacion.importe_pi, 1000.00)
        self.assertEqual(plan_importacion.anio_pi, 2024)

    def test_actualizacion_importe_pi(self):
        """Prueba que el importe_pi se actualiza correctamente"""
        plan_importacion = PlanImportacion.objects.create(
            cliente=self.cliente,
            fecha_emision=timezone.now(),
            importe_pi=1000.00,
            anio_pi=2024
        )
        plan_importacion.importe_pi = 1500.00
        plan_importacion.save()
        self.assertEqual(plan_importacion.importe_pi, 1500.00)

    def test_str_method(self):
        """Prueba que el método __str__ retorna el formato correcto"""
        plan_importacion = PlanImportacion.objects.create(
            cliente=self.cliente,
            fecha_emision=timezone.now(),
            importe_pi=1000.00,
            anio_pi=2024
        )
        expected_str = f"Plan Importación {plan_importacion.codigo_pi} - {self.cliente.name}"
        self.assertEqual(str(plan_importacion), expected_str)

    def test_plan_importacion_objetos(self):
        """Prueba la relación muchos a muchos entre PlanImportacion y Objeto"""
        objeto1 = Objeto.objects.create(
            nombre="Objeto Test 1",
            descripcion="Descripción 1"
        )
        objeto2 = Objeto.objects.create(
            nombre="Objeto Test 2",
            descripcion="Descripción 2"
        )
        
        plan_importacion = PlanImportacion.objects.create(
            cliente=self.cliente,
            fecha_emision=timezone.now(),
            importe_pi=1000.00,
            anio_pi=2024
        )
        
        DesglosePI.objects.create(
            plan_importacion=plan_importacion,
            objeto=objeto1,
            importe_por_objeto=500.00,
            liquido=200.00,
            mediano_plazo=200.00,
            largo_plazo=100.00
        )
        
        DesglosePI.objects.create(
            plan_importacion=plan_importacion,
            objeto=objeto2,
            importe_por_objeto=500.00,
            liquido=200.00,
            mediano_plazo=200.00,
            largo_plazo=100.00
        )
        
        self.assertEqual(plan_importacion.objetos.count(), 2)