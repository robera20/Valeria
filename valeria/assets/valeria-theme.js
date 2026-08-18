/* VALERIA THEME - CORE JAVASCRIPT */

class ValeriaTheme {
  constructor() {
    this.init();
  }

  init() {
    this.setupEventListeners();
    this.setupObservers();
  }

  setupEventListeners() {
    // Cart drawer
    const cartDrawer = document.querySelector('[data-cart-drawer]');
    const cartTriggers = document.querySelectorAll('[data-action="open-cart"]');
    const cartCloseButtons = document.querySelectorAll('[data-cart-drawer-close]');

    cartTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.openCartDrawer(cartDrawer));
    });

    cartCloseButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeCartDrawer(cartDrawer));
    });

    // Search overlay
    const searchOverlay = document.querySelector('[data-search-overlay]');
    const searchTriggers = document.querySelectorAll('[data-action="open-search"]');
    const searchCloseButtons = document.querySelectorAll('[data-search-close]');

    searchTriggers.forEach(trigger => {
      trigger.addEventListener('click', () => this.openSearchOverlay(searchOverlay));
    });

    searchCloseButtons.forEach(btn => {
      btn.addEventListener('click', () => this.closeSearchOverlay(searchOverlay));
    });

    // Keyboard shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeCartDrawer(cartDrawer);
        this.closeSearchOverlay(searchOverlay);
      }
    });

    // Mobile menu
    const menuTrigger = document.querySelector('[data-action="toggle-mobile-menu"]');
    if (menuTrigger) {
      menuTrigger.addEventListener('click', () => this.toggleMobileMenu());
    }
  }

  setupObservers() {
    // Intersection Observer for animations
    if ('IntersectionObserver' in window) {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
          }
        });
      }, {
        threshold: 0.1
      });

      document.querySelectorAll('.valeria-reveal').forEach(el => {
        observer.observe(el);
      });
    }

    // Image lazy loading
    if ('IntersectionObserver' in window && 'loading' in HTMLImageElement.prototype) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
            imageObserver.unobserve(img);
          }
        });
      });

      document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
      });
    }
  }

  openCartDrawer(cartDrawer) {
    if (!cartDrawer) return;
    cartDrawer.removeAttribute('hidden');
    document.body.style.overflow = 'hidden';
  }

  closeCartDrawer(cartDrawer) {
    if (!cartDrawer) return;
    cartDrawer.setAttribute('hidden', '');
    document.body.style.overflow = '';
  }

  openSearchOverlay(searchOverlay) {
    if (!searchOverlay) return;
    searchOverlay.removeAttribute('hidden');
    const input = searchOverlay.querySelector('[data-search-input]');
    if (input) {
      setTimeout(() => input.focus(), 100);
    }
  }

  closeSearchOverlay(searchOverlay) {
    if (!searchOverlay) return;
    searchOverlay.setAttribute('hidden', '');
  }

  toggleMobileMenu() {
    const header = document.querySelector('.valeria-header');
    header.classList.toggle('mobile-menu-open');
  }

  // Utility functions
  formatPrice(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }

  debounce(func, wait) {
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

  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
}

// Initialize theme
document.addEventListener('DOMContentLoaded', () => {
  window.valeriaTheme = new ValeriaTheme();
});
