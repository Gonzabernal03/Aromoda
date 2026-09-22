/* ═══════════════════════════════════════
   DATOS DE PRODUCTOS
   → Editá esta lista con tus propios productos
═══════════════════════════════════════ */
const PRODUCTS = [
  {
    id: 1, name: "Remera Básica Premium",
    category: "remeras", badge: "new",
    price: 18900, oldPrice: null,
    desc: "100% algodón peinado. Corte recto. Disponible en múltiples colores.",
    colors: ["#f0f0f0", "#1a1a1a", "#3a6ea8"],
    emoji: "👕", isNew: true
  },
  {
    id: 2, name: "Jean Skinny Fit",
    category: "pantalones", badge: "hot",
    price: 46500, oldPrice: 58000,
    desc: "Denim elástico de alta calidad. Corte skinny. Detalles en costura.",
    colors: ["#2d4a7a", "#1a1a1a", "#8c6a3a"],
    emoji: "👖", isNew: false
  },
  {
    id: 3, name: "Vestido Midi Floral",
    category: "vestidos", badge: "new",
    price: 52000, oldPrice: null,
    desc: "Tela fluida estampada. Ideal para primavera. Tiro ajustable.",
    colors: ["#e8a0b4", "#8bc8a0", "#f0d080"],
    emoji: "👗", isNew: true
  },
  {
    id: 4, name: "Campera Bomber Negra",
    category: "camperas", badge: "sale",
    price: 71000, oldPrice: 98000,
    desc: "Exterior impermeable, interior polar. Bolsillos con cierre.",
    colors: ["#1a1a1a", "#2d4a7a", "#4a2d2d"],
    emoji: "🧥", isNew: false
  },
  {
    id: 5, name: "Zapatillas Urban Street",
    category: "calzado", badge: "hot",
    price: 89000, oldPrice: null,
    desc: "Suela de goma antideslizante. Cuero ecológico. Plantilla acolchada.",
    colors: ["#f0f0f0", "#1a1a1a", "#e8c068"],
    emoji: "👟", isNew: false
  },
  {
    id: 6, name: "Bolso Tote Premium",
    category: "accesorios", badge: null,
    price: 34500, oldPrice: 42000,
    desc: "Cuero vegano. Capacidad 15L. Doble asa y correa removible.",
    colors: ["#8c6a3a", "#1a1a1a", "#4a2d2d"],
    emoji: "👜", isNew: false
  },
  {
    id: 7, name: "Vestido Lencero Satén",
    category: "vestidos", badge: "new",
    price: 67000, oldPrice: null,
    desc: "Satén brillante. Tirantes finos regulables. Diseño minimalista.",
    colors: ["#e8c068", "#c8a0b4", "#1a1a1a"],
    emoji: "👗", isNew: true
  },
  {
    id: 8, name: "Pantalón Cargo Urbano",
    category: "pantalones", badge: null,
    price: 41000, oldPrice: 52000,
    desc: "Gabardina resistente. Múltiples bolsillos funcionales. Corte recto.",
    colors: ["#4a5a3a", "#8c6a3a", "#1a1a1a"],
    emoji: "👖", isNew: false
  },
  {
    id: 9, name: "Remera Oversize Gráfica",
    category: "remeras", badge: "hot",
    price: 22500, oldPrice: null,
    desc: "Corte oversized. Estampa gráfica exclusiva. Algodón 180g.",
    colors: ["#f0f0f0", "#e8c068", "#e87068"],
    emoji: "👕", isNew: false
  },
  {
    id: 10, name: "Campera de Cuero",
    category: "camperas", badge: "sale",
    price: 115000, oldPrice: 148000,
    desc: "Cuero ecológico premium. Forro interior. Estilo moto clásico.",
    colors: ["#1a1a1a", "#4a2d2d", "#8c6a3a"],
    emoji: "🧥", isNew: false
  },
  {
    id: 11, name: "Botas Chelsea",
    category: "calzado", badge: "new",
    price: 96000, oldPrice: null,
    desc: "Cuero genuino. Elástico lateral. Suela tractora de goma.",
    colors: ["#1a1a1a", "#4a2d2d", "#8c6a3a"],
    emoji: "🥾", isNew: true
  },
  {
    id: 12, name: "Gorro Beanie Tejido",
    category: "accesorios", badge: null,
    price: 12900, oldPrice: null,
    desc: "Lana merino 100%. Tejido doble capa. Talla única.",
    colors: ["#1a1a1a", "#4a2d2d", "#3a4a6a"],
    emoji: "🧢", isNew: false
  }
];

