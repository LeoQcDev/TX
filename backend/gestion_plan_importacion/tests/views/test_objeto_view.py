from rest_framework import status
from rest_framework.test import APITestCase
from django.urls import reverse
from gestion_plan_importacion.models import Objeto
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

class ObjetoViewSetTest(APITestCase):

    def setUp(self):
        # Crear un usuario y un token de autenticación
        self.user = User.objects.create_user(username='testuser', password='testpassword')
        self.token = Token.objects.create(user=self.user)
        self.client.credentials(HTTP_AUTHORIZATION='Token ' + self.token.key)

        # Crear un objeto de prueba
        self.objeto = Objeto.objects.create(
            nombre="Objeto Test",
            descripcion="Descripción del objeto de prueba"
        )

    def test_list_objeto(self):
        """Prueba que se puede listar los objetos"""
        url = reverse('objeto-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_create_objeto(self):
        """Prueba que se puede crear un objeto"""
        url = reverse('objeto-list')
        data = {
            'nombre': "Nuevo Objeto",
            'descripcion': "Descripción del nuevo objeto"
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Objeto.objects.count(), 2)

    def test_retrieve_objeto(self):
        """Prueba que se puede obtener un objeto específico"""
        url = reverse('objeto-detail', args=[self.objeto.id])
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['nombre'], "Objeto Test")

    def test_update_objeto(self):
        """Prueba que se puede actualizar un objeto"""
        url = reverse('objeto-detail', args=[self.objeto.id])
        data = {
            'nombre': "Objeto Actualizado",
            'descripcion': "Descripción actualizada del objeto"
        }
        response = self.client.put(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.objeto.refresh_from_db()
        self.assertEqual(self.objeto.nombre, "Objeto Actualizado")

    def test_delete_objeto(self):
        """Prueba que se puede eliminar un objeto"""
        url = reverse('objeto-detail', args=[self.objeto.id])
        response = self.client.delete(url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertEqual(Objeto.objects.count(), 0)