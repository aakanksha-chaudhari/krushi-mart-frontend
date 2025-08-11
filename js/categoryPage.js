document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const SUBCATEGORY = params.get("subcategory");

  const productList = document.getElementById("productList");
  productList.innerHTML = "<p>Loading products...</p>";

  if (!SUBCATEGORY) {
    productList.innerHTML = `<p style="color:red;">No subcategory specified in the URL.</p>`;
    return;
  }

  fetch(`${API_BASE}/api/products`)
    .then(res => res.json())
    .then(products => {
      const filtered = products.filter(product =>
        product.subcategory &&
        product.subcategory.trim().toLowerCase() === SUBCATEGORY.trim().toLowerCase()
      );

      if (filtered.length === 0) {
        productList.innerHTML = `<p>No products found in "${SUBCATEGORY}".</p>`;
        return;
      }

      productList.innerHTML = "";
      filtered.forEach(p => {
        const div = document.createElement("div");
        div.className = "product-card";
        div.innerHTML = `
          <img src="${p.imageUrl}" alt="${p.name}" />
          <h3>${p.name}</h3>
          <p><strong>Brand:</strong> ${p.brand}</p>
          <p><strong>Price:</strong> ₹${p.price}</p>
          <p>${p.description}</p>
        `;
        productList.appendChild(div);
      });
    })
    .catch(err => {
      console.error("❌ Error loading products:", err);
      productList.innerHTML = `<p style="color: red;">Error loading products.</p>`;
    });
});
