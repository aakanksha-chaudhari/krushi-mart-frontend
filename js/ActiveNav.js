
  // Get current page (like 'cart.html')
  const currentPage = window.location.pathname.split("/").pop();

  // Select all nav links and check which one matches the page
  document.querySelectorAll(".nav-link").forEach(link => {
    const linkPage = link.getAttribute("href");

    if (linkPage === currentPage || (linkPage === "index.html" && currentPage === "")) {
      link.classList.add("active");
    }
  });

