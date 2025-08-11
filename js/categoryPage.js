document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "<p>Loading products...</p>";

  // Try getting SUBCATEGORY global var OR from URL query string "subcategory"
  let subcategoryName = typeof SUBCATEGORY !== "undefined" ? SUBCATEGORY : null;

  if (!subcategoryName) {
    const params = new URLSearchParams(window.location.search);
    subcategoryName = params.get("subcategory");
  }

  if (!subcategoryName) {
    productList.innerHTML = `<p>No subcategory specified.</p>`;
    return;
  }

  // Normalize subcategory name to lowercase and trim
  const normalizedSubcategory = subcategoryName.trim().toLowerCase();

  fetch(`${API_BASE}/api/products`)
    .then(res => res.json())
    .then(products => {
      // Filter products matching subcategory ignoring case and spaces
      const filtered = products.filter(p =>
        p.subcategory &&
        p.subcategory.trim().toLowerCase() === normalizedSubcategory
      );

      if (filtered.length === 0) {
        productList.innerHTML = `<p>No products found in this subcategory.</p>`;
        return;
      }

      productList.innerHTML = "";

      filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";

        div.innerHTML = `
          <img src="${p.imageUrl || '../../images/default-product.png'}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p><strong>Brand:</strong> ${p.brand || 'N/A'}</p>
          <p><strong>Price:</strong> ₹${p.price.toFixed(2)}</p>
          <p>${p.description || ''}</p>
          <button class="add-to-cart-btn" data-id="${p.id}">Add to Cart</button>
        `;

        productList.appendChild(div);
      });

      // Add event listener to handle Add to Cart buttons (event delegation)
      productList.addEventListener("click", event => {
        if (event.target.classList.contains("add-to-cart-btn")) {
          const productId = event.target.getAttribute("data-id");
          addToCart(productId);
        }
      });
    })
    .catch(err => {
      console.error("❌ Error loading products:", err);
      productList.innerHTML = `<p style="color: red;">Error loading products.</p>`;
    });
});

// Add to Cart function (make sure you also have this function accessible in your scope)
function addToCart(productId) {
  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  const existingItem = cart.find(item => item.id === productId);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ id: productId, quantity: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Product added to cart!");
}
