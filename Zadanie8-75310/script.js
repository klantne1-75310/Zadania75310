const SUPABASE_URL = "https://gpkthtsqgkygqddsymve.supabase.co";
const SUPABASE_KEY = "sb_publishable_iByO8vbCwy63fcfGf7PwfQ_svupK3Fe";

document.addEventListener('DOMContentLoaded', function() {

    const form = document.getElementById("kontaktForm");

    if (form) {
        form.addEventListener("submit", async function(e) {
            e.preventDefault();

            let valid = true;

            let imie = document.getElementById("imie").value.trim();
            let nazwisko = document.getElementById("nazwisko").value.trim();
            let email = document.getElementById("email").value.trim();
            let wiadomosc = document.getElementById("wiadomosc").value.trim();

            document.getElementById("imieError").textContent = "";
            document.getElementById("nazwiskoError").textContent = "";
            document.getElementById("emailError").textContent = "";
            document.getElementById("wiadomoscError").textContent = "";

            let status = document.getElementById("kontaktStatus");

            if (!status) {
                status = document.createElement("p");
                status.id = "kontaktStatus";
                form.appendChild(status);
            }

            status.textContent = "";

            if (imie === "") {
                document.getElementById("imieError").textContent = "Imię jest wymagane";
                valid = false;
            } else if (/\d/.test(imie)) {
                document.getElementById("imieError").textContent = "Imię nie może zawierać cyfr";
                valid = false;
            }

            if (nazwisko === "") {
                document.getElementById("nazwiskoError").textContent = "Nazwisko jest wymagane";
                valid = false;
            } else if (/\d/.test(nazwisko)) {
                document.getElementById("nazwiskoError").textContent = "Nazwisko nie może zawierać cyfr";
                valid = false;
            }

            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (email === "") {
                document.getElementById("emailError").textContent = "Email jest wymagany";
                valid = false;
            } else if (!emailRegex.test(email)) {
                document.getElementById("emailError").textContent = "Niepoprawny adres email";
                valid = false;
            }

            if (wiadomosc === "") {
                document.getElementById("wiadomoscError").textContent = "Wiadomość jest wymagana";
                valid = false;
            }

            if (!valid) {
                return;
            }

            const daneFormularza = {
                imie: imie,
                nazwisko: nazwisko,
                email: email,
                wiadomosc: wiadomosc
            };

            try {
                const response = await fetch(`${SUPABASE_URL}/rest/v1/wiadomosci`, {
                    method: "POST",
                    headers: {
                        "apikey": SUPABASE_KEY,
                        "Authorization": `Bearer ${SUPABASE_KEY}`,
                        "Content-Type": "application/json",
                        "Prefer": "return=minimal"
                    },
                    body: JSON.stringify(daneFormularza)
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(errorText);
                }

                status.textContent = "Formularz wysłany poprawnie! Dane zostały zapisane w bazie.";
                form.reset();

            } catch (error) {
                console.error("Błąd wysyłania formularza:", error);
                status.textContent = "Nie udało się wysłać formularza. Sprawdź konfigurację Supabase.";
            }
        });
    }

    const themeButton = document.querySelector('header button:first-of-type');
    const stylesheet = document.querySelector('link[rel="stylesheet"]');

    if (themeButton && stylesheet) {
        themeButton.addEventListener('click', function() {
            if (stylesheet.getAttribute('href') === 'green.css') {
                stylesheet.setAttribute('href', 'red.css');
            } else {
                stylesheet.setAttribute('href', 'green.css');
            }
        });
    }

    const toggleButton = document.getElementById('toggleEdukacja');
    const edukacjaSection = document.getElementById('edukacja');

    if (toggleButton && edukacjaSection) {
        toggleButton.addEventListener('click', function() {
            if (edukacjaSection.style.display === 'none') {
                edukacjaSection.style.display = 'block';
                toggleButton.textContent = 'Ukryj edukację';
            } else {
                edukacjaSection.style.display = 'none';
                toggleButton.textContent = 'Pokaż edukację';
            }
        });
    }

    const notatkaForm = document.getElementById('notatkaForm');
    const notatkaInput = document.getElementById('notatkaInput');
    const notatkiList = document.getElementById('notatkiList');
    const notatkiInfo = document.getElementById('notatkiInfo');
    const localStorageKey = 'notatkiCV';

    function pobierzNotatki() {
        const zapisaneNotatki = localStorage.getItem(localStorageKey);

        if (zapisaneNotatki) {
            return JSON.parse(zapisaneNotatki);
        }

        return [];
    }

    function zapiszNotatki(notatki) {
        localStorage.setItem(localStorageKey, JSON.stringify(notatki));
    }

    function wyswietlNotatki() {
        const notatki = pobierzNotatki();
        notatkiList.innerHTML = '';

        if (notatki.length === 0) {
            notatkiInfo.textContent = 'Brak zapisanych notatek.';
            return;
        }

        notatkiInfo.textContent = 'Liczba zapisanych notatek: ' + notatki.length;

        notatki.forEach(function(notatka, index) {
            const li = document.createElement('li');
            li.textContent = notatka;

            const usunButton = document.createElement('button');
            usunButton.type = 'button';
            usunButton.textContent = 'Usuń';
            usunButton.className = 'usunNotatke';

            usunButton.addEventListener('click', function() {
                notatki.splice(index, 1);
                zapiszNotatki(notatki);
                wyswietlNotatki();
            });

            li.appendChild(usunButton);
            notatkiList.appendChild(li);
        });
    }

    if (notatkaForm && notatkaInput && notatkiList && notatkiInfo) {
        wyswietlNotatki();

        notatkaForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const tekstNotatki = notatkaInput.value.trim();

            if (tekstNotatki === '') {
                alert('Wpisz treść notatki.');
                return;
            }

            const notatki = pobierzNotatki();
            notatki.push(tekstNotatki);
            zapiszNotatki(notatki);

            notatkaInput.value = '';
            wyswietlNotatki();
        });
    }

    fetch('dane.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Błąd pobierania danych');
        }

        return response.json();
    })
    .then(data => {

        const kontaktDiv = document.getElementById('kontaktContainer');

        if (kontaktDiv) {
            kontaktDiv.innerHTML = `
            <p>Email: <a href="mailto:${data.kontakt.email}">${data.kontakt.email}</a></p>
            <p>Telefon: <a href="tel:${data.kontakt.telefon}">${data.kontakt.telefon}</a></p>
            <p>Miasto: ${data.kontakt.miasto}</p>
            <p>Github: <a href="${data.kontakt.github}" target="_blank" rel="noopener noreferrer">${data.kontakt.githubNazwa}</a></p>
            <p>LinkedIn: <a href="${data.kontakt.linkedin}" target="_blank" rel="noopener noreferrer">${data.kontakt.linkedinNazwa}</a></p>
            `;
        }

        const oMnieDiv = document.getElementById('oMnieContainer');

        if (oMnieDiv) {
            oMnieDiv.innerHTML = `
            <img src="${data.oMnie.zdjecie}" alt="Jan Kowalski - zdjęcie profilowe" width="300" height="300">
            <p>${data.oMnie.opis1}</p>
            <p>${data.oMnie.opis2}</p>
            `;
        }

        const skillsList = document.getElementById('skillsList');

        if (skillsList) {
            data.umiejetnosci.forEach(skill => {
                const li = document.createElement('li');
                li.textContent = skill;
                skillsList.appendChild(li);
            });
        }

        const doswiadczenieDiv = document.getElementById('doswiadczenieContainer');

        if (doswiadczenieDiv) {
            data.doswiadczenie.forEach(job => {
                const article = document.createElement('article');

                article.innerHTML = `
                <h3>${job.tytul}</h3>
                <p>${job.opis}</p>
                `;

                doswiadczenieDiv.appendChild(article);
            });
        }

        const edukacjaDiv = document.getElementById('edukacjaContainer');

        if (edukacjaDiv) {
            const articleSzkola = document.createElement('article');

            articleSzkola.innerHTML = `
            <h3>${data.edukacja.szkola}</h3>
            <p>${data.edukacja.stopien}</p>
            `;

            edukacjaDiv.appendChild(articleSzkola);

            const articleKursy = document.createElement('article');
            articleKursy.innerHTML = '<h3>Ukończone kursy</h3>';

            const ul = document.createElement('ul');

            data.edukacja.kursy.forEach(kurs => {
                const li = document.createElement('li');
                li.textContent = kurs;
                ul.appendChild(li);
            });

            articleKursy.appendChild(ul);
            edukacjaDiv.appendChild(articleKursy);
        }

        const projectsList = document.getElementById('projectsList');

        if (projectsList) {
            data.projekty.forEach(proj => {
                const li = document.createElement('li');
                const a = document.createElement('a');

                a.href = proj.link;
                a.target = '_blank';
                a.rel = 'noopener noreferrer';
                a.textContent = proj.nazwa;

                li.appendChild(a);

                if (proj.opis && proj.opis.trim() !== '') {
                    li.appendChild(document.createTextNode(` – ${proj.opis}`));
                }

                projectsList.appendChild(li);
            });
        }
    })
    .catch(error => {
        console.error('Wystąpił problem z wczytaniem danych JSON:', error);
    });
});
