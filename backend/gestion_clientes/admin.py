from django.contrib import admin
from .models import Client, Contract, Representative, Pole, ComercialMargin

# Registra tus modelos aquí.

admin.site.register(Client)
admin.site.register(Contract)
admin.site.register(Representative)
admin.site.register(Pole)
admin.site.register(ComercialMargin)


admin.site.site_header = "Administración de TECNOTEX"  # Encabezado superior
admin.site.site_title = "Portal de Tecnotex"           # Título de la ventana del navegador
admin.site.index_title = "Panel de Gestión"            # Título en la página de inicio
