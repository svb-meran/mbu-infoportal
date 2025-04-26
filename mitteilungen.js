let mitteilungen = JSON.parse(localStorage.getItem('mitteilungen')) || [];

function speichereMitteilungen() {
    localStorage.setItem('mitteilungen', JSON.stringify(mitteilungen));
}

function zeigeMitteilungen() {
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
}

function mitteilungHinzufügen() {
    const titel = document.getElementById('titel').value.trim();
    const inhalt = document.getElementById('inhalt').value.trim();
    const absender = localStorage.getItem('aktuellerBenutzer') || 'Unbekannt';
    const datum = new Date().toLocaleString();

    if (titel && inhalt) {
        mitteilungen.push({ titel, inhalt, absender, datum });
        speichereMitteilungen();
        zeigeMitteilungen();
        document.getElementById('titel').value = '';
        document.getElementById('inhalt').value = '';
    }
}

function löscheMitteilung(index) {
    if (confirm('Möchtest du diese Mitteilung wirklich löschen?')) {
        mitteilungen.splice(index, 1);
        speichereMitteilungen();
        zeigeMitteilungen();
    }
}

function isAdmin() {
    return localStorage.getItem('isAdmin') === 'true';
}

function logout() {
    localStorage.removeItem('aktuellerBenutzer');
    localStorage.removeItem('isAdmin');
    window.location.href = 'login.html';
}

document.addEventListener('DOMContentLoaded', zeigeMitteilungen);

