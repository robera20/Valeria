/* VALERIA THEME - PRODUCT PAGE JAVASCRIPT */

class ValeriaProduct {
  constructor() {
    this.product = window.productData || {};
    this.selectedVariant = this.product.selected_or_first_available_variant || {};
    this.init();
  }

  init() {
    this.setupVariantSelection();
    this.setupCollapsibles();
    this.setupMediaGallery();
    this.setupAddToCart();
  }

  setupVariantSelection() {
    const variantButtons = document.querySelectorAll('[data-variant-option]');

    variantButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        e.preventDefault();
        this.selectVariant(button);
      });
    });
  }

  selectVariant(button) {
    const variantId = button.dataset.variantId;
    const option = button.dataset.variantOption;
    const group = button.parentElement;

    // Update active state
    group.querySelectorAll('button').forEach(btn => {
      btn.classList.remove('active');
    });
    button.classList.add('active');

    // Find selected variant
    this.selectedVariant = this.product.variants.find(v => v.id == variantId);

    // Update product info
    this.updateProductInfo();
    this.updateMediaGallery();
  }

  updateProductInfo() {
    // Update price
    const priceElement = document.querySelector('[data-product-price]');
    if (priceElement && this.selectedVariant) {
      priceElement.innerHTML = this.formatPrice(this.selectedVariant.price);
    }

    // Update availability
    const availabilityElement = document.querySelector('[data-product-availability]');
    if (availabilityElement) {
      if (this.selectedVariant.available) {
        availabilityElement.textContent = 'In stock';
        availabilityElement.classList.remove('unavailable');
      } else {
        availabilityElement.textContent = 'Out of stock';
        availabilityElement.classList.add('unavailable');
      }
    }

    // Update URL
    const url = new URL(window.location);
    url.searchParams.set('variant', this.selectedVariant.id);
    window.history.replaceState({}, '', url);
  }

  updateMediaGallery() {
    // Update main image
    const mainMedia = document.querySelector('[data-product-main-media]');
    if (mainMedia && this.selectedVariant.featured_media) {
      const img = mainMedia.querySelector('img');
      if (img) {
        img.src = this.selectedVariant.featured_media.preview_image.src;
        img.alt = this.selectedVariant.featured_media.alt;
      }
    }
  }

  setupMediaGallery() {
    const thumbnails = document.querySelectorAll('[data-product-thumbnail]');
    const mainMedia = document.querySelector('[data-product-main-media]');

    thumbnails.forEach(thumbnail => {
      thumbnail.addEventListener('click', () => {
        const src = thumbnail.dataset.src;
        const alt = thumbnail.dataset.alt;

        thumbnails.forEach(t => t.classList.remove('active'));
        thumbnail.classList.add('active');

        if (mainMedia) {
          const img = mainMedia.querySelector('img');
          if (img) {
            img.src = src;
            img.alt = alt;
          }
        }
      });
    });

    // Set first thumbnail as active
    if (thumbnails.length > 0) {
      thumbnails[0].classList.add('active');
    }
  }

  setupCollapsibles() {
    const headers = document.querySelectorAll('[data-collapsible-header]');

    headers.forEach(header => {
      header.addEventListener('click', () => {
        const content = header.nextElementSibling;
        const isOpen = content.classList.contains('open');

        // Close all other collapsibles
        document.querySelectorAll('[data-collapsible-content]').forEach(c => {
          c.classList.remove('open');
        });

        // Toggle current
        if (!isOpen) {
          content.classList.add('open');
        }
      });
    });
  }

  setupAddToCart() {
    const addToCartBtn = document.querySelector('[data-add-to-cart]');
    if (!addToCartBtn) return;

    addToCartBtn.addEventListener('click', (e) => {
      e.preventDefault();
      this.addToCart();
    });
  }

  async addToCart() {
    const quantity = parseInt(document.querySelector('[data-quantity-input]')?.value || 1);

    try {
      const response = await fetch('/cart/add.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          id: this.selectedVariant.id,
          quantity: quantity
        })
      });

      const data = await response.json();
      this.handleAddToCartSuccess(data);
    } catch (error) {
      // Error handling - silent fail with optional UI feedback
    }
  }

  handleAddToCartSuccess(data) {
    // Show success message
    const message = document.querySelector('[data-add-to-cart-message]');
    if (message) {
      message.textContent = 'Added to cart!';
      message.style.display = 'block';
      setTimeout(() => {
        message.style.display = 'none';
      }, 3000);
    }

    // Open cart drawer
    if (window.valeriaTheme) {
      const cartDrawer = document.querySelector('[data-cart-drawer]');
      window.valeriaTheme.openCartDrawer(cartDrawer);
    }

    // Update cart count in header
    const cartCount = document.querySelector('.valeria-header__cart-count');
    if (cartCount) {
      cartCount.textContent = data.item_count;
    }
  }

  formatPrice(cents) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(cents / 100);
  }
}

// Initialize product page
document.addEventListener('DOMContentLoaded', () => {
  if (window.productData) {
    window.valeriaProduct = new ValeriaProduct();
  }
});
