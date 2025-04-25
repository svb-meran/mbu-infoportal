// Dummy-Benutzer nur beim ersten Laden einfügen:
if (!localStorage.getItem("users")) {
  const defaultUsers = [
    { username: "admin", password: "1234", role: "admin" },
    { username: "fahrer1", password: "abcd", role: "fahrer" }
  ];
  localStorage.setItem("users", JSON.stringify(defaultUsers));
}

// Login prüfen
document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;
  const users = JSON.parse(localStorage.getItem("users")) || [];

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    window.location.href = "dashboard.html"; // Weiterleitung zur Übersicht
  } else {
    document.getElementById("loginMessage").textContent = "❌ Falsche Zugangsdaten!";
  }
});
