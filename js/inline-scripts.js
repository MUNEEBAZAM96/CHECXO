// Initialize EmailJS with proper error handling
document.addEventListener('DOMContentLoaded', function() {
  // Initialize EmailJS
  if (typeof emailjs !== 'undefined') {
    emailjs.init("S8v3MYxKpGGB9rdMh");
    console.log('EmailJS initialized successfully');
  } else {
    console.error('EmailJS not loaded');
  }
});

// Enhanced animated 3D mesh/network background
document.addEventListener('DOMContentLoaded', function() {
  const canvas = document.getElementById('three-bg');
  if (!canvas) return;
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setClearColor(0x000000, 0); // transparent
  renderer.setSize(window.innerWidth, window.innerHeight);
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.z = 70;
  // --- Mesh points ---
  const POINTS = 180;
  const vertices = [];
  for (let i = 0; i < POINTS; i++) {
    const x = (Math.random() - 0.5) * 90;
    const y = (Math.random() - 0.5) * 50;
    const z = (Math.random() - 0.5) * 70;
    vertices.push(x, y, z);
  }
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3));
  // --- Animated color ---
  let colorPhase = 0;
  function getAnimatedColor() {
    colorPhase += 0.01;
    // Animate between #14b8a6 and #0ea5e9
    const r = Math.floor(20 + 10 * Math.sin(colorPhase));
    const g = Math.floor(184 + 40 * Math.sin(colorPhase + 1));
    const b = Math.floor(166 + 70 * Math.sin(colorPhase + 2));
    return (r << 16) | (g << 8) | b;
  }
  // --- Points with glow ---
  const pointsMaterial = new THREE.PointsMaterial({
    color: 0x14b8a6,
    size: 2.2,
    transparent: true,
    opacity: 0.85
  });
  const points = new THREE.Points(geometry, pointsMaterial);
  scene.add(points);
  // --- Connecting lines ---
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x0ea5e9,
    transparent: true,
    opacity: 0.22
  });
  const lineGeometry = new THREE.BufferGeometry();
  // Build lines between close points
  const lineVertices = [];
  const posArr = geometry.getAttribute('position');
  for (let i = 0; i < POINTS; i++) {
    for (let j = i + 1; j < POINTS; j++) {
      const dx = posArr.getX(i) - posArr.getX(j);
      const dy = posArr.getY(i) - posArr.getY(j);
      const dz = posArr.getZ(i) - posArr.getZ(j);
      const dist = Math.sqrt(dx*dx + dy*dy + dz*dz);
      if (dist < 22) { // connect if close
        lineVertices.push(posArr.getX(i), posArr.getY(i), posArr.getZ(i));
        lineVertices.push(posArr.getX(j), posArr.getY(j), posArr.getZ(j));
      }
    }
  }
  lineGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lineVertices, 3));
  const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
  scene.add(lines);
  // --- Soft blur effect (CSS) ---
  canvas.style.filter = 'blur(1.2px) drop-shadow(0 0 16px #14b8a6cc)';
  // --- Mouse interactivity ---
  let mouseX = 0, mouseY = 0;
  let targetRotationX = 0, targetRotationY = 0;
  let currentRotationX = 0, currentRotationY = 0;
  document.addEventListener('mousemove', (event) => {
    mouseX = (event.clientX / window.innerWidth) * 2 - 1;
    mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
    targetRotationX = mouseY * 0.3;
    targetRotationY = mouseX * 0.3;
  });
  // --- Animate ---
  function animate() {
    requestAnimationFrame(animate);
    // Animate mesh color
    const animatedColor = getAnimatedColor();
    pointsMaterial.color.setHex(animatedColor);
    // Smooth mouse interaction
    currentRotationX += (targetRotationX - currentRotationX) * 0.05;
    currentRotationY += (targetRotationY - currentRotationY) * 0.05;
    // Animate mesh with mouse interaction
    points.rotation.y += 0.0045 + currentRotationY * 0.001;
    points.rotation.x += 0.0012 + currentRotationX * 0.001;
    lines.rotation.y += 0.0045 + currentRotationY * 0.001;
    lines.rotation.x += 0.0012 + currentRotationX * 0.001;
    renderer.render(scene, camera);
  }
  animate();
  // Responsive
  window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  });
});
// --- Parallax effect for hero content ---
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const heroContent = document.querySelector('.hero-content');
  if (heroContent) {
    const rate = scrolled * -0.5;
    heroContent.style.transform = `translateY(${rate}px)`;
  }
});
// EmailJS form handling with better error handling
document.addEventListener('DOMContentLoaded', function() {
  const form = document.querySelector('.contact-form');
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
      const submitBtn = form.querySelector('.submit-btn');
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      submitBtn.classList.add('loading');
      
      // Get form data
      const formData = new FormData(form);
      const templateParams = {
        from_name: formData.get('firstName') + ' ' + formData.get('lastName'),
        from_email: formData.get('email'),
        phone: formData.get('countryCode') + ' ' + formData.get('phone'),
        company: formData.get('companyName'),
        budget: formData.get('budget') || 'Not specified',
        region: formData.get('region'),
        message: formData.get('projectDetails') || 'No details provided',
        current_date: new Date().toLocaleString(),
        attachment_name: 'No file attached',
        attachment_size: 'N/A'
      };
      
      console.log('Template params:', templateParams);
      
      // Send email using EmailJS
      emailjs.send('service_7me2ter', 'template_d4hovjb', templateParams)
        .then(function(response) {
          console.log('SUCCESS!', response.status, response.text);
          
          // Reset button
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
          submitBtn.classList.remove('loading');
          
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
          submitBtn.classList.remove('loading');
          
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

  // Add form validation and visual feedback
  const inputs = document.querySelectorAll('.contact-form input, .contact-form textarea, .contact-form select');
  
  inputs.forEach(input => {
    // Add focus effects
    input.addEventListener('focus', function() {
      this.parentElement.style.transform = 'translateY(-2px)';
    });
    
    input.addEventListener('blur', function() {
      this.parentElement.style.transform = 'translateY(0)';
    });
    
    // Add real-time validation
    input.addEventListener('input', function() {
      if (this.checkValidity()) {
        this.style.borderColor = '#00bcd4';
        this.style.boxShadow = '0 0 0 4px rgba(0,188,212,0.15)';
      } else {
        this.style.borderColor = '#e53935';
        this.style.boxShadow = '0 0 0 4px rgba(229,57,53,0.15)';
      }
    });
  });
});

// --- Industries Info Card Popup Logic ---
document.addEventListener('DOMContentLoaded', function() {
  // Show the corresponding industry info card when an industry card is clicked
  const industryCards = document.querySelectorAll('.industry-card-figma');
  const infoCards = document.querySelectorAll('.industry-info-card');

  industryCards.forEach(card => {
    card.addEventListener('click', function() {
      const industry = card.getAttribute('data-industry');
      // Hide all info cards first
      infoCards.forEach(ic => ic.style.display = 'none');
      // Show the matching info card
      const infoCard = document.querySelector(`.industry-info-card[data-industry="${industry}"]`);
      if (infoCard) {
        infoCard.style.display = 'block';
        infoCard.classList.add('active');
      }
    });
  });

  // Close button logic for info cards
  const closeButtons = document.querySelectorAll('.industry-info-close');
  closeButtons.forEach(btn => {
    btn.addEventListener('click', function(e) {
      const infoCard = btn.closest('.industry-info-card');
      if (infoCard) {
        infoCard.style.display = 'none';
        infoCard.classList.remove('active');
      }
    });
  });

  // Optional: Close info card when clicking outside the card (on the overlay)
  infoCards.forEach(infoCard => {
    infoCard.addEventListener('click', function(e) {
      if (e.target === infoCard) {
        infoCard.style.display = 'none';
        infoCard.classList.remove('active');
      }
    });
  });
}); 

// Spline Viewer Debugging and Fallback
document.addEventListener('DOMContentLoaded', function() {
  // Check if Spline viewer is loaded
  setTimeout(() => {
    const splineViewer = document.querySelector('spline-viewer');
    if (splineViewer) {
      console.log('Spline viewer element found:', splineViewer);
      
      // Check if the viewer is actually loading
      splineViewer.addEventListener('load', () => {
        console.log('Spline viewer loaded successfully');
      });
      
      splineViewer.addEventListener('error', (error) => {
        console.error('Spline viewer error:', error);
        // Fallback to Three.js if Spline fails
        console.log('Falling back to Three.js animation');
      });
    } else {
      console.error('Spline viewer element not found');
    }
  }, 1000);
}); 