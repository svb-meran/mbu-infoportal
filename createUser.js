// Funktion zum Erstellen eines neuen Benutzers
document.getElementById('createUserForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Verhindert das Standardformularverhalten

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Passwort verschlüsseln (hier wird base64 verwendet, in echten Szenarien sollte bcrypt verwendet werden)
    const hashedPassword = btoa(password); // Einfaches Beispiel, für echte Anwendungen bitte besser absichern!

    // Benutzerobjekt erstellen
    const user = {
        username: username,
        password: hashedPassword,
        locked: false // Benutzer ist anfangs nicht gesperrt
    };

    // Benutzerdaten aus dem localStorage holen
    let users = JSON.parse(localStorage.getItem('users')) || [];

    // Benutzer zur Liste hinzufügen
    users.push(user);

    // Die Liste der Benutzer im localStorage speichern
    localStorage.setItem('users', JSON.stringify(users));

    alert('Benutzer wurde erfolgreich erstellt!');
    document.getElementById('createUserForm').reset(); // Formular zurücksetzen
});
