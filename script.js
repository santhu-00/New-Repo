/* ===========================
   CLUBS — script.js
   =========================== */

/* ── Nav scroll effect ── */
const nav = document.querySelector('.nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 60);
});

/* ── Mobile menu ── */
const hamburger   = document.getElementById('hamburger');
const mobileMenu  = document.getElementById('mobileMenu');
const closeMenu   = document.getElementById('closeMenu');

hamburger.addEventListener('click', () => mobileMenu.classList.add('open'));
closeMenu.addEventListener('click', closeMobileMenu);

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
}

/* ── Scroll helpers ── */
function scrollToJoin() {
  document.getElementById('join').scrollIntoView({ behavior: 'smooth' });
}

function scrollToFeatures() {
  document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
}

/* ── Animated counters ── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const start = performance.now();

  function update(now) {
    const progress = Math.min((now - start) / duration, 1);
    // ease-out
    const eased = 1 - Math.pow(1 - progress, 3);
    const value = Math.floor(eased * target);
    el.textContent = value.toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target.toLocaleString();
  }

  requestAnimationFrame(update);
}

/* ── Intersection Observer: counters + feature cards ── */
const counterEls   = document.querySelectorAll('.stat__num');
const featureCards = document.querySelectorAll('.feature-card');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

counterEls.forEach(el => counterObserver.observe(el));

const cardObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => entry.target.classList.add('visible'), parseInt(delay));
      cardObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });

featureCards.forEach(card => cardObserver.observe(card));

/* ── Join form ── */
function handleSubmit(e) {
  e.preventDefault();
  const form    = document.getElementById('joinForm');
  const success = document.getElementById('successMsg');

  const name  = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();

  if (!name || !email) return;

  // Simulate async submit
  const btn = form.querySelector('button[type="submit"]');
  btn.textContent = 'Submitting…';
  btn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    success.classList.add('show');
  }, 900);
}

/* ── Active nav link on scroll ── */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav__links a');

const activeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const link = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
      if (link) link.classList.add('active');
    }
  });
}, { threshold: 0.5 });

sections.forEach(s => activeObserver.observe(s));

/* ── Active link style (injected) ── */
const style = document.createElement('style');
style.textContent = `.nav__links a.active { color: var(--accent) !important; }`;
document.head.appendChild(style);