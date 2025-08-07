// js/product.js
console.log("📦 product.js is running");

window.onload = function () {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));

  if (!product) {
    document.body.innerHTML = "<p style='text-align:center;'>❌ Product not found.</p>";
    return;
  }

  // Populate product details in HTML
  document.getElementById("product-image").src = product.image;
  document.getElementById("product-name").textContent = product.name;
  document.getElementById("product-price").textContent = `₹ ${product.price}`;
  document.getElementById("product-description").textContent = "A powerful and efficient motor for your water needs.";
};

// 🛒 Add to Cart with Quantity
function addToCart() {
  const product = JSON.parse(localStorage.getItem("selectedProduct"));
  const quantity = parseInt(document.getElementById("quantity").value) || 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.name === product.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    product.quantity = quantity;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Product added to cart!");
}
