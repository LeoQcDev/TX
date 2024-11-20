from django.contrib import admin
from .models import Pedido,GenericoProducto,UnidadCompra,UnidadMedida,Producto,Posicion

class PedidoAdmin(admin.ModelAdmin):
    list_display = ('numero_711', 'cliente', 'financiamiento')

admin.site.register(Pedido, PedidoAdmin)
admin.site.register(UnidadCompra)
admin.site.register(GenericoProducto) 
admin.site.register(UnidadMedida)
admin.site.register(Producto)
admin.site.register(Posicion)