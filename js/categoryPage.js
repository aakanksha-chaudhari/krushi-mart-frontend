//  categoryPage.js

document.addEventListener("DOMContentLoaded", () => {
  const productList = document.getElementById("productList");
  productList.innerHTML = "<p>Loading products...</p>";

  fetch("http://localhost:5000/api/products")
    .then((res) => res.json())
    .then((products) => {
      const filtered = products.filter(
        (product) =>
          product.subcategory &&
          product.subcategory.trim().toLowerCase() === SUBCATEGORY.toLowerCase()
      );

      if (filtered.length === 0) {
        productList.innerHTML = `<p>No products found in this subcategory.</p>`;
        return;
      }

      productList.innerHTML = "";
      filtered.forEach((p) => {
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
    .catch((err) => {
      console.error("❌ Error loading products:", err);
      productList.innerHTML = `<p style="color: red;">Error loading products.</p>`;
    });
});
