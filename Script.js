// ---------- MENU DATA ----------
const MENU = [
  { id: 'ellambaka', cat: 'Fish', name: 'Ellambaka', desc: 'Whole fish simmered in a home-style Kerala masala.', price: 50, veg: false, icon: 'fish' },
  { id: 'ayala', cat: 'Fish', name: 'Ayala', desc: 'Mackerel, pan-fried with curry leaf and chilli.', price: 140, veg: false, icon: 'fish' },
  { id: 'mantha', cat: 'Fish', name: 'Mantha', desc: 'Fried in a light coastal spice coating.', price: 140, veg: false, icon: 'fish' },
  { id: 'karimeen', cat: 'Fish', name: 'Karimeen', desc: 'Pearl spot, the signature Kerala backwater fish.', price: 220, veg: false, icon: 'fish' },
  { id: 'natholi', cat: 'Fish', name: 'Natholi', desc: 'Anchovy, fried crisp and lightly spiced.', price: 80, veg: false, icon: 'fish' },
  { id: 'avoli', cat: 'Fish', name: 'Avoli', desc: 'Pomfret, pan-seared with a red chilli marinade.', price: 180, veg: false, icon: 'fish' },
  { id: 'muru', cat: 'Fish', name: 'Muru', desc: 'Cooked in a tangy, slow-simmered coastal curry.', price: 160, veg: false, icon: 'fish' },
  { id: 'koonthal', cat: 'Shellfish', name: 'Koonthal', desc: 'Squid, tossed with shallots and black pepper.', price: 130, veg: false, icon: 'squid' },
  { id: 'chemeen', cat: 'Shellfish', name: 'Chemeen', desc: 'Prawns, roasted in coconut and Kerala spice.', price: 170, veg: false, icon: 'shrimp' },
  { id: 'kalummakaya', cat: 'Shellfish', name: 'Kalummakaya', desc: 'Mussels, simmered in a coconut masala.', price: 190, veg: false, icon: 'shell' },
  { id: 'therandi', cat: 'Shellfish', name: 'Therandi Vattichath', desc: 'Clams, stir-fried with onion and curry leaf.', price: 120, veg: false, icon: 'shell' },
  { id: 'chicken', cat: 'Poultry', name: 'Chicken', desc: 'Kerala-style chicken curry, slow-cooked.', price: 130, veg: false, icon: 'chicken' },
];
const CATEGORIES = ['All', ...Array.from(new Set(MENU.map(i => i.cat)))];

// ---------- ICONS ----------
const ICONS = {
  fish: `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 32c8-14 24-18 34-12 6 4 10 8 18 12-8 4-12 8-18 12-10 6-26 2-34-12Z"/><path d="M40 20l8-6v10M40 44l8 6v-10"/><circle cx="18" cy="30" r="1.8" fill="#fff" stroke="none"/><path d="M14 32c4 2 8 2 12 0"/></svg>`,
  shrimp: `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 46C8 38 8 24 18 16c8-6 20-6 24 2 3 6-1 12-7 12"/><path d="M35 30c6 0 12 4 14 10 1 4-1 8-5 8-5 0-8-4-8-9"/><path d="M14 46l-6 4M16 40l-6 2M19 34l-5 0"/><circle cx="19" cy="15" r="1.6" fill="#fff" stroke="none"/></svg>`,
  squid: `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M32 10c9 0 14 7 14 16 0 8-5 13-14 13s-14-5-14-13c0-9 5-16 14-16Z"/><circle cx="27" cy="22" r="1.6" fill="#fff" stroke="none"/><circle cx="37" cy="22" r="1.6" fill="#fff" stroke="none"/><path d="M24 39l-4 14M30 39l-1 15M34 39l1 15M40 39l4 14"/></svg>`,
  shell: `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M32 12c12 0 20 12 20 26H12c0-14 8-26 20-26Z"/><path d="M32 12v26M22 15c-2 8-3 15-3 23M42 15c2 8 3 15 3 23"/><path d="M12 38h40"/></svg>`,
  chicken: `<svg viewBox="0 0 64 64" fill="none" stroke="#fff" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="M26 12c6-4 12-2 13 4 4-2 9 1 9 6 0 8-8 10-8 18 0 7-6 12-13 12s-13-6-13-13c0-6 4-9 4-15 0-6 3-10 8-12Z"/><circle cx="34" cy="18" r="1.6" fill="#fff" stroke="none"/></svg>`,
};
function iconSvg(type) { return ICONS[type] || ICONS.fish; }

