// login.js

document.getElementById('loginForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Einfache Benutzername- und Passwortüberprüfung
    // Das sollte durch eine sichere Datenbankanbindung ersetzt werden!
    if (username === 'Jolicraft' && password === '#Fi5ccwg') {
        // Erfolgreiches Login -> Weiterleitung zum Dashboard und Admin-Status setzen
        localStorage.setItem('isAdmin', 'true');
        window.location.href = 'dashboard.html';
    } else if (username === 'Marcel' && password === 'Marcel1234') {
        // Erfolgreiches Login für normale Benutzer -> Weiterleitung zum Dashboard
        localStorage.setItem('isAdmin', 'false');
        window.location.href = 'dashboard.html';
    } else {
        // Fehlerhafte Anmeldung -> Fehlermeldung anzeigen
        document.getElementById('loginMessage').innerText = 'Falscher Benutzername oder Passwort!';
    }
});
