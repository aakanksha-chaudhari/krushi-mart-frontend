// js/authGuard.js

// This function runs on page load
function requireLogin() {
  const loggedInUser = localStorage.getItem("loggedInUser");

  if (!loggedInUser) {
    alert("⚠️ Please login to access this page.");
    window.location.href = "auth.html";
  }
}

// Run automatically when script loads
window.onload = function () {
  if (typeof requireLogin === "function") {
    requireLogin();
  }
};
