# 👗 AROMODA - Tienda Online

Tu tienda online ahora funciona con **Django** y base de datos **PostgreSQL en Docker**.

---

## 🚀 Cómo encender la página (2 pasos)

### 1. Iniciar la base de datos
Abre una terminal en esta carpeta y escribe:
```bash
docker compose up -d db
```

### 2. Iniciar la tienda
```bash
py manage.py runserver
```

¡Listo! Ya puedes ver la tienda en tu navegador:  
👉 **[http://localhost:8000](http://localhost:8000)**

---

## ⚙️ Panel para gestionar productos
Para cambiar precios, fotos, ofertas o agregar ropa nueva:  
👉 **[http://localhost:8000/admin](http://localhost:8000/admin)**

* **Usuario:** `admin`  
* **Contraseña:** `admin`  

---

## 🛑 Cómo apagar todo
En la terminal donde corre la tienda presiona `Ctrl + C`.  
Y para apagar la base de datos:
```bash
docker compose down
```

---

## 💡 Opción alternativa (1 solo comando con Docker)
Si prefieres encender todo en Docker de una sola vez:
```bash
docker compose up -d
```
Abre **[http://localhost:8000](http://localhost:8000)** y listo.

---

## 📦 Detalle de lo que incluye
* **Base de datos segura:** PostgreSQL en contenedor Docker.
* **45 productos precargados:** Tu catálogo completo ya está guardado en la base de datos.
* **Carrito y compras:** Conexión directa a WhatsApp para cerrar las ventas.
* **Diseño original intacto:** Mantiene todos tus estilos, animaciones y fotos.
