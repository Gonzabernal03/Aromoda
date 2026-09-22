/* =========================================================
   AROMODA - JAVASCRIPT
   ========================================================= */


/* =========================================================
   CONFIGURACIÓN
   ========================================================= */

const WHATSAPP_NUMBER = "5492325590916";


/* =========================================================
   PRODUCTOS
   ========================================================= */

const PRODUCTS = [

  {
    id: 1,
    name: "Remera Básica Algodón",
    cat: "remeras",
    price: 8500,
    oldPrice: null,
    badge: "nuevo",
    description: "Remera básica cómoda para todos los días.",
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    emoji: "👕",
    isNew: true,
    pesoG: 200
  },

  {
    id: 2,
    name: "Remera Oversize Estampada",
    cat: "remeras",
    price: 11500,
    oldPrice: null,
    badge: "hot",
    description: "Modelo oversize con estilo urbano.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👕",
    isNew: true,
    pesoG: 250
  },

  {
    id: 3,
    name: "Remera Manga Larga",
    cat: "remeras",
    price: 9800,
    oldPrice: null,
    badge: null,
    description: "Remera manga larga para combinar todos los días.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👕",
    isNew: false,
    pesoG: 250
  },

  {
    id: 4,
    name: "Jean Skinny Azul",
    cat: "pantalones",
    price: 28500,
    oldPrice: 34000,
    badge: "nuevo",
    description: "Jean clásico de calce skinny.",
    sizes: ["36", "38", "40", "42", "44", "46"],
    emoji: "👖",
    isNew: true,
    pesoG: 650
  },

  {
    id: 5,
    name: "Jean Mom Fit",
    cat: "pantalones",
    price: 31000,
    oldPrice: null,
    badge: "hot",
    description: "Jean mom fit de estilo urbano.",
    sizes: ["36", "38", "40", "42", "44"],
    emoji: "👖",
    isNew: false,
    pesoG: 700
  },

  {
    id: 6,
    name: "Pantalón Cargo Beige",
    cat: "pantalones",
    price: 24500,
    oldPrice: 29000,
    badge: "oferta",
    description: "Cargo cómodo y versátil.",
    sizes: ["36", "38", "40", "42", "44"],
    emoji: "👖",
    isNew: false,
    pesoG: 550
  },

  {
    id: 7,
    name: "Jogger Deportivo",
    cat: "pantalones",
    price: 18000,
    oldPrice: 24000,
    badge: "oferta",
    description: "Jogger cómodo para un look relajado.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👖",
    isNew: false,
    pesoG: 500
  },

  {
    id: 8,
    name: "Vestido Midi Floral",
    cat: "vestidos",
    price: 34000,
    oldPrice: null,
    badge: "nuevo",
    description: "Vestido midi con estampado floral.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👗",
    isNew: true,
    pesoG: 400
  },

  {
    id: 9,
    name: "Vestido Camisero",
    cat: "vestidos",
    price: 29500,
    oldPrice: null,
    badge: null,
    description: "Vestido camisero cómodo y versátil.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👗",
    isNew: false,
    pesoG: 400
  },

  {
    id: 10,
    name: "Vestido Mini Lencero",
    cat: "vestidos",
    price: 27000,
    oldPrice: 32000,
    badge: "hot",
    description: "Vestido mini de estilo femenino.",
    sizes: ["S", "M", "L"],
    emoji: "👗",
    isNew: false,
    pesoG: 300
  },

  {
    id: 11,
    name: "Campera Bomber Negra",
    cat: "camperas",
    price: 52000,
    oldPrice: 69000,
    badge: "oferta",
    description: "Campera bomber negra de estilo urbano.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "🧥",
    isNew: false,
    pesoG: 900
  },

  {
    id: 12,
    name: "Campera de Jean",
    cat: "camperas",
    price: 47000,
    oldPrice: null,
    badge: null,
    description: "Campera de jean clásica.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "🧥",
    isNew: false,
    pesoG: 850
  },

  {
    id: 13,
    name: "Campera Rompeviento",
    cat: "camperas",
    price: 38500,
    oldPrice: null,
    badge: "nuevo",
    description: "Campera liviana para días de viento.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "🧥",
    isNew: true,
    pesoG: 550
  },

  {
    id: 14,
    name: "Buzo Canguro Unisex",
    cat: "buzos",
    price: 21000,
    oldPrice: null,
    badge: "nuevo",
    description: "Buzo canguro cómodo y amplio.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "🧶",
    isNew: true,
    pesoG: 650
  },

  {
    id: 15,
    name: "Buzo Crop con Capucha",
    cat: "buzos",
    price: 19500,
    oldPrice: null,
    badge: "hot",
    description: "Buzo crop con capucha.",
    sizes: ["S", "M", "L"],
    emoji: "🧶",
    isNew: false,
    pesoG: 500
  },

  {
    id: 16,
    name: "Sweater Tejido Oversize",
    cat: "buzos",
    price: 23000,
    oldPrice: 27000,
    badge: null,
    description: "Sweater tejido de calce oversize.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "🧶",
    isNew: false,
    pesoG: 550
  },

  {
    id: 17,
    name: "Conjunto Deportivo Licra",
    cat: "conjuntos",
    price: 36000,
    oldPrice: null,
    badge: "nuevo",
    description: "Conjunto deportivo cómodo.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👚",
    isNew: true,
    pesoG: 500
  },

  {
    id: 18,
    name: "Conjunto Buzo + Jogger",
    cat: "conjuntos",
    price: 42000,
    oldPrice: 55000,
    badge: "oferta",
    description: "Conjunto cómodo de buzo y jogger.",
    sizes: ["S", "M", "L", "XL"],
    emoji: "👚",
    isNew: false,
    pesoG: 850
  },

  {
    id: 19,
    name: "Conjunto Lino Verano",
    cat: "conjuntos",
    price: 45000,
    oldPrice: null,
    badge: "nuevo",
    description: "Conjunto fresco para verano.",
    sizes: ["S", "M", "L"],
    emoji: "👚",
    isNew: true,
    pesoG: 450
  },

  {
    id: 20,
    name: "Cinturón Cuero Trenzado",
    cat: "accesorios",
    price: 9500,
    oldPrice: null,
    badge: null,
    description: "Cinturón trenzado para completar tu look.",
    sizes: ["Único"],
    emoji: "👜",
    isNew: false,
    pesoG: 150
  },

  {
    id: 21,
    name: "Bolso Tote Grande",
    cat: "accesorios",
    price: 22000,
    oldPrice: null,
    badge: "nuevo",
    description: "Bolso tote amplio y práctico.",
    sizes: ["Único"],
    emoji: "👜",
    isNew: true,
    pesoG: 500
  },

  {
    id: 22,
    name: "Gorro Beanie Tejido",
    cat: "accesorios",
    price: 7500,
    oldPrice: null,
    badge: null,
    description: "Gorro tejido para completar tu look.",
    sizes: ["Único"],
    emoji: "🧢",
    isNew: false,
    pesoG: 100
  },

  {
    id: 23,
    name: "Medias Pack x3",
    cat: "accesorios",
    price: 5500,
    oldPrice: 7500,
    badge: "oferta",
    description: "Pack de tres pares de medias.",
    sizes: ["Único"],
    emoji: "🧦",
    isNew: false,
    pesoG: 150
  }

];


