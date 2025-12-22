(function() {
  "use strict";

  /* =========================
  DOM ELEMENTS
  ========================= */
  const dom = {
    views: {
      home: document.getElementById('home-view'),
      product: document.getElementById('product-page'),
      checkout: document.getElementById('checkout-view')
    },
    cart: {
      bar: document.getElementById('cart-bar'),
      list: document.getElementById('cart-items'),
      total: document.getElementById('cart-total'),
      count: document.getElementById('cart-count'),
      toggleBtn: document.getElementById('cart-toggle-btn'),
    },
    explain: {
      overlay: document.getElementById('explain-overlay'),
      text: document.getElementById('explain-text'),
      okBtn: document.getElementById('explain-ok-btn'),
    },
    whyBuy: {
        overlay: document.getElementById('why-buy-overlay'),
        backBtn: document.getElementById('why-buy-back-btn'),
    },
    checkout: {
      noteStep: document.getElementById('note-step'),
      receiptStep: document.getElementById('receipt-step'),
      noteText: document.getElementById('note-text'),
      noteOkBtn: document.getElementById('note-ok-btn'),
      copyReceiptBtn: document.getElementById('copy-receipt-btn'),
      nextBtn: document.getElementById('next-btn'),
      receiptText: document.getElementById('receipt-text'),
      receipts: {
        single: document.getElementById('receipt-single'),
        multi: document.getElementById('receipt-multi'),
        r1_item: document.getElementById('r1-item'),
        r1_plan: document.getElementById('r1-plan'),
        r1_duration: document.getElementById('r1-duration'),
        r1_price: document.getElementById('r1-price'),
        rm_itemList: document.getElementById('rm-item-list'),
        rm_total: document.getElementById('rm-total'),
      }
    },
    menu: {
        btn: document.getElementById('menu-btn'),
        overlay: document.getElementById('nav-overlay'),
        closeBtn: document.getElementById('close-menu-btn'),
        links: document.querySelectorAll('.nav-item, .community-btn-menu')
    }
  };

  /* =========================
  PRODUCT DATA & ASSETS
  ========================= */
  const imageFor = { 
    "SPINĘ": "https://ik.imagekit.io/plkm5ok7p/IMG_3878.JPEG?updatedAt=1765126341918",
    "BALDWIN 4": "https://ik.imagekit.io/plkm5ok7p/IMG_3199%20(1).JPEG?updatedAt=1765126339659",
    "MURF's Take Action Tee": "https://ik.imagekit.io/plkm5ok7p/IMG_3036%20(1).JPEG?updatedAt=1765126343812",
    "Realize the value": "https://ik.imagekit.io/plkm5ok7p/IMG_3202%20(1).JPEG?updatedAt=1765126339679",
    "Resilience Drop(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_3200%20(1).JPEG?updatedAt=1765126339374",
    "Resilience Drop(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_3198%20(1).JPEG?updatedAt=1765126339742",
    "Echoes of the Fallen(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_4624%20(1).JPEG?updatedAt=1765126339313",
    "Echoes of the Fallen(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_4689%20(1).JPEG?updatedAt=1765126343241",
    "Star-Gazer Skull Tee(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_4686%20(1).JPEG?updatedAt=1765126343901",
    "Star-Gazer Skull Tee(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_4625.JPEG?updatedAt=1765126339591",
    "IMPRNT(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_5720.JPEG?updatedAt=1765126340069",
    "IMPRNT(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_5721.JPEG?updatedAt=1765126343962",
    "Path.01(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_5727.JPEG?updatedAt=1765126339349",
    "Path.01(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_5728.JPEG?updatedAt=1765126343656",
    "No More Wishes(Black)": "https://ik.imagekit.io/plkm5ok7p/IMG_5741.JPEG?updatedAt=1765126338699",
    "No More Wishes(White)": "https://ik.imagekit.io/plkm5ok7p/IMG_5739.JPEG?updatedAt=1765126343593",
    "THE LAST LOOK": "https://ik.imagekit.io/plkm5ok7p/IMG_3558.JPEG"
  };

  // Explicitly mark these products as sold out to disable buttons
  // while still showing the price.
  const soldOutRegistry = ["BALDWIN 4", "Realize the value", "THE LAST LOOK"];

  // Helper to generate sizes for price
  const sizesFor = (price) => [
      { duration: "L", price: price },
      { duration: "XL", price: price }
  ];

  const productData = { 
    "SPINĘ": { "GSM 350": sizesFor("42,000 MMK") }, 
    "BALDWIN 4": { "GSM 350": sizesFor("42,000 MMK") }, 
    "MURF's Take Action Tee": { "GSM 350": sizesFor("42,000 MMK") },
    "Realize the value": { "GSM 350": sizesFor("42,000 MMK") },
    "Resilience Drop(Black)": { "GSM 350": sizesFor("44,000 MMK") },
    "Resilience Drop(White)": { "GSM 350": sizesFor("44,000 MMK") },
    "Echoes of the Fallen(Black)": { "GSM 350": sizesFor("45,000 MMK") },
    "Echoes of the Fallen(White)": { "GSM 350": sizesFor("45,000 MMK") },
    "Star-Gazer Skull Tee(Black)": { "GSM 350": sizesFor("45,000 MMK") },
    "Star-Gazer Skull Tee(White)": { "GSM 350": sizesFor("45,000 MMK") },
    "IMPRNT(Black)": { "GSM 350": sizesFor("45,000 MMK") },
    "IMPRNT(White)": { "GSM 350": sizesFor("45,000 MMK") },
    "Path.01(Black)": { "GSM 350": sizesFor("45,000 MMK") },
    "Path.01(White)": { "GSM 350": sizesFor("45,000 MMK") },
    "No More Wishes(Black)": { "GSM 350": sizesFor("44,000 MMK") },
    "No More Wishes(White)": { "GSM 350": sizesFor("44,000 MMK") },
    "THE LAST LOOK": { "GSM 350": sizesFor("42,000 MMK") }
  };

  const paymentInfoBlock = `\n\nContact @kkc_cc for Payment Details.`;
  const generalDetailsBlock = `\n\nContact @kkc_cc for Payment Details.`;
  
  // Updated care note: Mawlamyine and new line for Do Not Bleach
  const shirtCareNote = `FABRIC: 100% Premium Cotton (GSM 350)\nCARE: Cold Wash Only.\nDo Not Bleach.\nORIGIN: The Murf Lab, Mawlamyine.\nPOLICY: No Returns on Size Errors.`;

  // Map all products to the same details for now
  const moreDetailsByProduct = {};
  Object.keys(imageFor).forEach(key => {
      moreDetailsByProduct[key] = shirtCareNote + generalDetailsBlock;
  });
  
  let cart = [];
  let lastScroll = 0;
  let lastViewBeforeCheckout = 'home';
  let productCards = []; 
  let productPageScroll = 0; 

  function escapeHTML(s) { return String(s).replace(/[&<>"']/g, m => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[m]); }
  function parseKyats(t) { const m = (t || "").replace(/,/g, "").replace(/Ks/g, "").replace(/≈/g, "").replace(/MMK/g, "").trim().match(/(\d+(\.\d+)?)/); return m ? Number(m[1].replace(/\./g, '')) : null; } 
  function formatKyats(n) { return (n || 0).toLocaleString("en-US") + " MMK"; }
  function cartKey({ product, section, duration, priceText }) { return [product, section, duration, priceText].join("|"); }

  function addToCart(item) {
    const key = cartKey(item);
    const existing = cart.find(x => cartKey(x) === key);
    if (existing) existing.qty += 1;
    else cart.push({ ...item, qty: 1 });
    renderCart();
    reflectQuantitiesOnBadges();
  }
  
  function removeItemFromCart(key) {
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
      cart.splice(index, 1);
      renderCart();
      reflectQuantitiesOnBadges();
    }
  }

  // NEW: Decrease Quantity logic
  function decreaseQuantity(key) {
    const index = cart.findIndex(x => cartKey(x) === key);
    if (index > -1) {
        if (cart[index].qty > 1) {
            cart[index].qty -= 1;
        } else {
            cart.splice(index, 1); // Remove if qty becomes 0
        }
        renderCart();
        reflectQuantitiesOnBadges();
    }
  }

  function clearCart() {
    cart = [];
    renderCart();
    reflectQuantitiesOnBadges();
  }

  function renderCart() {
      if (!cart.length) { dom.cart.bar.style.display = "none"; document.body.style.paddingBottom = "0"; return; }
      dom.cart.bar.style.display = "block";
      dom.cart.list.innerHTML = cart.map(i => {
        const sub = i.unitPrice * i.qty;
        // Removed the remove-btn
        return `
        <div class="cart-item">
            <div class="meta">
                <span class="title">${escapeHTML(i.product)}</span>
                <span class="sub">${escapeHTML(i.section)} • ${escapeHTML(i.duration)}</span>
            </div>
            
            <button class="qty-btn decrease-btn" data-cart-key="${escapeHTML(cartKey(i))}">-</button>
            
            <div class="subtotal" style="font-size:13px; font-weight:700;">x${i.qty}</div>
            
            <div class="subtotal">${formatKyats(sub)}</div>
        </div>`;
      }).join("");
      const total = cart.reduce((s, i) => s + i.unitPrice * i.qty, 0);
      dom.cart.total.textContent = formatKyats(total);
      dom.cart.count.textContent = String(cart.reduce((s, i) => s + i.qty, 0));

      // NEW: Dynamic font size based on length
      const cartTotalContainer = dom.cart.total.parentNode;
      // Check the full text content length of the container
      if (cartTotalContainer.textContent.length > 22) { // Threshold for long text
          cartTotalContainer.classList.add('small-text');
      } else {
          cartTotalContainer.classList.remove('small-text');
      }

      requestAnimationFrame(() => {
        let cartBarHeight = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight;
        document.body.style.paddingBottom = (cartBarHeight) + "px";
      });
  }
  
  function reflectQuantitiesOnBadges() {
    document.querySelectorAll(".size-badge").forEach(el => {
      const key = el.dataset.itemKey;
      const item = cart.find(i => cartKey(i) === key);
      if (item) {
          el.textContent = `x${item.qty}`;
          el.classList.add('visible');
      } else {
          el.classList.remove('visible');
      }
    });
  }

  function showView(viewName) {
    Object.values(dom.views).forEach(v => v.classList.remove('active'));
    if (dom.views[viewName]) { dom.views[viewName].classList.add('active'); }
  }

  function openProduct(productName) {
      lastScroll = window.scrollY;
      const pdata = productData[productName] || {};
      
      const isSoldOut = soldOutRegistry.includes(productName);

      let sectionsHTML = '';
      
       sectionsHTML = Object.entries(pdata).map(([sectionName, plans]) => {
           if (!plans || !plans.length) return "";
           
           const sizeCards = plans.map(p => {
               const unit = parseKyats(p.price) || 0; 
               const itemBase = { product: productName, section: sectionName, duration: p.duration || "", unitPrice: unit, priceText: p.price || "" };
               const key = cartKey(itemBase);
               const dataStr = escapeHTML(JSON.stringify(itemBase));
               
               const isDisabled = isSoldOut || p.price === "Out of stock";
               
               return `
                <div class="size-card-wrap" style="position:relative;">
                   <div class="size-card" data-item='${dataStr}' 
                       style="${isDisabled ? 'opacity:0.5; pointer-events:none; filter:grayscale(1);' : ''}">
                       <span class="size-label">${escapeHTML(p.duration || "")}</span>
                       <span class="size-price">${escapeHTML(p.price || "")}</span>
                       <div class="size-badge" data-item-key="${escapeHTML(key)}"></div>
                   </div>
                </div>
               `;
           }).join("");

           let title = sectionName; 
           return `<div class="plan-box">
                   <div class="plan-title">${escapeHTML(title)}</div>
                   <div class="size-grid">${sizeCards}</div>
                  </div>`;
       }).join("");

      const pageHTML = `<button class="back-btn" id="product-back-btn">← CATALOG</button><div class="product-hero"><div class="hero-img-wrap"><img src="${imageFor[productName]}" alt="${escapeHTML(productName)} logo" /></div><div class="hero-title">${escapeHTML(productName)}</div>
      
      <div class="button-container">
        <button class="btn btn-outline hero-more" data-product-name="${escapeHTML(productName)}">SPECS & CARE</button>
        <button class="btn btn-outline" id="why-buy-btn">LAB STANDARDS</button>
      </div>
      
      </div>${sectionsHTML}`;
      dom.views.product.innerHTML = pageHTML;
      showView('product');
      reflectQuantitiesOnBadges(); 
      window.scrollTo(0, 0);
  }
  
  function getNoteForCartItem(item) {
      const productName = item.product.replace(/ \(.+\)$/, '');
      const fullText = moreDetailsByProduct[item.product] || moreDetailsByProduct[productName]; 
      if (!fullText) return null;
      return fullText.replace(generalDetailsBlock.trim(), '');
  }

  function goCheckoutView() {
      if (!cart.length) { alert("Your cart is empty."); return; }
      if (dom.views.product.classList.contains('active')) {
          lastViewBeforeCheckout = 'product';
          productPageScroll = window.scrollY;
      } else {
          lastViewBeforeCheckout = 'home';
      }
      try { localStorage.setItem('blp_cart', JSON.stringify(cart)); } catch {}
      
      const copyBtn = dom.checkout.copyReceiptBtn;
      copyBtn.textContent = 'COPY DATA'; copyBtn.classList.remove('copied'); copyBtn.disabled = false;
      
      const standardNoteContent = shirtCareNote; 

      const formattedNote = standardNoteContent.split('\n').filter(l => l.trim().length > 0).map(l => {
            const trimmed = l.trim();
            return `<div class="nt-line" style="font-weight: 400; opacity: .95;">${escapeHTML(trimmed)}</div>`;
      }).join('');

      dom.checkout.noteText.innerHTML = `<div>${formattedNote}</div>`;

      const checkoutLink = 'https://t.me/kkc_cc'; 
      dom.checkout.nextBtn.href = checkoutLink;

      dom.checkout.noteStep.style.display = 'block';
      dom.checkout.receiptStep.style.display = 'none';
      dom.checkout.nextBtn.style.display = 'none';

      showView('checkout');
      window.scrollTo(0, 0);
      dom.cart.bar.style.display = 'none';
  }

  function buildReceipt() {
      const c = JSON.parse(localStorage.getItem('blp_cart') || '[]');
      if (!c.length) { dom.checkout.receiptStep.innerHTML = '<p>Your cart is empty.</p>'; return; }
      const items = c.map(i => ({ name: i.product, plan: i.section, duration: i.duration, qty: i.qty, sub: i.unitPrice * i.qty }));
      const total = items.reduce((s, x) => s + x.sub, 0);

      if (items.length === 1) {
        const x = items[0];
        dom.checkout.receipts.single.style.display = 'block';
        dom.checkout.receipts.multi.style.display = 'none';
        dom.checkout.receipts.r1_item.textContent = x.name;
        dom.checkout.receipts.r1_plan.textContent = x.plan; 
        dom.checkout.receipts.r1_duration.textContent = x.duration + (x.qty > 1 ? ` × ${x.qty}` : ''); 
        dom.checkout.receipts.r1_price.textContent = formatKyats(x.sub);
      } else {
          dom.checkout.receipts.single.style.display = 'none';
          dom.checkout.receipts.multi.style.display = 'block';
          const itemsHtml = items.map(item => `
              <div class="receipt-line-item">
                  <div class="title">${escapeHTML(item.name)}${item.qty > 1 ? ` (x${item.qty})` : ''}</div>
                  <div class="details">${escapeHTML(item.plan)} • ${escapeHTML(item.duration)}</div>
                  <div class="price">${formatKyats(item.sub)}</div>
              </div>
          `).join('');
          dom.checkout.receipts.rm_itemList.innerHTML = itemsHtml;
          dom.checkout.receipts.rm_total.textContent = formatKyats(total);
      }
      
      const textLines = items.map(item =>
          `- ${item.name} (${item.plan} • ${item.duration})${item.qty > 1 ? ` x${item.qty}` : ''}\n  Price: ${formatKyats(item.sub)}`
      );
      const clipboardText = textLines.join('\n\n') + `\n-------------------\nTOTAL: ${formatKyats(total)}`;
      dom.checkout.receiptText.value = clipboardText;
  }

  function formatNotes(raw) {
    const containsPaymentInfo = raw.includes(paymentInfoBlock.trim());
    const lines = String(raw).split(/\n+/).map(line => {
        const trimmedLine = line.trim();
        if (!trimmedLine) return "";
        if (trimmedLine.includes('ဒါက') || trimmedLine.includes('This is a multi-device purchase')) return `<div class="nt-line burmese-font">${trimmedLine}</div>`;
        return `<div class="nt-line" style="font-weight: 400; opacity: .95;">${escapeHTML(trimmedLine)}</div>`;
    }).join("");
    if (containsPaymentInfo) return `<div class="payment-warning-block">${lines}</div>`;
    return lines;
  }
  
  function formatDetails(raw) {
    let mainDetailsRaw = raw.replace(generalDetailsBlock, '').trim(); 
    const paymentDetailsRaw = generalDetailsBlock.trim();
    const mainHtml = mainDetailsRaw.split(/\n+/).map(line => {
      let t = line.trim(); if (!t) return "";
      if (t.startsWith('FABRIC:') || t.startsWith('CARE:') || t.startsWith('FINISH:')) return `<div class="md-h">${escapeHTML(t)}</div>`;
      return `<div class="md-p">${escapeHTML(t)}</div>`;
    }).join("");
    const paymentHtml = `<div class="payment-warning-block">${paymentDetailsRaw.split(/\n+/).map(line => { let t = line.trim(); if (!t) return ""; return `<div class="md-p">${escapeHTML(t)}</div>`; }).join("")}</div>`;
    return mainHtml + paymentHtml; 
  }

  // SEARCH LISTENERS REMOVED

  document.addEventListener('DOMContentLoaded', () => {
    productCards = Array.from(dom.views.home.querySelectorAll('.card[data-product-name]'));
    
    // START CAROUSEL
    initHeroSlider();
  });

  const checkoutBtn = document.getElementById('checkout-btn');
  if (checkoutBtn) {
      checkoutBtn.addEventListener('click', (e) => {
          e.preventDefault(); e.stopPropagation(); goCheckoutView();
      });
  }
  
  // --- MENU LOGIC ---
  if (dom.menu.btn && dom.menu.overlay && dom.menu.closeBtn) {
      const toggleMenu = (show) => {
          if (show) dom.menu.overlay.classList.add('active');
          else dom.menu.overlay.classList.remove('active');
      };

      dom.menu.btn.addEventListener('click', () => toggleMenu(true));
      dom.menu.closeBtn.addEventListener('click', () => toggleMenu(false));
      
      // Close menu when clicking links (Handles both nav-items and community-btns)
      dom.menu.links.forEach(link => {
          link.addEventListener('click', () => toggleMenu(false));
      });

      // Updated: Close when clicking overlay (the dark part)
      dom.menu.overlay.addEventListener('click', (e) => {
          if (e.target === dom.menu.overlay) {
              toggleMenu(false);
          }
      });
  }

  document.body.addEventListener('click', async (e) => {
    const target = e.target;

    // HANDLING THE NEW CREATIVE SIZE CARD CLICKS
    const sizeCard = target.closest('.size-card');
    if (sizeCard) {
       sizeCard.classList.add('pulse');
       setTimeout(() => sizeCard.classList.remove('pulse'), 150);
       
       try {
         const item = JSON.parse(sizeCard.dataset.item);
         addToCart(item);
       } catch {}
       return;
    }

    const productCard = target.closest('[data-product-name]');
    if (productCard && (productCard.classList.contains('card'))) {
      if (target.closest('.hero-more')) return; 
      productCard.classList.add('tap-anim');
      setTimeout(() => productCard.classList.remove('tap-anim'), 120);
      openProduct(productCard.dataset.productName);
      return;
    }

    if (target.id === 'product-back-btn') {
      showView('home');
      window.scrollTo(0, lastScroll);
      return;
    }
    
    const moreDetailsBtn = target.closest('.hero-more');
    if (moreDetailsBtn) {
      moreDetailsBtn.classList.add('tap-anim');
      setTimeout(() => moreDetailsBtn.classList.remove('tap-anim'), 120);
      const productName = moreDetailsBtn.dataset.productName;
      const raw = moreDetailsByProduct[productName] || "More details coming soon.";
      dom.explain.text.innerHTML = formatDetails(raw);
      dom.explain.overlay.style.display = "grid";
      return;
    }

    const whyBuyBtn = target.closest('#why-buy-btn');
    if (whyBuyBtn) {
      whyBuyBtn.classList.add('tap-anim');
      setTimeout(() => whyBuyBtn.classList.remove('tap-anim'), 120);
      dom.whyBuy.overlay.style.display = "grid";
      return;
    }

    if (target.id === 'explain-ok-btn' || target.closest('#explain-ok-btn')) { dom.explain.overlay.style.display = "none"; return; }
    if (target.id === 'why-buy-back-btn' || target.closest('#why-buy-back-btn')) { dom.whyBuy.overlay.style.display = "none"; return; }
    
    const removeBtn = target.closest('.remove-btn');
    if (removeBtn) { removeItemFromCart(removeBtn.dataset.cartKey); return; }

    // NEW: Handle decrease button click
    const decreaseBtn = target.closest('.decrease-btn');
    if (decreaseBtn) { 
        decreaseQuantity(decreaseBtn.dataset.cartKey); 
        return; 
    }

    if (target.id === 'cart-toggle-btn') {
      dom.cart.bar.classList.toggle('collapsed');
      requestAnimationFrame(() => {
        let cartBarHeight = dom.cart.bar.classList.contains('collapsed') ? 60 : dom.cart.bar.offsetHeight;
        document.body.style.paddingBottom = (cartBarHeight) + "px";
      });
      return;
    }

    if (target.id === 'clear-cart-btn') { clearCart(); return; }
    
    if (target.id === 'checkout-back-btn') {
      if (cart.length) dom.cart.bar.style.display = 'block';
      showView(lastViewBeforeCheckout);
      if (lastViewBeforeCheckout === 'product') {
          setTimeout(() => { window.scrollTo(0, productPageScroll); }, 10); 
      } else {
          window.scrollTo(0, lastScroll); 
      }
      return;
    }

    if (target.id === 'note-ok-btn' || target.closest('#note-ok-btn')) {
      dom.checkout.noteStep.style.display = 'none';
      dom.checkout.receiptStep.style.display = 'block';
      buildReceipt();
      dom.checkout.receiptStep.style.pointerEvents = 'none';
      setTimeout(() => {
        dom.checkout.receiptStep.style.pointerEvents = 'auto';
      }, 50);
      return;
    }
    
    if (target.id === 'copy-receipt-btn' || target.closest('#copy-receipt-btn')) {
      const ta = dom.checkout.receiptText;
      const btn = dom.checkout.copyReceiptBtn;
      try {
        if (navigator.clipboard) { await navigator.clipboard.writeText(ta.value); } else { ta.select(); document.execCommand('copy'); }
        btn.textContent = 'COPIED!'; btn.classList.add('copied'); btn.disabled = true;
        dom.checkout.nextBtn.style.display = 'inline-block';
      } catch (err) {}
      return;
    }
  });

  /* =========================
   HERO SLIDER LOGIC (Manual + White Flash)
  ========================= */
  function initHeroSlider() {
    const slides = document.querySelectorAll('.hero-slide');
    const dots = document.querySelectorAll('.hero-dots .dot');
    const flashOverlay = document.querySelector('.hero-flash-overlay');
    const carousel = document.querySelector('.hero-carousel');
    
    if (!slides.length) return;

    // UPDATED: Start at Index 1 because the middle slide is set to 'active' in HTML
    let currentIndex = 1;
    let isAnimating = false;

    const showSlide = (index) => {
        if (isAnimating) return;
        if (index === currentIndex) return;
        
        isAnimating = true;

        // Handle wrapping
        if (index >= slides.length) index = 0;
        if (index < 0) index = slides.length - 1;

        // 1. Trigger White Overlay (Flash In)
        flashOverlay.classList.add('flash-active');

        // 2. Wait for overlay to be fully white (300ms matches CSS)
        setTimeout(() => {
            // Swap Slides behind the white curtain
            slides[currentIndex].classList.remove('active');
            dots[currentIndex].classList.remove('active');

            slides[index].classList.add('active');
            dots[index].classList.add('active');
            
            currentIndex = index;

            // 3. Remove White Overlay (Flash Out)
            flashOverlay.classList.remove('flash-active');
            
            // Reset animation lock after flash out
            setTimeout(() => {
                isAnimating = false;
            }, 300);

        }, 300); 
    };

    // Dot Navigation
    dots.forEach(dot => {
        dot.addEventListener('click', () => {
            const index = parseInt(dot.dataset.index);
            showSlide(index);
        });
    });

    // --- SWIPE GESTURES (Manual Move) ---
    let touchStartX = 0;
    let touchEndX = 0;

    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, {passive: true});

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, {passive: true});

    function handleSwipe() {
        const threshold = 50; // Min distance to be considered a swipe
        if (touchEndX < touchStartX - threshold) {
            // Swiped Left -> Next Slide
            showSlide(currentIndex + 1);
        }
        if (touchEndX > touchStartX + threshold) {
            // Swiped Right -> Prev Slide
            showSlide(currentIndex - 1);
        }
    }
  }

})();