// js/checkout.js

// Load cart total from localStorage and show in total area
function loadTotal() {
  const cart = JSON.parse(localStorage.getItem("cart")) || [];
  let total = 0;

  cart.forEach(item => {
    total += item.price * item.quantity;
  });

  document.getElementById("checkout-total").textContent = `Total: ₹${total}`;
}

// Handle form submit
document.getElementById("checkoutForm").addEventListener("submit", function(e) {
  e.preventDefault(); // Prevent form reload

  // Get form data
  const name = document.getElementById("name").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const address = document.getElementById("address").value.trim();

  // Simple validation
  if (!name || !phone || !address) {
    alert("Please fill all fields.");
    return;
  }

  // Simulate order success
  document.getElementById("confirmation").style.display = "block";

  // Clear the cart
  localStorage.removeItem("cart");

  // Optionally clear the form
  document.getElementById("checkoutForm").reset();
  document.getElementById("checkout-total").textContent = "Total: ₹0";
});

// Run on load
window.onload = loadTotal;
