document.getElementById("loginForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const benutzername = document.getElementById("username").value;
    const passwort = document.getElementById("password").value;

    // Beispielnutzer – hier könntest du später echte Nutzer aus JSON laden
    const benutzer = {
        "Jolicraft": { passwort: "#Fi5ccwg", isAdmin: true },
        "100nofunn100": { passwort: "112110", isAdmin: false }
    };

    if (benutzer[benutzername] && benutzer[benutzername].passwort === passwort) {
        localStorage.setItem("eingeloggt", "true");
        localStorage.setItem("aktuellerBenutzer", benutzername);
        localStorage.setItem("isAdmin", benutzer[benutzername].isAdmin);

        window.location.href = "übersicht.html";
    } else {
        alert("Falscher Benutzername oder Passwort!");
    }
});
