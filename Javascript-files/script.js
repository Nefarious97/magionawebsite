const track = document.querySelector('.carousel-track');
const dots = document.querySelectorAll('.dot');

function ensureSharedFooterStyles() {
  if (document.querySelector('link[href*="sections-sync.css"]')) return;
  const stylesheet = document.createElement('link');
  stylesheet.rel = 'stylesheet';
  stylesheet.href = 'CSS-files/sections-sync.css';
  document.head.appendChild(stylesheet);
}

function renderSharedFooter() {
  ensureSharedFooterStyles();
  document.body.classList.add('shared-footer-page');
  const pageName = (window.location.pathname.split('/').pop() || 'index.html')
    .replace(/\.html$/i, '')
    .replace(/[^a-z0-9-]/gi, '-');
  document.body.classList.add(`page-${pageName}`);
  const existingFooter = document.querySelector('footer');
  const footer = document.createElement('footer');
  footer.className = 'site-footer';
  footer.innerHTML = `
    <div class="footer">
      <div class="footer-grid">
        <div class="footer-col address-col">
          <a class="footer-logo" href="index.html" aria-label="Mangiona home"><img src="image/Logo m 2.png" alt="Mangiona"></a>
          <p class="footer-summary">Fresh meals from restaurants you love, delivered quickly and reliably across Lagos.</p>
          <address class="footer-contact">
            <a href="https://maps.google.com/?q=11+Sampson+Ubani+Street+Aba+Abia+State" target="_blank" rel="noopener noreferrer"><iconify-icon icon="mdi:map-marker-outline"></iconify-icon><span>11 Sampson Ubani Street, Aba,<br>Abia State, Nigeria</span></a>
            <a href="mailto:mangiona@gmail.com"><iconify-icon icon="mdi:email-outline"></iconify-icon><span>mangiona@gmail.com</span></a>
            <a href="tel:09021449487"><iconify-icon icon="mdi:phone-outline"></iconify-icon><span>09021449487</span></a>
          </address>
        </div>
        <nav class="footer-col links-col" aria-label="Explore"><p class="sub-title">Explore</p><ul><li><a href="index.html">Home</a></li><li><a href="restaurant.html">Restaurants</a></li><li><a href="food.html">Popular meals</a></li><li><a href="track.html">Track an order</a></li></ul></nav>
        <nav class="footer-col links-col" aria-label="Company"><p class="sub-title">Company</p><ul><li><a href="about.html">About Us</a></li><li><a href="blog.html">Our blog</a></li><li><a href="contact.html">Partner with us</a></li><li><a href="contact.html">Contact us</a></li></ul></nav>
        <nav class="footer-col links-col" aria-label="Help and legal"><p class="sub-title">Help</p><ul><li><a href="contact.html">Help centre</a></li><li><a href="contact.html">FAQs</a></li><li><a href="terms.html">Terms</a></li><li><a href="privacy.html">Privacy</a></li></ul></nav>
        <div class="footer-col app-col">
          <p class="sub-title">Get the app</p><p class="app-copy">Order faster and track every delivery from your phone.</p>
          <button class="store-btn google-btn" type="button" aria-label="Get Mangiona on Google Play"><iconify-icon icon="logos:google-play-icon"></iconify-icon><span class="source"><small>GET IT ON</small><strong>Google Play</strong></span></button>
          <button class="store-btn apple-btn" type="button" aria-label="Download Mangiona on the App Store"><iconify-icon icon="ic:baseline-apple"></iconify-icon><span class="source"><small>Download on the</small><strong>App Store</strong></span></button>
          <div class="footer-socials" aria-label="Mangiona social media"><a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer" aria-label="Instagram"><iconify-icon icon="mdi:instagram"></iconify-icon></a><a href="https://x.com/" target="_blank" rel="noopener noreferrer" aria-label="X"><iconify-icon icon="ri:twitter-x-fill"></iconify-icon></a><a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" aria-label="Facebook"><iconify-icon icon="mdi:facebook"></iconify-icon></a></div>
        </div>
      </div>
      <hr class="footer-hr">
      <div class="footer-bottom"><p>&copy; ${new Date().getFullYear()} Mangiona. All rights reserved.</p><div class="mangiona-policy"><a href="terms.html">Terms &amp; Conditions</a><a href="privacy.html">Privacy Policy</a></div></div>
      <p class="watermark" aria-hidden="true">MANGIONA</p>
    </div>`;

  if (existingFooter) existingFooter.replaceWith(footer);
  else document.body.insertBefore(footer, document.querySelector('.bg-overlay'));
}

