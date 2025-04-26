// Mitteilungen laden
let mitteilungen = JSON.parse(localStorage.getItem('mitteilungen')) || [];
const aktuellerBenutzer = localStorage.getItem('aktuellerBenutzer') || '';
const isAdminStatus = JSON.parse(localStorage.getItem('isAdmin'));

function istAdmin() {
    return isAdminStatus === true;
}

function anzeigenErstellungsbereich() {
    if (istAdmin()) {
        document.getElementById('erstellungsbereich').style.display = 'block';
    }
}

function ladeMitteilungen() {
    const liste = document.getElementById('mitteilungenListe');
    liste.innerHTML = '';
    mitteilungen.forEach((m, index) => {
        const element = document.createElement('div');
        element.className = 'mitteilung';
        element.innerHTML = `
            <h3>${m.titel}</h3>
            <p>${m.inhalt}</p>
            <small>Von: ${m.absender} | Am: ${m.datum}</small>
        `;
        liste.appendChild(element);
    });
}

function erstelleMitteilung() {
    const titel = document.getElementById('titel').value.trim();
    const inhalt = document.getElementById('inhalt').value.trim();
    const absender = aktuellerBenutzer || 'Unbekannt';
    const datum = new Date().toLocaleString();

    if (titel && inhalt) {
        mitteilungen.push({ titel, inhalt, absender, datum });
        speichern();
        ladeMitteilungen();
        document.getElementById('titel').value = '';
        document.getElementById('inhalt').value = '';
    } else {
        alert('Bitte fülle Titel und Inhalt aus!');
    }
}

function speichern() {
    localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
}

// Wenn Seite geladen:
anzeigenErstellungsbereich();
ladeMitteilungen();
