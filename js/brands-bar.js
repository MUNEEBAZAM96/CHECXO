// brands-bar.js
// Seamless infinite marquee effect for the brands bar

document.addEventListener('DOMContentLoaded', function () {
  const track = document.querySelector('.brands-bar-track');
  if (!track) return;

  // Duplicate the logos for seamless looping
  const logos = Array.from(track.children);
  logos.forEach(logo => {
    const clone = logo.cloneNode(true);
    clone.setAttribute('aria-hidden', 'true');
    track.appendChild(clone);
  });

  // Optionally, pause on hover for accessibility
  const marquee = document.querySelector('.brands-bar-marquee');
  if (marquee) {
    marquee.addEventListener('mouseenter', () => {
      track.style.animationPlayState = 'paused';
    });
    marquee.addEventListener('mouseleave', () => {
      track.style.animationPlayState = 'running';
    });
  }
});

// --- Team Section Enhancements ---

document.addEventListener('DOMContentLoaded', function () {
  // Animate team cards on scroll
  const teamCards = document.querySelectorAll('.team-card');
  const revealOnScroll = () => {
    teamCards.forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 60) {
        card.classList.add('visible');
      }
    });
  };
  window.addEventListener('scroll', revealOnScroll);
  revealOnScroll();

  // Video icon click handler
  document.querySelectorAll('.team-card-icon.video').forEach(icon => {
    icon.addEventListener('click', function (e) {
      const videoUrl = icon.getAttribute('data-video-url');
      if (videoUrl) {
        window.open(videoUrl, '_blank');
      }
      // Placeholder: could open a modal with embedded video instead
    });
  });

  // (Optional) Add more handlers for LinkedIn, email, etc. if needed
}); 