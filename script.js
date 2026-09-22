/* ══════════════════════════════════
   PRODUCTOS DE AROMODA
   → Editá nombre, precio, talles, etc.
══════════════════════════════════ */
const PRODUCTS = [
  { id:1,  name:"Remera Básica Algodón",     cat:"remeras",    badge:"nuevo",  price:8500,  old:null,   desc:"100% algodón peinado. Corte recto unisex. Lavado a máquina.", sizes:["XS","S","M","L","XL","XXL"], emoji:"👕", isNew:true,  pesoG:250 },
  { id:2,  name:"Remera Oversize Estampada", cat:"remeras",    badge:"hot",    price:11500, old:null,   desc:"Estampa exclusiva Aromoda. Tela 180g. Corte amplio.",           sizes:["S","M","L","XL"],           emoji:"👕", isNew:false, pesoG:280 },
  { id:3,  name:"Remera Manga Larga",        cat:"remeras",    badge:null,     price:9800,  old:null,   desc:"Térmica suave. Ideal para entretiempo. Escote redondo.",        sizes:["XS","S","M","L","XL"],      emoji:"👕", isNew:false, pesoG:300 },
  { id:4,  name:"Jean Skinny Azul",          cat:"pantalones", badge:"nuevo",  price:28500, old:34000,  desc:"Denim elástico 98% algodón. Corte skinny. Lavado stone.",       sizes:["38","40","42","44","46","48"], emoji:"👖", isNew:true,  pesoG:700 },
  { id:5,  name:"Jean Mom Fit",              cat:"pantalones", badge:"hot",    price:31000, old:null,   desc:"Tiro alto. Corte mom. Elastizado para mayor comodidad.",        sizes:["38","40","42","44","46"],    emoji:"👖", isNew:false, pesoG:720 },
  { id:6,  name:"Pantalón Cargo Beige",      cat:"pantalones", badge:null,     price:24500, old:29000,  desc:"Gabardina liviana. Múltiples bolsillos. Corte recto.",          sizes:["S","M","L","XL","XXL"],     emoji:"👖", isNew:false, pesoG:600 },
  { id:7,  name:"Jogger Deportivo",          cat:"pantalones", badge:"oferta", price:18000, old:24000,  desc:"Frisa liviana. Puños ajustados. Cordón en cintura.",            sizes:["XS","S","M","L","XL","XXL"], emoji:"👖", isNew:false, pesoG:450 },
  { id:8,  name:"Vestido Midi Floral",       cat:"vestidos",   badge:"nuevo",  price:34000, old:null,   desc:"Tela fluida estampada. Manga corta. Ideal para el calor.",      sizes:["XS","S","M","L","XL"],      emoji:"👗", isNew:true,  pesoG:350 },
  { id:9,  name:"Vestido Camisero",          cat:"vestidos",   badge:null,     price:29500, old:null,   desc:"Lino–viscosa. Botonera delantera. Cinturón incluido.",          sizes:["S","M","L","XL"],           emoji:"👗", isNew:false, pesoG:380 },
  { id:10, name:"Vestido Mini Lencero",      cat:"vestidos",   badge:"hot",    price:27000, old:32000,  desc:"Satén brillante. Tirantes finos. Diseño elegante.",             sizes:["XS","S","M","L"],           emoji:"👗", isNew:false, pesoG:200 },
  { id:11, name:"Campera Bomber Negra",      cat:"camperas",   badge:"oferta", price:52000, old:69000,  desc:"Exterior impermeable. Interior polar suave. Bolsillos con cierre.", sizes:["S","M","L","XL","XXL"], emoji:"🧥", isNew:false, pesoG:900 },
  { id:12, name:"Campera de Jean",           cat:"camperas",   badge:null,     price:47000, old:null,   desc:"Denim clásico. Cuello botón. Bolsillos delanteros.",            sizes:["S","M","L","XL"],           emoji:"🧥", isNew:false, pesoG:850 },
  { id:13, name:"Campera Rompeviento",       cat:"camperas",   badge:"nuevo",  price:38500, old:null,   desc:"Impermeable liviana. Capucha desmontable. Ideal trekking.",     sizes:["S","M","L","XL","XXL"],     emoji:"🧥", isNew:true,  pesoG:500 },
  { id:14, name:"Buzo Canguro Unisex",       cat:"buzos",      badge:"nuevo",  price:21000, old:null,   desc:"Frisa interior. Bolsillo canguro. Capucha con cordón.",         sizes:["XS","S","M","L","XL","XXL"], emoji:"🧶", isNew:true,  pesoG:600 },
  { id:15, name:"Buzo Crop con Capucha",     cat:"buzos",      badge:"hot",    price:19500, old:null,   desc:"Corte crop. Frisa suave. Combiná con jogger o jean.",           sizes:["XS","S","M","L"],           emoji:"🧶", isNew:false, pesoG:420 },
  { id:16, name:"Sweater Tejido Oversize",   cat:"buzos",      badge:null,     price:23000, old:27000,  desc:"Lana acrílica. Punto grueso. Múltiples colores disponibles.",   sizes:["Único (S–L)","XL–XXL"],    emoji:"🧶", isNew:false, pesoG:500 },
  { id:17, name:"Conjunto Deportivo Licra",  cat:"conjuntos",  badge:"nuevo",  price:36000, old:null,   desc:"Top + calza. Tela compresiva. Ideal gym y running.",            sizes:["XS","S","M","L","XL"],      emoji:"👚", isNew:true,  pesoG:400 },
  { id:18, name:"Conjunto Buzo + Jogger",    cat:"conjuntos",  badge:"oferta", price:42000, old:55000,  desc:"Set coordinado frisa. Comodidad máxima para el día a día.",    sizes:["S","M","L","XL","XXL"],     emoji:"👚", isNew:false, pesoG:900 },
  { id:19, name:"Conjunto Lino Verano",      cat:"conjuntos",  badge:"nuevo",  price:45000, old:null,   desc:"Camisa + pantalón lino. Fresco y elegante. Envío express.",     sizes:["S","M","L","XL"],           emoji:"👚", isNew:true,  pesoG:550 },
  { id:20, name:"Cinturón Cuero Trenzado",   cat:"accesorios", badge:null,     price:9500,  old:null,   desc:"Cuero ecológico. Varios colores. Talla ajustable.",             sizes:["Único"],                    emoji:"👜", isNew:false, pesoG:150 },
  { id:21, name:"Bolso Tote Grande",         cat:"accesorios", badge:"nuevo",  price:22000, old:null,   desc:"Lona resistente. Doble asa. Ideal playa y compras.",            sizes:["Único"],                    emoji:"👜", isNew:true,  pesoG:400 },
  { id:22, name:"Gorro Beanie Tejido",       cat:"accesorios", badge:null,     price:7500,  old:null,   desc:"Lana acrílica. Talla única. Varios colores.",                   sizes:["Único"],                    emoji:"🧢", isNew:false, pesoG:120 },
  { id:23, name:"Medias Pack x3",            cat:"accesorios", badge:"oferta", price:5500,  old:7500,   desc:"Algodón suave. Pack 3 pares. Talles del 35 al 42.",             sizes:["35–38","39–42"],            emoji:"🧦", isNew:false, pesoG:100 },
];

