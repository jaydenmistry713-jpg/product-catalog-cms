// Fetch and display products
async function loadProducts() {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = '<div class="loading">Loading products...</div>';

    try {
        // Fetch the products list from the CMS
        const response = await fetch('/products/products.json');
        const data = await response.json();

        if (!data.products || data.products.length === 0) {
            productsGrid.innerHTML = '<div class="loading">No products available yet.</div>';
            return;
        }

        // Clear loading message
        productsGrid.innerHTML = '';

        // Create product cards
        data.products.forEach(product => {
            const card = createProductCard(product);
            productsGrid.appendChild(card);
        });
    } catch (error) {
        console.error('Error loading products:', error);
        productsGrid.innerHTML = '<div class="loading">Error loading products. Please try again later.</div>';
    }
}

// Create a product card element
function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';

    card.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image" onerror="this.src='https://via.placeholder.com/280x250?text=No+Image'">
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-description">${product.description}</p>
            <div class="product-price">£${parseFloat(product.price).toFixed(2)}</div>
        </div>
    `;

    return card;
}

// Load products when page loads
document.addEventListener('DOMContentLoaded', loadProducts);
