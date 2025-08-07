console.log("✅ catalog.js loaded");

const productList = document.getElementById("product-list");

function loadMotors() {
  fetch("http://localhost:5000/api/products") // or your hosted backend API
    .then(response => response.json())
    .then(motors => {
      productList.innerHTML = "";

      if (motors.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
      }

      motors.forEach((motor, index) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <div onclick='viewProduct(${JSON.stringify(motor)})' style="cursor: pointer;">
            <img src="${motor.image}" alt="${motor.name}">
            <h3>${motor.name}</h3>
          </div>
          <p>Price: ₹${motor.price}</p>
          <button onclick='addToCart(${JSON.stringify(motor)})'>Add to Cart</button>
        `;

        productList.appendChild(productCard);
      });
    })
    .catch(error => {
      console.error("Error loading products:", error);
      productList.innerHTML = "<p>Error loading products.</p>";
    });
}

function addToCart(product) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.name === product.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += 1;
  } else {
    product.quantity = 1;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("✅ Added to cart!");
}

window.onload = loadMotors;

function viewProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}
