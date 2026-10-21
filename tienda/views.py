import json
from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from .models import Producto, Categoria, SuscripcionNewsletter


def index_view(request):
    return render(request, 'index.html')


def consejos_cuidado_view(request):
    return render(request, 'consejos-cuidado.html')


def guia_talle_view(request):
    return render(request, 'guia-talle.html')


def nuestra_historia_view(request):
    return render(request, 'nuestra-historia.html')


def politicas_devolucion_view(request):
    return render(request, 'politicas-devolucion.html')


def sobre_nosotros_view(request):
    return render(request, 'sobre-nosotros.html')


def api_productos(request):
    """
    Retorna la lista de productos en formato JSON idéntico a la API externa
    para que el frontend funcione directamente con la base de datos de Django.
    """
    categoria_filtro = request.GET.get('cat', None)
    search_filtro = request.GET.get('q', None)

    productos = Producto.objects.filter(activo=True)

    if categoria_filtro and categoria_filtro != 'all':
        productos = productos.filter(cat__iexact=categoria_filtro)

    if search_filtro:
        productos = productos.filter(nombre__icontains=search_filtro)

    data = [p.to_dict() for p in productos]
    return JsonResponse(data, safe=False)


@csrf_exempt
def api_newsletter(request):
    """
    Registra el email de un suscriptor en la base de datos PostgreSQL.
    """
    if request.method == 'POST':
        try:
            body = json.loads(request.body.decode('utf-8'))
            email = body.get('email', '').strip()
        except Exception:
            email = request.POST.get('email', '').strip()

        if email and '@' in email:
            sub, created = SuscripcionNewsletter.objects.get_or_create(email=email)
            return JsonResponse({'status': 'ok', 'message': '¡Gracias por suscribirte!'})
        return JsonResponse({'status': 'error', 'message': 'Email inválido'}, status=400)

    return JsonResponse({'status': 'error', 'message': 'Método no permitido'}, status=405)
