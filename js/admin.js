console.log("admin.js loaded");

// ✅ Define API base URL (change when deployed)
const API_BASE = window.API_BASE || "http://localhost:5000";

// DOM Elements
const nameInput = document.getElementById("name");
const brandInput = document.getElementById("brand");
const priceInput = document.getElementById("price");
const descriptionInput = document.getElementById("description");
const imageInput = document.getElementById("imageUrl");
const categorySelect = document.getElementById("category");
const subcategorySelect = document.getElementById("subcategory");
const productContainer = document.getElementById("productContainer");

// Category → Subcategory Mapping
const subcategoryMap = {
  "Thrust Bearing": ["Carbon Bearing", "Fiber Bearing", "Super Teflon", "Carbide"],
  "Bush": ["Carbon Bush", "Metal Bush"],
  "Rubber Products": ["Oil Seal", "Neckring", "Grommet"],
  "Impeller": ["V4", "V6", "Old"],
  "Wooden Stick": ["V4", "V6", "V8", "V9"],
  "Hardware": ["SS Stud & Nuts", "MS Stud & Nuts", "Bolt", "Washer", "Lock", "Key"]
};

document.addEventListener("DOMContentLoaded", () => {
  // Populate subcategories when category changes
  if (categorySelect) {
    categorySelect.addEventListener("change", () => {
      const selectedCategory = categorySelect.value;
      const options = subcategoryMap[selectedCategory] || [];

      subcategorySelect.innerHTML = "<option value=''>-- Select Subcategory --</option>";
      options.forEach(sub => {
        const option = document.createElement("option");
        option.value = sub;
        option.textContent = sub;
        subcategorySelect.appendChild(option);
      });

      console.log("📦 Subcategories loaded:", options);
    });
  }

  // Fetch products
  function fetchProducts() {
    fetch(`${API_BASE}/api/products`)
      .then(res => res.json())
      .then(products => {
        productContainer.innerHTML = "";
        products.forEach(product => {
          const card = document.createElement("div");
          card.className = "product-card";
          card.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}" />
            <h3>${product.name}</h3>
            <p>${product.brand}</p>
            <p class="price">₹${product.price}</p>
            <p>${product.description}</p>
            <p class="category">${product.category} → ${product.subcategory || "❌ No Subcategory"}</p>
            <button onclick="deleteProduct('${product._id}')">❌ Remove</button>
          `;
          productContainer.appendChild(card);
        });
      })
      .catch(err => {
        console.error("❌ Error fetching products:", err);
      });
  }

  // Add product
  function addProduct(event) {
    event.preventDefault();

    const product = {
      name: nameInput.value.trim(),
      brand: brandInput.value.trim(),
      price: priceInput.value.trim(),
      description: descriptionInput.value.trim(),
      imageUrl: imageInput.value.trim(),
      category: categorySelect.value,
      subcategory: subcategorySelect.value
    };

    if (!product.name || !product.brand || !product.category || !product.subcategory) {
      alert("⚠️ Please fill all required fields.");
      return;
    }

    fetch(`${API_BASE}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product)
    })
      .then(res => res.json())
      .then(() => {
        alert("✅ Product added successfully!");
        document.getElementById("productForm").reset();
        fetchProducts();
      })
      .catch(err => {
        console.error("❌ Error adding product:", err);
        alert("❌ Failed to add product.");
      });
  }

  // Delete product
  window.deleteProduct = function(id) {
    fetch(`${API_BASE}/api/products/${id}`, {
      method: "DELETE"
    })
      .then(res => res.json())
      .then(() => {
        fetchProducts();
      });
  };

  // Attach form submit event only if form exists
  const form = document.getElementById("productForm");
  if (form) {
    form.addEventListener("submit", addProduct);
  }

  // Load initial products
  fetchProducts();
});