/* =========================================================
   ESTADO
   ========================================================= */

let currentCat = "todos";
let pendingProduct = null;
let selectedSize = null;

let cart = loadCart();


/* =========================================================
   UTILIDADES
   ========================================================= */

function formatPrice(value) {

  return "$" + Number(value).toLocaleString("es-AR");

}


function escapeHTML(value) {

  return String(value)
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

}


function saveCart() {

  try {
    localStorage.setItem(
      "aromoda_cart",
      JSON.stringify(cart)
    );
  } catch (error) {
    console.warn("No se pudo guardar el carrito.", error);
  }

}


function loadCart() {

  try {

    const saved = localStorage.getItem("aromoda_cart");

    if (!saved) {
      return [];
    }

    const parsed = JSON.parse(saved);

    return Array.isArray(parsed) ? parsed : [];

  } catch (error) {

    console.warn("Carrito anterior inválido. Se inicia uno nuevo.");

    return [];

  }

}


/* =========================================================
   NAVEGACIÓN
   ========================================================= */

const hamburger = document.getElementById("hamburger");
const nav = document.getElementById("nav");

if (hamburger) {

  hamburger.addEventListener("click", () => {

    nav.classList.toggle("open");

  });

}


function closeNav() {

  if (nav) {
    nav.classList.remove("open");
  }

}


window.addEventListener("scroll", () => {

  const header = document.getElementById("header");

  if (!header) return;

  if (window.scrollY > 20) {
    header.classList.add("scrolled");
  } else {
    header.classList.remove("scrolled");
  }

});


/* =========================================================
   FILTROS
   ========================================================= */