function money(n) { return '₹' + n.toLocaleString('en-IN'); }

// ---------- CART ----------
const CART_KEY = 'muthazham_cart';
function getCart() { try { return JSON.parse(localStorage.getItem(CART_KEY)) || {}; } catch (e) { return {}; } }
function saveCart(cart) { localStorage.setItem(CART_KEY, JSON.stringify(cart)); updateCartBadge(); }
function addToCart(id) { const cart = getCart(); cart[id] = (cart[id] || 0) + 1; saveCart(cart); return cart; }
function changeQty(id, delta) { const cart = getCart(); if (!cart[id]) return cart; cart[id] += delta; if (cart[id] <= 0) delete cart[id]; saveCart(cart); return cart; }
function removeFromCart(id) { const cart = getCart(); delete cart[id]; saveCart(cart); return cart; }
function clearCart() { saveCart({}); }
function cartTotalQty() { const cart = getCart(); return Object.values(cart).reduce((s, q) => s + q, 0); }
function cartSubtotal() { const cart = getCart(); return Object.keys(cart).reduce((sum, id) => { const item = MENU.find(m => m.id === id); return sum + (item ? item.price * cart[id] : 0); }, 0); }

function updateCartBadge() {
  const el = document.getElementById('cartCount');
  const badge = document.getElementById('cartBadge');
  const qty = cartTotalQty();
  if (el) el.textContent = qty;
  if (badge) { badge.style.display = qty > 0 ? 'flex' : 'none'; badge.textContent = qty; }
}

// ---------- TOAST ----------
let toastTimer;
function showToast(msg) {
  const toast = document.getElementById('toast');
  if (!toast) return;
  clearTimeout(toastTimer);
  toast.textContent = msg;
  toast.classList.add('show');
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

// ---------- USER SESSION ----------
const USER_KEY = 'muthazham_user';
let currentUser = null;

function loadSession() {
  try {
    const data = JSON.parse(localStorage.getItem(USER_KEY));
    if (data && data.name) currentUser = data;
  } catch (e) { currentUser = null; }
  updateUIForUser();
}

function saveSession(user) {
  currentUser = user;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  updateUIForUser();
}

function clearSession() {
  currentUser = null;
  localStorage.removeItem(USER_KEY);
  updateUIForUser();
}

function updateUIForUser() {
  const loginBtn = document.getElementById('navLoginBtn');
  const profileDisplay = document.getElementById('profileDisplay');
  const profileName = document.getElementById('profileName');
  const profileAvatar = document.getElementById('profileAvatar');

  if (currentUser) {
    if (loginBtn) loginBtn.style.display = 'none';
    if (profileDisplay) {
      profileDisplay.style.display = 'flex';
      profileName.textContent = currentUser.name || 'User';
      profileAvatar.textContent = (currentUser.name || 'U')[0].toUpperCase();
    }
  } else {
    if (loginBtn) loginBtn.style.display = 'inline';
    if (profileDisplay) profileDisplay.style.display = 'none';
  }
}

// ---------- SCROLL REVEAL ----------
function initReveal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const revealEls = document.querySelectorAll('.reveal');
  if (reduceMotion) { revealEls.forEach(el => el.classList.add('in')); return; }
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
  }, { threshold: .12 });
  revealEls.forEach(el => io.observe(el));
}