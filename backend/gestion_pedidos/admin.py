from django.contrib import admin
from .models import Pedido,GenericoProducto,UnidadCompra

admin.site.register(Pedido)
admin.site.register(UnidadCompra)
admin.site.register(GenericoProducto) 