/* ══════════════════════════════════
   ESTADO
══════════════════════════════════ */
let cart = JSON.parse(localStorage.getItem('aromoda_cart') || '[]');
let currentCat = 'todos';
let pendingProduct = null;
let selectedSize = null;

/* ══════════════════════════════════
   FORMATO PRECIO
══════════════════════════════════ */
const fmt = n => '$' + Number(n).toLocaleString('es-AR');

/* ══════════════════════════════════
   HEADER SCROLL
══════════════════════════════════ */
window.addEventListener('scroll', () => {
  document.getElementById('header').classList.toggle('scrolled', window.scrollY > 20);
});

/* ══════════════════════════════════
   HAMBURGER MENÚ
══════════════════════════════════ */
document.getElementById('hamburger').addEventListener('click', () => {
  document.getElementById('nav').classList.toggle('open');
});
function closeNav() { document.getElementById('nav').classList.remove('open'); }

/* ══════════════════════════════════
   FILTRO CATEGORÍA
══════════════════════════════════ */
function filterCat(el) {
  document.querySelectorAll('.cat-pill').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  currentCat = el.dataset.cat;
  applyFilters();
  document.getElementById('catalogo').scrollIntoView({ behavior:'smooth', block:'start' });
}

/* ══════════════════════════════════
   FILTROS + ORDEN
══════════════════════════════════ */
function applyFilters() {
  const q    = document.getElementById('searchInput').value.toLowerCase();
  const sort = document.getElementById('sortSelect').value;

  let list = PRODUCTS.filter(p => {
    const okCat  = currentCat === 'todos' || p.cat === currentCat;
    const okQ    = p.name.toLowerCase().includes(q) || p.desc.toLowerCase().includes(q) || p.cat.toLowerCase().includes(q);
    return okCat && okQ;
  });

  if (sort === 'price-asc')  list.sort((a,b) => a.price - b.price);
  if (sort === 'price-desc') list.sort((a,b) => b.price - a.price);
  if (sort === 'name-asc')   list.sort((a,b) => a.name.localeCompare(b.name));
  if (sort === 'new')        list.sort((a,b) => b.isNew - a.isNew);

  renderProducts(list);
}