/* ═══════════════════════════════════════
   ESTADO GLOBAL
═══════════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem('cart') || '[]');
let currentCategory = 'todos';

/* ═══════════════════════════════════════
   FORMATO DE PRECIO
═══════════════════════════════════════ */
const fmt = n => '$' + n.toLocaleString('es-AR');

/* ═══════════════════════════════════════
   RENDERIZAR PRODUCTOS
═══════════════════════════════════════ */
function renderProducts(products) {
  const grid      = document.getElementById('productGrid');
  const noResults = document.getElementById('noResults');
  const count     = document.getElementById('resultsCount');

  // Eliminar tarjetas anteriores (conservar el div no-results)
  Array.from(grid.children).forEach(c => {
    if (!c.classList.contains('no-results')) c.remove();
  });

  if (!products.length) {
    noResults.style.display = 'block';
    count.textContent = '0 resultados';
    return;
  }

  noResults.style.display = 'none';
  count.textContent = `Mostrando ${products.length} producto${products.length !== 1 ? 's' : ''}`;

  products.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const badgeHTML = p.badge
      ? `<span class="product-badge badge-${p.badge}">
           ${p.badge === 'new' ? '✨ Nuevo' : p.badge === 'sale' ? '🔥 Oferta' : '⚡ Hot'}
         </span>`
      : '';

    const oldPriceHTML = p.oldPrice
      ? `<span class="price-old">${fmt(p.oldPrice)}</span>`
      : '';

    const dotsHTML = p.colors.map((c, i) =>
      `<div class="color-dot ${i === 0 ? 'active' : ''}" style="background:${c}"></div>`
    ).join('');

    card.innerHTML = `
      <div class="product-img-wrap">
        <div style="width:100%;height:100%;display:flex;align-items:center;justify-content:center;font-size:5rem;user-select:none">
          ${p.emoji}
        </div>
        ${badgeHTML}
        <div class="product-actions">
          <button class="action-btn" onclick="toggleWishlist(this)" title="Favoritos">♡</button>
          <button class="action-btn" title="Vista rápida">👁️</button>
        </div>
      </div>
      <div class="product-info">
        <div class="product-category">${p.category}</div>
        <h3 class="product-name">${p.name}</h3>
        <p class="product-desc">${p.desc}</p>
        <div class="product-colors">${dotsHTML}</div>
        <div class="product-footer">
          <div class="product-price">
            <span class="price-current">${fmt(p.price)}</span>
            ${oldPriceHTML}
          </div>
          <button class="add-to-cart" onclick="addToCart(${p.id})">
            🛒 Agregar
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

/* ═══════════════════════════════════════
   FILTROS Y ORDENAMIENTO
═══════════════════════════════════════ */
function applyFilters() {
  const search = document.getElementById('searchInput').value.toLowerCase();
  const sort   = document.getElementById('sortSelect').value;

  let filtered = PRODUCTS.filter(p => {
    const matchCat    = currentCategory === 'todos' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(search)
                     || p.desc.toLowerCase().includes(search)
                     || p.category.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if (sort === 'price-asc')  filtered.sort((a, b) => a.price - b.price);
  if (sort === 'price-desc') filtered.sort((a, b) => b.price - a.price);
  if (sort === 'name-asc')   filtered.sort((a, b) => a.name.localeCompare(b.name));
  if (sort === 'new')        filtered.sort((a, b) => b.isNew - a.isNew);

  renderProducts(filtered);
}

function filterCategory(el) {
  document.querySelectorAll('.cat-card').forEach(c => c.classList.remove('active'));
  el.classList.add('active');
  currentCategory = el.dataset.cat;
  applyFilters();
  document.getElementById('catalog').scrollIntoView({ behavior: 'smooth' });
}

/* ═══════════════════════════════════════
   FAVORITOS
═══════════════════════════════════════ */
function toggleWishlist(btn) {
  btn.classList.toggle('liked');
  btn.textContent = btn.classList.contains('liked') ? '♥' : '♡';
  showToast(btn.classList.contains('liked')
    ? '♥ Añadido a favoritos'
    : '♡ Eliminado de favoritos'
  );
}

/* ═══════════════════════════════════════
   CARRITO — AGREGAR / QUITAR / CANTIDAD
═══════════════════════════════════════ */
function addToCart(id) {
  const product  = PRODUCTS.find(p => p.id === id);
  const existing = cart.find(i => i.id === id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveCart();
  updateCartUI();
  showToast(`✅ ${product.name} agregado al carrito`);
}

function removeFromCart(id) {
  cart = cart.filter(i => i.id !== id);
  saveCart();
  updateCartUI();
}

function changeQty(id, delta) {
  const item = cart.find(i => i.id === id);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  saveCart();
  updateCartUI();
}

function saveCart() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

/* ═══════════════════════════════════════
   CARRITO — ACTUALIZAR INTERFAZ
═══════════════════════════════════════ */
function updateCartUI() {
  const total     = cart.reduce((s, i) => s + i.qty, 0);
  const badge     = document.getElementById('cartBadge');
  const container = document.getElementById('cartItems');
  const empty     = document.getElementById('cartEmpty');
  const footer    = document.getElementById('cartFooter');

  // Badge del ícono
  badge.style.display = total > 0 ? 'flex' : 'none';
  badge.textContent   = total;

  // Limpiar items anteriores
  Array.from(container.children).forEach(c => {
    if (!c.classList.contains('cart-empty')) c.remove();
  });

  // Carrito vacío
  if (!cart.length) {
    empty.style.display  = 'flex';
    footer.style.display = 'none';
    return;
  }

  empty.style.display  = 'none';
  footer.style.display = 'block';

  // Renderizar items del carrito
  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="cart-item-img">${item.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-price">${fmt(item.price)}</div>
        <div class="cart-item-qty">
          <button class="qty-btn" onclick="changeQty(${item.id}, -1)">−</button>
          <span class="qty-display">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${item.id}, 1)">+</button>
        </div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${item.id})">✕</button>
    `;
    container.appendChild(el);
  });

  // Totales
  const subtotal = cart.reduce((s, i) => s + i.price * i.qty, 0);
  const shipping = subtotal >= 50000 ? 0 : 3900;

  document.getElementById('subtotal').textContent     = fmt(subtotal);
  document.getElementById('shippingCost').textContent = shipping === 0 ? '✅ Gratis' : fmt(shipping);
  document.getElementById('totalPrice').textContent   = fmt(subtotal + shipping);
}

/* ═══════════════════════════════════════
   CARRITO — ABRIR / CERRAR DRAWER
═══════════════════════════════════════ */
function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartDrawer').classList.toggle('open');
}

document.getElementById('cartToggle').addEventListener('click', toggleCart);

/* ═══════════════════════════════════════
   CHECKOUT
   → Conectá aquí tu pasarela de pagos
     (Mercado Pago, Stripe, PayPal, etc.)
═══════════════════════════════════════ */
function checkout() {
  if (!cart.length) return;
  showToast('🎉 ¡Redirigiendo al pago!');
  // Ejemplo: window.location.href = '/pagar';
}

/* ═══════════════════════════════════════
   TOAST NOTIFICATIONS
═══════════════════════════════════════ */
function showToast(msg) {
  const container = document.getElementById('toastContainer');
  const toast     = document.createElement('div');
  toast.className = 'toast success';
  toast.innerHTML = msg;
  container.appendChild(toast);

  setTimeout(() => {
    toast.classList.add('out');
    toast.addEventListener('animationend', () => toast.remove());
  }, 2800);
}

/* ═══════════════════════════════════════
   INICIALIZAR
═══════════════════════════════════════ */
applyFilters();
updateCartUI();