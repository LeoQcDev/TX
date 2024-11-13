from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from django.utils import timezone
from gestion_clientes.models import Client
from gestion_plan_importacion.models import PlanImportacion, Objeto, DesglosePI
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class DesglosePIViewSetTest(APITestCase):

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

        # Crear un objeto de prueba
        self.objeto = Objeto.objects.create(
            nombre="Objeto Test",
            descripcion="Descripción del objeto de prueba"
        )

        # Crear un desglose PI de prueba
        self.desglose_pi = DesglosePI.objects.create(
            plan_importacion=self.plan_importacion,
            objeto=self.objeto,
            importe_por_objeto=300.00,
            liquido=100.00,
            mediano_plazo=100.00,
            largo_plazo=100.00
        )

    def test_list_desglose_pi(self):
        """Prueba que se puede listar los desgloses PI"""
        url = reverse('desglosepi-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_desglose_pi(self):
        """Prueba que se puede crear un desglose PI"""
        url = reverse('desglosepi-list')
        data = {
            'plan_importacion': self.plan_importacion.id,
            'objeto': self.objeto.id,
            'importe_por_objeto': 400.00,
            'liquido': 150.00,
            'mediano_plazo': 150.00,
            'largo_plazo': 100.00
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(DesglosePI.objects.count(), 2)

    def test_retrieve_desglose_pi(self):
        """Prueba que se puede obtener un desglose PI específico"""
        url = reverse('desglosepi-detail', args=[self.desglose_pi.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['importe_por_objeto'], 300.00)

    def test_update_desglose_pi(self):
        """Prueba que se puede actualizar un desglose PI"""
        url = reverse('desglosepi-detail', args=[self.desglose_pi.id])
        data = {
            'plan_importacion': self.plan_importacion.id,
            'objeto': self.objeto.id,
            'importe_por_objeto': 350.00,
            'liquido': 150.00,
            'mediano_plazo': 100.00,
            'largo_plazo': 100.00
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.desglose_pi.refresh_from_db()
        self.assertEqual(self.desglose_pi.importe_por_objeto, 350.00)

    def test_delete_desglose_pi(self):
        """Prueba que se puede eliminar un desglose PI"""
        url = reverse('desglosepi-detail', args=[self.desglose_pi.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(DesglosePI.objects.count(), 0)