function filterCat(button) {

  document
    .querySelectorAll(".category-btn")
    .forEach(btn => btn.classList.remove("active"));

  button.classList.add("active");

  currentCat = button.dataset.cat || "todos";

  applyFilters();

  document
    .getElementById("catalogo")
    ?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    });

}


function applyFilters() {

  const searchInput =
    document.getElementById("searchInput");

  const sortSelect =
    document.getElementById("sortSelect");

  const search =
    searchInput
      ? searchInput.value.trim().toLowerCase()
      : "";

  const sort =
    sortSelect
      ? sortSelect.value
      : "default";


  let filtered = PRODUCTS.filter(product => {

    const categoryMatch =
      currentCat === "todos" ||
      product.cat === currentCat;

    const searchMatch =
      !search ||
      product.name.toLowerCase().includes(search) ||
      product.description.toLowerCase().includes(search) ||
      product.cat.toLowerCase().includes(search);

    return categoryMatch && searchMatch;

  });


  switch (sort) {

    case "price-asc":
      filtered.sort((a, b) => a.price - b.price);
      break;

    case "price-desc":
      filtered.sort((a, b) => b.price - a.price);
      break;

    case "name-asc":
      filtered.sort((a, b) =>
        a.name.localeCompare(b.name, "es")
      );
      break;

    case "new":
      filtered.sort((a, b) =>
        Number(b.isNew) - Number(a.isNew)
      );
      break;

  }


  renderProducts(filtered);

}


/* =========================================================
   RENDER PRODUCTOS
   ========================================================= */

function renderProducts(products) {

  const grid =
    document.getElementById("productGrid");

  const noResults =
    document.getElementById("noResults");

  const count =
    document.getElementById("resultsCount");


  if (!grid) return;


  grid.innerHTML = "";


  if (count) {

    count.textContent =
      products.length +
      (products.length === 1
        ? " producto"
        : " productos");

  }


  if (products.length === 0) {

    if (noResults) {
      noResults.hidden = false;
    }

    return;

  }


  if (noResults) {
    noResults.hidden = true;
  }


  products.forEach(product => {

    const card =
      document.createElement("article");

    card.className = "product-card";


    const badgeHTML =
      product.badge
        ? `
          <span class="card-badge badge-${product.badge}">
            ${product.badge}
          </span>
        `
        : "";


    const oldPriceHTML =
      product.oldPrice
        ? `
          <span class="old-price">
            ${formatPrice(product.oldPrice)}
          </span>
        `
        : "";


    const sizesHTML =
      product.sizes
        .map(size =>
          `<span class="size-tag">${escapeHTML(size)}</span>`
        )
        .join("");


    card.innerHTML = `

      <div class="card-img">

        ${badgeHTML}

        <button
          class="card-favorite"
          onclick="toggleWish(this)"
          aria-label="Favorito"
        >
          ♡
        </button>

        <div class="card-emoji">
          ${product.emoji}
        </div>

      </div>


      <div class="card-info">

        <div class="card-category">
          ${escapeHTML(product.cat)}
        </div>

        <h3 class="card-name">
          ${escapeHTML(product.name)}
        </h3>

        <p class="card-description">
          ${escapeHTML(product.description)}
        </p>

        <div class="card-sizes">
          ${sizesHTML}
        </div>

        <div class="card-bottom">

          <div class="price-line">

            <span class="price">
              ${formatPrice(product.price)}
            </span>

            ${oldPriceHTML}

          </div>

          <button
            class="add-btn"
            onclick="openSizeModal(${product.id})"
          >
            🛒 Elegir talle y agregar
          </button>

        </div>

      </div>

    `;


    grid.appendChild(card);

  });

}


/* =========================================================
   FAVORITOS
   ========================================================= */

function toggleWish(button) {

  button.classList.toggle("active");

  button.textContent =
    button.classList.contains("active")
      ? "♥"
      : "♡";

}


/* =========================================================
   MODAL TALLE
   ========================================================= */

function openSizeModal(productId) {

  const product =
    PRODUCTS.find(p => p.id === productId);

  if (!product) return;


  pendingProduct = product;
  selectedSize = null;


  const modal =
    document.getElementById("sizeModal");

  const overlay =
    document.getElementById("modalOverlay");

  const title =
    document.getElementById("modalTitle");

  const picker =
    document.getElementById("sizePicker");

  const info =
    document.getElementById("modalInfo");


  title.textContent =
    "Elegí el talle";


  picker.innerHTML =
    product.sizes
      .map(size => `
        <button
          class="size-option"
          onclick="selectSize(this, '${escapeHTML(size)}')"
        >
          ${escapeHTML(size)}
        </button>
      `)
      .join("");


  info.innerHTML = `
    <strong>${escapeHTML(product.name)}</strong><br>
    Precio: ${formatPrice(product.price)}<br>
    Elegí un talle antes de agregar el producto al carrito.
  `;


  modal.classList.add("open");
  overlay.classList.add("open");

}


