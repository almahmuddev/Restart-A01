

const trendingContainer = document.getElementById("trendingContainer");

fetch("https://fakestoreapi.com/products?limit=3")
  .then(res => res.json())
  .then(data => {
    displayProducts(data);
  });

function displayProducts(products) {
  trendingContainer.innerHTML = "";

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div class="product-img-box">
        <img src="${product.image}">
      </div>
      <div class="product-info">
        <div class="category-rating">
          <span>${product.category}</span>
          <span><span>★</span> ${product.rating.rate} (${product.rating.count})</span>
        </div>
        <h3>${product.title}</h3>
        <p class="price">$${product.price}</p>
        <div class="button-group">
          <button class="details-btn">Details</button>
          <button class="add-btn">Add</button>
        </div>
      </div>
    `;

    const addBtn = card.querySelector(".add-btn");
    addBtn.addEventListener("click", () => addToCart(product));
    
    trendingContainer.appendChild(card);
  });
}











// const trendingContainer = document.getElementById("trendingContainer");

// fetch("https://fakestoreapi.com/products?limit=3")
//   .then(res => res.json())
//   .then(data => {
//     displayProducts(data);
//   });

// function displayProducts(products) {
//   trendingContainer.innerHTML = "";

//   products.forEach(product => {
//     const card = document.createElement("div");
//     card.classList.add("product-card");

//     card.innerHTML = `
//       <div class="product-img-box">
//         <img src="${product.image}">
//       </div>
//       <div class="product-info">
//         <div class="category-rating">
//           <span>${product.category}</span>
//           <span><span>★</span> ${product.rating.rate} (${product.rating.count})</span>
//         </div>
//         <h3>${product.title}</h3>
//         <p class="price">$${product.price}</p>
//         <div class="button-group">
//           <button class="details-btn">Details</button>
//           <button class="add-btn">Add</button>
//         </div>
//       </div>
//     `;

//     // ✅ CORRECT: Add event listener BEFORE appending
//     const addBtn = card.querySelector(".add-btn");
//     addBtn.addEventListener("click", () => addToCart(product));

//     trendingContainer.appendChild(card);
//   });
// }

