# Generated by Django 5.1.1 on 2024-11-17 03:18

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_aprobaciones', '0002_alter_aprobacion_options_and_more'),
        ('gestion_clientes', '0024_rename_comercialmargin_commercialmargin_and_more'),
        ('gestion_plan_importacion', '0004_alter_planimportacion_anio_pi'),
    ]

    operations = [
        migrations.AlterField(
            model_name='codigoaprobacion',
            name='objeto',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='gestion_plan_importacion.objeto'),
        ),
        migrations.AlterModelOptions(
            name='aprobacion',
            options={},
        ),
        migrations.AlterModelOptions(
            name='codigoaprobacion',
            options={},
        ),
        migrations.AlterModelOptions(
            name='tipofactura',
            options={},
        ),
        migrations.RenameField(
            model_name='codigoaprobacion',
            old_name='pedido',
            new_name='monto_pedido',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='aprobado',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='contratado',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='reservado_go',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='sin_contratar',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='sin_solicitar',
        ),
        migrations.RemoveField(
            model_name='aprobacion',
            name='solicitado',
        ),
        migrations.RemoveField(
            model_name='codigoaprobacion',
            name='sin_contratar',
        ),
        migrations.RemoveField(
            model_name='codigoaprobacion',
            name='sin_solicitar',
        ),
        migrations.AddField(
            model_name='aprobacion',
            name='aprobacion_status',
            field=models.BooleanField(default=True),
        ),
        migrations.AlterField(
            model_name='aprobacion',
            name='cliente',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='aprobaciones', to='gestion_clientes.client'),
        ),
        migrations.AlterField(
            model_name='aprobacion',
            name='codigos_aprobacion',
            field=models.ManyToManyField(related_name='aprobaciones', to='gestion_aprobaciones.codigoaprobacion'),
        ),
        migrations.AlterField(
            model_name='aprobacion',
            name='fecha_emision',
            field=models.DateTimeField(auto_now_add=True),
        ),
        migrations.AlterField(
            model_name='aprobacion',
            name='numero_aprobacion',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='aprobacion',
            name='numero_rs',
            field=models.FloatField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='casafinanciera',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='financiero',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.AlterField(
            model_name='tipofactura',
            name='name',
            field=models.CharField(max_length=100, unique=True),
        ),
        migrations.DeleteModel(
            name='Objeto',
        ),
    ]
