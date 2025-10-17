// ETLALA Search Panel Controller
(function(){
  const SEARCH_PANEL_URL = './frontend/search-panel.html';
  const STYLE_URL = './frontend/style/search-panel.css';

  let containerEl = null;
  let inputEl = null;
  let resultsEl = null;
  let emptyEl = null;

  // Lightweight demo dataset (maps to your local images)
  const demoProducts = [
    { id: 'p1', title: 'Hydrating Night Cream', price: '249 MAD', img: './frontend/public/Etlala_Whithening_night_cream.webp', tags: ['moisturizer','night','hydration'] },
    { id: 'p2', title: 'Anti-Stretch Marks Serum', price: '319 MAD', img: './frontend/public/Etlala_Anti_Strech_marks_Serum.webp', tags: ['serum','body','repair'] },
    { id: 'p3', title: 'Vitamin C Face Serum', price: '289 MAD', img: './frontend/public/Hair_Serum.webp', tags: ['serum','brightening','vitamin c'] },
    { id: 'p4', title: 'Purifying Gel Cleanser', price: '179 MAD', img: './frontend/public/ItlalaGelNettoyantmatched.webp', tags: ['cleanser','gel','purifying'] },
    { id: 'p5', title: 'Invisible Sunscreen SPF50', price: '209 MAD', img: './frontend/public/ItlalaCremesolaireinvisible.webp', tags: ['sunscreen','spf','uv'] },
    { id: 'p6', title: 'Lash Volume Mascara', price: '139 MAD', img: './frontend/public/Etlala_Mascara_brighter.webp', tags: ['makeup','mascara'] }
  ];

  function ensureStyles(){
    if (document.querySelector('link[data-search-panel-style]')) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = STYLE_URL;
    link.setAttribute('data-search-panel-style','1');
    document.head.appendChild(link);
  }

  function renderResults(items){
    if (!resultsEl || !emptyEl) return;
    if (!items || items.length === 0){
      resultsEl.innerHTML = '';
      emptyEl.style.display = 'block';
      return;
    }
    emptyEl.style.display = 'none';
    resultsEl.innerHTML = items.map(item => `
      <a class="search-result-card" href="/products.html#${item.id}">
        <img class="search-result-media" src="${item.img}" alt="${item.title}"/>
        <div class="search-result-title">${item.title}</div>
        <div class="search-result-price">${item.price}</div>
      </a>
    `).join('');
  }

  function doSearch(q){
    const term = (q || '').trim().toLowerCase();
    if (!term){
      renderResults([]);
      return;
    }
    const res = demoProducts.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.tags.some(t => t.includes(term))
    );
    renderResults(res);
  }

  function openPanel(){
    if (!containerEl) return;
    containerEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    if (inputEl){ setTimeout(() => inputEl.focus(), 50); }
  }

  function closePanel(){
    if (!containerEl) return;
    containerEl.classList.remove('active');
    document.body.style.overflow = '';
    if (inputEl){ inputEl.value = ''; }
    renderResults([]);
  }

  function wireEvents(){
    inputEl = containerEl.querySelector('#global-search-input');
    resultsEl = containerEl.querySelector('#global-search-results');
    emptyEl = containerEl.querySelector('#global-search-empty');

    const overlay = containerEl.querySelector('[data-close="search-panel"]');
    const closeBtn = containerEl.querySelector('.search-close-btn');
    overlay && overlay.addEventListener('click', closePanel);
    closeBtn && closeBtn.addEventListener('click', closePanel);

    inputEl && inputEl.addEventListener('input', function(){ doSearch(this.value); });

    // Popular tags
    containerEl.querySelectorAll('.search-tag').forEach(btn => {
      btn.addEventListener('click', () => {
        const q = btn.getAttribute('data-q') || '';
        if (inputEl) { inputEl.value = q; doSearch(q); inputEl.focus(); }
      });
    });

    // Global ESC to close
    document.addEventListener('keydown', function(e){
      if (e.key === 'Escape' && containerEl.classList.contains('active')) closePanel();
    });

    // Wire navbar search trigger button(s)
    const triggers = document.querySelectorAll('.search-btn');
    triggers.forEach(t => t.addEventListener('click', function(e){ e.preventDefault(); openPanel(); }));
  }

  async function mount(){
    try {
      ensureStyles();
      const resp = await fetch(SEARCH_PANEL_URL);
      const html = await resp.text();
      const holder = document.createElement('div');
      holder.innerHTML = html;
      containerEl = holder.firstElementChild;
      document.body.appendChild(containerEl);
      wireEvents();
    } catch (e) {
      console.error('Search panel failed to mount', e);
    }
  }

  // Auto-mount on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', mount);
  } else {
    mount();
  }
})();
