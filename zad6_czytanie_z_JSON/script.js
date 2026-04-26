const form = document.getElementById("kontaktForm");

form.addEventListener("submit", function(e) {
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

    if (valid) {
        alert("Formularz wysłany poprawnie!");
        form.reset();
    }
});



document.addEventListener('DOMContentLoaded', function() {
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


    fetch('dane.json')
        .then(response => {
            if (!response.ok) throw new Error('Błąd pobierania danych');
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