document.addEventListener("DOMContentLoaded", () => {
    benutzerListeAnzeigen();
});

function benutzerListeAnzeigen() {
    const liste = document.getElementById("benutzerListe");
    liste.innerHTML = "";

    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];

    benutzer.forEach((b, index) => {
        const li = document.createElement("li");
        li.textContent = `${b.name} - ${b.isAdmin ? "Admin" : "Benutzer"}`;

        const löschenButton = document.createElement("button");
        löschenButton.textContent = "Löschen";
        löschenButton.onclick = () => benutzerLöschen(index);

        li.appendChild(löschenButton);
        liste.appendChild(li);
    });
}

function benutzerHinzufügen() {
    const name = document.getElementById("neuerBenutzername").value;
    const passwort = document.getElementById("neuesPasswort").value;
    const istAdmin = document.getElementById("istAdmin").checked;

    if (!name || !passwort) {
        alert("Benutzername und Passwort dürfen nicht leer sein.");
        return;
    }

    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];
    benutzer.push({ name, passwort, isAdmin: istAdmin });
    localStorage.setItem("benutzer", JSON.stringify(benutzer));

    document.getElementById("neuerBenutzername").value = "";
    document.getElementById("neuesPasswort").value = "";
    document.getElementById("istAdmin").checked = false;

    benutzerListeAnzeigen();
}

function benutzerLöschen(index) {
    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];
    benutzer.splice(index, 1);
    localStorage.setItem("benutzer", JSON.stringify(benutzer));
    benutzerListeAnzeigen();
}

function logout() {
    localStorage.clear();
    window.location.href = "login.html";
}
