# VALERIA Shopify Theme

**The Future of Commerce**

A premium, futuristic Shopify Online Store 2.0 theme built with modern design principles, exceptional performance, and full accessibility. VALERIA is a production-ready theme designed for fashion, technology, luxury, and lifestyle brands.

> ⚠️ **Production Ready** — This theme has been optimized for Shopify Theme Store submission and real-world commerce operations.

## Features

### Design & UX
- **Futuristic Visual Language**: Sophisticated design system with glass panels, gradients, and animated accents
- **Premium Typography**: Configurable sans-serif headings and body fonts
- **Color System**: Five customizable color schemes (Obsidian, Lunar, Aurora, Titanium, Custom)
- **Responsive Design**: Mobile-first approach optimized for all devices
- **Motion System**: Subtle, performance-conscious animations with reduced-motion support

### Core Functionality
- ✅ Full Shopify Online Store 2.0 compatibility
- ✅ Sticky header with transparent-to-solid transition
- ✅ Mega menu with collections and products
- ✅ Predictive search with instant results
- ✅ AJAX cart drawer with recommendations
- ✅ Quick add and quick view modals
- ✅ Product variant selection with swatches
- ✅ Collection filtering and sorting
- ✅ Responsive product gallery with zoom
- ✅ Newsletter signup integration
- ✅ Customer account support

### Performance
- **Optimized Liquid**: Efficient template structure
- **Minimal JavaScript**: Modern vanilla JS, no jQuery or frameworks
- **Image Optimization**: Responsive image sizes with lazy loading
- **Core Web Vitals**: Optimized for LCP, CLS, and INP
- **Target Score**: Lighthouse 90+ achievable

### Accessibility
- **WCAG 2.1 AA Compliance**: Fully keyboard navigable
- **Semantic HTML**: Proper heading hierarchy and ARIA labels
- **Color Contrast**: All text meets WCAG standards
- **Reduced Motion**: Respects `prefers-reduced-motion` setting
- **Screen Reader**: Optimized for assistive technologies

## Theme Structure

```
valeria/
├── assets/
│   ├── valeria-base.css              # Core styles & reset
│   ├── valeria-components.css        # Component styles
│   ├── valeria-animations.css        # Keyframes & effects
│   ├── valeria-product.css           # Product page styles
│   ├── valeria-cart.css              # Cart page styles
│   ├── valeria-theme.js              # Core JavaScript
│   ├── valeria-product.js            # Product functionality
│   ├── valeria-cart.js               # Cart functionality
│   └── valeria-search.js             # Search functionality
│
├── config/
│   ├── settings_schema.json       # Theme Editor settings
│   └── settings_data.json         # Default configuration
│
├── layout/
│   └── theme.liquid               # Main layout template
│
├── locales/
│   └── en.default.json            # Translation strings
│
├── sections/
│   ├── hero.liquid                # Hero banner
│   ├── featured-collection.liquid # Product showcase
│   ├── newsletter.liquid          # Newsletter signup
│   ├── product.liquid             # Product page
│   ├── collection-products.liquid # Collection grid
│   ├── collection-header.liquid   # Collection title
│   ├── product-recommendations.liquid
│   ├── cart.liquid                # Cart page
│   └── page.liquid                # Generic page
│
├── snippets/
│   ├── header.liquid              # Navigation header
│   ├── footer.liquid              # Footer
│   ├── announcement-bar.liquid    # Top banner
│   ├── cart-drawer.liquid         # Cart sidebar
│   ├── search-overlay.liquid      # Search modal
│   ├── newsletter-form.liquid     # Newsletter form
│   ├── icon.liquid                # Icon helper
│   ├── price.liquid               # Price display
│   └── head-seo.liquid            # SEO metadata
│
└── templates/
    ├── index.json                 # Homepage
    ├── product.json               # Product page
    ├── collection.json            # Collection page
    ├── cart.json                  # Cart page
    ├── page.json                  # Pages
    └── customers/                 # Customer pages
```

## Settings

### Brand
- Logo (light & dark variants)
- Logo width
- Heading & body fonts
- Font sizes

