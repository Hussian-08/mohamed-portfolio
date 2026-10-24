
/* ===================================
   1. DARK / LIGHT THEME
=================================== */

const themeButton = document.getElementById("theme-toggle");
const root = document.documentElement;

function applyTheme(theme) {
    root.setAttribute("data-theme", theme);

    if (themeButton) {
        themeButton.textContent = theme === "dark" ? "☀️" : "🌙";
        themeButton.setAttribute(
            "aria-label",
            theme === "dark" ? "Switch to light mode" : "Switch to dark mode"
        );
    }
}

const savedTheme = localStorage.getItem("portfolio-theme");
const preferredTheme = window.matchMedia(
    "(prefers-color-scheme: light)"
).matches ? "light" : "dark";

applyTheme(savedTheme || preferredTheme);

if (themeButton) {
    themeButton.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme") || "dark";
        const nextTheme = currentTheme === "dark" ? "light" : "dark";

        applyTheme(nextTheme);
        localStorage.setItem("portfolio-theme", nextTheme);
    });
}


/* ===================================
   2. MOBILE NAVIGATION
=================================== */

const menuButton = document.getElementById("menu-toggle");
const navigation = document.querySelector(".nav-links");

if (menuButton && navigation) {
    menuButton.addEventListener("click", () => {
        const isOpen = navigation.classList.toggle("active");

        menuButton.setAttribute("aria-expanded", String(isOpen));
        menuButton.textContent = isOpen ? "✕" : "☰";
    });

    navigation.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            navigation.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
            menuButton.textContent = "☰";
        });
    });
}


/* ===================================
   3. SCROLL REVEAL ANIMATIONS
=================================== */

const revealElements = document.querySelectorAll(
    ".content-section, .project-card, .skill-item, .contact-card"
);

if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.12
    });

    revealElements.forEach(element => {
        element.classList.add("reveal");
        observer.observe(element);
    });
}


/* ===================================
   4. CURRENT FOOTER YEAR
=================================== */

const yearElement = document.getElementById("year");

if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