function selectSize(button, size) {

  document
    .querySelectorAll(".size-option")
    .forEach(option =>
      option.classList.remove("selected")
    );

  button.classList.add("selected");

  selectedSize = size;

}


function closeModal() {

  const modal =
    document.getElementById("sizeModal");

  const overlay =
    document.getElementById("modalOverlay");


  modal.classList.remove("open");
  overlay.classList.remove("open");

  pendingProduct = null;
  selectedSize = null;

}


function confirmAddToCart() {

  if (!pendingProduct) return;


  if (!selectedSize) {

    showToast("Elegí un talle antes de continuar.");

    return;

  }


  addToCart(
    pendingProduct,
    selectedSize
  );

  closeModal();

}


/* =========================================================
   CARRITO
   ========================================================= */

function addToCart(product, size) {

  const key =
    `${product.id}-${size}`;


  const existing =
    cart.find(item => item.key === key);


  if (existing) {

    existing.qty += 1;

  } else {

    cart.push({

      key,

      id: product.id,

      name: product.name,

      price: product.price,

      emoji: product.emoji,

      size,

      qty: 1,

      pesoG: product.pesoG

    });

  }


  saveCart();

  renderCart();

  showToast(
    `${product.name} agregado al carrito.`
  );

}


function changeQty(key, amount) {

  const item =
    cart.find(product => product.key === key);

  if (!item) return;


  item.qty += amount;


  if (item.qty <= 0) {

    cart =
      cart.filter(product =>
        product.key !== key
      );

  }


  saveCart();

  renderCart();

}


function removeFromCart(key) {

  cart =
    cart.filter(item =>
      item.key !== key
    );

  saveCart();

  renderCart();

}


/* =========================================================
   RENDER CARRITO
   ========================================================= */

function renderCart() {

  const body =
    document.getElementById("cartBody");

  const empty =
    document.getElementById("cartEmpty");

  const footer =
    document.getElementById("cartFoot");

  const badge =
    document.getElementById("cartBadge");

  const subtotalElement =
    document.getElementById("subTotal");

  const totalElement =
    document.getElementById("grandTotal");


  if (!body) return;


  const totalItems =
    cart.reduce(
      (sum, item) =>
        sum + item.qty,
      0
    );


  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );


  if (badge) {
    badge.textContent = totalItems;
  }


  if (cart.length === 0) {

    body.innerHTML = `
      <div class="cart-empty">
        <div>🛍️</div>
        <p>Tu carrito está vacío.</p>
        <button
          class="btn btn-outline"
          onclick="toggleCart()"
        >
          Seguir comprando
        </button>
      </div>
    `;


    if (footer) {
      footer.style.display = "none";
    }

    return;

  }


  if (footer) {
    footer.style.display = "block";
  }


  body.innerHTML =
    cart
      .map(item => `

        <div class="cart-item">

          <div class="cart-item-img">
            ${item.emoji}
          </div>

          <div class="cart-item-info">

            <div class="cart-item-name">
              ${escapeHTML(item.name)}
            </div>

            <div class="cart-item-size">
              Talle: ${escapeHTML(item.size)}
            </div>

            <div class="cart-item-price">
              ${formatPrice(item.price)}
            </div>

            <div class="qty-controls">

              <button
                class="qty-btn"
                onclick="changeQty('${item.key}', -1)"
              >
                −
              </button>

              <span class="qty-value">
                ${item.qty}
              </span>

              <button
                class="qty-btn"
                onclick="changeQty('${item.key}', 1)"
              >
                +
              </button>

            </div>

          </div>

          <button
            class="delete-btn"
            onclick="removeFromCart('${item.key}')"
            title="Eliminar"
          >
            🗑️
          </button>

        </div>

      `)
      .join("");


  if (subtotalElement) {
    subtotalElement.textContent =
      formatPrice(subtotal);
  }


  if (totalElement) {
    totalElement.textContent =
      formatPrice(subtotal);
  }

}


/* =========================================================
   ABRIR / CERRAR CARRITO
   ========================================================= */

const cartToggle =
  document.getElementById("cartToggle");

if (cartToggle) {

  cartToggle.addEventListener(
    "click",
    toggleCart
  );

}


