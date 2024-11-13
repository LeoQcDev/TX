from django.test import TestCase
from django.core.exceptions import ValidationError
from django.db.models import ProtectedError
from gestion_clientes.models import Client, CommercialMargin, Pole


# Pruebas para el modelo Margen Comercial
class CommercialMarginModelTest(TestCase):

    def setUp(self):
        self.valid_data = {
            'commercial_margin': 15.0
        }
        self.commercial_margin = CommercialMargin.objects.create(**self.valid_data)

    # 1 Pruebas positivas

    # 1.1 Pruebas de obtencion

    def test_margen_str_devuelve_valor(self):
        self.assertEqual(str(self.commercial_margin), "15.0")

    # 1.2 Pruebas de creacion
    def test_margen_se_crea_con_datos_validos(self):
        nuevo_margen = CommercialMargin.objects.create(commercial_margin=20.0)
        self.assertTrue(CommercialMargin.objects.filter(id=nuevo_margen.id).exists())
        self.assertEqual(nuevo_margen.commercial_margin, 20.0)
        self.assertTrue(nuevo_margen.commercial_margin_status)

    def test_permite_margenes_duplicados(self):
        margen_duplicado = CommercialMargin.objects.create(
            commercial_margin=self.valid_data['commercial_margin']
        )
        self.assertTrue(CommercialMargin.objects.filter(id=margen_duplicado.id).exists())

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
                    margen = CommercialMargin(commercial_margin=valor)
                    margen.full_clean()

    def test_actualizacion_margen(self):
        valores_validos = [1.0, 50.0, 100.0]
        
        for valor in valores_validos:
            with self.subTest(valor=valor):
                self.commercial_margin.commercial_margin = valor
                self.commercial_margin.full_clean()
                self.commercial_margin.save()
                
                margen_actualizado = CommercialMargin.objects.get(id=self.commercial_margin.id)
                self.assertEqual(margen_actualizado.commercial_margin, valor)

    # 1.4 Pruebas de eliminacion

    def test_eliminacion_margen_sin_clientes(self):
        margen = CommercialMargin.objects.create(commercial_margin=50.0)
        margen_id = margen.id
        margen.delete()
        
        self.assertFalse(CommercialMargin.objects.filter(id=margen_id).exists())

    def test_proteccion_eliminacion_con_clientes(self):
        pole = Pole.objects.create(denomination="Agrarios Cubanos")
        Client.objects.create(
            name="ETECSA",
            code="32542",
            pole=pole,
            commercial_margin=self.commercial_margin
        )
        
        with self.assertRaises(ProtectedError):
            self.commercial_margin.delete()
