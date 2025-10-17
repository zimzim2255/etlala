// Products data (you can replace this with actual product data from a database/API)
const allProducts = [
    {
        id: 'tebrima',
        name: "Tebrima",
        price: 118,
        currency: 'DH',
        category: "serum",
        type: "face",
        badge: "Mise en avant",
        image: "./frontend/public/products/tebrima.JPG",
        rating: 5,
        reviews: 230,
        short: "Sérum éclaircissant intensif qui unifie le teint et réduit les taches pigmentaires."
    },
    {
        id: 'creme-eclaircissante',
        name: "Crème Éclaircissante au Caviar Vert",
        price: 259,
        currency: 'DH',
        category: "moisturizer",
        type: "face",
        badge: "Mise en avant",
        image: "./frontend/public/products/creme eclaircissante.JPG",
        rating: 5,
        reviews: 198,
        short: "Crème éclaircissante luxueuse enrichie au caviar vert pour un teint lumineux."
    },
    {
        id: 'hair-serum',
        name: "Sérum Capillaire Etlala",
        price: 119,
        currency: 'DH',
        category: "serum",
        type: "hair",
        badge: "Nouveau",
        image: "./frontend/public/products/hair-serum.JPG",
        rating: 5,
        reviews: 276,
        short: "Sérum capillaire nourrissant qui renforce, ajoute de la brillance et protège contre les dommages."
    },
    {
        id: 'creme-solaire',
        name: "Écran Solaire au Caviar Vert",
        price: 225,
        currency: 'DH',
        category: "sunscreen",
        type: "face",
        badge: "Nouveau",
        image: "./frontend/public/products/creme-solaire.JPG",
        rating: 5,
        reviews: 312,
        short: "Protection solaire haute performance enrichie au caviar vert."
    },
    {
        id: 'gel-nettoyage',
        name: "Gel Nettoyant au Caviar Vert",
        price: 159,
        currency: 'DH',
        category: "cleanser",
        type: "face",
        badge: "Mise en avant",
        image: "./frontend/public/products/gel-nettoyage.JPG",
        rating: 5,
        reviews: 189,
        short: "Gel nettoyant doux qui purifie la peau en profondeur tout en préservant son hydratation."
    },
    {
        id: 'hair-conditioner',
        name: "Démêlant Etlala",
        price: 115,
        currency: 'DH',
        category: "conditioner",
        type: "hair",
        badge: "Meilleure vente",
        image: "./frontend/public/products/hair-conditioner.JPG",
        rating: 5,
        reviews: 245,
        short: "Démêlant nourrissant qui facilite le coiffage et laisse les cheveux doux et brillants."
    },
    {
        id: 'hair-oil',
        name: "Huile Capillaire Etlala",
        price: 129,
        currency: 'DH',
        category: "oil",
        type: "hair",
        badge: "Meilleure vente",
        image: "./frontend/public/products/hair-oil.JPG",
        rating: 5,
        reviews: 267,
        short: "Huile capillaire nourrissante qui répare et protège les cheveux abîmés."
    },
    {
        id: 'hair-shampoo',
        name: "Shampooing Etlala",
        price: 110,
        currency: 'DH',
        category: "shampoo",
        type: "hair",
        badge: "Mise en avant",
        image: "./frontend/public/products/hair-shampoo.JPG",
        rating: 5,
        reviews: 221,
        short: "Shampooing doux qui nettoie et nourrit les cheveux de la racine aux pointes."
    }
];

let currentFilter = {
    badge: 'Featured',
    category: '',
    type: '',
    search: ''
};

// Filter tabs functionality
const filterTabs = document.querySelectorAll('.filter-tab');
filterTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        filterTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        
        // Set badge filter based on tab text
        const tabText = this.textContent.trim();
        if (tabText === 'Featured') {
            currentFilter.badge = 'Featured';
        } else if (tabText === 'Best Seller') {
            currentFilter.badge = 'Best Seller';
        } else if (tabText === 'New Arrival') {
            currentFilter.badge = 'New';
        }
        
        filterProducts();
    });
});

// Category filter (first dropdown)
const categorySelect = document.querySelectorAll('.filter-select')[0];
if (categorySelect) {
    categorySelect.addEventListener('change', function() {
        currentFilter.category = this.value;
        filterProducts();
    });
}

// Type filter (second dropdown)
const typeSelect = document.querySelectorAll('.filter-select')[1];
if (typeSelect) {
    typeSelect.addEventListener('change', function() {
        currentFilter.type = this.value;
        filterProducts();
    });
}

// Search functionality
const searchInput = document.querySelector('.search-input');
if (searchInput) {
    searchInput.addEventListener('input', function() {
        currentFilter.search = this.value.toLowerCase();
        filterProducts();
    });
}

