from django.db import models
from django.utils.text import slugify


class Categoria(models.Model):
    nombre = models.CharField(max_length=100, unique=True, verbose_name="Nombre de Categoría")
    slug = models.SlugField(max_length=100, unique=True, blank=True)

    class Meta:
        verbose_name = "Categoría"
        verbose_name_plural = "Categorías"
        ordering = ['nombre']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.nombre)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.nombre


class Producto(models.Model):
    BADGE_CHOICES = [
        ('', 'Sin etiqueta'),
        ('NEW IN', 'NEW IN'),
        ('30% OFF', '30% OFF'),
        ('MÁS VENDIDO', 'MÁS VENDIDO'),
        ('AGOTADO', 'AGOTADO'),
    ]

    id = models.IntegerField(primary_key=True, verbose_name="ID Producto")
    nombre = models.CharField(max_length=200, verbose_name="Nombre")
    cat = models.CharField(max_length=100, verbose_name="Nombre Categoría (Texto)", default="Remeras")
    categoria = models.ForeignKey(
        Categoria,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="productos",
        verbose_name="Categoría Relacionada"
    )
    precio = models.IntegerField(default=0, verbose_name="Precio ($)")
    precio_ant = models.IntegerField(default=0, blank=True, null=True, verbose_name="Precio Anterior ($)")
    badge = models.CharField(max_length=50, blank=True, null=True, verbose_name="Etiqueta / Badge")
    descripcion = models.TextField(blank=True, default='', verbose_name="Descripción")
    talles = models.CharField(
        max_length=150,
        default="S,M,L,XL",
        verbose_name="Talles",
        help_text="Separados por comas (ej: S,M,L,XL)"
    )
    colores = models.CharField(
        max_length=150,
        default="Único",
        verbose_name="Colores",
        help_text="Separados por comas (ej: Blanco,Negro,Verde)"
    )
    imagen1 = models.URLField(max_length=600, blank=True, verbose_name="Imagen Principal (URL)")
    imagen2 = models.URLField(max_length=600, blank=True, verbose_name="Imagen Secundaria / Hover (URL)")
    stock = models.IntegerField(default=0, verbose_name="Stock disponible")
    vendidos = models.IntegerField(default=0, verbose_name="Cantidad vendidos")
    activo = models.BooleanField(default=True, verbose_name="Activo en tienda")
    creado_el = models.DateTimeField(auto_now_add=True)
    actualizado_el = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = "Producto"
        verbose_name_plural = "Productos"
        ordering = ['id']

    def __str__(self):
        return f"#{self.id} {self.nombre} (${self.precio})"

    def to_dict(self):
        return {
            "id": self.id,
            "nombre": self.nombre,
            "cat": self.cat or (self.categoria.nombre if self.categoria else ""),
            "precio": self.precio,
            "precio_ant": self.precio_ant or 0,
            "badge": self.badge or "",
            "descripcion": self.descripcion,
            "talles": self.talles,
            "colores": self.colores,
            "imagen1": self.imagen1,
            "imagen2": self.imagen2,
            "stock": self.stock,
            "vendidos": self.vendidos,
        }


class SuscripcionNewsletter(models.Model):
    email = models.EmailField(unique=True, verbose_name="Email")
    fecha = models.DateTimeField(auto_now_add=True, verbose_name="Fecha de suscripción")

    class Meta:
        verbose_name = "Suscripción a Newsletter"
        verbose_name_plural = "Suscripciones a Newsletter"
        ordering = ['-fecha']

    def __str__(self):
        return self.email
