/* VALERIA THEME - CART */

class ValeriaCart {
  constructor() {
    this.cartDrawer = document.querySelector('[data-cart-drawer]');
    this.setupEventListeners();
  }

  setupEventListeners() {
    // Remove item buttons
    document.addEventListener('click', (e) => {
      if (e.target.closest('[data-remove-item]')) {
        const key = e.target.closest('[data-remove-item]').dataset.removeItem;
        this.removeItem(key);
      }
    });

    // Quantity change
    document.addEventListener('change', (e) => {
      if (e.target.matches('[data-item-quantity]')) {
        const key = e.target.dataset.itemKey;
        const quantity = parseInt(e.target.value);
        this.updateQuantity(key, quantity);
      }
    });

    // Quantity buttons
    document.addEventListener('click', (e) => {
      const btn = e.target.closest('.valeria-qty-btn');
      if (btn) {
        const input = btn.parentElement.querySelector('input');
        const change = parseInt(btn.dataset.changeQuantity);
        input.value = Math.max(1, parseInt(input.value) + change);
        input.dispatchEvent(new Event('change'));
      }
    });
  }

  async removeItem(key) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          line: key,
          quantity: 0
        })
      });

      const data = await response.json();
      this.updateCartDisplay(data);
    } catch (error) {
      // Error handling - silent fail with optional UI feedback
    }
  }

  async updateQuantity(key, quantity) {
    try {
      const response = await fetch('/cart/change.js', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          line: key,
          quantity: quantity
        })
      });

      const data = await response.json();
      this.updateCartDisplay(data);
    } catch (error) {
      // Error handling - silent fail with optional UI feedback
    }
  }

  updateCartDisplay(cart) {
    // Update cart count in header
    const cartCount = document.querySelector('.valeria-header__cart-count');
    if (cartCount) {
      if (cart.item_count === 0) {
        cartCount.remove();
      } else {
        cartCount.textContent = cart.item_count;
      }
    }

    // Refresh cart drawer
    this.refreshCartDrawer();
  }

  async refreshCartDrawer() {
    try {
      const response = await fetch('/cart');
      const html = response.text();
      // Parse and update cart drawer content
      // This would typically involve re-rendering the cart items
    } catch (error) {
      // Error handling - silent fail with optional UI feedback
    }
  }
}

// Initialize cart
document.addEventListener('DOMContentLoaded', () => {
  window.valeriaCart = new ValeriaCart();
});
