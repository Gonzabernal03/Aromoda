/* ====================
   Aromoda - JS Coleccion SS27
==================== */

// CONFIG
const PRODUCTS_API_URL = '/api/productos/';
const BACKUP_SHEET_API = 'https://script.google.com/macros/s/AKfycby5vd7lQwtP7Gk__p7YO-Pe8XS-IIR0G6FyvmMBexX7LBqaNIeEPWRd1ak_gAqdlakJ/exec';
const WHATSAPP_NUMBER = '5492325590916';

// PRODUCTOS DESTACADOS HERO COLECCION SS27 (IDENTICOS A LA FOTO DE REFERENCIA)
const HERO_SS27_PRODUCTS = [
  {
    id: 101,
    name: "BUZO DONALD",
    cat: "buzos",
    price: 67425,
    oldPrice: 89900,
    badge: "25% OFF",
    taxPrice: 55723,
    description: "Buzo hoodie oversize de frisa pesada premium con estampa vintage en espalda y punos reforzados.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris Lavado", "Negro", "Crudo"],
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 8
  },
  {
    id: 102,
    name: "CAMPERA SOHO",
    cat: "camperas",
    price: 74925,
    oldPrice: 99900,
    badge: "25% OFF",
    taxPrice: 61921,
    description: "Campera liviana rompevientos cropped con capucha ajustable, cierre metalico y elastico en cintura.",
    sizes: ["S", "M", "L"],
    colors: ["Beige", "Negro", "Verde Seco"],
    images: [
      "https://images.unsplash.com/photo-1544441893-675973e31985?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 5
  },
  {
    id: 103,
    name: "REMERON FANTASY",
    cat: "remeras",
    price: 36675,
    oldPrice: 48900,
    badge: "25% OFF",
    taxPrice: 30310,
    description: "Remeron oversize 100% algodon peinado 24/1 con serigrafia artistica en frente.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Azul Noche", "Gris Plomo", "Blanco"],
    images: [
      "https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 12
  },
  {
    id: 104,
    name: "PANTALON NAIROBI",
    cat: "pantalones",
    price: 56175,
    oldPrice: 74900,
    badge: "25% OFF",
    taxPrice: 46426,
    description: "Pantalon wide leg tiro alto con caida fluida, cintura elastica y lineas laterales sutiles.",
    sizes: ["36", "38", "40", "42"],
    colors: ["Gris Melange", "Negro", "Beige"],
    images: [
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 7
  },
  {
    id: 105,
    name: "REMERON MOUSE",
    cat: "remeras",
    price: 36675,
    oldPrice: 48900,
    badge: "25% OFF",
    taxPrice: 30310,
    description: "Remera corte boxy de calce amplio confeccionada en algodon suave de exportacion.",
    sizes: ["S", "M", "L"],
    colors: ["Blanco", "Negro"],
    images: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&auto=format&fit=crop&q=80"
    ],
    stock: 10
  }
];

// ELEMENTOS DOM
const promoItems = document.querySelectorAll('.promo-item');
let promoIndex = 0;

const productSlider = document.getElementById('product-slider');
const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const resetFiltersBtn = document.getElementById('reset-filters');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');
const sliderPrev = document.getElementById('slider-prev');
const sliderNext = document.getElementById('slider-next');
const viewCarouselBtn = document.getElementById('view-carousel');
const viewGridBtn = document.getElementById('view-grid');

// MODAL
const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalCategory = document.getElementById('modal-category');
const modalDescription = document.getElementById('modal-description');
const modalPrice = document.getElementById('modal-price');
const modalTaxSubtext = document.getElementById('modal-tax-subtext');
const modalInstallments = document.getElementById('modal-installments');
const modalSizesContainer = document.getElementById('modal-sizes-container');
const modalColorsContainer = document.getElementById('modal-colors-container');
const modalSizeSelect = document.getElementById('modal-size-select');
const modalColorSelect = document.getElementById('modal-color-select');
const modalQuantity = document.getElementById('modal-quantity');
const qtyMinus = document.getElementById('qty-minus');
const qtyPlus = document.getElementById('qty-plus');
const modalCP = document.getElementById('modal-cp');
const modalCalcShipping = document.getElementById('modal-calc-shipping');
const modalShippingResult = document.getElementById('modal-shipping-result');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const buyNowBtn = document.getElementById('buy-now-btn');
const prevImageBtn = document.getElementById('prev-image');
const nextImageBtn = document.getElementById('next-image');
const similarGrid = document.querySelector('.similar-grid');