/* ══════════════════════════════════
   RENDERIZAR CARDS
══════════════════════════════════ */
function renderProducts(list) {
  const grid = document.getElementById('productGrid');
  const none = document.getElementById('noResults');
  const cnt  = document.getElementById('resultsCount');

  Array.from(grid.children).forEach(c => { if (!c.classList.contains('no-results')) c.remove(); });

  if (!list.length) {
    none.style.display = 'block'; cnt.textContent = '0 resultados'; return;
  }
  none.style.display = 'none';
  cnt.textContent = `${list.length} producto${list.length !== 1 ? 's' : ''}`;

  list.forEach(p => {
    const card = document.createElement('div');
    card.className = 'product-card';

    const badge = p.badge
      ? `<span class="card-badge badge-${p.badge}">${p.badge === 'nuevo' ? '✨ Nuevo' : p.badge === 'oferta' ? '🔥 Oferta' : '⚡ Hot'}</span>`
      : '';
    const oldP = p.old ? `<span class="price-old">${fmt(p.old)}</span>` : '';
    const tags = p.sizes.slice(0,5).map(s => `<span class="size-tag">${s}</span>`).join('');

    card.innerHTML = `
      <div class="card-img">
        <span style="user-select:none">${p.emoji}</span>
        ${badge}
        <div class="card-actions">
          <button class="act-btn" onclick="toggleWish(this)" title="Favorito">♡</button>
        </div>
      </div>
      <div class="card-info">
        <div class="card-cat">${p.cat}</div>
        <h3 class="card-name">${p.name}</h3>
        <p class="card-desc">${p.desc}</p>
        <div class="card-sizes">${tags}${p.sizes.length > 5 ? `<span class="size-tag">+${p.sizes.length-5}</span>` : ''}</div>
        <div class="card-foot">
          <div class="card-price">
            <span class="price-now">${fmt(p.price)}</span>
            ${oldP}
          </div>
          <button class="add-btn" onclick="openSizeModal(${p.id})">🛒 Agregar</button>
        </div>
      </div>`;
    grid.appendChild(card);
  });
}

/* ══════════════════════════════════
   FAVORITOS
══════════════════════════════════ */
function toggleWish(btn) {
  const on = btn.textContent.trim() === '♡';
  btn.textContent = on ? '♥' : '♡';
  btn.style.color = on ? '#e05252' : '';
  toast(on ? '♥ Guardado en favoritos' : '♡ Quitado de favoritos');
}

