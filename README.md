# 👗 Aromoda — Plataforma E-Commerce Full-Stack
### Trabajo Final Individual (TF)

---

## 📌 Encabezado Institucional

* **Proyecto:** Plataforma Web de Comercio Electrónico y Gestión de Catálogo — *Aromoda*
* **Tipo de Entrega:** Trabajo Final Individual (TF)
* **Autor / Alumno:** Gonzalo Bernal
* **Tecnologías Centrales:** Python, Django, PostgreSQL, Docker & Docker Compose, JavaScript (ES6+), HTML5 / CSS3
* **Año Académico:** 2026

---

## 📖 Descripción del Proyecto y Contexto

**Aromoda** es un emprendimiento de indumentaria femenina enfocado en el diseño contemporáneo y la moda urbana accesible. Históricamente, el negocio canalizaba sus ventas y consultas de forma manual a través de redes sociales y mensajería instantánea, lo que conllevaba dificultades recurrentes: catálogos desactualizados, pérdida de consultas por demoras en la atención, falta de visibilidad del stock real y fricciones al momento de consolidar los pedidos.

El presente proyecto final resuelve esta problemática mediante el diseño e implementación de una **plataforma web integral de comercio electrónico full-stack**. El sistema digitaliza la totalidad del catálogo de prendas, automatiza el cálculo de subtotales y promociones, permite una gestión ágil del inventario desde un panel administrativo robusto y optimiza la conversión comercial mediante un flujo de checkout con cierre asistido a través de la **API de WhatsApp**.

---

## ✨ Funcionalidades Principales

### 🛍️ Experiencia de Usuario (Storefront)
* **Catálogo Dinámico e Interactivo:** Presentación moderna de productos de temporada (Colección SS27) en modalidades de visualización tipo Carrusel y Grilla (*Grid*).
* **Filtrado por Categorías en Tiempo Real:** Barra de navegación dinámica que sincroniza automáticamente con las categorías registradas en la base de datos de Django (Buzos, Musculosas, Pantalones, Remeras, Shorts, etc.), sin necesidad de recargar la aplicación ni hardcodear etiquetas.
* **Buscador en Vivo:** Filtrado predictivo por nombre y descripción de prendas mientras el usuario escribe.
* **Ficha Técnica y Vista de Producto:** Vista detallada de cada prenda con selector de talles, colores, galería fotográfica interactiva (*zoom* y hover), cálculo estimado de cuotas bancarias y tabla interactiva de guía de talles.
* **Carrito de Compras Persistente:** *Drawer* lateral interactivo y vista de checkout con persistencia local (`localStorage`), control dinámico de cantidades, cálculo de envío gratuito por umbral de compra y aplicación de cupones de descuento.
* **Cierre de Pedidos vía WhatsApp:** Generación automatizada de un mensaje estructurado y codificado con el detalle de prendas, talles, colores, total liquidado y datos de envío, derivando al cliente de forma fluida a la línea oficial de ventas para concretar el cobro y entrega.
* **Club Aromoda (Fidelización):** Módulo de registro e inicio de sesión de clientas para acceder a un 10% de descuento de bienvenida en la primera compra, historial de compras y beneficios por fecha de cumpleaños.
* **Cotizador de Envíos:** Integración con la lógica tarifaria de Correo Argentino (*MiCorreo*) para calcular el costo de entrega a sucursal o domicilio en base al código postal y peso acumulado del pedido.
* **Asistente Virtual con IA:** Chat interactivo contextual de atención que asiste a las clientas respondiendo dudas sobre stock, combinaciones, cuidados y recomendaciones de estilo.

### ⚙️ Panel de Gestión y Control (Backend / Admin)
* **Gestión Integral de Catálogo:** Creación, modificación y baja de productos, control de stock disponible, precios promocionales y badges de destaque (`NEW IN`, `30% OFF`, `MÁS VENDIDO`, `AGOTADO`).
* **Categorización Dinámica:** Alta y baja de categorías con generación automática de *slugs* limpios (`django.utils.text.slugify`).
* **Sincronización Automática:** El modelo garantiza la consistencia bidireccional entre la relación relacional de clave foránea (`ForeignKey`) y el descriptor textual de categoría.
* **Gestión de Clientas y Métricas:** Visualización de suscriptoras al newsletter, perfiles registrados, pedidos históricos y exportación de bases de datos a planillas de cálculo (formato CSV/Excel con codificación UTF-8 BOM).