### Colors
- Background, foreground, heading text
- Accent color for highlights
- Button colors
- Border color
- Sale price, success, and error colors

### Layout
- Container width (1000-1400px)
- Spacing unit (4-16px)
- Border radius (small, medium, large)

### Header
- Sticky header toggle
- Logo position (left or center)
- Announcement bar
- Announcement text & link

### Product
- Quick add button
- Quick view modal
- Vendor name display
- Product rating
- Color swatches
- Inventory indicator

### Cart
- Cart drawer toggle
- Free shipping threshold
- Product recommendations

### Performance
- Lazy load images
- Enable animations
- Animation intensity (light, medium, heavy)

## Customization

### Adding Custom CSS
Create a new CSS file in `assets/` and link it in `layout/theme.liquid`:
```liquid
{{ 'custom.css' | asset_url | stylesheet_tag }}
```

### Creating New Sections
1. Create a `.liquid` file in `sections/`
2. Add `{% schema %}` block with settings
3. Add `"presets"` for Theme Editor
4. Style with inline `<style>` or external CSS

### Modifying Typography
All font sizes are configurable through Theme Settings. Edit in **Customize Theme** → **Brand**.

### Changing Colors
Use the color picker in **Customize Theme** → **Colors** to change the entire color scheme instantly.

## Installation

1. Download the theme files
2. In Shopify Admin, go to **Online Store** → **Themes**
3. Click **Add theme** → **Upload ZIP file**
4. Select the `valeria.zip` file
5. Click **Install**

## Development

### Building the Theme
```bash
# No build step required - vanilla CSS and JS
# Just upload to Shopify or use Shopify CLI
```

### Local Development
Use Shopify CLI for local development:
```bash
shopify theme dev
```

### Testing
- Test all pages: homepage, product, collection, cart, pages
- Test variants: multi-option, single, unavailable
- Test responsive: mobile (320px, 375px, 430px), tablet (768px), desktop (1024px+)
- Test accessibility: keyboard navigation, screen readers, color contrast
- Test performance: Lighthouse audit

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Android)

## Accessibility

### Keyboard Navigation
- **Tab**: Navigate between interactive elements
- **Enter/Space**: Activate buttons and links
- **Escape**: Close modals and drawers
- **Arrow Keys**: Navigate menus and galleries

### Screen Reader Support
All images have descriptive alt text. Form labels are properly associated. Interactive elements have appropriate ARIA labels.

### Color Contrast
All text colors meet WCAG AA standards (4.5:1 for body text, 3:1 for large text).

## Performance Optimization

### Image Handling
- Use Shopify image optimization
- Provide responsive image sizes
- Lazy load below-the-fold images
- Avoid images >1200px wide for product photos

### CSS & JavaScript
- CSS is minified and critical-path optimized
- JavaScript is vanilla and modular
- No external dependencies
- Deferred script loading for non-critical JS

### Liquid Optimization
- Minimal loops and conditionals
- Efficient product queries
- Proper use of theme settings
- No n+1 queries

## Troubleshooting

### Cart not updating
- Check that `valeria-cart.js` is loading
- Verify AJAX requests in browser console
- Clear browser cache

### Search not working
- Ensure `valeria-search.js` is loading
- Check Shopify predictive search is enabled
- Verify products have content for search

### Mobile menu not working
- Check `valeria-theme.js` is loading
- Verify media queries in CSS
- Test on actual mobile device, not just browser zoom

## SEO

The theme includes:
- Semantic HTML structure
- Open Graph tags for social sharing
- Schema.org structured data
- Proper heading hierarchy
- Optimized meta descriptions
- Canonical URLs

## Support

For issues or questions:
1. Check Shopify theme documentation
2. Review theme settings configuration
3. Test in development store first
4. Check browser console for errors

## License

All code is proprietary to VALERIA theme. Unauthorized reproduction or distribution is prohibited.

## Changelog

### Version 1.0.0
- Initial release
- Full Online Store 2.0 support
- 9+ sections
- Optimized performance
- Full accessibility compliance
