from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from gestion_clientes.models import Cliente, Polo, Contrato


class ClienteViewSetTests(APITestCase):
    def setUp(self):
        # Crear datos iniciales para los tests
        self.polo = Polo.objects.create(denominacion="Polo Test")
        self.contrato = Contrato.objects.create(numero_contrato="TX-12345")
        self.cliente = Cliente.objects.create(
            nombre="Cliente Test", codigo="00001", polo=self.polo
        )
        self.cliente_url = reverse(
            "cliente-detail", args=[self.cliente.id]
        )  # URL para un cliente específico
        self.cliente_list_url = reverse(
            "cliente-list"
        )  # URL para crear/listar clientes

    # Pruebas positivas

    def test_create_cliente(self):
        """Prueba para la creacion correcta del cliente"""
        # Datos para crear un nuevo cliente
        data = {
            "nombre": "Nuevo Cliente",
            "codigo": "00002",
            "polo": self.polo.id,  # Asignar Polo creado en el setUp
        }

        # Hacer una solicitud POST para crear el cliente
        response = self.client.post(self.cliente_list_url, data, format="json")

        # Verificar que el cliente fue creado correctamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["nombre"], "Nuevo Cliente")
        self.assertEqual(response.data["codigo"], "00002")

    def test_get_cliente(self):
        """Prueba para la obtencion correcta de un cliente"""
        # Hacer una solicitud GET para obtener un cliente
        response = self.client.get(self.cliente_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], self.cliente.nombre)
        self.assertEqual(response.data["codigo"], self.cliente.codigo)

    def test_update_cliente(self):
        """ " Prueba para actualizacion completa del cliente"""
        # Datos para actualizar el cliente
        data = {
            "nombre": "Cliente Actualizado",
            "codigo": "00003",
            "polo": self.polo.id,
        }

        # Hacer una solicitud PUT para actualizar el cliente
        response = self.client.put(self.cliente_url, data, format="json")

        # Verificar que el cliente fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], "Cliente Actualizado")
        self.assertEqual(response.data["codigo"], "00003")

    def test_patch_cliente(self):
        """Prueba para actualizacion parcial de los datos del cliente"""
        # Datos parciales para actualizar el cliente
        data = {
            "nombre": "Cliente Parcialmente Actualizado",
        }

        # Hacer una solicitud PATCH para actualizar el cliente parcialmente
        response = self.client.patch(self.cliente_url, data, format="json")

        # Verificar que el cliente fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["nombre"], "Cliente Parcialmente Actualizado")

    def test_delete_cliente_con_contrato(self):
        """Prueba para evitar la eliminación de un cliente con contrato asociado"""
        # Asignar un contrato al cliente antes de eliminarlo
        self.cliente.contrato = self.contrato
        self.cliente.save()

        # Hacer una solicitud DELETE para intentar eliminar el cliente
        response = self.client.delete(self.cliente_url)

        # Verificar que no se pueda eliminar el cliente con contrato asociado
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No se puede eliminar un cliente que tiene un contrato asociado",
        )

    def test_delete_cliente_sin_contrato(self):
        """Prueba para eliminar un contrato sin cliente asociado"""
        # Hacer una solicitud DELETE para eliminar un cliente sin contrato
        response = self.client.delete(self.cliente_url)

        # Verificar que el cliente fue eliminado correctamente
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(Cliente.objects.filter(id=self.cliente.id).exists())

    # Pruebas negativas

    def test_create_cliente_invalid(self):
        """Intentar crear un cliente con un nombre de empresa vacío o código duplicado"""
        data = {
            "nombre_empresa": "",  # El campo nombre de la empresa no puede estar vacío
            "codigo_cliente": "1234",  # Suponiendo que este código ya existe
        }

        # Hacer una solicitud POST para crear el cliente
        response = self.client.post(self.cliente_list_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_cliente_no_existente(self):
        """Intenta obtener un cliente que no existe"""
        # URL para un cliente que no existe
        url_no_existente = reverse(
            "cliente-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud GET para obtener un cliente que no existe
        response = self.client.get(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_cliente_invalid(self):
        """Intentar actualizar un cliente con un nombre de empresa inválido"""
        data = {
            "nombre_empresa": "",  # No se puede usar un nombre vacío
        }

        # Hacer una solicitud PUT para actualizar el cliente
        response = self.client.put(self.cliente_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_cliente_no_existente(self):
        """Intenta eliminar un cliente que no existe"""
        # URL para un cliente que no existe
        url_no_existente = reverse(
            "cliente-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud DELETE para un cliente que no existe
        response = self.client.delete(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
