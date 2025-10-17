// Store Locator JavaScript - ETLALA

// Sample store data
const storesData = [
    {
        id: 1,
        name: "ETLALA Flagship Store - Casablanca",
        type: "flagship",
        address: "123 Boulevard Mohammed V, Casablanca 20000, Morocco",
        city: "Casablanca",
        phone: "+212 522-123-456",
        email: "casablanca@etlala.ma",
        hours: "Mon-Sat: 9:00 AM - 8:00 PM, Sun: 10:00 AM - 6:00 PM",
        distance: 0.5,
        services: ["Full Product Range", "Beauty Consultation", "Gift Wrapping", "Private Appointments"]
    },
    {
        id: 2,
        name: "ETLALA Morocco Mall",
        type: "retail",
        address: "Morocco Mall, Boulevard de la Corniche, Casablanca, Morocco",
        city: "Casablanca",
        phone: "+212 522-987-654",
        email: "moroccomall@etlala.ma",
        hours: "Daily: 10:00 AM - 10:00 PM",
        distance: 1.2,
        services: ["Full Product Range", "Gift Wrapping", "Express Service"]
    },
    {
        id: 3,
        name: "ETLALA Rabat Centre",
        type: "retail",
        address: "Avenue Mohammed V, Rabat 10000, Morocco",
        city: "Rabat",
        phone: "+212 537-123-789",
        email: "rabat@etlala.ma",
        hours: "Mon-Sat: 9:30 AM - 7:30 PM, Sun: Closed",
        distance: 85.3,
        services: ["Full Product Range", "Beauty Consultation", "Gift Wrapping"]
    },
    {
        id: 4,
        name: "ETLALA Marrakech Medina",
        type: "boutique",
        address: "Rue Riad Zitoun el Jdid, Marrakech 40000, Morocco",
        city: "Marrakech",
        phone: "+212 524-456-123",
        email: "marrakech@etlala.ma",
        hours: "Daily: 9:00 AM - 9:00 PM",
        distance: 238.5,
        services: ["Curated Selection", "Gift Wrapping", "Local Delivery", "Traditional Products"]
    },
    {
        id: 5,
        name: "ETLALA Tanger City Center",
        type: "retail",
        address: "Tanger City Center, Route de Rabat, Tanger, Morocco",
        city: "Tanger",
        phone: "+212 539-789-456",
        email: "tanger@etlala.ma",
        hours: "Daily: 10:00 AM - 9:00 PM",
        distance: 342.7,
        services: ["Full Product Range", "Beauty Consultation", "Gift Wrapping"]
    },
    {
        id: 6,
        name: "ETLALA Fes Medina",
        type: "boutique",
        address: "Talaa Kebira, Fes el-Bali, Fes 30000, Morocco",
        city: "Fes",
        phone: "+212 535-654-321",
        email: "fes@etlala.ma",
        hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: 10:00 AM - 5:00 PM",
        distance: 298.4,
        services: ["Curated Selection", "Traditional Products", "Gift Wrapping"]
    },
    {
        id: 7,
        name: "ETLALA Agadir Marina",
        type: "retail",
        address: "Marina d'Agadir, Boulevard du 20 Août, Agadir, Morocco",
        city: "Agadir",
        phone: "+212 528-321-987",
        email: "agadir@etlala.ma",
        hours: "Daily: 10:00 AM - 10:00 PM",
        distance: 485.2,
        services: ["Full Product Range", "Beach Products", "Gift Wrapping", "Express Service"]
    },
    {
        id: 8,
        name: "ETLALA Meknes Centre",
        type: "boutique",
        address: "Avenue Hassan II, Meknes 50000, Morocco",
        city: "Meknes",
        phone: "+212 535-147-258",
        email: "meknes@etlala.ma",
        hours: "Mon-Sat: 9:00 AM - 7:00 PM, Sun: Closed",
        distance: 245.8,
        services: ["Curated Selection", "Gift Wrapping", "Personal Shopping"]
    }
];

let filteredStores = [...storesData];

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeStoreLocator();
    setupEventListeners();
});

function initializeStoreLocator() {
    // Sort stores by distance by default
    filteredStores.sort((a, b) => a.distance - b.distance);
    displayStores(filteredStores);
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('storeSearch');
    if (searchInput) {
        searchInput.addEventListener('input', debounce(handleSearch, 300));
        searchInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                handleSearch();
            }
        });
    }

    // Filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Toggle active state
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter stores
            const filterType = this.dataset.filter;
            handleFilter(filterType);
        });
    });
}

