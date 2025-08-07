// js/orders.js

const orderList = document.getElementById("orderList");
const user = localStorage.getItem("loggedInUser");
const orders = JSON.parse(localStorage.getItem("orders")) || [];

// Filter only current user's orders
const userOrders = orders.filter(order => order.user === user);

if (userOrders.length === 0) {
  orderList.innerHTML = "<p>No orders placed yet.</p>";
} else {
  userOrders.reverse().forEach(order => {
    const orderBox = document.createElement("div");
    orderBox.className = "order-box";

    let itemsHTML = order.items.map(item => `
      <li>${item.name} - ₹${item.price} × ${item.quantity}</li>
    `).join("");

    orderBox.innerHTML = `
      <h3>🧾 Order ID: ${order.id}</h3>
      <p><strong>Date:</strong> ${order.date}</p>
      <p><strong>Total:</strong> ₹${order.total}</p>
      <ul>${itemsHTML}</ul>
      <hr/>
    `;

    orderList.appendChild(orderBox);
  });
}
