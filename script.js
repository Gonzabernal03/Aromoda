/**
 * AROMODA - JAVASCRIPT VANILLA
 * Catálogo, filtros por categoría, búsqueda rápida,
 * carrito interactivo con drawer lateral y redirección a Correo Argentino.
 */

document.addEventListener('DOMContentLoaded', () => {

  // ==========================================
  // DATOS DE LAS PRENDAS
  // ==========================================
  const PRODUCTS = [
    {
      id: 1,
      name: "Jean Wide Leg Denim Vintage",
      category: "jeans",
      categoryName: "Jeans",
      price: 39500,
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?q=80&w=800&auto=format&fit=crop",
      badge: "Nuevo",
      installments: "6 cuotas de $6.583"
    },
    {
      id: 2,
      name: "Remera Oversize Lino Beige",
      category: "remeras",
      categoryName: "Remeras",
      price: 19800,
      image: "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800&auto=format&fit=crop",
      badge: "Básico",
      installments: "3 cuotas sin interés"
    },
    {
      id: 3,
      name: "Short Sastrero Crepe Crudo",
      category: "shorts",
      categoryName: "Shorts",
      price: 26500,
      image: "https://images.unsplash.com/photo-1591195853828-11db59a44f6b?q=80&w=800&auto=format&fit=crop",
      badge: "Tendencia",
      installments: "6 cuotas de $4.416"
    },
    {
      id: 4,
      name: "Musculosa Ribb Escote Halter",
      category: "musculosas",
      categoryName: "Musculosas",
      price: 15200,
      image: "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?q=80&w=800&auto=format&fit=crop",
      badge: "Esencial",
      installments: "3 cuotas sin interés"
    },
    {
      id: 5,
      name: "Pantalón Palazzo Noir Sastrería",
      category: "pantalones",
      categoryName: "Pantalones",
      price: 37900,
      image: "https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800&auto=format&fit=crop",
      badge: "Destacado",
      installments: "6 cuotas de $6.316"
    },
    {
      id: 6,
      name: "Jean Mom Fit Clásico Celeste",
      category: "jeans",
      categoryName: "Jeans",
      price: 36000,
      image: "https://images.unsplash.com/photo-1582418702059-97ebafb35d09?q=80&w=800&auto=format&fit=crop",
      badge: null,
      installments: "6 cuotas sin interés"
    },
    {
      id: 7,
      name: "Remera Pima Cotton Blanca",
      category: "remeras",
      categoryName: "Remeras",
      price: 17500,
      image: "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=800&auto=format&fit=crop",
      badge: "Básico",
      installments: "3 cuotas sin interés"
    },
    {
      id: 8,
      name: "Musculosa Satén Elegance Nude",
      category: "musculosas",
      categoryName: "Musculosas",
      price: 21000,
      image: "https://images.unsplash.com/photo-1618244972963-dbee1a7edc95?q=80&w=800&auto=format&fit=crop",
      badge: "Edición Limitada",
      installments: "6 cuotas de $3.500"
    },
    {
      id: 9,
      name: "Short Denim Ripped Clásico",
      category: "shorts",
      categoryName: "Shorts",
      price: 24900,
      image: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?q=80&w=800&auto=format&fit=crop",
      badge: null,
      installments: "3 cuotas sin interés"
    },
    {
      id: 10,
      name: "Pantalón Straight Lino Arena",
      category: "pantalones",
      categoryName: "Pantalones",
      price: 34500,
      image: "https://images.unsplash.com/photo-1551803091-e20673f15770?q=80&w=800&auto=format&fit=crop",
      badge: "Favorito",
      installments: "6 cuotas de $5.750"
    }
  ];

  // Estado
  let cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');
  let currentCategory = 'todos';
  let searchQuery = '';

  // Elementos DOM
  const productsGrid = document.getElementById('products-grid');
  const filterBtns = document.querySelectorAll('.filter-btn');
  const searchInput = document.getElementById('search-input');
  const filterStatusText = document.getElementById('filter-status-text');

  // Drawer Carrito
  const btnOpenCart = document.getElementById('btn-open-cart');
  const btnCloseCart = document.getElementById('btn-close-cart');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartDrawerOverlay = document.getElementById('cart-drawer-overlay');
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartCounter = document.getElementById('cart-counter');
  const cartSubtotal = document.getElementById('cart-subtotal');
  const btnCheckout = document.getElementById('btn-checkout');
  const btnContinueShopping = document.getElementById('btn-continue-shopping');
  const btnStartShopping = document.getElementById('btn-start-shopping');

  // Modal Registro
  const btnOpenRegister = document.getElementById('btn-open-register');
  const btnCloseRegister = document.getElementById('btn-close-register');
  const registerModalOverlay = document.getElementById('register-modal-overlay');
  const registerForm = document.getElementById('register-form');

  // Formulario Correo Argentino
  const trackingForm = document.getElementById('tracking-form');
  const trackingCodeInput = document.getElementById('tracking-code');

  // Formato Moneda ARS
  const formatPrice = (amount) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // ==========================================
  // RENDERIZADO DEL CATÁLOGO
  // ==========================================
  const renderCatalog = () => {
    const filtered = PRODUCTS.filter(product => {
      const matchesCategory = currentCategory === 'todos' || product.category === currentCategory;
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            product.categoryName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });

    if (searchQuery.trim() !== '') {
      filterStatusText.textContent = `Resultados para "${searchQuery}" (${filtered.length} prendas)`;
    } else if (currentCategory === 'todos') {
      filterStatusText.textContent = `Mostrando todas las prendas (${filtered.length})`;
    } else {
      filterStatusText.textContent = `Prendas en categoría ${currentCategory.toUpperCase()} (${filtered.length})`;
    }

    if (filtered.length === 0) {
      productsGrid.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <p style="font-size: 1.1rem; color: #888; margin-bottom: 16px;">No se encontraron prendas con los criterios seleccionados.</p>
          <button id="btn-reset-filters" class="btn-secondary">Restablecer filtros</button>
        </div>
      `;
      document.getElementById('btn-reset-filters')?.addEventListener('click', () => {
        currentCategory = 'todos';
        searchQuery = '';
        if (searchInput) searchInput.value = '';
        filterBtns.forEach(btn => btn.classList.toggle('active', btn.dataset.category === 'todos'));
        renderCatalog();
      });
      return;
    }

    productsGrid.innerHTML = filtered.map(product => `
      <article class="product-card" data-id="${product.id}">
        <div class="product-img-wrapper">
          ${product.badge ? `<span class="product-badge">${product.badge}</span>` : ''}
          <img src="${product.image}" alt="${product.name}" class="product-img" loading="lazy">
        </div>
        <div class="product-info">
          <span class="product-category">${product.categoryName}</span>
          <h3 class="product-title">${product.name}</h3>
          <div class="product-price-box">
            <span class="product-price">${formatPrice(product.price)}</span>
            <span class="product-installments">${product.installments}</span>
          </div>
          <button class="btn-add-to-cart" data-id="${product.id}">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <line x1="12" y1="5" x2="12" y2="19"></line>
              <line x1="5" y1="12" x2="19" y2="12"></line>
            </svg>
            Agregar al Carrito
          </button>
        </div>
      </article>
    `).join('');

    productsGrid.querySelectorAll('.btn-add-to-cart').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = parseInt(e.currentTarget.dataset.id, 10);
        addToCart(id);
      });
    });
  };

  // ==========================================
  // FILTRADO POR CATEGORÍAS
  // ==========================================
  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      currentCategory = btn.dataset.category;
      renderCatalog();
    });
  });

  // ==========================================
  // BUSCADOR EN VIVO
  // ==========================================
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.trim();
      renderCatalog();
    });
  }

  // ==========================================
  // GESTIÓN DEL CARRITO
  // ==========================================
  const saveCart = () => {
    localStorage.setItem('aromoda_cart', JSON.stringify(cart));
    updateCartUI();
  };

  const addToCart = (productId) => {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const existing = cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += 1;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        categoryName: product.categoryName,
        quantity: 1
      });
    }

    saveCart();
    triggerCartBadgeBump();
    openCart();
  };

  const changeQuantity = (productId, delta) => {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    item.quantity += delta;
    if (item.quantity <= 0) {
      cart = cart.filter(i => i.id !== productId);
    }
    saveCart();
  };

  const removeFromCart = (productId) => {
    cart = cart.filter(i => i.id !== productId);
    saveCart();
  };

  const triggerCartBadgeBump = () => {
    cartCounter.classList.add('bump');
    setTimeout(() => cartCounter.classList.remove('bump'), 300);
  };

  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCounter.textContent = totalItems;

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    cartSubtotal.textContent = formatPrice(subtotal);

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = `
        <div class="cart-empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" class="empty-cart-icon">
            <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <path d="M16 10a4 4 0 0 1-8 0"></path>
          </svg>
          <p>Tu carrito está vacío</p>
          <button id="btn-start-shopping-inner" class="btn-secondary">Explorar Catálogo</button>
        </div>
      `;
      document.getElementById('btn-start-shopping-inner')?.addEventListener('click', closeCart);
      btnCheckout.disabled = true;
      btnCheckout.style.opacity = '0.5';
      btnCheckout.style.cursor = 'not-allowed';
    } else {
      btnCheckout.disabled = false;
      btnCheckout.style.opacity = '1';
      btnCheckout.style.cursor = 'pointer';

      cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-id="${item.id}">
          <img src="${item.image}" alt="${item.name}" class="cart-item-thumb">
          <div class="cart-item-details">
            <span class="cart-item-category">${item.categoryName}</span>
            <h4 class="cart-item-title">${item.name}</h4>
            <span class="cart-item-price">${formatPrice(item.price * item.quantity)}</span>
            <div class="cart-qty-control">
              <button class="qty-btn btn-qty-minus" data-id="${item.id}" aria-label="Reducir cantidad">-</button>
              <span class="qty-number">${item.quantity}</span>
              <button class="qty-btn btn-qty-plus" data-id="${item.id}" aria-label="Aumentar cantidad">+</button>
            </div>
          </div>
          <button class="btn-remove-item" data-id="${item.id}" aria-label="Eliminar producto">
            <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="3 6 5 6 21 6"></polyline>
              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
          </button>
        </div>
      `).join('');

      cartItemsContainer.querySelectorAll('.btn-qty-minus').forEach(b => {
        b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.id, 10), -1));
      });
      cartItemsContainer.querySelectorAll('.btn-qty-plus').forEach(b => {
        b.addEventListener('click', () => changeQuantity(parseInt(b.dataset.id, 10), 1));
      });
      cartItemsContainer.querySelectorAll('.btn-remove-item').forEach(b => {
        b.addEventListener('click', () => removeFromCart(parseInt(b.dataset.id, 10)));
      });
    }
  };

  // Abrir y Cerrar Drawer
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
  };

  btnOpenCart?.addEventListener('click', openCart);
  btnCloseCart?.addEventListener('click', closeCart);
  cartDrawerOverlay?.addEventListener('click', closeCart);
  btnContinueShopping?.addEventListener('click', closeCart);
  btnStartShopping?.addEventListener('click', closeCart);

  // Finalizar Compra
  btnCheckout?.addEventListener('click', () => {
    if (cart.length === 0) return;
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    alert(`¡Gracias por tu compra en AROMODA!\n\nTotal a pagar: ${formatPrice(subtotal)}\nSerás redirigida a la pasarela de pago.`);
    cart = [];
    saveCart();
    closeCart();
  });

  // ==========================================
  // MODAL DE REGISTRO
  // ==========================================
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
    
    alert(`¡Bienvenida a Aromoda, ${name}!\nTu cupón del 15% OFF ha sido enviado a: ${email}`);
    registerForm.reset();
    closeRegisterModal();
  });

  // Cerrar con tecla Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeRegisterModal();
    }
  });

  // ==========================================
  // CONSULTA DE GUÍA - CORREO ARGENTINO
  // ==========================================
  if (trackingForm) {
    trackingForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const rawCode = trackingCodeInput.value.trim().toUpperCase();
      
      if (!rawCode) {
        alert('Por favor ingresá tu código de seguimiento.');
        return;
      }

      // Redirección oficial a Correo Argentino
      const officialUrl = `https://www.correoargentino.com.ar/formularios/ondnc`;
      
      const confirmRedirect = confirm(
        `Vas a consultar el envío con código "${rawCode}".\n\nSerás redirigida al portal oficial de Correo Argentino.\n¿Deseás continuar?`
      );

      if (confirmRedirect) {
        window.open(officialUrl, '_blank', 'noopener,noreferrer');
      }
    });
  }

  // Carga inicial
  updateCartUI();
  renderCatalog();
});
// ==========================================
// CONEXIÓN CON GOOGLE SHEETS
// ==========================================

// Reemplazá este enlace entre comillas por la URL que copiaste en el Paso 3
const API_URL_SHEETS = "https://script.google.com/macros/s/AKfycbw2PJrI441akHW3JA3QjLSD1VfTx5328zxp95evrJWBXj8dlNFg9rY9bqwTAfH22BLC/exec";

// Función para enviar registro de cliente a Google Sheets
function enviarClienteAGoogle(nombre, apellido, email, telefono) {
  fetch(API_URL_SHEETS, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "registro",
      nombre: nombre,
      apellido: apellido,
      email: email,
      telefono: telefono
    })
  });
}

// Función para enviar venta a Google Sheets
function enviarVentaAGoogle(cliente, email, productos, total) {
  fetch(API_URL_SHEETS, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      tipo: "venta",
      cliente: cliente,
      email: email,
      productos: productos,
      total: total
    })
  });
}