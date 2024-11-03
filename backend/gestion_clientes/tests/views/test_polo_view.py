from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from gestion_clientes.models import Polo, Cliente


class PoloViewSetTests(APITestCase):
    def setUp(self):
        # Crear datos iniciales para los tests
        self.polo = Polo.objects.create(denominacion="Polo Test")
        self.cliente = Cliente.objects.create(
            nombre="Cliente Test", codigo="00001", polo=self.polo
        )
        self.polo_url = reverse(
            "polo-detail", args=[self.polo.id]
        )  # URL para un polo específico
        self.polo_list_url = reverse("polo-list")  # URL para crear/listar polos

    # Pruebas positivas

    def test_create_polo(self):
        """Prueba para la creacion correcta del polo"""
        # Datos para crear un nuevo polo
        data = {"denominacion": "Nuevo Polo"}

        # Hacer una solicitud POST para crear el polo
        response = self.client.post(self.polo_list_url, data, format="json")

        # Verificar que el polo fue creado correctamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["denominacion"], "Nuevo Polo")

    def test_list_polo(self):
        """Prueba para la obtencion correcta de los polos"""
        # Hacer una solicitud GET para listar polos
        response = self.client.get(self.polo_list_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data), 1
        )  # Debe haber un polo en la base de datos
        self.assertEqual(response.data[0]["denominacion"], self.polo.denominacion)

    def test_get_polo(self):
        """Prueba para la obtencion correcta de un polo"""
        # Hacer una solicitud GET para obtener un polo
        response = self.client.get(self.polo_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["denominacion"], self.polo.denominacion)

    def test_update_polo(self):
        """ " Prueba para actualizacion completa del polo"""
        # Datos para actualizar el polo
        data = {"denominacion": "Polo Actualizado"}

        # Hacer una solicitud PUT para actualizar el polo
        response = self.client.put(self.polo_url, data, format="json")

        # Verificar que el polo fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["denominacion"], "Polo Actualizado")

    def test_patch_polo(self):
        """Prueba para actualizacion parcial de los datos del polo"""
        # Datos parciales para actualizar el polo
        data = {"denominacion": "Polo Parcialmente Actualizado"}

        # Hacer una solicitud PATCH para actualizar el polo parcialmente
        response = self.client.patch(self.polo_url, data, format="json")

        # Verificar que el polo fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["denominacion"], "Polo Parcialmente Actualizado")

    def test_delete_polo_con_clientes(self):
        """Prueba para evitar la eliminación de un polo con clientes asociados"""
        # Hacer una solicitud DELETE para intentar eliminar el polo
        response = self.client.delete(self.polo_url)

        # Verificar que no se pueda eliminar el polo con clientes asociados
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No se puede eliminar un polo que esté asociado a uno o más clientes",
        )

    def test_delete_polo_sin_clientes(self):
        """Prueba para eliminar un polo sin clientes asociados"""
        # Eliminar el cliente asociado al polo antes de la prueba
        self.cliente.delete()

        # Hacer una solicitud DELETE para eliminar el polo
        response = self.client.delete(self.polo_url)

        # Verificar que el polo fue eliminado correctamente
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Polo.objects.filter(id=self.polo.id).exists())

    # Pruebas negativas

    def test_create_polo_invalid(self):
        """Intentar crear un polo con un nombre vacío o inválido"""
        data = {
            "nombre": "",  # El campo nombre no puede estar vacío
        }

        # Hacer una solicitud POST para crear el polo
        response = self.client.post(self.polo_list_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_polo_no_existente(self):
        """Intenta obtener un polo que no existe"""
        # URL para un polo que no existe
        url_no_existente = reverse(
            "polo-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud GET para obtener un polo que no existe
        response = self.client.get(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_polo_invalid(self):
        """Intentar actualizar un polo con un nombre inválido"""
        data = {
            "nombre": "",  # No se puede usar un nombre vacío
        }

        # Hacer una solicitud PUT para actualizar el polo
        response = self.client.put(self.polo_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_polo_no_existente(self):
        """Intenta eliminar un polo que no existe"""
        # URL para un polo que no existe
        url_no_existente = reverse(
            "polo-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud DELETE para un polo que no existe
        response = self.client.delete(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