// Filter products based on current filters
function filterProducts() {
    let filteredProducts = allProducts.filter(product => {
        // Badge filter
        const badgeMatch = !currentFilter.badge || product.badge === currentFilter.badge;
        
        // Category filter
        const categoryMatch = !currentFilter.category || product.category === currentFilter.category;
        
        // Type filter
        const typeMatch = !currentFilter.type || product.type === currentFilter.type;
        
        // Search filter
        const searchMatch = !currentFilter.search || 
            product.name.toLowerCase().includes(currentFilter.search);
        
        return badgeMatch && categoryMatch && typeMatch && searchMatch;
    });
    
    displayProducts(filteredProducts);
}

// Display products in the grid
function displayProducts(products) {
    const productsGrid = document.querySelector('.products-grid');
    
    if (products.length === 0) {
        productsGrid.innerHTML = `
            <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
                <h3 style="font-size: 24px; margin-bottom: 10px;">No products found</h3>
                <p style="opacity: 0.7;">Try adjusting your filters or search terms</p>
            </div>
        `;
        return;
    }
    
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-product-id="${product.id}">
            <div class="product-image-wrapper">
                <button class="wishlist-btn" data-product-id="${product.id}">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="#6E8B72" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                </button>
                <span class="product-badge">${product.badge}</span>
                <img src="${product.image}" alt="${product.name}" class="product-image">
            </div>
            <div class="product-info">
                <h3 class="product-name">${product.name}</h3>
                <div class="product-rating">
                    <div class="stars">
                        ${'<span class="star">★</span>'.repeat(product.rating)}
                    </div>
                    <span class="review-count">(${product.reviews} reviews)</span>
                </div>
                <div class="product-footer">
                    <div class="product-price">$${product.price}</div>
                    <button class="add-to-cart-btn" data-product-id="${product.id}">Add to Cart</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Re-attach event listeners for new elements
    attachProductEventListeners();
}

// Hydrate static product cards with data attributes for event wiring
function hydrateStaticProductCards() {
    const cards = document.querySelectorAll('.product-card');
    cards.forEach(card => {
        const nameEl = card.querySelector('.product-name');
        if (!nameEl) return;
        const name = nameEl.textContent.trim();
        const match = allProducts.find(p => p.name === name);
        if (!match) return;
        card.setAttribute('data-product-id', match.id);
        const addBtn = card.querySelector('.add-to-cart-btn');
        if (addBtn) addBtn.setAttribute('data-product-id', match.id);
        const wishBtn = card.querySelector('.wishlist-btn');
        if (wishBtn) wishBtn.setAttribute('data-product-id', match.id);
        const imgEl = card.querySelector('.product-image');
        if (imgEl && imgEl.getAttribute('src')) {
            // If the current image isn't from our known assets, replace it
            const src = imgEl.getAttribute('src');
            if (!/frontend\/public\//.test(src)) {
                imgEl.setAttribute('src', match.image);
                imgEl.setAttribute('alt', match.name);
            }
        }
    });
}

// Attach event listeners to product cards
function attachProductEventListeners() {
    // Make product cards clickable (navigate to product details)
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', function(e) {
            // Don't navigate if clicking on wishlist or add-to-cart buttons
            if (e.target.closest('.wishlist-btn') || e.target.closest('.add-to-cart-btn')) {
                return;
            }
            const productId = this.getAttribute('data-product-id');
            if (productId) {
                window.location.href = `/product-details.html?id=${productId}`;
            }
        });
    });

    // Add to cart functionality
    const addToCartBtns = document.querySelectorAll('.add-to-cart-btn');
    addToCartBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation(); // Prevent card click
            const card = this.closest('.product-card');
            const dataId = this.getAttribute('data-product-id') || (card ? card.getAttribute('data-product-id') : null);
            let product = null;

            // Try dataset -> allProducts
            if (dataId) {
                const match = allProducts.find(p => String(p.id) === String(dataId));
                if (match) product = { ...match, currency: match.currency || 'DH' };
            }

            // Fallback: build product from DOM (static cards)
            if (!product && card) {
                product = buildProductFromCard(card);
            }

            if (product) {
                addToCart(product);

                const originalText = this.textContent;
                this.textContent = 'Ajouté !';
                this.style.background = '#D4AF37';
                this.style.color = '#FFFFFF';

                setTimeout(() => {
                    this.textContent = originalText;
                    this.style.background = '#FFFFFF';
                    this.style.color = '#6E8B72';
                }, 1500);
            }
        });
    });

    // Wishlist functionality
    const wishlistBtns = document.querySelectorAll('.wishlist-btn');
    wishlistBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id') || (this.closest('.product-card')?.getAttribute('data-product-id') || '');
            toggleWishlist(productId);

            const svg = this.querySelector('svg path');
            const currentFill = svg.getAttribute('fill');

            if (currentFill === 'none' || !currentFill) {
                svg.setAttribute('fill', '#6E8B72');
            } else {
                svg.setAttribute('fill', 'none');
            }
        });
    });
}

