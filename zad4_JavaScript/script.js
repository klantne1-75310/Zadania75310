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
