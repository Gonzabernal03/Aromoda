from django.contrib import admin
from .models import Categoria, Producto, SuscripcionNewsletter


@admin.register(Categoria)
class CategoriaAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'slug')
    search_fields = ('nombre',)
    prepopulated_fields = {'slug': ('nombre',)}


@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('id', 'nombre', 'cat', 'precio', 'precio_ant', 'stock', 'vendidos', 'badge', 'activo')
    list_editable = ('precio', 'precio_ant', 'stock', 'badge', 'activo')
    list_filter = ('cat', 'badge', 'activo')
    search_fields = ('nombre', 'descripcion', 'cat')
    ordering = ('id',)


@admin.register(SuscripcionNewsletter)
class SuscripcionNewsletterAdmin(admin.ModelAdmin):
    list_display = ('email', 'fecha')
    search_fields = ('email',)
    ordering = ('-fecha',)
