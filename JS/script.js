



const categoryContainer = document.querySelector('.category-buttons');
const trendingContainer = document.querySelector('.trending-products');
const topRatedContainer = document.querySelector('.top-rated-container');
const modal = document.querySelector('.modal');
const modalBody = modal.querySelector('.modal-body');
const closeBtn = modal.querySelector('.close-btn');
const priceFilter = document.querySelector('.price-filter');
const sortBy = document.querySelector('.sort-by');

let allProducts = [];

// Fetch categories
fetch('https://fakestoreapi.com/products/categories')
    .then(res => res.json())
    .then(categories => {
        categories.forEach(cat => {
            const btn = document.createElement('button');
            btn.textContent = cat;
            btn.addEventListener('click', () => loadProducts(cat));
            categoryContainer.appendChild(btn);
        });
        // load all products initially
        loadProducts();
    });

// Load products
function loadProducts(category = '') {
    const url = category
        ? `https://fakestoreapi.com/products/category/${category}`
        : 'https://fakestoreapi.com/products';

    fetch(url)
        .then(res => res.json())
        .then(products => {
            allProducts = products; // save for filter/sort
            renderProducts(products);
            renderTopRated(products);
        });
}

// Render Trending / Product Cards
function renderProducts(products) {
    let filtered = filterProducts(products);
    filtered = sortProducts(filtered);

    trendingContainer.innerHTML = '';
    filtered.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>${p.category}</p>
      <p>⭐ ${p.rating.rate} (${p.rating.count})</p>
      <h3>$${p.price}</h3>
      <button class="details-btn" data-id="${p.id}">Details</button>
      <button class="add-btn" data-id="${p.id}">Add</button>
    `;
        trendingContainer.appendChild(card);
    });

    document.querySelectorAll('.details-btn').forEach(btn => {
        btn.addEventListener('click', e => showDetails(e.target.dataset.id));
    });

    document.querySelectorAll('.add-btn').forEach(btn => {
        btn.addEventListener('click', e => addToCart(e.target.dataset.id));
    });
}

// Filter by Price
function filterProducts(products) {
    const value = priceFilter.value;
    if (value === 'low') return products.filter(p => p.price < 50);
    if (value === 'mid') return products.filter(p => p.price >= 50 && p.price <= 150);
    if (value === 'high') return products.filter(p => p.price > 150);
    return products;
}

// Sort Products
function sortProducts(products) {
    const value = sortBy.value;
    if (value === 'price-asc') return [...products].sort((a, b) => a.price - b.price);
    if (value === 'price-desc') return [...products].sort((a, b) => b.price - a.price);
    if (value === 'rating-asc') return [...products].sort((a, b) => a.rating.rate - b.rating.rate);
    if (value === 'rating-desc') return [...products].sort((a, b) => b.rating.rate - a.rating.rate);
    return products;
}

// Render Top Rated Products
function renderTopRated(products) {
    const top = products.filter(p => p.rating.rate >= 4).slice(0, 3);
    topRatedContainer.innerHTML = '';
    top.forEach(p => {
        const card = document.createElement('div');
        card.classList.add('product-card');
        card.innerHTML = `
      <img src="${p.image}" alt="${p.title}">
      <h4>${p.title}</h4>
      <p>⭐ ${p.rating.rate} (${p.rating.count})</p>
      <h3>$${p.price}</h3>
    `;
        topRatedContainer.appendChild(card);
    });
}

// Show Details in Modal
function showDetails(id) {
    fetch(`https://fakestoreapi.com/products/${id}`)
        .then(res => res.json())
        .then(p => {
            modalBody.innerHTML = `
        <img src="${p.image}" alt="${p.title}" style="height:200px;object-fit:contain">
        <h2>${p.title}</h2>
        <p>${p.category}</p>
        <p>⭐ ${p.rating.rate} (${p.rating.count})</p>
        <h3>$${p.price}</h3>
        <p>${p.description}</p>
      `;
            modal.classList.remove('hidden');
        });
}

// Close Modal
closeBtn.addEventListener('click', () => modal.classList.add('hidden'));
window.addEventListener('click', e => { if (e.target === modal) modal.classList.add('hidden'); });

// Add to Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(id);
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart!');
}

// Event listeners for filters
priceFilter.addEventListener('change', () => renderProducts(allProducts));
sortBy.addEventListener('change', () => renderProducts(allProducts));