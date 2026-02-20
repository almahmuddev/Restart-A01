

const detailsContainer = document.getElementById("productDetails");

const params = new URLSearchParams(window.location.search);
const id = params.get("id");

fetch(`https://fakestoreapi.com/products/${id}`)
  .then(res => res.json())
  .then(product => {
    detailsContainer.innerHTML = `
      <img src="${product.image}" width="300">
      <h2>${product.title}</h2>
      <p>${product.description}</p>
      <h3>$${product.price}</h3>
      <button onclick="addToCart(${product.id})">Add to Cart</button>
    `;
  });

function addToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then(res => res.json())
    .then(product => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      alert("Added to cart!");
    });
}