// NEWSLETTER & MODALES INSTITUCIONALES
const newsletterPopup = document.getElementById('newsletter-popup');
const newsletterClose = document.getElementById('newsletter-close');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterMsg = document.getElementById('newsletter-msg');
const nosotrosModal = document.getElementById('nosotros-modal');
const politicasModal = document.getElementById('politicas-modal');

// CARRITO
const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartDrawerCount = document.getElementById('cart-drawer-count');
const checkoutWhatsApp = document.getElementById('checkout-whatsapp');
const shippingBarFill = document.getElementById('shipping-bar-fill');
const shippingProgressText = document.getElementById('shipping-progress-text');

const cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');

let products = [];
let filteredProducts = [];
let currentCategory = 'all';
let currentSearch = '';
let modalProduct = null;
let modalImageIndex = 0;
let selectedSize = '';
let selectedColor = '';

// === ROTADOR DE BARRA SUPERIOR ===
function rotatePromo() {
  if (!promoItems.length) return;
  promoItems.forEach((el, i) => {
    el.classList.toggle('active', i === promoIndex);
  });
  promoIndex = (promoIndex + 1) % promoItems.length;
}
setInterval(rotatePromo, 4000);
rotatePromo();

// === FORMATO DE MONEDA ARGENTINA ===
function formatNumber(num) {
  return Number(num || 0).toLocaleString('es-AR', {
    maximumFractionDigits: 0
  });
}

// === CARGA DE PRODUCTOS ===
async function fetchProducts() {
  try {
    let res = await fetch(PRODUCTS_API_URL);
    if (!res.ok) throw new Error('API local error');
    let data = await res.json();
    if (!data || data.length === 0) {
      const backupRes = await fetch(BACKUP_SHEET_API);
      data = await backupRes.json();
    }
    processProducts(data);
  } catch (e) {
    console.warn('Cargando respaldo Sheet/Local:', e);
    try {
      const res = await fetch(BACKUP_SHEET_API);
      const data = await res.json();
      processProducts(data);
    } catch (err) {
      console.warn('Usando catalogo inicial SS27:', err);
      processProducts([]);
    }
  }
}

function processProducts(apiData) {
  const mappedApi = (apiData || []).map(p => {
    const price = Number(p.precio) || 0;
    const oldPrice = p.precio_ant ? Number(p.precio_ant) : null;
    let badge = p.badge ? p.badge.toUpperCase() : '';
    if (!badge && oldPrice && oldPrice > price) {
      const discountPct = Math.round((1 - price / oldPrice) * 100);
      badge = `${discountPct}% OFF`;
    }
    const sizes = p.talles
      ? (typeof p.talles === 'string' ? p.talles.split(',').map(s => s.trim()) : p.talles)
      : ['S', 'M', 'L'];
    const colors = p.colores
      ? (typeof p.colores === 'string' ? p.colores.split(',').map(c => c.trim()) : p.colores)
      : ['Unico'];

    return {
      id: Number(p.id),
      name: String(p.nombre || '').toUpperCase(),
      cat: String(p.cat || 'remeras').toLowerCase(),
      price: price,
      oldPrice: oldPrice,
      badge: badge || '25% OFF',
      taxPrice: Math.round(price / 1.21),
      description: p.descripcion || 'Prenda femenina de confeccion premium y diseno contemporaneo.',
      sizes: sizes,
      colors: colors,
      images: [p.imagen1, p.imagen2 || p.imagen1],
      stock: p.stock ? Number(p.stock) : 5,
      sold: p.vendidos ? Number(p.vendidos) : 0
    };
  });

  const existingIds = new Set(HERO_SS27_PRODUCTS.map(h => h.id));
  const filteredApi = mappedApi.filter(m => !existingIds.has(m.id));
  products = [...HERO_SS27_PRODUCTS, ...filteredApi];

  filteredProducts = [...products];
  renderSlider(filteredProducts);
}

