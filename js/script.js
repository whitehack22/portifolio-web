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

// Initialize EmailJS with your User ID
emailjs.init('c98ZU6jbEl5wKJ0lx'); // ✅ Replace with your actual user ID

document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = this;
    const statusMessage = document.getElementById('status-message');

    emailjs.sendForm('service_61ddjl2', 'template_0vs20v2', formData)
    .then(function(response) {
        statusMessage.innerHTML = 'Your message has been sent successfully!';
        statusMessage.style.color = 'green';
        formData.reset();
    }, function(error) {
        statusMessage.innerHTML = 'Error sending message. Please try again later.';
        statusMessage.style.color = 'red';
    });
});

const button = this.querySelector("button");
button.disabled = true;
button.textContent = "Sending...";

emailjs.sendForm('service_61ddjl2', 'template_0vs20v2', formData)
.then(function(response) {
    statusMessage.innerHTML = 'Your message has been sent successfully!';
    statusMessage.style.color = 'green';
    formData.reset();
    button.disabled = false;
    button.textContent = "Send";
}, function(error) {
    statusMessage.innerHTML = 'Error sending message. Please try again later.';
    statusMessage.style.color = 'red';
    button.disabled = false;
    button.textContent = "Send";
});



