document.addEventListener("DOMContentLoaded", () => {
    benutzerListeAnzeigen();
    
    // Event Listener für den Button, um sicherzustellen, dass alles geladen ist
    const hinzufuegenButton = document.querySelector('button');
    hinzufuegenButton.addEventListener('click', benutzerHinzufügen);
});

// Anzeige der Benutzerliste
function benutzerListeAnzeigen() {
    const liste = document.getElementById("benutzerListe");
    liste.innerHTML = "";

    // Benutzerdaten aus localStorage abrufen
    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];

    // Alle Benutzer in der Liste anzeigen
    benutzer.forEach((b, index) => {
        const li = document.createElement("li");
        li.textContent = `${b.name} - ${b.isAdmin ? "Admin" : "Benutzer"}`;

        // Button zum Löschen des Benutzers
        const löschenButton = document.createElement("button");
        löschenButton.textContent = "Löschen";
        löschenButton.onclick = () => benutzerLöschen(index);

        li.appendChild(löschenButton);
        liste.appendChild(li);
    });
}

// Benutzer hinzufügen
function benutzerHinzufügen() {
    // Benutzernamen und Passwort aus den Eingabefeldern holen
    const name = document.getElementById("neuerBenutzername");
    const passwort = document.getElementById("neuesPasswort");

    // Überprüfen, ob Name und Passwort ausgefüllt sind
    if (!name || !passwort || !name.value || !passwort.value) {
        alert("Benutzername und Passwort dürfen nicht leer sein.");
        return;
    }

    // Ist der Benutzer ein Admin?
    const istAdmin = document.getElementById("istAdmin").checked;

    // Benutzerdaten aus localStorage abrufen
    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];

    // Neuer Benutzer hinzufügen
    benutzer.push({ name: name.value, passwort: passwort.value, isAdmin: istAdmin });

    // Benutzerdaten in localStorage speichern
    localStorage.setItem("benutzer", JSON.stringify(benutzer));

    // Eingabefelder zurücksetzen
    name.value = "";
    passwort.value = "";
    document.getElementById("istAdmin").checked = false;

    // Benutzerliste aktualisieren
    benutzerListeAnzeigen();
}

// Benutzer löschen
function benutzerLöschen(index) {
    // Benutzerdaten aus localStorage abrufen
    const benutzer = JSON.parse(localStorage.getItem("benutzer")) || [];

    // Benutzer löschen
    benutzer.splice(index, 1);

    // Geänderte Benutzerdaten in localStorage speichern
    localStorage.setItem("benutzer", JSON.stringify(benutzer));

    // Benutzerliste aktualisieren
    benutzerListeAnzeigen();
}

// Logout-Funktion
function logout() {
    localStorage.clear(); // Alle Daten im localStorage löschen
    window.location.href = "login.html"; // Zur Login-Seite weiterleiten
}
