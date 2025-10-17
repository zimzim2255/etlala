 // Sidebar Menu Functionality - Multi-Level Navigation (Minas-Style)
function initSidebarMenu() {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const sidebarMenu = document.querySelector('.sidebar-menu');
    const sidebarOverlay = document.querySelector('.sidebar-overlay');
    const sidebarClose = document.querySelector('.sidebar-close');
    const sidebarBack = document.querySelector('.sidebar-back');
    const body = document.body;
    
    let currentPanel = null;
    let panelHistory = [];

    // Set active state for header nav links based on current page
    (function setActiveHeaderLink(){
        const currentPath = window.location.pathname;
        const headerLinks = document.querySelectorAll('.sidebar-header-link');
        headerLinks.forEach(link => {
            const linkPath = new URL(link.href, window.location.origin).pathname;
            if (currentPath === linkPath || (currentPath === '/index.html' && linkPath === '/')) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });
    })();

    // Create inline current title after Back button
    const sidebarHeader = document.querySelector('.sidebar-header');
    const currentTitleEl = document.createElement('span');
    currentTitleEl.className = 'sidebar-current-title';
    if (sidebarHeader && sidebarBack) {
        sidebarHeader.insertBefore(currentTitleEl, sidebarBack.nextSibling);
    }

    // Inject CSS for inline title and drill-down header style
    (function injectSidebarStyles(){
        if (document.getElementById('sidebar-drilldown-style')) return;
        const style = document.createElement('style');
        style.id = 'sidebar-drilldown-style';
        style.textContent = `
.sidebar-current-title { 
  display: none; 
  font: 600 15px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; 
  letter-spacing: .06em; 
  text-transform: uppercase; 
  color: var(--text);
  text-align: center;
  flex: 1;
}
.sidebar-menu:has(.sidebar-panel.active) .sidebar-current-title { display: block !important; }
.sidebar-menu:has(.sidebar-panel.active) .sidebar-subpanel-title { display: none !important; }
/* Fallback for browsers without :has() */
.sidebar-menu.has-active-panel .sidebar-current-title { display: block !important; }
.sidebar-menu.has-active-panel .sidebar-subpanel-title { display: none !important; }
        `;
        document.head.appendChild(style);
    })();

    // Open sidebar
    function openSidebar() {
        sidebarMenu.classList.add('active');
        sidebarOverlay.classList.add('active');
        body.classList.add('sidebar-open');
        resetPanels();
    }

    // Close sidebar
    function closeSidebar() {
        sidebarMenu.classList.remove('active');
        sidebarOverlay.classList.remove('active');
        body.classList.remove('sidebar-open');
        setTimeout(resetPanels, 400); // Reset after animation
    }
    
    // Reset all panels to initial state
    function resetPanels() {
        document.querySelectorAll('.sidebar-panel').forEach(panel => {
            panel.classList.remove('active', 'previous');
        });
        currentPanel = null;
        panelHistory = [];
        if (sidebarBack) {
            sidebarBack.classList.remove('visible');
        }
        if (currentTitleEl) {
            currentTitleEl.textContent = '';
        }
        if (sidebarMenu) {
            sidebarMenu.classList.remove('has-active-panel');
        }
    }
    
    // Open a sub-panel
    function openPanel(panelId) {
        const panel = document.getElementById('panel-' + panelId);
        if (!panel) return;
        
        // If there's a current panel, mark it as previous
        if (currentPanel) {
            currentPanel.classList.remove('active');
            currentPanel.classList.add('previous');
            panelHistory.push(currentPanel);
        }
        
        // Activate new panel
        panel.classList.add('active');
        currentPanel = panel;

        // Update header inline title and drilldown state
        const titleNode = panel.querySelector('.sidebar-subpanel-title');
        if (titleNode && currentTitleEl) {
            currentTitleEl.textContent = titleNode.textContent || '';
        }
        if (sidebarMenu) {
            sidebarMenu.classList.add('has-active-panel');
        }
        
        // Show back button
        if (sidebarBack) {
            sidebarBack.classList.add('visible');
        }
    }
    
    // Go back to previous panel
    function goBack() {
        if (currentPanel) {
            currentPanel.classList.remove('active');
        }
        
        if (panelHistory.length > 0) {
            const previousPanel = panelHistory.pop();
            previousPanel.classList.remove('previous');
            previousPanel.classList.add('active');
            currentPanel = previousPanel;

            // Update header inline title
            const titleNode = currentPanel.querySelector('.sidebar-subpanel-title');
            if (titleNode && currentTitleEl) {
                currentTitleEl.textContent = titleNode.textContent || '';
            }
            if (sidebarMenu) {
                sidebarMenu.classList.add('has-active-panel');
            }
        } else {
            currentPanel = null;
            if (sidebarBack) {
                sidebarBack.classList.remove('visible');
            }
            if (currentTitleEl) {
                currentTitleEl.textContent = '';
            }
            if (sidebarMenu) {
                sidebarMenu.classList.remove('has-active-panel');
            }
        }
    }

    // Event listeners
    if (hamburgerBtn) {
        hamburgerBtn.addEventListener('click', openSidebar);
    }

    if (sidebarClose) {
        sidebarClose.addEventListener('click', closeSidebar);
    }

    if (sidebarOverlay) {
        sidebarOverlay.addEventListener('click', closeSidebar);
    }
    
    if (sidebarBack) {
        sidebarBack.addEventListener('click', goBack);
    }

    // Close sidebar on ESC key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && sidebarMenu.classList.contains('active')) {
            if (currentPanel) {
                goBack();
            } else {
                closeSidebar();
            }
        }
    });

    // Panel navigation buttons
    const panelButtons = document.querySelectorAll('[data-panel]');
    panelButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const panelId = this.getAttribute('data-panel');
            openPanel(panelId);
        });
    });

    // Close sidebar when clicking on final links
    const finalLinks = document.querySelectorAll('.sidebar-link, .sidebar-subpanel-link');
    finalLinks.forEach(link => {
        link.addEventListener('click', closeSidebar);
    });
}

