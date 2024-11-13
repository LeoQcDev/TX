# Generated by Django 5.1.1 on 2024-11-13 19:22

import django.core.validators
import django.db.models.deletion
import django.utils.timezone
import gestion_plan_importacion.models
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestion_clientes', '0024_rename_comercialmargin_commercialmargin_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='GenericoProductoPI',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo_pi', models.IntegerField(unique=True)),
            ],
            options={
                'verbose_name': 'Genérico de Producto PI',
                'verbose_name_plural': 'Genéricos de Producto PI',
            },
        ),
        migrations.CreateModel(
            name='PlanImportacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo_pi', models.CharField(max_length=20, validators=[django.core.validators.RegexValidator(message='El código debe contener solo números', regex='^\\d+$')])),
                ('fecha_entrada_tecnotex', models.DateTimeField(default=django.utils.timezone.now, validators=[gestion_plan_importacion.models.validate_date_range_one_day])),
                ('importe_inicial', models.DecimalField(decimal_places=2, max_digits=10)),
                ('importe_actual', models.DecimalField(decimal_places=2, max_digits=10)),
                ('objeto', models.CharField(max_length=200)),
                ('estadistica', models.CharField(choices=[('CP', 'Corto Plazo'), ('MP', 'Mediano Plazo'), ('LP', 'Largo Plazo')], max_length=2)),
                ('fecha_emision', models.DateTimeField(default=django.utils.timezone.now, validators=[gestion_plan_importacion.models.validate_date_range_two_days])),
                ('anio_pi', models.IntegerField()),
                ('cliente', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to='gestion_clientes.client')),
            ],
            options={
                'verbose_name': 'Plan de Importación',
                'verbose_name_plural': 'Planes de Importación',
            },
        ),
        migrations.CreateModel(
            name='Extraplan',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('importe', models.DecimalField(decimal_places=2, max_digits=10)),
                ('motivo', models.TextField()),
                ('fecha_creacion', models.DateTimeField(auto_now_add=True)),
                ('plan_importacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='extraplanes', to='gestion_plan_importacion.planimportacion')),
            ],
        ),
    ]
