

const BASE_URL = "https://fakestoreapi.com/products";

export async function getAllProducts() {
  const res = await fetch(BASE_URL);
  return res.json();
}

export async function getCategories() {
  const res = await fetch(`${BASE_URL}/categories`);
  return res.json();
}

export async function getProductsByCategory(category) {
  const res = await fetch(`${BASE_URL}/category/${category}`);
  return res.json();
}

export async function getSingleProduct(id) {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
}
