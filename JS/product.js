



const productsContainer = document.getElementById("productsContainer");
const categoryContainer = document.getElementById("categoryContainer");
let allProducts = [];
let filteredProducts = [];

fetch("https://fakestoreapi.com/products?limit=12")
  .then(res => res.json())
  .then(data => {
    allProducts = data;
    filteredProducts = data;
    displayProducts(filteredProducts);
    loadCategories();
  });

function displayProducts(products) {
  productsContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
  <div class="product-img-box">
    <img src="${product.image}">
  </div>
  <div class="product-info">
    <div class="category-rating">
        <span class="category">${product.category}</span>
        <span class="rating"><span class="star">★</span> ${product.rating.rate} (${product.rating.count})</span>
    </div>
    <h3>${product.title}</h3>
    <p class="price">$${product.price}</p>
    <div class="button-group">
        <button class="details-btn">
            Details
        </button>
        <button class="add-btn">
            Add To Cart
        </button>
    </div>
  </div>
`;

    const addBtn = card.querySelector(".add-btn");
    addBtn.addEventListener("click", () => addToCart(product));
    productsContainer.appendChild(card);
  });
}

const filterButtons = document.querySelectorAll(".filter-btn");

// add click to each button
filterButtons.forEach(btn => {
  btn.addEventListener("click", () => {
    // removing active class
    filterButtons.forEach(b => b.classList.remove("active"));
    // adding active class
    btn.classList.add("active");

    const selectedCategory = btn.dataset.category;

    // Filter products
    if (selectedCategory === "all") {
      filteredProducts = allProducts;
    } else {
      filteredProducts = allProducts.filter(p => p.category === selectedCategory);
    }

    // show filtered products
    displayProducts(filteredProducts);
  });
});