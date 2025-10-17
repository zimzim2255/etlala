// ETLALA Product Details Page Logic
(function(){
  // Import products from products page if available
  const productsPageData = [
    { id: 'tebrima', name: "Tebrima", price: 118, currency: 'DH', image: "./frontend/public/products/tebrima.JPG", rating: 5, reviews: 230, short: "Tebrima est un soin révolutionnaire conçu pour unifier le teint de votre corps, éliminer les cellules cutanées mortes et hydrater en profondeur. Grâce à sa formule unique, Tebrima agit efficacement pour révéler une peau douce, lisse et éclatante.", sizes: ['200g'], benefits: ['Unifie le teint du corps','Élimine les cellules mortes','Hydratation profonde','Peau douce et lisse','Éclat naturel'], ingredients: 'Aqua, Glycerin, Niacinamide, Alpha Arbutin, Vitamin C, Hyaluronic Acid, Natural Extracts', usage: 'Appliquer sur peau propre et sèche. Masser délicatement en mouvements circulaires jusqu\'à absorption complète. Utiliser quotidiennement pour de meilleurs résultats.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'creme-eclaircissante', name: "Crème Éclaircissante au Caviar Vert", price: 259, currency: 'DH', image: "./frontend/public/products/creme eclaircissante.JPG", rating: 5, reviews: 198, short: "Notre crème éclaircissante est conçue pour unifier le teint et réduire l'apparence des taches pigmentaires. Enrichie en vitamines E et C, elle nourrit la peau, favorise la régénération cellulaire et stimule la synthèse de collagène, apportant éclat et luminosité à votre teint.", sizes: ['100ml'], benefits: ['Unifie le teint','Réduit les taches pigmentaires','Enrichie en vitamines E et C','Stimule le collagène','Texture soyeuse'], ingredients: 'Aqua, Caviar Extract, Glycerin, Shea Butter, Vitamin E, Vitamin C, Niacinamide, Alpha Arbutin, Botanical Oils', usage: 'Appliquer généreusement sur le visage et le cou. Masser délicatement jusqu\'à absorption. Utiliser quotidiennement matin et soir pour de meilleurs résultats.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'hair-serum', name: "Sérum Capillaire Etlala", price: 119, currency: 'DH', image: "./frontend/public/products/hair-serum.JPG", rating: 5, reviews: 276, short: "Le sérum Etlala est le secret d'une chevelure radieuse et protégée. Sa texture légère et non grasse pénètre rapidement dans les cheveux, offrant une finition soyeuse sans alourdir les mèches. Enrichi d'un parfum délicat, il laisse une fragrance agréable tout au long de la journée.", sizes: ['50ml'], benefits: ['Texture légère et non grasse','Lisse les frisottis','Renforce les cheveux','Brillance éclatante','Parfum délicat'], ingredients: 'Cyclopentasiloxane, Argan Oil, Vitamin E, Keratin, Jojoba Oil, Botanical Extracts, Fragrance', usage: 'Appliquer quelques gouttes sur cheveux humides ou secs, en insistant sur les longueurs et pointes. Ne pas rincer. Coiffer comme d\'habitude.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'creme-solaire', name: "Écran Solaire au Caviar Vert", price: 225, currency: 'DH', image: "./frontend/public/products/creme-solaire.JPG", rating: 5, reviews: 312, short: "Protégez votre peau des agressions extérieures avec notre écran solaire au caviar vert. Sa formule légère et non grasse offre une protection efficace contre les rayons UV tout en hydratant la peau. Enrichi en antioxydants, il aide à prévenir le vieillissement cutané prématuré.", sizes: ['50ml'], benefits: ['Protection UV efficace','Formule légère et non grasse','Enrichi en antioxydants','Prévient le vieillissement','Stimule le collagène'], ingredients: 'Aqua, Zinc Oxide, Titanium Dioxide, Caviar Extract, Vitamin E, Aloe Vera, Natural Oils, Antioxidants', usage: 'Appliquer généreusement 15 minutes avant l\'exposition au soleil. Réappliquer toutes les 2 heures et après la baignade ou transpiration excessive.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'gel-nettoyage', name: "Gel Nettoyant au Caviar Vert", price: 159, currency: 'DH', image: "./frontend/public/products/gel-nettoyage.JPG", rating: 5, reviews: 189, short: "Ce gel nettoyant doux élimine efficacement les impuretés et le maquillage tout en respectant l'équilibre naturel de votre peau. Enrichi en extraits de caviar vert, il hydrate et purifie, tout en stimulant la production de collagène pour une peau plus ferme et élastique.", sizes: ['200ml'], benefits: ['Élimine impuretés et maquillage','Respecte l\'équilibre naturel','Enrichi en caviar vert','Stimule le collagène','Peau ferme et élastique'], ingredients: 'Aqua, Sodium Cocoyl Isethionate, Glycerin, Caviar Extract, Aloe Vera, Chamomile Extract, Natural Oils', usage: 'Appliquer sur peau humide, masser délicatement en mouvements circulaires puis rincer abondamment à l\'eau tiède. Utiliser matin et soir.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'hair-conditioner', name: "Démêlant Etlala", price: 115, currency: 'DH', image: "./frontend/public/products/hair-conditioner.JPG", rating: 5, reviews: 245, short: "Le démêlant Etlala est votre solution idéale pour des cheveux faciles à coiffer et éclatants de santé. Sa formule enrichissante facilite le démêlage, hydrate en profondeur et restaure la brillance, tout en protégeant vos cheveux des agressions extérieures.", sizes: ['250ml'], benefits: ['Facilite le démêlage','Hydrate en profondeur','Restaure la brillance','Protège des agressions','Cheveux doux et souples'], ingredients: 'Aqua, Cetearyl Alcohol, Behentrimonium Chloride, Argan Oil, Panthenol, Biotin, Natural Extracts, Keratin', usage: 'Après le shampooing, appliquer sur cheveux humides. Laisser poser 2-3 minutes puis rincer abondamment à l\'eau tiède. Pour un soin intensif, laisser poser 5 minutes.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'hair-oil', name: "Huile Capillaire Etlala", price: 129, currency: 'DH', image: "./frontend/public/products/hair-oil.JPG", rating: 5, reviews: 267, short: "Transformez votre routine capillaire avec l'huile Etlala, un soin exceptionnel formulé à partir d'ingrédients naturels soigneusement sélectionnés pour revitaliser et nourrir vos cheveux. L'huile de ricin et d'argan pénètre en profondeur pour renforcer les racines et stimuler une croissance saine.", sizes: ['100ml'], benefits: ['Renforce les racines','Stimule la croissance','Prévient la casse','Réduit la chute','Ingrédients naturels'], ingredients: 'Castor Oil, Argan Oil, Coconut Oil, Jojoba Oil, Vitamin E, Essential Oils, Natural Extracts', usage: 'Appliquer sur cheveux secs ou humides, en massant le cuir chevelu et les longueurs. Peut être utilisé comme masque avant-shampooing (laisser poser 30 minutes) ou comme soin quotidien.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' },
    { id: 'hair-shampoo', name: "Shampooing Etlala", price: 110, currency: 'DH', image: "./frontend/public/products/hair-shampoo.JPG", rating: 5, reviews: 221, short: "Découvrez le shampooing Etlala, un soin capillaire innovant formulé pour revitaliser vos cheveux tout en respectant leur nature. Formulé sans sulfates ni parabènes, ce shampooing doux est spécialement conçu pour nourrir, hydrater et renforcer vos cheveux.", sizes: ['250ml'], benefits: ['Sans sulfates ni parabènes','Nourrit et hydrate','Renforce les cheveux','Formule douce','Respecte la nature des cheveux'], ingredients: 'Aqua, Sodium Cocoyl Isethionate, Glycerin, Panthenol, Biotin, Argan Oil, Natural Extracts, Keratin', usage: 'Appliquer sur cheveux mouillés, masser délicatement le cuir chevelu et les cheveux pour faire mousser. Rincer abondamment à l\'eau tiède. Répéter si nécessaire.', shipping: 'Livraison gratuite. Retours sous 30 jours sur produits non ouverts.' }
  ,
    { id: 'pack-de-cheveux', name: "Pack de cheveux", price: 473, currency: 'DH', image: "./frontend/public/products/pack-de-cheveux.JPG", rating: 5, reviews: 150, short: "Coffret cheveux complet: huile, shampoo, démêlant, sérum. Soins capillaires essentiels réunis, avec livraison gratuite.", sizes: ['Pack'], benefits: ['Huile capillaire nourrissante','Shampooing revitalisant','Démêlant adoucissant','Sérum brillance & anti‑frisottis','Livraison gratuite'], ingredients: 'Voir les fiches de chaque produit du pack.', usage: 'Suivre l’ordre: shampooing, démêlant, sérum sur longueurs, huile en bain d’huile 1‑2x/semaine.', shipping: 'Livraison gratuite au Maroc.' },
    { id: 'pack-hamam', name: "Pack hamam", price: 410, currency: 'DH', image: "./frontend/public/products/pack-de-visage.JPG", rating: 5, reviews: 120, short: "Coffret hamam: huile, shampoo, démêlant, Tebrima. Routine purifiante et nourrissante, livraison gratuite.", sizes: ['Pack'], benefits: ['Huile capillaire nourrissante','Shampooing doux','Démêlant soyeux','Tebrima exfoliant corporel','Livraison gratuite'], ingredients: 'Voir les fiches de chaque produit du pack.', usage: 'Routine hamam: Tebrima pour le corps, shampooing puis démêlant, huile selon besoin.', shipping: 'Livraison gratuite au Maroc.' }
  ];

  const products = {
    'whitening-night-cream': {
      id: 'whitening-night-cream',
      name: 'Crème Éclaircissante',
      price: 259,
      currency: 'DH',
      short: 'Deeply nourishing night cream that brightens and revitalizes the skin while you sleep. Formulated with natural botanicals and vitamins for a luminous morning glow.',
      images: [
        './frontend/public/products/creme eclaircissante.JPG',
        './frontend/public/products/creme eclaircissante.JPG',
        './frontend/public/products/creme eclaircissante.JPG'
      ],
      sizes: ['30ml','50ml','100ml'],
      benefits: ['Intense overnight hydration','Brightens skin tone','Supports skin barrier','Boosts radiance','Dermatologist tested'],
      ingredients: 'Aqua, Glycerin, Hyaluronic Acid, Squalane, Shea Butter, Vitamin E, Niacinamide, Alpha Arbutin, Allantoin, Botanical Extracts',
      usage: 'Apply a small amount to clean, dry skin as the last step in your evening routine. Gently massage until absorbed.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'anti-stretch-marks-serum': {
      id: 'anti-stretch-marks-serum',
      name: 'Anti Stretch Marks Serum',
      price: 320,
      currency: 'DH',
      short: 'Targeted serum that helps improve the appearance of stretch marks with daily use. Enriched with collagen and elastin boosters.',
      images: [
        './frontend/public/products/IMG_1929.JPG',
        './frontend/public/products/IMG_1930.JPG',
        './frontend/public/products/IMG_1931.JPG'
      ],
      sizes: ['30ml','60ml'],
      benefits: ['Improves skin elasticity','Smooths texture','Reduces appearance of stretch marks','Lightweight, fast-absorbing','Suitable for all skin types'],
      ingredients: 'Aqua, Glycerin, Centella Asiatica, Collagen, Vitamin C, Niacinamide, Panthenol, Rosehip Oil',
      usage: 'Apply twice daily on clean skin. Massage in circular motions over targeted areas until fully absorbed.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'hair-serum': {
      id: 'hair-serum',
      name: 'Hair Serum',
      price: 119,
      currency: 'DH',
      short: 'Nourishing hair serum that strengthens, adds shine, and protects against damage. Perfect for all hair types.',
      images: [
        './frontend/public/products/hair-serum.JPG',
        './frontend/public/products/hair-serum.JPG',
        './frontend/public/products/hair-serum.JPG'
      ],
      sizes: ['50ml','100ml'],
      benefits: ['Strengthens hair','Adds natural shine','Reduces frizz','Heat protection','Non-greasy formula'],
      ingredients: 'Cyclopentasiloxane, Argan Oil, Vitamin E, Keratin, Jojoba Oil, Botanical Extracts',
      usage: 'Apply a few drops to damp or dry hair, focusing on mid-lengths to ends. Style as desired.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'hair-shampoo': {
      id: 'hair-shampoo',
      name: 'Hair Shampoo',
      price: 110,
      currency: 'DH',
      short: 'Gentle cleansing shampoo that nourishes and strengthens hair from root to tip. Suitable for daily use.',
      images: [
        './frontend/public/products/hair-shampoo.JPG',
        './frontend/public/products/hair-shampoo.JPG',
        './frontend/public/products/hair-shampoo.JPG'
      ],
      sizes: ['250ml','500ml'],
      benefits: ['Deep cleansing','Strengthens hair','Adds volume','Sulfate-free','pH balanced'],
      ingredients: 'Aqua, Sodium Cocoyl Isethionate, Glycerin, Panthenol, Biotin, Argan Oil, Natural Extracts',
      usage: 'Apply to wet hair, massage into scalp and hair. Rinse thoroughly. Repeat if necessary.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'body-cream-care': {
      id: 'body-cream-care',
      name: 'Body Cream Care',
      price: 220,
      currency: 'DH',
      short: 'Rich body cream that deeply moisturizes and nourishes skin. Leaves skin soft, smooth, and hydrated all day.',
      images: [
        './frontend/public/products/IMG_1930.JPG',
        './frontend/public/products/IMG_1931.JPG',
        './frontend/public/products/IMG_1934.JPG'
      ],
      sizes: ['200ml','400ml'],
      benefits: ['Deep hydration','Softens skin','Long-lasting moisture','Fast absorption','Suitable for all skin types'],
      ingredients: 'Aqua, Shea Butter, Glycerin, Coconut Oil, Vitamin E, Aloe Vera, Natural Fragrances',
      usage: 'Apply generously to clean, dry skin. Massage in circular motions until fully absorbed. Use daily for best results.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'moisturizer': {
      id: 'moisturizer',
      name: 'Moisturizer',
      price: 240,
      currency: 'DH',
      short: 'Lightweight daily moisturizer that hydrates and protects skin. Perfect for all skin types.',
      images: [
        './frontend/public/products/IMG_1931.JPG',
        './frontend/public/products/IMG_1935.JPG',
        './frontend/public/products/IMG_1936.JPG'
      ],
      sizes: ['50ml','100ml'],
      benefits: ['24-hour hydration','Non-greasy formula','Improves skin texture','Suitable for sensitive skin','Dermatologist tested'],
      ingredients: 'Aqua, Hyaluronic Acid, Glycerin, Niacinamide, Ceramides, Vitamin B5, Botanical Extracts',
      usage: 'Apply to clean face and neck morning and evening. Gently massage until absorbed.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'body-perfume': {
      id: 'body-perfume',
      name: 'Body Perfume',
      price: 350,
      currency: 'DH',
      short: 'Elegant body perfume with long-lasting fragrance. A sophisticated blend of floral and woody notes.',
      images: [
        './frontend/public/products/pack-2.JPG',
        './frontend/public/products/pack-3.JPG',
        './frontend/public/products/IMG_1927.JPG'
      ],
      sizes: ['50ml','100ml'],
      benefits: ['Long-lasting fragrance','Elegant scent','Alcohol-free option','Suitable for sensitive skin','Travel-friendly'],
      ingredients: 'Alcohol Denat, Aqua, Parfum, Essential Oils, Natural Extracts',
      usage: 'Spray on pulse points such as wrists, neck, and behind ears. Reapply as desired.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'night-cream': {
      id: 'night-cream',
      name: 'Night Cream',
      price: 290,
      currency: 'DH',
      short: 'Intensive night cream that repairs and rejuvenates skin overnight. Wake up to refreshed, glowing skin.',
      images: [
        './frontend/public/products/IMG_1938.JPG',
        './frontend/public/products/IMG_1937.JPG',
        './frontend/public/products/IMG_1936.JPG'
      ],
      sizes: ['50ml','100ml'],
      benefits: ['Overnight repair','Anti-aging properties','Deep nourishment','Improves skin elasticity','Reduces fine lines'],
      ingredients: 'Aqua, Retinol, Hyaluronic Acid, Peptides, Vitamin C, Shea Butter, Botanical Oils',
      usage: 'Apply to clean face and neck before bed. Gently massage in upward motions until absorbed.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'body-butter-care': {
      id: 'body-butter-care',
      name: 'Body Butter Care',
      price: 260,
      currency: 'DH',
      short: 'Ultra-rich body butter that provides intense moisture for dry skin. Luxurious texture that melts into skin.',
      images: [
        './frontend/public/products/IMG_1934.JPG',
        './frontend/public/products/IMG_1935.JPG',
        './frontend/public/products/IMG_1930.JPG'
      ],
      sizes: ['200ml','400ml'],
      benefits: ['Intense moisture','Nourishes dry skin','Long-lasting hydration','Rich texture','Natural ingredients'],
      ingredients: 'Shea Butter, Cocoa Butter, Coconut Oil, Vitamin E, Almond Oil, Natural Fragrances',
      usage: 'Apply to clean, dry skin. Massage gently until absorbed. Best used after shower.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'jar-cream-care': {
      id: 'jar-cream-care',
      name: 'Jar Cream Care',
      price: 270,
      currency: 'DH',
      short: 'Multi-purpose cream for face and body. Provides deep hydration and nourishment for all skin types.',
      images: [
        './frontend/public/products/IMG_1935.JPG',
        './frontend/public/products/IMG_1936.JPG',
        './frontend/public/products/IMG_1937.JPG'
      ],
      sizes: ['100ml','200ml'],
      benefits: ['Multi-purpose use','Deep hydration','Soothes skin','Non-greasy','Suitable for all skin types'],
      ingredients: 'Aqua, Glycerin, Shea Butter, Aloe Vera, Vitamin E, Chamomile Extract, Natural Oils',
      usage: 'Apply to face and body as needed. Massage gently until absorbed.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'skincare-tube': {
      id: 'skincare-tube',
      name: 'Skincare Tube',
      price: 230,
      currency: 'DH',
      short: 'Versatile skincare treatment in convenient tube format. Perfect for targeted application.',
      images: [
        './frontend/public/products/IMG_1936.JPG',
        './frontend/public/products/IMG_1937.JPG',
        './frontend/public/products/IMG_1938.JPG'
      ],
      sizes: ['30ml','50ml'],
      benefits: ['Targeted treatment','Easy application','Travel-friendly','Fast absorption','Visible results'],
      ingredients: 'Aqua, Niacinamide, Hyaluronic Acid, Vitamin C, Peptides, Botanical Extracts',
      usage: 'Apply a small amount to targeted areas. Massage gently until absorbed. Use morning and evening.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    },
    'face-serum': {
      id: 'face-serum',
      name: 'Face Serum',
      price: 310,
      currency: 'DH',
      short: 'Concentrated face serum with active ingredients. Targets multiple skin concerns for radiant, youthful skin.',
      images: [
        './frontend/public/products/IMG_1937.JPG',
        './frontend/public/products/IMG_1938.JPG',
        './frontend/public/products/pack-1.JPG'
      ],
      sizes: ['30ml','50ml'],
      benefits: ['Concentrated formula','Anti-aging','Brightens skin','Improves texture','Fast-absorbing'],
      ingredients: 'Aqua, Vitamin C, Hyaluronic Acid, Retinol, Niacinamide, Peptides, Botanical Extracts',
      usage: 'Apply 2-3 drops to clean face and neck. Gently pat until absorbed. Follow with moisturizer.',
      shipping: 'Free shipping over 500 DH. 30-day returns on unopened products.'
    }
  };

  const recommended = [
    { id:'tebrima', name:'Tebrima', price:'118 DH', img:'./frontend/public/products/tebrima.JPG' },
    { id:'creme-eclaircissante', name:'Crème Éclaircissante au Caviar Vert', price:'259 DH', img:'./frontend/public/products/creme eclaircissante.JPG' },
    { id:'hair-serum', name:'Sérum Capillaire Etlala', price:'119 DH', img:'./frontend/public/products/hair-serum.JPG' },
    { id:'creme-solaire', name:'Écran Solaire au Caviar Vert', price:'225 DH', img:'./frontend/public/products/creme-solaire.JPG' }
  ];

  function slugify(s){
    return String(s || '')
      .normalize('NFD').replace(/[\u0300-\u036f]/g,'')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g,'-')
      .replace(/^-+|-+$/g,'');
  }
  // Map slugs generated from names on cards to canonical product IDs used in datasets
  const slugAliases = {
    'gel-nettoyant': 'gel-nettoyage',
    'ecran-solaire': 'creme-solaire',
    'huile-capillaire': 'hair-oil',
    'shampooing': 'hair-shampoo',
    'demelant': 'hair-conditioner',
    'serum-capillaire': 'hair-serum',
    // Handle variations with missing accents
    'creme-eclaircissante': 'creme-eclaircissante',
    'crme-claircissante': 'creme-eclaircissante',
    'creme-claircissante': 'creme-eclaircissante',
    'crme-eclaircissante': 'creme-eclaircissante',
    'tebrima': 'tebrima'
  };
  // Extend mapping with packs and common variations
  Object.assign(slugAliases, {
    'pack-de-cheveux': 'pack-de-cheveux',
    'pack-cheveux': 'pack-de-cheveux',
    'pack-hamam': 'pack-hamam',
    'pack-hammam': 'pack-hamam'
  });
  function getProductId(){
    const raw = (new URLSearchParams(window.location.search)).get('id') || (location.hash||'').replace('#','') || 'tebrima';
    const slug = slugify(raw);
    const canonical = slugAliases[slug] || slug;
    // Try fuzzy match if not found
    if (!productsPageData.find(p => p.id === canonical) && !products[canonical]) {
      // Try partial match on product names
      const fuzzy = productsPageData.find(p => {
        const pSlug = slugify(p.name);
        return pSlug.includes(slug) || slug.includes(pSlug) || pSlug.replace(/-/g,'').includes(slug.replace(/-/g,''));
      });
      if (fuzzy) return fuzzy.id;
    }
    return canonical;
  }

  function loadProductFromPageData(id) {
    const match = productsPageData.find(p => String(p.id) === String(id));
    if (match) {
      // Duplicate the main image 3 times for gallery
      return {
        ...match,
        images: [match.image, match.image, match.image]
      };
    }
    return null;
  }

  function money(v, cur){ return `${v} ${cur}`; }

  function qs(sel){ return document.querySelector(sel); }
  function qsa(sel){ return Array.from(document.querySelectorAll(sel)); }
  function el(tag, cls, html){ const n=document.createElement(tag); if(cls) n.className=cls; if(html!=null) n.innerHTML=html; return n; }

  function renderGallery(p){
    const thumbs = qs('#pd-thumbs');
    if (!thumbs) return;
    const main = qs('#pd-main-img');
    if (main) { main.src = p.images[0]; main.alt = p.name; }
    thumbs.innerHTML = '';
    p.images.forEach((src, i) => {
      const t = el('div','pd-thumb');
      const img = el('img');
      img.src = src; img.alt = p.name;
      t.appendChild(img);
      t.addEventListener('click', () => { if (main) { main.src = src; } });
      thumbs.appendChild(t);
    });
  }

  function renderDetails(p){
    qs('#pd-name').textContent = p.name;
    qs('#crumb-product-name').textContent = p.name;
    qs('#pd-short').textContent = p.short;
    qs('#pd-price').textContent = money(p.price, p.currency);
    qs('#pd-sticky-name').textContent = p.name;
    qs('#pd-sticky-price').textContent = money(p.price, p.currency);
    const stickyThumb = qs('#pd-sticky-thumb');
    if (stickyThumb) stickyThumb.src = (p.images && p.images[0]) || p.image || '';

    // Update page title
    document.title = `${p.name} - ETLALA`;

    // Sizes
    const wrap = qs('#pd-size-options');
    wrap.innerHTML = '';
    p.sizes.forEach((s, i) => {
      const b = el('button','pd-size', s);
      if (i===0) b.classList.add('active');
      b.addEventListener('click', () => {
        qsa('.pd-size').forEach(x => x.classList.remove('active'));
        b.classList.add('active');
      });
      wrap.appendChild(b);
    });

    // Benefits
    const ben = qs('#pd-benefits');
    ben.innerHTML = p.benefits.map(b => `<div class="pd-benefit">${b}</div>`).join('');

    // Accordions
    qs('#acc-ingredients').textContent = p.ingredients;
    qs('#acc-usage').textContent = p.usage;
    qs('#acc-shipping').textContent = p.shipping;

    qsa('.pd-acc-header').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-acc');
        const item = btn.closest('.pd-acc-item');
        item.classList.toggle('open');
      });
    });
  }

  function renderRecommended(){
    const grid = qs('#pd-rec-grid');
    if (!grid) return;
    grid.innerHTML = recommended.map(r => `
      <a class="pd-rec-card" href="/product-details.html?id=${r.id}">
        <img class="pd-rec-media" src="${r.img}" alt="${r.name}" />
        <div class="pd-rec-body">
          <div class="pd-rec-name">${r.name}</div>
          <div class="pd-rec-price">${r.price}</div>
        </div>
      </a>
    `).join('');
  }

  function wireQty(){
    function clamp(v){ v = parseInt(v||'1',10); return v < 1 ? 1 : v; }

    const qty = qs('#pd-qty');
    const qtyS = qs('#pd-qty-sticky');
    qty.value = clamp(qty.value);
    qtyS.value = clamp(qtyS.value);

    qsa('.qty-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const action = btn.getAttribute('data-action');
        const input = btn.parentElement.querySelector('input');
        let v = clamp(input.value);
        if (action === 'inc') v++; else if (action === 'dec') v = Math.max(1, v-1);
        input.value = v;
      });
    });
  }

  function wirePurchaseOptions(){
    qsa('.pd-purchase-option').forEach(opt => {
      opt.addEventListener('click', function(){
        qsa('.pd-purchase-option').forEach(o => o.classList.remove('active'));
        this.classList.add('active');
        const radio = this.querySelector('input[type="radio"]');
        if (radio) radio.checked = true;
      });
    });
  }

  function wireCart(p){
    function getSize(){ const a = qs('.pd-size.active'); return a ? a.textContent : p.sizes[0]; }
    function getQty(){ return parseInt(qs('#pd-qty').value || '1', 10); }
    function getPurchaseType(){ return qs('input[name="purchase-type"]:checked')?.id || 'one-time'; }
    function addToCart(){
      const qty = getQty();
      const currentImg = (document.querySelector('#pd-main-img') && document.querySelector('#pd-main-img').getAttribute('src')) || (p.images && p.images[0]) || '';
      const item = { id: p.id, name: p.name, size: getSize(), price: p.price, currency: p.currency, type: getPurchaseType(), image: currentImg };
      try {
        let cart = JSON.parse(localStorage.getItem('etlala_cart') || '[]');
        // Normalize id types (string/number)
        const matchIdx = cart.findIndex(x => String(x.id) === String(item.id));
        if (matchIdx > -1) {
          const existing = cart[matchIdx];
          existing.quantity = (existing.quantity || existing.qty || 0) + qty;
          existing.qty = undefined; // normalize
          // refresh image/name/price from current PDP in case they changed
          existing.image = item.image || existing.image;
          existing.name = item.name;
          existing.price = item.price;
          existing.currency = item.currency;
          cart[matchIdx] = { ...existing };
        } else {
          cart.push({ ...item, quantity: qty });
        }
        localStorage.setItem('etlala_cart', JSON.stringify(cart));
        if (typeof window.updateCartBadge === 'function') window.updateCartBadge();
        if (typeof window.updateCartDropdown === 'function') window.updateCartDropdown();
        notify('Ajouté au panier');
      } catch (e) { console.log('cart error', e); }
    }
    function notify(msg){
      const n = el('div','pd-toast', msg);
      document.body.appendChild(n);
      setTimeout(() => n.classList.add('show'), 10);
      setTimeout(() => { n.classList.remove('show'); n.remove(); }, 2200);
    }

    const add = qs('#pd-add-to-cart');
    const add2 = qs('#pd-add-sticky');
    add && add.addEventListener('click', addToCart);
    add2 && add2.addEventListener('click', addToCart);

    // Buy now: add current selection then redirect to checkout
    const buyNow = qs('#pd-buy-now');
    const buySticky = qs('#pd-buy-sticky');
    function addAndCheckout(){
      addToCart();
      setTimeout(() => { window.location.href = '/checkout.html'; }, 50);
    }
    buyNow && buyNow.addEventListener('click', addAndCheckout);
    buySticky && buySticky.addEventListener('click', addAndCheckout);

    // toast styles inline
    if (!document.getElementById('pd-toast-style')){
      const st = document.createElement('style');
      st.id = 'pd-toast-style';
      st.textContent = `.pd-toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(12px);background:#D4AF37;color:#5a7260;padding:12px 16px;border-radius:10px;opacity:0;transition:all .2s ease;z-index:2000;letter-spacing:.5px;font-weight:600}.pd-toast.show{opacity:1;transform:translateX(-50%) translateY(0)}`;
      document.head.appendChild(st);
    }
  }

  function toggleSticky(){
    const elSticky = qs('#pd-sticky');
    if (!elSticky) return;
    const show = window.scrollY > 600; // simple heuristic for demo
    elSticky.classList.toggle('visible', show);
  }

  function init(){
    const id = getProductId();
    let p = loadProductFromPageData(id) || products[id] || loadProductFromPageData('tebrima') || products['tebrima'];
    renderGallery(p);
    renderDetails(p);
    renderRecommended();
    wireQty();
    wirePurchaseOptions();
    wireCart(p);
    window.addEventListener('scroll', toggleSticky, { passive: true });
    toggleSticky();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
