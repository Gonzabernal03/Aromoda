/* ====================
   Aromoda - JS
==================== */

// CONFIG
const PRODUCTS_API_URL = '/api/productos/';
const BACKUP_SHEET_API = 'https://script.google.com/macros/s/AKfycby5vd7lQwtP7Gk__p7YO-Pe8XS-IIR0G6FyvmMBexX7LBqaNIeEPWRd1ak_gAqdlakJ/exec';
const SHEET_API_BASE = PRODUCTS_API_URL;
const WHATSAPP_NUMBER = '5492325590916';

// ELEMENTS
const promoItems = document.querySelectorAll('.promo-item');
let promoIndex = 0;

const productGrid = document.getElementById('product-grid');
const noResults = document.getElementById('no-results');
const resetFiltersBtn = document.getElementById('reset-filters');
const searchInput = document.getElementById('search');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartButton = document.getElementById('cart-button');
const cartCount = document.getElementById('cart-count');

const productModal = document.getElementById('product-modal');
const modalCloseBtn = document.getElementById('modal-close');
const modalImage = document.getElementById('modal-image');
const modalTitle = document.getElementById('modal-title');
const modalDescription = document.getElementById('modal-description');
const modalSizeSelect = document.getElementById('modal-size-select');
const modalColorSelect = document.getElementById('modal-color-select');
const modalQuantity = document.getElementById('modal-quantity');
const modalCP = document.getElementById('modal-cp');
const modalCalcShipping = document.getElementById('modal-calc-shipping');
const modalShippingResult = document.getElementById('modal-shipping-result');
const addToCartBtn = document.getElementById('add-to-cart-btn');
const buyNowBtn = document.getElementById('buy-now-btn');
const similarGrid = document.querySelector('#modal-similar-products .similar-grid');

const newsletterPopup = document.getElementById('newsletter-popup');
const newsletterClose = document.getElementById('newsletter-close');
const newsletterForm = document.getElementById('newsletter-form');
const newsletterEmail = document.getElementById('newsletter-email');
const newsletterMsg = document.getElementById('newsletter-msg');

const trustBadges = document.querySelector('.trust-badges');

const nosotrosModal = document.getElementById('nosotros-modal');
const politicasModal = document.getElementById('politicas-modal');

const openNosotrosBtns = document.querySelectorAll('#open-nosotros, #open-nosotros-footer');
const openPoliticasBtns = document.querySelectorAll('#open-politicas, #open-politicas-footer');

const cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');

let products = [];
let filteredProducts = [];
let currentCategory = 'all';
let currentSearch = '';
let modalProduct = null;
let modalImageIndex = 0;

// === PROMO BAR ROTATOR ===
function rotatePromo() {
  promoItems.forEach((el, i) => {
    el.classList.toggle('active', i === promoIndex);
  });
  promoIndex = (promoIndex + 1) % promoItems.length;
}
setInterval(rotatePromo, 4000);
rotatePromo();

// === FETCH PRODUCTS ===
async function fetchProducts() {
  try {
    let res = await fetch(PRODUCTS_API_URL);
    if (!res.ok) throw new Error('API local error');
    let data = await res.json();
    if (!data || data.length === 0) {
      const backupRes = await fetch(BACKUP_SHEET_API);
      data = await backupRes.json();
    }
    mapAndRenderProducts(data);
  } catch(e) {
    console.warn('Cargando desde fuente de respaldo:', e);
    try {
      const res = await fetch(BACKUP_SHEET_API);
      const data = await res.json();
      mapAndRenderProducts(data);
    } catch(err) {
      productGrid.innerHTML = '<p>Error cargando productos</p>';
      console.error('Error fetching products:', err);
    }
  }
}

function mapAndRenderProducts(data) {
  products = data.map(p => ({
    id: Number(p.id),
    name: p.nombre,
    cat: (p.cat || '').toLowerCase(),
    price: Number(p.precio),
    oldPrice: p.precio_ant ? Number(p.precio_ant) : null,
    badge: p.badge ? p.badge.toLowerCase() : null,
    description: p.descripcion,
    sizes: p.talles ? (typeof p.talles === 'string' ? p.talles.split(',').map(s => s.trim()) : p.talles) : ['Único'],
    colors: p.colores ? (typeof p.colores === 'string' ? p.colores.split(',').map(c => c.trim()) : p.colores) : ['Único'],
    images: [p.imagen1, p.imagen2],
    stock: p.stock ? Number(p.stock) : 0,
    sold: p.vendidos ? Number(p.vendidos) : 0,
  }));
  filteredProducts = [...products];
  renderProducts(filteredProducts);
}

