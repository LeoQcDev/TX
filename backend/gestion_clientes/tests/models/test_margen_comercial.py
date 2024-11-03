from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.models import ProtectedError
from gestion_clientes.models import Client, ComercialMargin, Pole


# Pruebas para el modelo Margen Comercial
class MargenComercialModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            'comercial_margin': 15.0
        }
        self.comercial_margin = ComercialMargin.objects.create(**self.valid_data)

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtencion

    def test_margen_str_devuelve_valor(self):
        self.assertEqual(str(self.comercial_margin), "15.0")

    # 1.2 Pruebas de creacion
    def test_margen_se_crea_con_datos_validos(self):
        nuevo_margen = ComercialMargin.objects.create(comercial_margin=20.0)
        self.assertTrue(ComercialMargin.objects.filter(id=nuevo_margen.id).exists())
        self.assertEqual(nuevo_margen.comercial_margin, 20.0)
        self.assertTrue(nuevo_margen.comercial_margin_status)

    def test_permite_margenes_duplicados(self):
        margen_duplicado = ComercialMargin.objects.create(
            comercial_margin=self.valid_data['comercial_margin']
        )
        self.assertTrue(ComercialMargin.objects.filter(id=margen_duplicado.id).exists())

    # 1.3 Pruebas de modificacion

    def test_validaciones_valor_margen(self):
        casos_invalidos = [
            (None, ValidationError, "valor nulo"),
            (0, ValidationError, "valor cero"),
            (-10, ValidationError, "valor negativo"),
            ("", (TypeError, ValidationError), "valor vacío"),
            (102, ValidationError, "valor mayor a 100")
        ]

        for valor, error_esperado, descripcion in casos_invalidos:
            with self.subTest(valor=valor, descripcion=descripcion):
                with self.assertRaises(error_esperado):
                    margen = ComercialMargin(comercial_margin=valor)
                    margen.full_clean()

    def test_actualizacion_margen(self):
        valores_validos = [1.0, 50.0, 100.0]
        
        for valor in valores_validos:
            with self.subTest(valor=valor):
                self.comercial_margin.comercial_margin = valor
                self.comercial_margin.full_clean()
                self.comercial_margin.save()
                
                margen_actualizado = ComercialMargin.objects.get(id=self.comercial_margin.id)
                self.assertEqual(margen_actualizado.comercial_margin, valor)

    # 1.4 Pruebas de eliminacion

    def test_eliminacion_margen_sin_clientes(self):
        margen = ComercialMargin.objects.create(comercial_margin=50.0)
        margen_id = margen.id
        margen.delete()
        
        self.assertFalse(ComercialMargin.objects.filter(id=margen_id).exists())

    def test_proteccion_eliminacion_con_clientes(self):
        pole = Pole.objects.create(denomination="Agrarios Cubanos")
        Client.objects.create(
            name="ETECSA",
            code="32542",
            pole=pole,
            comercial_margin=self.comercial_margin
        )
        
        with self.assertRaises(ProtectedError):
            self.comercial_margin.delete()
