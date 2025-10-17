// Navbar Dropdown Functionality

// Sample products data for search (you can replace with actual data)
const searchProducts = [
    {
        id: 1,
        name: "Super Serum Skin Mist SPF 40",
        price: 40,
        image: "./frontend/public/Etlala_Whithening_night_cream.webp"
    },
    {
        id: 2,
        name: "Hydrating Facial Mist",
        price: 40,
        image: "./frontend/public/Hair_Serum.webp"
    },
    {
        id: 3,
        name: "Restore Facial Serum",
        price: 40,
        image: "./frontend/public/Etlala_Anti_Strech_marks_Serum.webp"
    },
    {
        id: 4,
        name: "Glow Facial Mist",
        price: 40,
        image: "./frontend/public/Etlala_hair_Shampoo.webp"
    },
    {
        id: 5,
        name: "Brightening Mascara",
        price: 35,
        image: "./frontend/public/Etlala_Mascara_brighter.webp"
    },
    {
        id: 6,
        name: "Nail Strengthener",
        price: 28,
        image: "./frontend/public/Etlala_Strengthens_and_lengthens_Nails_brighter.webp"
    },
    {
        id: 7,
        name: "Invisible Sunscreen SPF 50",
        price: 45,
        image: "./frontend/public/ItlalaCremesolaireinvisible.webp"
    },
    {
        id: 8,
        name: "Gentle Cleansing Gel",
        price: 32,
        image: "./frontend/public/ItlalaGelNettoyantmatched.webp"
    }
];

// Initialize dropdowns
function initNavbarDropdowns() {
    const overlay = document.querySelector('.navbar-dropdown-overlay');
    const dropdowns = document.querySelectorAll('.navbar-dropdown');
    
    // Cart button
    const cartLink = document.querySelector('.cart-link');
    const cartDropdown = document.getElementById('cart-dropdown');
    
    // Search button
    const searchBtn = document.querySelector('.search-btn');
    const searchDropdown = document.getElementById('search-dropdown');
    
    // Account button
    const accountIcon = document.querySelector('.account-icon');
    const accountDropdown = document.getElementById('account-dropdown');
    
    // Close buttons
    const closeButtons = document.querySelectorAll('.dropdown-close');
    
    // Open cart dropdown
    if (cartLink && cartDropdown) {
        cartLink.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllDropdowns();
            cartDropdown.classList.add('active');
            overlay.classList.add('active');
            updateCartDropdown();
        });
    }
    
    // Open search dropdown
    if (searchBtn && searchDropdown) {
        searchBtn.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllDropdowns();
            searchDropdown.classList.add('active');
            overlay.classList.add('active');
            
            // Focus on search input
            setTimeout(() => {
                const searchInput = document.getElementById('navbar-search-input');
                if (searchInput) searchInput.focus();
            }, 100);
        });
    }
    
    // Open account dropdown
    if (accountIcon && accountDropdown) {
        accountIcon.addEventListener('click', function(e) {
            e.preventDefault();
            closeAllDropdowns();
            accountDropdown.classList.add('active');
            overlay.classList.add('active');
        });
    }
    
    // Close buttons
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            closeAllDropdowns();
        });
    });
    
    // Close on overlay click
    if (overlay) {
        overlay.addEventListener('click', function() {
            closeAllDropdowns();
        });
    }
    
    // Close on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeAllDropdowns();
        }
    });
    
    // Initialize search functionality
    initSearchDropdown();
    
    // Initialize cart functionality
    initCartDropdown();
    
    // Initialize account functionality
    initAccountDropdown();
}

// Close all dropdowns
function closeAllDropdowns() {
    const overlay = document.querySelector('.navbar-dropdown-overlay');
    const dropdowns = document.querySelectorAll('.navbar-dropdown');
    
    dropdowns.forEach(dropdown => {
        dropdown.classList.remove('active');
    });
    
    if (overlay) {
        overlay.classList.remove('active');
    }
}

// ========== CART DROPDOWN ==========

function initCartDropdown() {
    updateCartDropdown();
}

