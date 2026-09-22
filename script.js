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
    WHATSAPP_PHONE: '+542325590916',

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
    // ==========================================================================
// LÓGICA DE LA VISTA DE DETALLE DE PRODUCTO (PDP) - AROMODA (ADAPTADA)
// ==========================================================================

// Variable global para almacenar el talle seleccionado en la PDP
let selectedSizePDP = null;

/**
 * Muestra la vista de detalle para un producto específico.
 * @param {Object} product - Objeto de la lista "productos"
 */
function openProductDetail(product) {
  // 1. Ocultar el catálogo y secciones secundarias
  const catalogSection = document.getElementById('catalogo');
  const heroSection = document.getElementById('inicio');
  const shopCategory = document.getElementById('shop-by-category');
  const pressSection = document.querySelector('.brand-press-section');

  if (catalogSection) catalogSection.classList.add('hidden');
  if (heroSection) heroSection.classList.add('hidden');
  if (shopCategory) shopCategory.classList.add('hidden');
  if (pressSection) pressSection.classList.add('hidden');

  // 2. Cargar datos básicos adaptados a las propiedades de tu array 'productos'
  const categoryEl = document.getElementById('pdp-category');
  const titleEl = document.getElementById('pdp-title');
  const priceEl = document.getElementById('pdp-price');
  const descEl = document.getElementById('pdp-description');

  if (categoryEl) categoryEl.innerText = (product.categoria || 'COLECCIÓN').toUpperCase();
  if (titleEl) titleEl.innerText = product.nombre || product.title;
  if (priceEl) priceEl.innerText = `$${product.precio ? product.precio.toLocaleString('es-AR') : '0'}`;
  if (descEl) descEl.innerText = product.descripcion || 'Prenda exclusiva confeccionada con textiles nobles y calce perfecto.';

  // 3. Cargar imagen principal y galería
  const mainImg = document.getElementById('pdp-main-image');
  const imageUrls = product.imagenes && product.imagenes.length > 0 
    ? product.imagenes 
    : [product.imagen];
  
  if (mainImg) mainImg.src = imageUrls[0];

  // 4. Cargar miniaturas de la galería
  const thumbnailsContainer = document.getElementById('pdp-thumbnails');
  if (thumbnailsContainer) {
    thumbnailsContainer.innerHTML = '';
    
    if (imageUrls.length > 1) {
      imageUrls.forEach((imgUrl, index) => {
        const thumb = document.createElement('img');
        thumb.src = imgUrl;
        thumb.alt = `${product.nombre} - vista ${index + 1}`;
        thumb.className = `pdp-thumb ${index === 0 ? 'active' : ''}`;
        
        thumb.addEventListener('click', () => {
          if (mainImg) mainImg.src = imgUrl;
          document.querySelectorAll('.pdp-thumb').forEach(t => t.classList.remove('active'));
          thumb.classList.add('active');
        });
        
        thumbnailsContainer.appendChild(thumb);
      });
    }
  }

  // 5. Cargar botones de talles
  const sizesContainer = document.getElementById('pdp-sizes-options');
  const sizeError = document.getElementById('size-error');
  
  if (sizesContainer) {
    sizesContainer.innerHTML = '';
    selectedSizePDP = null; // Reiniciar selección
    if (sizeError) sizeError.classList.add('hidden');

    const availableSizes = product.talles || product.sizes || ['S', 'M', 'L'];
    availableSizes.forEach(size => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'size-btn';
      btn.innerText = size;

      btn.addEventListener('click', () => {
        document.querySelectorAll('.size-btn').forEach(b => b.classList.remove('selected'));
        btn.classList.add('selected');
        selectedSizePDP = size;
        if (sizeError) sizeError.classList.add('hidden');
      });

      sizesContainer.appendChild(btn);
    });
  }

  // 6. Configurar el botón "Agregar al Carrito" de la PDP
  const btnAddToCartPDP = document.getElementById('btn-add-to-cart-detail');
  if (btnAddToCartPDP) {
    btnAddToCartPDP.onclick = () => {
      if (!selectedSizePDP) {
        if (sizeError) sizeError.classList.remove('hidden');
        return;
      }
      
      // Conectar con la lista global de talles seleccionados de tu app.js
      if (typeof selectedSizes !== 'undefined') {
        selectedSizes[product.id] = selectedSizePDP;
      }
      
      // Llamar a tu función addToCart enviando el ID del producto
      if (typeof addToCart === 'function') {
        addToCart(product.id);
      }
    };
  }

  // 7. Cargar prendas similares
  renderSimilarProducts(product);

  // 8. Mostrar la sección de detalle
  const pdpSection = document.getElementById('view-product-detail');
  if (pdpSection) {
    pdpSection.classList.remove('hidden');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}

