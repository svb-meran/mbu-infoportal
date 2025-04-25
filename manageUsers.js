// Funktion, um die Benutzer aus localStorage zu laden und anzuzeigen
function loadUsers() {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // Benutzer anzeigen
    const userList = document.getElementById('userList');
    userList.innerHTML = ''; // Liste zurücksetzen

    users.forEach((user, index) => {
        const userItem = document.createElement('li');
        userItem.textContent = user.username; // Benutzername anzeigen

        // Sperren oder Entsperren Button hinzufügen
        const lockButton = document.createElement('button');
        lockButton.textContent = user.locked ? 'Entsperren' : 'Sperren';
        lockButton.addEventListener('click', () => toggleLockUser(index));

        // Löschen Button hinzufügen
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Löschen';
        deleteButton.addEventListener('click', () => deleteUser(index));

        // Buttons zu Listenelement hinzufügen
        userItem.appendChild(lockButton);
        userItem.appendChild(deleteButton);
        userList.appendChild(userItem);
    });
}

// Funktion, um einen Benutzer zu löschen
function deleteUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    users.splice(index, 1); // Benutzer aus der Liste entfernen
    localStorage.setItem('users', JSON.stringify(users)); // Die Liste im localStorage speichern
    loadUsers(); // Liste neu laden
}

// Funktion, um einen Benutzer zu sperren oder zu entsperren
function toggleLockUser(index) {
    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users[index];

    // Wenn der Benutzer nicht gesperrt ist, sperre ihn, ansonsten entsperre ihn
    user.locked = !user.locked;

    users[index] = user; // Benutzer zurück in die Liste setzen
    localStorage.setItem('users', JSON.stringify(users)); // Die Liste speichern
    loadUsers(); // Liste neu laden
}

// Benutzerliste beim Laden der Seite anzeigen
window.onload = loadUsers;