---

## 🏛️ Arquitectura y Stack Tecnológico

El proyecto fue concebido bajo un enfoque de desarrollo modular, limpio y desacoplado, priorizando la confiabilidad, la seguridad y la portabilidad:

```
┌────────────────────────────────────────────────────────┐
│                   CLIENTE / NAVEGADOR                  │
│       HTML5 Semántico · CSS3 Modular · JavaScript ES6+  │
└───────────────────────────▲────────────────────────────┘
                            │ HTTP / JSON API
┌───────────────────────────▼────────────────────────────┐
│              BACKEND / FRAMEWORK (DJANGO)              │
│       ORM · URLs · Vistas · Templates · Django Admin   │
└───────────────────────────▲────────────────────────────┘
                            │ SQL (PostgreSQL Driver)
┌───────────────────────────▼────────────────────────────┐
│              BASE DE DATOS (POSTGRESQL 16)             │
│            Contenedor Aislado con Healthchecks          │
└────────────────────────────────────────────────────────┘
```

| Capa / Componente | Tecnología | Justificación Técnica |
| :--- | :--- | :--- |
| **Backend** | **Python 3.12+ / Django 6.1** | Framework de alto nivel bajo arquitectura MVT/MVC. Provee ORM declarativo resistente a inyecciones SQL, sistema de autenticación robusto, validaciones de formularios y un panel de administración profesional listo para producción. |
| **Base de Datos** | **PostgreSQL 16 (Alpine)** | Motor relacional de grado empresarial, altamente confiable para garantizar integridad transaccional (ACID), claves foráneas e índices estructurados. *(Incluye fallback híbrido a SQLite para entornos de prueba ligeros).* |
| **Contenedorización** | **Docker & Docker Compose** | Aísla la aplicación y sus dependencias (servidor web y motor de base de datos) en contenedores reproducibles, garantizando que el sistema compile y ejecute exactamente igual en cualquier sistema operativo (Linux, macOS, Windows). |
| **Frontend** | **HTML5, CSS3, JS Vanilla** | Interfaz ligera, responsiva y sin sobrecarga de frameworks externos pesados. Uso intensivo de CSS Grid, Flexbox, variables personalizadas y delegación de eventos para una navegación instantánea. |
| **APIs / Endpoints** | **REST JSON Endpoints** | Endpoints propios (`/api/productos/`, `/api/categorias/`, `/api/newsletter/`, `/api/cotizar-envio/`) que desacoplan el consumo de datos de la lógica de renderizado. |

---

## 📂 Estructura del Repositorio

```text
aromoda-web/
├── aromoda_web/              # Configuración global del proyecto Django
│   ├── settings.py           # Variables de configuración, DB híbrida y middleware
│   ├── urls.py               # Enrutamiento principal de URLs
│   └── wsgi.py               # Punto de entrada para despliegue WSGI
├── tienda/                   # Aplicación principal de la tienda
│   ├── management/commands/  # Scripts de comandos personalizados (cargar catálogo inicial)
│   ├── migrations/           # Historial de migraciones del esquema de datos
│   ├── admin.py              # Configuración y personalización del panel de administración
│   ├── models.py             # Modelos relacionales: Categoria, Producto, Cliente, Pedido
│   ├── urls.py               # Rutas de vistas y endpoints REST de la tienda
│   └── views.py              # Controladores de negocio, filtros y APIs
├── templates/                # Plantillas HTML con motor de templates de Django
│   ├── index.html            # Página principal y catálogo dinámico
│   └── *.html                # Vistas institucionales complementarias
├── static/                   # Recursos estáticos servidos por la plataforma
│   ├── css/                  # Estilos visuales, temas y diseño responsivo
│   ├── js/                   # Controladores interactivos del cliente y carrito
│   └── script.js             # Lógica central del catálogo, filtros y checkout
├── products_seed.json        # Datos semilla con el catálogo inicial precargado (44 productos)
├── docker-compose.yml        # Orquestación de servicios (Django Web + PostgreSQL DB)
├── Dockerfile                # Receta de construcción del contenedor Python de la aplicación
├── requirements.txt          # Dependencias y librerías de Python
├── .env.example              # Archivo de plantilla para variables de entorno
└── README.md                 # Documentación técnica e institucional del proyecto
```

