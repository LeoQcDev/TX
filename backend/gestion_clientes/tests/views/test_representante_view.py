from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from gestion_clientes.models import Representante, Cliente, Polo


class RepresentanteViewSetTests(APITestCase):
    def setUp(self):
        # Crear datos iniciales para los tests
        self.representante = Representante.objects.create(
            nombre="Representante Test", apellidos="Apellidos Test"
        )
        self.polo = Polo.objects.create(denominacion="Polo Test")
        self.cliente = Cliente.objects.create(
            nombre="Cliente Test",
            codigo="00001",
            polo=self.polo,
            representante=self.representante,
        )
        self.representante_url = reverse(
            "representante-detail", args=[self.representante.id]
        )  # URL para un representante específico
        self.representante_list_url = reverse(
            "representante-list"
        )  # URL para crear/listar representantes

    def test_create_representante(self):
        """Prueba para la creacion correcta de un representante"""
        # Datos para crear un nuevo representante
        data = {
            "nombre": "Nuevo Representante",
            "apellidos": "Nuevo Apellido",
            "correo_representante": "ejemplo1@uci.cu",
            "telefono_representante": "+53 12345678",
        }

        # Hacer una solicitud POST para crear el representante
        response = self.client.post(self.representante_list_url, data, format="json")

        # Verificar que el representante fue creado correctamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["nombre"], "Nuevo Representante")
        self.assertEqual(response.data["apellidos"], "Nuevo Apellido")

    def test_list_representante(self):
        """Prueba para la obtencion correcta de los representantes"""
        # Hacer una solicitud GET para listar representantes
        response = self.client.get(self.representante_list_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data), 1
        )  # Debe haber un representante en la base de datos
        self.assertEqual(response.data[0]["nombre"], self.representante.nombre)
        self.assertEqual(response.data[0]["apellidos"], self.representante.apellidos)

    def test_get_representante(self):
        """Prueba para la obtencion correcta de un polo"""
        # Hacer una solicitud GET para obtener un representante
        response = self.client.get(self.representante_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], self.representante.nombre)
        self.assertEqual(response.data["apellidos"], self.representante.apellidos)

    def test_update_representante(self):
        """Prueba para actualizacion completa de los datos del representante"""
        # Datos para actualizar el representante
        data = {
            "nombre": "Representante 1",
            "apellidos": "Apellidos Actualizado",
            "correo_representante": "actualizado@uci.cu",
            "telefono_representante": "+53 87654321",
        }

        # Hacer una solicitud PUT para actualizar el representante
        response = self.client.put(self.representante_url, data, format="json")

        # Verificar que el representante fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], "Representante 1")
        self.assertEqual(response.data["apellidos"], "Apellidos Actualizado")

    def test_patch_representante(self):
        """Prueba para actualizacion parcial de los datos del representante"""
        # Datos parciales para actualizar el representante
        data = {"nombre": "Rep Parcialmente Act"}

        # Hacer una solicitud PATCH para actualizar el representante parcialmente
        response = self.client.patch(self.representante_url, data, format="json")

        # Verificar que el representante fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], "Rep Parcialmente Act")

    def test_delete_representante_con_clientes(self):
        """Prueba para evitar la eliminación de un representante con clientes asociados."""
        # Hacer una solicitud DELETE para intentar eliminar el representante
        response = self.client.delete(self.representante_url)

        # Verificar que no se pueda eliminar el representante con clientes asociados
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No se puede eliminar un representante que esté asociado a uno o más clientes",
        )

    def test_delete_representante_sin_clientes(self):
        """Prueba para eliminar un representante sin clientes asociados."""
        # Eliminar el cliente asociado al representante antes de la prueba
        self.cliente.delete()

        # Hacer una solicitud DELETE para eliminar el representante
        response = self.client.delete(self.representante_url)

        # Verificar que el representante fue eliminado correctamente
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(
            Representante.objects.filter(id=self.representante.id).exists()
        )

    # Pruebas negativas

    def test_create_representante_invalid(self):
        """Intentar crear un contrato con un número de contrato que ya existe"""
        data = {
            "nombre": "",  # El campo nombre no puede estar vacío
        }

        # Hacer una solicitud POST para crear el representante
        response = self.client.post(self.representante_list_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_representante_no_existente(self):
        """Intenta obtener un contrato que no existe"""
        # URL para un representante que no existe
        url_no_existente = reverse(
            "representante-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud GET para obtener un representante que no existe
        response = self.client.get(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_representante_invalid(self):
        """Intentar actualizar un representante con un nombre inválido"""
        data = {
            "nombre": "",  # No se puede usar un nombre vacío
        }

        # Hacer una solicitud PUT para actualizar el representante
        response = self.client.put(self.representante_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_representante_no_existente(self):
        """Intenta eliminar un representante que no existe"""
        # URL para un representante que no existe
        url_no_existente = reverse(
            "representante-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud DELETE para un representante que no existe
        response = self.client.delete(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
