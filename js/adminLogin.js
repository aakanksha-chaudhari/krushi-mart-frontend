// adminLogin.js ✅
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch("http://localhost:5000/api/admin/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.success) {
        alert("✅ Login successful!");
        window.location.href = "frontend\admin.html"; // your dashboard page
      } else {
        alert("❌ Invalid credentials");
      }
    })
    .catch((err) => {
      console.error("Error:", err);
      alert("Server error!");
    });
}
