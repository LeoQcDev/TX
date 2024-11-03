# Generated by Django 5.1.1 on 2024-10-02 01:44

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion_clientes", "0020_alter_representante_telefono_representante"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cliente",
            name="codigo",
            field=models.CharField(
                db_index=True,
                max_length=25,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El código del cliente debe tener 5 dígitos",
                        regex="^\\d{5}",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="codigo_reeup",
            field=models.CharField(
                blank=True,
                max_length=25,
                null=True,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El código REEUP debe tener 6 dígitos", regex="^\\d{6}"
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="estado_cliente",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="nombre",
            field=models.CharField(db_index=True, max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="registro_mercantil",
            field=models.CharField(
                blank=True,
                max_length=25,
                null=True,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El código de registro mercantil debe tener 7 dígitos",
                        regex="^\\d{7}",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="contrato",
            name="estado_contrato",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name="contrato",
            name="numero_contrato",
            field=models.CharField(
                db_index=True,
                max_length=8,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El número de contrato debe tener el formato TX-ddddd",
                        regex="^TX-\\d{5}",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="margencomercial",
            name="estado_margen_comercial",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name="margencomercial",
            name="margen_comercial",
            field=models.FloatField(
                db_index=True,
                validators=[
                    django.core.validators.MinValueValidator(1),
                    django.core.validators.MaxValueValidator(100),
                ],
            ),
        ),
        migrations.AlterField(
            model_name="polo",
            name="denominacion",
            field=models.CharField(db_index=True, max_length=50, unique=True),
        ),
        migrations.AlterField(
            model_name="polo",
            name="estado_polo",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name="representante",
            name="apellidos",
            field=models.CharField(db_index=True, max_length=50),
        ),
        migrations.AlterField(
            model_name="representante",
            name="estado_representante",
            field=models.BooleanField(db_index=True, default=True),
        ),
        migrations.AlterField(
            model_name="representante",
            name="nombre",
            field=models.CharField(db_index=True, max_length=25),
        ),
    ]
