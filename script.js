// ===== Preloader =====
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('hide-preloader');
        setTimeout(() => preloader.style.display = 'none', 500);
    }
});

// ===== Theme Toggle with Local Storage =====
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

function setTheme(theme) {
    if (theme === 'light') {
        body.classList.add('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('light-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Load theme from localStorage
const savedTheme = localStorage.getItem('theme') || 'dark';
setTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const newTheme = body.classList.contains('light-theme') ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    });
}

// ===== Typing Animation =====
const typingTextElement = document.getElementById('typing-text');
const roles = [
    'Machine Learning Enthusiast',
    'AI Builder & Problem Solver',
    'Python & Deep Learning Developer',
    'Hackathon & Project-driven Learner'
];

let roleIndex = 0;
let charIndex = 0;
let typingForward = true;

function typeRole() {
    if (!typingTextElement) return;

    const current = roles[roleIndex];
    if (typingForward) {
        charIndex++;
        if (charIndex === current.length + 5) {
            typingForward = false;
        }
    } else {
        charIndex--;
        if (charIndex === 0) {
            typingForward = true;
            roleIndex = (roleIndex + 1) % roles.length;
        }
    }
    typingTextElement.textContent = current.slice(0, Math.max(charIndex, 0));
    setTimeout(typeRole, typingForward ? 120 : 60);
}
typeRole();

// ===== Scroll Reveal Animations =====
const revealElements = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('reveal-visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ===== Scroll Progress Bar =====
const scrollProgress = document.getElementById('scroll-progress');
window.addEventListener('scroll', () => {
    if (!scrollProgress) return;
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrolled = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    scrollProgress.style.width = scrolled + '%';
});

// ===== Back to Top Button =====
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
    if (!backToTop) return;
    if (window.scrollY > 250) {
        backToTop.classList.add('show');
    } else {
        backToTop.classList.remove('show');
    }
});

if (backToTop) {
    backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== Skills Meter Animation =====
function animateMeters() {
    const fills = document.querySelectorAll('.meter-fill');
    fills.forEach(fill => {
        const level = fill.getAttribute('data-level');
        fill.style.width = level + '%';
    });
}

// Trigger on reveal of skills section
const skillsSection = document.getElementById('skills');
if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateMeters();
                skillsObserver.unobserve(skillsSection);
            }
        });
    }, { threshold: 0.3 });
    skillsObserver.observe(skillsSection);
}

// ===== GitHub Auto Projects Fetch =====
const githubProjectsContainer = document.getElementById('github-projects');

async function fetchGitHubProjects() {
    if (!githubProjectsContainer) return;

    try {
        const response = await fetch('https://api.github.com/users/PasupuletiC/repos?sort=updated&per_page=6');
        if (!response.ok) throw new Error('GitHub API error');
        const repos = await response.json();

        if (!repos.length) {
            githubProjectsContainer.innerHTML = '<p>No public repositories found yet.</p>';
            return;
        }

        githubProjectsContainer.innerHTML = '';
        repos.forEach(repo => {
            const card = document.createElement('article');
            card.className = 'github-project-card card-glow';
            card.innerHTML = `
                <h4>${repo.name}</h4>
                <p>${repo.description ? repo.description : 'No description provided.'}</p>
                <div class="github-meta">
                    <span><i class="fas fa-star"></i> ${repo.stargazers_count}</span>
                    <span><i class="fas fa-code-branch"></i> ${repo.forks_count}</span>
                </div>
                <a href="${repo.html_url}" target="_blank" rel="noopener noreferrer">View Repository</a>
            `;
            githubProjectsContainer.appendChild(card);
        });
    } catch (error) {
        githubProjectsContainer.innerHTML = '<p class="error">Unable to load GitHub projects right now.</p>';
        console.error(error);
    }
}
fetchGitHubProjects();

// ===== Contact Form (front-end only) =====
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = contactForm.name.value.trim();
        const email = contactForm.email.value.trim();
        const message = contactForm.message.value.trim();

        if (!name || !email || !message) {
            formStatus.textContent = 'Please fill in all required fields.';
            formStatus.classList.add('error-text');
            return;
        }

        formStatus.textContent = 'Thank you! Your message has been noted.';
        formStatus.classList.remove('error-text');
        contactForm.reset();
    });
}
