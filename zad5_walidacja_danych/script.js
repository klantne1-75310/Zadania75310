const form = document.getElementById("kontaktForm");

form.addEventListener("submit", function(e) {
    e.preventDefault();

    let valid = true;

    let imie = document.getElementById("imie").value.trim();
    let nazwisko = document.getElementById("nazwisko").value.trim();
    let email = document.getElementById("email").value.trim();
    let wiadomosc = document.getElementById("wiadomosc").value.trim();

    // reset błędów
    document.getElementById("imieError").textContent = "";
    document.getElementById("nazwiskoError").textContent = "";
    document.getElementById("emailError").textContent = "";
    document.getElementById("wiadomoscError").textContent = "";

//  error jak nie ma imienia labo cyrfry
    if (imie === "") {
        document.getElementById("imieError").textContent = "Imię jest wymagane";
        valid = false;
    } else if (/\d/.test(imie)) {
        document.getElementById("imieError").textContent = "Imię nie może zawierać cyfr";
        valid = false;
    }

//  error jak złe nazwisko
    if (nazwisko === "") {
        document.getElementById("nazwiskoError").textContent = "Nazwisko jest wymagane";
        valid = false;
    } else if (/\d/.test(nazwisko)) {
        document.getElementById("nazwiskoError").textContent = "Nazwisko nie może zawierać cyfr";
        valid = false;
    }

    //  error jak zły email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email === "") {
        document.getElementById("emailError").textContent = "Email jest wymagany";
        valid = false;
    } else if (!emailRegex.test(email)) {
        document.getElementById("emailError").textContent = "Niepoprawny adres email";
        valid = false;
    }
    //  error jak  nie ma wiadomości
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
});
