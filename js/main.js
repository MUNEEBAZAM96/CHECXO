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

// --- Motivation Project Form Validation ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.project-form');
  if (!form) return;

  function showError(input, message) {
    let err = input.parentElement.querySelector('.form-error');
    if (!err) {
      err = document.createElement('div');
      err.className = 'form-error';
      input.parentElement.insertBefore(err, input.nextSibling);
    }
    err.textContent = message;
    err.style.opacity = 1;
    err.style.transform = 'translateY(0)';
  }
  function clearError(input) {
    const err = input.parentElement.querySelector('.form-error');
    if (err) {
      err.style.opacity = 0;
      err.style.transform = 'translateY(-8px)';
      setTimeout(() => err.remove(), 200);
    }
  }
  function validateField(input) {
    const val = input.value.trim();
    if (input.hasAttribute('required') && !val) {
      showError(input, 'This field is required');
      return false;
    }
    if (input.type === 'url' && val && !/^https?:\/\//.test(val)) {
      showError(input, 'Please enter a valid URL (include http:// or https://)');
      return false;
    }
    if (input.type === 'tel' && val && !/^[0-9\-\s+()]{7,}$/.test(val)) {
      showError(input, 'Please enter a valid phone number');
      return false;
    }
    clearError(input);
    return true;
  }
  form.querySelectorAll('input, textarea').forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
  });
  form.addEventListener('submit', function(e) {
    let valid = true;
    form.querySelectorAll('input, textarea').forEach(input => {
      if (!validateField(input)) valid = false;
    });
    if (!valid) {
      e.preventDefault();
    }
  });
});

// --- Ripple effect for submit button ---
document.addEventListener('DOMContentLoaded', function() {
  const btn = document.querySelector('.project-form .submit-btn');
  if (!btn) return;
  btn.addEventListener('click', function(e) {
    const rect = btn.getBoundingClientRect();
    const ripple = document.createElement('span');
    ripple.className = 'ripple';
    ripple.style.left = (e.clientX - rect.left) + 'px';
    ripple.style.top = (e.clientY - rect.top) + 'px';
    ripple.style.width = ripple.style.height = Math.max(rect.width, rect.height) + 'px';
    btn.appendChild(ripple);
    setTimeout(() => ripple.remove(), 500);
  });
});

// --- Show Success Modal on Form Submit ---
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.project-form');
  const modal = document.getElementById('form-success-modal');
  const closeBtn = document.querySelector('.form-success-close');
  if (!form || !modal || !closeBtn) return;
  form.addEventListener('submit', async function(e) {
    if (!form.checkValidity()) return;
    e.preventDefault();
    // Map form fields to backend expected keys
    const formData = new FormData(form);
    const data = {
      name: `${formData.get('firstName') || ''} ${formData.get('lastName') || ''}`.trim(),
      email: formData.get('email') || '',
      message: [
        formData.get('projectDetails') || '',
        `Company: ${formData.get('companyName') || ''}`,
        `Phone: ${formData.get('countryCode') || ''} ${formData.get('phone') || ''}`,
        `Budget: ${formData.get('budget') || ''}`,
        `Region: ${formData.get('region') || ''}`
      ].filter(Boolean).join('\n')
    };
    try {
      const response = await fetch('http://localhost:5000/api/contacts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (response.ok) {
        modal.style.display = 'flex';
        setTimeout(() => { modal.classList.add('show'); }, 10);
        form.reset();
        form.querySelectorAll('.form-error').forEach(err => err.remove());
      } else {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'form-error';
        errorMsg.textContent = 'There was a problem submitting your request. Please try again.';
        form.appendChild(errorMsg);
        setTimeout(() => errorMsg.remove(), 4000);
      }
    } catch (err) {
      const errorMsg = document.createElement('div');
      errorMsg.className = 'form-error';
      errorMsg.textContent = 'Network error. Please try again later.';
      form.appendChild(errorMsg);
      setTimeout(() => errorMsg.remove(), 4000);
    }
  });
  function closeModal() {
    modal.classList.remove('show');
    setTimeout(() => { modal.style.display = 'none'; }, 300);
  }
  closeBtn.addEventListener('click', closeModal);
  modal.addEventListener('click', function(e) {
    if (e.target === modal) closeModal();
  });
});