// Helpers to read static product info from DOM
function parsePriceText(text) {
    const cleaned = String(text || '').trim().replace(',', '.');
    const match = cleaned.match(/([0-9]+(?:\.[0-9]+)?)\s*([A-Za-z€$DH]*)/i);
    const price = match ? parseFloat(match[1]) : 0;
    const currency = (match && match[2]) ? match[2].trim().toUpperCase() : 'DH';
    return { price: isNaN(price) ? 0 : price, currency: currency || 'DH' };
}

function buildProductFromCard(card) {
    const name = card.querySelector('.product-name')?.textContent.trim() || 'Produit';
    const imgEl = card.querySelector('img.product-image');
    const image = imgEl ? imgEl.getAttribute('src') : './frontend/public/logo.png';
    const priceText = (card.querySelector('.product-price')?.textContent || '').trim();
    const { price, currency } = parsePriceText(priceText);
    const id = card.getAttribute('data-product-id') || image || name;
    return { id, name, price, image, currency, quantity: 1 };
}

// Cart management (localStorage based, compatible with navbar dropdown)
function addToCart(product) {
    const storageKey = 'etlala_cart';
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (e) { cart = []; }

    const idStr = String(product.id);
    const idx = cart.findIndex(item => String(item.id) === idStr);

    const normalized = {
        id: product.id,
        name: product.name,
        price: Number(product.price),
        quantity: product.quantity != null ? Number(product.quantity) : 1,
        image: product.image,
        currency: (product.currency || 'DH')
    };

    if (idx > -1) {
        const currentQty = cart[idx].quantity != null ? Number(cart[idx].quantity) : (cart[idx].qty != null ? Number(cart[idx].qty) : 1);
        cart[idx].quantity = currentQty + 1;
        if (!cart[idx].image && normalized.image) cart[idx].image = normalized.image;
        if (!cart[idx].name && normalized.name) cart[idx].name = normalized.name;
        if (!cart[idx].price && normalized.price) cart[idx].price = normalized.price;
        if (!cart[idx].currency && normalized.currency) cart[idx].currency = normalized.currency;
    } else {
        cart.push(normalized);
    }

    localStorage.setItem(storageKey, JSON.stringify(cart));

    // Update badge and dropdown if available
    if (typeof window !== 'undefined' && typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    } else {
        updateCartBadgeLocal();
    }
    if (typeof window !== 'undefined' && typeof window.updateCartDropdown === 'function') {
        window.updateCartDropdown();
    }

    console.log('Product added to cart:', normalized.name);
}

function updateCartBadgeLocal() {
    const storageKey = 'etlala_cart';
    let cart = [];
    try { cart = JSON.parse(localStorage.getItem(storageKey) || '[]'); } catch (e) { cart = []; }
    const totalItems = cart.reduce((sum, item) => sum + (item.quantity != null ? Number(item.quantity) : (item.qty != null ? Number(item.qty) : 1)), 0);
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) cartBadge.textContent = totalItems;
}

// Wishlist management
let wishlist = JSON.parse(localStorage.getItem('etlala_wishlist')) || [];

function toggleWishlist(productId) {
    const index = wishlist.indexOf(parseInt(productId));
    
    if (index > -1) {
        wishlist.splice(index, 1);
        console.log('Product removed from wishlist');
    } else {
        wishlist.push(parseInt(productId));
        console.log('Product added to wishlist');
    }
    
    localStorage.setItem('etlala_wishlist', JSON.stringify(wishlist));
}

// Load wishlist state on page load
function loadWishlistState() {
    wishlist.forEach(productId => {
        const wishlistBtn = document.querySelector(`.wishlist-btn[data-product-id="${productId}"]`);
        if (wishlistBtn) {
            const svg = wishlistBtn.querySelector('svg path');
            svg.setAttribute('fill', '#6E8B72');
        }
    });
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    if (typeof window !== 'undefined' && typeof window.updateCartBadge === 'function') {
        window.updateCartBadge();
    } else {
        updateCartBadgeLocal();
    }
    loadWishlistState();
    hydrateStaticProductCards();
    attachProductEventListeners();
});

// Initial load
if (typeof window !== 'undefined' && typeof window.updateCartBadge === 'function') {
    window.updateCartBadge();
} else {
    updateCartBadgeLocal();
}
