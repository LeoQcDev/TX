from django.contrib import admin
from .models import PlanImportacion, Extraplan, Objeto, DesglosePI, DesgloseExtraplan

admin.site.register(PlanImportacion)
admin.site.register(Extraplan)
admin.site.register(Objeto)
admin.site.register(DesglosePI)
admin.site.register(DesgloseExtraplan)