// --- Admin Panel: Fetch and display contact requests ---
document.addEventListener('DOMContentLoaded', function() {
  const adminPanel = document.getElementById('admin-panel');
  if (!adminPanel) return;
  const contactSection = adminPanel.querySelector('.admin-section');
  if (!contactSection) return;
  function parseMessage(msg) {
    const lines = msg.split(/\n|<br\s*\/?>/i).map(l => l.trim()).filter(Boolean);
    let projectDetails = '', company = '', phone = '', budget = '', region = '';
    lines.forEach(line => {
      if (line.startsWith('Company:')) company = line.replace('Company:', '').trim();
      else if (line.startsWith('Phone:')) phone = line.replace('Phone:', '').trim();
      else if (line.startsWith('Budget:')) budget = line.replace('Budget:', '').trim();
      else if (line.startsWith('Region:')) region = line.replace('Region:', '').trim();
      else if (!projectDetails) projectDetails = line;
    });
    return { projectDetails, company, phone, budget, region };
  }
  function renderContacts(contacts) {
    let html = '';
    if (!contacts.length) {
      html = '<p>No requests yet. (This will show a table of contact form submissions.)</p>';
    } else {
      html = `<table class="admin-table" style="width:100%;border-collapse:collapse;">
        <thead><tr>
          <th>Name</th><th>Email</th><th>Phone</th><th>Company</th><th>Region</th><th>Budget</th><th>Project Details</th><th>Date</th><th>Action</th>
        </tr></thead>
        <tbody>
        ${contacts.map(c => {
          const parsed = parseMessage(c.message || '');
          return `<tr data-id="${c.id}">
            <td>${c.name}</td>
            <td>${c.email}</td>
            <td>${parsed.phone}</td>
            <td>${parsed.company}</td>
            <td>${parsed.region}</td>
            <td>${parsed.budget}</td>
            <td style="white-space:pre-line;max-width:220px;">${parsed.projectDetails}</td>
            <td>${new Date(c.date).toLocaleString()}</td>
            <td>
              <button class="copy-email-btn" data-email="${c.email}">Copy Email</button>
              <button class="ok-request-btn" data-id="${c.id}">OK</button>
            </td>
          </tr>`;
        }).join('')}
        </tbody></table>`;
    }
    contactSection.querySelector('.admin-table-placeholder').innerHTML = html;
    // Add copy email functionality
    contactSection.querySelectorAll('.copy-email-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const email = btn.getAttribute('data-email');
        navigator.clipboard.writeText(email);
        btn.textContent = 'Copied!';
        setTimeout(() => { btn.textContent = 'Copy Email'; }, 1200);
      });
    });
    // Add OK button functionality
    contactSection.querySelectorAll('.ok-request-btn').forEach(btn => {
      btn.addEventListener('click', function() {
        const id = btn.getAttribute('data-id');
        fetch(`http://localhost:5000/api/contacts/${id}`, {
          method: 'DELETE'
        })
        .then(res => {
          if (res.ok) {
            // Remove the row from the table
            const row = btn.closest('tr');
            if (row) row.remove();
          } else {
            alert('Failed to delete request.');
          }
        })
        .catch(() => alert('Failed to delete request.'));
      });
    });
  }
  function fetchContacts() {
    fetch('http://localhost:5000/api/contacts')
      .then(res => res.json())
      .then(renderContacts)
      .catch(() => {
        contactSection.querySelector('.admin-table-placeholder').innerHTML = '<p style="color:#c00;">Failed to load contact requests.</p>';
      });
  }
  // Show contacts after login
  const loginForm = document.getElementById('adminLoginForm');
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      setTimeout(fetchContacts, 500); // fetch after login
    });
  }
});