// === RENDER DEL CATALOGO (ESTILO EXACTO REFERENCIA) ===
function renderSlider(list) {
  if (!productSlider) return;

  if (list.length === 0) {
    productSlider.innerHTML = '';
    if (noResults) noResults.hidden = false;
    return;
  }
  if (noResults) noResults.hidden = true;

  productSlider.innerHTML = '';

  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'product-card';
    card.dataset.id = p.id;

    const altImg = p.images[1] ? p.images[1] : p.images[0];
    const badgeText = p.badge || '25% OFF';
    const isSoldOut = p.stock === 0;

    card.innerHTML = `
      <div class="product-img-wrap" data-id="${p.id}">
        <span class="card-badge-blue ${isSoldOut ? 'sold-out' : ''}">
          ${isSoldOut ? 'AGOTADO' : badgeText}
        </span>
        <img src="${p.images[0]}" alt="${p.name}" class="main-image" loading="lazy" />
        <img src="${altImg}" alt="${p.name} vista 2" class="hover-image" loading="lazy" />
      </div>
      <div class="product-details-ref" data-id="${p.id}">
        <h3 class="product-ref-title">${p.name}</h3>
        <div class="product-ref-pricing">
          ${p.oldPrice ? `<span class="product-ref-oldprice">$${formatNumber(p.oldPrice)}</span>` : ''}
          <span class="product-ref-newprice">$${formatNumber(p.price)}</span>
        </div>
        <p class="product-ref-tax">Precio sin impuestos nacionales $${formatNumber(p.taxPrice || Math.round(p.price / 1.21))}</p>
        <p class="product-ref-installments">3 y 6 cuotas sin interes</p>
      </div>
    `;

    productSlider.appendChild(card);
  });
}

// === CONTROLES DE NAVEGACION DEL SLIDER (< y >) ===
if (sliderPrev && productSlider) {
  sliderPrev.addEventListener('click', () => {
    const cardWidth = productSlider.querySelector('.product-card')?.offsetWidth || 280;
    productSlider.scrollBy({ left: -(cardWidth * 2), behavior: 'smooth' });
  });
}

if (sliderNext && productSlider) {
  sliderNext.addEventListener('click', () => {
    const cardWidth = productSlider.querySelector('.product-card')?.offsetWidth || 280;
    productSlider.scrollBy({ left: cardWidth * 2, behavior: 'smooth' });
  });
}

// === SWITCHER DE VISTA: CARRUSEL / GRILLA ===
if (viewCarouselBtn && viewGridBtn && productSlider) {
  viewCarouselBtn.addEventListener('click', () => {
    viewCarouselBtn.classList.add('active');
    viewGridBtn.classList.remove('active');
    productSlider.classList.remove('grid-mode');
  });

  viewGridBtn.addEventListener('click', () => {
    viewGridBtn.classList.add('active');
    viewCarouselBtn.classList.remove('active');
    productSlider.classList.add('grid-mode');
  });
}

// === FILTRADO POR CATEGORIAS Y BUSQUEDA ===
categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = (btn.dataset.cat || 'all').toLowerCase();
    applyFilters();
  });
});

if (searchInput) {
  searchInput.addEventListener('input', () => {
    currentSearch = searchInput.value.trim().toLowerCase();
    applyFilters();
  });
}

if (resetFiltersBtn) {
  resetFiltersBtn.addEventListener('click', () => {
    if (searchInput) searchInput.value = '';
    currentSearch = '';
    currentCategory = 'all';
    categoryButtons.forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
    applyFilters();
  });
}

function applyFilters() {
  filteredProducts = products.filter(p => {
    const catMatch = currentCategory === 'all' || p.cat === currentCategory;
    const searchMatch = p.name.toLowerCase().includes(currentSearch) ||
                        p.description.toLowerCase().includes(currentSearch);
    return catMatch && searchMatch;
  });
  renderSlider(filteredProducts);
  if (productSlider) productSlider.scrollTo({ left: 0, behavior: 'smooth' });
}

