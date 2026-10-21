import os
import json
import urllib.request
from django.core.management.base import BaseCommand
from django.conf import settings
from tienda.models import Categoria, Producto

PRODUCTS_API_URL = 'https://script.google.com/macros/s/AKfycby5vd7lQwtP7Gk__p7YO-Pe8XS-IIR0G6FyvmMBexX7LBqaNIeEPWRd1ak_gAqdlakJ/exec'


class Command(BaseCommand):
    help = 'Carga los productos iniciales en la base de datos PostgreSQL desde products_seed.json o Google Sheets'

    def handle(self, *args, **options):
        seed_path = settings.BASE_DIR / 'products_seed.json'
        data = None

        if os.path.exists(seed_path):
            self.stdout.write(self.style.NOTICE(f'Leyendo productos desde {seed_path}...'))
            try:
                with open(seed_path, 'r', encoding='utf-8') as f:
                    data = json.load(f)
            except Exception as e:
                self.stdout.write(self.style.WARNING(f'Error leyendo archivo local: {e}'))

        if not data:
            self.stdout.write(self.style.NOTICE('Descargando catálogo desde Google Sheets API...'))
            try:
                req = urllib.request.Request(
                    PRODUCTS_API_URL,
                    headers={'User-Agent': 'Mozilla/5.0'}
                )
                with urllib.request.urlopen(req, timeout=10) as res:
                    data = json.loads(res.read().decode('utf-8'))
            except Exception as e:
                self.stdout.write(self.style.ERROR(f'No se pudo obtener datos: {e}'))
                return

        creados = 0
        actualizados = 0

        for item in data:
            cat_name = item.get('cat', 'Remeras').strip()
            categoria, _ = Categoria.objects.get_or_create(nombre=cat_name)

            prod, created = Producto.objects.update_or_create(
                id=int(item['id']),
                defaults={
                    'nombre': item.get('nombre', ''),
                    'cat': cat_name,
                    'categoria': categoria,
                    'precio': int(item.get('precio', 0) or 0),
                    'precio_ant': int(item.get('precio_ant', 0) or 0),
                    'badge': item.get('badge') or '',
                    'descripcion': item.get('descripcion') or '',
                    'talles': item.get('talles') or 'S,M,L,XL',
                    'colores': item.get('colores') or 'Único',
                    'imagen1': item.get('imagen1') or '',
                    'imagen2': item.get('imagen2') or '',
                    'stock': int(item.get('stock', 0) or 0),
                    'vendidos': int(item.get('vendidos', 0) or 0),
                    'activo': True,
                }
            )

            if created:
                creados += 1
            else:
                actualizados += 1

        self.stdout.write(
            self.style.SUCCESS(
                f'Listo! Productos procesados: {len(data)} (Creados: {creados}, Actualizados: {actualizados})'
            )
        )
