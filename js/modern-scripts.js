/* =================== [MODERN SCRIPTS FOR ALL PAGES] =================== */

// =================== [SECTION: NAVIGATION FUNCTIONALITY] ===================
function initializeNavigation() {
  // DOM refs
  const navToggle = document.getElementById('nav-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const mobileOverlay = document.getElementById('mobile-overlay');

  function openMobileMenu() {
    mobileMenu.classList.remove('hidden');
    mobileOverlay.classList.remove('hidden');
    document.body.style.overflow = "hidden";
  }
  
  function closeMobileMenu() {
    mobileMenu.classList.add('hidden');
    mobileOverlay.classList.add('hidden');
    document.body.style.overflow = "";
  }
  
  if (navToggle) {
    navToggle.onclick = function() {
      if (mobileMenu.classList.contains('hidden')) {
        openMobileMenu();
      } else {
        closeMobileMenu();
      }
    };
  }

  // Close mobile menu when clicking on overlay
  if (mobileOverlay) {
    mobileOverlay.onclick = closeMobileMenu;
  }

  // Close mobile menu when clicking on a link
  const mobileLinks = document.querySelectorAll('.nav-link-mobile');
  mobileLinks.forEach(link => {
    link.onclick = closeMobileMenu;
  });

  // Close mobile menu when clicking on contact button
  const mobileContactBtn = document.querySelector('#mobile-menu .nav-btn-outline');
  if (mobileContactBtn) {
    mobileContactBtn.onclick = closeMobileMenu;
  }

  // Close mobile menu on window resize
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768) {
      closeMobileMenu();
    }
  });

  // Add navigation styles
  addNavigationStyles();
}

// =================== [SECTION: NAVIGATION STYLES] ===================
function addNavigationStyles() {
  const style = document.createElement('style');
  style.innerHTML = `
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
  document.head.appendChild(style);
}

// =================== [SECTION: EMAILJS INITIALIZATION] ===================
function initializeEmailJS() {
  if (typeof emailjs !== 'undefined') {
    emailjs.init("S8v3MYxKpGGB9rdMh");
    console.log('EmailJS initialized successfully');
  } else {
    console.error('EmailJS not loaded');
  }
}

// =================== [SECTION: CONTACT FORM HANDLING] ===================
function initializeContactForm() {
  const form = document.querySelector('#contactForm');
  const modal = document.getElementById('form-success-modal');
  const closeBtn = document.querySelector('.form-success-close');
  
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Check if EmailJS is available
      if (typeof emailjs === 'undefined') {
        alert('Email service not available. Please refresh the page and try again.');
        return;
      }
      
      // Show loading state
      const submitBtn = form.querySelector('button[type="submit"]');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      
      // Get form data
      const formData = new FormData(form);
      const templateParams = {
        from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
        from_email: formData.get('email'),
        phone: formData.get('phone') || 'Not provided',
        company: formData.get('companyName'),
        company_domain: formData.get('companyDomain'),
        budget: formData.get('budget'),
        region: formData.get('region'),
        message: formData.get('projectDetails'),
        current_date: new Date().toLocaleString()
      };
      
      console.log('Template params:', templateParams);
      
      // Send email using EmailJS
      emailjs.send('service_7me2ter', 'template_d4hovjb', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Show success modal
          if (modal) {
            modal.style.display = 'block';
          }
          
          // Reset form
          form.reset();
        }, function(error) {
          console.log('FAILED...', error);
          console.error('EmailJS Error Details:', error);
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          
          // Show detailed error message
          alert('Email sending failed. Error: ' + error.text + '\n\nPlease check your EmailJS configuration or try again later.');
        });
    });
  }
  
  // Close modal functionality
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
    
    // Close modal when clicking outside
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        modal.style.display = 'none';
      }
    });
  }
}

// =================== [SECTION: PHONE INPUT INITIALIZATION] ===================
function initializePhoneInput() {
  if (typeof intlTelInput !== 'undefined') {
    const phoneInput = document.getElementById('phone');
    if (phoneInput) {
      intlTelInput(phoneInput, {
        utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js",
        separateDialCode: true,
        initialCountry: "us",
        preferredCountries: ["us", "gb", "pk", "au", "ae", "in", "cn", "jp"]
      });
    }
  }
}

// =================== [SECTION: TYPING ANIMATION] ===================
function initializeTypingAnimation(elementId, text) {
  const el = document.getElementById(elementId);
  if (el && text) {
    let i = 0;
    function typeChar() {
      if (i <= text.length) {
        el.textContent = text.slice(0, i);
        i++;
        setTimeout(typeChar, 32);
      }
    }
    typeChar();
  }
}

// =================== [SECTION: SWIPER INITIALIZATION] ===================
function initializeSwiper() {
  if (typeof Swiper !== 'undefined') {
    const projectsSwiper = document.querySelector('.projects-swiper');
    if (projectsSwiper) {
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
    }
  }
}

// =================== [SECTION: MAIN INITIALIZATION] ===================
document.addEventListener('DOMContentLoaded', function() {
  // Initialize all components
  initializeNavigation();
  initializeEmailJS();
  initializeContactForm();
  initializePhoneInput();
  initializeSwiper();
  
  // Initialize typing animations based on page
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  switch(currentPage) {
    case 'web.html':
      initializeTypingAnimation('web-typed', 'Performance-Driven Web Design');
      break;
    case 'app.html':
      initializeTypingAnimation('app-typed', 'Custom Mobile Apps for Tomorrow');
      break;
    case 'uiux.html':
      initializeTypingAnimation('uiux-typed', 'User-Centered Design Solutions');
      break;
    case 'genai.html':
      initializeTypingAnimation('genai-typed', 'AI-Powered Evolution for Your IT Infrastructure');
      break;
    case 'blockchain.html':
      initializeTypingAnimation('blockchain-typed', 'Decentralized Solutions for Tomorrow');
      break;
    case 'cyber.html':
      initializeTypingAnimation('cyber-typed', 'Advanced Cybersecurity Protection');
      break;
    default:
      // For index.html or other pages
      break;
  }
}); 