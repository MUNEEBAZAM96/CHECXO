// =================== [SECTION: NAVIGATION JS] ===================
// DOM refs
const navToggleBtn = document.getElementById('nav-toggle');
const mobileMenuEl = document.getElementById('mobile-menu');
const mobileOverlayEl = document.getElementById('mobile-overlay');

function openMobileMenu() {
  mobileMenuEl.classList.remove('hidden');
  mobileOverlayEl.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
}
function closeMobileMenu() {
  mobileMenuEl.classList.add('hidden');
  mobileOverlayEl.classList.add('hidden');
  document.body.style.overflow = '';
}
navToggleBtn.onclick = function() {
  if (mobileMenuEl.classList.contains('hidden')) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
};
document.querySelectorAll('.nav-link-mobile, #mobile-menu .nav-btn-outline').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
mobileOverlayEl.onclick = closeMobileMenu;
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});
// Style injection for nav links
const navStyle = document.createElement('style');
navStyle.innerHTML = `
  .nav-link, .nav-link-mobile {
    font-weight: 500;
    color: #222;
    border-bottom: 2.5px solid transparent;
    transition: color 0.18s, border 0.18s;
    background: transparent !important;
    text-align: center;
  }
  .nav-link.active, .nav-link-mobile.active {
    color: #02847E !important;
    border-bottom: 2.5px solid #02847E;
    background: transparent !important;
  }
  .nav-btn-outline {
    font-weight: 600;
    color: #02847E;
    border: 2px solid #02847E;
    background: transparent;
    transition: background 0.18s, color 0.18s;
  }
  .nav-btn-outline:hover, .nav-btn-outline.active {
    background: #e3f7f6 !important;
    color: #02847E !important;
  }
  @media (min-width: 768px) {
    #mobile-menu { display: none !important; }
    #mobile-overlay { display: none !important; }
    #nav-toggle { display: none !important; }
  }
`;
document.head.appendChild(navStyle);

// =================== [SECTION: CONTACT FORM JS] ===================
document.addEventListener('DOMContentLoaded', function() {
  // Intl-Tel-Input initialization for phone
  const phoneInputField = document.querySelector("#phone");
  if(phoneInputField) {
    window.intlTelInput(phoneInputField, {
      initialCountry: "us",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
    });
  }
  // EmailJS form handling
  const contactForm = document.querySelector('#contactForm');
  const contactModal = document.getElementById('form-success-modal');
  const contactCloseBtn = document.querySelector('.form-success-close');
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        alert('Email service not available. Please refresh the page and try again.');
        return;
      }
      // Show loading state
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      // Get form data
      const formData = new FormData(contactForm);
      const templateParams = {
        from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
        from_email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        company: formData.get('companyName'),
        company_domain: formData.get('companyDomain'),
        budget: formData.get('budget') || 'Not specified',
        region: formData.get('region'),
        message: formData.get('projectDetails') || 'No details provided',
        current_date: new Date().toLocaleString()
      };
      // Send email using EmailJS
      emailjs.send('service_7me2ter', 'template_d4hovjb', templateParams)
        .then(function(response) {
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          // Show success modal
          if (contactModal) {
            contactModal.style.display = 'block';
          }
          // Reset form
          contactForm.reset();
        }, function(error) {
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          // Show detailed error message
          alert('Email sending failed. Error: ' + error.text + '\n\nPlease check your EmailJS configuration or try again later.');
        });
    });
  }
  // Close modal functionality
  if (contactCloseBtn && contactModal) {
    contactCloseBtn.addEventListener('click', function() {
      contactModal.style.display = 'none';
    });
    // Close modal when clicking outside
    contactModal.addEventListener('click', function(e) {
      if (e.target === contactModal) {
        contactModal.style.display = 'none';
      }
    });
  }
});

// =================== [SECTION: HERO TYPING ANIMATION] ===================
document.addEventListener('DOMContentLoaded', function() {
  const text = 'Secure, Decentralized, and Scalable Blockchain Innovations';
  const el = document.getElementById('blockchain-typed');
  let i = 0;
  function typeChar() {
    if (i <= text.length) {
      el.textContent = text.slice(0, i);
      i++;
      setTimeout(typeChar, 32);
    }
  }
  if (el) typeChar();
});

// =================== [SECTION: EMAILJS INITIALIZATION] ===================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("S8v3MYxKpGGB9rdMh");
    console.log('EmailJS initialized successfully');
  } else {
    console.error('EmailJS not loaded');
  }
});

// =================== [SECTION: SWIPER JS] ===================
document.addEventListener('DOMContentLoaded', function() {
  new Swiper('.projects-swiper', {
    effect: 'coverflow',
    grabCursor: true,
    centeredSlides: true,
    slidesPerView: 'auto',
    loop: true,
    coverflowEffect: {
      rotate: 30,
      stretch: 0,
      depth: 200,
      modifier: 1,
      slideShadows: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    breakpoints: {
      900: { slidesPerView: 2 },
      1200: { slidesPerView: 3 },
    }
  });
});