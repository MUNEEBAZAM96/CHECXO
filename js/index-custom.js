// =================== [SECTION: NAVIGATION JS] ===================
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
navToggle.onclick = function() {
  if (mobileMenu.classList.contains('hidden')) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
};
document.querySelectorAll('.nav-link-mobile, #mobile-menu .nav-btn-outline').forEach(link => {
  link.addEventListener('click', closeMobileMenu);
});
mobileOverlay.onclick = closeMobileMenu;
window.addEventListener('resize', () => {
  if (window.innerWidth >= 768) closeMobileMenu();
});
// Style (active underline, etc.)
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

// =================== [SECTION: LEADERSHIP CAROUSEL LOGIC] ===================
function leadershipCarousel() {
  return {
    leaders: [
      { name: 'Shoaib Irfan', role: 'Lead Designer', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/WhatsApp_Image_2025-06-13_at_4.39.07_AM-removebg-preview_2_adqrwx.png' },
      { name: 'Shayan Yousuf', role: 'Founder & CEO', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/Frame_460_1_yea7yh.png' },
      { name: 'Yasir Bucha', role: 'Strategic Advisor', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/Group_495_v4ydmr.png' },
      { name: 'Sarah Malik', role: 'Product Manager', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/WhatsApp_Image_2025-06-13_at_8.16.01_PM-removebg-preview_brhxdj.png' },
      { name: 'Ayaz Qaiser', role: 'CTO', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/WhatsApp_Image_2025-06-13_at_4.39.07_AM-removebg-preview_2_adqrwx.png' },
      { name: 'Irfan Malik', role: 'Founder & CEO', img: 'https://res.cloudinary.com/dxqmakjxj/image/upload/v1753194105/Frame_460_1_yea7yh.png' }
    ],
    visibleCount: 3,
    cardWidth: 320,
    cardHeight: 400,
    cardMargin: 18,
    containerWidth: 1100,
    current: 0,
    hovered: null,
    items: [],
    timer: null,
    isMobile: false,
    init() {
      this.updateCardLayout();
      window.addEventListener('resize', () => this.updateCardLayout());
      this.startAutoSlide();
    },
    updateCardLayout() {
      let ww = window.innerWidth;
      this.isMobile = ww < 700;
      if (ww < 700) {
        this.visibleCount = 1;
        this.cardWidth = Math.max(ww - 40, 210);
        this.cardMargin = 0;
        this.containerWidth = this.cardWidth;
      } else if (ww < 1200) {
        this.visibleCount = 2;
        this.cardWidth = 270;
        this.cardMargin = 14;
        this.containerWidth = this.cardWidth * this.visibleCount + this.cardMargin * 2 * this.visibleCount;
      } else if (ww < 1500) {
        this.visibleCount = 3;
        this.cardWidth = 320;
        this.cardMargin = 18;
        this.containerWidth = this.cardWidth * this.visibleCount + this.cardMargin * 2 * this.visibleCount;
      } else {
        this.visibleCount = 4;
        this.cardWidth = 300;
        this.cardMargin = 18;
        this.containerWidth = this.cardWidth * this.visibleCount + this.cardMargin * 2 * this.visibleCount;
      }
      this.cardHeight = Math.floor(this.cardWidth * 1.18);
      this.items = [
        ...this.leaders.slice(-this.visibleCount),
        ...this.leaders,
        ...this.leaders.slice(0, this.visibleCount)
      ];
      if (this.current < this.visibleCount || this.current > this.leaders.length + this.visibleCount - 1) {
        this.current = this.visibleCount;
      }
    },
    offset() {
      // Center cards for desktop, just scroll 1 card per view for mobile
      return this.current * (this.cardWidth + 2*this.cardMargin);
    },
    realIndex() {
      return (this.current - this.visibleCount + this.leaders.length) % this.leaders.length;
    },
    startAutoSlide() {
      if (this.timer) clearInterval(this.timer);
      this.timer = setInterval(() => { this.next(); }, 8000);
    },
    next() { this.current++; },
    prev() { this.current--; },
    onTransitionEnd() {
      if (this.current >= this.leaders.length + this.visibleCount) {
        this.current = this.visibleCount;
        this.jump();
      }
      if (this.current < this.visibleCount) {
        this.current = this.leaders.length + this.visibleCount - 1;
        this.jump();
      }
    },
    jump() {
      let el = this.$refs.track;
      el.style.transition = 'none';
      el.style.transform = `translateX(-${this.offset()}px)`;
      el.offsetHeight;
      el.style.transition = '';
    },
    goTo(idx) {
      let target = idx + this.visibleCount;
      let direction = target > this.current ? 1 : -1;
      let move = () => {
        if (this.current === target) return;
        this.current += direction;
        setTimeout(move, 210);
      };
      move();
    }
  }
}

// =================== [SECTION: CONTACT FORM JS] ===================
document.addEventListener('DOMContentLoaded', function() {
  // Intl-Tel-Input initialization for phone
  const phoneInput = document.querySelector("#phone");
  if(phoneInput) {
    window.intlTelInput(phoneInput, {
      initialCountry: "us",
      utilsScript: "https://cdn.jsdelivr.net/npm/intl-tel-input@18.1.1/build/js/utils.js"
    });
  }
  // EmailJS form handling
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
        budget: formData.get('budget') || 'Not specified',
        region: formData.get('region'),
        message: formData.get('projectDetails') || 'No details provided',
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