// Typewriter effect
const textArray = [
  "a Web Developer.",
  "a Designer.",
  "a PHP & Laravel Developer."
];

let i = 0, j = 0, currentText = "", isDeleting = false;

function type() {
  const typed = document.getElementById("typed-text");
  
  if (!typed) return;

  if (!isDeleting && j <= textArray[i].length) {
    currentText = textArray[i].substring(0, j++);
  }

  if (isDeleting && j >= 0) {
    currentText = textArray[i].substring(0, j--);
  }

  typed.innerHTML = currentText;

  if (!isDeleting && j === textArray[i].length) {
    isDeleting = true;
    setTimeout(type, 1000);
  } else if (isDeleting && j === 0) {
    isDeleting = false;
    i = (i + 1) % textArray.length;
    setTimeout(type, 300);
  } else {
    setTimeout(type, isDeleting ? 50 : 100);
  }
}

// Active link highlight on scroll
function highlightActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
  
  if (sections.length === 0 || navLinks.length === 0) return;
  
  let current = '';
  let scrollPosition = window.scrollY + 150;
  
  // Hero section check
  if (scrollPosition < 100) {
    current = 'hero';
  } else {
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 80;
      const sectionHeight = section.clientHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        current = section.getAttribute('id');
      }
    });
  }
  
  // Remove active class from all links
  navLinks.forEach(link => {
    link.classList.remove('active');
    
    const href = link.getAttribute('href');
    if (!href) return;
    
    // Check if this link matches current section
    if (href.includes('#')) {
      const hash = href.split('#')[1];
      if (hash === current) {
        link.classList.add('active');
      }
    } else if (href === 'index.html' && (current === 'hero' || current === '')) {
      link.classList.add('active');
    }
  });
}

// Set current year in footer
function setCurrentYear() {
  const footerParagraph = document.querySelector("footer p");
  if (footerParagraph) {
    footerParagraph.innerHTML = `&copy; ${new Date().getFullYear()} Fasih | All rights reserved.`;
  }
}

// Smooth scroll for navigation links
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      if (href === '#') {
        e.preventDefault();
        window.scrollTo({
          top: 0,
          behavior: 'smooth'
        });
        return;
      }
      
      if (href.startsWith('#') && href.length > 1) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          const navbarHeight = document.querySelector('.navbar').offsetHeight;
          window.scrollTo({
            top: targetElement.offsetTop - navbarHeight,
            behavior: 'smooth'
          });
          
          // Update active link
          setTimeout(() => {
            highlightActiveLink();
          }, 300);
        }
      }
    });
  });
}

// Initialize everything on page load
document.addEventListener('DOMContentLoaded', function() {
  console.log("Portfolio loaded successfully!");
  
  // Start typewriter
  type();
  
  // Set current year
  setCurrentYear();
  
  // Initialize active link
  highlightActiveLink();
  
  // Initialize smooth scroll
  initSmoothScroll();
  
  // Set Home as active on initial load if no hash
  if (!window.location.hash) {
    const homeLink = document.querySelector('.nav-link[href="index.html"]');
    if (homeLink) {
      homeLink.classList.add('active');
    }
  }
});

// Update active link on scroll
window.addEventListener('scroll', function() {
  highlightActiveLink();
});

// Contact Form Validation and Submission
function validateForm() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();
  const recaptcha = grecaptcha.getResponse();
  
  // Name validation
  if (name.length < 3) {
    alert('Please enter a valid name (minimum 3 characters)');
    return false;
  }
  
  // Email validation
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    alert('Please enter a valid email address');
    return false;
  }
  
  // Message validation
  if (message.length < 5) {
    alert('Message should be at least 5 characters long');
    return false;
  }
  
  // reCAPTCHA validation
  if (recaptcha.length === 0) {
    alert('Please complete the reCAPTCHA');
    return false;
  }
  
  // Show loading spinner
  document.getElementById('btnText').textContent = 'Sending...';
  document.getElementById('btnSpinner').classList.remove('visually-hidden');
  document.getElementById('submitBtn').disabled = true;
  
  return true;
}

// Reset form after submission (Formspree will handle this)
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('contactForm');
  if (form) {
    form.addEventListener('submit', function() {
      // Form submission handled by Formspree
      setTimeout(function() {
        // Reset button after 5 seconds
        document.getElementById('btnText').textContent = 'Send Message';
        document.getElementById('btnSpinner').classList.add('visually-hidden');
        document.getElementById('submitBtn').disabled = false;
        document.getElementById('contactForm').reset();
        grecaptcha.reset();
      }, 5000);
    });
  }
  
  // Add reCAPTCHA script dynamically
  const recaptchaScript = document.createElement('script');
  recaptchaScript.src = 'https://www.google.com/recaptcha/api.js';
  recaptchaScript.async = true;
  recaptchaScript.defer = true;
  document.head.appendChild(recaptchaScript);
});
