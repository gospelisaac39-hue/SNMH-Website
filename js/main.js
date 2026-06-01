// ============================================
// SUCCESS NWOKO MENTORING HUB — MAIN JS
// ============================================

// Mobile nav toggle
const burger = document.getElementById('burger');
const navLinks = document.getElementById('navLinks');
const navLinkItems = document.querySelectorAll('.nav__links .nav__link');
const navCta = document.querySelector('.nav__cta');
if (burger && navLinks) {
  const toggleMenu = () => {
    navLinks.classList.toggle('open');
    burger.classList.toggle('active');
  };

  const closeMenu = () => {
    navLinks.classList.remove('open');
    burger.classList.remove('active');
  };

  burger.addEventListener('click', toggleMenu);

  navLinkItems.forEach((link) => {
    link.addEventListener('click', closeMenu);
  });

  if (navCta) {
    navCta.addEventListener('click', closeMenu);
  }
}

// Scroll: nav shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    nav.style.background = 'rgba(255,255,255,0.98)';
  } else {
    nav.style.background = 'rgba(255,255,255,0.92)';
  }
});

// Scroll reveal: .fade-up elements
const fadeEls = document.querySelectorAll('.fade-up');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
fadeEls.forEach(el => observer.observe(el));

// Counter animation
function animateCounter(el) {
  const target = parseInt(el.dataset.count, 10);
  const duration = 1600;
  const start = performance.now();
  const update = (now) => {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const ease = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(ease * target);
    if (progress < 1) requestAnimationFrame(update);
    else el.textContent = target;
  };
  requestAnimationFrame(update);
}

const statNums = document.querySelectorAll('.stat__num[data-count]');
if (statNums.length) {
  const statsObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        statsObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  statNums.forEach(el => statsObs.observe(el));
}

// Contact form
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const success = document.getElementById('formSuccess');
    if (success) {
      form.querySelectorAll('input, textarea, select, button').forEach(el => el.disabled = true);
      success.style.display = 'block';
      success.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
}
