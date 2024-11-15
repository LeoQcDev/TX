from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Extraplan
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class ExtraplanViewSetTest(APITestCase):

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

    def test_list_extraplan(self):
        """Prueba que se puede listar los extraplanes"""
        url = reverse('extraplan-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_extraplan(self):
        """Prueba que se puede crear un extraplan"""
        url = reverse('extraplan-list')
        data = {
            'plan_importacion': self.plan_importacion.id,
            'fecha_emision': timezone.now(),
            'motivo': "Nuevo Motivo",
            'importe_extraplan': 600.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Extraplan.objects.count(), 2)

    def test_retrieve_extraplan(self):
        """Prueba que se puede obtener un extraplan específico"""
        url = reverse('extraplan-detail', args=[self.extraplan.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['motivo'], "Motivo Test")

    def test_update_extraplan(self):
        """Prueba que se puede actualizar un extraplan"""
        url = reverse('extraplan-detail', args=[self.extraplan.id])
        data = {
            'plan_importacion': self.plan_importacion.id,
            'fecha_emision': timezone.now(),
            'motivo': "Motivo Actualizado",
            'importe_extraplan': 700.00
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.extraplan.refresh_from_db()
        self.assertEqual(self.extraplan.motivo, "Motivo Actualizado")

    def test_delete_extraplan(self):
        """Prueba que se puede eliminar un extraplan"""
        url = reverse('extraplan-detail', args=[self.extraplan.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Extraplan.objects.count(), 0)