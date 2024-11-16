# Generated by Django 5.1.1 on 2024-11-16 20:09

import django.core.validators
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_plan_importacion', '0003_alter_planimportacion_cliente_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='planimportacion',
            name='anio_pi',
            field=models.PositiveSmallIntegerField(validators=[django.core.validators.MinValueValidator(2000), django.core.validators.MaxValueValidator(2100)]),
        ),
    ]
