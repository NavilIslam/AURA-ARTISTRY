/**
 * Aura Artistry — Interactive Application Controller
 */

import { siteData } from './data.js';

class AuraApp {
  constructor() {
    this.currentView = 'portfolio';
    this.currentFilter = 'all';
    this.visibleGalleryCount = 6;
    this.currentLightboxIndex = 0;
    this.filteredGalleryItems = [];

    this.init();
  }

  init() {
    this.setupNavigation();
    this.setupMobileMenu();
    this.setupGallery();
    this.setupLightbox();
    this.setupRateCardModal();
    this.setupInquiryForm();
    this.setupScrollObserver();
    this.handleInitialRoute();

    console.log("Aura Artistry application initialized.");
  }

  /* --------------------------------------------------------------------------
     ROUTING & VIEW MANAGEMENT
     -------------------------------------------------------------------------- */
  handleInitialRoute() {
    const hash = window.location.hash.replace('#', '');
    const validViews = ['portfolio', 'gallery', 'about', 'services', 'inquire'];
    if (hash && validViews.includes(hash)) {
      this.switchView(hash);
    } else {
      this.switchView('portfolio');
    }

    window.addEventListener('hashchange', () => {
      const newHash = window.location.hash.replace('#', '');
      if (newHash && validViews.includes(newHash)) {
        this.switchView(newHash);
      }
    });
  }

