// Dark mode toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or prefer-color-scheme
const savedTheme = localStorage.getItem('theme');
const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;

if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    body.setAttribute('data-theme', 'dark');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

themeToggle.addEventListener('click', () => {
    if (body.getAttribute('data-theme') === 'dark') {
        body.removeAttribute('data-theme');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    }
});

// Mobile menu
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const closeMenuBtn = document.getElementById('close-menu');
const mobileNav = document.getElementById('mobile-nav');
const overlay = document.getElementById('overlay');
const mobileNavLinks = document.querySelectorAll('#mobile-nav a');

mobileMenuBtn.addEventListener('click', () => {
    mobileNav.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
});

function closeMenu() {
    mobileNav.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

closeMenuBtn.addEventListener('click', closeMenu);
overlay.addEventListener('click', closeMenu);
mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// Back to top button
const backToTopBtn = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Testimonial slider
const testimonialSlider = document.getElementById('testimonial-slider');
const sliderDots = document.querySelectorAll('.slider-dot');
let currentSlide = 0;

sliderDots.forEach(dot => {
    dot.addEventListener('click', () => {
        const index = parseInt(dot.getAttribute('data-index'));
        goToSlide(index);
    });
});

function goToSlide(index) {
    testimonialSlider.style.transform = `translateX(-${index * 100}%)`;
    sliderDots.forEach(dot => dot.classList.remove('active'));
    sliderDots[index].classList.add('active');
    currentSlide = index;
}

// Auto slide testimonials
setInterval(() => {
    currentSlide = (currentSlide + 1) % sliderDots.length;
    goToSlide(currentSlide);
}, 6000);