// Insert autoplaying videos into Shop By Collection tiles (Moisturizer, Cleanser, Sunscreen)
function insertShopByCollectionVideos() {
    try {
        var container = document.querySelector('.div-style-a0273da9');
        if (!container) return;
        var configs = [
            { selector: '.div-style-b686f8d8', src: './frontend/public/category-1.mp4' }, // MOISTURIZER
            { selector: '.div-style-69503951', src: './frontend/public/category-2.mp4' }, // CLEANSER
            { selector: '.div-style-a005d590', src: './frontend/public/category-3.mp4' }  // SUNSCREEN
        ];
        configs.forEach(function(cfg) {
            var col = container.querySelector(cfg.selector);
            if (!col) return;
            if (col.querySelector('video.shop-by-collection-video')) return; // avoid duplicates

            // Ensure stacking context
            if (!col.style.position) col.style.position = 'relative';

            // Create video
            var video = document.createElement('video');
            video.className = 'shop-by-collection-video';
            video.src = cfg.src;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.setAttribute('playsinline', '');
            video.setAttribute('preload', 'auto');
            // Fill parent
            video.style.position = 'absolute';
            video.style.top = '0';
            video.style.left = '0';
            video.style.right = '0';
            video.style.bottom = '0';
            video.style.width = '100%';
            video.style.height = '100%';
            video.style.objectFit = 'cover';
            video.style.zIndex = '0';
            video.style.pointerEvents = 'none';
            video.style.borderRadius = '0';

            // Make existing overlays sit above video
            Array.prototype.forEach.call(col.children, function(child){
                if (child !== video && child.style) {
                    if (!child.style.position) child.style.position = 'relative';
                    child.style.zIndex = '1';
                }
            });

            // Insert as first child
            col.insertBefore(video, col.firstChild);
        });
    } catch (e) { /* no-op */ }
}