// === APERTURA DE MODAL AL HACER CLICK EN TARJETA ===
document.addEventListener('click', e => {
  const card = e.target.closest('.product-card');
  if (card && (e.target.closest('.product-img-wrap') || e.target.closest('.product-details-ref'))) {
    const id = Number(card.dataset.id);
    openModalProduct(id);
  }
});

function openModalProduct(id) {
  modalProduct = products.find(p => p.id === id);
  if (!modalProduct) return;

  modalImageIndex = 0;
  updateModalContent();
  productModal.classList.remove('hidden');
}

function updateModalContent() {
  if (!modalProduct) return;

  if (modalTitle) modalTitle.textContent = modalProduct.name;
  if (modalCategory) modalCategory.textContent = `AROMODA ? ${modalProduct.cat.toUpperCase()}`;
  if (modalDescription) modalDescription.textContent = modalProduct.description;
  if (modalImage) modalImage.src = modalProduct.images[modalImageIndex];

  // Precios
  if (modalPrice) {
    modalPrice.innerHTML = `
      ${modalProduct.oldPrice ? `<span style="text-decoration:line-through; color:#777; font-size:1.1rem; margin-right:8px;">$${formatNumber(modalProduct.oldPrice)}</span>` : ''}
      <span style="color:#1e7e34; font-weight:800; font-size:1.6rem;">$${formatNumber(modalProduct.price)}</span>
    `;
  }
  if (modalTaxSubtext) {
    modalTaxSubtext.textContent = `Precio sin impuestos nacionales $${formatNumber(modalProduct.taxPrice || Math.round(modalProduct.price / 1.21))}`;
  }
  if (modalInstallments) {
    const cuota = Math.round(modalProduct.price / 3);
    modalInstallments.textContent = `3 cuotas sin interes de $${formatNumber(cuota)} (o 6 fijas)`;
  }

  // Talles en formato Chips/Pills
  selectedSize = modalProduct.sizes[0] || 'Unico';
  if (modalSizesContainer) {
    modalSizesContainer.innerHTML = modalProduct.sizes.map((s, idx) => `
      <button type="button" class="selector-pill ${idx === 0 ? 'active' : ''}" data-size="${s}">
        ${s}
      </button>
    `).join('');

    modalSizesContainer.querySelectorAll('.selector-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        modalSizesContainer.querySelectorAll('.selector-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedSize = btn.dataset.size;
        if (modalSizeSelect) modalSizeSelect.value = selectedSize;
      });
    });
  }

  // Colores en formato Chips/Pills
  selectedColor = modalProduct.colors[0] || 'Unico';
  if (modalColorsContainer) {
    modalColorsContainer.innerHTML = modalProduct.colors.map((c, idx) => `
      <button type="button" class="selector-pill ${idx === 0 ? 'active' : ''}" data-color="${c}">
        ${c}
      </button>
    `).join('');

    modalColorsContainer.querySelectorAll('.selector-pill').forEach(btn => {
      btn.addEventListener('click', () => {
        modalColorsContainer.querySelectorAll('.selector-pill').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColor = btn.dataset.color;
        if (modalColorSelect) modalColorSelect.value = selectedColor;
      });
    });
  }

  // Reset inputs
  if (modalQuantity) modalQuantity.value = 1;
  if (modalCP) modalCP.value = '';
  if (modalShippingResult) modalShippingResult.textContent = '';

  renderSimilarProducts();
}

// Navegacion de imagenes dentro del modal
if (prevImageBtn) {
  prevImageBtn.addEventListener('click', () => {
    if (!modalProduct) return;
    modalImageIndex = (modalImageIndex - 1 + modalProduct.images.length) % modalProduct.images.length;
    modalImage.src = modalProduct.images[modalImageIndex];
  });
}
if (nextImageBtn) {
  nextImageBtn.addEventListener('click', () => {
    if (!modalProduct) return;
    modalImageIndex = (modalImageIndex + 1) % modalProduct.images.length;
    modalImage.src = modalProduct.images[modalImageIndex];
  });
}

