# Generated by Django 5.1.1 on 2024-09-13 21:38

import django.core.validators
import django.db.models.deletion
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = []

    operations = [
        migrations.CreateModel(
            name="Contrato",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "numero_contrato",
                    models.CharField(
                        max_length=8,
                        unique=True,
                        validators=[
                            django.core.validators.RegexValidator(regex="^TX-\\d{5}")
                        ],
                    ),
                ),
                ("fecha_firma", models.DateField()),
            ],
        ),
        migrations.CreateModel(
            name="MargenComercial",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("cantidad", models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name="Polo",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("denominacion", models.CharField(max_length=50, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name="Representante",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("nombre", models.CharField(max_length=25)),
                ("apellidos", models.CharField(max_length=50)),
                ("correo_representante", models.EmailField(max_length=100)),
                (
                    "telefono_representante",
                    models.CharField(
                        max_length=15,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="El teléfono debe tener el formato +53 XXXX-XXXX o +53 XXXXXXXX",
                                regex="^\\+53\\s\\d{4}\\-\\d{4}$|^\\+53\\s\\d{8}$",
                            )
                        ],
                    ),
                ),
            ],
        ),
        migrations.CreateModel(
            name="Cliente",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                ("codigo", models.CharField(max_length=25, unique=True)),
                ("nombre", models.CharField(max_length=100, unique=True)),
                ("es_aei", models.BooleanField()),
                (
                    "codigo_reeup",
                    models.IntegerField(blank=True, null=True, unique=True),
                ),
                (
                    "codigo_nip",
                    models.CharField(
                        blank=True,
                        max_length=9,
                        null=True,
                        unique=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="El codigo NIP debe tener 9 dígitos",
                                regex="^\\d{9}",
                            )
                        ],
                    ),
                ),
                ("calle", models.CharField(blank=True, max_length=50, null=True)),
                ("entre_calle", models.CharField(blank=True, max_length=50, null=True)),
                ("pais", models.CharField(blank=True, max_length=50, null=True)),
                ("provincia", models.CharField(blank=True, max_length=50, null=True)),
                ("municipio", models.CharField(blank=True, max_length=50, null=True)),
                (
                    "codigo_postal",
                    models.CharField(blank=True, max_length=25, null=True),
                ),
                ("correo_Cliente", models.EmailField(max_length=100)),
                (
                    "registro_mercantil",
                    models.IntegerField(blank=True, null=True, unique=True),
                ),
                (
                    "telefono",
                    models.CharField(
                        blank=True,
                        max_length=15,
                        null=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="El teléfono debe tener el formato +53 XXXX-XXXX o +53 XXXXXXXX",
                                regex="^\\+53\\s\\d{4}\\-\\d{4}$|^\\+53\\s\\d{8}$",
                            )
                        ],
                    ),
                ),
                (
                    "fax",
                    models.CharField(
                        blank=True,
                        max_length=15,
                        null=True,
                        validators=[
                            django.core.validators.RegexValidator(
                                message="El teléfono debe tener el formato +53 XXXX-XXXX o +53 XXXXXXXX",
                                regex="^\\+53\\s\\d{4}\\-\\d{4}$|^\\+53\\s\\d{8}$",
                            )
                        ],
                    ),
                ),
                ("web", models.URLField(blank=True, null=True)),
                (
                    "contrato",
                    models.OneToOneField(
                        on_delete=django.db.models.deletion.PROTECT,
                        to="gestion_clientes.contrato",
                    ),
                ),
                (
                    "margen_comercial",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="gestion_clientes.margencomercial",
                    ),
                ),
                (
                    "polo",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="gestion_clientes.polo",
                    ),
                ),
                (
                    "representante",
                    models.ForeignKey(
                        blank=True,
                        null=True,
                        on_delete=django.db.models.deletion.PROTECT,
                        to="gestion_clientes.representante",
                    ),
                ),
            ],
        ),
    ]
