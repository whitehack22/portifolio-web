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

//Emails being sent by nodemailer
document.addEventListener("scroll", revealSections);
document.addEventListener("DOMContentLoaded", revealSections);

document.getElementById('contact-form').addEventListener('submit', async function(event) {
    event.preventDefault();

    const name = this.name.value;
    const email = this.email.value;
    const message = this.message.value;
    const statusMessage = document.getElementById('status-message');
    const button = this.querySelector("button");

    button.disabled = true;
    button.textContent = "Sending...";

    try {
        const res = await fetch('https://portifolio-email-backend.onrender.com/send-email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email, message }),
        });

        const data = await res.json();
        if (res.ok) {
            statusMessage.innerHTML = data.message;
            statusMessage.style.color = 'green';
            this.reset();
        } else {
            statusMessage.innerHTML = data.error || 'Something went wrong.';
            statusMessage.style.color = 'red';
        }
    } catch (err) {
        console.error(err);
        statusMessage.innerHTML = 'Failed to send message.';
        statusMessage.style.color = 'red';
    }

    button.disabled = false;
    button.textContent = "Send";
});




