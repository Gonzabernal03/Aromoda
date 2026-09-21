/**
 * ==========================================================================
 * AROMODA - APP.JS
 * Catálogo editable de prendas, selección de talles y filtros dinámicos.
 * ==========================================================================
 * 
 * 💡 GUÍA RÁPIDA DE EDICIÓN PARA EL USUARIO:
 * --------------------------------------------------------------------------
 * Para modificar cualquier prenda, solo edita las propiedades en el arreglo `productos`:
 * 
 * 1. PRECIO:
 *    Cambia el número de `precio`. Ej: precio: 22000 (sin comas ni símbolos $).
 * 
 * 2. FOTO / IMAGEN:
 *    Pega tu enlace de Unsplash o la ruta local de tu carpeta. 
 *    Ej: imagen: "https://tudominio.com/foto.jpg" o imagen: "img/remera1.jpg".
 * 
 * 3. TALLES DISPONIBLES:
 *    Modifica la lista de talles entre corchetes.
 *    Ej: talles: ["S", "M", "L", "XL"] o para jeans talles: ["36", "38", "40", "42"].
 * 
 * 4. NOMBRE Y DESCRIPCIÓN:
 *    Edita el texto entre comillas de `nombre` y `descripcion`.
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CONFIGURACIÓN GENERAL (WHATSAPP, ENVIOS, API)
  // ==========================================================================
  const CONFIG = {
    // Tu número de WhatsApp de contacto (código de país + número sin '+' ni espacios)
    WHATSAPP_PHONE: '5491155556789',

    // Monto mínimo para bonificar el envío gratuito
    FREE_SHIPPING_THRESHOLD: 80000,

    // Opcional: URL de tu Google Sheets (Apps Script Web App)
    GOOGLE_SHEETS_API_URL: 'https://script.google.com/macros/s/AKfycbz_AROMODA_DEMO_API/exec'
  };

  // ==========================================================================
  // CATÁLOGO DE PRODUCTOS (INCLUYE 15 REMERAS + OTRAS CATEGORÍAS)
  // ==========================================================================
  const productos = [

    // ------------------------------------------------------------------------
    // SECCIÓN: REMERAS (15 MODELOS COMPLETOS)
    // ------------------------------------------------------------------------
    {
      id: 1,
      nombre: "Remera Oversize Lino Crudo",
      categoria: "remeras",
      precio: 19800,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80",
      descripcion: "Remera de corte oversize holgado confeccionada en mezcla de lino natural y algodón peinado."
    },
    {
      id: 2,
      nombre: "Remera Pima Cotton Blanca",
      categoria: "remeras",
      precio: 17500,
      talles: ["XS", "S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80",
      descripcion: "Básico esencial en 100% algodón pima de tacto sedoso y cuello redondo con refuerzo."
    },
    {
      id: 3,
      nombre: "Remera Boxy Washed Black",
      categoria: "remeras",
      precio: 18900,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      descripcion: "Corte boxy cuadrado contemporáneo con proceso de lavado mineral negro vintage."
    },
    {
      id: 4,
      nombre: "Remera Ribb Escote Redondo Camel",
      categoria: "remeras",
      precio: 16400,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80",
      descripcion: "Tejido acanalado fino de gran elasticidad en tono cálido camel, ideal para combinar con sastrería."
    },
    {
      id: 5,
      nombre: "Remera Graphic Studio Aromoda",
      categoria: "remeras",
      precio: 21000,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=600&q=80",
      descripcion: "Estampa tipográfica minimalista en serigrafía al agua sobre algodón 24/1 prémium."
    },
    {
      id: 6,
      nombre: "Remera Escote V Lino Beige",
      categoria: "remeras",
      precio: 18500,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80",
      descripcion: "Diseño fresco con escote en V refinado y terminaciones al corte sutil."
    },
    {
      id: 7,
      nombre: "Remera Crop Manga Caída White",
      categoria: "remeras",
      precio: 16900,
      talles: ["XS", "S", "M"],
      imagen: "https://images.unsplash.com/photo-1554568218-0f1715e72254?auto=format&fit=crop&w=600&q=80",
      descripcion: "Largo crop a la cintura con hombros caídos de estética juvenil y relajada."
    },
    {
      id: 8,
      nombre: "Remera Rayada Marinera Breton",
      categoria: "remeras",
      precio: 20500,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1527719327859-c6ce80353573?auto=format&fit=crop&w=600&q=80",
      descripcion: "Inspiración náutica francesa con rayas azul marino sobre base blanco óptico."
    },
    {
      id: 9,
      nombre: "Remera Muscle Tee Hombreras Noir",
      categoria: "remeras",
      precio: 19200,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      descripcion: "Muscle tee sin mangas con hombreras estructuradas que realzan la postura y el porte."
    },
    {
      id: 10,
      nombre: "Remera Oversize Terracota Warm",
      categoria: "remeras",
      precio: 18800,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1562157873-818bc0726f68?auto=format&fit=crop&w=600&q=80",
      descripcion: "Tono tierra cálido teñido en prenda, textura suave y caída ultra confortable."
    },
    {
      id: 11,
      nombre: "Remera Manga Larga Pima Blanca",
      categoria: "remeras",
      precio: 22000,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?auto=format&fit=crop&w=600&q=80",
      descripcion: "Prenda de entretiempo en algodón pima puro con puños reforzados."
    },
    {
      id: 12,
      nombre: "Remera Slim Fit Gris Melange",
      categoria: "remeras",
      precio: 17200,
      talles: ["XS", "S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?auto=format&fit=crop&w=600&q=80",
      descripcion: "Calce al cuerpo confeccionada en jersey con elastano para máxima adaptabilidad."
    },
    {
      id: 13,
      nombre: "Remera Cuello Mock Neck Noir",
      categoria: "remeras",
      precio: 21500,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80",
      descripcion: "Medio cuello mock levantado para un estilo sobrio y elegante de pasarela."
    },
    {
      id: 14,
      nombre: "Remera Tie-Dye Soft Rose",
      categoria: "remeras",
      precio: 22800,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?auto=format&fit=crop&w=600&q=80",
      descripcion: "Teñido artesanal con degradado suave en tonos pastel y algodón orgánico."
    },
    {
      id: 15,
      nombre: "Remera Heavy Cotton Olive Green",
      categoria: "remeras",
      precio: 23500,
      talles: ["S", "M", "L", "XL"],
      imagen: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      descripcion: "Algodón pesado de 240g con estructura firme, costuras dobles y tono verde oliva militar."
    },

    // ------------------------------------------------------------------------
    // SECCIÓN: JEANS
    // ------------------------------------------------------------------------
    {
      id: 16,
      nombre: "Jean Wide Leg Vintage Blue",
      categoria: "jeans",
      precio: 39500,
      talles: ["36", "38", "40", "42", "44"],
      imagen: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      descripcion: "Tiro alto con pierna ancha estilo años 90 en denim rígido 100% algodón."
    },
    {
      id: 17,
      nombre: "Jean Mom Fit Celeste Lavado",
      categoria: "jeans",
      precio: 36000,
      talles: ["36", "38", "40", "42"],
      imagen: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80",
      descripcion: "Corte clásico Mom fit que estiliza la cintura y caderas con lavado claro."
    },
    {
      id: 18,
      nombre: "Jean Straight Denim Noir",
      categoria: "jeans",
      precio: 38500,
      talles: ["36", "38", "40", "42"],
      imagen: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80",
      descripcion: "Corte recto en denim negro profundo que no destiñe con el uso diario."
    },

    // ------------------------------------------------------------------------
    // SECCIÓN: SHORTS
    // ------------------------------------------------------------------------
    {
      id: 19,
      nombre: "Short Sastrero Crepe Noir",
      categoria: "shorts",
      precio: 26500,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80",
      descripcion: "Short tiro alto con pinzas delanteras y caída impecable en crepé sastrero."
    },
    {
      id: 20,
      nombre: "Short Denim Ripped Clásico",
      categoria: "shorts",
      precio: 24900,
      talles: ["36", "38", "40", "42"],
      imagen: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80",
      descripcion: "Short de jean clásico con roturas artesanales y dobladillo deshilachado."
    },

    // ------------------------------------------------------------------------
    // SECCIÓN: TOPS
    // ------------------------------------------------------------------------
    {
      id: 21,
      nombre: "Top Halter Ribb Minimal",
      categoria: "tops",
      precio: 15200,
      talles: ["XS", "S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80",
      descripcion: "Escote halter favorecedor en tejido ribb elástico de algodón suave."
    },
    {
      id: 22,
      nombre: "Top Satén Nude Elegance",
      categoria: "tops",
      precio: 21000,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80",
      descripcion: "Top lencero con breteles finos regulables en satén con brillo sutil."
    },

    // ------------------------------------------------------------------------
    // SECCIÓN: ABRIGOS
    // ------------------------------------------------------------------------
    {
      id: 23,
      nombre: "Tapado Trench Camel Sastrería",
      categoria: "abrigos",
      precio: 68900,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80",
      descripcion: "Trench clásico cruzado con cinto ajustable y forrería completa en seda."
    },

    // ------------------------------------------------------------------------
    // SECCIÓN: VESTIDOS
    // ------------------------------------------------------------------------
    {
      id: 24,
      nombre: "Vestido Midi Lino Botellón",
      categoria: "vestidos",
      precio: 44200,
      talles: ["S", "M", "L"],
      imagen: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80",
      descripcion: "Vestido midi confeccionado en lino puro con botones delanteros de carey."
    }
  ];

  // ==========================================================================
  // ESTADO LOCAL
  // ==========================================================================
  let cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');
  let currentCategory = 'todos';
  let searchQuery = '';
  let isCheckoutStep = false;

  // Guarda el talle seleccionado por cada tarjeta { [productoId]: "M" }
  const selectedSizes = {};
  productos.forEach(p => {
    selectedSizes[p.id] = p.talles[0]; // Por defecto se preselecciona el primer talle disponible
  });

  // ==========================================================================
  // ELEMENTOS DEL DOM
  // ==========================================================================
  const productsGrid = document.getElementById('products-grid');
  const filterStatusText = document.getElementById('filter-status-text');

  // Header & Búsqueda
  const searchInput = document.getElementById('search-input');
  const searchDropdownBar = document.getElementById('search-dropdown-bar');
  const btnToggleSearch = document.getElementById('btn-toggle-search');
  const btnCloseSearch = document.getElementById('btn-close-search');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const headerNavLeft = document.getElementById('header-nav-left');

  // Drawer Carrito
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartFooter = document.getElementById('cart-footer');
  const cartCounter = document.getElementById('cart-counter');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const btnCheckout = document.getElementById('btn-checkout');
  const btnContinueShopping = document.getElementById('btn-continue-shopping');
  const freeShippingText = document.getElementById('free-shipping-text');
  const shippingProgressFill = document.getElementById('shipping-progress-fill');

  // Modal Registro
  const btnOpenRegister = document.getElementById('btn-open-register');
  const btnCloseRegister = document.getElementById('btn-close-register');
  const registerModalOverlay = document.getElementById('register-modal-overlay');
  const registerForm = document.getElementById('register-form');

  // Newsletter y Correo Argentino
  const newsletterForm = document.getElementById('newsletter-form');
  const trackingForm = document.getElementById('tracking-form');
  const trackingCodeInput = document.getElementById('tracking-code');

  // Formateador de moneda en pesos argentinos
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ==========================================================================
  // 1. RENDERIZADO DEL CATÁLOGO CON TALLES INTERACTIVOS Y FILTRO DINÁMICO
  // ==========================================================================
  const renderCatalog = () => {
    if (!productsGrid) return;

    // Filtro por categoría y por búsqueda en tiempo real
    const filtered = productos.filter(product => {
      const matchesCategory = currentCategory === 'todos' || product.categoria.toLowerCase() === currentCategory.toLowerCase();
      const matchesSearch = product.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.categoria.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.descripcion.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    // Actualización de texto de estado
    if (filterStatusText) {
      if (searchQuery.trim() !== '') {
        filterStatusText.textContent = `Resultados para "${searchQuery}" (${filtered.length} prendas)`;
      } else if (currentCategory === 'todos') {
        filterStatusText.textContent = `Mostrando todas las prendas (${filtered.length})`;
      } else {
        filterStatusText.textContent = `Prendas en categoría ${currentCategory.toUpperCase()} (${filtered.length})`;
      }
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 0.85rem; color: #888; text-transform: uppercase; letter-spacing: 1.5px; margin-bottom: 16px;">
            No se encontraron prendas en esta categoría.
          </p>
          <button id="btn-reset-filters" class="btn-secondary">Ver todas las prendas</button>
        </div>
      `;
      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        setCategory('todos');
        searchQuery = '';
        if (searchInput) searchInput.value = '';
      });
      return;
    }

    productsGrid.innerHTML = filtered.map(product => {
      const currentSelectedSize = selectedSizes[product.id] || product.talles[0];

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-img-wrapper">
            <img 
              src="${product.imagen}" 
              alt="${product.nombre}" 
              class="product-img" 
              loading="lazy"
            >
            <button class="btn-add-to-cart" data-id="${product.id}" aria-label="Agregar ${product.nombre} al carrito">
              + Agregar al Carrito
            </button>
          </div>
          
          <div class="product-info">
            <span class="product-category">${product.categoria}</span>
            <h3 class="product-title">${product.nombre}</h3>
            
            <div class="product-price-box">
              <span class="product-price">${formatPrice(product.precio)}</span>
              <span class="product-installments">3 cuotas sin interés</span>
            </div>

            <!-- Selector de Talles en la Tarjeta -->
            <div class="product-sizes-wrap">
              <span class="sizes-label">Talle: <strong id="selected-size-label-${product.id}">${currentSelectedSize}</strong></span>
              <div class="sizes-list" role="group" aria-label="Talles disponibles">
                ${product.talles.map(talle => `
                  <button 
                    type="button"
                    class="talle-btn ${talle === currentSelectedSize ? 'active' : ''}" 
                    data-product-id="${product.id}" 
                    data-talle="${talle}"
                    aria-label="Seleccionar talle ${talle}"
                  >
                    ${talle}
                  </button>
                `).join('')}
              </div>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Listener para cambiar el talle seleccionado en la tarjeta
    productsGrid.querySelectorAll('.talle-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = parseInt(btn.dataset.productId, 10);
        const talle = btn.dataset.talle;

        selectedSizes[pId] = talle;

        // Actualizar visualmente la etiqueta del talle
        const label = document.getElementById(`selected-size-label-${pId}`);
        if (label) label.textContent = talle;

        // Cambiar la clase activa entre los botones de talle de esta tarjeta
        const parentList = btn.parentElement;
        if (parentList) {
          parentList.querySelectorAll('.talle-btn').forEach(b => b.classList.remove('active'));
          btn.classList.add('active');
        }
      });
    });

    // Listener para agregar producto con el talle seleccionado al carrito
    productsGrid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        e.stopPropagation();
        const pId = parseInt(btn.dataset.id, 10);
        addToCart(pId);
      });
    });
  };

  // ==========================================================================
  // 2. FILTRO POR CATEGORÍAS
  // ==========================================================================
  const setCategory = (category) => {
    currentCategory = category.toLowerCase();

    // Sincronizar todos los botones de categoría (tanto en navbar como en la barra del catálogo)
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category.toLowerCase() === currentCategory);
    });

    renderCatalog();
  };

  // Botones de filtro del catálogo
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.category;
      setCategory(cat);

      // Si el menú móvil estaba abierto, lo cerramos
      if (headerNavLeft && headerNavLeft.classList.contains('mobile-open')) {
        headerNavLeft.classList.remove('mobile-open');
      }

      // Scroll suave hacia el catálogo
      const dest = document.getElementById('catalogo');
      if (dest) {
        dest.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Tarjetas visuales de "SHOP BY CATEGORY"
  document.querySelectorAll('.category-card').forEach(card => {
    const handleCategoryClick = () => {
      const cat = card.dataset.category;
      if (cat) {
        setCategory(cat);
        const dest = document.getElementById('catalogo');
        if (dest) {
          dest.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    card.addEventListener('click', handleCategoryClick);
    card.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        handleCategoryClick();
      }
    });
  });

  // ==========================================================================
  // 3. CARRITO LATERAL (SLIDE-OUT DRAWER)
  // ==========================================================================
  const openCart = () => {
    cartDrawer?.classList.add('active');
    cartDrawerOverlay?.classList.add('active');
    cartDrawer?.setAttribute('aria-hidden', 'false');
    cartDrawerOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer?.classList.remove('active');
    cartDrawerOverlay?.classList.remove('active');
    cartDrawer?.setAttribute('aria-hidden', 'true');
    cartDrawerOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    setTimeout(() => {
      isCheckoutStep = false;
      updateCartUI();
    }, 300);
  };

  const saveCart = () => {
    localStorage.setItem('aromoda_cart', JSON.stringify(cart));
    updateCartUI();
  };

  const addToCart = (productId) => {
    const product = productos.find(p => p.id === productId);
    if (!product) return;

    // Talle seleccionado por el cliente en la tarjeta
    const talleSeleccionado = selectedSizes[productId] || product.talles[0];

    // Buscar si ya existe el producto con ese mismo talle en el carrito
    const existing = cart.find(item => item.id === productId && item.talle === talleSeleccionado);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        nombre: product.nombre,
        precio: product.precio,
        imagen: product.imagen,
        categoria: product.categoria,
        talle: talleSeleccionado,
        quantity: 1
      });
    }

    saveCart();
    openCart(); // Despliega el panel lateral suavemente
  };

  const changeQuantity = (index, delta) => {
    if (!cart[index]) return;
    cart[index].quantity += delta;
    if (cart[index].quantity <= 0) {
      cart.splice(index, 1);
    }
    saveCart();
  };

  const removeFromCart = (index) => {
    if (!cart[index]) return;
    cart.splice(index, 1);
    saveCart();
  };

  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.precio * item.quantity), 0);

    if (cartCounter) {
      cartCounter.textContent = `(${totalItems})`;
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = formatPrice(subtotal);
    }

    // Actualización de la barra de envío gratis
    if (freeShippingText && shippingProgressFill) {
      if (subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD) {
        freeShippingText.innerHTML = '¡Felicitaciones! Tenés <strong>ENVÍO GRATIS</strong>';
        shippingProgressFill.style.width = '100%';
      } else {
        const remaining = CONFIG.FREE_SHIPPING_THRESHOLD - subtotal;
        const progressPercent = Math.min(100, Math.round((subtotal / CONFIG.FREE_SHIPPING_THRESHOLD) * 100));
        freeShippingText.innerHTML = `Te faltan <strong>${formatPrice(remaining)}</strong> para el <strong>ENVÍO GRATIS</strong>`;
        shippingProgressFill.style.width = `${progressPercent}%`;
      }
    }

    // Carrito vacío
    if (cart.length === 0) {
      isCheckoutStep = false;
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <i class="fa-solid fa-bag-shopping empty-cart-icon"></i>
            <p>Tu carrito está vacío</p>
            <button id="btn-start-shopping" class="btn-secondary">Explorar Colección</button>
          </div>
        `;
        document.getElementById('btn-start-shopping')?.addEventListener('click', closeCart);
      }
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Vista de Checkout Express por Email
    if (isCheckoutStep) {
      renderExpressCheckoutForm(subtotal);
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Vista de ítems en carrito
    if (cartFooter) cartFooter.style.display = 'flex';

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="cart-item" data-index="${idx}">
          <img src="${item.imagen}" alt="${item.nombre}" class="cart-item-thumb">
          <div class="cart-item-details">
            <span class="cart-item-category">${item.categoria} &bull; <strong>Talle: ${item.talle}</strong></span>
            <h4 class="cart-item-title">${item.nombre}</h4>
            <span class="cart-item-price">${formatPrice(item.precio * item.quantity)}</span>
            <div class="cart-qty-control">
              <button class="qty-btn btn-qty-minus" data-index="${idx}" aria-label="Disminuir">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-index="${idx}" aria-label="Aumentar">+</button>
            </div>
          </div>
          <button class="btn-remove-item" data-index="${idx}" aria-label="Eliminar prenda">
            <i class="fa-solid fa-xmark"></i>
          </button>
        </div>
      `).join('');

      cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(b => {
        b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.index, 10), -1));
      });
      cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(b => {
        b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.index, 10), 1));
      });
      cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(b => {
        b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.index, 10)));
      });
    }
  };

  // ==========================================================================
  // 4. CHECKOUT EXPRESS -> GOOGLE SHEETS + PEDIDO DIRECTO POR WHATSAPP
  // ==========================================================================
  const renderExpressCheckoutForm = (subtotal) => {
    if (!cartItemsContainer) return;

    cartItemsContainer.innerHTML = `
      <div class="checkout-express-box">
        <div class="checkout-express-header">
          <span class="checkout-express-badge">PASO FINAL &bull; CHECKOUT</span>
          <h3 class="checkout-express-title">Registro Express</h3>
          <p class="checkout-express-desc">Ingresá tus datos para registrar tu orden y coordinar el pago por WhatsApp.</p>
        </div>

        <form id="express-checkout-form" class="checkout-express-form">
          <div class="checkout-field">
            <label for="checkout-name" class="checkout-label">Nombre y Apellido *</label>
            <input 
              type="text" 
              id="checkout-name" 
              class="checkout-input" 
              placeholder="Ej: Valentina Morales" 
              required
              autocomplete="name"
            >
          </div>

          <div class="checkout-field">
            <label for="checkout-email" class="checkout-label">Correo Electrónico (15% OFF) *</label>
            <input 
              type="email" 
              id="checkout-email" 
              class="checkout-input" 
              placeholder="tuemail@ejemplo.com" 
              required
              autocomplete="email"
            >
          </div>

          <div class="checkout-field">
            <label for="checkout-phone" class="checkout-label">WhatsApp de Contacto *</label>
            <input 
              type="tel" 
              id="checkout-phone" 
              class="checkout-input" 
              placeholder="Ej: 11 5555-6789" 
              required
              autocomplete="tel"
            >
          </div>

          <div class="checkout-field">
            <label for="checkout-address" class="checkout-label">Localidad / Provincia de Envío</label>
            <input 
              type="text" 
              id="checkout-address" 
              class="checkout-input" 
              placeholder="Ej: Palermo, CABA / Córdoba Capital"
              autocomplete="address-level2"
            >
          </div>

          <div class="checkout-summary-mini">
            <span>Total a abonar:</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>

          <button type="submit" id="btn-submit-order" class="btn-whatsapp-checkout">
            <i class="fa-brands fa-whatsapp"></i>
            <span>Confirmar Pedido vía WhatsApp</span>
          </button>

          <p id="checkout-status-msg" class="checkout-status-msg"></p>

          <button type="button" id="btn-back-to-cart" class="btn-back-to-cart">
            &larr; Volver a revisar prendas en carrito
          </button>
        </form>
      </div>
    `;

    document.getElementById('btn-back-to-cart')?.addEventListener('click', () => {
      isCheckoutStep = false;
      updateCartUI();
    });

    document.getElementById('express-checkout-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('checkout-name').value.trim();
      const email = document.getElementById('checkout-email').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const address = document.getElementById('checkout-address').value.trim();
      const submitBtn = document.getElementById('btn-submit-order');
      const statusMsg = document.getElementById('checkout-status-msg');

      if (!name || !email || !phone) {
        alert('Por favor completá tu nombre, correo y WhatsApp.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span>Procesando pedido...</span>';
      if (statusMsg) statusMsg.textContent = 'Guardando en base de datos y abriendo WhatsApp...';

      const orderPayload = {
        fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
        cliente: name,
        email: email,
        telefono: phone,
        direccion: address || 'No especificada',
        items: cart.map(i => `${i.quantity}x ${i.nombre} (Talle: ${i.talle})`).join(' | '),
        total: subtotal,
        envioGratis: subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD ? 'SÍ' : 'NO'
      };

      // Guardar en respaldo local y enviar a Google Sheets
      await sendOrderToGoogleSheets(orderPayload);

      // Generar mensaje de WhatsApp
      const whatsappUrl = buildWhatsAppOrderLink({
        name,
        email,
        phone,
        address,
        cartItems: cart,
        subtotal
      });

      // Vaciar carrito
      cart = [];
      saveCart();
      isCheckoutStep = false;
      closeCart();

      // Abrir WhatsApp con el pedido desglosado
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  };

  const sendOrderToGoogleSheets = async (orderData) => {
    try {
      const ordersHistory = JSON.parse(localStorage.getItem('aromoda_orders_history') || '[]');
      ordersHistory.push(orderData);
      localStorage.setItem('aromoda_orders_history', JSON.stringify(ordersHistory));

      if (CONFIG.GOOGLE_SHEETS_API_URL && !CONFIG.GOOGLE_SHEETS_API_URL.includes('DEMO')) {
        await fetch(CONFIG.GOOGLE_SHEETS_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(orderData)
        });
      }
    } catch (err) {
      console.warn('Aviso: Pedido guardado localmente en historial:', err);
    }
  };

  const buildWhatsAppOrderLink = ({ name, email, phone, address, cartItems, subtotal }) => {
    const itemsList = cartItems.map(item => 
      `• *${item.quantity}x* ${item.nombre}\n   └ *Talle:* _${item.talle}_ | ${formatPrice(item.precio * item.quantity)}`
    ).join('\n');

    const shippingNotice = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD 
      ? '✅ *¡ENVÍO BONIFICADO (GRATIS)!*' 
      : '🚚 *Envío a coordinar por Correo Argentino*';

    const rawMessage = 
`✨ *NUEVO PEDIDO - AROMODA* ✨
━━━━━━━━━━━━━━━━━━━━━━━━
👤 *Cliente:* ${name}
📧 *Email:* ${email}
📱 *WhatsApp:* ${phone}
📍 *Entrega:* ${address || 'A coordinar'}
━━━━━━━━━━━━━━━━━━━━━━━━
🛍️ *PRENDAS SOLICITADAS:*
${itemsList}

💰 *TOTAL DEL PEDIDO:* ${formatPrice(subtotal)}
${shippingNotice}
💳 *Forma de Pago:* 3 o 6 Cuotas Sin Interés / Transferencia
━━━━━━━━━━━━━━━━━━━━━━━━
¡Hola Aromoda! Acabo de armar mi pedido en la web con mis talles y quisiera coordinar el pago y envío.`;

    return `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodeURIComponent(rawMessage)}`;
  };

  // Eventos de apertura y cierre del carrito
  btnCheckout?.addEventListener('click', () => {
    if (cart.length === 0) return;
    isCheckoutStep = true;
    updateCartUI();
  });

  btnOpenCart?.addEventListener('click', openCart);
  btnCloseCart?.addEventListener('click', closeCart);
  cartDrawerOverlay?.addEventListener('click', closeCart);
  btnContinueShopping?.addEventListener('click', closeCart);

  // ==========================================================================
  // 5. BÚSQUEDA EN TIEMPO REAL & MENÚ MOBILE
  // ==========================================================================
  btnToggleSearch?.addEventListener('click', () => {
    if (searchDropdownBar) {
      searchDropdownBar.classList.toggle('active');
      if (searchDropdownBar.classList.contains('active')) {
        searchInput?.focus();
      }
    }
  });

  btnCloseSearch?.addEventListener('click', () => {
    if (searchDropdownBar) {
      searchDropdownBar.classList.remove('active');
    }
  });

  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  btnMobileMenu?.addEventListener('click', () => {
    if (headerNavLeft) {
      headerNavLeft.classList.toggle('mobile-open');
    }
  });

  // ==========================================================================
  // 6. MODAL DE REGISTRO CLUB AROMODA (15% OFF)
  // ==========================================================================
  const openRegisterModal = () => {
    registerModalOverlay?.classList.add('active');
    registerModalOverlay?.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('register-name')?.focus();
  };

  const closeRegisterModal = () => {
    registerModalOverlay?.classList.remove('active');
    registerModalOverlay?.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  btnOpenRegister?.addEventListener('click', openRegisterModal);
  btnCloseRegister?.addEventListener('click', closeRegisterModal);
  registerModalOverlay?.addEventListener('click', (e) => {
    if (e.target === registerModalOverlay) closeRegisterModal();
  });

  registerForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('register-name').value;
    const email = document.getElementById('register-email').value;

    alert(`¡Bienvenida al Club Aromoda, ${name}!\nTu cupón exclusivo del 15% OFF ha sido enviado a: ${email}`);
    registerForm.reset();
    closeRegisterModal();
  });

  // Newsletter Footer
  newsletterForm?.addEventListener('submit', (e) => {
    e.preventDefault();
    const emailInput = document.getElementById('newsletter-email');
    if (emailInput && emailInput.value) {
      alert(`¡Gracias por unirte a Aromoda!\nTe enviamos tu código con 15% OFF a: ${emailInput.value}`);
      newsletterForm.reset();
    }
  });

  // Seguimiento Oficial Correo Argentino
  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCode = trackingCodeInput?.value.trim().toUpperCase();

      if (!rawCode) {
        alert('Por favor ingresá tu código de guía de Correo Argentino.');
        return;
      }

      const officialUrl = 'https://www.correoargentino.com.ar/formularios/ondnc';
      const confirmRedirect = confirm(
        `Vas a consultar el envío con guía "${rawCode}".\n\n¿Deseás ingresar a la plataforma de seguimiento de Correo Argentino?`
      );

      if (confirmRedirect) {
        window.open(officialUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Tecla Escape para cerrar drawers y modales
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeRegisterModal();
      if (searchDropdownBar) searchDropdownBar.classList.remove('active');
    }
  });

  // Carga inicial
  updateCartUI();
  renderCatalog();
});