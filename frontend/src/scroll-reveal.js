(function(global){
  'use strict';

  function hasGSAP(){ return typeof global.gsap !== 'undefined'; }

  function registerPlugin(){
    if (hasGSAP() && global.ScrollTrigger) {
      global.gsap.registerPlugin(global.ScrollTrigger);
    }
  }

  function splitIntoWords(el) {
    if (!el || el.dataset.srInitialized === '1') return;
    var nodes = [];
    Array.from(el.childNodes).forEach(function(node) {
      if (node.nodeType === Node.TEXT_NODE) {
        var parts = node.textContent.split(/(\s+)/);
        parts.forEach(function(part) {
          if (/^\s+$/.test(part)) {
            nodes.push(document.createTextNode(part));
          } else if (part.length) {
            var span = document.createElement('span');
            span.className = 'word';
            span.textContent = part;
            nodes.push(span);
          }
        });
      } else {
        nodes.push(node);
      }
    });
    el.innerHTML = '';
    nodes.forEach(function(n) { el.appendChild(n); });
    el.dataset.srInitialized = '1';
  }

  function dedupe(elements) {
    var seen = new Set();
    var out = [];
    elements.forEach(function(el){
      if (!el) return;
      if (!seen.has(el)) { seen.add(el); out.push(el); }
    });
    return out;
  }

  function initScrollReveal(options){
    if (!hasGSAP()) return;
    registerPlugin();
    
    // Force ScrollTrigger to update on touch scroll for mobile devices
    if (global.ScrollTrigger) {
      var lastUpdate = 0;
      var updateThrottle = 16; // ~60fps
      
      window.addEventListener('touchmove', function() {
        var now = Date.now();
        if (now - lastUpdate > updateThrottle) {
          lastUpdate = now;
          global.ScrollTrigger.update();
        }
      }, { passive: true });
      
      window.addEventListener('touchend', function() {
        global.ScrollTrigger.update();
      }, { passive: true });
    }

    var opts = options || {};
    var includeSelector = opts.includeSelector || '.scroll-reveal, .scroll-reveal-text';
    var extraSelectors = opts.extraSelectors || 'a,button,span,li,blockquote,figcaption,[class^="p-style-"],[class$="-title"],[class$="-description"],[class$="-name"],[class$="-price"]';
    var excludeSelector = opts.excludeSelector || '';
    var rotationFrom = typeof opts.rotationFrom === 'number' ? opts.rotationFrom : 3;
    var opacityFrom = typeof opts.opacityFrom === 'number' ? opts.opacityFrom : 0.3;
    var blurFrom = typeof opts.blurFrom === 'number' ? opts.blurFrom : 1.5;
    var start = opts.start || 'top 95%';
    var durationRotate = typeof opts.durationRotate === 'number' ? opts.durationRotate : 0.45;
    var durationWords = typeof opts.durationWords === 'number' ? opts.durationWords : 0.55;
    var staggerEach = typeof opts.staggerEach === 'number' ? opts.staggerEach : 0.006;
    var scrubEnabled = (typeof opts.scrub === 'boolean') ? opts.scrub : true;
    var scrubAmount = typeof opts.scrubAmount === 'number' ? opts.scrubAmount : 0.7;
    var scrollDistance = typeof opts.scrollDistance === 'number' ? opts.scrollDistance : 150; // in %

    var candidates = Array.from(document.querySelectorAll(includeSelector));
    // Also add extra common text-bearing elements so more of the site gets animated
    if (extraSelectors) {
      candidates = candidates.concat(Array.from(document.querySelectorAll(extraSelectors)));
    }
    if (excludeSelector) {
      candidates = candidates.filter(function(el){
        return !el.closest(excludeSelector);
      });
    }

    var els = dedupe(candidates);

    els.forEach(function(el){
      // Skip already initialized elements
      if (el.dataset.srDone === '1') return;

      // Prepare element and words
      el.classList.add('scroll-reveal-text');
      splitIntoWords(el);

      var gsap = global.gsap;
      var words = el.querySelectorAll('.word');

      gsap.set(el, { force3D: true, transformOrigin: '0% 50%' });
      if (words.length) { gsap.set(words, { force3D: true }); }

      function finalize(){
        if (el.dataset.srDone === '1') return;
        gsap.set(el, { rotation: 0 });
        if (words.length) gsap.set(words, { opacity: 1, filter: 'blur(0px)' });
        el.dataset.srDone = '1';
      }

      if (scrubEnabled) {
        // Smooth scrubbed timeline like the first animation
        var tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: el,
            start: start,
            end: '+=' + scrollDistance + '%',
            scrub: scrubAmount,
            onLeave: function(){ tl.progress(1); finalize(); }
          }
        });
        tl.fromTo(el, { rotation: rotationFrom }, { rotation: 0 }, 0);
        if (words.length) {
          // Wave effect: each word starts from a different vertical position creating a visible wave
          tl.fromTo(words,
            { 
              opacity: opacityFrom, 
              filter: 'blur(' + blurFrom + 'px)',
              y: function(index) {
                // Create pronounced wave pattern using sine function
                // Larger amplitude and tighter frequency for visible wave
                return 30 + (25 * Math.sin(index * 0.8));
              },
              rotation: function(index) {
                // Add slight rotation to enhance wave effect
                return 5 * Math.sin(index * 0.8);
              }
            },
            { 
              opacity: 1, 
              filter: 'blur(0px)',
              y: 0,
              rotation: 0,
              stagger: { 
                each: staggerEach * 1.5,
                ease: 'sine.inOut'
              }
            },
            0
          );
        }
      } else {
        // Fast, non-scrub reveal + ensure final state when passed
        gsap.fromTo(el, { rotation: rotationFrom }, {
          rotation: 0,
          ease: 'power1.out',
          duration: durationRotate,
          scrollTrigger: {
            trigger: el,
            start: start,
            toggleActions: 'play none none none',
            once: true,
            onLeave: finalize
          }
        });
        if (words.length) {
          gsap.fromTo(words,
            { opacity: opacityFrom, filter: 'blur(' + blurFrom + 'px)' },
            {
              opacity: 1,
              filter: 'blur(0px)',
              ease: 'power1.out',
              duration: durationWords,
              stagger: { each: staggerEach },
              scrollTrigger: {
                trigger: el,
                start: start,
                toggleActions: 'play none none none',
                once: true,
                onLeave: finalize
              }
            }
          );
        }
        if (global.ScrollTrigger) {
          global.ScrollTrigger.create({ trigger: el, start: 'top top', onLeave: finalize });
        }
      }
    });
  }

  // Expose API
  global.initScrollReveal = initScrollReveal;
})(window);