// Utility: detect if a link likely leads to a missing page (no file extension or known html present)
function isLikelyMissingPath(href){
    try{
        var url = new URL(href, location.origin);
        // Only intercept same-origin internal links
        if (url.origin !== location.origin) return false;
        var path = url.pathname;
        // Allow known existing pages
        var known = [
            '/', '/index.html', '/products.html', '/product-details.html', '/contact.html', '/store-locator.html',
            '/footer.html', '/navbar-component.html', '/footer-component.html',
            '/cart.html', '/checkout.html', '/order-confirmation.html', '/coming-soon.html'
        ];
        if (known.indexOf(path) !== -1) return false;
        // Simple heuristic: treat as missing if it doesn't end with .html and isn't a root slash ending
        if (!/\.html$/i.test(path)) return true;
        // If it ends with .html but not in known list, still treat as missing (static host can't 404 check without HEAD)
        return true;
    }catch(e){ return false; }
}

function bootstrapComingSoonRedirects(){
    document.addEventListener('click', function(e){
        var a = e.target.closest('a[href]');
        if (!a) return;
        var href = a.getAttribute('href');
        if (!href || href.startsWith('#')) return;
        // Ignore mailto, tel, javascript, http(s) external
        if (/^(mailto:|tel:|javascript:|#)/i.test(href)) return;
        if (/^https?:\/\//i.test(href) && !href.startsWith(location.origin)) return;
        if (isLikelyMissingPath(href)){
            e.preventDefault();
            var u = new URL(href, location.origin);
            var path = u.pathname + (u.search || '') + (u.hash || '');
            location.href = '/coming-soon.html?path=' + encodeURIComponent(path);
        }
    }, true);
}

// Remove old sidebar immediately (before DOMContentLoaded)
(function removeOldSidebar(){
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', function(){
            document.querySelectorAll('.sidebar-menu, .sidebar-overlay').forEach(function(el){ el.remove(); });
        });
    } else {
        document.querySelectorAll('.sidebar-menu, .sidebar-overlay').forEach(function(el){ el.remove(); });
    }
})();

// Load footer after page animations complete
window.addEventListener('DOMContentLoaded', function() {
    // Enable Coming Soon redirects for non-existing links
    bootstrapComingSoonRedirects();

    // Inject unified Sidebar on every page, replacing any existing markup
    (function injectSidebar(){
        function mount(html){
            // Remove any existing sidebar/overlay to avoid duplicates (double-check)
            document.querySelectorAll('.sidebar-menu, .sidebar-overlay').forEach(function(el){ el.remove(); });
            // Insert at top of body for consistent z-index stacking
            var holder = document.createElement('div');
            holder.innerHTML = html;
            var frag = document.createDocumentFragment();
            while (holder.firstChild) frag.appendChild(holder.firstChild);
            document.body.insertBefore(frag, document.body.firstChild);
            // Initialize sidebar interactions
            initSidebarMenu();
        }
        fetch('./frontend/sidebar-component.html')
            .then(function(r){ return r.text(); })
            .then(function(html){ mount(html); })
            .catch(function(err){ console.log('Sidebar load error:', err); initSidebarMenu(); });
    })();

    // Ensure global search panel is available on all pages
    (function ensureSearchPanel(){
        if (!document.querySelector('script[src$="frontend/src/search-panel.js"], script[src$="/search-panel.js"], script[src*="search-panel.js"]')) {
            var sc = document.createElement('script');
            sc.src = './frontend/src/search-panel.js';
            sc.async = false;
            document.head.appendChild(sc);
        }
    })();

    // Add videos into Shop By Collection tiles
    insertShopByCollectionVideos();

    // Auto-inject footer component on every page (no per-page code needed)
    (function injectFooter(){
        // Prefer an explicit container if present
        var explicit = document.getElementById('footer-container');
        function mount(html){
            if (explicit) {
                explicit.innerHTML = html;
            } else {
                // Fallback: append before closing body
                var holder = document.createElement('div');
                holder.innerHTML = html;
                document.body.appendChild(holder);
            }
        }
        fetch('./frontend/footer-component.html')
            .then(function(r){ return r.text(); })
            .then(function(html){ mount(html); })
            .catch(function(err){ console.log('Footer load error:', err); });
    })();
});
