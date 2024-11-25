from django.test import TestCase

# Create your tests here.
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from django.utils import timezone
from .models import ProductGeneric, PurchaseUnit, Order
from gestion_clientes.models import Client
from gestion_clientes.models import Pole


class ProductGenericTests(APITestCase):
    def setUp(self):
        self.generico = ProductGeneric.objects.create(
            nombre="Test Generico",
            grupo="Test Grupo"
        )
        self.url = reverse('ProductGeneric-list')

    def test_crear_generico(self):
        """
        Prueba la creación de un genérico producto
        """
        data = {
            'nombre': 'Nuevo Generico',
            'grupo': 'Nuevo Grupo'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ProductGeneric.objects.count(), 2)

    def test_listar_genericos(self):
        """
        Prueba listar todos los genéricos productos
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class PurchaseUnitTests(APITestCase):
    def setUp(self):
        self.unidad = PurchaseUnit.objects.create(
            nombre_departamento="Test Departamento"
        )
        self.url = reverse('PurchaseUnit-list')

    def test_crear_unidad(self):
        """
        Prueba la creación de una unidad de compra
        """
        data = {
            'nombre_departamento': 'Nuevo Departamento'
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(PurchaseUnit.objects.count(), 2)

    def test_listar_unidades(self):
        """
        Prueba listar todas las unidades de compra
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)


class OrderTests(APITestCase):
    def setUp(self):
        # Primero creamos un Pole que es requerido para el Client
        self.pole = Pole.objects.create(
            denomination="Test Pole"  # Este es el campo correcto según el modelo
        )

        # Ahora creamos el cliente con todos los campos requeridos
        self.client_obj = Client.objects.create(
            code="TEST001",  # Requerido
            name="Test Cliente",  # Requerido
            pole=self.pole,  # Requerido
        )
        
        self.unidad_compra = PurchaseUnit.objects.create(
            nombre_departamento="Departamento Test"
        )
        
        self.generico_producto = ProductGeneric.objects.create(
            nombre="Producto Test",
            grupo="Grupo Test"
        )
        
        # Crear el Order de prueba
        self.Order = Order.objects.create(
            cliente=self.client_obj,
            unidad_compra=self.unidad_compra,
            generico_producto=self.generico_producto,
            numero_oc="123/OC",
            financiamiento="Test Financiamiento",
            presentador="Test Presentador",
            tipo_Order="Test Tipo"
        )
        self.url = reverse('Order-list')

    def test_crear_Order(self):
        """
        Prueba la creación de un Order
        """
        data = {
            'cliente_id': self.client_obj.id,
            'unidad_compra_id': self.unidad_compra.id,
            'generico_producto_id': self.generico_producto.id,
            'numero_oc': '124/OC',
            'financiamiento': 'Nuevo Financiamiento',
            'presentador': 'Nuevo Presentador',
            'tipo_Order': 'Nuevo Tipo',
            'fecha_entrada_tecnotex': timezone.now().isoformat(),
            'fecha_presentado': timezone.now().isoformat()
        }
        response = self.client.post(self.url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Order.objects.count(), 2)

    def test_listar_Orders(self):
        """
        Prueba listar todos los Orders
        """
        response = self.client.get(self.url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filtrar_Orders_por_cliente(self):
        """
        Prueba filtrar Orders por cliente
        """
        url = f"{self.url}?cliente={self.client_obj.id}"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)

    def test_filtrar_Orders_por_tipo(self):
        """
        Prueba filtrar Orders por tipo
        """
        url = f"{self.url}?tipo_Order=Test Tipo"
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data), 1)
