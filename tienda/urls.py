from django.urls import path
from . import views

urlpatterns = [
    # Páginas principales
    path('', views.index_view, name='home'),
    path('index.html', views.index_view, name='index_html'),

    path('consejos-cuidado/', views.consejos_cuidado_view, name='consejos_cuidado'),
    path('consejos-cuidado.html', views.consejos_cuidado_view, name='consejos_cuidado_html'),

    path('guia-talle/', views.guia_talle_view, name='guia_talle'),
    path('guia-talle.html', views.guia_talle_view, name='guia_talle_html'),

    path('nuestra-historia/', views.nuestra_historia_view, name='nuestra_historia'),
    path('nuestra-historia.html', views.nuestra_historia_view, name='nuestra_historia_html'),

    path('politicas-devolucion/', views.politicas_devolucion_view, name='politicas_devolucion'),
    path('politicas-devolucion.html', views.politicas_devolucion_view, name='politicas_devolucion_html'),

    path('sobre-nosotros/', views.sobre_nosotros_view, name='sobre_nosotros'),
    path('sobre-nosotros.html', views.sobre_nosotros_view, name='sobre_nosotros_html'),

    # API endpoints
    path('api/productos/', views.api_productos, name='api_productos'),
    path('api/newsletter/', views.api_newsletter, name='api_newsletter'),
]
