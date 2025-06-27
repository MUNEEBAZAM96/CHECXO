// Smooth scroll for navbar links
const navLinks = document.querySelectorAll('.navbar-links a, .navbar-actions .btn-outline');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href && href.startsWith('#')) {
      e.preventDefault();
      document.querySelector(href).scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Section fade-in on scroll
const sections = document.querySelectorAll('section');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.15 });
sections.forEach(section => {
  section.classList.add('section-fade');
  observer.observe(section);
});

// Parallax effect for hero shapes
window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.querySelectorAll('.shape').forEach((shape, i) => {
    shape.style.transform = `translateY(${scrollY * (0.08 + i*0.03)}px)`;
  });
});

// --- Dynamic Portfolio Section ---
const portfolioItems = [
  {
    image: 'images/portfolio1.jpg',
    title: 'Fintech Dashboard',
    desc: 'Modern analytics dashboard for a leading fintech company, featuring real-time data and custom charts.'
  },
  {
    image: 'images/portfolio2.jpg',
    title: 'E-commerce Platform',
    desc: 'Scalable e-commerce solution with seamless checkout, product management, and user analytics.'
  },
  {
    image: 'images/portfolio3.jpg',
    title: 'Healthcare App',
    desc: 'HIPAA-compliant mobile app for patient management and telemedicine consultations.'
  },
  {
    image: 'images/portfolio4.jpg',
    title: 'Travel Booking Portal',
    desc: 'End-to-end travel booking platform with dynamic pricing and personalized recommendations.'
  },
  {
    image: 'images/portfolio5.jpg',
    title: 'AI Chatbot',
    desc: 'Conversational AI chatbot for customer support, integrated with CRM and analytics tools.'
  },
  {
    image: 'images/portfolio6.jpg',
    title: 'Blockchain Wallet',
    desc: 'Secure blockchain wallet app with multi-currency support and biometric authentication.'
  }
];

function renderPortfolio() {
  const grid = document.getElementById('portfolio-grid');
  if (!grid) return;
  grid.innerHTML = '';
  portfolioItems.forEach((item, i) => {
    const card = document.createElement('div');
    card.className = 'portfolio-card animate-hover section-fade';
    card.style.transitionDelay = `${0.1 + i * 0.08}s`;
    card.innerHTML = `
      <img src="${item.image}" alt="${item.title}" class="portfolio-img" loading="lazy" width="400" height="250" />
      <div class="portfolio-info">
        <h3>${item.title}</h3>
        <p>${item.desc}</p>
      </div>
    `;
    grid.appendChild(card);
  });
}
document.addEventListener('DOMContentLoaded', renderPortfolio);

// --- Hero Typing Animation for Multiple Lines ---
const heroLines = [
  'Creating <span class="highlight">What\'s Next</span>',
  'We transform ideas into',
  '<span class="highlight">future-ready solutions</span>'
];
function typeLine(line, el, cb) {
  let i = 0;
  function typeChar() {
    if (i <= line.length) {
      el.innerHTML = line.slice(0, i);
      i++;
      setTimeout(typeChar, 38);
    } else {
      // Add pop-in effect
      el.classList.add('pop-in');
      setTimeout(() => {
        el.classList.remove('pop-in');
        // Add glow to highlight if present
        const highlight = el.querySelector('.highlight');
        if (highlight) {
          highlight.classList.add('highlight-glow');
          setTimeout(() => highlight.classList.remove('highlight-glow'), 1200);
        }
        if (cb) cb();
      }, 420);
    }
  }
  typeChar();
}
function typeHeroLines() {
  const lineEls = [
    document.querySelector('.hero-line1'),
    document.querySelector('.hero-line2'),
    document.querySelector('.hero-line3')
  ];
  if (!lineEls.every(Boolean)) return;
  lineEls.forEach(el => { el.innerHTML = ''; });
  function typeNext(idx) {
    if (idx >= heroLines.length) return;
    typeLine(heroLines[idx], lineEls[idx], () => typeNext(idx + 1));
  }
  typeNext(0);
}
document.addEventListener('DOMContentLoaded', typeHeroLines);

// --- Hero Animated Lines ---
function animateHeroLines() {
  const lines = document.querySelectorAll('.hero-line');
  lines.forEach((line, i) => {
    setTimeout(() => {
      line.classList.add('visible');
    }, 300 + i * 350);
  });
}
document.addEventListener('DOMContentLoaded', animateHeroLines);

// --- Re-trigger hero animation on Home click ---
document.addEventListener('DOMContentLoaded', () => {
  const homeLink = document.querySelector('.navbar-links a[href="#hero"]');
  if (homeLink) {
    homeLink.addEventListener('click', function(e) {
      e.preventDefault();
      // Smooth scroll to hero
      document.getElementById('hero').scrollIntoView({ behavior: 'smooth' });
      // Clear hero lines and restart typing animation
      setTimeout(() => {
        const lineEls = [
          document.querySelector('.hero-line1'),
          document.querySelector('.hero-line2'),
          document.querySelector('.hero-line3')
        ];
        if (!lineEls.every(Boolean)) return;
        lineEls.forEach(el => { el.innerHTML = ''; });
        typeHeroLines();
      }, 400);
    });
  }
});

// --- Mobile Sidebar Menu ---
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.navbar-hamburger');
  const sidebar = document.querySelector('.mobile-sidebar');
  const overlay = document.querySelector('.sidebar-overlay');
  const closeBtn = document.querySelector('.sidebar-close');
  const sidebarLinks = document.querySelectorAll('.sidebar-links a');

  function openSidebar() {
    sidebar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
    hamburger.classList.add('open');
  }
  function closeSidebar() {
    sidebar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
    hamburger.classList.remove('open');
  }
  if (hamburger) {
    hamburger.addEventListener('click', openSidebar);
  }
  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }
  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }
  sidebarLinks.forEach(link => {
    link.addEventListener('click', closeSidebar);
  });
});

// Sticky navbar effect on scroll
window.addEventListener('scroll', function() {
  const navbar = document.querySelector('.navbar');
  if (window.scrollY > 10) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Fade-in sections on scroll
if (!window._sectionFadeObserverInitialized) {
  window._sectionFadeObserverInitialized = true;
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.section-fade').forEach(section => {
    observer.observe(section);
  });
} 