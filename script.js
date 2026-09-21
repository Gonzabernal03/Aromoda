/**
 * ==========================================================================
 * AROMODA - APP.JS (INTERACTIVIDAD EDITORIAL ESTILO ELIMS DENIM)
 * 1. Renderizado de variantes y swatches con cambio dinámico de imagen en tarjeta
 * 2. Carrito deslizante (Slide-out drawer) sin recarga de pantalla
 * 3. Formulario de Registro Express por Email en Checkout -> API Google Sheets + WhatsApp
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CONFIGURACIÓN DE INTEGRACIÓN Y PARÁMETROS
  // ==========================================================================
  const CONFIG = {
    // Número oficial de WhatsApp de Aromoda (formato internacional sin '+' ni espacios)
    WHATSAPP_PHONE: '5491155556789',
    
    // URL de tu Web App de Google Apps Script (Despliegue -> Nueva Implementación -> Aplicación Web)
    // Reemplaza esta URL con la tuya propia cuando tengas el script desplegado
    GOOGLE_SHEETS_API_URL: 'https://script.google.com/macros/s/AKfycbz_AROMODA_DEMO_API/exec',
    
    // Umbral monetario para acceder a Envío Gratis
    FREE_SHIPPING_THRESHOLD: 80000
  };

  // ==========================================================================
  // CATÁLOGO DE PRODUCTOS CON VARIANTES DE COLOR E IMÁGENES DEDICADAS
  // ==========================================================================
  const PRODUCTS = [
    {
      id: 1,
      name: "Jean Wide Leg Denim Vintage",
      category: "jeans",
      categoryName: "Jeans",
      price: 39500,
      badge: "Nuevo",
      installments: "6 cuotas de $6.583",
      variants: [
        {
          colorName: "Azul Vintage",
          hex: "#293E58",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Celeste Sky",
          hex: "#7998B5",
          image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Denim Noir",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 2,
      name: "Remera Oversize Lino Beige",
      category: "remeras",
      categoryName: "Remeras",
      price: 19800,
      badge: "Básico",
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Lino Arena",
          hex: "#E8DFD8",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Blanco Óptico",
          hex: "#FFFFFF",
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Negro Puro",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 3,
      name: "Short Sastrero Crepe Crudo",
      category: "shorts",
      categoryName: "Shorts",
      price: 26500,
      badge: "Tendencia",
      installments: "6 cuotas de $4.416",
      variants: [
        {
          colorName: "Crudo Natural",
          hex: "#F4EFEA",
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Sartorial Noir",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 4,
      name: "Musculosa Ribb Escote Halter",
      category: "musculosas",
      categoryName: "Musculosas",
      price: 15200,
      badge: "Esencial",
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Negro Profundo",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Off-White",
          hex: "#FFFFFF",
          image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Nude Calmo",
          hex: "#D5C5B5",
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 5,
      name: "Pantalón Palazzo Noir Sastrería",
      category: "pantalones",
      categoryName: "Pantalones",
      price: 37900,
      badge: "Destacado",
      installments: "6 cuotas de $6.316",
      variants: [
        {
          colorName: "Negro Absoluto",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Gris Cemento",
          hex: "#7A7A7A",
          image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 6,
      name: "Jean Mom Fit Clásico Celeste",
      category: "jeans",
      categoryName: "Jeans",
      price: 36000,
      badge: "Bestseller",
      installments: "6 cuotas sin interés",
      variants: [
        {
          colorName: "Celeste Lavado",
          hex: "#7998B5",
          image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Azul Índigo",
          hex: "#293E58",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Gris Desgastado",
          hex: "#444444",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 7,
      name: "Remera Pima Cotton Blanca",
      category: "remeras",
      categoryName: "Remeras",
      price: 17500,
      badge: "Básico",
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Blanco Pima",
          hex: "#FFFFFF",
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Negro Pima",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Gris Melange",
          hex: "#A6A6A6",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 8,
      name: "Musculosa Satén Elegance Nude",
      category: "musculosas",
      categoryName: "Musculosas",
      price: 21000,
      badge: "Edición Limitada",
      installments: "6 cuotas de $3.500",
      variants: [
        {
          colorName: "Champagne Nude",
          hex: "#E2D5C8",
          image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Satin Noir",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 9,
      name: "Short Denim Ripped Clásico",
      category: "shorts",
      categoryName: "Shorts",
      price: 24900,
      badge: null,
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Azul Ripped",
          hex: "#5D7A94",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Black Ripped",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop"
        }
      ]
    },
    {
      id: 10,
      name: "Pantalón Straight Lino Arena",
      category: "pantalones",
      categoryName: "Pantalones",
      price: 34500,
      badge: "Favorito",
      installments: "6 cuotas de $5.750",
      variants: [
        {
          colorName: "Lino Arena",
          hex: "#DCD3C7",
          image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop"
        },
        {
          colorName: "Lino Negro",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop"
        }
      ]
    }
  ];

  // ==========================================================================
  // ESTADO LOCAL DE LA APLICACIÓN
  // ==========================================================================
  let cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');
  let currentCategory = 'todos';
  let searchQuery = '';
  let isCheckoutStep = false; // Estado del drawer (vista de items vs vista checkout express)

  // Registro en memoria de la variante activa por producto { productId: variantIndex }
  const selectedVariants = {};
  PRODUCTS.forEach(p => {
    selectedVariants[p.id] = 0; // Variante inicial por defecto: índice 0
  });

  // ==========================================================================
  // REFERENCIAS AL DOM
  // ==========================================================================
  const productsGrid = document.getElementById('products-grid');
  const filterStatusText = document.getElementById('filter-status-text');

  // Header y Búsqueda
  const searchInput = document.getElementById('search-input');
  const searchDropdownBar = document.getElementById('search-dropdown-bar');
  const btnToggleSearch = document.getElementById('btn-toggle-search');
  const btnCloseSearch = document.getElementById('btn-close-search');
  const btnMobileMenu = document.getElementById('btn-mobile-menu');
  const headerNavLeft = document.getElementById('header-nav-left');

  // Drawer Lateral de Carrito
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

  // Modal de Registro Club Aromoda
  const btnOpenRegister = document.getElementById('btn-open-register');
  const btnCloseRegister = document.getElementById('btn-close-register');
  const registerModalOverlay = document.getElementById('register-modal-overlay');
  const registerForm = document.getElementById('register-form');

  // Newsletter y Guía de Correo Argentino
  const newsletterForm = document.getElementById('newsletter-form');
  const trackingForm = document.getElementById('tracking-form');
  const trackingCodeInput = document.getElementById('tracking-code');

  // Formateador de moneda en ARS
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ==========================================================================
  // 1. RENDERIZADO DE PRODUCTOS Y GESTIÓN DE VARIANTES DE COLOR
  // ==========================================================================
  const renderCatalog = () => {
    const filtered = PRODUCTS.filter(product => {
      const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

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
            No se encontraron prendas que coincidan con la búsqueda.
          </p>
          <button id="btn-reset-filters" class="btn-secondary">Ver todo el catálogo</button>
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
      const activeVariantIndex = selectedVariants[product.id] || 0;
      const currentVariant = product.variants[activeVariantIndex] || product.variants[0];

      return `
        <article class="product-card" data-id="${product.id}">
          <div class="product-img-wrapper">
            ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
            <img 
              src="${currentVariant.image}" 
              alt="${product.name} - ${currentVariant.colorName}" 
              class="product-img" 
              id="product-img-${product.id}"
              loading="lazy"
            >
            <button class="btn-add-to-cart" data-id="${product.id}" aria-label="Agregar al carrito">
              + Agregar al Carrito
            </button>
          </div>
          <div class="product-info">
            <!-- Swatches Interactivos de Variante de Color -->
            <div class="color-swatches" aria-label="Colores disponibles para ${product.name}">
              ${product.variants.map((v, idx) => `
                <span 
                  class="swatch-circle ${idx === activeVariantIndex ? 'active' : ''}" 
                  style="background-color: ${v.hex};" 
                  title="${v.colorName}"
                  data-product-id="${product.id}"
                  data-variant-index="${idx}"
                  tabindex="0"
                  role="button"
                  aria-label="Seleccionar color ${v.colorName}"
                ></span>
              `).join('')}
            </div>
            <span class="product-category">${product.categoryName} &bull; <strong id="color-label-${product.id}">${currentVariant.colorName}</strong></span>
            <h3 class="product-title">${product.name}</h3>
            <div class="product-price-box">
              <span class="product-price">${formatPrice(product.price)}</span>
              <span class="product-installments">${product.installments}</span>
            </div>
          </div>
        </article>
      `;
    }).join('');

    // Listener para los Swatches: cambia la imagen principal suavemente al hacer clic
    productsGrid.querySelectorAll('.swatch-circle').forEach(swatch => {
      const handleSwatchChange = (e) => {
        e.stopPropagation();
        const pId = parseInt(swatch.dataset.productId, 10);
        const vIdx = parseInt(swatch.dataset.variantIndex, 10);
        const product = PRODUCTS.find(p => p.id === pId);

        if (!product || !product.variants[vIdx]) return;

        // Actualizar estado de variante
        selectedVariants[pId] = vIdx;
        const newVariant = product.variants[vIdx];

        // Transición visual suave de la imagen (crossfade)
        const imgElement = document.getElementById(`product-img-${pId}`);
        if (imgElement) {
          imgElement.style.opacity = '0.3';
          setTimeout(() => {
            imgElement.src = newVariant.image;
            imgElement.alt = `${product.name} - ${newVariant.colorName}`;
            imgElement.style.opacity = '1';
          }, 150);
        }

        // Actualizar etiqueta de color
        const colorLabel = document.getElementById(`color-label-${pId}`);
        if (colorLabel) {
          colorLabel.textContent = newVariant.colorName;
        }

        // Actualizar clase activa en los swatches de la tarjeta
        const parentSwatches = swatch.parentElement;
        if (parentSwatches) {
          parentSwatches.querySelectorAll('.swatch-circle').forEach(s => s.classList.remove('active'));
          swatch.classList.add('active');
        }
      };

      swatch.addEventListener('click', handleSwatchChange);
      swatch.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleSwatchChange(e);
        }
      });
    });

    // Listener para los botones '+ Agregar al Carrito'
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
  // 2. CARRITO DESLIZANTE (SLIDE-OUT) SIN RECARGA DE PÁGINA
  // ==========================================================================
  const openCart = () => {
    cartDrawer.classList.add('active');
    cartDrawerOverlay.classList.add('active');
    cartDrawer.setAttribute('aria-hidden', 'false');
    cartDrawerOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeCart = () => {
    cartDrawer.classList.remove('active');
    cartDrawerOverlay.classList.remove('active');
    cartDrawer.setAttribute('aria-hidden', 'true');
    cartDrawerOverlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    // Al cerrar, restablecemos a la vista de productos
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
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const variantIndex = selectedVariants[productId] || 0;
    const variant = product.variants[variantIndex] || product.variants[0];

    // Buscar si ya existe el producto con la misma variante de color
    const existing = cart.find(item => item.id === productId && item.variantColor === variant.colorName);

    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: variant.image,
        categoryName: product.categoryName,
        variantColor: variant.colorName,
        variantHex: variant.hex,
        quantity: 1
      });
    }

    // Guardar, refrescar interfaz y DESPLEGAR SUAVEMENTE EL PANEL DERECHO sin recargar pantalla
    saveCart();
    openCart();
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

  // Renderiza el contenido del drawer: Lista de Items o Formulario de Checkout Express
  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Contador numérico sin círculos recargados: "(0)"
    if (cartCounter) {
      cartCounter.textContent = `(${totalItems})`;
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = formatPrice(subtotal);
    }

    // Actualización de Barra de Envío Gratis
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

    // Caso 1: Carrito vacío
    if (cart.length === 0) {
      isCheckoutStep = false;
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-cart-icon">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>Tu carrito está vacío</p>
          <button id="btn-start-shopping" class="btn-secondary">Explorar Catálogo</button>
        </div>
      `;
      document.getElementById('btn-start-shopping')?.addEventListener('click', closeCart);
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Caso 2: Vista de Formulario de Registro Express por Email (Checkout)
    if (isCheckoutStep) {
      renderExpressCheckoutForm(subtotal);
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Caso 3: Vista Normal de Items en Carrito
    if (cartFooter) cartFooter.style.display = 'flex';

    cartItemsContainer.innerHTML = cart.map((item, idx) => `
      <div class="cart-item" data-index="${idx}">
        <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
        <div class="cart-item-details">
          <span class="cart-item-category">${item.categoryName} &bull; <strong>${item.variantColor}</strong></span>
          <h4 class="cart-item-title">${item.name}</h4>
          <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
          <div class="cart-qty-control">
            <button class="qty-btn btn-qty-minus" data-index="${idx}" aria-label="Disminuir cantidad">-</button>
            <span class="qty-number">${item.quantity}</span>
            <button class="qty-btn btn-qty-plus" data-index="${idx}" aria-label="Aumentar cantidad">+</button>
          </div>
        </div>
        <button class="btn-remove-item" data-index="${idx}" aria-label="Eliminar producto">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
    `).join('');

    // Eventos en controles de cantidad y eliminar
    cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(b => {
      b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.index, 10), -1));
    });
    cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(b => {
      b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.index, 10), 1));
    });
    cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(b => {
      b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.index, 10)));
    });
  };

  // ==========================================================================
  // 3. FORMULARIO DE REGISTRO EXPRESS EN CHECKOUT + GOOGLE SHEETS + WHATSAPP
  // ==========================================================================
  const renderExpressCheckoutForm = (subtotal) => {
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

          <!-- Resumen Compacto -->
          <div class="checkout-summary-mini">
            <span>Total a abonar:</span>
            <strong>${formatPrice(subtotal)}</strong>
          </div>

          <!-- Botón de Envío -->
          <button type="submit" id="btn-submit-order" class="btn-whatsapp-checkout">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
            </svg>
            <span>Confirmar Pedido vía WhatsApp</span>
          </button>

          <p id="checkout-status-msg" class="checkout-status-msg"></p>

          <button type="button" id="btn-back-to-cart" class="btn-back-to-cart">
            &larr; Volver a revisar prendas en carrito
          </button>
        </form>
      </div>
    `;

    // Botón volver a vista de productos
    document.getElementById('btn-back-to-cart')?.addEventListener('click', () => {
      isCheckoutStep = false;
      updateCartUI();
    });

    // Enviar Registro Express -> API Google Sheets + Redirección WhatsApp
    document.getElementById('express-checkout-form')?.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('checkout-name').value.trim();
      const email = document.getElementById('checkout-email').value.trim();
      const phone = document.getElementById('checkout-phone').value.trim();
      const address = document.getElementById('checkout-address').value.trim();
      const submitBtn = document.getElementById('btn-submit-order');
      const statusMsg = document.getElementById('checkout-status-msg');

      if (!name || !email || !phone) {
        alert('Por favor completá tu nombre, email y teléfono.');
        return;
      }

      // Estado de carga visual en el botón
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.7';
      submitBtn.innerHTML = '<span>Procesando pedido y registrando...</span>';
      if (statusMsg) statusMsg.textContent = 'Enviando a Google Sheets y conectando con WhatsApp...';

      // 1. Preparar Payload para Google Sheets
      const orderPayload = {
        fecha: new Date().toLocaleString('es-AR', { timeZone: 'America/Argentina/Buenos_Aires' }),
        cliente: name,
        email: email,
        telefono: phone,
        direccion: address || 'No especificada',
        items: cart.map(i => `${i.quantity}x ${i.name} [Color: ${i.variantColor}]`).join(' | '),
        total: subtotal,
        envioGratis: subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD ? 'SÍ' : 'NO'
      };

      // 2. Enviar a la API de Google Sheets en segundo plano
      await sendOrderToGoogleSheets(orderPayload);

      // 3. Construir mensaje estructurado para WhatsApp
      const whatsappUrl = buildWhatsAppOrderLink({
        name,
        email,
        phone,
        address,
        cartItems: cart,
        subtotal
      });

      // 4. Limpiar el carrito y estado
      cart = [];
      saveCart();
      isCheckoutStep = false;
      closeCart();

      // 5. Redirigir suavemente a WhatsApp
      window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    });
  };

  // Envío a Google Sheets (con almacenamiento de respaldo local seguro)
  const sendOrderToGoogleSheets = async (orderData) => {
    try {
      // Siempre guardamos una copia de respaldo en localStorage
      const ordersHistory = JSON.parse(localStorage.getItem('aromoda_orders_history') || '[]');
      ordersHistory.push(orderData);
      localStorage.setItem('aromoda_orders_history', JSON.stringify(ordersHistory));

      // Si la URL no es demo, enviamos por POST con modo no-cors para evitar bloqueos
      if (CONFIG.GOOGLE_SHEETS_API_URL && !CONFIG.GOOGLE_SHEETS_API_URL.includes('DEMO')) {
        await fetch(CONFIG.GOOGLE_SHEETS_API_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(orderData)
        });
      }
    } catch (err) {
      console.warn('Aviso: Pedido resguardado localmente. Detalle de conexión Google Sheets:', err);
    }
  };

  // Generador de enlace de WhatsApp con formato editorial ordenado
  const buildWhatsAppOrderLink = ({ name, email, phone, address, cartItems, subtotal }) => {
    const itemsList = cartItems.map(item => 
      `• *${item.quantity}x* ${item.name}\n   └ Color: _${item.variantColor}_ | ${formatPrice(item.price * item.quantity)}`
    ).join('\n');

    const shippingNotice = subtotal >= CONFIG.FREE_SHIPPING_THRESHOLD 
      ? '✅ *¡ENVÍO BONIFICADO (GRATIS)!*' 
      : '🚚 *Envío a coordinar vía Correo Argentino*';

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
💳 *Opciones:* 3 o 6 Cuotas Sin Interés / Transferencia
━━━━━━━━━━━━━━━━━━━━━━━━
¡Hola Aromoda! Acabo de registrar mi orden en la tienda web y quisiera coordinar el pago y despacho.`;

    return `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodeURIComponent(rawMessage)}`;
  };

  // Listener para el botón "Finalizar Compra": Transiciona al formulario express
  btnCheckout?.addEventListener('click', () => {
    if (cart.length === 0) return;
    isCheckoutStep = true;
    updateCartUI();
  });

  // Eventos de apertura/cierre del carrito
  btnOpenCart?.addEventListener('click', openCart);
  btnCloseCart?.addEventListener('click', closeCart);
  cartDrawerOverlay?.addEventListener('click', closeCart);
  btnContinueShopping?.addEventListener('click', closeCart);

  // ==========================================================================
  // 4. FILTRADO POR CATEGORÍAS & NAVEGACIÓN
  // ==========================================================================
  const setCategory = (cat) => {
    currentCategory = cat;

    // Sincronizar todos los botones de categoría
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });

    renderCatalog();
  };

  // Botones de filtro en header y catálogo
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.category;
      setCategory(cat);

      if (headerNavLeft && headerNavLeft.classList.contains('mobile-open')) {
        headerNavLeft.classList.remove('mobile-open');
      }

      const destSection = document.getElementById('destacados');
      if (destSection) {
        destSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  // Tarjetas visuales de "SHOP BY CATEGORY"
  document.querySelectorAll('.category-card').forEach(card => {
    const handleCategoryClick = () => {
      const cat = card.dataset.category;
      if (cat) {
        setCategory(cat);
        const destSection = document.getElementById('destacados');
        if (destSection) {
          destSection.scrollIntoView({ behavior: 'smooth' });
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
  // 5. BÚSQUEDA INTERACTIVA SLIDE-DOWN & MENÚ MOBILE
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
    registerModalOverlay.classList.add('active');
    registerModalOverlay.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
    document.getElementById('register-name')?.focus();
  };

  const closeRegisterModal = () => {
    registerModalOverlay.classList.remove('active');
    registerModalOverlay.setAttribute('aria-hidden', 'true');
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

  // Inicialización de Interfaz
  updateCartUI();
  renderCatalog();
});