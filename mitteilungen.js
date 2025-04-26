let mitteilungen = JSON.parse(localStorage.getItem('mitteilungen')) || [];

function getAktuellerBenutzer() {
    return JSON.parse(localStorage.getItem('aktuellerBenutzer'));
}

function isAdmin() {
    const user = getAktuellerBenutzer();
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
            ${isAdmin() ? `
                <button onclick="löscheMitteilung(${mitteilungen.length - 1 - index})">Löschen</button>
            ` : ''}
        `;
        liste.appendChild(div);
    });

    // Formular nur für Admins sichtbar
    document.getElementById('mitteilungFormular').style.display = isAdmin() ? 'block' : 'none';
}

function erstelleMitteilung() {
    if (!isAdmin()) {
        alert("Nur Admins dürfen Mitteilungen erstellen!");
        return;
    }

    const titel = document.getElementById('titel').value.trim();
    const inhalt = document.getElementById('inhalt').value.trim();
    const user = getAktuellerBenutzer();

    if (!titel || !inhalt) {
        alert("Bitte alle Felder ausfüllen.");
        return;
    }

    const neueMitteilung = {
        titel: titel,
        inhalt: inhalt,
        absender: user.username,
        datum: new Date().toLocaleString()
    };

    mitteilungen.push(neueMitteilung);
    localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));

    document.getElementById('titel').value = '';
    document.getElementById('inhalt').value = '';

    ladeMitteilungen();
}

function löscheMitteilung(index) {
    if (!isAdmin()) {
        alert("Nur Admins dürfen löschen!");
        return;
    }
    if (confirm("Möchtest du diese Mitteilung wirklich löschen?")) {
        mitteilungen.splice(index, 1);
        localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
        ladeMitteilungen();
    }
}

// Beim Laden der Seite
ladeMitteilungen();
