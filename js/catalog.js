console.log("✅ catalog.js loaded");

const productList = document.getElementById("product-list");

function loadMotors() {
  fetch(`${API_BASE}/api/products`) // Your hosted backend API
    .then(response => response.json())
    .then(motors => {
      productList.innerHTML = "";

      if (motors.length === 0) {
        productList.innerHTML = "<p>No products found.</p>";
        return;
      }

      motors.forEach((motor) => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
          <div style="cursor: pointer;">
            <img src="${motor.imageUrl}" alt="${motor.name}">
            <h3>${motor.name}</h3>
          </div>
          <p>Price: ₹${motor.price}</p>
          <button onclick='addToCart(${JSON.stringify(motor)})'>Add to Cart</button>
          <button onclick='viewBySubcategory("${motor.subcategory}")'>View More in This Subcategory</button>
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

function viewBySubcategory(subcategory) {
  // Map subcategories to their folder paths
  const categoryFolders = {
    "Carbon Bearing": "thrust-bearing",
    "Fiber Bearing": "thrust-bearing",
    "Carbide": "thrust-bearing",
    "Super Teflon": "thrust-bearing",
    "Carbon Bush": "bush",
    "Metal Bush": "bush",
    "Oil Seal": "rubber-products",
    "Neckring": "rubber-products",
    "Grommet": "rubber-products",
    "V4": "impeller",
    "V6": "impeller",
    "Old": "impeller",
    "V4 Wooden": "wooden-stick",
    "V6 Wooden": "wooden-stick",
    "V8": "wooden-stick",
    "V9": "wooden-stick",
    "SS Stud & Nuts": "hardware",
    "M S Stud & Nuts": "hardware",
    "Bolt": "hardware",
    "Washer": "hardware",
    "Lock": "hardware",
    "Key": "hardware"
  };

  const folder = categoryFolders[subcategory] || null;

  if (!folder) {
    alert(`No folder mapping found for subcategory: ${subcategory}`);
    return;
  }

  const fileName = subcategory
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "-") + ".html";

  window.location.href = `category/${folder}/${fileName}`;
}

window.onload = loadMotors;
