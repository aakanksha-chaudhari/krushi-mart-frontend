console.log(" auth.js loaded");

const loginForm = document.getElementById("loginForm");
const registerForm = document.getElementById("registerForm");
const authMessage = document.getElementById("authMessage");

loginForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  fetch("http://127.0.0.1:5000/api/admin/login", {

    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert(" Login successful!");
      window.location.href = "admin.html"; 

      } else {
        authMessage.textContent = "❌ Invalid credentials";
      }
    })
    .catch((err) => {
      console.error(err);
      authMessage.textContent = "❌ Server error!";
    });
});

function showLogin() {
  loginForm.style.display = "block";
  registerForm.style.display = "none";
}

function showRegister() {
  loginForm.style.display = "none";
  registerForm.style.display = "block";
}
