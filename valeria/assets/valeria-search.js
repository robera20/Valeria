/* VALERIA THEME - SEARCH */

class ValeriaSearch {
  constructor() {
    this.searchOverlay = document.querySelector('[data-search-overlay]');
    this.searchInput = document.querySelector('[data-search-input]');
    this.searchResults = document.querySelector('[data-search-results]');
    this.debounceTimer = null;

    if (this.searchInput) {
      this.searchInput.addEventListener('input', (e) => this.handleSearch(e));
    }
  }

  handleSearch(e) {
    const query = e.target.value.trim();

    clearTimeout(this.debounceTimer);

    if (query.length === 0) {
      this.searchResults.innerHTML = '';
      return;
    }

    this.searchResults.innerHTML = '<div class="valeria-animate-pulse">Searching...</div>';

    this.debounceTimer = setTimeout(() => {
      this.fetchSearchResults(query);
    }, 300);
  }

  fetchSearchResults(query) {
    const searchUrl = `/search?q=${encodeURIComponent(query)}&type=product`;

    fetch(searchUrl)
      .then(response => response.text())
      .then(html => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        const products = doc.querySelectorAll('[data-product-item]');
        
        this.displayResults(products, query);
      })
      .catch(error => {
        // Error handling - search failed
        this.displaySearchError();
      });
  }

  displaySearchError() {
    this.searchResults.innerHTML = `<div class="valeria-search-empty">Unable to load results</div>`;
  }

  displayResults(products, query) {
    if (products.length === 0) {
      this.searchResults.innerHTML = `
        <div class="valeria-search-empty">
          <p>No products found for "${query}"</p>
        </div>
      `;
      return;
    }

    let html = '<div class="valeria-search-results-grid">';
    
    products.forEach((product, index) => {
      const title = product.querySelector('[data-product-title]')?.textContent || '';
      const price = product.querySelector('[data-product-price]')?.textContent || '';
      const url = product.querySelector('a')?.href || '';
      const image = product.querySelector('img')?.src || '';

      html += `
        <a href="${url}" class="valeria-search-result-item">
          ${image ? `<img src="${image}" alt="${title}" loading="lazy">` : ''}
          <div class="valeria-search-result-info">
            <h3>${title}</h3>
            <p>${price}</p>
          </div>
        </a>
      `;
    });

    html += '</div>';
    this.searchResults.innerHTML = html;
  }
}

// Initialize search
document.addEventListener('DOMContentLoaded', () => {
  window.valeriaSearch = new ValeriaSearch();
});
