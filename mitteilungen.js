// Mitteilungen laden oder leeren, falls nichts da ist
let mitteilungen = JSON.parse(localStorage.getItem('mitteilungen')) || [];

const aktuellerBenutzer = localStorage.getItem('aktuellerBenutzer') || '';
const isAdmin = JSON.parse(localStorage.getItem('isAdmin')) || false;

// Überprüft ob der aktuelle Benutzer Admin ist
function istAdminBenutzer() {
    return isAdmin === true;
}

// Bereich für Mitteilungserstellung nur Admins zeigen
function anzeigenErstellungsbereich() {
    if (istAdminBenutzer()) {
        document.getElementById('erstellungsbereich').style.display = 'block';
    } else {
        document.getElementById('erstellungsbereich').style.display = 'none';
    }
}

// Neue Mitteilung erstellen
function erstelleMitteilung() {
    const titelInput = document.getElementById('titel');
    const inhaltInput = document.getElementById('inhalt');
    const titel = titelInput.value.trim();
    const inhalt = inhaltInput.value.trim();
    const absender = aktuellerBenutzer || 'Unbekannt';
    const datum = new Date().toLocaleString();

    if (titel && inhalt) {
        const neueMitteilung = { titel, inhalt, absender, datum };
        mitteilungen.push(neueMitteilung);

        // Speichern
        localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));

        // Neu laden
        ladeMitteilungen();

        // Felder leeren
        titelInput.value = '';
        inhaltInput.value = '';
    } else {
        alert('Bitte Titel und Inhalt eingeben!');
    }
}

// Mitteilungen anzeigen
function ladeMitteilungen() {
    const liste = document.getElementById('mitteilungenListe');
    liste.innerHTML = '';

    mitteilungen.forEach((m, index) => {
        const mitteilungDiv = document.createElement('div');
        mitteilungDiv.className = 'mitteilung';
        mitteilungDiv.innerHTML = `
            <h3>${m.titel}</h3>
            <p>${m.inhalt}</p>
            <small>Von: ${m.absender} | Am: ${m.datum}</small>
            ${isAdminBenutzer() ? `<br><button onclick="mitteilungLoeschen(${index})">Löschen</button>` : ''}
        `;
        liste.appendChild(mitteilungDiv);
    });
}

// Mitteilung löschen (nur für Admins sichtbar)
function mitteilungLoeschen(index) {
    if (confirm('Willst du diese Mitteilung wirklich löschen?')) {
        mitteilungen.splice(index, 1);
        localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
        ladeMitteilungen();
    }
}

// Beim Laden der Seite:
anzeigenErstellungsbereich();
ladeMitteilungen();
