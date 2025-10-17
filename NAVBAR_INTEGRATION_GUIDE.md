# Navbar with Dropdown Integration Guide

## Files Structure

The navbar with dropdown cards consists of these files:

```
frontend/
├── navbar-component.html          # Main navbar component with dropdowns
├── navbar-dropdown.html           # Dropdown HTML (standalone)
├── style/
│   ├── navbar-styles.css         # Navbar styles
│   └── navbar-dropdown.css       # Dropdown styles
└── src/
    └── navbar-dropdown.js        # Dropdown functionality
```

## How It Works

The navbar has 3 interactive buttons that trigger dropdown cards:

1. **Search Button** → Opens search dropdown with product search
2. **Account Icon** → Opens account menu dropdown
3. **Cart Link** → Opens shopping cart dropdown

## Integration in Your Pages

### Option 1: Load Navbar Component Dynamically (Recommended)

Add this to your HTML pages (like index.html, products.html):

```html
<!-- In the <head> section -->
<link rel="stylesheet" href="./frontend/style/navbar-styles.css">
<link rel="stylesheet" href="./frontend/style/navbar-dropdown.css">

<!-- Where you want the navbar to appear -->
<div id="navbar-container"></div>

<!-- Before closing </body> tag -->
<script>
    // Load navbar component
    fetch('./frontend/navbar-component.html')
        .then(response => response.text())
        .then(html => {
            document.getElementById('navbar-container').innerHTML = html;
        })
        .catch(error => console.error('Error loading navbar:', error));
</script>
<script src="./frontend/src/navbar-dropdown.js"></script>
```

### Option 2: Direct Include

Simply copy the content from `navbar-component.html` directly into your HTML pages where you want the navbar to appear.

## Features

### Cart Dropdown
- Shows cart items with images, names, prices
- Quantity controls (+/-)
- Remove item button
- Total price calculation
- Links to cart and checkout pages
- Empty cart state with "Shop Now" button

### Search Dropdown
- Real-time product search
- Popular search tags
- Product results with images and prices
- Links to product pages

### Account Dropdown
- My Profile
- My Orders
- Wishlist
- Addresses
- Settings
- Logout button

## Customization

### Styling
Edit `frontend/style/navbar-dropdown.css` to customize:
- Colors
- Sizes
- Animations
- Spacing

### Products Data
Edit `frontend/src/navbar-dropdown.js` to update the `searchProducts` array with your actual products.

### Cart Storage
The cart uses localStorage with key `etlala_cart`. Format:
```javascript
[
    {
        id: 1,
        name: "Product Name",
        price: 40,
        image: "./path/to/image.webp",
        quantity: 2
    }
]
```

## Testing

1. Click the **Search button** (magnifying glass) to open search dropdown
2. Click the **Account icon** (person icon) to open account menu
3. Click the **Cart link** to open shopping cart

All dropdowns:
- Close when clicking the X button
- Close when clicking the overlay
- Close when pressing ESC key
- Only one dropdown opens at a time