// Industries section animation and ripple effect
function animateIndustryCards() {
  const cards = document.querySelectorAll('.industry-card-figma');
  const infoCards = document.querySelectorAll('.industry-info-card');
  cards.forEach((card, idx) => {
    card.style.animationDelay = (0.08 * idx) + 's';
    card.addEventListener('click', function(e) {
      // Remove active from all
      cards.forEach(c => {
        c.classList.remove('active');
        const chevron = c.querySelector('.industry-chevron-figma i');
        if (chevron) {
          chevron.classList.remove('fa-chevron-right');
          chevron.classList.add('fa-chevron-down');
        }
      });
      infoCards.forEach(ic => ic.classList.remove('active'));
      // Set active on clicked
      card.classList.add('active');
      const chevron = card.querySelector('.industry-chevron-figma i');
      if (chevron) {
        chevron.classList.remove('fa-chevron-down');
        chevron.classList.add('fa-chevron-right');
      }
      // Show info card
      const industry = card.getAttribute('data-industry');
      const infoCard = document.querySelector('.industry-info-card[data-industry="' + industry + '"]');
      if (infoCard) {
        infoCard.classList.add('active');
      }
      // Ripple effect
      const ripple = document.createElement('span');
      ripple.className = 'ripple';
      const rect = card.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);
      ripple.style.width = ripple.style.height = size + 'px';
      ripple.style.left = (e.clientX - rect.left - size/2) + 'px';
      ripple.style.top = (e.clientY - rect.top - size/2) + 'px';
      card.appendChild(ripple);
      ripple.addEventListener('animationend', () => ripple.remove());
    });
  });
  // Close button logic
  document.querySelectorAll('.industry-info-close').forEach(btn => {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      infoCards.forEach(ic => ic.classList.remove('active'));
      cards.forEach(c => {
        c.classList.remove('active');
        const chevron = c.querySelector('.industry-chevron-figma i');
        if (chevron) {
          chevron.classList.remove('fa-chevron-right');
          chevron.classList.add('fa-chevron-down');
        }
      });
    });
  });
}
document.addEventListener('DOMContentLoaded', animateIndustryCards);

// Industries in-place card logic
document.addEventListener('DOMContentLoaded', function() {
  // Industries grid in-place popup logic
  const grid = document.querySelector('.industries-figma-grid');
  const infoPopups = document.querySelector('.industry-info-popups');
  const infoCards = infoPopups.querySelectorAll('.industry-info-card');
  const cards = grid.querySelectorAll('.industry-card-figma');

  cards.forEach(card => {
    card.addEventListener('click', function() {
      // Hide the grid
      grid.style.display = 'none';
      // Hide all info cards
      infoCards.forEach(ic => {
        ic.style.display = 'none';
        ic.classList.remove('active');
      });
      // Show the matching info card
      const industry = card.getAttribute('data-industry');
      const infoCard = infoPopups.querySelector(`.industry-info-card[data-industry="${industry}"]`);
      if (infoCard) {
        infoCard.style.display = 'flex';
        infoCard.classList.add('active');
      }
    });
  });

  // Close logic for info cards
  infoCards.forEach(infoCard => {
    const closeBtn = infoCard.querySelector('.industry-info-close');
    if (closeBtn) {
      closeBtn.addEventListener('click', function() {
        infoCard.style.display = 'none';
        infoCard.classList.remove('active');
        // Show the grid again
        grid.style.display = '';
      });
    }
  });
});

