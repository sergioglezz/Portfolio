// main.js

// ── Menú hamburguesa (mobile) ──────────────────────────
const navToggle = document.getElementById('navToggle');
const navLinks  = document.querySelector('.nav__links');

navToggle?.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navLinks.classList.contains('open'));
});

// Cierra el menú al hacer clic en un enlace
navLinks?.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});


// ── Header con fondo al hacer scroll ──────────────────
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });


// ── Animaciones al hacer scroll (IntersectionObserver) ──
const reveals = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target); // solo una vez
    }
  });
}, { threshold: 0.15 });

reveals.forEach(el => observer.observe(el));


// ── Smooth scroll para navegación ─────────────────────
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
