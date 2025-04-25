// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Einfache Benutzername- und Passwortüberprüfung
    // Das sollte durch eine sichere Datenbankanbindung ersetzt werden!
    if (username === 'admin' && password === 'adminpass') {
        // Erfolgreiches Login -> Weiterleitung zum Dashboard und Admin-Status setzen
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'dashboard.html';
    } else if (username === 'fahrer' && password === 'fahrerpass') {
        // Erfolgreiches Login für normale Benutzer -> Weiterleitung zum Dashboard
        localStorage.setItem('isAdmin', 'false');
        window.location.href = 'dashboard.html';
    } else {
        // Fehlerhafte Anmeldung -> Fehlermeldung anzeigen
        document.getElementById('loginMessage').innerText = 'Falscher Benutzername oder Passwort!';
    }
});