---

## 🚀 Guía de Instalación y Puesta en Marcha

Se ofrecen dos alternativas para ejecutar el proyecto. **Se recomienda enfáticamente el Método 1 (Docker)** para una evaluación rápida y sin necesidad de configurar entornos locales.

### Método 1: Ejecución con Docker y Docker Compose (Recomendado)

#### Prerrequisitos
* Tener instalado [Docker Desktop](https://www.docker.com/products/docker-desktop/) en ejecución.

#### 1. Clonar o posicionarse en el directorio del proyecto
```bash
cd aromoda-web
```

#### 2. Levantar los servicios y compilar la imagen
Ejecutar el siguiente comando para construir los contenedores, ejecutar las migraciones de base de datos y precargar el catálogo automáticamente:
```bash
docker compose up -d --build
```

#### 3. Crear el usuario Administrador (Superuser)
Para acceder al panel de control de Django, ejecutar dentro del contenedor:
```bash
docker compose exec web python manage.py createsuperuser
```
*(Ingresar nombre de usuario, correo electrónico y contraseña).*

#### 4. Acceso a la plataforma
Una vez levantados los contenedores:
* 🌐 **Tienda Virtual (Frontend):** [http://localhost:8000](http://localhost:8000)
* ⚙️ **Panel de Administración (Backend):** [http://localhost:8000/admin](http://localhost:8000/admin)

#### 5. Detener los servicios
Cuando se desee apagar los contenedores:
```bash
docker compose down
```
*(Para apagar y remover también los volúmenes de base de datos, utilizar `docker compose down -v`).*

---

### Método 2: Ejecución Local Directa con Python y Entorno Virtual

Si se prefiere evaluar sin Docker, el proyecto cuenta con soporte híbrido que utiliza **SQLite** de forma automática y transparente:

1. **Crear y activar un entorno virtual:**
   ```bash
   python -m venv .venv
   # En Windows (PowerShell):
   .\.venv\Scripts\Activate.ps1
   # En Linux / macOS:
   source .venv/bin/activate
   ```

2. **Instalar las dependencias:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Ejecutar las migraciones:**
   ```bash
   python manage.py migrate
   ```

4. **Cargar el catálogo semilla de productos:**
   ```bash
   python manage.py cargar_productos
   ```

5. **Iniciar el servidor de desarrollo:**
   ```bash
   python manage.py runserver
   ```
   Abrir en el navegador: **[http://localhost:8000](http://localhost:8000)**

---

## 🔑 Credenciales por Defecto del Entorno de Desarrollo

Para agilizar la corrección académica en entornos precargados:

* **Usuario Administrador:** `admin`
* **Contraseña:** `admin` *(o la generada mediante `createsuperuser`)*
* **URL de Acceso Administrativo:** `http://localhost:8000/admin`

---

## 🎓 Conclusiones del Trabajo Final

El desarrollo de la plataforma **Aromoda** consolida los conocimientos adquiridos en la carrera/materia, demostrando la capacidad de:
1. Diseñar un modelo de datos normalizado y escalable bajo el ORM de Django.
2. Construir una experiencia de usuario fluida y reactiva mediante JavaScript moderno sin dependencias innecesarias.
3. Integrar flujos de negocio reales con canales de alta conversión comercial (WhatsApp Checkout).
4. Implementar prácticas profesionales de DevOps y reproducibilidad mediante contenedores Docker.

---

*Desarrollado por **Gonzalo Bernal** — Trabajo Final Individual 2026.*