/* ══════════════════════════════════
   MODAL ELEGIR TALLE
══════════════════════════════════ */
function openSizeModal(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if (!p) return;
  pendingProduct = p;
  selectedSize = null;

  document.getElementById('modalTitle').textContent = p.name;
  document.getElementById('modalInfo').innerHTML =
    `<strong>${fmt(p.price)}</strong> — ${p.desc}`;

  const picker = document.getElementById('sizePicker');
  picker.innerHTML = p.sizes.map(s =>
    `<div class="s-opt" onclick="selectSize(this,'${s}')">${s}</div>`
  ).join('');

  document.getElementById('modalOverlay').classList.add('open');
  document.getElementById('sizeModal').classList.add('open');
}

function selectSize(el, s) {
  document.querySelectorAll('.s-opt').forEach(x => x.classList.remove('selected'));
  el.classList.add('selected');
  selectedSize = s;
}

function closeModal() {
  document.getElementById('modalOverlay').classList.remove('open');
  document.getElementById('sizeModal').classList.remove('open');
  pendingProduct = null; selectedSize = null;
}

function confirmAddToCart() {
  if (!pendingProduct) return;
  if (!selectedSize) { toast('⚠️ Elegí un talle primero'); return; }
  addToCart(pendingProduct, selectedSize);
  closeModal();
}

/* ══════════════════════════════════
   CARRITO — LÓGICA
══════════════════════════════════ */
function addToCart(p, size) {
  const key  = `${p.id}-${size}`;
  const item = cart.find(i => i.key === key);
  if (item) { item.qty++; }
  else { cart.push({ key, id:p.id, name:p.name, price:p.price, emoji:p.emoji, size, qty:1, pesoG:p.pesoG }); }
  saveCart(); renderCart();
  toast(`✅ ${p.name} (${size}) agregado`);
}

function removeFromCart(key) {
  cart = cart.filter(i => i.key !== key);
  saveCart(); renderCart();
}

function changeQty(key, d) {
  const item = cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + d);
  saveCart(); renderCart();
}

function saveCart() { localStorage.setItem('aromoda_cart', JSON.stringify(cart)); }

/* ══════════════════════════════════
   CARRITO — RENDER
══════════════════════════════════ */
function renderCart() {
  const total  = cart.reduce((s,i) => s + i.qty, 0);
  const badge  = document.getElementById('cartBadge');
  badge.style.display = total > 0 ? 'flex' : 'none';
  badge.textContent   = total;

  const body  = document.getElementById('cartBody');
  const empty = document.getElementById('cartEmpty');
  const foot  = document.getElementById('cartFoot');

  Array.from(body.children).forEach(c => { if (!c.classList.contains('cart-empty')) c.remove(); });

  if (!cart.length) {
    empty.style.display = 'flex'; foot.style.display = 'none'; return;
  }
  empty.style.display = 'none'; foot.style.display = 'flex';

  cart.forEach(item => {
    const el = document.createElement('div');
    el.className = 'cart-item';
    el.innerHTML = `
      <div class="ci-img">${item.emoji}</div>
      <div class="ci-info">
        <div class="ci-name">${item.name}</div>
        <div class="ci-talle">Talle: ${item.size}</div>
        <div class="ci-price">${fmt(item.price)}</div>
        <div class="ci-qty">
          <button class="qbtn" onclick="changeQty('${item.key}',-1)">−</button>
          <span class="qdis">${item.qty}</span>
          <button class="qbtn" onclick="changeQty('${item.key}',1)">+</button>
        </div>
      </div>
      <button class="ci-del" onclick="removeFromCart('${item.key}')">✕</button>`;
    body.appendChild(el);
  });

  const sub = cart.reduce((s,i) => s + i.price * i.qty, 0);
  document.getElementById('subTotal').textContent  = fmt(sub);
  document.getElementById('grandTotal').textContent = fmt(sub);
  document.getElementById('shipLabel').textContent = 'A calcular';
}

/* ══════════════════════════════════
   CARRITO — TOGGLE
══════════════════════════════════ */
function toggleCart() {
  document.getElementById('cartOverlay').classList.toggle('open');
  document.getElementById('cartDrawer').classList.toggle('open');
}
document.getElementById('cartToggle').addEventListener('click', toggleCart);

