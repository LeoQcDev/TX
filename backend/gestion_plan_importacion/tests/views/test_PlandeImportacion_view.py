from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class PlanImportacionViewSetTest(APITestCase):

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

    def test_list_plan_importacion(self):
        """Prueba que se puede listar los planes de importación"""
        url = reverse('planimportacion-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_plan_importacion(self):
        """Prueba que se puede crear un plan de importación"""
        url = reverse('planimportacion-list')
        data = {
            'cliente': self.cliente.id,
            'fecha_emision': timezone.now(),
            'importe_pi': 1500.00,
            'anio_pi': 2025
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PlanImportacion.objects.count(), 2)

    def test_retrieve_plan_importacion(self):
        """Prueba que se puede obtener un plan de importación específico"""
        url = reverse('planimportacion-detail', args=[self.plan_importacion.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['importe_pi'], 1000.00)

    def test_update_plan_importacion(self):
        """Prueba que se puede actualizar un plan de importación"""
        url = reverse('planimportacion-detail', args=[self.plan_importacion.id])
        data = {
            'cliente': self.cliente.id,
            'fecha_emision': timezone.now(),
            'importe_pi': 2000.00,
            'anio_pi': 2024
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.plan_importacion.refresh_from_db()
        self.assertEqual(self.plan_importacion.importe_pi, 2000.00)

    def test_delete_plan_importacion(self):
        """Prueba que se puede eliminar un plan de importación"""
        url = reverse('planimportacion-detail', args=[self.plan_importacion.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(PlanImportacion.objects.count(), 0)