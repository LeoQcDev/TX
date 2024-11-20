from django.contrib import admin
from .models import PlanImportacion, Extraplan, Objeto, DesglosePI, DesgloseExtraplan

@admin.register(PlanImportacion)
class PlanImportacionAdmin(admin.ModelAdmin):
    list_display = ('codigo_pi', 'cliente', 'fecha_emision', 'importe_pi', 'anio_pi')
    search_fields = ('codigo_pi', 'cliente__name')
    list_filter = ('anio_pi', 'fecha_emision')
    ordering = ('-fecha_emision',)

@admin.register(Extraplan)
class ExtraplanAdmin(admin.ModelAdmin):
    list_display = ('codigo_extraplan', 'plan_importacion', 'fecha_emision', 'importe_extraplan')
    search_fields = ('codigo_extraplan', 'plan_importacion__codigo_pi')
    list_filter = ('fecha_emision',)
    ordering = ('-fecha_emision',)


@admin.register(Objeto)
class ObjetoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'descripcion')
    search_fields = ('nombre', 'descripcion')

@admin.register(DesglosePI)
class DesglosePIAdmin(admin.ModelAdmin):
    list_display = ('plan_importacion', 'objeto', 'importe_por_objeto', 'liquido', 'mediano_plazo', 'largo_plazo', 'desglose_total')
    search_fields = ('plan_importacion__codigo_pi', 'objeto__nombre')
    list_filter = ('plan_importacion',)

@admin.register(DesgloseExtraplan)
class DesgloseExtraplanAdmin(admin.ModelAdmin):
    list_display = ('extraplan', 'objeto', 'importe_por_objeto', 'liquido', 'mediano_plazo', 'largo_plazo', 'desglose_total')
    search_fields = ('extraplan__codigo_extraplan', 'objeto__nombre')
    list_filter = ('extraplan',)

# Personalización del sitio de administración
admin.site.site_header = "Administración de Planes de Importación"
admin.site.site_title = "Portal de Planes de Importación"
admin.site.index_title = "Panel de Gestión de Planes"