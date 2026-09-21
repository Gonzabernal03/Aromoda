/**
 * ==========================================================================
 * AROMODA - APP.JS (INTERACTIVIDAD COMPLETA PARA GITHUB PAGES)
 * - Arreglo `productos` con ítems de muestra (Jeans, Remeras, Shorts, Tops, Abrigos, Vestidos)
 * - URLs funcionales y directas de Unsplash (?auto=format&fit=crop&w=600&q=80)
 * - Renderizado dinámico de tarjetas de productos y cambio de imagen por swatches
 * - Carrito deslizante (Slide-out) sin recarga de pantalla
 * - Checkout Express por Email -> Integración Google Sheets + Pedido a WhatsApp
 * ==========================================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================================================
  // CONFIGURACIÓN DE PARÁMETROS
  // ==========================================================================
  const CONFIG = {
    // Número oficial de WhatsApp de Aromoda (código de país + área + número)
    WHATSAPP_PHONE: '5491155556789',
    
    // URL de tu Web App de Google Apps Script (cuando crees tu script en Sheets)
    GOOGLE_SHEETS_API_URL: 'https://script.google.com/macros/s/AKfycbz_AROMODA_DEMO_API/exec',
    
    // Umbral de compra para Envío Gratis
    FREE_SHIPPING_THRESHOLD: 80000
  };

  // ==========================================================================
  // ARREGLO `productos` CON MUESTRAS REALISTAS Y FOTOS FUNCIONALES DE UNSPLASH
  // ==========================================================================
  const productos = [
    {
      id: 1,
      name: "Jean Wide Leg Vintage Blue",
      category: "jeans",
      categoryName: "Jeans",
      price: 39500,
      badge: "Nuevo",
      installments: "6 cuotas sin interés",
      variants: [
        {
          colorName: "Azul Vintage",
          hex: "#293E58",
          image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Celeste Sky",
          hex: "#7998B5",
          image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Denim Noir",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 2,
      name: "Remera Oversize Lino Crudo",
      category: "remeras",
      categoryName: "Remeras",
      price: 19800,
      badge: "Básico",
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Lino Arena",
          hex: "#E8DFD8",
          image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Blanco Puro",
          hex: "#FFFFFF",
          image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Negro Clásico",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 3,
      name: "Short Sastrero Crepe Noir",
      category: "shorts",
      categoryName: "Shorts",
      price: 26500,
      badge: "Tendencia",
      installments: "6 cuotas de $4.416",
      variants: [
        {
          colorName: "Crudo Sastrería",
          hex: "#F4EFEA",
          image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Noir Profundo",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 4,
      name: "Top Halter Ribb Minimal",
      category: "tops",
      categoryName: "Tops",
      price: 15200,
      badge: "Esencial",
      installments: "3 cuotas sin interés",
      variants: [
        {
          colorName: "Negro Noche",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Blanco Nieve",
          hex: "#FFFFFF",
          image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Warm Nude",
          hex: "#D5C5B5",
          image: "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 5,
      name: "Tapado Trench Camel Sastrería",
      category: "abrigos",
      categoryName: "Abrigos",
      price: 68900,
      badge: "Destacado",
      installments: "6 cuotas de $11.483",
      variants: [
        {
          colorName: "Camel Clásico",
          hex: "#C4A482",
          image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Noir Elegance",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
        }
      ]
    },
    {
      id: 6,
      name: "Vestido Midi Lino Botellón",
      category: "vestidos",
      categoryName: "Vestidos",
      price: 44200,
      badge: "Edición Limitada",
      installments: "6 cuotas sin interés",
      variants: [
        {
          colorName: "Lino Floral",
          hex: "#E8D8CC",
          image: "https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&w=600&q=80"
        },
        {
          colorName: "Negro Noche",
          hex: "#111111",
          image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=600&q=80"
        }
      ]
    }
  ];

  // ==========================================================================
  // ESTADO LOCAL
  // ==========================================================================
  let cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');
  let currentCategory = 'todos';
  let searchQuery = '';
  let isCheckoutStep = false;

  // Registro de variantes seleccionadas en tarjeta { productId: variantIndex }
  const selectedVariants = {};
  productos.forEach(p => {
    selectedVariants[p.id] = 0;
  });

  // ==========================================================================
  // ELEMENTOS DOM
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

  // Carrito Slide-out
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

  // Formularios Extras
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
  // 1. RENDERIZADO DINÁMICO DE PRODUCTOS Y SWATCHES DE VARIANTE
  // ==========================================================================
  const renderCatalog = () => {
    if (!productsGrid) return;

    const filtered = productos.filter(product => {
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
            No se encontraron prendas en esta categoría o búsqueda.
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
            <!-- Swatches de colores que cambian la imagen -->
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
                  aria-label="Color ${v.colorName}"
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

    // Cambio suave de imagen al interactuar con los swatches
    productsGrid.querySelectorAll('.swatch-circle').forEach(swatch => {
      const handleSwatchChange = (e) => {
        e.stopPropagation();
        const pId = parseInt(swatch.dataset.productId, 10);
        const vIdx = parseInt(swatch.dataset.variantIndex, 10);
        const product = productos.find(p => p.id === pId);

        if (!product || !product.variants[vIdx]) return;

        selectedVariants[pId] = vIdx;
        const newVariant = product.variants[vIdx];

        const imgElement = document.getElementById(`product-img-${pId}`);
        if (imgElement) {
          imgElement.style.opacity = '0.35';
          setTimeout(() => {
            imgElement.src = newVariant.image;
            imgElement.alt = `${product.name} - ${newVariant.colorName}`;
            imgElement.style.opacity = '1';
          }, 140);
        }

        const colorLabel = document.getElementById(`color-label-${pId}`);
        if (colorLabel) {
          colorLabel.textContent = newVariant.colorName;
        }

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

    // Botón "+ Agregar al Carrito"
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

    const variantIndex = selectedVariants[productId] || 0;
    const variant = product.variants[variantIndex] || product.variants[0];

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

    saveCart();
    openCart(); // Despliega el panel suavemente desde la derecha
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
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    if (cartCounter) {
      cartCounter.textContent = `(${totalItems})`;
    }

    if (cartSubtotal) {
      cartSubtotal.textContent = formatPrice(subtotal);
    }

    // Actualización de la Barra de Progreso de Envío Gratis
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

    if (cart.length === 0) {
      isCheckoutStep = false;
      if (cartItemsContainer) {
        cartItemsContainer.innerHTML = `
          <div class="cart-empty-state">
            <i class="fa-solid fa-bag-shopping empty-cart-icon"></i>
            <p>Tu carrito está vacío</p>
            <button id="btn-start-shopping" class="btn-secondary">Explorar Catálogo</button>
          </div>
        `;
        document.getElementById('btn-start-shopping')?.addEventListener('click', closeCart);
      }
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Paso de Checkout Express por Email
    if (isCheckoutStep) {
      renderExpressCheckoutForm(subtotal);
      if (cartFooter) cartFooter.style.display = 'none';
      return;
    }

    // Vista Regular de Items en Carrito
    if (cartFooter) cartFooter.style.display = 'flex';

    if (cartItemsContainer) {
      cartItemsContainer.innerHTML = cart.map((item, idx) => `
        <div class="cart-item" data-index="${idx}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <span class="cart-item-category">${item.categoryName} &bull; <strong>${item.variantColor}</strong></span>
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
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
  // 3. FORMULARIO DE REGISTRO EXPRESS EN CHECKOUT + GOOGLE SHEETS + WHATSAPP
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
              placeholder="Ej: Palermo, CABA / Córdoba"
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
      submitBtn.innerHTML = '<span>Procesando pedido y registrando...</span>';
      if (statusMsg) statusMsg.textContent = 'Enviando a Google Sheets y conectando con WhatsApp...';

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

      // Guardar local y enviar a Google Sheets
      await sendOrderToGoogleSheets(orderPayload);

      // Enlace de WhatsApp
      const whatsappUrl = buildWhatsAppOrderLink({
        name,
        email,
        phone,
        address,
        cartItems: cart,
        subtotal
      });

      cart = [];
      saveCart();
      isCheckoutStep = false;
      closeCart();

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
      console.warn('Aviso: Pedido resguardado localmente. Detalle Google Sheets:', err);
    }
  };

  const buildWhatsAppOrderLink = ({ name, email, phone, address, cartItems, subtotal }) => {
    const itemsList = cartItems.map(item => 
      `• *${item.quantity}x* ${item.name}\n   └ Color: _${item.variantColor}_ | ${formatPrice(item.price * item.quantity)}`
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
💳 *Opciones:* 3 o 6 Cuotas Sin Interés / Transferencia
━━━━━━━━━━━━━━━━━━━━━━━━
¡Hola Aromoda! Acabo de registrar mi orden en la tienda web y quisiera coordinar el pago y despacho.`;

    return `https://wa.me/${CONFIG.WHATSAPP_PHONE}?text=${encodeURIComponent(rawMessage)}`;
  };

  // Eventos de Carrito
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
  // 4. FILTRADO POR CATEGORÍAS & NAVEGACIÓN
  // ==========================================================================
  const setCategory = (cat) => {
    currentCategory = cat;

    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.category === cat);
    });

    renderCatalog();
  };

  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const cat = btn.dataset.category;
      setCategory(cat);

      if (headerNavLeft && headerNavLeft.classList.contains('mobile-open')) {
        headerNavLeft.classList.remove('mobile-open');
      }

      const destSection = document.getElementById('catalogo');
      if (destSection) {
        destSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

  document.querySelectorAll('.category-card').forEach(card => {
    const handleCategoryClick = () => {
      const cat = card.dataset.category;
      if (cat) {
        setCategory(cat);
        const destSection = document.getElementById('catalogo');
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

  // Inicialización de Interfaz
  updateCartUI();
  renderCatalog();
});