/* ══════════════════════════════════
   PEDIR POR WHATSAPP
══════════════════════════════════ */
function sendWhatsApp() {
  if (!cart.length) return;
  let msg = '¡Hola Aromoda! Quiero hacer el siguiente pedido:%0A%0A';
  cart.forEach(i => {
    msg += `▪ ${i.name} — Talle ${i.size} x${i.qty} = ${fmt(i.price * i.qty)}%0A`;
  });
  const sub = cart.reduce((s,i) => s + i.price * i.qty, 0);
  msg += `%0A*Total: ${fmt(sub)}*%0A%0A¿Podés confirmarme disponibilidad y el costo de envío?`;
  window.open(`https://wa.me/2325590916?text=${msg}`, '_blank');
}

/* ══════════════════════════════════
   CALCULADORA DE ENVÍO
   (estimación basada en rangos de peso
    y zona, orientativo)
══════════════════════════════════ */
function calcularEnvio() {
  const cp    = document.getElementById('cpDestino').value.trim();
  const peso  = parseFloat(document.getElementById('pesoEnvio').value) || 0;
  const tipo  = document.getElementById('tipoEnvio').value;
  const res   = document.getElementById('shippingResult');

  if (!cp || cp.length < 4) { toast('⚠️ Ingresá un código postal válido'); return; }
  if (peso <= 0)             { toast('⚠️ Ingresá el peso aproximado'); return; }

  // CP de San Andrés de Giles: 6720
  const cpOrigen = 6720;
  const cpNum    = parseInt(cp);

  // Zona estimada por CP
  let zona = 'nacional';
  if (cpNum >= 6000 && cpNum <= 6999) zona = 'provincial'; // GBA/Provincia Bs As
  if (cpNum >= 1000 && cpNum <= 1999) zona = 'caba';       // CABA

  // Base por peso (gramos → kg)
  const kg = peso / 1000;
  let base = 0;
  if (kg <= 0.5)       base = 3200;
  else if (kg <= 1)    base = 4500;
  else if (kg <= 2)    base = 6000;
  else if (kg <= 3)    base = 7500;
  else if (kg <= 5)    base = 9500;
  else                 base = 12000;

  // Multiplicador por zona
  const mult = zona === 'caba' ? 1 : zona === 'provincial' ? 1.15 : 1.45;

  // Multiplicador por tipo
  const tipoMult = tipo === 'prioritaria' ? 1.35 : tipo === 'sucursal' ? 0.8 : 1;

  const estimado = Math.round(base * mult * tipoMult / 100) * 100;
  const dias = tipo === 'prioritaria'
    ? (zona === 'caba' ? '1–2' : zona === 'provincial' ? '2–3' : '3–5')
    : (zona === 'caba' ? '2–3' : zona === 'provincial' ? '3–5' : '5–8');

  res.style.display = 'block';
  res.innerHTML = `
    <strong>📦 Estimación de envío</strong><br><br>
    Destino CP: <strong>${cp}</strong><br>
    Zona: <strong>${zona === 'caba' ? 'CABA' : zona === 'provincial' ? 'Provincia de Bs As' : 'Interior del país'}</strong><br>
    Servicio: <strong>${tipo === 'clasica' ? 'Encomienda Clásica' : tipo === 'prioritaria' ? 'Prioritaria' : 'A sucursal'}</strong><br>
    Peso: <strong>${peso}g</strong><br>
    Tiempo estimado: <strong>${dias} días hábiles</strong><br><br>
    💰 Costo estimado: <strong style="font-size:1.2rem;color:#e8c068">${fmt(estimado)}</strong>
  `;
}

/* ══════════════════════════════════
   TOAST
══════════════════════════════════ */
function toast(msg) {
  const wrap = document.getElementById('toasts');
  const el   = document.createElement('div');
  el.className = 'toast green';
  el.textContent = msg;
  wrap.appendChild(el);
  setTimeout(() => {
    el.style.animation = 'tout .3s ease forwards';
    el.addEventListener('animationend', () => el.remove());
  }, 2800);
}

/* ══════════════════════════════════
   INICIAR
══════════════════════════════════ */
applyFilters();
renderCart();