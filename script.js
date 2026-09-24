/* ====================
   Aromoda - JS
==================== */

// CONFIG
const PRODUCTS_API_URL = 'https://script.google.com/macros/s/AKfycby4ycWr-eajqEcblGosgVuM-Z2K8Ut4PyUiK350Bh6INHYmfMIbT2PDQkC5KelJo4Fy/exec'; // Cambiar por tu API de Google Apps Script
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
    const res = await fetch(SHEET_API_BASE);
    const data = await res.json();
    // Map or transform data if necessary according to your sheet columns
    products = data.map(p => ({
      id: Number(p.id),
      name: p.nombre,
      cat: p.cat.toLowerCase(),
      price: Number(p.precio),
      oldPrice: p.precio_ant ? Number(p.precio_ant) : null,
      badge: p.badge ? p.badge.toLowerCase() : null,
      description: p.descripcion,
      sizes: p.talles.split(',').map(s => s.trim()),
      colors: p.colores ? p.colores.split(',').map(c => c.trim()) : ['Único'],
      images: [p.imagen1, p.imagen2], // Asegúrate de tener URLs
      stock: p.stock ? Number(p.stock) : 0,
      sold: p.vendidos ? Number(p.vendidos) : 0,
    }));
    filteredProducts = [...products];
    renderProducts(filteredProducts);
  } catch(e) {
    productGrid.innerHTML = '<p>Error cargando productos</p>';
    console.error('Error fetching products:', e);
  }
}

// === RENDER PRODUCTS GRID ===
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
    // Badge text mapping
    let badgeText = '';
    switch(p.badge) {
      case 'nuevo': badgeText = 'NEW IN'; break;
      case 'hot': badgeText = 'MÁS VENDIDO'; break;
      case 'oferta': badgeText = '30% OFF'; break;
      case 'agotado': badgeText = 'AGOTADO'; break;
    }
    const isOutOfStock = p.stock === 0;
    if(isOutOfStock) {
      badgeText = 'AGOTADO';
    }
    card.innerHTML = `
      <div class="product-img" data-id="${p.id}">
        ${badgeText ? `<span class="badge ${(p.badge==='oferta'?'off':p.badge==='hot'?'hot':p.badge==='nuevo'?'nuevo':'agotado')}">${badgeText}</span>` : ''}
        <img src="${p.images[0]}" alt="${p.name}" class="main-image" />
        <img src="${p.images[1]}" alt="${p.name} vista alternativa" class="hover-image" />
      </div>
      <div class="product-info">
        <div class="product-category">${p.cat}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.description}</p>
        <div>
          <span class="price">$${p.price.toLocaleString()}</span>
          ${p.oldPrice ? `<span class="old-price">$${p.oldPrice.toLocaleString()}</span>` : ''}
        </div>
        <button class="add-to-cart-btn" data-id="${p.id}" ${isOutOfStock ? 'disabled' : ''}>
          ${isOutOfStock ? 'Agotado' : 'Elegir talle y agregar'}
        </button>
      </div>
    `;
    productGrid.appendChild(card);
  });
}

// === EVENT LISTENERS ===
productGrid.addEventListener('click', e => {
  if(e.target.classList.contains('add-to-cart-btn') || e.target.closest('.product-img')) {
    const id = Number(e.target.dataset.id || e.target.closest('[data-id]').dataset.id);
    openModalProduct(id);
  }
});

categoryButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    categoryButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCategory = btn.dataset.cat;
    applyFilters();
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
function openModalProduct(id) {
  modalProduct = products.find(p => p.id === id);
  if(!modalProduct) return;

  modalImageIndex = 0;
  updateModalContent();
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

  // Render similares
  renderSimilarProducts();
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
function saveCart() {
  localStorage.setItem('aromoda_cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
  cartCount.textContent = totalItems;
}
saveCart();

addToCartBtn.addEventListener('click', () => {
  if(!modalProduct) return;
  const selectedSize = modalSizeSelect.value;
  const selectedColor = modalColorSelect.value;
  const qty = parseInt(modalQuantity.value);
  if(!selectedSize) {
    alert('Por favor selecciona un talle.');
    return;
  }
  if(qty < 1) {
    alert('Cantidad inválida.');
    return;
  }
  // Inicializar carrito desde localStorage o vacío
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Función para guardar el carrito y actualizar contador
function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

// Función para actualizar el contador visible en el carrito
function updateCartCount() {
  const count = cart.reduce((acc, item) => acc + item.qty, 0);
  document.getElementById('cart-count').textContent = count;
}

// Función para agregar producto al carrito
// Recibe un objeto producto con {id, name, price}, junto a size, color y cantidad
function addToCart(product, selectedSize, selectedColor, qty) {
  const key = `${product.id}-${selectedSize}-${selectedColor}`;
  const existing = cart.find(item => item.key === key);
  if(existing) {
    existing.qty += qty;
  } else {
    cart.push({
      key,
      id: product.id,
      name: product.name,
      size: selectedSize,
      color: selectedColor,
      price: product.price,
      qty,
    });
  }
  saveCart();
  alert(`${product.name} agregado al carrito.`);
}

// Actualizar contador al cargar la página
updateCartCount();


// Comprar ahora redirige a checkout limpio que puedes crear aparte
buyNowBtn.addEventListener('click', () => {
  if(!modalProduct) return;
  // En este caso, guardar pedido o enviar a checkout
  alert('Funcionalidad de Compra directa aún no implementada. Prueba desde el carrito.');
  productModal.classList.add('hidden');
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
    // POST subscripción al Apps Script (tu endpoint real)
    await fetch(SHEET_API_BASE, {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({type:'subscribe', email})
    });
    newsletterMsg.textContent = 'Gracias por suscribirte!';
    newsletterMsg.style.color = 'var(--success)';
    newsletterEmail.value = '';
  } catch {
    newsletterMsg.textContent = 'Error enviando la suscripción. Intenta de nuevo.';
    newsletterMsg.style.color = 'var(--danger)';
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
  'https://i.postimg.cc/Ghc9hYDP/Whats-App-Image-2026-09-15-at-19-40-52.jpg',
  'https://i.postimg.cc/yx76x4kp/Whats-App-Image-2026-09-14-at-18-11-46.jpg',
  'https://i.postimg.cc/2yTkBcWd/Whats-App-Image-2026-09-14-at-18-07-24.jpg',
];

let currentIndex = 0;

function changeHeroImage() {
  heroBg.style.backgroundImage = `url(${heroImages[currentIndex]})`;
  currentIndex = (currentIndex + 1) % heroImages.length;
}

changeHeroImage();
setInterval(changeHeroImage, 3000);