  switchView(viewId) {
    if (!viewId) return;

    // Update active section
    const allSections = document.querySelectorAll('.view-section');
    allSections.forEach(sec => sec.classList.remove('active'));

    const targetSection = document.getElementById(`view-${viewId}`);
    if (targetSection) {
      targetSection.classList.add('active');
      this.currentView = viewId;
    }

    // Update nav links active class
    const navLinks = document.querySelectorAll('.nav-link, .mobile-nav-link');
    navLinks.forEach(link => {
      if (link.getAttribute('data-view-target') === viewId) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Update URL hash without breaking page scroll
    if (window.location.hash.replace('#', '') !== viewId) {
      history.pushState(null, '', `#${viewId}`);
    }

    // Scroll to top smoothly
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu if open
    this.closeMobileMenu();
  }

  setupNavigation() {
    // All elements with data-view-target
    document.addEventListener('click', (e) => {
      const targetBtn = e.target.closest('[data-view-target]');
      if (targetBtn) {
        e.preventDefault();
        const targetView = targetBtn.getAttribute('data-view-target');
        
        // Handle pre-filled inquiry types if provided
        const inquireType = targetBtn.getAttribute('data-inquire-type');
        if (inquireType) {
          const selectElem = document.getElementById('selectInquiryType');
          if (selectElem) {
            selectElem.value = inquireType;
          }
        }

        // Close rate card modal if open
        const rateModal = document.getElementById('rateCardModal');
        if (rateModal && rateModal.classList.contains('active')) {
          rateModal.classList.remove('active');
        }

        this.switchView(targetView);
      }
    });

    // Specific CTA links
    const directInquiryButtons = document.querySelectorAll('[data-inquire-type]');
    directInquiryButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const type = btn.getAttribute('data-inquire-type');
        const selectElem = document.getElementById('selectInquiryType');
        if (selectElem && type) {
          selectElem.value = type;
        }
        this.switchView('inquire');
      });
    });
  }

  /* --------------------------------------------------------------------------
     MOBILE MENU
     -------------------------------------------------------------------------- */
  setupMobileMenu() {
    const toggleBtn = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');

    if (!toggleBtn || !mobileMenu) return;

    toggleBtn.addEventListener('click', () => {
      toggleBtn.classList.toggle('active');
      mobileMenu.classList.toggle('open');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!mobileMenu.contains(e.target) && !toggleBtn.contains(e.target) && mobileMenu.classList.contains('open')) {
        this.closeMobileMenu();
      }
    });
  }

  closeMobileMenu() {
    const toggleBtn = document.getElementById('mobileToggle');
    const mobileMenu = document.getElementById('mobileMenu');
    if (toggleBtn) toggleBtn.classList.remove('active');
    if (mobileMenu) mobileMenu.classList.remove('open');
  }

  /* --------------------------------------------------------------------------
     GALLERY & FILTERING
     -------------------------------------------------------------------------- */
  setupGallery() {
    const filterBtns = document.querySelectorAll('.gallery-filter-btn');
    const loadMoreBtn = document.getElementById('btnLoadMoreWork');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        this.currentFilter = btn.getAttribute('data-filter');
        this.visibleGalleryCount = 6;
        this.renderGallery();
      });
    });

    if (loadMoreBtn) {
      loadMoreBtn.addEventListener('click', () => {
        this.visibleGalleryCount += 6;
        this.renderGallery();
        this.showToast("Loaded additional archival works.");
      });
    }

    this.renderGallery();
  }

  renderGallery() {
    const galleryGrid = document.getElementById('galleryGrid');
    const loadMoreBtn = document.getElementById('btnLoadMoreWork');
    if (!galleryGrid) return;

    // Filter items
    if (this.currentFilter === 'all') {
      this.filteredGalleryItems = siteData.gallery;
    } else {
      this.filteredGalleryItems = siteData.gallery.filter(
        item => item.category.toLowerCase() === this.currentFilter.toLowerCase()
      );
    }

    const itemsToDisplay = this.filteredGalleryItems.slice(0, this.visibleGalleryCount);

    galleryGrid.innerHTML = itemsToDisplay.map((item, index) => {
      return `
        <div class="gallery-item" data-index="${index}" role="button" tabindex="0" aria-label="View ${item.title}">
          <span class="gallery-item-badge">${item.categoryLabel}</span>
          <div class="gallery-item-image-wrapper">
            <img src="${item.image}" alt="${item.title}" loading="lazy">
          </div>
          <div class="gallery-item-info">
            <h3 class="gallery-item-title">${item.title}</h3>
            <p class="gallery-item-sub">${item.publication || item.caption}</p>
          </div>
        </div>
      `;
    }).join('');

    // Toggle Load More button visibility
    if (loadMoreBtn) {
      if (itemsToDisplay.length >= this.filteredGalleryItems.length) {
        loadMoreBtn.style.display = 'none';
      } else {
        loadMoreBtn.style.display = 'inline-flex';
      }
    }

    // Attach click listeners to gallery items for Lightbox
    const items = galleryGrid.querySelectorAll('.gallery-item');
    items.forEach(el => {
      el.addEventListener('click', () => {
        const index = parseInt(el.getAttribute('data-index'), 10);
        this.openLightbox(index);
      });
      el.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          const index = parseInt(el.getAttribute('data-index'), 10);
          this.openLightbox(index);
        }
      });
    });
  }

  /* --------------------------------------------------------------------------
     FULLSCREEN LIGHTBOX MODAL
     -------------------------------------------------------------------------- */
  setupLightbox() {
    const modal = document.getElementById('lightboxModal');
    const closeBtn = document.getElementById('lightboxCloseBtn');
    const prevBtn = document.getElementById('lightboxPrevBtn');
    const nextBtn = document.getElementById('lightboxNextBtn');

    if (!modal) return;

    closeBtn?.addEventListener('click', () => this.closeLightbox());
    prevBtn?.addEventListener('click', () => this.navigateLightbox(-1));
    nextBtn?.addEventListener('click', () => this.navigateLightbox(1));

    // Close on background click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        this.closeLightbox();
      }
    });

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      if (!modal.classList.contains('active')) return;
      if (e.key === 'Escape') this.closeLightbox();
      if (e.key === 'ArrowLeft') this.navigateLightbox(-1);
      if (e.key === 'ArrowRight') this.navigateLightbox(1);
    });

    // Selected works on home page click
    const selectedWorkCards = document.querySelectorAll('.works-card');
    selectedWorkCards.forEach(card => {
      card.addEventListener('click', () => {
        const workId = card.getAttribute('data-work-id');
        const foundIndex = siteData.gallery.findIndex(g => g.id === `gal-${workId.replace('sel-', '')}`);
        if (foundIndex !== -1) {
          this.filteredGalleryItems = siteData.gallery;
          this.openLightbox(foundIndex);
        } else {
          // Default to first item
          this.filteredGalleryItems = siteData.gallery;
          this.openLightbox(0);
        }
      });
    });
  }

  openLightbox(index) {
    if (!this.filteredGalleryItems || !this.filteredGalleryItems[index]) return;
    this.currentLightboxIndex = index;
    const item = this.filteredGalleryItems[index];

    const modal = document.getElementById('lightboxModal');
    const imgElem = document.getElementById('lightboxImg');
    const tagElem = document.getElementById('lightboxTag');
    const titleElem = document.getElementById('lightboxTitle');
    const descElem = document.getElementById('lightboxDesc');
    const clientElem = document.getElementById('lightboxClient');
    const creditsElem = document.getElementById('lightboxCredits');

    if (imgElem) {
      imgElem.src = item.image;
      imgElem.alt = item.title;
    }
    if (tagElem) tagElem.textContent = item.categoryLabel;
    if (titleElem) titleElem.textContent = item.title;
    if (descElem) descElem.textContent = item.caption;
    if (clientElem) clientElem.textContent = item.publication || "Editorial Commission";
    if (creditsElem) creditsElem.textContent = item.credits || "Aura Artistry Studio";

    modal.classList.add('active');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  closeLightbox() {
    const modal = document.getElementById('lightboxModal');
    if (modal) {
      modal.classList.remove('active');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  navigateLightbox(direction) {
    const newIndex = this.currentLightboxIndex + direction;
    if (newIndex >= 0 && newIndex < this.filteredGalleryItems.length) {
      this.openLightbox(newIndex);
    } else if (newIndex < 0) {
      this.openLightbox(this.filteredGalleryItems.length - 1);
    } else {
      this.openLightbox(0);
    }
  }

  /* --------------------------------------------------------------------------
     RATE CARD MODAL
     -------------------------------------------------------------------------- */
  setupRateCardModal() {
    const rateModal = document.getElementById('rateCardModal');
    const openBtn = document.getElementById('btnRequestRateCard');
    const closeBtn = document.getElementById('rateCardCloseBtn');
    const rateCardItems = document.getElementById('rateCardItems');

    if (!rateModal) return;

    if (rateCardItems) {
      rateCardItems.innerHTML = siteData.rates.map(rate => `
        <div class="rate-row">
          <div>
            <h4 class="rate-name">${rate.tier}</h4>
            <p class="rate-row-desc">${rate.details}</p>
          </div>
          <div class="rate-price">${rate.rate}</div>
        </div>
      `).join('');
    }

    openBtn?.addEventListener('click', () => {
      rateModal.classList.add('active');
      rateModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
      rateModal.classList.remove('active');
      rateModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    rateModal.addEventListener('click', (e) => {
      if (e.target === rateModal) {
        rateModal.classList.remove('active');
        rateModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
      }
    });
  }

  /* --------------------------------------------------------------------------
     INQUIRY FORM VALIDATION & SUBMISSION
     -------------------------------------------------------------------------- */
  setupInquiryForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const firstName = document.getElementById('inputFirstName');
      const lastName = document.getElementById('inputLastName');
      const email = document.getElementById('inputEmail');
      const inquiryType = document.getElementById('selectInquiryType');
      const details = document.getElementById('inputDetails');

      let isValid = true;

      // Validate First Name
      if (!firstName.value.trim()) {
        this.setError('group-firstName', true);
        isValid = false;
      } else {
        this.setError('group-firstName', false);
      }

      // Validate Last Name
      if (!lastName.value.trim()) {
        this.setError('group-lastName', true);
        isValid = false;
      } else {
        this.setError('group-lastName', false);
      }

      // Validate Email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!email.value.trim() || !emailRegex.test(email.value.trim())) {
        this.setError('group-email', true);
        isValid = false;
      } else {
        this.setError('group-email', false);
      }

      // Validate Inquiry Type
      if (!inquiryType.value) {
        this.setError('group-inquiryType', true);
        isValid = false;
      } else {
        this.setError('group-inquiryType', false);
      }

      // Validate Details
      if (!details.value.trim()) {
        this.setError('group-details', true);
        isValid = false;
      } else {
        this.setError('group-details', false);
      }

      if (isValid) {
        const submitBtn = document.getElementById('btnSubmitInquiry');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = `SENDING...`;
        submitBtn.disabled = true;

        setTimeout(() => {
          submitBtn.innerHTML = originalText;
          submitBtn.disabled = false;
          form.reset();
          this.showToast(`Thank you, ${firstName.value}. Your inquiry has been received. Aura will respond within 48 hours.`);
        }, 800);
      }
    });

    // Clear error on input
    ['inputFirstName', 'inputLastName', 'inputEmail', 'selectInquiryType', 'inputDetails'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => {
          const group = el.closest('.form-group');
          if (group) group.classList.remove('has-error');
        });
      }
    });
  }

  setError(groupId, hasError) {
    const group = document.getElementById(groupId);
    if (group) {
      if (hasError) {
        group.classList.add('has-error');
      } else {
        group.classList.remove('has-error');
      }
    }
  }

  /* --------------------------------------------------------------------------
     TOAST NOTIFICATIONS
     -------------------------------------------------------------------------- */
  showToast(message, duration = 4500) {
    const container = document.getElementById('toastContainer');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <span style="font-size: 1.1rem; color: var(--accent-gold);">&#10003;</span>
      <span>${message}</span>
    `;

    container.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      setTimeout(() => toast.remove(), 350);
    }, duration);
  }

  /* --------------------------------------------------------------------------
     SCROLL & INTERSECTION OBSERVER ANIMATIONS
     -------------------------------------------------------------------------- */
  setupScrollObserver() {
    const observerOptions = {
      root: null,
      threshold: 0.15,
      rootMargin: "0px 0px -50px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    const animatedElements = document.querySelectorAll(
      '.service-row, .approach-item, .expertise-card, .works-card, .about-hero-grid'
    );

    animatedElements.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(24px)';
      el.style.transition = 'opacity 0.75s cubic-bezier(0.16, 1, 0.3, 1), transform 0.75s cubic-bezier(0.16, 1, 0.3, 1)';
      revealObserver.observe(el);
    });
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  new AuraApp();
});
