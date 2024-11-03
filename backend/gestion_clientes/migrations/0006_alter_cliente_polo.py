# Generated by Django 5.1.1 on 2024-09-13 22:29

import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("gestion_clientes", "0005_cliente_polo"),
    ]

    operations = [
        migrations.AlterField(
            model_name="cliente",
            name="polo",
            field=models.ForeignKey(
                on_delete=django.db.models.deletion.PROTECT, to="gestion_clientes.polo"
            ),
        ),
    ]