function handleSearch() {
    const searchInput = document.getElementById('storeSearch');
    const searchTerm = searchInput.value.trim().toLowerCase();

    if (!searchTerm) {
        // Reset to current filter
        const activeFilter = document.querySelector('.filter-btn.active');
        if (activeFilter) {
            handleFilter(activeFilter.dataset.filter);
        }
        return;
    }

    // Show loading state
    showLoading();

    // Simulate API call delay
    setTimeout(() => {
        filteredStores = storesData.filter(store => {
            return store.name.toLowerCase().includes(searchTerm) ||
                   store.city.toLowerCase().includes(searchTerm) ||
                   store.address.toLowerCase().includes(searchTerm);
        });

        displayStores(filteredStores);
    }, 300);
}

function handleFilter(filterType) {
    showLoading();

    setTimeout(() => {
        if (filterType === 'all') {
            filteredStores = [...storesData];
        } else {
            filteredStores = storesData.filter(store => store.type === filterType);
        }

        // Sort by distance
        filteredStores.sort((a, b) => a.distance - b.distance);

        displayStores(filteredStores);
    }, 200);
}

function displayStores(stores) {
    const storesGrid = document.getElementById('storesGrid');
    const noResults = document.getElementById('noResults');
    
    if (!storesGrid) return;

    if (stores.length === 0) {
        storesGrid.style.display = 'none';
        noResults.style.display = 'block';
        return;
    }

    storesGrid.style.display = 'grid';
    noResults.style.display = 'none';
    storesGrid.innerHTML = stores.map(store => createStoreCard(store)).join('');

    // Add listeners to action buttons
    setupActionButtons();
}

function createStoreCard(store) {
    const typeLabels = {
        flagship: 'Flagship',
        retail: 'Retail',
        boutique: 'Boutique'
    };

    return `
        <div class="store-card" data-store-id="${store.id}">
            <div class="store-card-header">
                <div>
                    <h3 class="store-name">${store.name}</h3>
                    <span class="store-type">${typeLabels[store.type]}</span>
                </div>
                <div class="store-distance">
                    ${store.distance} km
                </div>
            </div>
            
            <div class="store-info">
                <div class="store-info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${store.address}</span>
                </div>
                <div class="store-info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    <span>${store.phone}</span>
                </div>
                <div class="store-info-item">
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="2"/>
                        <path d="M12 6V12L16 14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
                    </svg>
                    <span>${store.hours}</span>
                </div>
                ${store.services ? `
                    <div class="store-info-item">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9 12L11 14L15 10M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span>${store.services.join(' • ')}</span>
                    </div>
                ` : ''}
            </div>
            
            <div class="store-actions">
                <button class="action-btn directions-btn" data-store-id="${store.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        <path d="M2 17L12 22L22 17M2 12L12 17L22 12" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                    Directions
                </button>
                <button class="action-btn call-btn" data-store-id="${store.id}">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" stroke-width="2"/>
                    </svg>
                    Call
                </button>
            </div>
        </div>
    `;
}

function setupActionButtons() {
    // Directions buttons
    document.querySelectorAll('.directions-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const storeId = parseInt(this.dataset.storeId);
            getDirections(storeId);
        });
    });

    // Call buttons
    document.querySelectorAll('.call-btn').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.stopPropagation();
            const storeId = parseInt(this.dataset.storeId);
            callStore(storeId);
        });
    });
}

function getDirections(storeId) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;

    // Open Google Maps with directions
    const destination = encodeURIComponent(store.address);
    const url = `https://www.google.com/maps/dir/?api=1&destination=${destination}`;
    window.open(url, '_blank');
}

function callStore(storeId) {
    const store = storesData.find(s => s.id === storeId);
    if (!store) return;

    // Initiate phone call
    window.location.href = `tel:${store.phone}`;
}

function showLoading() {
    const storesGrid = document.getElementById('storesGrid');
    if (storesGrid) {
        storesGrid.innerHTML = `
            <div class="loading" style="grid-column: 1 / -1;">
                <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-dasharray="60" stroke-dashoffset="40"/>
                </svg>
                <p style="margin-top: 15px; color: #6B7C6F;">Loading stores...</p>
            </div>
        `;
    }
}

// Debounce function for search input
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}
