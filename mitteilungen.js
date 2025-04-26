let mitteilungen = JSON.parse(localStorage.getItem('mitteilungen')) || [];

function isAdmin() {
    const user = JSON.parse(localStorage.getItem('aktuellerBenutzer'));
    return user && user.isAdmin;
}

function ladeMitteilungen() {
    const liste = document.getElementById('mitteilungenListe');
    liste.innerHTML = '';

    mitteilungen.slice().reverse().forEach((mitteilung, index) => {
        const div = document.createElement('div');
        div.className = 'mitteilung';
        div.innerHTML = `
            <h3>${mitteilung.titel}</h3>
            <small>Von: ${mitteilung.absender} | Datum: ${mitteilung.datum}</small>
            <p>${mitteilung.inhalt}</p>
            ${isAdmin() ? `<button onclick="löscheMitteilung(${mitteilungen.length - 1 - index})">Löschen</button>` : ''}
        `;
        liste.appendChild(div);
    });

    // Nur Admins sehen das Erstellen-Formular
    if (isAdmin()) {
        document.getElementById('mitteilungFormular').style.display = 'block';
    } else {
        document.getElementById('mitteilungFormular').style.display = 'none';
    }
}

function erstelleMitteilung() {
    if (!isAdmin()) {
        alert("Du darfst keine Mitteilungen erstellen!");
        return;
    }

    const titel = document.getElementById('titel').value.trim();
    const inhalt = document.getElementById('inhalt').value.trim();
    const user = JSON.parse(localStorage.getItem('aktuellerBenutzer'));

    if (!titel || !inhalt) {
        alert("Bitte Titel und Inhalt ausfüllen.");
        return;
    }

    mitteilungen.push({
        titel: titel,
        inhalt: inhalt,
        absender: user.username,
        datum: new Date().toLocaleString()
    });

    localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
    ladeMitteilungen();

    document.getElementById('titel').value = '';
    document.getElementById('inhalt').value = '';
}

function löscheMitteilung(index) {
    if (!isAdmin()) {
        alert("Du darfst keine Mitteilungen löschen!");
        return;
    }
    if (!confirm("Willst du diese Mitteilung wirklich löschen?")) return;
    mitteilungen.splice(index, 1);
    localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
    ladeMitteilungen();
}

// Seite starten
ladeMitteilungen();