function updateCartDropdown() {
    // Read and normalize cart items
    let cart = JSON.parse(localStorage.getItem('etlala_cart') || '[]');
    cart = cart.map(item => ({
        ...item,
        id: item.id,
        quantity: item.quantity != null ? item.quantity : (item.qty != null ? item.qty : 1),
        image: item.image || './frontend/public/logo.png'
    }));

    const cartItemsContainer = document.getElementById('cart-items');
    const cartEmpty = document.getElementById('cart-empty');
    const cartFooter = document.getElementById('cart-footer');
    const cartTotal = document.getElementById('cart-total');
    
    if (!cartItemsContainer) return;
    
    if (cart.length === 0) {
        cartItemsContainer.style.display = 'none';
        if (cartEmpty) cartEmpty.style.display = 'flex';
        if (cartFooter) cartFooter.style.display = 'none';
        return;
    }
    
    cartItemsContainer.style.display = 'flex';
    if (cartEmpty) cartEmpty.style.display = 'none';
    if (cartFooter) cartFooter.style.display = 'block';
    
    // Calculate total in DH when currency present; fallback to $ formatting
    const total = cart.reduce((sum, item) => sum + (Number(item.price) * Number(item.quantity)), 0);
    if (cartTotal) {
        const anyDH = cart.some(i => (i.currency || '').toUpperCase() === 'DH');
        cartTotal.textContent = anyDH ? `${total.toFixed(0)} DH` : `${total.toFixed(2)}`;
    }
    
    // Render cart items
    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item" data-product-id="${item.id}">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h4 class="cart-item-name">${item.name}</h4>
                <p class="cart-item-price">${(item.currency||'').toUpperCase()==='DH' ? `${Number(item.price).toFixed(0)} DH` : `${Number(item.price).toFixed(2)}`}</p>
                <div class="cart-item-quantity">
                    <button class="qty-btn qty-decrease" data-product-id="${item.id}">-</button>
                    <span class="qty-value">${item.quantity}</span>
                    <button class="qty-btn qty-increase" data-product-id="${item.id}">+</button>
                </div>
            </div>
            <button class="cart-item-remove" data-product-id="${item.id}">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                </svg>
            </button>
        </div>
    `).join('');
    
    // Attach event listeners
    attachCartEventListeners();
}

function attachCartEventListeners() {
    // Increase quantity
    document.querySelectorAll('.qty-increase').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            updateCartQuantity(productId, 1);
        });
    });
    
    // Decrease quantity
    document.querySelectorAll('.qty-decrease').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            updateCartQuantity(productId, -1);
        });
    });
    
    // Remove item
    document.querySelectorAll('.cart-item-remove').forEach(btn => {
        btn.addEventListener('click', function() {
            const productId = this.getAttribute('data-product-id');
            removeFromCart(productId);
        });
    });
}

function updateCartQuantity(productId, change) {
    let cart = JSON.parse(localStorage.getItem('etlala_cart') || '[]');
    const idx = cart.findIndex(item => String(item.id) === String(productId));
    if (idx > -1) {
        const item = cart[idx];
        const currentQty = item.quantity != null ? item.quantity : (item.qty != null ? item.qty : 1);
        const nextQty = currentQty + change;
        if (nextQty <= 0) {
            cart.splice(idx, 1);
        } else {
            item.quantity = nextQty;
            delete item.qty;
            cart[idx] = item;
        }
        localStorage.setItem('etlala_cart', JSON.stringify(cart));
        updateCartDropdown();
        updateCartBadge();
    }
}

function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('etlala_cart') || '[]');
    cart = cart.filter(item => String(item.id) !== String(productId));
    localStorage.setItem('etlala_cart', JSON.stringify(cart));
    updateCartDropdown();
    updateCartBadge();
}

function updateCartBadge() {
    const cart = JSON.parse(localStorage.getItem('etlala_cart') || '[]');
    const cartBadge = document.querySelector('.cart-badge');
    if (cartBadge) {
        const totalItems = cart.reduce((sum, item) => sum + (item.quantity != null ? item.quantity : (item.qty != null ? item.qty : 1)), 0);
        cartBadge.textContent = totalItems;
    }
}

// ========== SEARCH DROPDOWN ==========

function initSearchDropdown() {
    const searchInput = document.getElementById('navbar-search-input');
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    const popularTags = document.querySelectorAll('.popular-tag');
    
    if (!searchInput) return;
    
    // Search input
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase().trim();
        
        if (query.length === 0) {
            searchResults.style.display = 'none';
            searchEmpty.style.display = 'block';
            return;
        }
        
        const results = searchProducts.filter(product => 
            product.name.toLowerCase().includes(query)
        );
        
        displaySearchResults(results);
    });
    
    // Popular tags
    popularTags.forEach(tag => {
        tag.addEventListener('click', function() {
            const searchTerm = this.getAttribute('data-search');
            searchInput.value = searchTerm;
            searchInput.dispatchEvent(new Event('input'));
        });
    });
}

function displaySearchResults(results) {
    const searchResults = document.getElementById('search-results');
    const searchEmpty = document.getElementById('search-empty');
    
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.style.display = 'none';
        searchEmpty.innerHTML = '<p>No products found</p>';
        searchEmpty.style.display = 'block';
        return;
    }
    
    searchEmpty.style.display = 'none';
    searchResults.style.display = 'flex';
    
    searchResults.innerHTML = results.map(product => `
        <a href="/product.html?id=${product.id}" class="search-result-item">
            <img src="${product.image}" alt="${product.name}" class="search-result-image">
            <div class="search-result-details">
                <h4 class="search-result-name">${product.name}</h4>
                <p class="search-result-price">$${product.price}</p>
            </div>
        </a>
    `).join('');
}

// ========== ACCOUNT DROPDOWN ==========

function initAccountDropdown() {
    const logoutBtn = document.querySelector('.logout-btn');
    
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            // Handle logout
            if (confirm('Are you sure you want to logout?')) {
                // Clear user session
                localStorage.removeItem('etlala_user');
                // Redirect to login page
                window.location.href = '/login.html';
            }
        });
    }
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initNavbarDropdowns();
    // Ensure badge is in sync on load
    updateCartBadge();
});

// Export functions for use in other scripts
if (typeof window !== 'undefined') {
    window.updateCartDropdown = updateCartDropdown;
    window.updateCartBadge = updateCartBadge;
}
