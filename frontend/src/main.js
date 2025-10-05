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
.sidebar-current-title { display: none; margin-left: 12px; }
.sidebar-menu:has(.sidebar-panel.active) .sidebar-back-text { display: none !important; }
.sidebar-menu:has(.sidebar-panel.active) .sidebar-current-title { display: inline-block !important; font: 600 14px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: var(--text); }
.sidebar-menu:has(.sidebar-panel.active) .sidebar-header { border-bottom: 1px solid #d9d9d9 !important; padding: 24px 28px 16px 28px !important; background: transparent !important; }
.sidebar-menu:has(.sidebar-panel.active) .sidebar-subpanel-title { display: none !important; }
/* Fallback for browsers without :has() */
.sidebar-menu.has-active-panel .sidebar-back-text { display: none !important; }
.sidebar-menu.has-active-panel .sidebar-current-title { display: inline-block !important; font: 600 14px/1.2 -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; letter-spacing: .06em; text-transform: uppercase; color: var(--text); }
.sidebar-menu.has-active-panel .sidebar-header { border-bottom: 1px solid #d9d9d9 !important; padding: 24px 28px 16px 28px !important; background: transparent !important; }
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

// Load footer after page animations complete
window.addEventListener('DOMContentLoaded', function() {
    // Initialize sidebar menu
    initSidebarMenu();

    // Wait for GSAP animations to complete (8 seconds total)
    setTimeout(function() {
        fetch('./frontend/footer-component.html')
            .then(response => response.text())
            .then(html => {
                // Find the last section in main-content and append footer after it
                const mainContent = document.getElementById('main-content');
                if (mainContent) {
                    const footerContainer = document.createElement('div');
                    footerContainer.innerHTML = html;
                    mainContent.appendChild(footerContainer);
                }
            })
            .catch(error => console.log('Footer load error:', error));
    }, 8000);
});
