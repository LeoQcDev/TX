# Generated by Django 5.1.1 on 2024-09-26 15:45

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion_clientes", "0013_rename_correo_cliente_cliente_correo_cliente"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cliente",
            name="codigo_reeup",
            field=models.CharField(blank=True, max_length=25, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="correo_cliente",
            field=models.EmailField(blank=True, max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="entre_calle",
            field=models.CharField(
                blank=True, default="Cuba", max_length=50, null=True
            ),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="fax",
            field=models.CharField(
                blank=True,
                max_length=15,
                null=True,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El teléfono debe tener el formato +53 XXXXXXXX",
                        regex="^\\+53\\s\\d{8}$",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="registro_mercantil",
            field=models.CharField(blank=True, max_length=25, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="telefono",
            field=models.CharField(
                blank=True,
                max_length=15,
                null=True,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El teléfono debe tener el formato +53 XXXXXXXX",
                        regex="^\\+53\\s\\d{8}$",
                    )
                ],
            ),
        ),
        migrations.AlterField(
            model_name="cliente",
            name="web",
            field=models.URLField(blank=True, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="representante",
            name="correo_representante",
            field=models.EmailField(blank=True, max_length=100, null=True, unique=True),
        ),
        migrations.AlterField(
            model_name="representante",
            name="telefono_representante",
            field=models.CharField(
                blank=True,
                max_length=15,
                null=True,
                unique=True,
                validators=[
                    django.core.validators.RegexValidator(
                        message="El teléfono debe tener el formato +53 XXXXXXXX",
                        regex="^\\+53\\s\\d{8}$",
                    )
                ],
            ),
        ),
    ]
