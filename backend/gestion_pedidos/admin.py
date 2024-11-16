from django.contrib import admin
from .models import Pedido,GenericoProducto,UnidadCompra,UnidadMedida,Producto,Posicion

admin.site.register(Pedido)
admin.site.register(UnidadCompra)
admin.site.register(GenericoProducto) 
admin.site.register(UnidadMedida)
admin.site.register(Producto)
admin.site.register(Posicion)