// === RENDER PRODUCTS GRID (D2C Minimalist Luxury) ===
function renderProducts(list) {
  if (list.length === 0) {
    productGrid.innerHTML = '';
    noResults.hidden = false;
    return;
  }
  noResults.hidden = true;
  productGrid.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.classList.add('product-card');
    card.dataset.id = p.id;

    // Badges minimalistas de lujo
    let badgeText = '';
    let isSoldOut = p.stock === 0;
    if (isSoldOut) {
      badgeText = 'AGOTADO';
    } else if (p.badge === 'nuevo' || p.badge === 'new in') {
      badgeText = 'NEW';
    } else if (p.badge === 'oferta' || p.badge === '30% off') {
      badgeText = 'SALE';
    } else if (p.badge === 'hot') {
      badgeText = 'BESTSELLER';
    }

    const sizesChips = p.sizes && p.sizes.length 
      ? p.sizes.map(s => `<span class="quick-size-chip" data-size="${s}">${s}</span>`).join('') 
      : '<span class="quick-size-chip" data-size="Único">Único</span>';

    const altImg = p.images[1] ? p.images[1] : p.images[0];
    const installmentPrice = Math.round(p.price / 3);

    card.innerHTML = `
      <div class="product-img-wrapper" data-id="${p.id}">
        ${badgeText ? `<span class="product-badge-pill ${isSoldOut ? 'sold-out' : ''}">${badgeText}</span>` : ''}
        <img src="${p.images[0]}" alt="${p.name}" class="product-img main-image" loading="lazy" />
        <img src="${altImg}" alt="${p.name} vista editorial" class="product-img hover-image" loading="lazy" />
        
        <div class="product-quick-bar" data-id="${p.id}">
          <span class="quick-bar-text">Seleccionar</span>
          <div class="quick-sizes-list">
            ${sizesChips}
          </div>
        </div>
      </div>
      
      <div class="product-info-wrap" data-id="${p.id}">
        <div class="product-meta-row">
          <span class="product-card-category">${p.cat}</span>
          ${p.stock > 0 && p.stock <= 3 ? '<span style="font-size:0.62rem; color:var(--danger); font-weight:600;">Últimas unidades</span>' : ''}
        </div>
        <h3 class="product-card-title">${p.name}</h3>
        <div class="product-price-row">
          <span class="current-price">$${p.price.toLocaleString()}</span>
          ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <div class="product-installments-micro">
          3 cuotas sin interés de $${installmentPrice.toLocaleString()}
        </div>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// === EVENT LISTENERS ===
productGrid.addEventListener('click', e => {
  const card = e.target.closest('.product-card');
  if (!card) return;
  const id = Number(card.dataset.id);

  // Si clickea sobre un talle directo
  const chip = e.target.closest('.quick-size-chip');
  if (chip) {
    const size = chip.dataset.size;
    openModalProduct(id, size);
    return;
  }

  openModalProduct(id);
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    applyFilters();
  });
});

// Enlace de categorías en el header minimalista
document.querySelectorAll('.header-nav .nav-link[data-cat]').forEach(link => {
  link.addEventListener('click', (e) => {
    const cat = link.dataset.cat;
    currentCategory = cat;
    categoryButtons.forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
    applyFilters();
    const catalogElem = document.getElementById('catalog');
    if (catalogElem) {
      catalogElem.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

searchInput.addEventListener('input', () => {
  currentSearch = searchInput.value.trim().toLowerCase();
  applyFilters();
});

resetFiltersBtn?.addEventListener('click', () => {
  searchInput.value = '';
  currentSearch = '';
  currentCategory = 'all';
  categoryButtons.forEach(b => b.classList.toggle('active', b.dataset.cat === 'all'));
  applyFilters();
});

function applyFilters() {
  filteredProducts = products.filter(p => {
    const catMatch = currentCategory === 'all' || p.cat === currentCategory;
    const searchMatch = p.name.toLowerCase().includes(currentSearch) || p.description.toLowerCase().includes(currentSearch);
    return catMatch && searchMatch;
  });
  renderProducts(filteredProducts);
}

// === MODAL PRODUCT DETAIL ===
function openModalProduct(id, preselectedSize = null) {
  modalProduct = products.find(p => p.id === id);
  if(!modalProduct) return;

  modalImageIndex = 0;
  updateModalContent();
  if (preselectedSize && modalSizeSelect) {
    modalSizeSelect.value = preselectedSize;
  }
  productModal.classList.remove('hidden');
}

function updateModalContent() {
  modalTitle.textContent = modalProduct.name;
  modalDescription.textContent = modalProduct.description;
  modalImage.src = modalProduct.images[modalImageIndex];
  // Sizes
  modalSizeSelect.innerHTML = '';
  modalProduct.sizes.forEach(s => {
    modalSizeSelect.innerHTML += `<option value="${s}">${s}</option>`;
  });
  // Colors
  modalColorSelect.innerHTML = '';
  if(modalProduct.colors.length) {
    modalProduct.colors.forEach(c => {
      modalColorSelect.innerHTML += `<option value="${c}">${c}</option>`;
    });
  } else {
    modalColorSelect.innerHTML = '<option value="Único">Único</option>';
  }
  // Reset quantity and shipping
  modalQuantity.value = 1;
  modalCP.value = '';
  modalShippingResult.textContent = '';

  // Actualizar precio y cuotas
  updateModalPrice();

  // Render similares
  renderSimilarProducts();
}

// Función para actualizar el precio y cálculo de cuotas
function updateModalPrice() {
  const priceElement = document.getElementById('modal-price');
  const installmentsElement = document.getElementById('modal-installments');
  const price = modalProduct.price;

  priceElement.textContent = `$${price.toLocaleString()}`;

  // Cálculo cuotas (ejemplo 3 cuotas sin interés)
  const installments = 3;
  const installmentAmount = price / installments;
  installmentsElement.textContent = `${installments} cuotas sin interés de $${installmentAmount.toLocaleString(undefined, {minimumFractionDigits: 2})}`;
}

modalCloseBtn.addEventListener('click', () => {
  productModal.classList.add('hidden');
  modalProduct = null;
});

document.getElementById('prev-image').addEventListener('click', () => {
  if(!modalProduct) return;
  modalImageIndex = (modalImageIndex -1 + modalProduct.images.length) % modalProduct.images.length;
  modalImage.src = modalProduct.images[modalImageIndex];
});
document.getElementById('next-image').addEventListener('click', () => {
  if(!modalProduct) return;
  modalImageIndex = (modalImageIndex +1) % modalProduct.images.length;
  modalImage.src = modalProduct.images[modalImageIndex];
});

// SHIPPING CALCULATOR (modal)
modalCalcShipping.addEventListener('click', () => {
  const cp = modalCP.value.trim();
  if(!cp) {
    modalShippingResult.textContent = 'Por favor ingresa un código postal.';
    return;
  }
  let base = 4000; // base estimado
  // Método simple basado en peso aproximado del producto y tipo envío omitido por simplicidad
  modalShippingResult.textContent = `Costo estimado: $${base.toLocaleString()} - 3 a 7 días hábiles`;
});

// === CART LOGIC ===

// ==========================================
// ELEMENTOS DEL CARRITO
// ==========================================

const cartDrawer = document.getElementById('cart-drawer');
const cartOverlay = document.getElementById('cart-overlay');
const closeCartButton = document.getElementById('close-cart');

const cartItemsContainer = document.getElementById('cart-items');
const cartTotalElement = document.getElementById('cart-total');

const checkoutWhatsApp = document.getElementById('checkout-whatsapp');


// ==========================================
// GUARDAR CARRITO
// ==========================================

function saveCart() {

  localStorage.setItem(
    'aromoda_cart',
    JSON.stringify(cart)
  );

  updateCartCount();

  renderCart();
}


// ==========================================
// CONTADOR
// ==========================================

function updateCartCount() {

  const totalItems = cart.reduce(
    (sum, item) => sum + Number(item.qty),
    0
  );

  cartCount.textContent = totalItems;
}


// ==========================================
// ABRIR CARRITO
// ==========================================

function openCart() {

  if (!cartDrawer || !cartOverlay) {
    console.error('No se encontró el carrito en el HTML.');
    return;
  }

  cartDrawer.classList.add('open');
  cartOverlay.classList.add('open');

  document.body.style.overflow = 'hidden';

  renderCart();
}


// ==========================================
// CERRAR CARRITO
// ==========================================

function closeCart() {

  if (!cartDrawer || !cartOverlay) return;

  cartDrawer.classList.remove('open');
  cartOverlay.classList.remove('open');

  document.body.style.overflow = '';
}


// ==========================================
// BOTÓN DEL CARRITO
// ==========================================

cartButton.addEventListener('click', openCart);


// ==========================================
// CERRAR
// ==========================================

if (closeCartButton) {
  closeCartButton.addEventListener('click', closeCart);
}

if (cartOverlay) {
  cartOverlay.addEventListener('click', closeCart);
}


// ==========================================
// MOSTRAR CARRITO
// ==========================================

function renderCart() {

  if (!cartItemsContainer) return;

  cartItemsContainer.innerHTML = '';


  if (cart.length === 0) {

    cartItemsContainer.innerHTML = `
      <div class="cart-empty">
        <strong>Tu carrito está vacío</strong>
        <p>Agregá productos para comenzar tu compra.</p>
      </div>
    `;

    if (cartTotalElement) {
      cartTotalElement.textContent = '$0';
    }

    return;
  }


  cart.forEach((item, index) => {

    const itemElement = document.createElement('div');

    itemElement.className = 'cart-item';


    itemElement.innerHTML = `

      <div class="cart-item-info">

        <h3>${item.name}</h3>

        <p>Talle: ${item.size}</p>

        ${
          item.color
            ? `<p>Color: ${item.color}</p>`
            : ''
        }

        <p class="cart-item-price">
          ${formatPrice(item.price)}
        </p>

        <div class="cart-item-controls">

          <button
            type="button"
            class="cart-minus"
            data-index="${index}"
          >
            −
          </button>

          <span>${item.qty}</span>

          <button
            type="button"
            class="cart-plus"
            data-index="${index}"
          >
            +
          </button>

          <button
            type="button"
            class="remove-item"
            data-index="${index}"
          >
            Eliminar
          </button>

        </div>

      </div>

      <div>
        <strong>
          ${formatPrice(item.price * item.qty)}
        </strong>
      </div>

    `;


    cartItemsContainer.appendChild(itemElement);

  });

  const total = cart.reduce(
    (sum, item) =>
      sum + (Number(item.price) * Number(item.qty)),
    0
  );

  if (cartTotalElement) {
    cartTotalElement.textContent = formatPrice(total);
  }

  // Actualizar barra de envío gratis (D2C luxury mechanic)
  const shippingText = document.getElementById('shipping-progress-text');
  const shippingPercent = document.getElementById('shipping-progress-percent');
  const shippingFill = document.getElementById('shipping-progress-fill');
  const FREE_SHIPPING_THRESHOLD = 80000;

  if (shippingText && shippingFill && shippingPercent) {
    if (total >= FREE_SHIPPING_THRESHOLD) {
      shippingText.textContent = '¡Tenés envío gratis a todo el país! 🎉';
      shippingPercent.textContent = '100%';
      shippingFill.style.width = '100%';
    } else {
      const remaining = FREE_SHIPPING_THRESHOLD - total;
      const pct = Math.min(Math.round((total / FREE_SHIPPING_THRESHOLD) * 100), 99);
      shippingText.textContent = `Te faltan ${formatPrice(remaining)} para envío gratis`;
      shippingPercent.textContent = `${pct}%`;
      shippingFill.style.width = `${pct}%`;
    }
  }

}


// ==========================================
// CONTROLES DEL CARRITO
// ==========================================

cartItemsContainer.addEventListener('click', (event) => {

  const minusButton =
    event.target.closest('.cart-minus');

  const plusButton =
    event.target.closest('.cart-plus');

  const removeButton =
    event.target.closest('.remove-item');


  if (minusButton) {

    const index =
      Number(minusButton.dataset.index);

    changeCartQuantity(index, -1);

  }


  if (plusButton) {

    const index =
      Number(plusButton.dataset.index);

    changeCartQuantity(index, 1);

  }


  if (removeButton) {

    const index =
      Number(removeButton.dataset.index);

    removeCartItem(index);

  }

});


// ==========================================
// CAMBIAR CANTIDAD
// ==========================================

function changeCartQuantity(index, amount) {

  if (!cart[index]) return;

  cart[index].qty =
    Number(cart[index].qty) + amount;


  if (cart[index].qty <= 0) {

    cart.splice(index, 1);

  }


  saveCart();

}


// ==========================================
// ELIMINAR
// ==========================================

function removeCartItem(index) {

  if (!cart[index]) return;

  cart.splice(index, 1);

  saveCart();

}


// ==========================================
// FORMATO DE PRECIO
// ==========================================

function formatPrice(price) {

  return new Intl.NumberFormat('es-AR', {

    style: 'currency',

    currency: 'ARS',

    maximumFractionDigits: 0

  }).format(Number(price));

}


// ==========================================
// AGREGAR PRODUCTO
// ==========================================

addToCartBtn.addEventListener('click', () => {

  if (!modalProduct) return;


  const selectedSize =
    modalSizeSelect.value;

  const selectedColor =
    modalColorSelect.value;

  const qty =
    parseInt(modalQuantity.value, 10);


  if (!selectedSize) {

    alert('Por favor selecciona un talle.');

    return;
  }


  if (!qty || qty < 1) {

    alert('Cantidad inválida.');

    return;
  }


  const key =
    `${modalProduct.id}-${selectedSize}-${selectedColor}`;


  const existing =
    cart.find(item => item.key === key);


  if (existing) {

    existing.qty =
      Number(existing.qty) + qty;

  } else {

    cart.push({

      key: key,

      id: modalProduct.id,

      name: modalProduct.name,

      size: selectedSize,

      color: selectedColor,

      price: Number(modalProduct.price),

      qty: qty

    });

  }


  saveCart();


  productModal.classList.add('hidden');


  // Abrir automáticamente el carrito

  openCart();

});


// ==========================================
// WHATSAPP
// ==========================================

if (checkoutWhatsApp) {

  checkoutWhatsApp.addEventListener('click', () => {

    if (cart.length === 0) {

      alert('Tu carrito está vacío.');

      return;
    }


    let message =
      'Hola AROMODA! 👋 Quiero realizar este pedido:\n\n';


    cart.forEach(item => {

      message +=
        `• ${item.name} | Talle: ${item.size}`;

      if (item.color) {

        message +=
          ` | Color: ${item.color}`;

      }

      message +=
        ` | Cantidad: ${item.qty} | ${formatPrice(item.price * item.qty)}\n`;

    });


    const total = cart.reduce(
      (sum, item) =>
        sum + Number(item.price) * Number(item.qty),
      0
    );


    message +=
      `\nTOTAL: ${formatPrice(total)}`;


    const url =
      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(url, '_blank');

  });

}


// ==========================================
// INICIALIZAR CARRITO
// ==========================================

updateCartCount();

renderCart();


// ==========================================
// BOTÓN COMPRAR AHORA
// Agrega el producto al carrito y lo abre
// ==========================================

buyNowBtn.addEventListener('click', () => {

  // Verificar que haya un producto seleccionado
  if (!modalProduct) return;

  // Obtener talle, color y cantidad seleccionados
  const selectedSize = modalSizeSelect.value;
  const selectedColor = modalColorSelect.value;
  const qty = parseInt(modalQuantity.value, 10);

  // Validar talle
  if (!selectedSize) {
    alert('Por favor, seleccioná un talle.');
    return;
  }

  // Validar cantidad
  if (!Number.isInteger(qty) || qty < 1) {
    alert('Por favor, ingresá una cantidad válida.');
    return;
  }

  // Crear una clave única para producto, talle y color
  const key = `${modalProduct.id}-${selectedSize}-${selectedColor}`;

  // Verificar si el producto ya existe en el carrito
  const existing = cart.find(item => item.key === key);

  if (existing) {

    // Sumar la cantidad seleccionada
    existing.qty += qty;

  } else {

    // Agregar el producto al carrito
    cart.push({
      key: key,
      id: modalProduct.id,
      name: modalProduct.name,
      size: selectedSize,
      color: selectedColor,
      price: Number(modalProduct.price),
      qty: qty
    });

  }

  // Guardar el carrito y actualizar los productos mostrados
  saveCart();

  // Cerrar la ventana del producto
  productModal.classList.add('hidden');

  // Abrir el carrito automáticamente
  openCart();

});

// === SIMILAR PRODUCTS (mismo categoria, max 4)
function renderSimilarProducts() {
  similarGrid.innerHTML = '';
  if(!modalProduct) return;
  const similars = products.filter(p => p.cat === modalProduct.cat && p.id !== modalProduct.id).slice(0,4);

  similars.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.style.flex = '0 0 140px';
    card.innerHTML = `<img src="${p.images[0]}" alt="${p.name}" /><h5>${p.name}</h5>`;
    card.addEventListener('click', () => {
      openModalProduct(p.id);
    });
    similarGrid.appendChild(card);
  });
}


// === NEWSLETTER POPUP ===
let newsletterShown = false;
window.addEventListener('load', () => {
  if(!newsletterShown) {
    setTimeout(() => {
      newsletterPopup.classList.remove('hidden');
      newsletterShown = true;
    }, 3500);
  }
});
newsletterClose.addEventListener('click', () => {
  newsletterPopup.classList.add('hidden');
});
newsletterForm.addEventListener('submit', async e => {
  e.preventDefault();
  const email = newsletterEmail.value.trim();
  if(!email || !email.includes('@')) {
    newsletterMsg.textContent = 'Por favor, ingresa un email válido.';
    newsletterMsg.style.color = 'var(--danger)';
    return;
  }
  try {
    const res = await fetch('/api/newsletter/', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({email})
    });
    if (!res.ok) throw new Error('API local error');
    newsletterMsg.textContent = '¡Gracias por suscribirte!';
    newsletterMsg.style.color = 'var(--success)';
    newsletterEmail.value = '';
  } catch {
    try {
      await fetch(BACKUP_SHEET_API, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({type:'subscribe', email})
      });
    } catch (e) {
      // Ignora error si falla el backup
    }
    newsletterMsg.textContent = '¡Gracias por suscribirte!';
    newsletterMsg.style.color = 'var(--success)';
    newsletterEmail.value = '';
  }
});

// === MODALES INSTITUCIONALES ===
function setupModalOpeners(btns, modal) {
  btns.forEach(b => {
    b.addEventListener('click', () => {
      modal.classList.remove('hidden');
    });
  });
}
function setupModalClose(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  closeBtn.addEventListener('click', () => {
    modal.classList.add('hidden');
  });
}
setupModalOpeners(openNosotrosBtns, nosotrosModal);
setupModalOpeners(openPoliticasBtns, politicasModal);
setupModalClose(nosotrosModal);
setupModalClose(politicasModal);

// === ESC TO CLOSE MODALS ===
document.addEventListener('keydown', e => {
  if(e.key === 'Escape') {
    [productModal, newsletterPopup, nosotrosModal, politicasModal].forEach(modal => modal.classList.add('hidden'));
  }
});

// === INIT ===
fetchProducts();
updateCartCount();
const heroBg = document.querySelector('.hero-bg');

const heroImages = [
  'https://i.postimg.cc/6QqmqFpG/of.jpg',
  'https://i.postimg.cc/6pPJnFp3/hoy7.jpg',
  'https://i.postimg.cc/WzTQsvXX/e3bc7f60-c25e-4b18-bf00-feb454af5ab9.jpg',
];

let currentIndex = 0;

function changeHeroImage() {
  heroBg.style.backgroundImage = `url(${heroImages[currentIndex]})`;
  currentIndex = (currentIndex + 1) % heroImages.length;
}

changeHeroImage();
setInterval(changeHeroImage, 3000);