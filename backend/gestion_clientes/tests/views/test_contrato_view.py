from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from gestion_clientes.models import Contrato, Cliente, Polo


class ContratoViewSetTests(APITestCase):
    def setUp(self):
        # Crear datos iniciales para los tests
        self.polo = Polo.objects.create(denominacion="Polo Test")
        self.contrato = Contrato.objects.create(
            numero_contrato="TX-12345", fecha_firma="2024-01-01", estado_contrato=True
        )
        self.contrato_2 = Contrato.objects.create(
            numero_contrato="TX-10101", fecha_firma="2024-01-01", estado_contrato=True
        )
        self.cliente = Cliente.objects.create(
            nombre="Cliente Test",
            codigo="00001",
            polo=self.polo,
            contrato=self.contrato,
        )
        self.contrato_url_detail = reverse(
            "contrato-detail", args=[self.contrato.id]
        )  # URL para un contrato específico
        self.contrato_url = reverse("contrato-list")  # URL para crear/listar contratos

    # Pruebas positivas

    def test_create_contrato(self):
        """Prueba para la creacion correcta del contrato"""
        # Datos para crear un nuevo contrato
        data = {
            "numero_contrato": "TX-54321",
            "fecha_firma": "2025-01-01",
            "estado_contrato": True,
        }

        # Hacer una solicitud POST para crear el contrato
        response = self.client.post(self.contrato_url, data, format="json")

        # Verificar que el contrato fue creado correctamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["numero_contrato"], "TX-54321")

    def test_get_contrato(self):
        """Prueba para la obtencion correcta de un contrato"""
        # Hacer una solicitud GET para obtener un contrato
        response = self.client.get(self.contrato_url_detail)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["numero_contrato"], self.contrato.numero_contrato
        )

    def test_update_contrato(self):
        """ " Prueba para actualizacion completa del contrato"""
        # Datos para actualizar el contrato
        data = {
            "numero_contrato": "TX-67890",
            "fecha_firma": "2026-01-01",
            "estado_contrato": False,
        }

        # Hacer una solicitud PUT para actualizar el contrato
        response = self.client.put(self.contrato_url_detail, data, format="json")

        # Verificar que el contrato fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["numero_contrato"], "TX-67890")

    def test_patch_contrato(self):
        """Prueba para actualizacion parcial de los datos del contrato"""
        # Datos parciales para actualizar el contrato
        data = {"estado_contrato": False}

        # Hacer una solicitud PATCH para actualizar el contrato parcialmente
        response = self.client.patch(self.contrato_url_detail, data, format="json")

        # Verificar que el contrato fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["estado_contrato"], False)

    def test_delete_contrato_con_cliente(self):
        """Prueba para evitar la eliminación de un contrato con cliente asociado"""
        # Hacer una solicitud DELETE para intentar eliminar el contrato
        response = self.client.delete(self.contrato_url_detail)

        # Verificar que no se pueda eliminar el contrato con cliente asociado
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No se puede eliminar un contrato que esté asociado a un cliente",
        )

    def test_delete_contrato_sin_cliente(self):
        """Prueba para eliminar un contrato sin cliente asociado"""
        # Eliminar relacion entre el contrato y el cliente asociado antes de la prueba
        self.cliente.contrato = None
        self.cliente.save()

        # Hacer una solicitud DELETE para eliminar un contrato sin cliente asociado
        response = self.client.delete(self.contrato_url_detail)

        # Verificar que el contrato fue eliminado correctamente
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Contrato.objects.filter(id=self.contrato.id).exists())

    # Pruebas negativas

    def test_create_contrato_invalid(self):
        """Intentar crear un contrato con un número de contrato que ya existe"""
        data = {
            "numero_contrato": "TX-12345",  # Este contrato ya existe
            "fecha_firma": "2025-01-01",
            "estado_contrato": True,
        }

        # Hacer una solicitud POST para crear el contrato
        response = self.client.post(self.contrato_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_contrato_no_existente(self):
        """Intenta obtener un contrato que no existe"""
        # URL para un contrato que no existe
        url_no_existente = reverse(
            "contrato-detail", args=[10999]
        )  # Suponiendo que 999 no existe

        # Hacer una solicitud GET para un contrato que no existe
        response = self.client.get(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_contrato_invalid(self):
        """Intentar actualizar el contrato con un número de contrato que ya existe"""
        data = {
            "numero_contrato": "TX-10101",  # Este número no puede ser usado si ya existe
            "fecha_firma": "2026-01-01",
            "estado_contrato": True,
        }

        # Hacer una solicitud PUT para actualizar el contrato
        response = self.client.put(self.contrato_url_detail, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_contrato_no_existente(self):
        """Intenta eliminar un contrato que no existe"""
        # URL para un contrato que no existe
        url_no_existente = reverse(
            "contrato-detail", args=[10999]
        )  # Suponiendo que 999 no existe

        # Hacer una solicitud DELETE para un contrato que no existe
        response = self.client.delete(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