function toggleCart() {

  const drawer =
    document.getElementById("cartDrawer");

  const overlay =
    document.getElementById("cartOverlay");


  drawer.classList.toggle("open");
  overlay.classList.toggle("open");

}


/* =========================================================
   WHATSAPP
   ========================================================= */

function sendWhatsApp() {

  if (cart.length === 0) {

    showToast("El carrito está vacío.");

    return;

  }


  let message =
    "Hola! Quiero hacer un pedido en AROMODA:%0A%0A";


  cart.forEach(item => {

    message +=
      `• ${item.name}%0A` +
      `  Talle: ${item.size}%0A` +
      `  Cantidad: ${item.qty}%0A` +
      `  Precio: ${formatPrice(item.price)}%0A%0A`;

  });


  const subtotal =
    cart.reduce(
      (sum, item) =>
        sum + item.price * item.qty,
      0
    );


  message +=
    `Subtotal: ${formatPrice(subtotal)}%0A%0A`;

  message +=
    "Quiero consultar disponibilidad y envío.";


  const url =
    `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;


  window.open(url, "_blank");

}


/* =========================================================
   CALCULADORA DE ENVÍO
   ========================================================= */

function calcularEnvio() {

  const cpInput =
    document.getElementById("cpDestino");

  const pesoInput =
    document.getElementById("pesoEnvio");

  const tipoInput =
    document.getElementById("tipoEnvio");

  const result =
    document.getElementById("shippingResult");


  const cp =
    cpInput.value.trim();

  const peso =
    Number(pesoInput.value);

  const tipo =
    tipoInput.value;


  if (!cp || !peso || peso <= 0) {

    result.innerHTML =
      "⚠️ Completá el código postal y el peso.";

    result.classList.add("show");

    return;

  }


  let base;


  if (peso <= 500) {
    base = 3200;
  } else if (peso <= 1000) {
    base = 4500;
  } else if (peso <= 2000) {
    base = 6000;
  } else if (peso <= 5000) {
    base = 7500;
  } else if (peso <= 10000) {
    base = 9500;
  } else {
    base = 12000;
  }


  let multiplier = 1;


  if (tipo === "prioritaria") {
    multiplier = 1.35;
  }

  if (tipo === "sucursal") {
    multiplier = .85;
  }


  const price =
    Math.round(base * multiplier);


  let days = "3 a 7 días hábiles";


  if (tipo === "prioritaria") {
    days = "2 a 5 días hábiles";
  }

  if (tipo === "sucursal") {
    days = "3 a 7 días hábiles";
  }


  result.innerHTML = `
    <strong>${formatPrice(price)}</strong>
    <br>
    <span>
      Estimación para CP ${escapeHTML(cp)}
      · ${days}
    </span>
  `;


  result.classList.add("show");

}


/* =========================================================
   TOAST
   ========================================================= */

function showToast(message) {

  const container =
    document.getElementById("toasts");

  if (!container) return;


  const toast =
    document.createElement("div");

  toast.className = "toast";

  toast.textContent = message;


  container.appendChild(toast);


  setTimeout(() => {

    toast.remove();

  }, 3000);

}


/* =========================================================
   REINICIAR FILTROS
   ========================================================= */

function resetFilters() {

  currentCat = "todos";


  const searchInput =
    document.getElementById("searchInput");

  const sortSelect =
    document.getElementById("sortSelect");


  if (searchInput) {
    searchInput.value = "";
  }

  if (sortSelect) {
    sortSelect.value = "default";
  }


  document
    .querySelectorAll(".category-btn")
    .forEach(btn => {

      btn.classList.toggle(
        "active",
        btn.dataset.cat === "todos"
      );

    });


  applyFilters();

}


/* =========================================================
   EVENTOS DE BÚSQUEDA
   ========================================================= */

const searchInput =
  document.getElementById("searchInput");

if (searchInput) {

  searchInput.addEventListener(
    "input",
    applyFilters
  );

}


const sortSelect =
  document.getElementById("sortSelect");

if (sortSelect) {

  sortSelect.addEventListener(
    "change",
    applyFilters
  );

}


/* =========================================================
   ESC PARA CERRAR
   ========================================================= */

document.addEventListener("keydown", event => {

  if (event.key === "Escape") {

    closeModal();

    const drawer =
      document.getElementById("cartDrawer");

    const overlay =
      document.getElementById("cartOverlay");


    drawer?.classList.remove("open");
    overlay?.classList.remove("open");

  }

});


/* =========================================================
   INICIO
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

  applyFilters();

  renderCart();

});