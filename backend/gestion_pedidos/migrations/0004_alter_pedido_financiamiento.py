# Generated by Django 5.1.1 on 2024-11-17 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('gestion_pedidos', '0003_remove_pedido_aprobacion_pedido_aprobaciones'),
    ]

    operations = [
        migrations.AlterField(
            model_name='pedido',
            name='financiamiento',
            field=models.FloatField(default=0, editable=False),
        ),
    ]
