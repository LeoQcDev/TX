# Generated by Django 5.1.1 on 2024-11-13 19:22

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('gestion_clientes', '0024_rename_comercialmargin_commercialmargin_and_more'),
        ('gestion_plan_importacion', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CasaFinanciera',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Financiero',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='Objeto',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='TipoFactura',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='CodigoAprobacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('codigo', models.CharField(max_length=100)),
                ('descripcion', models.CharField(max_length=255)),
                ('reservado_go', models.FloatField(default=0)),
                ('aprobado', models.FloatField(default=0)),
                ('pedido', models.FloatField(default=0)),
                ('sin_solicitar', models.FloatField(default=0)),
                ('contratado', models.FloatField(default=0)),
                ('sin_contratar', models.FloatField(default=0)),
                ('objeto', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_aprobaciones.objeto')),
            ],
        ),
        migrations.CreateModel(
            name='Aprobacion',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('numero_aprobacion', models.CharField(max_length=100)),
                ('numero_rs', models.IntegerField(blank=True, null=True)),
                ('fecha_emision', models.DateTimeField()),
                ('fecha_vencimiento', models.DateField()),
                ('aprobado', models.FloatField(default=0)),
                ('reservado_go', models.FloatField(default=0)),
                ('sin_solicitar', models.FloatField(default=0)),
                ('solicitado', models.FloatField(default=0)),
                ('contratado', models.FloatField(default=0)),
                ('sin_contratar', models.FloatField(default=0)),
                ('cliente', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_clientes.client')),
                ('plan_importacion', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_plan_importacion.planimportacion')),
                ('casa_financiera', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_aprobaciones.casafinanciera')),
                ('codigos_aprobacion', models.ManyToManyField(to='gestion_aprobaciones.codigoaprobacion')),
                ('financiero', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_aprobaciones.financiero')),
                ('tipo_factura', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_aprobaciones.tipofactura')),
            ],
        ),
    ]
