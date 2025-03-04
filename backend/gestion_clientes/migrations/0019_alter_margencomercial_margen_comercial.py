# Generated by Django 5.1.1 on 2024-09-30 20:11

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion_clientes", "0018_alter_margencomercial_margen_comercial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="margencomercial",
            name="margen_comercial",
            field=models.FloatField(
                validators=[
                    django.core.validators.MinValueValidator(1),
                    django.core.validators.MaxValueValidator(100),
                ]
            ),
        ),
    ]