// Form submission handling
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.contact-form');
  const phoneCodeSelect = document.getElementById('phoneCode');
  const regionInput = document.getElementById('region');
  const budgetSelect = document.getElementById('budgetSelect');
  const budgetCustomInput = document.querySelector('.budget-custom');
  
  // Handle phone code change and update region
  phoneCodeSelect.addEventListener('change', (e) => {
    const selectedOption = e.target.options[e.target.selectedIndex];
    const region = selectedOption.getAttribute('data-region');
    regionInput.value = region;
  });

  // Handle budget selection
  budgetSelect.addEventListener('change', (e) => {
    if (e.target.value === 'custom') {
      budgetCustomInput.style.display = 'block';
      budgetCustomInput.required = true;
    } else {
      budgetCustomInput.style.display = 'none';
      budgetCustomInput.required = false;
    }
  });

  // Form submission
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = {
      firstName: form.querySelector('input[placeholder="First Name"]').value,
      lastName: form.querySelector('input[placeholder="Last Name"]').value,
      email: form.querySelector('input[type="email"]').value,
      phone: `${phoneCodeSelect.value}${form.querySelector('input[type="tel"]').value}`,
      companyName: form.querySelector('input[placeholder="Company Name"]').value,
      companyDomain: form.querySelector('input[placeholder="Company domain / url"]').value,
      budget: budgetSelect.value === 'custom' ? budgetCustomInput.value : budgetSelect.value,
      region: regionInput.value,
      projectDetails: form.querySelector('textarea').value
    };

    try {
      const response = await fetch('http://localhost:3000/api/submit-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      const result = await response.json();
      alert('Form submitted successfully!');
      form.reset();
      budgetCustomInput.style.display = 'none';
      
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to submit form. Please try again.');
    }
  });

  // Set initial region based on default phone code
  const defaultOption = phoneCodeSelect.options[phoneCodeSelect.selectedIndex];
  regionInput.value = defaultOption.getAttribute('data-region');
}); 

// Team Carousel Functionality
document.addEventListener('DOMContentLoaded', function() {
  const carousel = document.querySelector('.leadership-grid');
  const teamMembers = document.querySelectorAll('.team-member');
  
  // Clone first 4 items and append to end for smooth infinite loop
  const firstFourItems = Array.from(teamMembers).slice(0, 4);
  firstFourItems.forEach(item => {
    const clone = item.cloneNode(true);
    carousel.appendChild(clone);
  });
  
  let currentIndex = 0;
  const itemWidth = 390; // 350px width + 40px gap
  const totalItems = teamMembers.length;
  
  function updateCarousel() {
    carousel.style.transform = `translateX(${-currentIndex * itemWidth}px)`;
  }
  
  function moveCarousel() {
    currentIndex++;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    updateCarousel();
    
    // When we reach the cloned items
    if (currentIndex >= totalItems) {
      // Wait for transition to finish, then quickly reset to start
      setTimeout(() => {
        carousel.style.transition = 'none';
        currentIndex = 0;
        updateCarousel();
        // Re-enable transition after reset
        setTimeout(() => {
          carousel.style.transition = 'transform 0.5s ease-in-out';
        }, 50);
      }, 500);
    }
  }
  
  // Auto scroll every 3 seconds
  let autoScrollInterval = setInterval(moveCarousel, 3000);
  
  // Pause auto scroll on hover
  carousel.addEventListener('mouseenter', () => {
    clearInterval(autoScrollInterval);
  });
  
  carousel.addEventListener('mouseleave', () => {
    autoScrollInterval = setInterval(moveCarousel, 3000);
  });
  
  // Touch events for mobile
  let touchStartX = 0;
  let touchEndX = 0;
  
  carousel.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
    clearInterval(autoScrollInterval);
    carousel.style.transition = 'none';
  });
  
  carousel.addEventListener('touchmove', (e) => {
    const currentTouch = e.changedTouches[0].screenX;
    const diff = touchStartX - currentTouch;
    carousel.style.transform = `translateX(${-currentIndex * itemWidth - diff}px)`;
  });
  
  carousel.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    carousel.style.transition = 'transform 0.5s ease-in-out';
    handleSwipe();
    autoScrollInterval = setInterval(moveCarousel, 3000);
  });
  
  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;
    
    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        currentIndex = Math.min(currentIndex + 1, totalItems);
      } else {
        currentIndex = Math.max(currentIndex - 1, 0);
      }
      updateCarousel();
    } else {
      updateCarousel(); // Reset to current position if swipe wasn't strong enough
    }
  }
}); 