console.log("✅ cart.js is running");

// ✅ STEP 2: Wait for full DOM to load
window.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM fully loaded, now loading cart...");
  loadCart();
});

// ✅ STEP 3: Confirm DOM and show cart items
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const cartContainer = document.getElementById("cart-items");
  const totalEl = document.getElementById("cart-total");

  if (!cartContainer || !totalEl) {
    console.error("❌ Cart DOM elements not found");
    return;
  }

  console.log("🛒 Cart loaded:", cart);

  cartContainer.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalEl.textContent = "Total: ₹0";
    return;
  }

  cart.forEach((item, index) => {
    const quantity = item.quantity || 1;
    const subtotal = item.price * quantity;

    const div = document.createElement("div");
    div.classList.add("product-card");

    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}" />
      <h4>${item.name}</h4>
      <p>Price: ₹${item.price}</p>
      <p>Quantity: ${quantity}</p>
      <p>Subtotal: ₹${subtotal}</p>
      <button onclick="removeFromCart(${index})">❌ Remove</button>
    `;

    total += subtotal;
    cartContainer.appendChild(div);
  });

  totalEl.textContent = `Total: ₹${total}`;
}

function removeFromCart(index) {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  loadCart();
}

function placeOrder() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  const user = localStorage.getItem("loggedInUser");

  if (!user) {
    alert("Please login to place an order.");
    window.location.href = "auth.html";
    return;
  }

  if (cart.length === 0) {
    alert("Your cart is empty.");
    return;
  }

  const order = {
    id: Date.now(),
    user: user,
    items: cart,
    total: cart.reduce((sum, item) => sum + item.price * (item.quantity || 1), 0),
    date: new Date().toLocaleString()
  };

  const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
  allOrders.push(order);

  localStorage.setItem("orders", JSON.stringify(allOrders));
  localStorage.removeItem("cart");

  alert("✅ Order placed successfully!");
  window.location.href = "orders.html";
}
