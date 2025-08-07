// js/navbar.js

// Show login/logout and greeting
function updateNavbarAuthLink() {
  const loggedInUser = localStorage.getItem("loggedInUser");
  const authLink = document.getElementById("authLink");
  const userGreeting = document.getElementById("userGreeting");

  if (loggedInUser) {
    // Change link to Logout
    authLink.textContent = "Logout";
    authLink.href = "#";
    authLink.onclick = function () {
      localStorage.removeItem("loggedInUser");
      alert("Logged out successfully!");
      location.reload();
    };

    // Show greeting: Hi, email
    if (userGreeting) {
      userGreeting.textContent = `Hi, ${loggedInUser}`;
    }

  } else {
    // Show Login link
    authLink.textContent = "Login";
    authLink.href = "auth.html";

    // Hide greeting
    if (userGreeting) {
      userGreeting.textContent = "";
    }
  }
}

// Run on page load
window.onload = function () {
  if (typeof updateNavbarAuthLink === "function") {
    updateNavbarAuthLink();
  }
};
