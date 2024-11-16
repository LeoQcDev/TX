from django.contrib import admin
from .models import PlanImportacion, Extraplan, GenericoProductoPI, Objeto, DesglosePI, DesgloseExtraplan

admin.site.register(PlanImportacion)
admin.site.register(Extraplan)
admin.site.register(GenericoProductoPI)
admin.site.register(Objeto)
admin.site.register(DesglosePI)
admin.site.register(DesgloseExtraplan)