// Cantidad Stepper
if (qtyMinus && modalQuantity) {
  qtyMinus.addEventListener('click', () => {
    let val = parseInt(modalQuantity.value, 10) || 1;
    if (val > 1) modalQuantity.value = val - 1;
  });
}
if (qtyPlus && modalQuantity) {
  qtyPlus.addEventListener('click', () => {
    let val = parseInt(modalQuantity.value, 10) || 1;
    if (val < 10) modalQuantity.value = val + 1;
  });
}

// Calculador de Envios
if (modalCalcShipping && modalCP && modalShippingResult) {
  modalCalcShipping.addEventListener('click', () => {
    const cp = modalCP.value.trim();
    if (!cp) {
      modalShippingResult.textContent = 'Ingresa un codigo postal para calcular.';
      modalShippingResult.style.color = '#b33939';
      return;
    }
    const cost = cp.startsWith('1') ? 4200 : 5900;
    modalShippingResult.style.color = '#1e7e34';
    modalShippingResult.textContent = `Envio estimado: $${formatNumber(cost)} ? Llega en 2 a 5 dias habiles a tu domicilio.`;
  });
}

// Cerrar Modal
if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', () => {
    productModal.classList.add('hidden');
    modalProduct = null;
  });
}

// Productos similares
function renderSimilarProducts() {
  if (!similarGrid || !modalProduct) return;
  similarGrid.innerHTML = '';
  const similars = products
    .filter(p => p.cat === modalProduct.cat && p.id !== modalProduct.id)
    .slice(0, 4);

  similars.forEach(p => {
    const div = document.createElement('div');
    div.className = 'product-card';
    div.style.flex = '0 0 140px';
    div.innerHTML = `
      <div class="product-img-wrap" style="aspect-ratio:3/4;">
        <img src="${p.images[0]}" alt="${p.name}" />
      </div>
      <h4 style="font-size:0.78rem; text-transform:uppercase; margin-top:6px; font-weight:700;">${p.name}</h4>
      <strong style="font-size:0.85rem; color:#1e7e34;">$${formatNumber(p.price)}</strong>
    `;
    div.addEventListener('click', () => openModalProduct(p.id));
    similarGrid.appendChild(div);
  });
}

// === CARRITO DE COMPRAS ===
function saveCart() {
  localStorage.setItem('aromoda_cart', JSON.stringify(cart));
  updateCartCount();
  renderCart();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + Number(item.qty), 0);
  if (cartCount) cartCount.textContent = totalItems;
  if (cartDrawerCount) cartDrawerCount.textContent = `${totalItems} ${totalItems === 1 ? 'prenda' : 'prendas'}`;
}

function openCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');
  document.body.style.overflow = 'hidden';
  renderCart();
}

function closeCart() {
  if (!cartDrawer || !cartOverlay) return;
  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');
  document.body.style.overflow = '';
}

if (cartButton) cartButton.addEventListener('click', openCart);
if (closeCartButton) closeCartButton.addEventListener('click', closeCart);
if (cartOverlay) cartOverlay.addEventListener('click', closeCart);

