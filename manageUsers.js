// Benutzer aus dem localStorage laden oder leeres Array
let benutzerListe = JSON.parse(localStorage.getItem("benutzerListe")) || [];

// Anzeige aktualisieren
function benutzerAnzeigen() {
  const ul = document.getElementById("benutzerListe");
  ul.innerHTML = ""; // Erstmal leeren

  benutzerListe.forEach((benutzer, index) => {
    const li = document.createElement("li");
    li.textContent = `${benutzer.name} (${benutzer.isAdmin ? "Admin" : "Benutzer"})`;

    const löschenButton = document.createElement("button");
    löschenButton.textContent = "Löschen";
    löschenButton.onclick = () => {
      benutzerListe.splice(index, 1);
      speichernUndAktualisieren();
    };

    li.appendChild(löschenButton);
    ul.appendChild(li);
  });
}

// Neuen Benutzer hinzufügen
function benutzerHinzufügen() {
  const name = document.getElementById("benutzername").value;
  const passwort = document.getElementById("passwort").value;
  const isAdmin = document.getElementById("adminCheckbox").checked;

  if (!name || !passwort) {
    alert("Bitte Benutzername und Passwort eingeben!");
    return;
  }

  benutzerListe.push({ name, passwort, isAdmin });
  speichernUndAktualisieren();

  // Eingabefelder leeren
  document.getElementById("benutzername").value = "";
  document.getElementById("passwort").value = "";
  document.getElementById("adminCheckbox").checked = false;
}

// Speichern und neu anzeigen
function speichernUndAktualisieren() {
  localStorage.setItem("benutzerListe", JSON.stringify(benutzerListe));
  benutzerAnzeigen();
}

// Beim Laden der Seite direkt anzeigen
window.onload = benutzerAnzeigen;
