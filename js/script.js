// js/script.js
console.log("✅ script.js is running");

const products = [
  {
    name: "Crompton Water Pump 1HP",
    price: 4500,
    image: "images/motor1.jpg"
  },
  {
    name: "V-Guard Marineseries 0.75HP",
    price: 5200,
    image: "images/motor2.jpg"
  },
  {
    name: "Kirloskar Submersible Pump 1.5 HP",
    price: 5800,
    image: "images/motor3.jpg"
  },
  {
    name: "Texmo Aqua King Water Pump 1HP",
    price: 4800,
    image: "images/motor4.jpg"
  }
];

function loadFeaturedProducts() {
  const container = document.getElementById("featured-products");

  if (!container) {
    console.warn("⚠️ 'featured-products' container not found!");
    return;
  }

  products.forEach((product) => {
    const card = document.createElement("div");
    card.classList.add("product-card");

    card.innerHTML = `
      <div onclick='viewProduct(${JSON.stringify(product)})' style="cursor: pointer;">
        <img src="${product.image}" alt="${product.name}" />
        <h4>${product.name}</h4>
      </div>
      <p>₹${product.price}</p>
      <div style="margin: 0.5rem 0;">
        Quantity: 
        <input type="number" min="1" value="1" id="qty-${product.name}" style="width: 60px;" />
      </div>
      <button onclick='addToCartWithQty(${JSON.stringify(product)})'>Add to Cart</button>
    `;

    container.appendChild(card);
  });
}

window.onload = loadFeaturedProducts;

function addToCartWithQty(product) {
  const qtyInput = document.getElementById(`qty-${product.name}`);
  const quantity = parseInt(qtyInput.value) || 1;

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingIndex = cart.findIndex(item => item.name === product.name);

  if (existingIndex !== -1) {
    cart[existingIndex].quantity += quantity;
  } else {
    product.quantity = quantity;
    cart.push(product);
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert(`${quantity} item(s) added to cart!`);
}

function viewProduct(product) {
  localStorage.setItem("selectedProduct", JSON.stringify(product));
  window.location.href = "product.html";
}


// contact info
function handleContact(event) {
  event.preventDefault();
  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (name && email && message) {
    document.getElementById("contact-success").textContent =
      "Thank you for contacting us, " + name + "! We'll get back to you shortly.";
    document.querySelector(".contact-form").reset();
  } else {
    alert("Please fill all fields!");
  }
}
function handleContact(event) {
  event.preventDefault();

  const name = document.getElementById("contact-name").value.trim();
  const email = document.getElementById("contact-email").value.trim();
  const message = document.getElementById("contact-message").value.trim();

  if (name && email && message) {
    const contact = {
      name,
      email,
      message,
      date: new Date().toLocaleString()
    };

    const messages = JSON.parse(localStorage.getItem("contactMessages")) || [];
    messages.push(contact);
    localStorage.setItem("contactMessages", JSON.stringify(messages));

    document.getElementById("contact-success").textContent =
      `Thank you for contacting us, ${name}! We'll get back to you shortly.`;

    document.querySelector(".contact-form").reset();
    console.log("📩 Contact saved:", contact);
  } else {
    alert("Please fill all fields!");
  }
}

// / Highlight current page in navbar
 
const currentPath = window.location.pathname.split("/").pop().split("?")[0];

document.querySelectorAll(".nav-link").forEach(link => {
  const href = link.getAttribute("href");
  if (href === currentPath) {
    link.classList.add("active");
  }
});