function renderCart() {
  if (!cartItemsContainer) return;
  cartItemsContainer.innerHTML = '';

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = `
      <div style="text-align:center; padding: 40px 20px; color:#777;">
        <p style="font-size:1.1rem; font-weight:600; color:#222; margin-bottom:8px;">Tu carrito esta vacio</p>
        <p style="font-size:0.9rem;">Agrega las prendas que mas te gusten de la coleccion.</p>
      </div>
    `;
    if (cartTotalElement) cartTotalElement.textContent = '$0';
    if (cartSubtotalElement) cartSubtotalElement.textContent = '$0';
    if (shippingBarFill) shippingBarFill.style.width = '0%';
    if (shippingProgressText) shippingProgressText.innerHTML = '?Envio gratis superando $80.000!';
    return;
  }

  cart.forEach((item, index) => {
    const itemEl = document.createElement('div');
    itemEl.className = 'cart-item';
    itemEl.style.cssText = 'display:flex; gap:14px; padding:16px 0; border-bottom:1px solid #eee; align-items:center;';

    itemEl.innerHTML = `
      <img src="${item.image || ''}" alt="${item.name}" style="width:65px; height:85px; object-fit:cover; border-radius:4px;" />
      <div style="flex:1;">
        <h4 style="font-size:0.88rem; font-weight:700; text-transform:uppercase; margin-bottom:4px;">${item.name}</h4>
        <p style="font-size:0.75rem; color:#666; margin:0;">Talle: <strong>${item.size}</strong> ${item.color ? `? Color: <strong>${item.color}</strong>` : ''}</p>
        <p style="font-size:0.85rem; font-weight:700; color:#1e7e34; margin:4px 0;">$${formatNumber(item.price)}</p>
        <div style="display:flex; align-items:center; gap:8px; margin-top:6px;">
          <button type="button" class="cart-qty-btn cart-minus" data-index="${index}" style="width:24px; height:24px; border:1px solid #ccc; background:#fff; border-radius:3px; cursor:pointer;">-</button>
          <span style="font-size:0.85rem; font-weight:700;">${item.qty}</span>
          <button type="button" class="cart-qty-btn cart-plus" data-index="${index}" style="width:24px; height:24px; border:1px solid #ccc; background:#fff; border-radius:3px; cursor:pointer;">+</button>
          <button type="button" class="cart-remove" data-index="${index}" style="margin-left:auto; border:none; background:transparent; color:#b33939; font-size:0.75rem; cursor:pointer; text-decoration:underline;">Eliminar</button>
        </div>
      </div>
    `;
    cartItemsContainer.appendChild(itemEl);
  });

  const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
  if (cartTotalElement) cartTotalElement.textContent = `$${formatNumber(total)}`;
  if (cartSubtotalElement) cartSubtotalElement.textContent = `$${formatNumber(total)}`;

  // Barra de Envio Gratis ($80.000)
  const freeThreshold = 80000;
  if (total >= freeThreshold) {
    if (shippingBarFill) shippingBarFill.style.width = '100%';
    if (shippingProgressText) shippingProgressText.innerHTML = '?? ?Felicidades! Tenes <strong>ENVIO GRATIS</strong>';
  } else {
    const diff = freeThreshold - total;
    const pct = Math.min(100, Math.round((total / freeThreshold) * 100));
    if (shippingBarFill) shippingBarFill.style.width = `${pct}%`;
    if (shippingProgressText) shippingProgressText.innerHTML = `?Te faltan <strong>$${formatNumber(diff)}</strong> para acceder al Envio Gratis!`;
  }
}

// Eventos dentro de items de carrito
if (cartItemsContainer) {
  cartItemsContainer.addEventListener('click', e => {
    const minus = e.target.closest('.cart-minus');
    const plus = e.target.closest('.cart-plus');
    const remove = e.target.closest('.cart-remove');

    if (minus) {
      const idx = Number(minus.dataset.index);
      if (cart[idx]) {
        cart[idx].qty -= 1;
        if (cart[idx].qty <= 0) cart.splice(idx, 1);
        saveCart();
      }
    }
    if (plus) {
      const idx = Number(plus.dataset.index);
      if (cart[idx]) {
        cart[idx].qty += 1;
        saveCart();
      }
    }
    if (remove) {
      const idx = Number(remove.dataset.index);
      if (cart[idx]) {
        cart.splice(idx, 1);
        saveCart();
      }
    }
  });
}

// Agregar al carrito
if (addToCartBtn) {
  addToCartBtn.addEventListener('click', () => {
    if (!modalProduct) return;
    const qty = parseInt(modalQuantity?.value || '1', 10);
    const key = `${modalProduct.id}-${selectedSize}-${selectedColor}`;

    const existing = cart.find(item => item.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        key: key,
        id: modalProduct.id,
        name: modalProduct.name,
        size: selectedSize,
        color: selectedColor,
        price: Number(modalProduct.price),
        qty: qty,
        image: modalProduct.images[0]
      });
    }
    saveCart();
    productModal.classList.add('hidden');
    openCart();
  });
}

