function toggleMenu() {
    var menu = document.getElementById("nav-menu");
    menu.classList.toggle("show");
}

// Dark Mode Toggle
const darkModeToggle = document.createElement("button");
darkModeToggle.id = "dark-mode-toggle";
darkModeToggle.textContent = "Dark Mode";
document.body.appendChild(darkModeToggle);

darkModeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    darkModeToggle.textContent = document.body.classList.contains("dark-mode") ? "Light Mode" : "Dark Mode";
});

// Section Animations on Scroll
const sections = document.querySelectorAll("section");

const revealSections = () => {
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        if (sectionTop < window.innerHeight - 50) {
            section.classList.add("show");
        }
    });
};

document.addEventListener("scroll", revealSections);
document.addEventListener("DOMContentLoaded", revealSections);
document.querySelector('#contact-form').addEventListener('submit', function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);

    fetch('/send-email', {
        method: 'POST',
        body: formData,
    })
    .then(response => response.json())
    .then(data => {
        alert('Your message has been sent!');
        event.target.reset(); // Reset the form
    })
    .catch(error => {
        alert('There was an error sending your message. Please try again.');
    });
});
