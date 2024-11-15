from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Extraplan, Objeto, DesgloseExtraplan
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class DesgloseExtraplanViewSetTest(APITestCase):

    def setUp(self):
        # Crear un usuario y un token de autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

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

        # Crear un desglose extraplan de prueba
        self.desglose_extraplan = DesgloseExtraplan.objects.create(
            extraplan=self.extraplan,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )

    def test_list_desglose_extraplan(self):
        """Prueba que se puede listar los desgloses extraplan"""
        url = reverse('desgloseextraplan-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_desglose_extraplan(self):
        """Prueba que se puede crear un desglose extraplan"""
        url = reverse('desgloseextraplan-list')
        data = {
            'extraplan': self.extraplan.id,
            'objeto': self.objeto.id,
            'importe_por_objeto': 400.00,
            'liquido': 150.00,
            'mediano_plazo': 150.00,
            'largo_plazo': 100.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DesgloseExtraplan.objects.count(), 2)

    def test_retrieve_desglose_extraplan(self):
        """Prueba que se puede obtener un desglose extraplan específico"""
        url = reverse('desgloseextraplan-detail', args=[self.desglose_extraplan.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['importe_por_objeto'], 300.00)

    def test_update_desglose_extraplan(self):
        """Prueba que se puede actualizar un desglose extraplan"""
        url = reverse('desgloseextraplan-detail', args=[self.desglose_extraplan.id])
        data = {
            'extraplan': self.extraplan.id,
            'objeto': self.objeto.id,
            'importe_por_objeto': 350.00,
            'liquido': 150.00,
            'mediano_plazo': 100.00,
            'largo_plazo': 100.00
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.desglose_extraplan.refresh_from_db()
        self.assertEqual(self.desglose_extraplan.importe_por_objeto, 350.00)

    def test_delete_desglose_extraplan(self):
        """Prueba que se puede eliminar un desglose extraplan"""
        url = reverse('desgloseextraplan-detail', args=[self.desglose_extraplan.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(DesgloseExtraplan.objects.count(), 0)