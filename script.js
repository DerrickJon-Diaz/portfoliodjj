/* ══════════════════════════════════════
   DERRICK JON DIAZ — Portfolio JS
══════════════════════════════════════ */

/* ── Navbar scroll effect ─────────── */
const navbar = document.getElementById('navbar');
const backToTop = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;

  // Navbar style
  navbar.classList.toggle('scrolled', scrollY > 50);

  // Back-to-top button
  backToTop.classList.toggle('visible', scrollY > 400);

  // Active nav link highlight
  highlightNavLink();
});

/* ── Hamburger menu ───────────────── */
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});

// Close on nav link click (mobile)
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  });
});

// Close on outside click
document.addEventListener('click', (e) => {
  if (!navbar.contains(e.target)) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
});

/* ── Active nav link ──────────────── */
function highlightNavLink() {
  const sections = document.querySelectorAll('section[id]');
  const links    = navLinks.querySelectorAll('a');
  let currentId  = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 140) {
      currentId = sec.id;
    }
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${currentId}`) {
      link.classList.add('active');
    }
  });
}

/* ── Typewriter effect ────────────── */
const phrases = [
  'Full-Stack Developer',
  'IT Student',
  'Web Developer',
  'Problem Solver',
  'Tech Enthusiast',
];

let pIdx  = 0;
let cIdx  = 0;
let isDeleting = false;
const typeEl = document.getElementById('typewriter-text');

function typeWrite() {
  const current = phrases[pIdx];

  if (isDeleting) {
    typeEl.textContent = current.slice(0, --cIdx);
  } else {
    typeEl.textContent = current.slice(0, ++cIdx);
  }

  let delay = isDeleting ? 60 : 110;

  if (!isDeleting && cIdx === current.length) {
    delay = 2000;
    isDeleting = true;
  } else if (isDeleting && cIdx === 0) {
    isDeleting = false;
    pIdx = (pIdx + 1) % phrases.length;
    delay = 400;
  }

  setTimeout(typeWrite, delay);
}

typeWrite();

/* ── Intersection Observer (AOS) ──── */
const aosObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger delay for grid children
        const delay = entry.target.dataset.delay || 0;
        setTimeout(() => {
          entry.target.classList.add('aos-animate');
        }, delay);
        aosObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

function initAOS() {
  const aosEls = document.querySelectorAll('[data-aos]');
  aosEls.forEach((el, i) => {
    // Add stagger delay within grid containers
    el.dataset.delay = (i % 5) * 80;
    aosObserver.observe(el);
  });
}

initAOS();

/* ── Counter animation ────────────── */
function animateCounter(el) {
  const target = parseInt(el.dataset.target, 10);
  const duration = 1800;
  const step = Math.ceil(target / (duration / 16));
  let current = 0;

  const tick = () => {
    current = Math.min(current + step, target);
    el.textContent = current;
    if (current < target) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
}

const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.stat-number').forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.4 }
);

const aboutStats = document.querySelector('.about-stats');
if (aboutStats) statsObserver.observe(aboutStats);

/* ── Skill bar animation ──────────── */
const skillBarObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll('.skill-fill').forEach(bar => {
          bar.style.width = bar.dataset.width + '%';
        });
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.tab-content').forEach(tab => skillBarObserver.observe(tab));

/* ── Skills tab switcher ──────────── */
const tabBtns    = document.querySelectorAll('.tab-btn');
const tabContents = document.querySelectorAll('.tab-content');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    tabBtns.forEach(b => b.classList.remove('active'));
    tabContents.forEach(c => c.classList.remove('active'));

    btn.classList.add('active');
    const targetTab = document.getElementById('tab-' + btn.dataset.tab);
    targetTab.classList.add('active');

    // Trigger skill bar animations for the new tab
    targetTab.querySelectorAll('.skill-fill').forEach(bar => {
      bar.style.width = '0';
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          bar.style.width = bar.dataset.width + '%';
        });
      });
    });
  });
});

// Animate bars in the initially active tab on load
window.addEventListener('load', () => {
  document.querySelectorAll('#tab-frontend .skill-fill').forEach(bar => {
    bar.style.width = bar.dataset.width + '%';
  });
});

/* ── Project filter ───────────────── */
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    const filter = btn.dataset.filter;

    projectCards.forEach(card => {
      const match = filter === 'all' || card.dataset.category === filter;
      card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

      if (match) {
        card.classList.remove('hidden');
        card.style.opacity = '1';
        card.style.transform = '';
      } else {
        card.style.opacity = '0';
        card.style.transform = 'scale(0.92)';
        setTimeout(() => card.classList.add('hidden'), 300);
      }
    });
  });
});

/* ── Contact form ─────────────────── */
const contactForm = document.getElementById('contactForm');
const formStatus  = document.getElementById('formStatus');

contactForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const btn = contactForm.querySelector('[type="submit"]');
  btn.disabled = true;
  btn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending…';

  // Simulated async send (replace with real endpoint)
  setTimeout(() => {
    formStatus.textContent = '✓ Your message has been sent! I\'ll get back to you soon.';
    formStatus.className = 'form-status success';
    contactForm.reset();
    btn.disabled = false;
    btn.innerHTML = '<i class="fas fa-paper-plane"></i> Send Message';

    setTimeout(() => {
      formStatus.textContent = '';
      formStatus.className = 'form-status';
    }, 5000);
  }, 1500);
});

/* ── Back to top ──────────────────── */
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── Footer year ──────────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ── Parallax hero bg (subtle) ────── */
window.addEventListener('scroll', () => {
  const heroBg = document.querySelector('.hero-bg');
  if (heroBg) {
    heroBg.style.transform = `translateY(${window.scrollY * 0.25}px) scale(1.05)`;
  }
});