/**
 * Cierra la vista de detalle y vuelve a mostrar el catálogo completo.
 */
function closeProductDetail() {
  const pdpSection = document.getElementById('view-product-detail');
  const catalogSection = document.getElementById('catalogo');
  const heroSection = document.getElementById('inicio');
  const shopCategory = document.getElementById('shop-by-category');
  const pressSection = document.querySelector('.brand-press-section');

  if (pdpSection) pdpSection.classList.add('hidden');
  if (catalogSection) catalogSection.classList.remove('hidden');
  if (heroSection) heroSection.classList.remove('hidden');
  if (shopCategory) shopCategory.classList.remove('hidden');
  if (pressSection) pressSection.classList.remove('hidden');
}

/**
 * Renderiza prendas de la misma categoría en la parte inferior de la PDP.
 * @param {Object} currentProduct 
 */
function renderSimilarProducts(currentProduct) {
  const similarGrid = document.getElementById('similar-products-grid');
  if (!similarGrid) return;

  similarGrid.innerHTML = '';

  // Usar la lista "productos" definida al principio de tu script
  if (typeof productos !== 'undefined' && Array.isArray(productos)) {
    const similar = productos
      .filter(p => p.categoria === currentProduct.categoria && p.id !== currentProduct.id)
      .slice(0, 3);

    similar.forEach(item => {
      const card = document.createElement('div');
      card.className = 'category-card';
      card.style.cursor = 'pointer';
      card.innerHTML = `
        <div class="category-img-container" style="height: 220px; overflow: hidden;">
          <img src="${item.imagen}" alt="${item.nombre}" style="width:100%; height:100%; object-fit:cover;">
        </div>
        <div class="category-card-info" style="padding: 10px;">
          <h4 style="margin: 0; font-size: 0.85rem;">${item.nombre}</h4>
          <span style="font-weight: 700; font-size: 0.85rem;">$${item.precio.toLocaleString('es-AR')}</span>
        </div>
      `;
      card.addEventListener('click', () => openProductDetail(item));
      similarGrid.appendChild(card);
    });
  }
}

// ==========================================================================
// INICIALIZACIÓN DE EVENTOS EN LA PDP
// ==========================================================================
document.addEventListener('DOMContentLoaded', () => {

  // Evento para el botón "Volver al catálogo"
  const btnBack = document.getElementById('btn-back-catalog');
  if (btnBack) {
    btnBack.addEventListener('click', closeProductDetail);
  }

  // Evento para la Calculadora de Envío CP 6720
  const btnCalcShipping = document.getElementById('btn-calc-shipping');
  const cpInput = document.getElementById('cp-input');
  const shippingResult = document.getElementById('shipping-result');

  if (btnCalcShipping && cpInput && shippingResult) {
    btnCalcShipping.addEventListener('click', () => {
      const cp = cpInput.value.trim();

      if (!cp) {
        shippingResult.innerText = 'Por favor, ingresá un código postal válido.';
        shippingResult.style.color = '#d9534f';
        shippingResult.classList.remove('hidden');
        return;
      }

      if (cp === '6720') {
        shippingResult.innerHTML = '📍 <strong>Envío Local (San Andrés de Giles):</strong> Entrega en el día o retiro sin cargo. ¡Gratis en compras superiores a $80.000!';
        shippingResult.style.color = '#2e7d32';
      } else {
        shippingResult.innerHTML = '🚚 <strong>Envío Nacional (Correo Argentino):</strong> 2 a 4 días hábiles ($4.500).';
        shippingResult.style.color = '#333';
      }

      shippingResult.classList.remove('hidden');
    });
  }
});