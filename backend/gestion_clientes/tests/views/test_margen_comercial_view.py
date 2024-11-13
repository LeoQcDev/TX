from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from gestion_clientes.models import CommercialMargin, Client, Pole


class CommercialMarginViewSetTests(APITestCase):
    def setUp(self):
        # Crear datos iniciales para los tests
        self.commercial_margin = CommercialMargin.objects.create(commercial_margin=15.5)
        self.pole = Pole.objects.create(denomination="Polo Test")
        self.client = Client.objects.create(
            nombre="Cliente Test",
            codigo="00001",
            pole=self.pole,
            commercial_margin=self.commercial_margin,
        )
        self.commercial_margin_url = reverse(
            "margencomercial-detail", args=[self.commercial_margin.id]
        )  # URL para un margen comercial específico
        self.commercial_margin_list_url = reverse(
            "margencomercial-list"
        )  # URL para crear/listar márgenes comerciales

    def test_create_margen_comercial(self):
        """Prueba para la creacion correcta del margen comercial"""
        # Datos para crear un nuevo margen comercial
        data = {"commercial_margin": 20.0}

        # Hacer una solicitud POST para crear el margen comercial
        response = self.client.post(self.commercial_margin_list_url, data, format="json")

        # Verificar que el margen comercial fue creado correctamente
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(response.data["commercial_margin"], 20.0)

    def test_list_margen_comercial(self):
        """Prueba para la obtencion correcta de los margenes"""
        # Hacer una solicitud GET para listar márgenes comerciales
        response = self.client.get(self.commercial_margin_list_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            len(response.data), 1
        )  # Debe haber un margen comercial en la base de datos
        self.assertEqual(
            response.data[0]["commercial_margin"], self.commercial_margin.commercial_margin
        )

    def test_get_margen_comercial(self):
        """Prueba para la obtencion correcta de margen comercial"""
        # Hacer una solicitud GET para obtener un margen comercial
        response = self.client.get(self.commercial_margin_url)

        # Verificar que la respuesta sea correcta
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(
            response.data["commercial_margin"], self.commercial_margin.commercial_margin
        )

    def test_update_margen_comercial(self):
        """ " Prueba para actualizacion completa del margen comercial"""
        # Datos para actualizar el margen comercial
        data = {"commercial_margin": 25.0}

        # Hacer una solicitud PUT para actualizar el margen comercial
        response = self.client.put(self.commercial_margin_url, data, format="json")

        # Verificar que el margen comercial fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["commercial_margin"], 25.0)

    def test_patch_margen_comercial(self):
        """Prueba para actualizacion parcial de los datos del margen comercial"""
        # Datos parciales para actualizar el margen comercial
        data = {"commercial_margin": 30.0}

        # Hacer una solicitud PATCH para actualizar el margen comercial parcialmente
        response = self.client.patch(self.commercial_margin_url, data, format="json")

        # Verificar que el margen comercial fue actualizado correctamente
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["commercial_margin"], 30.0)

    def test_delete_margen_comercial_con_clientes(self):
        """Prueba para evitar la eliminación de un margen comercial con clientes asociados."""
        # Hacer una solicitud DELETE para intentar eliminar el margen comercial
        response = self.client.delete(self.commercial_margin_url)

        # Verificar que no se pueda eliminar el margen comercial con clientes asociados
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(
            response.data["detail"],
            "No se puede eliminar un margen comercial que esté asociado a uno o más clientes",
        )

    def test_delete_margen_comercial_sin_clientes(self):
        """Prueba para eliminar un margen comercial sin clientes asociados."""
        # Eliminar el cliente asociado al margen comercial antes de la prueba
        self.cliente.delete()

        # Hacer una solicitud DELETE para eliminar el margen comercial
        response = self.client.delete(self.commercial_margin_url)

        # Verificar que el margen comercial fue eliminado correctamente
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
        self.assertFalse(
            CommercialMargin.objects.filter(id=self.commercial_margin.id).exists()
        )

    # Pruebas negativas

    def test_create_margen_comercial_invalid(self):
        """Intentar crear un margen comercial con un nombre vacío o inválido"""
        data = {
            "commercial_margin": None,  # El campo nombre no puede estar vacío
        }

        # Hacer una solicitud POST para crear el margen comercial
        response = self.client.post(self.commercial_margin_list_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_get_margen_comercial_no_existente(self):
        """Intenta obtener un margen comercial que no existe"""
        # URL para un margen comercial que no existe
        url_no_existente = reverse(
            "margencomercial-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud GET para obtener un margen comercial que no existe
        response = self.client.get(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)

    def test_update_margen_comercial_invalid(self):
        """Intentar actualizar un margen comercial con un nombre inválido"""
        data = {
            "commercial_margin": "",  # No se puede usar un nombre vacío
        }

        # Hacer una solicitud PUT para actualizar el margen comercial
        response = self.client.put(self.commercial_margin_url, data, format="json")

        # Verificar que se devuelve un error 400
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_delete_margen_comercial_no_existente(self):
        """Intenta eliminar un margen comercial que no existe"""
        # URL para un margen comercial que no existe
        url_no_existente = reverse(
                "margencomercial-detail", args=[999]
        )  # Suponiendo que el ID 999 no existe

        # Hacer una solicitud DELETE para un margen comercial que no existe
        response = self.client.delete(url_no_existente)

        # Verificar que se devuelve un error 404
        self.assertEqual(response.status_code, status.HTTP_404_NOT_FOUND)