renderSharedFooter();

function updateScrolledHeader() {
  const header = document.querySelector('header');
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 24);
}

updateScrolledHeader();
window.addEventListener('scroll', updateScrolledHeader, { passive: true });

let index = 0;
const totalSlides = dots.length;

function updateCarousel(){
  if (!track || !dots[index]) return;

  track.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// auto slide every 5 seconds
setInterval(() => {
  if (!totalSlides) return;

  index++;
  if(index >= totalSlides){
    index = 0;
  }
  updateCarousel();
}, 5000);

// click dots
dots.forEach((dot, i) => {
  dot.addEventListener('click', () => {
    index = i;
    updateCarousel();
  });
});

document.addEventListener('DOMContentLoaded', () => {

  const track = document.querySelector('.text-track');
  const slides = document.querySelectorAll('.text-item');
  const textSlider = document.querySelector('.text-slider');

  if (!track || !slides.length || !textSlider) return;

  let index = 0;
  let interval;

  function moveSlide(){
    index++;

    if(index >= slides.length){
      index = 0;
    }

    track.style.transform = `translateX(-${index * 100}%)`;
  }

  function startSlider(){
    interval = setInterval(moveSlide, 3000);
  }

  function stopSlider(){
    clearInterval(interval);
  }

  startSlider();

  textSlider.addEventListener('mouseenter', stopSlider);
  textSlider.addEventListener('mouseleave', startSlider);

});

const faqs = document.querySelectorAll(".faq");

faqs.forEach(faq => {
  const question = faq.querySelector(".faq-question");

  if (!question) return;

  question.addEventListener("click", () => {
    faq.classList.toggle("active");
  });
});

const navLinks = document.querySelectorAll(".nav-link");
const mobileNav = document.getElementById('mobileNav');
const mobileNavOpen = document.getElementById('mobileNavOpen');
const mobileNavClose = document.getElementById('mobileNavClose');

navLinks.forEach(link => {

  link.addEventListener("click", () => {

    // remove active from all links
    navLinks.forEach(item => {
      item.classList.remove("active");
    });

    // add active to clicked link
    link.classList.add("active");

    if (mobileNav) {
      mobileNav.classList.remove('active');
      document.body.style.overflow = '';
    }
  });
});

if (mobileNavOpen) {
  mobileNavOpen.addEventListener('click', () => {
    mobileNav?.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

if (mobileNavClose) {
  mobileNavClose.addEventListener('click', () => {
    mobileNav?.classList.remove('active');
    document.body.style.overflow = '';
  });
}

function openCart() {
    const cartPanel = document.querySelector('.cart-panel');
    const overlay = document.querySelector('.bg-overlay');
    if (!cartPanel || !overlay) return;

    cartPanel.classList.add('active');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeCart() {
    const cartPanel = document.querySelector('.cart-panel');
    const overlay = document.querySelector('.bg-overlay');
    if (!cartPanel || !overlay) return;

    cartPanel.classList.remove('active');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
}

let sumTotal = 0;
let cart = getSavedCart();

function getSavedCart() {
    let savedCart = [];
    try {
        savedCart = JSON.parse(localStorage.getItem('cart'));
    } catch (e) {
        localStorage.removeItem('cart');
    }

    if (!Array.isArray(savedCart)) {
        savedCart = [];
        localStorage.removeItem('cart');
    }

    return savedCart
        .map(item => ({
            ...item,
            quantity: Number(item.quantity) || 0
        }))
        .filter(item => item.id && item.quantity > 0);
}

function getSavedUser() {
    try {
        const user = JSON.parse(localStorage.getItem('user'));
        return user && typeof user === 'object' ? user : null;
    } catch (error) {
        localStorage.removeItem('user');
        localStorage.removeItem('isLoggedIn');
        return null;
    }
}

function getProductDetails(card) {
    const imageElement = card.querySelector('img');
    const nameElement = card.querySelector('h4, h5, .name');
    const detailElement = card.querySelector('.ingredent, .verity, .cd-menu-desc, .meal-description');
    const priceElement = card.querySelector('.price, .price1, .cd-menu-price');

    return {
        image: imageElement ? imageElement.getAttribute('src') : '',
        name: nameElement ? nameElement.textContent.trim() : 'Product',
        detail: detailElement ? detailElement.textContent.trim() : '',
        price: priceElement ? priceElement.textContent.trim() : ''
    };
}

function updateMatchingCards(productId) {
    const cards = document.querySelectorAll('.cart, .menu, .cart-row, .cd-menu-card, .vendor-card');
    cards.forEach(card => {
        if (card.dataset.id === productId) {
            updateCard(card);
        }
    });
}

// Add Item
function cartValue(button) {
    const card = button.closest('.cart, .menu, .cart-row, .cd-menu-card, .vendor-card, .popular-meal-body, .meal-card, .menu-card');
    if (!card) return;

    const productDetails = getProductDetails(card);
    let productId = card.dataset.id || productDetails.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    card.dataset.id = productId;

    let item = cart.find(product => product.id === productId);

    if (item) {
        item.quantity = (Number(item.quantity) || 0) + 1;
        Object.assign(item, productDetails);
    } else {
        cart.push({
            id: productId,
            quantity: 1,
            ...productDetails
        });
    }

    saveCart();
    updateMatchingCards(productId);
    updateCartUI();
    openCart();
}

// Remove Item
function removeItem(button) {
    const card = button.closest('.cart, .menu, .cart-row, .cd-menu-card, .vendor-card, .popular-meal-body, .meal-card, .menu-card');
    if (!card) return;

    const productDetails = getProductDetails(card);
    let productId = card.dataset.id || productDetails.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    let item = cart.find(product => product.id === productId);
    if (!item) return;

    item.quantity = (Number(item.quantity) || 0) - 1;

    if (item.quantity <= 0) {
        cart = cart.filter(product => product.id !== productId);
    }

    saveCart();
    updateMatchingCards(productId);
    updateCartUI();
}

// Save Cart
function saveCart() {
    try {
        localStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
        console.warn('Failed to save cart', e);
    }
}

// Update Card Quantity
function updateCard(card) {
    const productId = card.dataset.id;
    const item = cart.find(product => product.id === productId);
    const quantityElement = card.querySelector('.quantity');
    const removeBtn = card.querySelector('.remove-btn, .remove-item-btn, .remove-btn2, .cd-remove-btn');

    if (!quantityElement) return;

    if (item) {
        quantityElement.textContent = item.quantity === 1 ? '1 item' : `${item.quantity} items`;
        quantityElement.dataset.quantity = item.quantity;
        if (removeBtn) removeBtn.style.display = 'block';
    } else {
        quantityElement.textContent = '';
        quantityElement.dataset.quantity = 0;
        if (removeBtn) removeBtn.style.display = 'none';
    }
}

function checkout() {
    if (!cart || cart.length === 0) {
        alert('Your cart is empty! Please add some delicious meals first.');
        return;
    }
    window.location.href = 'transaction.html';
}

function createCartRow(item) {
    const row = document.createElement('div');
    row.className = 'cart-flex cart-row';
    row.dataset.id = item.id;

    if (item.image) {
        const image = document.createElement('img');
        image.src = item.image;
        image.alt = item.name || 'Cart item';
        row.appendChild(image);
    }

    const content = document.createElement('div');

    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = item.name || 'Product';
    content.appendChild(name);

    if (item.detail) {
        const detail = document.createElement('p');
        detail.className = 'ingredent';
        detail.textContent = item.detail;
        content.appendChild(detail);
    }

    const priceTag = document.createElement('div');
    priceTag.className = 'price-tag';

    const price = document.createElement('p');
    price.className = 'price';
    price.textContent = item.price || '';
    priceTag.appendChild(price);

    content.appendChild(priceTag);

    const actions = document.createElement('div');
    actions.className = 'actions2';

    const addButton = document.createElement('button');
    addButton.className = 'add-btn2';
    addButton.type = 'button';
    addButton.setAttribute('onclick', 'cartValue(this)');

    const addIcon = document.createElement('span');
    addIcon.style.fontSize = '24px';
    addIcon.textContent = '+';
    addButton.appendChild(addIcon);

    const quantity = document.createElement('p');
    quantity.className = 'quantity';
    quantity.dataset.quantity = Number(item.quantity) || 0;
    quantity.textContent =
        item.quantity === 1
        ? '1 item'
        : `${item.quantity} items`;

    const removeButton = document.createElement('button');
    removeButton.className = 'remove-btn2';
    removeButton.type = 'button';
    removeButton.setAttribute('onclick', 'removeItem(this)');
    removeButton.textContent = '-';
    removeButton.style.display = 'block';

    actions.appendChild(addButton);
    actions.appendChild(quantity);
    actions.appendChild(removeButton);
    content.appendChild(actions);

    row.appendChild(content);

    return row;
}

function renderCartItems() {
    const cartItems = document.querySelector('.cart-items');
    const checkoutCartItems = document.querySelector('.checkout-cart-items');

    if (cartItems) {
        cartItems.innerHTML = '';
    }

    if (checkoutCartItems) {
        checkoutCartItems.innerHTML = '';
    }

    if (!cart.length) {
        const emptyMessage = document.createElement('p');
        emptyMessage.className = 'cart-empty';
        emptyMessage.textContent = 'Your cart is empty';
        if (cartItems) cartItems.appendChild(emptyMessage.cloneNode(true));
        if (checkoutCartItems) checkoutCartItems.appendChild(emptyMessage);
        return;
    }

    cart.forEach(item => {
        if (cartItems) cartItems.appendChild(createCartRow(item));
        if (checkoutCartItems) checkoutCartItems.appendChild(createCheckoutRow(item));
    });
}

function createCheckoutRow(item) {
    const row = document.createElement('div');
    row.className = 'checkout-item';

    const info = document.createElement('div');
    info.className = 'checkout-item-info';

    const name = document.createElement('p');
    name.className = 'name';
    name.textContent = item.name || 'Product';
    info.appendChild(name);

    if (item.detail) {
        const detail = document.createElement('p');
        detail.className = 'ingredent';
        detail.textContent = item.detail;
        info.appendChild(detail);
    }

    row.appendChild(info);

    const qty = document.createElement('p');
    qty.className = 'checkout-quantity';
    qty.textContent = item.quantity === 1 ? '1 item' : `${item.quantity} items`;
    row.appendChild(qty);

    const price = document.createElement('p');
    price.className = 'checkout-price';
    price.textContent = item.price || '';
    row.appendChild(price);

    return row;
}

// Update Cart Badge
function updateCartCounters() {
    let total = 0;

    cart.forEach(item => {
        total += Number(item.quantity) || 0;
    });

    // Notification inside cart
    document.querySelectorAll('.cart-count').forEach(badge => {
        badge.textContent = total;
    });

    // Red badge on cart icon
    document.querySelectorAll('.cart-count2').forEach(badge => {
        badge.textContent = total;

        if (total > 0) {
            badge.style.display = 'inline-flex';
        } else {
            badge.style.display = 'none';
        }
    });
}

function getPriceValue(price) {
    return Number(String(price).replace(/[^\d.]/g, '')) || 0;
}

function formatCurrency(amount) {
    return `₦ ${amount.toLocaleString()}`;
}

const WALLET_BALANCE_KEY = 'mangionaWalletBalance';

function getWalletBalance() {
    const balance = Number(localStorage.getItem(WALLET_BALANCE_KEY));
    return Number.isFinite(balance) && balance > 0 ? balance : 0;
}

function setWalletBalance(amount) {
    localStorage.setItem(WALLET_BALANCE_KEY, String(Math.max(0, amount)));
    updateWalletUI();
}

function updateWalletUI() {
    const balance = getWalletBalance();
    document.querySelectorAll('.wallet-balance').forEach(el => {
        el.textContent = formatCurrency(balance);
    });
    document.querySelectorAll('.wallet-option-balance').forEach(el => {
        el.textContent = `Balance: ${formatCurrency(balance)}`;
    });
}

function fundWallet() {
    const entry = window.prompt('Enter the amount you want to add to your Mangiona Wallet:');
    if (entry === null) return;

    const amount = Number(entry.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(amount) || amount <= 0) {
        alert('Please enter a valid amount.');
        return;
    }

    setWalletBalance(getWalletBalance() + amount);
    alert(`${formatCurrency(amount)} has been added to your wallet for this website demo.`);
}

function updateCartSummary() {
    const baseTotal = cart.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = getPriceValue(item.price);
        return sum + price * quantity;
    }, 0);

    const subtotalEl = document.querySelector('.subtotal-cost');
    const totalCostEl = document.querySelector('.total-cost, .taotal-cost, .cart-items-summary p:nth-child(2)');
    const summaryTotalEl = document.querySelector('.summary-total');

    if (subtotalEl) {
        subtotalEl.textContent = formatCurrency(baseTotal);
    }

    if (totalCostEl) {
        totalCostEl.textContent = `Total: ${formatCurrency(baseTotal)}`;
    }

    if (summaryTotalEl) {
        const shipping = 1200;
        const total = baseTotal + shipping;
        summaryTotalEl.textContent = formatCurrency(total);
    }
}

function updateCartUI() {
    updateCartCounters();
    renderCartItems();
    updateCartSummary();
}

// Confirm payment: validate address & payment, show success panel inline
function confirmPayment() {
      if (!cart || cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const addrEl = document.querySelector('.delivery-address');
    let value = '';

    if (!addrEl) {
        alert('Please add a delivery address before proceeding.');
        return;
    }

    if (addrEl.tagName === 'INPUT') {
        value = (addrEl.value || '').trim();
    } else {
        value = (addrEl.textContent || '').trim();
    }

    if (!value || value.toLowerCase().includes('no address')) {
        if (addrEl.tagName === 'INPUT') {
            addrEl.classList.add('error');
            addrEl.focus();
        } else {
            const changeBtn = document.querySelector('.change-btn');
            if (changeBtn) changeBtn.click();
            setTimeout(() => {
                const newInput = document.querySelector('.delivery-address');
                if (newInput && newInput.tagName === 'INPUT') {
                    newInput.classList.add('error');
                    newInput.focus();
                }
            }, 50);
        }

        alert('Please enter your delivery address before proceeding to payment.');
        return;
    }

    if (addrEl.tagName === 'INPUT') addrEl.classList.remove('error');

    // Ensure a payment method is selected
}

function updateCartSummary() {
    const baseTotal = cart.reduce((sum, item) => {
        const quantity = Number(item.quantity) || 0;
        const price = getPriceValue(item.price);
        return sum + price * quantity;
    }, 0);

    const subtotalEl = document.querySelector('.subtotal-cost');
    const totalCostEl = document.querySelector('.total-cost, .taotal-cost, .cart-items-summary p:nth-child(2)');
    const summaryTotalEl = document.querySelector('.summary-total');

    if (subtotalEl) {
        subtotalEl.textContent = formatCurrency(baseTotal);
    }

    if (totalCostEl) {
        totalCostEl.textContent = `Total: ${formatCurrency(baseTotal)}`;
    }

    if (summaryTotalEl) {
        const shipping = 1200;
        const total = baseTotal + shipping;
        summaryTotalEl.textContent = formatCurrency(total);
    }
}

function updateCartUI() {
    updateCartCounters();
    renderCartItems();
    updateCartSummary();
}

// Confirm payment: validate address & payment, show success panel inline
function confirmPayment() {
    if (!cart || cart.length === 0) {
        alert('Your cart is empty');
        return;
    }

    const addrEl = document.querySelector('.delivery-address');
    let value = '';

    if (!addrEl) {
        alert('Please add a delivery address before proceeding.');
        return;
    }

    if (addrEl.tagName === 'INPUT') {
        value = (addrEl.value || '').trim();
    } else {
        value = (addrEl.textContent || '').trim();
    }

    if (!value || value.toLowerCase().includes('no address')) {
        if (addrEl.tagName === 'INPUT') {
            addrEl.classList.add('error');
            addrEl.focus();
        } else {
            const changeBtn = document.querySelector('.change-btn');
            if (changeBtn) changeBtn.click();
            setTimeout(() => {
                const newInput = document.querySelector('.delivery-address');
                if (newInput && newInput.tagName === 'INPUT') {
                    newInput.classList.add('error');
                    newInput.focus();
                }
            }, 50);
        }

        alert('Please enter your delivery address before proceeding to payment.');
        return;
    }

    if (addrEl.tagName === 'INPUT') addrEl.classList.remove('error');

    // Ensure a payment method is selected
    const selectedPayment = document.querySelector('input[name="payment"]:checked');
    if (!selectedPayment) {
        alert('Please select a payment method');
        return;
    }

    // If user is not logged in, redirect to sign-in / sign-up first
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const user = getSavedUser();
    if (!isLoggedIn) {
        localStorage.setItem('redirectAfterLogin', 'transaction.html');
        if (!user) {
            window.location.href = 'sign-up.html';
        } else {
            window.location.href = 'sign-in.html';
        }
        return;
    }

    const orderTotal = cart.reduce((sum, item) => {
        return sum + (getPriceValue(item.price) * (Number(item.quantity) || 0));
    }, 0) + 1200;

    if (selectedPayment.value === 'wallet' && getWalletBalance() < orderTotal) {
        alert(`Your wallet balance is insufficient. Add ${formatCurrency(orderTotal - getWalletBalance())} to continue.`);
        const walletPanel = document.getElementById('walletPanel');
        if (walletPanel) walletPanel.hidden = false;
        return;
    }

    const order = {
        orderId: Math.floor(Math.random() * 1000000),
        address: localStorage.getItem('deliveryAddress') || value,
        paymentMethod: selectedPayment.value,
        transactionId: Math.floor(Math.random() * 99999999),
        deliveryTime: '25 Mins',
        total: orderTotal
    };

    localStorage.setItem('currentOrder', JSON.stringify(order));
    // Simulate Loading State
    const confirmBtn = document.querySelector('.confirm-payment-btn');
    if (confirmBtn) {
        confirmBtn.innerHTML = '<iconify-icon icon="mdi:loading" class="spin"></iconify-icon> Processing...';
        confirmBtn.style.opacity = '0.8';
        confirmBtn.style.pointerEvents = 'none';
    }

    setTimeout(() => {
        if (selectedPayment.value === 'wallet') {
            setWalletBalance(getWalletBalance() - orderTotal);
        }

        // Populate success page fields if present
        const addrNode = document.querySelector('.address');
        if (addrNode) addrNode.textContent = order.address;
        
        // Hide checkout area and show success panel
        const checkoutEl = document.querySelector('.checkout-page');
        if (checkoutEl) checkoutEl.style.display = 'none';
        const successEl = document.querySelector('.success-page');
        if (successEl) {
            successEl.style.display = 'block';
            successEl.scrollIntoView({ behavior: 'smooth' });
        }
        
        // Clear cart
        cart = [];
        localStorage.removeItem('cart');
        updateCartUI();
        
        if (confirmBtn) {
            confirmBtn.innerHTML = 'Confirm Payment';
            confirmBtn.style.opacity = '1';
            confirmBtn.style.pointerEvents = 'auto';
        }
    }, 2000);
}

// Load Saved Cart
function initSavedCart() {
    const cards = document.querySelectorAll('.cart, .menu');

    cards.forEach(card => {
        const productId = card.dataset.id;
        const item = cart.find(product => product.id === productId);

        if (item && (!item.image || !item.price || !item.name)) {
            Object.assign(item, getProductDetails(card));
        }

        updateCard(card);
    });

    saveCart();
    updateCartUI();
    displayUserInNav();
}

if (document.readyState === 'loading') {
    window.addEventListener('DOMContentLoaded', initSavedCart);
} else {
    initSavedCart();
}

function checkout() {
    if (!cart || cart.length === 0) {
        alert('Your cart is empty. Please add items before checking out.');
        return;
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
        window.location.href = 'transaction.html';
        return;
    }

    const user = getSavedUser();
    localStorage.setItem('redirectAfterLogin', 'transaction.html');

    if (!user) {
        window.location.href = 'sign-up.html';
        return;
    }

    window.location.href = 'sign-in.html';
}

// Show logged-in user's name in the nav (if present)
function displayUserInNav() {
    try {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const user = getSavedUser();

        if (!isLoggedIn || !user || !user.username) return;

        const navContainer = document.querySelector('.mangiona-order') || document.querySelector('header nav');
        if (!navContainer || document.querySelector('.nav-username')) return;

        const container = document.createElement('div');
        container.className = 'nav-username';
        container.style.display = 'flex';
        container.style.alignItems = 'center';
        container.style.gap = '10px';

        const greet = document.createElement('span');
        greet.textContent = `Hi, ${user.username}`;
        greet.style.fontWeight = '600';

        const logout = document.createElement('button');
        logout.textContent = 'Logout';
        logout.className = 'logout-btn';
        logout.style.padding = '8px 10px';
        logout.style.borderRadius = '8px';
        logout.style.border = 'none';
        logout.style.background = '#047857';
        logout.style.color = '#fff';
        logout.style.cursor = 'pointer';
        logout.onclick = signOut;

        container.appendChild(greet);
        container.appendChild(logout);

        navContainer.appendChild(container);
    } catch (e) {
        // ignore parsing errors
    }
}

function signOut() {
    localStorage.removeItem('isLoggedIn');
    window.location.href = 'index.html';
}

function signIn(event) {
    if (event) event.preventDefault();
    const emailEl = document.querySelector('.email');
    const passwordEl = document.querySelector('.password');
    if (!emailEl || !passwordEl) return;

    const email = emailEl.value.trim();
    const password = passwordEl.value.trim();
    const user = getSavedUser();

    if (!user) {
        alert('Account does not exist. Please sign up first.');
        return;
    }

    if (email !== user.email || password !== user.password) {
        alert('Incorrect email or password.');
        return;
    }

    localStorage.setItem('isLoggedIn', 'true');
    const redirect = localStorage.getItem('redirectAfterLogin');

    if (redirect) {
        localStorage.removeItem('redirectAfterLogin');
        window.location.href = redirect;
    } else {
        window.location.href = 'index.html';
    }
}

function signUp() {
    const username = document.querySelector('.username')?.value || '';
    const email = document.querySelector('.email')?.value || '';
    const password = document.querySelector('.password')?.value || '';
    const confirmPassword = document.getElementById('confirm')?.value || '';
    const error = document.querySelector('.password-error');

    if (password !== confirmPassword) {
        if (error) error.textContent = 'Passwords do not match.';
        return;
    }

    if (error) error.textContent = '';

    const user = { username, email, password };
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('isLoggedIn', 'true');
    window.location.href = 'signup-success.html';
}

function changeAddress() {
    const changeBtn = document.querySelector('.change-btn');
    let addressContainer = document.querySelector('.delivery-address');
    let currentAddress = localStorage.getItem('deliveryAddress') || '';

    if (!changeBtn) return;

    function createParagraph(address) {
        const p = document.createElement('p');
        p.className = 'delivery-address';
        if (!address) {
            p.textContent = 'No Address Selected';
            p.classList.add('empty');
        } else {
            p.textContent = address;
            p.classList.remove('empty');
        }
        return p;
    }

    if (!addressContainer) {
        addressContainer = createParagraph(currentAddress);
        if (changeBtn.parentNode) changeBtn.parentNode.insertBefore(addressContainer, changeBtn);
    } else if (addressContainer.tagName === 'P' && !addressContainer.textContent.trim()) {
        addressContainer.replaceWith(createParagraph(currentAddress));
        addressContainer = document.querySelector('.delivery-address');
    }

    function switchToInput() {
        const input = document.createElement('input');
        input.type = 'text';
        input.className = 'delivery-address';
        input.placeholder = 'Enter delivery address';
        input.value = currentAddress;
        input.required = true;
        addressContainer.replaceWith(input);
        addressContainer = input;
        input.focus();

        input.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') saveFromInput();
        });
    }

    function saveFromInput() {
        const newAddress = (addressContainer.value || '').trim();
        currentAddress = newAddress;
        const p = createParagraph(newAddress);
        addressContainer.replaceWith(p);
        addressContainer = p;
        localStorage.setItem('deliveryAddress', currentAddress);
        changeBtn.textContent = 'Change Address';
    }

    if (!addressContainer) return;

    if (addressContainer.tagName === 'P') {
        switchToInput();
        changeBtn.textContent = 'Save Address';
    } else {
        saveFromInput();
    }
}

// --- SCROLL REVEAL OBSERVER ---
function initScrollReveal() {
    const revealElements = document.querySelectorAll('.reveal-on-scroll');
    if (!revealElements.length) return;

    if (!('IntersectionObserver' in window)) {
        revealElements.forEach(el => el.classList.add('is-revealed'));
        return;
    }

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-revealed');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.05, rootMargin: '0px 0px -20px 0px' });

    revealElements.forEach(el => observer.observe(el));
}

// --- MOCK SEARCH & NEWSLETTER ---
function initAppListeners() {
    // Hero Search
    const searchBtns = document.querySelectorAll('.search-btn');
    searchBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.previousElementSibling;
            if (input && input.value.trim() !== '') {
                alert(`Searching for restaurants near: ${input.value}`);
                input.value = '';
                window.location.href = 'restaurant.html';
            } else {
                alert('Please enter a delivery address first.');
            }
        });
    });

    // Newsletter Subscription
    const updateBtns = document.querySelectorAll('.update-btn');
    updateBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const input = btn.previousElementSibling;
            if (input && input.type === 'email') {
                if (input.value.includes('@')) {
                    alert(`Thanks for subscribing! We've sent a welcome email to ${input.value}.`);
                    input.value = '';
                } else {
                    alert('Please enter a valid email address.');
                }
            }
        });
    });

    const paymentRadios = document.querySelectorAll('input[name="payment"]');
    const cardForm = document.getElementById('cardForm');
    
    if (paymentRadios.length > 0 && cardForm) {
        const walletPanel = document.getElementById('walletPanel');
        paymentRadios.forEach(radio => {
            radio.addEventListener('change', (e) => {
                if (e.target.value === 'new-card') {
                    cardForm.style.display = 'block';
                } else {
                    cardForm.style.display = 'none';
                }
                if (walletPanel) walletPanel.hidden = e.target.value !== 'wallet';
            });
        });
    }

    updateWalletUI();

    initScrollReveal();
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAppListeners);
} else {
    initAppListeners();
}