// Comprar ahora
if (buyNowBtn) {
  buyNowBtn.addEventListener('click', () => {
    if (!modalProduct) return;
    const qty = parseInt(modalQuantity?.value || '1', 10);
    const key = `${modalProduct.id}-${selectedSize}-${selectedColor}`;

    const existing = cart.find(item => item.key === key);
    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        key: key,
        id: modalProduct.id,
        name: modalProduct.name,
        size: selectedSize,
        color: selectedColor,
        price: Number(modalProduct.price),
        qty: qty,
        image: modalProduct.images[0]
      });
    }
    saveCart();
    productModal.classList.add('hidden');
    openCart();
  });
}

// Checkout WhatsApp
if (checkoutWhatsApp) {
  checkoutWhatsApp.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Tu carrito esta vacio.');
      return;
    }

    let message = '?? ?Hola AROMODA! Quiero realizar el siguiente pedido:

';
    cart.forEach(item => {
      message += `? ${item.name} | Talle: ${item.size} | Color: ${item.color} | Cantidad: ${item.qty} | $${formatNumber(item.price * item.qty)}
`;
    });

    const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.qty)), 0);
    message += `
?? TOTAL: $${formatNumber(total)}`;
    if (total >= 80000) {
      message += ` (?Con Envio Gratis!)`;
    }
    message += `

Por favor confirmame disponibilidad y medios de pago. ?Muchas gracias!`;

    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  });
}

// === NEWSLETTER Y MODALES ===
let newsletterShown = false;
window.addEventListener('load', () => {
  if (!newsletterShown) {
    setTimeout(() => {
      if (newsletterPopup) newsletterPopup.classList.remove('hidden');
      newsletterShown = true;
    }, 4500);
  }
});

if (newsletterClose) {
  newsletterClose.addEventListener('click', () => {
    if (newsletterPopup) newsletterPopup.classList.add('hidden');
  });
}

if (newsletterForm) {
  newsletterForm.addEventListener('submit', async e => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!email || !email.includes('@')) {
      newsletterMsg.textContent = 'Por favor, ingresa un email valido.';
      newsletterMsg.style.color = '#b33939';
      return;
    }
    try {
      await fetch('/api/newsletter/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      newsletterMsg.textContent = '?Gracias por suscribirte! Recibiras tu 10% OFF en tu correo.';
      newsletterMsg.style.color = '#1e7e34';
      newsletterEmail.value = '';
    } catch {
      newsletterMsg.textContent = '?Gracias por unirte al club AROMODA!';
      newsletterMsg.style.color = '#1e7e34';
      newsletterEmail.value = '';
    }
  });
}

// Modales institucionales
document.querySelectorAll('a[href="sobre-nosotros.html"]').forEach(a => {
  a.addEventListener('click', e => {
    if (nosotrosModal) {
      e.preventDefault();
      nosotrosModal.classList.remove('hidden');
    }
  });
});
document.querySelectorAll('a[href="politicas-devolucion.html"]').forEach(a => {
  a.addEventListener('click', e => {
    if (politicasModal) {
      e.preventDefault();
      politicasModal.classList.remove('hidden');
    }
  });
});

document.querySelectorAll('.modal-close, .modal-backdrop').forEach(el => {
  el.addEventListener('click', () => {
    [productModal, newsletterPopup, nosotrosModal, politicasModal].forEach(m => {
      if (m) m.classList.add('hidden');
    });
  });
});

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    [productModal, newsletterPopup, nosotrosModal, politicasModal].forEach(m => {
      if (m) m.classList.add('hidden');
    });
    closeCart();
  }
});

// HERO BACKGROUND SLIDESHOW
const heroBg = document.querySelector('.hero-bg');
const heroImages = [
  'https://i.postimg.cc/6QqmqFpG/of.jpg',
  'https://i.postimg.cc/6pPJnFp3/hoy7.jpg',
  'https://i.postimg.cc/WzTQsvXX/e3bc7f60-c25e-4b18-bf00-feb454af5ab9.jpg'
];
let heroIndex = 0;
function changeHeroImage() {
  if (!heroBg) return;
  heroBg.style.backgroundImage = `url(${heroImages[heroIndex]})`;
  heroIndex = (heroIndex + 1) % heroImages.length;
}
changeHeroImage();
setInterval(changeHeroImage, 4000);

// INICIALIZACION
fetchProducts();
updateCartCount();
renderCart();
