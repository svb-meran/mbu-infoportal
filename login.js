const benutzerListe = [
    { name: "admin", passwort: "admin123", rolle: "admin" },
    { name: "fahrer1", passwort: "bus123", rolle: "fahrer" },
    { name: "fahrer2", passwort: "linie210", rolle: "fahrer" }
];

function einloggen() {
    const benutzername = document.getElementById("benutzername").value;
    const passwort = document.getElementById("passwort").value;

    const user = benutzerListe.find(b => b.name === benutzername && b.passwort === passwort);

    if (user) {
    localStorage.setItem("eingeloggt", "true");
    localStorage.setItem("aktuellerBenutzer", JSON.stringify(user));
    setTimeout(() => {
        window.location.href = "übersicht.html";
    }, 200); // kurzer Delay, damit localStorage sicher gespeichert ist

    } else {
        alert("Falsche Login-Daten!");
    }
}
